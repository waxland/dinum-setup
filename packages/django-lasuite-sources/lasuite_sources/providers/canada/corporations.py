"""Corporations Canada Federal Corporate Registry Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_CORPORATIONS_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "CORP-CA-1234567-8",
        "entity_type": "company",
        "display_mode": "card",
        "title": "Shared Services Canada / Services partagés Canada",
        "subtitle": "Government of Canada Agency · Ottawa, ON",
        "status": "Active / En vigueur",
        "status_color": "green",
        "meta1": "Corporation #: 1234567-8",
        "meta2": "Business #: 849201948",
        "meta3": "Governing Act: Financial Admin Act",
        "summary": "Federal institution delivering modern, reliable and secure digital infrastructure and network services to Canadian government departments.",
        "url": "https://ised-isde.canada.ca/cc/lgcy/fdrlCrpDtls.html?corpId=1234567",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "corp_id": "1234567",
            "bn9": "849201948",
            "jurisdiction": "Federal",
        },
    },
]


class CorporationsCanadaSourceProvider(DemoSourceProvider):
    """Corporations Canada REST / JSON API provider."""

    source_type = "corporation_ca"
    name = "Corporations Canada"

    def __init__(self):
        self.mock_mode = os.getenv("CORP_CA_MOCK_ENABLED", "true").lower() in (
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
                "type": "corporation_ca",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_CORPORATIONS_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_CORPORATIONS_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
