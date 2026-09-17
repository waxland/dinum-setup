"""Celery tasks for sovereign sources monitoring and law abrogation detection."""

import datetime as dt
import logging
from typing import Any, Dict, List

from django.core.cache import cache
from django.utils import timezone

from lasuite_sources.registry import source_registry

logger = logging.getLogger(__name__)


def check_laws_validity_task(document_contents: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Task scanning document contents for legal citations (Légifrance LEGIARTI / JORFTEXT IDs)
    and verifying their current validity against the LawSourceProvider.
    Flags abrogated articles and updates cache.
    """
    law_provider = source_registry.get_provider("law")
    if not law_provider:
        logger.info("Law provider not active. Skipping check_laws_validity_task.")
        return {"status": "skipped", "reason": "law_provider_inactive"}

    total_docs_scanned = 0
    total_laws_checked = 0
    abrogated_laws_found: List[Dict[str, str]] = []

    for doc in document_contents:
        total_docs_scanned += 1
        content_str = str(doc.get("content", ""))

        import re

        legi_ids = set(re.findall(r"LEGIARTI[0-9]{12}", content_str))
        jorf_ids = set(re.findall(r"JORFTEXT[0-9]{12}", content_str))
        all_ids = legi_ids | jorf_ids

        for source_id in all_ids:
            total_laws_checked += 1
            detail = law_provider.get_detail(source_id)
            if detail:
                status_text = (detail.get("status") or "").upper()
                is_abrogated = "ABROG" in status_text or "PÉRIMÉ" in status_text

                validity_cache_key = f"law:validity:{source_id}"
                cache.set(
                    validity_cache_key,
                    {
                        "source_id": source_id,
                        "status": detail.get("status"),
                        "is_abrogated": is_abrogated,
                        "checked_at": timezone.now().isoformat(),
                    },
                    timeout=86400 * 7,
                )

                if is_abrogated:
                    abrogated_laws_found.append(
                        {
                            "document_id": str(doc.get("id", "")),
                            "document_title": doc.get("title", ""),
                            "source_id": source_id,
                            "law_title": detail.get("title", ""),
                            "status": detail.get("status", ""),
                        }
                    )

    summary = {
        "status": "completed",
        "scanned_documents": total_docs_scanned,
        "checked_laws_count": total_laws_checked,
        "abrogated_laws_count": len(abrogated_laws_found),
        "abrogated_details": abrogated_laws_found,
        "executed_at": timezone.now().isoformat(),
    }

    cache.set("sources:law_validity_last_run", summary, timeout=86400 * 30)
    return summary
