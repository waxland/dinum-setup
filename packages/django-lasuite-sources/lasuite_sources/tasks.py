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
    """
    law_provider = source_registry.get_provider("law")
    if not law_provider:
        logger.info("Law provider not active. Skipping check_laws_validity_task.")
        return {"status": "skipped", "reason": "law_provider_inactive"}

    cache = caches[getattr(settings, "LASUITE_SOURCES_CACHE_ALIAS", "default")]
    total_docs_scanned = 0
    total_laws_checked = 0
    unknown_laws = 0
    abrogated_laws_found: list[dict[str, str]] = []

    for doc in document_contents:
        total_docs_scanned += 1
        content_str = str(doc.get("content", ""))

        legi_ids = set(re.findall(r"LEGIARTI[0-9]{12}", content_str))
        jorf_ids = set(re.findall(r"JORFTEXT[0-9]{12}", content_str))
        all_ids = legi_ids | jorf_ids

        for source_id in all_ids:
            total_laws_checked += 1
            try:
                detail = source_registry.detail_with_cache("law", source_id)
            except SourceUnavailable:
                detail = None
            is_abrogated = None
            status_text = "unknown"
            checked_at = None
            if (
                detail
                and detail.get("origin") == "upstream"
                and detail.get("verified_at")
            ):
                status_text = (detail.get("status") or "").upper()
                if "ABROG" in status_text or "PÉRIMÉ" in status_text:
                    is_abrogated = True
                elif status_text in {"VIGUEUR", "EN VIGUEUR"}:
                    is_abrogated = False
                if is_abrogated is not None:
                    checked_at = detail["verified_at"]
            if is_abrogated is None:
                unknown_laws += 1
            cache.set(
                f"law:validity:{source_id}",
                {
                    "source_id": source_id,
                    "status": status_text if is_abrogated is not None else "unknown",
                    "is_abrogated": is_abrogated,
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
                        "law_title": detail.get("title", ""),
                        "status": detail.get("status", ""),
                    }
                )

    summary = {
        "status": "completed",
        "scanned_documents": total_docs_scanned,
        "checked_laws_count": total_laws_checked,
        "unknown_laws_count": unknown_laws,
        "abrogated_laws_count": len(abrogated_laws_found),
        "abrogated_details": abrogated_laws_found,
        "executed_at": timezone.now().isoformat(),
    }

    cache.set("sources:law_validity_last_run", summary, timeout=86400 * 30)
    return summary
