"""Démarches administratives en ligne (Démarches-Simplifiées.fr / DINUM) source provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_DEMARCHE_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "DS-PROC-84290",
        "entity_type": "demarche",
        "display_mode": "card",
        "title": "Demande d'accès et d'habilitation aux services La Suite Numérique",
        "subtitle": "Direction Interministérielle du Numérique (DINUM)",
        "status": "Formulaire Actif",
        "status_color": "green",
        "meta1": "Procédure n° 84290",
        "meta2": "Délai moyen d'instruction : 48h",
        "meta3": "Organisme : DINUM / SG",
        "excerpt": (
            "Démarche simplifiée permettant aux référents ministériels de solliciter l'ouverture "
            "d'une instance organisationnelle sur La Suite Docs, Meet et People."
        ),
        "summary": "Téléprocédure officielle de raccordement des ministères et administrations publiques.",
        "url": "https://www.demarches-simplifiees.fr/commencer/habilitation-lasuite-numerique",
        "verified_at": "17/09/2026",
        "raw_payload": {
            "procedure_id": "84290",
            "statut_procedure": "publiee",
            "dossiers_traites": 4250,
        },
    },
]


class DemarcheSourceProvider(BaseSourceProvider):
    """Administrative online forms and procedures provider (Démarches-Simplifiées.fr)."""

    source_type = "demarche"
    name = "Démarches-Simplifiées"

    def __init__(self):
        self.api_url = os.getenv("DEMARCHES_SIMPLIFIEES_API_URL", "https://www.demarches-simplifiees.fr/api/v2/graphql")
        self.mock_mode = os.getenv("DEMARCHES_SIMPLIFIEES_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "demarche",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_DEMARCHE_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
            or (item["summary"] and q in item["summary"].lower())
        ]
        return matched[:limit] if matched else MOCK_DEMARCHE_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_DEMARCHE_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
