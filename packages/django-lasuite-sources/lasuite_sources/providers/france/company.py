"""Annuaire des Entreprises / RNE / Pappers source provider."""

import logging
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_COMPANY_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "13002526500013",
        "entity_type": "company",
        "display_mode": "card",
        "title": "Direction Interministérielle du Numérique (DINUM)",
        "subtitle": "Service du Premier ministre",
        "status": "In Bonis (Actif)",
        "status_color": "green",
        "meta1": "SIREN : 130 025 265",
        "meta2": "NAF : 84.11Z (Administration publique générale)",
        "meta3": "Effectif : 250+ agents",
        "summary": "Conçoit et met en œuvre la stratégie numérique de l'État français et pilote La Suite Numérique.",
        "url": "https://annuaire-entreprises.data.gouv.fr/entreprise/direction-interministerielle-du-numerique-dinum-130025265",
        "verified_at": "17/09/2026",
        "raw_payload": {"siren": "130025265", "forme_juridique": "Service déconcentré"},
    },
    {
        "source_id": "11000001500019",
        "entity_type": "company",
        "display_mode": "card",
        "title": "Secrétariat Général du Gouvernement (SGG)",
        "subtitle": "Administration centrale",
        "status": "In Bonis (Actif)",
        "status_color": "green",
        "meta1": "SIREN : 110 000 015",
        "meta2": "NAF : 84.11Z",
        "meta3": "57 rue de Varenne, 75007 Paris",
        "summary": "Assure la continuité de l'État et la régularité juridique des textes officiels.",
        "url": "https://annuaire-entreprises.data.gouv.fr/entreprise/110000015",
        "verified_at": "17/09/2026",
        "raw_payload": {"siren": "110000015"},
    },
]


class CompanySourceProvider(BaseSourceProvider):
    """Company lookup provider (Annuaire Entreprises / Pappers / RNE)."""

    source_type = "company"
    name = "Annuaire des Entreprises / RNE"

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "company",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_COMPANY_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_COMPANY_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_COMPANY_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
