"""Destatis Genesis REST API Official German Statistics Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_DESTATIS_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "DE-DESTATIS-VPI-2026",
        "entity_type": "statistics",
        "display_mode": "card",
        "title": "Verbraucherpreisindex (VPI) Deutschland — Inflationsrate",
        "subtitle": "Statistisches Bundesamt (Destatis) · Genesis-Online REST API",
        "status": "Amtliche Statistik",
        "status_color": "blue",
        "meta1": "Inflationsrate: +2.0%",
        "meta2": "Basisjahr: 2020 = 100",
        "meta3": "Monat: August 2026",
        "excerpt": (
            "Der Verbraucherpreisindex für Deutschland misst die durchschnittliche Preisentwicklung "
            "aller Waren und Dienstleistungen, die von privaten Haushalten für Konsumzwecke gekauft werden."
        ),
        "summary": "Amtliche monatliche Preisindex- und Inflationsstatistiken für Deutschland.",
        "url": "https://www-genesis.destatis.de/genesis/online",
        "verified_at": "18/09/2026",
        "raw_payload": {"code": "61111-0001", "name": "VPI Deutschland"},
    },
]


class DestatisSourceProvider(DemoSourceProvider):
    """Destatis Genesis-Online REST API provider."""

    source_type = "destatis"
    name = "Statistisches Bundesamt (Destatis)"

    def __init__(self):
        self.mock_mode = os.getenv("DESTATIS_MOCK_ENABLED", "true").lower() in (
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
                "type": "destatis",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_DESTATIS_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_DESTATIS_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
