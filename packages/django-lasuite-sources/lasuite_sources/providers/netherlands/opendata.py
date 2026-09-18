"""Data.overheid.nl Dutch Open Data Portal Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_DATAOVERHEID_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "NL-DATAOVERHEID-DS-GEO-2026",
        "entity_type": "opendata",
        "display_mode": "card",
        "title": "Bestuurlijke Grenzen Nederland (Gemeenten en Provincies GeoJSON)",
        "subtitle": "Kadaster · Data.overheid.nl CKAN API",
        "status": "Publiek Domein (CC0)",
        "status_color": "blue",
        "meta1": "Formaat: GeoJSON, WFS, Shapefile",
        "meta2": "Uitgever: Kadaster",
        "meta3": "Dekking: Nederland",
        "summary": "Officiële dataset met de geografische en bestuurlijke grenzen van Nederlandse gemeenten en provincies.",
        "url": "https://data.overheid.nl/dataset/bestuurlijke-grenzen",
        "verified_at": "18/09/2026",
        "raw_payload": {"ckan_id": "bestuurlijke-grenzen", "license": "CC0"},
    },
]


class DataOverheidSourceProvider(DemoSourceProvider):
    """Data.overheid.nl CKAN API provider."""

    source_type = "dataoverheid"
    name = "Data.overheid.nl"

    def __init__(self):
        self.mock_mode = os.getenv("DATAOVERHEID_MOCK_ENABLED", "true").lower() in (
            "true",
            "1",
            "yes",
        )

    def is_enabled(self) -> bool:
        return super().is_enabled()

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "dataoverheid",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_DATAOVERHEID_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_DATAOVERHEID_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
