"""Datos.gob.es Spanish National Open Data Portal Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_DATOSGOB_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "ES-DATOSGOB-DS-LINEAS-LIMITE",
        "entity_type": "opendata",
        "display_mode": "card",
        "title": "Líneas Límite Municipales de España (IGN) — Open Data",
        "subtitle": "Instituto Geográfico Nacional (IGN) · Datos.gob.es",
        "status": "Licencia CC-BY 4.0",
        "status_color": "blue",
        "meta1": "Formato: GeoJSON, Shapefile",
        "meta2": "Publicador: IGN / CNIG",
        "meta3": "Cobertura: España",
        "summary": "Delimitaciones jurisdiccionales oficiales de los términos municipales del Reino de España.",
        "url": "https://datos.gob.es/es/catalogo/e00125901-lineas-limite-municipales",
        "verified_at": "18/09/2026",
        "raw_payload": {"dcat_id": "lineas-limite", "license": "CC-BY-4.0"},
    },
]


class DatosGobSourceProvider(BaseSourceProvider):
    """Datos.gob.es CKAN / SPARQL API provider."""

    source_type = "datosgob"
    name = "Datos.gob.es (Open Data España)"

    def __init__(self):
        self.mock_mode = os.getenv("DATOSGOB_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "datosgob",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_DATOSGOB_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_DATOSGOB_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_DATOSGOB_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
