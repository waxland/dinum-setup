"""CanadaBuys Canadian Federal Public Procurement Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_CANADABUYS_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "CANADABUYS-WS428901",
        "entity_type": "procurement",
        "display_mode": "card",
        "title": "Federal Sovereign Cloud & Digital Workspace Infrastructure Procurement",
        "subtitle": "Public Services and Procurement Canada (PSPC / SPAC)",
        "status": "Active Tender",
        "status_color": "blue",
        "meta1": "Solicitation: WS428901",
        "meta2": "Buyer: Shared Services Canada",
        "meta3": "Closing: 2026-12-15",
        "excerpt": (
            "Public tender notice for the acquisition of sovereign cloud hosting, collaborative office software, "
            "and secure enterprise identity integrations for federal departments across Canada."
        ),
        "summary": "Major Canadian federal public tender for digital sovereignty and open government software.",
        "url": "https://canadabuys.canada.ca/en/tender-opportunities/ws428901",
        "verified_at": "18/09/2026",
        "raw_payload": {"solicitation_number": "WS428901", "gsin": "D302A"},
    },
]


class CanadaBuysSourceProvider(DemoSourceProvider):
    """CanadaBuys Federal Procurement Open Data & Search provider."""

    source_type = "canadabuys"
    name = "CanadaBuys (Federal Procurement)"

    def __init__(self):
        self.mock_mode = os.getenv("CANADABUYS_MOCK_ENABLED", "true").lower() in (
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
                "type": "canadabuys",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_CANADABUYS_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_CANADABUYS_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
