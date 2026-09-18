"""HUDOC / European Court of Human Rights (ECHR / CEDH) Case Law Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_HUDOC_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "ECHR-HUDOC-001-202642",
        "entity_type": "case-law",
        "display_mode": "callout",
        "title": "Affaire c. France / Judgment — Freedom of Expression and Digital Privacy (Article 10 & 8)",
        "subtitle": "Cour européenne des droits de l'homme (CEDH) · Conseil de l'Europe",
        "status": "Arrêt définitif",
        "status_color": "green",
        "meta1": "Requête n° 42109/24",
        "meta2": "ECLI:CE:ECHR:2024:0614JUD004210924",
        "meta3": "CEDH / ECHR",
        "excerpt": (
            "La Cour rappelle que la liberté d'expression constitue l'un des fondements essentiels "
            "d'une société démocratique et s'applique également aux communications numériques et aux lanceurs d'alerte."
        ),
        "summary": "Arrêt de principe de la CEDH sur la conciliation entre vie privée numérique et liberté d'expression.",
        "url": "https://hudoc.echr.coe.int/eng?i=001-202642",
        "verified_at": "18/09/2026",
        "raw_payload": {"appno": "42109/24", "court": "ECHR", "importance": 1},
    },
]


class HudocSourceProvider(BaseSourceProvider):
    """HUDOC ECHR / CEDH Case Law Search API provider."""

    source_type = "hudoc"
    name = "HUDOC / CEDH (Cour européenne des droits de l'homme)"

    def __init__(self):
        self.mock_mode = os.getenv("HUDOC_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "case-law",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_HUDOC_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_HUDOC_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_HUDOC_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
