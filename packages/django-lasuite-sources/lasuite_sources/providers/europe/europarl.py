"""European Parliament Open Data API v2 Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_EUROPARL_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "EP-10-TA-2026-0042",
        "entity_type": "parliament",
        "display_mode": "callout",
        "title": "European Parliament Resolution on Open Source Software in Public Administrations",
        "subtitle": "10th Parliamentary Term · Plenary Session Strasbourg",
        "status": "Adopted",
        "status_color": "green",
        "meta1": "Committee: ITRE",
        "meta2": "Rapporteur: Committee on Industry, Research and Energy",
        "meta3": "Vote: 542 in favour, 48 against",
        "excerpt": (
            "Calls on the Commission and Member States to systematically prioritize open-source solutions "
            "and European interoperable digital commons in public procurement to ensure digital sovereignty."
        ),
        "summary": "Parliamentary resolution endorsing open digital infrastructure across all Member States.",
        "url": "https://data.europarl.europa.eu/en/developer-corner",
        "verified_at": "18/09/2026",
        "raw_payload": {"ep_id": "TA-10-2026-0042", "session": "2026-09", "doc_type": "Resolution"},
    },
    {
        "source_id": "EP-MEP-197542",
        "entity_type": "parliament",
        "display_mode": "card",
        "title": "European Parliament Member Record — MEP Digital Committee",
        "subtitle": "Group of the Progressive Alliance of Socialists and Democrats / Renew Europe",
        "status": "Active Member",
        "status_color": "blue",
        "meta1": "Country: France / Germany",
        "meta2": "Committee: ITRE / IMCO",
        "meta3": "Term: 2024-2029",
        "summary": "Member of the European Parliament serving on Industry, Research and Internal Market committees.",
        "url": "https://www.europarl.europa.eu/meps/en/home",
        "verified_at": "18/09/2026",
        "raw_payload": {"mep_id": "197542", "term": "10"},
    },
]


class EuroparlSourceProvider(BaseSourceProvider):
    """European Parliament REST API v2 provider."""

    source_type = "europarl"
    name = "European Parliament Open Data"

    def __init__(self):
        self.mock_mode = os.getenv("EUROPARL_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "parliament",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_EUROPARL_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_EUROPARL_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_EUROPARL_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
