"""Statistics Canada / Statistique Canada WDS & SDMX Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_STATCAN_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "STATCAN-CPI-18100004",
        "entity_type": "statistics",
        "display_mode": "card",
        "title": "Consumer Price Index (CPI) Canada — Annual Inflation Rate",
        "subtitle": "Statistics Canada · Web Data Service (WDS API)",
        "status": "Official StatCan Data",
        "status_color": "blue",
        "meta1": "All-items CPI: +2.5%",
        "meta2": "Geography: Canada",
        "meta3": "Table: 18-10-0004-01",
        "excerpt": (
            "The Consumer Price Index (CPI) represents changes in consumer prices experienced by Canadians. "
            "It measures price changes by comparing, through time, the cost of a fixed basket of goods and services."
        ),
        "summary": "Official monthly Canadian consumer price inflation index and key economic indicators.",
        "url": "https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000401",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "product_id": "1810000401",
            "geo": "Canada",
            "frequency": "Monthly",
        },
    },
]


class StatCanSourceProvider(DemoSourceProvider):
    """Statistics Canada Web Data Service (WDS) API provider."""

    source_type = "statcan"
    name = "Statistics Canada / StatCan"

    def __init__(self):
        self.mock_mode = os.getenv("STATCAN_MOCK_ENABLED", "true").lower() in (
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
                "type": "statcan",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_STATCAN_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_STATCAN_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
