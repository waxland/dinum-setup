"""Open Government Canada / Gouvernement ouvert CKAN API Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_OPENCANADA_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "OPEN-CAN-DS-GEO-2026",
        "entity_type": "opendata",
        "display_mode": "card",
        "title": "National Road Network (NRN) GeoBase Canada — Open Data",
        "subtitle": "Natural Resources Canada · Open Government Portal (CKAN)",
        "status": "Open Government Licence - Canada",
        "status_color": "blue",
        "meta1": "Format: GeoJSON, Shapefile, CSV",
        "meta2": "Publisher: Natural Resources Canada",
        "meta3": "Coverage: Pan-Canadian",
        "excerpt": (
            "Authoritative digital representation of Canada's road infrastructure network, "
            "maintained collaboratively with federal, provincial, and territorial partners under open license."
        ),
        "summary": "National open geographic geospatial dataset of Canadian roads and transit networks.",
        "url": "https://open.canada.ca/data/en/dataset/3d371465-762b-42ea-ac8f-3e3f42f3c001",
        "verified_at": "18/09/2026",
        "raw_payload": {"dataset_id": "nrn-geobase", "license": "OGL-Canada"},
    },
]


class OpenCanadaSourceProvider(DemoSourceProvider):
    """Open Government Canada CKAN Action API provider."""

    source_type = "opencanada"
    name = "Open Government Canada"

    def __init__(self):
        self.mock_mode = os.getenv("OPENCANADA_MOCK_ENABLED", "true").lower() in (
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
                "type": "opencanada",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_OPENCANADA_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_OPENCANADA_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
