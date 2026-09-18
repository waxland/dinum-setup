"""Canadian Geographical Names Database (CGNDB / GeoNames) Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_GEONAMES_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "GEO-CA-FDZCS",
        "entity_type": "place",
        "display_mode": "card",
        "title": "Ottawa, Ontario (National Capital of Canada)",
        "subtitle": "Natural Resources Canada · Canadian Geographical Names Database (CGNDB)",
        "status": "Official Name",
        "status_color": "green",
        "meta1": "CGNDB Key: FDZCS",
        "meta2": "Province: Ontario (ON)",
        "meta3": "Coordinates: 45.4215° N, 75.6972° W",
        "excerpt": (
            "Authoritative national geographic name and spatial reference for the capital of Canada, "
            "maintained officially under the Geographical Names Board of Canada (GNBC)."
        ),
        "summary": "Official geographic record for the city of Ottawa, Ontario, Canada.",
        "url": "https://geonames.nrcan.gc.ca/search-place-names/unique?id=FDZCS",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "cgndb_id": "FDZCS",
            "lat": 45.4215,
            "lon": -75.6972,
            "generic_term": "City",
        },
    },
    {
        "source_id": "GEO-CA-EFKHO",
        "entity_type": "place",
        "display_mode": "card",
        "title": "Montréal, Québec, Canada",
        "subtitle": "Ressources naturelles Canada · Base de données toponymiques du Canada",
        "status": "Official Name",
        "status_color": "green",
        "meta1": "CGNDB Key: EFKHO",
        "meta2": "Province: Québec (QC)",
        "meta3": "Coordinates: 45.5017° N, 73.5673° W",
        "summary": "Official geographic record for the metropolis of Montreal, Quebec, Canada.",
        "url": "https://geonames.nrcan.gc.ca/search-place-names/unique?id=EFKHO",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "cgndb_id": "EFKHO",
            "lat": 45.5017,
            "lon": -73.5673,
            "generic_term": "Ville",
        },
    },
]


class GeoNamesCanadaSourceProvider(DemoSourceProvider):
    """Canadian Geographical Names Database (CGNDB) REST API provider."""

    source_type = "geonames_ca"
    name = "GeoNames Canada (RNCan / NRCan)"

    def __init__(self):
        self.mock_mode = os.getenv("GEONAMES_CA_MOCK_ENABLED", "true").lower() in (
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
                "type": "place",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_GEONAMES_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_GEONAMES_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
