"""CORDIS (Community Research and Development Information Service) Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_CORDIS_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "CORDIS-HORIZON-101042",
        "entity_type": "research",
        "display_mode": "card",
        "title": "OpenSovereignAI — Verified Open Source AI Models for European Public Services",
        "subtitle": "Horizon Europe Research Project · Grant 101042",
        "status": "Ongoing Project",
        "status_color": "blue",
        "meta1": "EU Contribution: €4,500,000",
        "meta2": "Coordinator: DINUM / Inria / Fraunhofer",
        "meta3": "Period: 2024-2027",
        "excerpt": (
            "Consortium project delivering transparent, audit-ready open-weights AI models, federated RAG retrieval, "
            "and multi-lingual conversational agents for sovereign administrations across Europe."
        ),
        "summary": "EU-funded research initiative under Horizon Europe for open public digital infrastructure.",
        "url": "https://cordis.europa.eu/project/id/101042",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "grant_id": "101042",
            "programme": "Horizon Europe",
            "nature": "RIA",
        },
    },
]


class CordisSourceProvider(DemoSourceProvider):
    """CORDIS Research & EURIO Knowledge Graph API provider."""

    source_type = "cordis"
    name = "CORDIS (Horizon Europe)"

    def __init__(self):
        self.mock_mode = os.getenv("CORDIS_MOCK_ENABLED", "true").lower() in (
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
                "type": "research",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_CORDIS_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_CORDIS_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
