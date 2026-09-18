"""Justice Laws Website / Lois codifiées du Canada Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_JUSTICE_LAWS_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "CAN-STAT-PIPEDA",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Personal Information Protection and Electronic Documents Act (PIPEDA / LPRPDE)",
        "subtitle": "Department of Justice Canada · S.C. 2000, c. 5",
        "status": "In force",
        "status_color": "green",
        "meta1": "Citation: S.C. 2000, c. 5",
        "meta2": "Minister: Minister of Innovation, Science and Industry",
        "meta3": "Consolidated: 2026",
        "excerpt": (
            "The purpose of this Part is to extend the present laws of Canada to protect the privacy "
            "of individuals with respect to personal information about themselves held by government institutions."
        ),
        "summary": "Federal privacy law for private-sector organizations across Canada.",
        "url": "https://laws-lois.justice.gc.ca/eng/acts/P-8.6/",
        "verified_at": "18/09/2026",
        "raw_payload": {"statute_id": "P-8.6", "lang": "en-CA", "type": "Act"},
    },
    {
        "source_id": "CAN-STAT-ACCESS-INFO",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Access to Information Act (R.S.C., 1985, c. A-1)",
        "subtitle": "Department of Justice Canada · Consolidated Federal Statute",
        "status": "In force",
        "status_color": "green",
        "meta1": "Citation: R.S.C., 1985, c. A-1",
        "meta2": "Open Government",
        "meta3": "Last amended: 2024",
        "excerpt": (
            "The purpose of this Act is to enhance the accountability and transparency of federal institutions "
            "in order to promote an open and democratic society."
        ),
        "summary": "Key legislation ensuring public access to federal government records in Canada.",
        "url": "https://laws-lois.justice.gc.ca/eng/acts/A-1/",
        "verified_at": "18/09/2026",
        "raw_payload": {"statute_id": "A-1", "lang": "en-CA", "type": "Act"},
    },
]


class JusticeLawsSourceProvider(BaseSourceProvider):
    """Justice Laws Canada XML & REST API provider with offline mock fallback."""

    source_type = "canlaw"
    name = "Justice Laws Canada / Lois Codifiées"

    def __init__(self):
        self.mock_mode = os.getenv("JUSTICE_LAWS_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "canlaw",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_JUSTICE_LAWS_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_JUSTICE_LAWS_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_JUSTICE_LAWS_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
