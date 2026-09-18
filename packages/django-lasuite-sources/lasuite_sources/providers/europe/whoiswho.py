"""EU Whoiswho Official Directory of EU Institutions Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_WHOISWHO_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "WHOISWHO-EC-SG",
        "entity_type": "agent",
        "display_mode": "card",
        "title": "European Commission — Secretariat-General (SG)",
        "subtitle": "European Commission · Official Directory",
        "status": "Official Service",
        "status_color": "blue",
        "meta1": "Location: Brussels, Belgium",
        "meta2": "Director-General: Ilze Juhansone",
        "meta3": "Scope: Institutional Coordination",
        "summary": "Central department managing overall strategy and policy coordination across European Commission Directorates-General.",
        "url": "https://op.europa.eu/en/web/who-is-who",
        "verified_at": "18/09/2026",
        "raw_payload": {"org_id": "EC-SG", "city": "Brussels"},
    },
]


class WhoiswhoSourceProvider(DemoSourceProvider):
    """EU Whoiswho Directory Linked Open Data & SPARQL provider."""

    source_type = "whoiswho"
    name = "EU Whoiswho"

    def __init__(self):
        self.mock_mode = os.getenv("WHOISWHO_MOCK_ENABLED", "true").lower() in (
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
                "type": "agent",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_WHOISWHO_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_WHOISWHO_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
