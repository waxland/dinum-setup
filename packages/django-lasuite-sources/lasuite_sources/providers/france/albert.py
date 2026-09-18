"""Albert API (DINUM / Etalab Sovereign RAG AI) source provider."""

import logging
import os
from typing import List, Optional

import requests

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

ALBERT_DEFAULT_URL = "https://albert.api.etalab.gouv.fr/v1"

MOCK_ALBERT_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "ALBERT-RAG-FP-001",
        "entity_type": "custom",
        "display_mode": "callout",
        "title": "Préavis de démission d'un agent contractuel de la fonction publique",
        "subtitle": "Synthèse Albert (Décret n° 86-83 du 17 janvier 1986 - Art. 48)",
        "status": "Certifié Albert RAG",
        "status_color": "purple",
        "meta1": "Source : DGAFP / Service-Public",
        "meta2": "Modèle : Albert-Large-Fr-v2",
        "meta3": "Confiance RAG : 96%",
        "excerpt": (
            "L'agent contractuel qui démissionne doit respecter un préavis dont la durée varie selon "
            "son ancienneté : 8 jours si l'ancienneté est inférieure à 6 mois, 1 mois si elle est "
            "comprise entre 6 mois et 2 ans, et 2 mois si elle est d'au moins 2 ans."
        ),
        "summary": (
            "Durée légale du préavis de démission applicable aux agents non titulaires des trois "
            "versants de la fonction publique (État, Territoriale, Hospitalière)."
        ),
        "url": "https://albert.etalab.gouv.fr",
        "verified_at": "17/09/2026",
        "raw_payload": {
            "model": "albert-large-fr-v2",
            "prompt_tokens": 124,
            "completion_tokens": 85,
            "citations": ["LEGIARTI000006487823"],
        },
    },
]


class AlbertSourceProvider(BaseSourceProvider):
    """
    Sovereign RAG AI provider using Albert API (Etalab / DINUM).
    Provides factual, source-backed answers to administrative & legal questions.
    """

    source_type = "custom"
    name = "Albert (IA Souveraine DINUM)"

    def __init__(self):
        self.api_url = os.getenv("ALBERT_API_URL", ALBERT_DEFAULT_URL).rstrip("/")
        self.api_key = os.getenv("ALBERT_API_KEY", "")
        self.mock_mode = os.getenv("ALBERT_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return self.mock_mode or bool(self.api_key)

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "custom",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        if not self.mock_mode and self.api_key:
            try:
                resp = requests.post(
                    f"{self.api_url}/search",
                    headers={"Authorization": f"Bearer {self.api_key}"},
                    json={"query": query, "limit": limit},
                    timeout=4.0,
                )
                if resp.status_code == 200:
                    data = resp.json()
                    items = data.get("data", [])
                    if items:
                        return items
            except Exception as e:
                logger.warning("Albert API call failed, falling back to mock: %s", e)

        q = query.lower()
        matched = [
            item
            for item in MOCK_ALBERT_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["excerpt"] and q in item["excerpt"].lower())
            or (item["summary"] and q in item["summary"].lower())
        ]
        return matched[:limit] if matched else MOCK_ALBERT_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_ALBERT_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
