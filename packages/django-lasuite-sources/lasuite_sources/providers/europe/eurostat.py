"""Eurostat Statistics REST API & SDMX Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_EUROSTAT_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "EUROSTAT-PRC-HICP-2026",
        "entity_type": "statistics",
        "display_mode": "card",
        "title": "Eurostat Key Economic Indicator — Harmonised Index of Consumer Prices (HICP)",
        "subtitle": "European Statistical System · Monthly Dissemination API",
        "status": "Official EU Data",
        "status_color": "blue",
        "meta1": "Euro Area (EA20): 2.1%",
        "meta2": "EU27: 2.3%",
        "meta3": "Period: August 2026",
        "excerpt": (
            "Euro area annual inflation is estimated to be 2.1% in August 2026, according to a flash estimate "
            "from Eurostat, the statistical office of the European Union."
        ),
        "summary": "Monthly consumer price inflation statistics harmonized across EU Member States.",
        "url": "https://ec.europa.eu/eurostat/web/main/data/database",
        "verified_at": "18/09/2026",
        "raw_payload": {"dataset": "prc_hicp_manr", "geo": "EA20", "unit": "Percentage change"},
    },
    {
        "source_id": "EUROSTAT-DEMO-GIND-2026",
        "entity_type": "statistics",
        "display_mode": "card",
        "title": "EU Population & Demographic Balance — 449.2 Million Residents",
        "subtitle": "Eurostat Population and Demography Dissemination API",
        "status": "Official EU Data",
        "status_color": "blue",
        "meta1": "Total: 449.2M",
        "meta2": "Active Population: 75.4%",
        "meta3": "Census: 2026",
        "summary": "Consolidated population statistics and demographic balance indicators for the 27 EU Member States.",
        "url": "https://ec.europa.eu/eurostat/databrowser/view/demo_gind/default/table",
        "verified_at": "18/09/2026",
        "raw_payload": {"dataset": "demo_gind", "unit": "Number"},
    },
]


class EurostatSourceProvider(BaseSourceProvider):
    """Eurostat Statistics REST & SDMX API provider."""

    source_type = "eurostat"
    name = "Eurostat"

    def __init__(self):
        self.mock_mode = os.getenv("EUROSTAT_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "statistics",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        q = query.lower()
        matched = [
            item
            for item in MOCK_EUROSTAT_RESULTS
            if q in item["title"].lower()
            or (item["subtitle"] and q in item["subtitle"].lower())
            or (item.get("excerpt") and q in item["excerpt"].lower())
            or (item["meta1"] and q in item["meta1"].lower())
        ]
        return matched[:limit] if matched else MOCK_EUROSTAT_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_EUROSTAT_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
