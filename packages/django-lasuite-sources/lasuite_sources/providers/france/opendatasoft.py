"""OpenDataSoft Generic Source Provider."""

import logging
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.transport import get_json
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)


class OpenDataSoftProvider(BaseSourceProvider):
    """Generic provider for OpenDataSoft portals."""

    source_type = "opendata"
    name = "OpenDataSoft (Generic)"

    # Example endpoint, usually ODS APIs are at /api/records/1.0/search/
    # For this generic provider, we'll target public ODS catalog
    API_URL = "https://data.opendatasoft.com/api/records/1.0/search/"
    ALLOWED_HOSTS = frozenset(["data.opendatasoft.com"])

    def is_enabled(self) -> bool:
        return True

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
        params = {
            "dataset": "donnees-publiques-francaises-ods",  # A typical central dataset
            "q": query,
            "rows": limit,
        }

        try:
            data = get_json(
                self.API_URL, allowed_hosts=self.ALLOWED_HOSTS, params=params
            )
        except Exception as e:
            logger.error(f"OpenDataSoft query failed: {e}")
            return []

        records = data.get("records", []) if isinstance(data, dict) else []

        results: List[SourceSearchResult] = []
        for item in records:
            fields = item.get("fields", {})
            record_id = item.get("recordid", "")
            title = fields.get("title", "") or fields.get("nom", "Unknown Dataset")

            results.append(
                {
                    "source_id": f"ODS-{record_id}",
                    "entity_type": "opendata",
                    "display_mode": "card",
                    "title": title,
                    "subtitle": fields.get("publisher", "OpenDataSoft"),
                    "status": "Available",
                    "status_color": "blue",
                    "meta1": fields.get("theme", ""),
                    "meta2": fields.get("license", ""),
                    "meta3": "",
                    "excerpt": fields.get("description", ""),
                    "summary": "",
                    "url": f"https://data.opendatasoft.com/explore/dataset/donnees-publiques-francaises-ods/record/{record_id}/",
                    "raw_payload": item,
                }
            )

        return results

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        if source_id.startswith("ODS-"):
            record_id = source_id[4:]
        else:
            record_id = source_id

        params = {
            "dataset": "donnees-publiques-francaises-ods",
            "q": f"recordid:{record_id}",
            "rows": 1,
        }

        try:
            data = get_json(
                self.API_URL, allowed_hosts=self.ALLOWED_HOSTS, params=params
            )
            records = data.get("records", []) if isinstance(data, dict) else []

            if not records:
                return None

            item = records[0]
            fields = item.get("fields", {})
            title = fields.get("title", "") or fields.get("nom", "Unknown Dataset")

            return {
                "source_id": f"ODS-{record_id}",
                "entity_type": "opendata",
                "display_mode": "card",
                "title": title,
                "subtitle": fields.get("publisher", "OpenDataSoft"),
                "status": "Available",
                "status_color": "blue",
                "meta1": fields.get("theme", ""),
                "meta2": fields.get("license", ""),
                "meta3": "",
                "excerpt": fields.get("description", ""),
                "summary": "",
                "url": f"https://data.opendatasoft.com/explore/dataset/donnees-publiques-francaises-ods/record/{record_id}/",
                "raw_payload": item,
            }
        except Exception as e:
            logger.error(f"Failed to fetch detail for {source_id}: {e}")
            return None
