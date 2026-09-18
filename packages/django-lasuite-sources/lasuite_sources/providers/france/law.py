"""Légifrance / DILA source provider using PISTE API with offline mock fallback."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
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


class LawSourceProvider(DemoSourceProvider):
    """Légifrance API connector (PISTE OAuth2 / OpenData)."""

    source_type = "law"
    name = "Légifrance / DILA"

    def __init__(self):
        self.client_id = os.getenv("PISTE_CLIENT_ID", "")
        self.client_secret = os.getenv("PISTE_CLIENT_SECRET", "")
        self.mock_mode = os.getenv("PISTE_MOCK_ENABLED", "true").lower() in (
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
                "type": "law",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_LAW_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_LAW_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
