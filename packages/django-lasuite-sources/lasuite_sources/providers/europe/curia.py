"""CURIA & ECLI Court of Justice of the European Union Case Law Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_CURIA_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "ECLI:EU:C:2024:42",
        "entity_type": "case-law",
        "display_mode": "callout",
        "title": "Judgment of the Court (Grand Chamber) — Case C-42/24 (Data Protection & Law Enforcement)",
        "subtitle": "Court of Justice of the European Union (CJUE) · Luxembourg",
        "status": "Final Judgment",
        "status_color": "green",
        "meta1": "Case: C-42/24",
        "meta2": "ECLI:EU:C:2024:42",
        "meta3": "Date: 14/06/2024",
        "excerpt": (
            "Article 6(1) of Regulation (EU) 2016/679 must be interpreted as precluding the processing "
            "of personal data by public authorities in the absence of a clear and accessible legal basis."
        ),
        "summary": "CJEU landmark judgment on legal grounds for personal data processing under GDPR.",
        "url": "https://curia.europa.eu/juris/liste.jsf?num=C-42/24",
        "verified_at": "18/09/2026",
        "raw_payload": {"case_num": "C-42/24", "court": "Court of Justice", "ecli": "ECLI:EU:C:2024:42"},
    },
]


class CuriaSourceProvider(BaseSourceProvider):
    """CURIA & European Case Law Identifier (ECLI) API provider."""

    source_type = "curia"
    name = "CURIA / ECLI (Court of Justice of the EU)"

    def __init__(self):
        self.mock_mode = os.getenv("CURIA_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "case-law",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_CURIA_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_CURIA_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_CURIA_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
