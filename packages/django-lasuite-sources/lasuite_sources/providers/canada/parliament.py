"""House of Commons Canada & LEGISinfo Parliament Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_PARLIAMENT_CA_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "CAN-BILL-44-1-C27",
        "entity_type": "parliament",
        "display_mode": "callout",
        "title": "Bill C-27 — Digital Charter Implementation Act / Loi sur la charte numérique",
        "subtitle": "44th Parliament, 1st Session · House of Commons Canada",
        "status": "In Committee",
        "status_color": "blue",
        "meta1": "Bill Number: C-27",
        "meta2": "Sponsor: Minister of Innovation",
        "meta3": "Session: 44-1",
        "excerpt": (
            "An Act to enact the Consumer Privacy Protection Act, the Personal Information and Data Protection Tribunal Act "
            "and the Artificial Intelligence and Data Act and to make consequential amendments to other Acts."
        ),
        "summary": "Major Canadian legislative overhaul of federal privacy laws and artificial intelligence regulation.",
        "url": "https://www.parl.ca/legisinfo/en/bill/44-1/c-27",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "bill_id": "C-27",
            "parliament": "44",
            "chamber": "House of Commons",
        },
    },
]


class ParliamentCanadaSourceProvider(DemoSourceProvider):
    """House of Commons Canada Open Data & LEGISinfo XML/REST provider."""

    source_type = "parliament_ca"
    name = "Parliament of Canada / LEGISinfo"

    def __init__(self):
        self.mock_mode = os.getenv("PARL_CA_MOCK_ENABLED", "true").lower() in (
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
                "type": "parliament_ca",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_PARLIAMENT_CA_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_PARLIAMENT_CA_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
