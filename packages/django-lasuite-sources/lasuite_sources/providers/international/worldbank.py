"""World Bank Open Data API Global Economic Indicators Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_WORLDBANK_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "WB-NY-GDP-MKTP-CD",
        "entity_type": "statistics",
        "display_mode": "card",
        "title": "World Bank Indicator — GDP (current US$) Worldwide",
        "subtitle": "World Development Indicators (WDI) · World Bank API v2",
        "status": "Official World Bank Data",
        "status_color": "blue",
        "meta1": "Indicator: NY.GDP.MKTP.CD",
        "meta2": "Global Coverage: 217 Economies",
        "meta3": "Source: World Bank WDI",
        "excerpt": (
            "GDP at purchaser's prices is the sum of gross value added by all resident producers "
            "in the economy plus any product taxes and minus any subsidies not included in the value of the products."
        ),
        "summary": "Core macroeconomic indicator published annually by the World Bank.",
        "url": "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD",
        "verified_at": "18/09/2026",
        "raw_payload": {"indicator": "NY.GDP.MKTP.CD", "source": "WDI"},
    },
]


class WorldBankSourceProvider(BaseSourceProvider):
    """World Bank Open Data API v2 provider."""

    source_type = "worldbank"
    name = "World Bank Open Data"

    def __init__(self):
        self.mock_mode = os.getenv("WORLDBANK_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "worldbank",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_WORLDBANK_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_WORLDBANK_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_WORLDBANK_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
