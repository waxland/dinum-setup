"""OECD (Organisation for Economic Co-operation and Development) Data Explorer Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_OECD_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "OECD-PISA-2026",
        "entity_type": "statistics",
        "display_mode": "card",
        "title": "OECD Programme for International Student Assessment (PISA) Indicators",
        "subtitle": "OECD Data Explorer · SDMX REST API",
        "status": "Official OECD Data",
        "status_color": "blue",
        "meta1": "Domain: Education & Skills",
        "meta2": "Frequency: Triennial",
        "meta3": "Participating: 85 Countries",
        "summary": "International evaluation measuring 15-year-olds' reading, mathematics and science literacy.",
        "url": "https://data-explorer.oecd.org/",
        "verified_at": "18/09/2026",
        "raw_payload": {"agency": "OECD", "flow": "PISA"},
    },
]


class OecdSourceProvider(DemoSourceProvider):
    """OECD SDMX REST API provider."""

    source_type = "oecd"
    name = "OECD Data Explorer"

    def __init__(self):
        self.mock_mode = os.getenv("OECD_MOCK_ENABLED", "true").lower() in (
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
                "type": "oecd",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_OECD_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_OECD_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
