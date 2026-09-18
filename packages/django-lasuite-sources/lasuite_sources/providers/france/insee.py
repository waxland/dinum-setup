"""Données territoriales & statistiques locales INSEE source provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_INSEE_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "INSEE-COM-75056",
        "entity_type": "insee",
        "display_mode": "card",
        "title": "Chiffres clés de la Ville de Paris (75056)",
        "subtitle": "INSEE — Recensement de la Population (RP 2024)",
        "status": "Données Certifiées INSEE",
        "status_color": "blue",
        "meta1": "Population municipale : 2 133 111 hab.",
        "meta2": "Densité : 20 238 hab./km²",
        "meta3": "Emplois totaux : 1 842 500",
        "excerpt": (
            "Paris concentre 17,2% des emplois de la région Île-de-France avec un taux d'activité "
            "des 15-64 ans s'élevant à 78,4%."
        ),
        "summary": "Statistiques officielles de population, d'emploi et de logement produites par l'INSEE.",
        "url": "https://www.insee.fr/fr/statistiques/zones/75056",
        "verified_at": "17/09/2026",
        "raw_payload": {
            "code_insee": "75056",
            "population_totale": 2133111,
            "superficie_km2": 105.4,
            "revenu_median_uc": 29840,
        },
    },
]


class InseeSourceProvider(DemoSourceProvider):
    """INSEE regional and municipal statistical indicators provider."""

    source_type = "insee"
    name = "Statistiques Territoriales INSEE"

    def __init__(self):
        self.api_url = os.getenv(
            "INSEE_API_URL", "https://api.insee.fr/donnees-locales/v0.1"
        )
        self.mock_mode = os.getenv("INSEE_MOCK_ENABLED", "true").lower() in (
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
                "type": "insee",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_INSEE_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_INSEE_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
