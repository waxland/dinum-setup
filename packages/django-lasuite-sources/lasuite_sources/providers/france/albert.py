"""Albert API (DINUM / Etalab Sovereign RAG AI) source provider."""

import logging
import os
import unicodedata
from typing import List, Optional

from django.conf import settings
from django.utils import timezone

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.transport import get_json
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
    Requires server-side ALBERT_API_KEY environment variable.
    When unconfigured, stays explicitly disabled (is_enabled=False).
    """

    source_type = "custom"
    name = "Albert (IA Souveraine DINUM)"

    def __init__(self):
        self.api_url = os.getenv("ALBERT_API_URL", ALBERT_DEFAULT_URL).rstrip("/")
        self.api_key = os.getenv("ALBERT_API_KEY", "").strip()

    def is_enabled(self) -> bool:
        """
        In live mode, enabled only if ALBERT_API_KEY is configured.
        In demo mode, enabled if LASUITE_SOURCES_DEMO is True.
        """
        if getattr(settings, "LASUITE_SOURCES_DEMO", False):
            return True
        return bool(self.api_key)

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "custom",
            }
            for r in self.search(query=query, limit=limit)
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        if not query or not query.strip():
            return []

        bounded_limit = min(max(1, limit), 50)

        if getattr(settings, "LASUITE_SOURCES_DEMO", False):

            def normalize(value: str) -> str:
                return "".join(
                    c
                    for c in unicodedata.normalize("NFKD", value.casefold())
                    if not unicodedata.combining(c)
                )

            norm_query = normalize(query.strip())
            return [
                {
                    **item,
                    "origin": "demo",
                    "provider": self.source_type,
                    "verified_at": None,
                    "status": "Demonstration",
                }
                for item in MOCK_ALBERT_RESULTS
                if norm_query in normalize(item["title"])
                or norm_query in normalize(item.get("excerpt", ""))
                or norm_query in normalize(item.get("summary", ""))
            ][:bounded_limit]

        if not self.api_key:
            raise SourceUnavailable("Albert API key (ALBERT_API_KEY) not configured")

        # Official Albert API /v1/search endpoint call with server-side Bearer token
        try:
            data = get_json(
                f"{self.api_url}/search",
                allowed_hosts=frozenset({"albert.api.etalab.gouv.fr"}),
                params={"q": query.strip(), "limit": bounded_limit},
            )
        except Exception as err:
            logger.warning("Albert API live request failed: %s", err)
            raise SourceUnavailable("Albert API service unavailable") from err

        if not isinstance(data, dict) or not isinstance(data.get("results"), list):
            raise SourceUnavailable("Invalid Albert API response format")

        results: List[SourceSearchResult] = []
        for item in data["results"][:bounded_limit]:
            if not isinstance(item, dict):
                continue
            s_id = item.get("id") or item.get("source_id")
            title = item.get("title")
            if not s_id or not title:
                continue
            results.append(
                {
                    "source_id": str(s_id),
                    "entity_type": "custom",
                    "display_mode": "callout",
                    "title": str(title),
                    "subtitle": item.get("subtitle", "IA Souveraine Albert"),
                    "status": "Certifié Albert RAG",
                    "status_color": "purple",
                    "meta1": item.get("source", "DINUM / Albert"),
                    "meta2": item.get("model", "Albert-v2"),
                    "meta3": f"Confiance : {item.get('score', '90')}%",
                    "excerpt": item.get("excerpt") or item.get("snippet", ""),
                    "summary": item.get("summary", ""),
                    "url": item.get("url", "https://albert.etalab.gouv.fr"),
                    "verified_at": item.get("verified_at"),
                    "retrieved_at": timezone.now().isoformat(),
                    "provider": self.source_type,
                    "origin": "upstream",
                    "raw_payload": item.get("raw_payload", {}),
                }
            )
        return results

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        if getattr(settings, "LASUITE_SOURCES_DEMO", False):
            for item in MOCK_ALBERT_RESULTS:
                if item["source_id"] == source_id:
                    return {
                        **item,
                        "origin": "demo",
                        "provider": self.source_type,
                        "verified_at": None,
                        "status": "Demonstration",
                    }
            return None

        if not self.api_key:
            raise SourceUnavailable("Albert API key (ALBERT_API_KEY) not configured")

        try:
            data = get_json(
                f"{self.api_url}/documents/{source_id}",
                allowed_hosts=frozenset({"albert.api.etalab.gouv.fr"}),
                params={},
            )
        except Exception:
            return None

        if not isinstance(data, dict):
            return None

        return {
            "source_id": str(data.get("id", source_id)),
            "entity_type": "custom",
            "display_mode": "callout",
            "title": str(data.get("title", "")),
            "subtitle": str(data.get("subtitle", "")),
            "status": "Certifié Albert RAG",
            "status_color": "purple",
            "excerpt": str(data.get("excerpt", "")),
            "summary": str(data.get("summary", "")),
            "url": str(data.get("url", "https://albert.etalab.gouv.fr")),
            "verified_at": data.get("verified_at"),
            "retrieved_at": timezone.now().isoformat(),
            "provider": self.source_type,
            "origin": "upstream",
            "raw_payload": data.get("raw_payload", {}),
        }
