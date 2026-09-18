"""Assemblée Nationale (claire.vite / Tricoteuse) source provider."""

import logging
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_PARLIAMENT_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "AN-17-PJL-542-AMD-42",
        "entity_type": "parliament",
        "display_mode": "callout",
        "title": "Amendement n° 42 au Projet de Loi Souveraineté Numérique",
        "subtitle": "17ème Législature - Déposé le 12/09/2026",
        "status": "Adopté en séance",
        "status_color": "green",
        "meta1": "Rapporteur : Commission des Lois",
        "meta2": "Séance n° 142",
        "meta3": "Scrutin public n° 88 (Pour: 340, Contre: 22)",
        "excerpt": (
            "Après l'article 4, insérer un article ainsi rédigé : Les administrations centrales "
            "recourent par priorité aux solutions logicielles souveraines et libres certifiées par "
            "l'Agence Nationale de la Sécurité des Systèmes d'Information."
        ),
        "summary": "Obligation de priorité aux suites collaboratives ouvertes de l'État.",
        "url": "https://www.assemblee-nationale.fr/dyn/17/amendements/0542/42",
        "verified_at": "17/09/2026",
        "raw_payload": {"legislature": 17, "num_amendement": 42, "sort": "ADOPTE"},
    },
    {
        "source_id": "AN-17-PJL-542",
        "entity_type": "parliament",
        "display_mode": "callout",
        "title": "Projet de loi n° 542 visant à garantir la souveraineté numérique publique",
        "subtitle": "17ème Législature - En cours d'examen",
        "status": "En première lecture",
        "status_color": "blue",
        "meta1": "Dossier législatif n° 542",
        "meta2": "Auteur : Gouvernement",
        "meta3": "Dépôt : 01/09/2026",
        "summary": "Cadre législatif interdisant le recours aux clouds extra-territoriaux pour les données sensibles.",
        "url": "https://www.assemblee-nationale.fr/dyn/17/dossiers/souverainete_numerique",
        "verified_at": "17/09/2026",
        "raw_payload": {"legislature": 17, "num_dossier": 542},
    },
]


class ParliamentSourceProvider(BaseSourceProvider):
    """Parliamentary data connector (claire.vite / Tricoteuse)."""

    source_type = "parliament"
    name = "Assemblée Nationale"

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "parliament",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_PARLIAMENT_RESULTS
            if q in item.get("title", "").lower()
            or (item.get("subtitle") and q in str(item.get("subtitle")).lower())
            or (item.get("excerpt") and q in str(item.get("excerpt")).lower())
            or (item.get("summary") and q in str(item.get("summary")).lower())
            or (item.get("meta1") and q in str(item.get("meta1")).lower())
        ]
        return matched[:limit] if matched else MOCK_PARLIAMENT_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_PARLIAMENT_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
