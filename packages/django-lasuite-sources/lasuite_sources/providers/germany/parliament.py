"""Deutscher Bundestag DIP Open Data API Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_BUNDESTAG_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "DE-BT-DRS-20-8420",
        "entity_type": "parliament",
        "display_mode": "callout",
        "title": "Drucksache 20/8420 — Gesetz zur Stärkung der digitalen Souveränität der Bundesverwaltung",
        "subtitle": "Deutscher Bundestag · 20. Wahlperiode",
        "status": "In Beratung",
        "status_color": "blue",
        "meta1": "Drucksache: 20/8420",
        "meta2": "Urheber: Bundesregierung",
        "meta3": "Ausschuss: Digitalausschuss",
        "excerpt": (
            "Gesetzentwurf zur vorrangigen Nutzung von Open-Source-Software und offenen Standards "
            "in der Informationstechnik des Bundes zur Gewährleistung technischer Souveränität."
        ),
        "summary": "Bundesgesetz zur Priorisierung quelloffener Software und offener Schnittstellen in Behörden.",
        "url": "https://dip.bundestag.de/vorgang/.../20-8420",
        "verified_at": "18/09/2026",
        "raw_payload": {"drs_nr": "20/8420", "wahlperiode": 20, "typ": "Gesetzentwurf"},
    },
]


class BundestagSourceProvider(BaseSourceProvider):
    """Bundestag DIP REST API v1 provider."""

    source_type = "bundestag"
    name = "Deutscher Bundestag (DIP)"

    def __init__(self):
        self.mock_mode = os.getenv("BUNDESTAG_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "bundestag",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_BUNDESTAG_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_BUNDESTAG_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_BUNDESTAG_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
