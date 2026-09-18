"""Centraal Bureau voor de Statistiek (CBS) StatLine Dutch Statistics Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
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


class CbsSourceProvider(BaseSourceProvider):
    """CBS StatLine OData REST API provider."""

    source_type = "cbs"
    name = "Centraal Bureau voor de Statistiek (CBS)"

    def __init__(self):
        self.mock_mode = os.getenv("CBS_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

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
        q = query.lower()
        matched = [
            item
            for item in MOCK_CBS_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_CBS_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_CBS_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
