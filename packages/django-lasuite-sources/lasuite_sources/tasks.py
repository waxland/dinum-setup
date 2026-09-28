"""Celery tasks for sovereign sources monitoring and law abrogation detection."""

import logging
import re
from collections.abc import Mapping, Sequence

from django.conf import settings
from django.core.cache import caches
from django.utils import timezone

from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.registry import source_registry

logger = logging.getLogger(__name__)


def check_laws_validity_task(
    document_contents: Sequence[Mapping[str, object]],
) -> dict[str, object]:
    """
    Task scanning document contents for legal citations (Légifrance LEGIARTI / JORFTEXT IDs)
    and verifying their current validity against the LawSourceProvider.
    Flags abrogated articles and updates cache.
    Distinguishes reasons for unverified/unknown items:
    - verified: Upstream verified active or abrogated law
    - demo: Demonstration data cannot certify law validity
    - data_missing: Upstream returned no detail record
    - unverified_data: Missing verified_at timestamp or unknown status
    - provider_disabled: Law provider is disabled or inactive
    - provider_outage: SourceUnavailable or network outage during lookup
    """
    law_provider = source_registry.get_provider("law")
    cache = caches[getattr(settings, "LASUITE_SOURCES_CACHE_ALIAS", "default")]

    total_docs_scanned = 0
    total_laws_checked = 0
    unknown_laws = 0
    abrogated_laws_found: list[dict[str, str]] = []
    reasons_breakdown: dict[str, int] = {
        "verified": 0,
        "demo": 0,
        "data_missing": 0,
        "unverified_data": 0,
        "provider_disabled": 0,
        "provider_outage": 0,
    }

    if not law_provider or not law_provider.is_enabled():
        logger.info("Law provider not active or disabled.")
        if not document_contents:
            return {
                "status": "skipped",
                "reason": "law_provider_inactive",
                "reasons_breakdown": reasons_breakdown,
            }

    for doc in document_contents:
        total_docs_scanned += 1
        content_str = str(doc.get("content", ""))

        legi_ids = set(re.findall(r"LEGIARTI[0-9]{12}", content_str))
        jorf_ids = set(re.findall(r"JORFTEXT[0-9]{12}", content_str))
        all_ids = legi_ids | jorf_ids

        for source_id in all_ids:
            total_laws_checked += 1
            is_abrogated = None
            status_text = "unknown"
            checked_at = None
            reason = "unverified_data"
            detail = None

            if not law_provider or not law_provider.is_enabled():
                reason = "provider_disabled"
                unknown_laws += 1
                reasons_breakdown["provider_disabled"] += 1
            else:
                try:
                    detail = source_registry.detail_with_cache("law", source_id)
                    if detail is None:
                        reason = "data_missing"
                        unknown_laws += 1
                        reasons_breakdown["data_missing"] += 1
                    elif detail.get("origin") == "demo":
                        reason = "demo"
                        unknown_laws += 1
                        reasons_breakdown["demo"] += 1
                    elif detail.get("origin") == "upstream":
                        verified_at = detail.get("verified_at")
                        raw_status = str(detail.get("status") or "").upper().strip()
                        if verified_at and (
                            "ABROG" in raw_status
                            or "PÉRIMÉ" in raw_status
                            or "PERIME" in raw_status
                        ):
                            is_abrogated = True
                            status_text = "ABROGE"
                            checked_at = str(verified_at)
                            reason = "verified"
                            reasons_breakdown["verified"] += 1
                        elif verified_at and raw_status in {"VIGUEUR", "EN VIGUEUR"}:
                            is_abrogated = False
                            status_text = "EN VIGUEUR"
                            checked_at = str(verified_at)
                            reason = "verified"
                            reasons_breakdown["verified"] += 1
                        else:
                            reason = "unverified_data"
                            unknown_laws += 1
                            reasons_breakdown["unverified_data"] += 1
                    else:
                        reason = "unverified_data"
                        unknown_laws += 1
                        reasons_breakdown["unverified_data"] += 1
                except SourceUnavailable:
                    detail = None
                    reason = "provider_outage"
                    unknown_laws += 1
                    reasons_breakdown["provider_outage"] += 1

            cache.set(
                f"law:validity:{source_id}",
                {
                    "source_id": source_id,
                    "status": status_text,
                    "is_abrogated": is_abrogated,
                    "reason": reason,
                    "checked_at": checked_at,
                    "attempted_at": timezone.now().isoformat(),
                },
                timeout=86400 * 7,
            )

            if is_abrogated and detail:
                abrogated_laws_found.append(
                    {
                        "document_id": str(doc.get("id", "")),
                        "document_title": str(doc.get("title", "")),
                        "source_id": source_id,
                        "law_title": str(detail.get("title", "")),
                        "status": str(detail.get("status", "")),
                    }
                )

    summary = {
        "status": "completed",
        "scanned_documents": total_docs_scanned,
        "checked_laws_count": total_laws_checked,
        "unknown_laws_count": unknown_laws,
        "reasons_breakdown": reasons_breakdown,
        "abrogated_laws_count": len(abrogated_laws_found),
        "abrogated_details": abrogated_laws_found,
        "executed_at": timezone.now().isoformat(),
    }

    cache.set("sources:law_validity_last_run", summary, timeout=86400 * 30)
    return summary
