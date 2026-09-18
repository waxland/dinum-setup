"""Kadaster Basisregistratie Adressen en Gebouwen (BAG) Dutch Address Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_BAG_ADDRESSES: List[SourceSearchResult] = [
    {
        "source_id": "NL-BAG-0503200000123456",
        "entity_type": "address",
        "display_mode": "card",
        "title": "Turfmarkt 147, 2511 DP Den Haag",
        "subtitle": "Ministerie van Binnenlandse Zaken en Koninkrijksrelaties (BZK)",
        "status": "BAG Gecertificeerd",
        "status_color": "green",
        "meta1": "Gemeente: Den Haag (0518)",
        "meta2": "GPS: 52.0789° N, 4.3184° E",
        "meta3": "Status: Verblijfsobject in gebruik",
        "summary": "Hoofdvestiging van het Ministerie van BZK te Den Haag.",
        "url": "https://bagviewer.kadaster.nl/",
        "verified_at": "18/09/2026",
        "raw_payload": {"bag_id": "0503200000123456", "postcode": "2511DP", "huisnummer": 147},
    },
]


class BagSourceProvider(BaseSourceProvider):
    """Kadaster BAG API v2 (Geonovum / PDOK) provider."""

    source_type = "bag"
    name = "Kadaster BAG (Adressen en Gebouwen)"

    def __init__(self):
        self.mock_mode = os.getenv("BAG_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "bag",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_BAG_ADDRESSES
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_BAG_ADDRESSES[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_BAG_ADDRESSES:
            if item["source_id"] == source_id:
                return item
        return None
