"""data.europa.eu Official European Data Portal Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_DATAEUROPA_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "DATAEUROPA-DS-NUTS-2026",
        "entity_type": "opendata",
        "display_mode": "card",
        "title": "NUTS — Nomenclature of Territorial Units for Statistics (European Regions GeoJSON & Shapefile)",
        "subtitle": "Eurostat / Publications Office · DCAT-AP Catalog",
        "status": "Open Access (CC-BY 4.0)",
        "status_color": "blue",
        "meta1": "Format: GeoJSON, SHP, TopoJSON",
        "meta2": "Publisher: European Commission",
        "meta3": "Scope: 27 EU Member States",
        "excerpt": (
            "Authoritative hierarchical classification of administrative and statistical regions in the European Union, "
            "maintained under open public license."
        ),
        "summary": "Official geographic boundary datasets for statistical analysis and spatial modeling in the EU.",
        "url": "https://data.europa.eu/data/datasets/nuts-2024-geographic-boundaries",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "dcat_id": "nuts-2024",
            "license": "CC-BY-4.0",
            "distributions": 5,
        },
    },
    {
        "source_id": "DATAEUROPA-DS-HIGH-VALUE-DATASETS",
        "entity_type": "opendata",
        "display_mode": "card",
        "title": "High-Value Datasets (HVD) — Unified EU Public Sector Information Repository",
        "subtitle": "European Commission — DG CNECT",
        "status": "High-Value Open Data",
        "status_color": "green",
        "meta1": "Categories: Geospatial, Earth, Earth Observation",
        "meta2": "Directive: (EU) 2019/1024",
        "meta3": "API Protocol: REST / OGC API",
        "summary": "Datasets designated under the Open Data Directive for free machine-readable reuse via APIs.",
        "url": "https://data.europa.eu/en/high-value-datasets",
        "verified_at": "18/09/2026",
        "raw_payload": {"dcat_id": "hvd-registry", "theme": "Cross-Border"},
    },
]


class DataEuropaSourceProvider(DemoSourceProvider):
    """data.europa.eu DCAT-AP Hub Search API provider."""

    source_type = "dataeuropa"
    name = "data.europa.eu"

    def __init__(self):
        self.mock_mode = os.getenv("DATAEUROPA_MOCK_ENABLED", "true").lower() in (
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
                "type": "opendata",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_DATAEUROPA_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_DATAEUROPA_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
