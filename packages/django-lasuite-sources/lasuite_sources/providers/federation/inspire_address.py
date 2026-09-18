"""INSPIRE Harmonized European Address Federation Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_INSPIRE_ADDRESSES: List[SourceSearchResult] = [
    {
        "source_id": "INSPIRE-ADR-FR-75107",
        "entity_type": "address",
        "display_mode": "card",
        "title": "20 avenue de Ségur, 75007 Paris, France",
        "subtitle": "INSPIRE European Address Directive · National Node (BAN IGN)",
        "status": "INSPIRE HVD Certified",
        "status_color": "green",
        "meta1": "Country: France (FR)",
        "meta2": "GPS: 48.8504° N, 2.3082° E",
        "meta3": "Standard: OGC API Features / INSPIRE",
        "summary": "European address resolved via national High-Value Dataset (HVD) open endpoint.",
        "url": "https://inspire.ec.europa.eu/",
        "verified_at": "18/09/2026",
        "raw_payload": {"inspire_theme": "Addresses", "country": "FR"},
    },
]


class InspireAddressFederatedProvider(BaseSourceProvider):
    """INSPIRE European Addresses Federated Provider."""

    source_type = "eu_address"
    name = "INSPIRE European Address Federation"

    def __init__(self):
        self.mock_mode = os.getenv("INSPIRE_ADR_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "address",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_INSPIRE_ADDRESSES
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_INSPIRE_ADDRESSES[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_INSPIRE_ADDRESSES:
            if item["source_id"] == source_id:
                return item
        return None
