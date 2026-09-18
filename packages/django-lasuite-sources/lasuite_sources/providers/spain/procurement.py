"""Plataforma de Contratación del Sector Público (PLACSP) Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_PLACSP_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "ES-PLACSP-2026-8812",
        "entity_type": "procurement",
        "display_mode": "card",
        "title": "Despliegue de Infraestructura Cloud Pública Soberana para la Administración",
        "subtitle": "Secretaría General de Administración Digital (SGAD) · Ministerio para la Transformación Digital",
        "status": "En licitación",
        "status_color": "blue",
        "meta1": "Expediente: SGAD-2026-CLOUD",
        "meta2": "Presupuesto: 14.200.000 €",
        "meta3": "Cierre: 15/10/2026",
        "excerpt": (
            "Adquisición de servicios cloud soberanos certificados por el Esquema Nacional de Seguridad "
            "(ENS Nivel Alto) para los servicios interoperables del sector público."
        ),
        "summary": "Licitación pública para la modernización de servicios digitales de la Administración General del Estado.",
        "url": "https://contrataciondelestado.es/",
        "verified_at": "18/09/2026",
        "raw_payload": {"expediente": "SGAD-2026-CLOUD", "ens": "Alto"},
    },
]


class PlacspSourceProvider(BaseSourceProvider):
    """Plataforma de Contratación del Estado (CODICE / Atom) provider."""

    source_type = "licitacion"
    name = "Plataforma de Contratación del Sector Público (PLACSP)"

    def __init__(self):
        self.mock_mode = os.getenv("PLACSP_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "licitacion",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_PLACSP_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_PLACSP_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_PLACSP_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
