"""Annuaire du Service Public & Contacts Institutionnels (DILA / People) source provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_AGENT_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "AGENT-DINUM-DIR",
        "entity_type": "agent",
        "display_mode": "card",
        "title": "Direction Interministérielle du Numérique — Secrétariat Général",
        "subtitle": "Services du Premier ministre (DINUM)",
        "status": "Annuaire Certifié DILA",
        "status_color": "blue",
        "meta1": "Courriel : contact@numerique.gouv.fr",
        "meta2": "Tél : 01 71 21 00 00",
        "meta3": "20 avenue de Ségur, 75007 Paris",
        "excerpt": (
            "Service administratif en charge de la coordination, de la sécurité et de la diffusion "
            "des technologies de l'information au sein des ministères de l'État."
        ),
        "summary": "Service public central de pilotage de la transformation numérique de l'État et des communs numériques.",
        "url": "https://lannuaire.service-public.fr/gouvernement/administration-centrale-ou-ministere_171970",
        "verified_at": "17/09/2026",
        "raw_payload": {
            "type_organisme": "administration_centrale",
            "code_insee": "75107",
            "horaires": "Du lundi au vendredi de 9h00 à 18h00",
        },
    },
]


class AgentSourceProvider(BaseSourceProvider):
    """Public administration directory and institutional contact provider."""

    source_type = "agent"
    name = "Annuaire du Service Public"

    def __init__(self):
        self.api_url = os.getenv("ANNUAIRE_DILA_API_URL", "https://api-lannuaire.service-public.fr/v1")
        self.mock_mode = os.getenv("ANNUAIRE_DILA_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "agent",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_AGENT_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
            or (item["summary"] and q in item["summary"].lower())
        ]
        return matched[:limit] if matched else MOCK_AGENT_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_AGENT_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
