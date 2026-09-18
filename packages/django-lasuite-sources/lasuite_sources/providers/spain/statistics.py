"""Instituto Nacional de Estadística (INE) Spanish Statistics Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_INE_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "ES-INE-IPC-2026",
        "entity_type": "statistics",
        "display_mode": "card",
        "title": "Índice de Precios de Consumo (IPC) España — Tasa de Inflación",
        "subtitle": "Instituto Nacional de Estadística (INE) · INEbase REST API",
        "status": "Dato Oficial INE",
        "status_color": "blue",
        "meta1": "IPC General: +2.2%",
        "meta2": "Ámbito: España",
        "meta3": "Periodo: Agosto 2026",
        "excerpt": (
            "El Índice de Precios de Consumo (IPC) tiene como objetivo medir la evolución del conjunto "
            "de precios de los bienes y servicios que consume la población residente en España."
        ),
        "summary": "Estadísticas oficiales mensuales de precios de consumo e inflación en España.",
        "url": "https://www.ine.es/dyngs/INEbase/es/categoria.htm?c=Estadistica_P&cid=1254735976607",
        "verified_at": "18/09/2026",
        "raw_payload": {"operacion": "IPC", "periodo": "2026M08"},
    },
]


class IneSourceProvider(DemoSourceProvider):
    """INEbase JSON REST API provider."""

    source_type = "ine_es"
    name = "Instituto Nacional de Estadística (INE)"

    def __init__(self):
        self.mock_mode = os.getenv("INE_ES_MOCK_ENABLED", "true").lower() in (
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
                "type": "ine_es",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_INE_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_INE_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
