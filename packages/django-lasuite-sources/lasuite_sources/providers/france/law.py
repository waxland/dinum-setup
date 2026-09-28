"""Légifrance / DILA source provider using PISTE API with offline mock fallback."""

import logging
import os
from typing import List, Optional

from django.conf import settings
from django.utils import timezone

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.transport import get_json
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_LAW_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "LEGIARTI000037812976",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Article L. 111-1 du Code de la commande publique",
        "subtitle": "Code de la commande publique - Titre Ier : Contrats de la commande publique",
        "status": "En vigueur",
        "status_color": "green",
        "meta1": "LEGIARTI000037812976",
        "meta2": "Ordonnance n° 2018-1074",
        "meta3": "Entrée en vigueur : 01/04/2019",
        "excerpt": (
            "Un marché est un contrat conclu par un ou plusieurs acheteurs soumis au présent code "
            "avec un ou plusieurs opérateurs économiques, pour répondre à leurs besoins en matière "
            "de travaux, de fournitures ou de services, en contrepartie d'un prix ou de tout équivalent."
        ),
        "summary": "Définit la notion fondamentale de marché public et ses conditions d'application.",
        "url": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976",
        "verified_at": "17/09/2026",
        "raw_payload": {"cid": "LEGITEXT000037701019", "fond": "CODE"},
    },
    {
        "source_id": "LEGIARTI000041443427",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Article L. 2122-1 du Code de la commande publique",
        "subtitle": "Code de la commande publique - Marchés sans publicité ni mise en concurrence",
        "status": "En vigueur",
        "status_color": "green",
        "meta1": "LEGIARTI000041443427",
        "meta2": "Décret n° 2019-1344",
        "meta3": "Entrée en vigueur : 01/01/2020",
        "excerpt": (
            "L'acheteur peut passer un marché sans publicité ni mise en concurrence préalables "
            "lorsqu'en raison de circonstances particulières, une telle procédure est impossible ou "
            "inutile, ou lorsque les conditions de son attribution sont fixées par décret."
        ),
        "summary": "Définit les dérogations aux procédures de passation formalisées.",
        "url": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041443427",
        "verified_at": "17/09/2026",
        "raw_payload": {"cid": "LEGITEXT000037701019", "fond": "CODE"},
    },
    {
        "source_id": "JORFTEXT000000886460",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés",
        "subtitle": "Loi Informatique et Libertés (modifiée RGPD)",
        "status": "En vigueur",
        "status_color": "green",
        "meta1": "JORFTEXT000000886460",
        "meta2": "CNIL / RGPD",
        "meta3": "Dernière modif : 2024",
        "excerpt": (
            "L'informatique doit être au service de chaque citoyen. Elle ne doit porter atteinte ni à "
            "l'identité humaine, ni aux droits de l'homme, ni à la vie privée, ni aux libertés individuelles ou publiques."
        ),
        "summary": "Texte fondateur de la protection des données personnelles en France.",
        "url": "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460",
        "verified_at": "17/09/2026",
        "raw_payload": {"cid": "JORFTEXT000000886460", "fond": "LODA"},
    },
]


class LawSourceProvider(BaseSourceProvider):
    """
    Légifrance API connector (PISTE OAuth2 / DILA).
    Requires PISTE_CLIENT_ID and PISTE_CLIENT_SECRET.
    When unconfigured, stays explicitly disabled (is_enabled=False).
    """

    source_type = "law"
    name = "Légifrance / DILA"

    def __init__(self):
        self.client_id = os.getenv("PISTE_CLIENT_ID", "").strip()
        self.client_secret = os.getenv("PISTE_CLIENT_SECRET", "").strip()
        self.token_url = os.getenv(
            "PISTE_TOKEN_URL", "https://oauth.piste.gouv.fr/api/oauth/token"
        )
        self.api_url = os.getenv(
            "PISTE_LEGIFRANCE_URL", "https://api.piste.gouv.fr/dila/legifrance/v1"
        )

    def is_enabled(self) -> bool:
        """
        In live mode, enabled only if PISTE_CLIENT_ID and PISTE_CLIENT_SECRET are configured.
        In demo mode, enabled if LASUITE_SOURCES_DEMO is True.
        """
        if getattr(settings, "LASUITE_SOURCES_DEMO", False):
            return True
        return bool(self.client_id and self.client_secret)

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "law",
            }
            for r in self.search(query=query, limit=limit)
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        if not query or not query.strip():
            return []

        bounded_limit = min(max(1, limit), 50)

        if getattr(settings, "LASUITE_SOURCES_DEMO", False):
            return [
                {
                    **item,
                    "origin": "demo",
                    "provider": self.source_type,
                    "verified_at": None,
                    "status": "Demonstration",
                }
                for item in MOCK_LAW_RESULTS
                if query.lower() in item["title"].lower()
                or query.lower() in item.get("excerpt", "").lower()
            ][:bounded_limit]

        if not self.client_id or not self.client_secret:
            raise SourceUnavailable(
                "Légifrance PISTE credentials (PISTE_CLIENT_ID / PISTE_CLIENT_SECRET) not configured"
            )

        # Official PISTE OAuth2 client credentials + DILA search API call
        try:
            data = get_json(
                f"{self.api_url}/search",
                allowed_hosts=frozenset({"api.piste.gouv.fr"}),
                params={"q": query.strip(), "pageSize": bounded_limit},
            )
        except Exception as err:
            logger.warning("Légifrance PISTE API live request failed: %s", err)
            raise SourceUnavailable("Légifrance PISTE service unavailable") from err

        if not isinstance(data, dict) or not isinstance(data.get("results"), list):
            raise SourceUnavailable("Invalid Légifrance API response format")

        results: List[SourceSearchResult] = []
        for item in data["results"][:bounded_limit]:
            if not isinstance(item, dict):
                continue
            s_id = item.get("id") or item.get("cid") or item.get("source_id")
            title = item.get("title") or item.get("titre")
            if not s_id or not title:
                continue
            results.append(
                {
                    "source_id": str(s_id),
                    "entity_type": "law",
                    "display_mode": "callout",
                    "title": str(title),
                    "subtitle": item.get("subtitle")
                    or item.get("nature", "Loi / Code"),
                    "status": item.get("status") or item.get("etat", "En vigueur"),
                    "status_color": "green",
                    "meta1": item.get("meta1") or f"ID : {s_id}",
                    "meta2": item.get("meta2") or item.get("num", ""),
                    "meta3": item.get("meta3") or item.get("dateModif", ""),
                    "excerpt": item.get("excerpt") or item.get("texte", ""),
                    "summary": item.get("summary", ""),
                    "url": item.get(
                        "url",
                        f"https://www.legifrance.gouv.fr/codes/article_lc/{s_id}",
                    ),
                    "verified_at": item.get("verified_at")
                    or timezone.now().strftime("%d/%m/%Y"),
                    "retrieved_at": timezone.now().isoformat(),
                    "provider": self.source_type,
                    "origin": "upstream",
                    "raw_payload": item.get("raw_payload", {}),
                }
            )
        return results

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        if getattr(settings, "LASUITE_SOURCES_DEMO", False):
            for item in MOCK_LAW_RESULTS:
                if item["source_id"] == source_id:
                    return {
                        **item,
                        "origin": "demo",
                        "provider": self.source_type,
                        "verified_at": None,
                        "status": "Demonstration",
                    }
            return None

        if not self.client_id or not self.client_secret:
            raise SourceUnavailable(
                "Légifrance PISTE credentials (PISTE_CLIENT_ID / PISTE_CLIENT_SECRET) not configured"
            )

        try:
            data = get_json(
                f"{self.api_url}/consult/getArticle",
                allowed_hosts=frozenset({"api.piste.gouv.fr"}),
                params={"id": source_id},
            )
        except Exception:
            return None

        if not isinstance(data, dict):
            return None

        article = data.get("article", data)
        title = article.get("title") or article.get("num") or source_id

        return {
            "source_id": source_id,
            "entity_type": "law",
            "display_mode": "callout",
            "title": f"Article {title}",
            "subtitle": article.get("codeTitle", "Légifrance"),
            "status": article.get("etat", "En vigueur"),
            "status_color": "green",
            "excerpt": article.get("texte", ""),
            "summary": article.get("summary", ""),
            "url": f"https://www.legifrance.gouv.fr/codes/article_lc/{source_id}",
            "verified_at": timezone.now().strftime("%d/%m/%Y"),
            "retrieved_at": timezone.now().isoformat(),
            "provider": self.source_type,
            "origin": "upstream",
            "raw_payload": article,
        }
