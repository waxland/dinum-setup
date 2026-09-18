"""Centraal Bureau voor de Statistiek (CBS) StatLine Dutch Statistics Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_CBS_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "NL-CBS-CPI-2026",
        "entity_type": "statistics",
        "display_mode": "card",
        "title": "Consumentenprijsindex (CPI) Nederland — Inflatiecijfers",
        "subtitle": "Centraal Bureau voor de Statistiek (CBS) · StatLine OData API",
        "status": "Officiële CBS Data",
        "status_color": "blue",
        "meta1": "CPI Inflatie: +2.4%",
        "meta2": "Regio: Nederland",
        "meta3": "Periode: Augustus 2026",
        "excerpt": (
            "De consumentenprijsindex (CPI) meet de prijsontwikkeling van een pakket goederen en diensten "
            "zoals dat gemiddeld door Nederlandse huishoudens wordt aangeschaft."
        ),
        "summary": "Officiële maandelijkse prijsindex en inflatiestatistieken van het CBS.",
        "url": "https://opendata.cbs.nl/statline/",
        "verified_at": "18/09/2026",
        "raw_payload": {"table_id": "83131NED", "topic": "CPI"},
    },
]


class CbsSourceProvider(DemoSourceProvider):
    """CBS StatLine OData REST API provider."""

    source_type = "cbs"
    name = "Centraal Bureau voor de Statistiek (CBS)"

    def __init__(self):
        self.mock_mode = os.getenv("CBS_MOCK_ENABLED", "true").lower() in (
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
                "type": "cbs",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_CBS_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_CBS_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
