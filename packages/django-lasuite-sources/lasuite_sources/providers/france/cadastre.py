"""Cadastre & Parcelles Foncières (DGFiP / Géoplateforme IGN) source provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_CADASTRE_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "CAD-75107-000-AK-0042",
        "entity_type": "cadastre",
        "display_mode": "card",
        "title": "Parcelle Section AK n° 0042 (Paris 7e)",
        "subtitle": "DGFiP / IGN — Commune de Paris 7e (75107)",
        "status": "Cadastre Certifié DGFiP",
        "status_color": "green",
        "meta1": "Contenance : 14 520 m²",
        "meta2": "Feuille : 000 AK 01",
        "meta3": "Mise à jour : 01/01/2026",
        "excerpt": (
            "Parcelle foncière administrative située au 20 avenue de Ségur. Affectation domaine public "
            "de l'État — Ensemble immobilier Ségur-Fontenoy."
        ),
        "summary": "Parcelle cadastrale officielle issue du plan cadastral vectoriel informatisé (PCI-Vecteur).",
        "url": "https://cadastre.data.gouv.fr/map?parcelle=75107000AK0042",
        "verified_at": "17/09/2026",
        "raw_payload": {
            "section": "AK",
            "numero": "0042",
            "contenance_m2": 14520,
            "code_commune": "75107",
            "adresse": "20 avenue de Ségur, 75007 Paris",
        },
    },
]


class CadastreSourceProvider(DemoSourceProvider):
    """Cadastral parcel information provider (DGFiP / IGN Géoplateforme)."""

    source_type = "cadastre"
    name = "Cadastre & Parcelles (DGFiP)"

    def __init__(self):
        self.api_url = os.getenv(
            "CADASTRE_API_URL", "https://apicadastre.data.gouv.fr/v1"
        )
        self.mock_mode = os.getenv("CADASTRE_MOCK_ENABLED", "true").lower() in (
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
                "type": "cadastre",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_CADASTRE_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_CADASTRE_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
