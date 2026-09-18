"""BOE (Boletín Oficial del Estado) Spanish Legislation Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_BOE_LAWS: List[SourceSearchResult] = [
    {
        "source_id": "ES-BOE-A-2018-16673",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD)",
        "subtitle": "Boletín Oficial del Estado (BOE) · Disposición n° 16673",
        "status": "En vigor",
        "status_color": "green",
        "meta1": "BOE-A-2018-16673",
        "meta2": "Rango: Ley Orgánica",
        "meta3": "Entrada en vigor: 07/12/2018",
        "excerpt": (
            "El tratamiento de los datos personales de un menor de edad únicamente podrá fundarse "
            "en su consentimiento cuando sea mayor de catorce años."
        ),
        "summary": "Adapta el ordenamiento jurídico español al Reglamento (UE) 2016/679 (RGPD) y garantiza los derechos digitales.",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673",
        "verified_at": "18/09/2026",
        "raw_payload": {"boe_id": "BOE-A-2018-16673", "jurisdiction": "ES"},
    },
]


class BoeSourceProvider(DemoSourceProvider):
    """BOE Open Data REST / XML API provider."""

    source_type = "ley"
    name = "Boletín Oficial del Estado (BOE)"

    def __init__(self):
        self.mock_mode = os.getenv("BOE_MOCK_ENABLED", "true").lower() in (
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
                "type": "ley",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_BOE_LAWS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_BOE_LAWS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
