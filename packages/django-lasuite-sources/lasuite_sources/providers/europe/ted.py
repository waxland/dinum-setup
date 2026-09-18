"""TED (Tenders Electronic Daily) European Public Procurement Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_TED_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "TED-2026-S-084-129481",
        "entity_type": "procurement",
        "display_mode": "card",
        "title": "European Sovereign Cloud Infrastructure & Collaborative Digital Workspace Services",
        "subtitle": "European Commission — Directorate-General for Digital Services (DIGIT)",
        "status": "Open Call for Tenders",
        "status_color": "blue",
        "meta1": "Notice: 2026/S 084-129481",
        "meta2": "Estimated: €45,000,000",
        "meta3": "Deadline: 15/12/2026",
        "excerpt": (
            "Provision of open-source sovereign collaborative office tools, high-security WebRTC conferencing, "
            "and encrypted real-time document editing for European Institutions."
        ),
        "summary": "Pan-European public procurement for open digital workspace infrastructure.",
        "url": "https://ted.europa.eu/en/notice/-/detail/129481-2026",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "ted_id": "129481-2026",
            "buyer": "DG DIGIT",
            "cpv": "72200000",
        },
    },
    {
        "source_id": "TED-2026-S-112-248901",
        "entity_type": "procurement",
        "display_mode": "card",
        "title": "Decentralized Identity & Qualified Electronic Signature Interoperability Platform",
        "subtitle": "European Union Agency for Cybersecurity (ENISA)",
        "status": "Awarded",
        "status_color": "green",
        "meta1": "Notice: 2026/S 112-248901",
        "meta2": "Value: €12,800,000",
        "meta3": "eIDAS 2.0 Compliant",
        "excerpt": (
            "Contract award notice for the implementation of the European Digital Identity Wallet (EUDI Wallet) "
            "reference architecture and cross-border trust services."
        ),
        "summary": "Implementation of sovereign identity wallet standards across Member States.",
        "url": "https://ted.europa.eu/en/notice/-/detail/248901-2026",
        "verified_at": "18/09/2026",
        "raw_payload": {"ted_id": "248901-2026", "buyer": "ENISA", "cpv": "72220000"},
    },
]


class TedSourceProvider(DemoSourceProvider):
    """TED eProcurement Search API v3 provider."""

    source_type = "ted"
    name = "TED (Tenders Electronic Daily)"

    def __init__(self):
        self.mock_mode = os.getenv("TED_MOCK_ENABLED", "true").lower() in (
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
                "type": "procurement",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_TED_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_TED_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
