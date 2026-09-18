"""KOOP Wettenbank Dutch National Legislation Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_NETHERLANDS_LAWS: List[SourceSearchResult] = [
    {
        "source_id": "NL-BW6-162",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Artikel 6:162 Burgerlijk Wetboek (BW) — Onrechtmatige daad",
        "subtitle": "Wettenbank · Rijksoverheid (Overheid.nl)",
        "status": "Geldend",
        "status_color": "green",
        "meta1": "BW Boek 6, Art. 162",
        "meta2": "Geldend vanaf: 01-01-1992",
        "meta3": "Rechtsgebied: Verbintenissenrecht",
        "excerpt": (
            "Hij die jegens een ander een onrechtmatige daad pleegt, welke hem kan worden toegerekend, "
            "is verplicht de schade die de ander dientengevolge lijdt, te vergoeden."
        ),
        "summary": "Fundamentele bepaling in het Nederlandse aansprakelijkheidsrecht.",
        "url": "https://wetten.overheid.nl/BWBR0005289/",
        "verified_at": "18/09/2026",
        "raw_payload": {"bwb_id": "BWBR0005289", "article": "6:162"},
    },
]


class WettenbankSourceProvider(DemoSourceProvider):
    """KOOP Wettenbank (Overheid.nl) API provider."""

    source_type = "wet"
    name = "KOOP Wettenbank (Overheid.nl)"

    def __init__(self):
        self.mock_mode = os.getenv("WETTEN_MOCK_ENABLED", "true").lower() in (
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
                "type": "wet",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_NETHERLANDS_LAWS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_NETHERLANDS_LAWS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
