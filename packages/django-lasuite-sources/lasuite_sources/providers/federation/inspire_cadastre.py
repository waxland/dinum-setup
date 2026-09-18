"""INSPIRE Cadastral Parcels Harmonized European Federation Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_INSPIRE_CADASTRE: List[SourceSearchResult] = [
    {
        "source_id": "INSPIRE-CP-ES-28900",
        "entity_type": "cadastre",
        "display_mode": "card",
        "title": "INSPIRE Cadastral Parcel 28900A01200044 (Madrid, Spain)",
        "subtitle": "INSPIRE Cadastral Parcels Directive · Sede Catastro (ES)",
        "status": "INSPIRE HVD Certified",
        "status_color": "green",
        "meta1": "Country: Spain (ES)",
        "meta2": "Parcel ID: 28900A01200044",
        "meta3": "Standard: INSPIRE CP GeoJSON",
        "summary": "European land parcel boundary resolved via national cadastral HVD open services.",
        "url": "https://inspire.ec.europa.eu/theme/cp",
        "verified_at": "18/09/2026",
        "raw_payload": {"inspire_theme": "CadastralParcels", "country": "ES"},
    },
]


class InspireCadastreFederatedProvider(BaseSourceProvider):
    """INSPIRE European Cadastral Parcels Federated Provider."""

    source_type = "eu_cadastre"
    name = "INSPIRE European Cadastre Federation"

    def __init__(self):
        self.mock_mode = os.getenv("INSPIRE_CAD_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

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
        q = query.lower()
        matched = [
            item
            for item in MOCK_INSPIRE_CADASTRE
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_INSPIRE_CADASTRE[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_INSPIRE_CADASTRE:
            if item["source_id"] == source_id:
                return item
        return None
