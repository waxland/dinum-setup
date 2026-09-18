"""GovData.de German Federal & State Open Data Portal Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_GOVDATA_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "DE-GOVDATA-DS-GEO-2026",
        "entity_type": "opendata",
        "display_mode": "card",
        "title": "Verwaltungsgrenzen Deutschland (VG250) — Open Data",
        "subtitle": "Bundesamt für Kartographie und Geodäsie (BKG) · GovData.de",
        "status": "Datenlizenz Deutschland (dl-de/by-2-0)",
        "status_color": "blue",
        "meta1": "Format: GeoJSON, Shapefile, CSV",
        "meta2": "Herausgeber: BKG",
        "meta3": "Maßstab: 1:250 000",
        "summary": "Amtliche digitale Verwaltungsgrenzen der Bundesrepublik Deutschland von Bund bis Gemeindeebene.",
        "url": "https://www.govdata.de/web/guest/suchen/-/details/vg250-ebenen",
        "verified_at": "18/09/2026",
        "raw_payload": {"dcat_id": "vg250", "license": "dl-de/by-2-0"},
    },
]


class GovDataSourceProvider(DemoSourceProvider):
    """GovData.de CKAN API provider."""

    source_type = "govdata"
    name = "GovData Deutschland"

    def __init__(self):
        self.mock_mode = os.getenv("GOVDATA_MOCK_ENABLED", "true").lower() in (
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
                "type": "govdata",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_GOVDATA_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_GOVDATA_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
