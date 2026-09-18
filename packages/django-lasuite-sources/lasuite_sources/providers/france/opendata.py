"""Jeux de données ouverts & Open Data (data.gouv.fr / Etalab) source provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_OPENDATA_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "DATAGOUV-DS-6429",
        "entity_type": "opendata",
        "display_mode": "card",
        "title": "Base Sirene des entreprises et de leurs établissements (INSEE)",
        "subtitle": "data.gouv.fr — Ministère de l'Économie / INSEE",
        "status": "Jeu de données ouvert (Licence Ouverte)",
        "status_color": "blue",
        "meta1": "Format : CSV, JSON, Parquet",
        "meta2": "Fréquence : Quotidienne",
        "meta3": "Téléchargements : 4.8M/mois",
        "excerpt": (
            "Registre national complet de toutes les entreprises, associations et établissements "
            "publics immatriculés en France, mis à jour chaque nuit."
        ),
        "summary": "Jeu de données de référence du service public de la donnée certifié par l'INSEE.",
        "url": "https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/",
        "verified_at": "17/09/2026",
        "raw_payload": {
            "dataset_id": "586e5651a3a72931a30d49a3",
            "license": "etalab-2.0",
            "nb_resources": 12,
        },
    },
]


class OpenDataSourceProvider(DemoSourceProvider):
    """Open data catalog and datasets provider (data.gouv.fr / Etalab)."""

    source_type = "opendata"
    name = "Open Data data.gouv.fr"

    def __init__(self):
        self.api_url = os.getenv("DATAGOUV_API_URL", "https://www.data.gouv.fr/api/1")
        self.mock_mode = os.getenv("DATAGOUV_MOCK_ENABLED", "true").lower() in (
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
                "type": "opendata",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_OPENDATA_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_OPENDATA_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
