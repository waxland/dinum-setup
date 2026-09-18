"""BRIS (Business Registers Interconnection System) European Corporate Federation Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_BRIS_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "EUID-FR-130025265",
        "entity_type": "company",
        "display_mode": "card",
        "title": "Direction Interministérielle du Numérique (DINUM)",
        "subtitle": "BRIS European Interconnection · France (EUID: FR-130025265)",
        "status": "Active (EUID Verified)",
        "status_color": "green",
        "meta1": "EUID: FR-130025265",
        "meta2": "Country: France (FR)",
        "meta3": "National Register: RNE / SIRENE",
        "summary": "European federated corporate entity verified across EU national registers via BRIS network.",
        "url": "https://e-justice.europa.eu/content_business_registers_in_member_states-106-en.do",
        "verified_at": "18/09/2026",
        "raw_payload": {"euid": "FR-130025265", "country": "FR", "source": "BRIS"},
    },
    {
        "source_id": "EUID-DE-HRB-350269",
        "entity_type": "company",
        "display_mode": "card",
        "title": "SAP SE (European SE)",
        "subtitle": "BRIS European Interconnection · Germany (EUID: DE-HRB-350269)",
        "status": "Active (EUID Verified)",
        "status_color": "green",
        "meta1": "EUID: DE-HRB-350269",
        "meta2": "Country: Germany (DE)",
        "meta3": "National Register: Handelsregister",
        "summary": "European federated corporate entity verified across EU national registers via BRIS network.",
        "url": "https://e-justice.europa.eu/",
        "verified_at": "18/09/2026",
        "raw_payload": {"euid": "DE-HRB-350269", "country": "DE", "source": "BRIS"},
    },
]


class BrisFederatedSourceProvider(DemoSourceProvider):
    """BRIS European Business Registers federation provider."""

    source_type = "eu_company"
    name = "BRIS European Companies Federation"

    def __init__(self):
        self.mock_mode = os.getenv("BRIS_MOCK_ENABLED", "true").lower() in (
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
                "type": "company",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_BRIS_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_BRIS_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
