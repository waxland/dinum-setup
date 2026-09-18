"""WHO (World Health Organization) Global Health Observatory Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_WHO_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "WHO-GHO-LIFE-EXPECTANCY",
        "entity_type": "statistics",
        "display_mode": "card",
        "title": "WHO Indicator — Life Expectancy at Birth (Global Health Observatory)",
        "subtitle": "World Health Organization · Athena OData API",
        "status": "Official WHO Data",
        "status_color": "blue",
        "meta1": "Indicator: WHOSIS_000001",
        "meta2": "Global Avg: 73.4 years",
        "meta3": "Scope: 194 Member States",
        "summary": "Official worldwide life expectancy and global health statistical dataset.",
        "url": "https://www.who.int/data/gho",
        "verified_at": "18/09/2026",
        "raw_payload": {"code": "WHOSIS_000001", "agency": "WHO"},
    },
]


class WhoSourceProvider(DemoSourceProvider):
    """WHO Global Health Observatory OData / REST API provider."""

    source_type = "who"
    name = "World Health Organization (WHO GHO)"

    def __init__(self):
        self.mock_mode = os.getenv("WHO_MOCK_ENABLED", "true").lower() in (
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
                "type": "who",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_WHO_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_WHO_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
