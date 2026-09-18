"""Registro Mercantil de España Corporate Registry Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_MERCANTIL_COMPANIES: List[SourceSearchResult] = [
    {
        "source_id": "ES-CIF-A28015865",
        "entity_type": "company",
        "display_mode": "card",
        "title": "Telefónica, S.A.",
        "subtitle": "Registro Mercantil de Madrid",
        "status": "Activa (In Bonis)",
        "status_color": "green",
        "meta1": "CIF: A-28015865",
        "meta2": "CNAE: 6110 (Telecomunicaciones)",
        "meta3": "Sede: Distrito Telefónica, Madrid",
        "summary": "Empresa multinacional española de telecomunicaciones e infraestructuras digitales.",
        "url": "https://www.registradores.org/",
        "verified_at": "18/09/2026",
        "raw_payload": {"cif": "A28015865", "registry": "Madrid"},
    },
]


class RegistroMercantilSourceProvider(BaseSourceProvider):
    """Registro Mercantil de España / Registradores provider."""

    source_type = "empresa_es"
    name = "Registro Mercantil de España"

    def __init__(self):
        self.mock_mode = os.getenv("MERCANTIL_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "empresa_es",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_MERCANTIL_COMPANIES
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_MERCANTIL_COMPANIES[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_MERCANTIL_COMPANIES:
            if item["source_id"] == source_id:
                return item
        return None
