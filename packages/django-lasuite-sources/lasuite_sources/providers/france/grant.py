"""Dispositifs d'aides & subventions publiques (Aides-Territoires / ANCT) source provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_GRANT_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "AIDE-ANCT-FV-2026-01",
        "entity_type": "grant",
        "display_mode": "card",
        "title": "Fonds Vert — Rénovation énergétique des bâtiments publics locaux",
        "subtitle": "Ministère de la Transition Écologique & ANCT",
        "status": "Candidatures ouvertes",
        "status_color": "green",
        "meta1": "Financeur : État (Fonds Vert)",
        "meta2": "Taux max : Jusqu'à 80% des dépenses",
        "meta3": "Clôture : 31/12/2026",
        "excerpt": (
            "Aide financière destinée aux collectivités territoriales pour financer les travaux "
            "de performance énergétique globale sur les écoles, mairies et équipements sportifs."
        ),
        "summary": "Subvention d'État pour accélérer la transition écologique et la décarbonation du patrimoine bâti public.",
        "url": "https://aides-territoires.beta.gouv.fr/aides/fonds-vert-renovation-batiments-publics/",
        "verified_at": "17/09/2026",
        "raw_payload": {
            "programme": "Fonds Vert",
            "taux_max": 80,
            "instructeur": "DDT / Préfecture",
            "beneficiaires": ["Communes", "EPCI", "Départements", "Régions"],
        },
    },
]


class GrantSourceProvider(DemoSourceProvider):
    """Public grants & financial aid provider (Aides-Territoires / ANCT)."""

    source_type = "grant"
    name = "Subventions & Aides-Territoires"

    def __init__(self):
        self.api_url = os.getenv(
            "AIDES_TERRITOIRES_API_URL", "https://aides-territoires.beta.gouv.fr/api"
        )
        self.mock_mode = os.getenv(
            "AIDES_TERRITOIRES_MOCK_ENABLED", "true"
        ).lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return super().is_enabled()

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "grant",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_GRANT_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_GRANT_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
