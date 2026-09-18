"""Avis de Marchés Publics & BOAMP (DILA / DAE) source provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_PROCUREMENT_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "BOAMP-26-042819",
        "entity_type": "procurement",
        "display_mode": "card",
        "title": "Fourniture et déploiement d'une infrastructure cloud souveraine",
        "subtitle": "Direction Interministérielle du Numérique (DINUM)",
        "status": "En cours (Offres ouvertes)",
        "status_color": "blue",
        "meta1": "AAPC n° 26-042819",
        "meta2": "Procédure adaptée (MAPA)",
        "meta3": "Clôture : 15/10/2026 à 12h00",
        "excerpt": (
            "Le présent marché a pour objet l'acquisition de prestations d'hébergement qualifié "
            "SecNumCloud pour les services interministériels de La Suite Numérique."
        ),
        "summary": "Marché interministériel d'infrastructure cloud souveraine pour 250 000 agents de l'État.",
        "url": "https://www.boamp.fr/pages/avis/?q=idweb:26-042819",
        "verified_at": "17/09/2026",
        "raw_payload": {
            "num_avis": "26-042819",
            "cpv": "72315000",
            "montant_estime_ht": 1200000,
            "criteres": {
                "Prix": 40,
                "Valeur technique": 40,
                "RSE / Empreinte carbone": 20,
            },
        },
    },
]


class ProcurementSourceProvider(DemoSourceProvider):
    """Public procurement provider (BOAMP / DAE / PISTE)."""

    source_type = "procurement"
    name = "Marchés Publics & BOAMP"

    def __init__(self):
        self.api_url = os.getenv("BOAMP_API_URL", "https://api.boamp.fr/v1")
        self.mock_mode = os.getenv("BOAMP_MOCK_ENABLED", "true").lower() in (
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
                "type": "procurement",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_PROCUREMENT_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_PROCUREMENT_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
