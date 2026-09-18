"""Handelsregister German Corporate Registry Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_GERMANY_COMPANIES: List[SourceSearchResult] = [
    {
        "source_id": "DE-HRB-350269",
        "entity_type": "company",
        "display_mode": "card",
        "title": "SAP SE",
        "subtitle": "Amtsgericht Mannheim · Handelsregister B",
        "status": "Aktiv (HRB)",
        "status_color": "green",
        "meta1": "HRB: 350269",
        "meta2": "Sitz: Walldorf (Baden-Württemberg)",
        "meta3": "Rechtsform: Europäische Aktiengesellschaft (SE)",
        "summary": "Führender europäischer Entwickler von Unternehmenssoftware und Cloud-Technologien.",
        "url": "https://www.handelsregister.de/",
        "verified_at": "18/09/2026",
        "raw_payload": {"register_type": "HRB", "register_nr": "350269", "court": "Mannheim"},
    },
]


class HandelsregisterSourceProvider(BaseSourceProvider):
    """Gemeinsames Registerportal der Länder provider."""

    source_type = "register_de"
    name = "Handelsregister (Gemeinsames Registerportal)"

    def __init__(self):
        self.mock_mode = os.getenv("HANDELSREGISTER_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "register_de",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_GERMANY_COMPANIES
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_GERMANY_COMPANIES[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_GERMANY_COMPANIES:
            if item["source_id"] == source_id:
                return item
        return None
