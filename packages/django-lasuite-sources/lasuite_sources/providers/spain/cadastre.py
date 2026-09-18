"""Sede Electrónica del Catastro Spanish Land Registry Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_CATASTRO_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "ES-CAT-28900A01200044",
        "entity_type": "cadastre",
        "display_mode": "card",
        "title": "Parcela Urbana 28900A01200044 (Madrid)",
        "subtitle": "Dirección General del Catastro · Ministerio de Hacienda",
        "status": "Registrada",
        "status_color": "green",
        "meta1": "Ref. Catastral: 28900A012000440000AB",
        "meta2": "Superficie: 1.450 m²",
        "meta3": "Uso principal: Residencial",
        "summary": "Finca catastral certificada con delimitación gráfica georreferenciada.",
        "url": "https://www.sedecatastro.gob.es/",
        "verified_at": "18/09/2026",
        "raw_payload": {"ref_catastral": "28900A012000440000AB", "superficie": 1450},
    },
]


class CatastroSourceProvider(DemoSourceProvider):
    """Sede Electrónica del Catastro OVC Web Services provider."""

    source_type = "catastro"
    name = "Dirección General del Catastro (España)"

    def __init__(self):
        self.mock_mode = os.getenv("CATASTRO_ES_MOCK_ENABLED", "true").lower() in (
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
                "type": "catastro",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_CATASTRO_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_CATASTRO_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
