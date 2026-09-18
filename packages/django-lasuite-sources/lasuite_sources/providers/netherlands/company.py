"""Kamer van Koophandel (KVK) Handelsregister Dutch Corporate Registry Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_KVK_COMPANIES: List[SourceSearchResult] = [
    {
        "source_id": "NL-KVK-17085892",
        "entity_type": "company",
        "display_mode": "card",
        "title": "ASML Holding N.V.",
        "subtitle": "Kamer van Koophandel (KvK) Handelsregister",
        "status": "Actief (KvK)",
        "status_color": "green",
        "meta1": "KvK-nummer: 17085892",
        "meta2": "Vestigingsplaats: Veldhoven",
        "meta3": "Rechtsvorm: Naamloze Vennootschap (N.V.)",
        "summary": "Wereldwijd toonaangevende leverancier van fotolithografiesystemen voor de halfgeleiderindustrie.",
        "url": "https://www.kvk.nl/bestellen/#/17085892",
        "verified_at": "18/09/2026",
        "raw_payload": {"kvk_nr": "17085892", "legal_form": "NV"},
    },
]


class KvkSourceProvider(DemoSourceProvider):
    """KVK Handelsregister API v2 provider."""

    source_type = "kvk"
    name = "KVK Handelsregister"

    def __init__(self):
        self.mock_mode = os.getenv("KVK_MOCK_ENABLED", "true").lower() in (
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
                "type": "kvk",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_KVK_COMPANIES, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_KVK_COMPANIES:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
