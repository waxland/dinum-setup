"""Your Europe / Single Digital Gateway (SDG) EU Administrative Procedures Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_YOUR_EUROPE: List[SourceSearchResult] = [
    {
        "source_id": "YOUR-EUROPE-PROC-042",
        "entity_type": "demarche",
        "display_mode": "card",
        "title": "Cross-Border Business Registration & Taxation in the EU (Single Digital Gateway)",
        "subtitle": "Your Europe · European Commission & Member States Portal",
        "status": "Official Procedure",
        "status_color": "green",
        "meta1": "Scope: EU Citizens & Businesses",
        "meta2": "Framework: Single Digital Gateway (SDG)",
        "meta3": "Languages: 24 Official Languages",
        "excerpt": (
            "Practical information and online administrative procedures for citizens and companies "
            "moving, working, or doing business across European Union Member States."
        ),
        "summary": "Official Single Digital Gateway portal for cross-border administrative procedures in the EU.",
        "url": "https://europa.eu/youreurope/",
        "verified_at": "18/09/2026",
        "raw_payload": {"sdg_id": "PROC-042", "portal": "Your Europe"},
    },
]


class YourEuropeSourceProvider(BaseSourceProvider):
    """Your Europe Single Digital Gateway provider."""

    source_type = "your_europe"
    name = "Your Europe (Single Digital Gateway)"

    def __init__(self):
        self.mock_mode = os.getenv("YOUR_EUROPE_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "demarche",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_YOUR_EUROPE
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_YOUR_EUROPE[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_YOUR_EUROPE:
            if item["source_id"] == source_id:
                return item
        return None
