"""Gesetze im Internet / BMJ German Federal Law Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_GERMANY_LAWS: List[SourceSearchResult] = [
    {
        "source_id": "DE-BGB-823",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "§ 823 Bürgerliches Gesetzbuch (BGB) — Schadensersatzpflicht",
        "subtitle": "Bundesministerium der Justiz · Gesetze im Internet",
        "status": "In Kraft",
        "status_color": "green",
        "meta1": "Norm: BGB § 823 Abs. 1",
        "meta2": "Fassung: 02.01.2002",
        "meta3": "Rechtsgebiet: Zivilrecht",
        "excerpt": (
            "Wer vorsätzlich oder fahrlässig das Leben, den Körper, die Gesundheit, die Freiheit, "
            "das Eigentum oder ein sonstiges Recht eines anderen widerrechtlich verletzt, ist dem anderen "
            "zum Ersatz des daraus entstehenden Schadens verpflichtet."
        ),
        "summary": "Grundlegende Haftungsnorm des deutschen Deliktsrechts für Schadensersatzansprüche.",
        "url": "https://www.gesetze-im-internet.de/bgb/__823.html",
        "verified_at": "18/09/2026",
        "raw_payload": {"law_abbr": "BGB", "section": "823", "jurisdiction": "DE"},
    },
]


class GesetzeSourceProvider(BaseSourceProvider):
    """Gesetze im Internet (BMJ / Juris) provider."""

    source_type = "gesetz"
    name = "Gesetze im Internet (BMJ)"

    def __init__(self):
        self.mock_mode = os.getenv("GESETZE_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "gesetz",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_GERMANY_LAWS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_GERMANY_LAWS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_GERMANY_LAWS:
            if item["source_id"] == source_id:
                return item
        return None
