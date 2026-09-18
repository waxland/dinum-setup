"""Proactive Disclosure Grants and Contributions Canada Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_CAN_GRANTS_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "CAN-GRANT-NRCan-2026-042",
        "entity_type": "grant",
        "display_mode": "card",
        "title": "Clean Energy for Rural and Remote Communities — Federal Contribution",
        "subtitle": "Natural Resources Canada (NRCan) · Proactive Disclosure",
        "status": "Awarded / Octroyé",
        "status_color": "green",
        "meta1": "Recipient: CleanTech Northern Alliance",
        "meta2": "Amount: $3,250,000 CAD",
        "meta3": "Fiscal Year: 2026-2027",
        "excerpt": (
            "Federal contribution agreement supporting renewable energy integration and local capacity building "
            "in remote indigenous communities across Canada."
        ),
        "summary": "Proactively disclosed federal financial contribution under clean technology program.",
        "url": "https://open.canada.ca/en/proactive-disclosure",
        "verified_at": "18/09/2026",
        "raw_payload": {"agreement_number": "NRCan-2026-042", "value": 3250000},
    },
]


class CanadaGrantsSourceProvider(BaseSourceProvider):
    """Open Government Canada Proactive Disclosure Grants provider."""

    source_type = "grant_ca"
    name = "Grants & Contributions Canada"

    def __init__(self):
        self.mock_mode = os.getenv("CAN_GRANTS_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "grant_ca",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_CAN_GRANTS_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_CAN_GRANTS_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_CAN_GRANTS_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
