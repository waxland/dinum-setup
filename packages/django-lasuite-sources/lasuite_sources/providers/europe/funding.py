"""EU Funding & Tenders Opportunities Portal Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_FUNDING_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "EU-CALL-HORIZON-CL4-2026-DIGITAL",
        "entity_type": "grant",
        "display_mode": "card",
        "title": "Horizon Europe — Next Generation Sovereign Open Source Cloud & Digital Commons",
        "subtitle": "European Commission — DG CNECT · Call HORIZON-CL4-2026",
        "status": "Open for Submission",
        "status_color": "green",
        "meta1": "Topic ID: HORIZON-CL4-2026-DATA-01",
        "meta2": "Budget: €50,000,000",
        "meta3": "Deadline: 18/11/2026",
        "excerpt": (
            "Grants supporting European collaborative consortia developing verified, open-source sovereign software, "
            "verifiable AI algorithms, and decentralized data spaces for public sector digital autonomy."
        ),
        "summary": "European research grant program for open digital commons and sovereign technologies.",
        "url": "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/horizon-cl4-2026",
        "verified_at": "18/09/2026",
        "raw_payload": {"programme": "HORIZON", "type": "RIA", "budget": 50000000},
    },
    {
        "source_id": "EU-CALL-DIGITAL-2026-EUDI-WALLET",
        "entity_type": "grant",
        "display_mode": "card",
        "title": "Digital Europe Programme — Large Scale Pilots for European Digital Identity Wallets",
        "subtitle": "European Health and Digital Executive Agency (HaDEA)",
        "status": "Open for Submission",
        "status_color": "green",
        "meta1": "Topic ID: DIGITAL-2026-DEPLOY-04",
        "meta2": "Co-funding Rate: 50%",
        "meta3": "Deadline: 15/10/2026",
        "summary": "Deployment grants for national and cross-border digital identity wallet infrastructure.",
        "url": "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/digital-2026",
        "verified_at": "18/09/2026",
        "raw_payload": {"programme": "DIGITAL", "type": "DEP-SIMPLE"},
    },
]


class FundingTendersSourceProvider(BaseSourceProvider):
    """EU Funding & Tenders Opportunities Search API provider."""

    source_type = "funding"
    name = "EU Funding & Tenders"

    def __init__(self):
        self.mock_mode = os.getenv("FUNDING_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "grant",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_FUNDING_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_FUNDING_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_FUNDING_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
