"""Base Adresse Nationale (BAN / Addok) source provider."""

import logging
from typing import List, Optional

from django.conf import settings
from django.utils import timezone

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.transport import get_json
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

BAN_API_URL = "https://data.geopf.fr/geocodage/search"

MOCK_ADDRESS_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "ADR-75107-0020-0020",
        "entity_type": "address",
        "display_mode": "card",
        "title": "20 avenue de Ségur, 75007 Paris",
        "subtitle": "Site Ségur-Fontenoy (DINUM & Ministères Sociaux)",
        "status": "BAN Certifiée",
        "status_color": "green",
        "meta1": "INSEE : 75107",
        "meta2": "GPS : 48.8504, 2.3082",
        "meta3": "Score de confiance : 0.98",
        "summary": "Siège de la Direction Interministérielle du Numérique (DINUM).",
        "url": "https://adresse.data.gouv.fr/base-adresse-nationale/75107_0020_00020#18/48.8504/2.3082",
        "verified_at": "17/09/2026",
        "raw_payload": {"lat": 48.8504, "lon": 2.3082, "citycode": "75107"},
    },
    {
        "source_id": "ADR-75107-0057-0057",
        "entity_type": "address",
        "display_mode": "card",
        "title": "57 rue de Varenne, 75007 Paris",
        "subtitle": "Hôtel de Matignon",
        "status": "BAN Certifiée",
        "status_color": "green",
        "meta1": "INSEE : 75107",
        "meta2": "GPS : 48.8553, 2.3206",
        "meta3": "Score : 0.99",
        "summary": "Résidence officielle et lieu de travail du Premier ministre.",
        "url": "https://adresse.data.gouv.fr/base-adresse-nationale/75107",
        "verified_at": "17/09/2026",
        "raw_payload": {"lat": 48.8553, "lon": 2.3206, "citycode": "75107"},
    },
]


class AddressSourceProvider(BaseSourceProvider):
    """BAN addresses served by the IGN Geoplateforme; no implicit fixtures."""

    source_type = "address"
    name = "BAN / Geoplateforme"

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        return [
            {
                "id": item["source_id"],
                "title": item["title"],
                "subtitle": item.get("subtitle") or "",
                "type": "address",
            }
            for item in self.search(query, limit)
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        if not query or not query.strip():
            return []

        bounded_limit = min(max(1, limit), 50)

        if getattr(settings, "LASUITE_SOURCES_DEMO", False):
            return [
                {
                    **item,
                    "origin": "demo",
                    "provider": self.source_type,
                    "verified_at": None,
                    "status": "Demonstration",
                }
                for item in MOCK_ADDRESS_RESULTS
                if query.lower() in item["title"].lower()
            ][:bounded_limit]

        data = get_json(
            BAN_API_URL,
            allowed_hosts=frozenset({"data.geopf.fr"}),
            params={"q": query.strip(), "limit": bounded_limit, "index": "address"},
        )
        if not isinstance(data, dict) or not isinstance(data.get("features"), list):
            raise SourceUnavailable("Invalid Geoplateforme response")

        results: List[SourceSearchResult] = []
        for feature in data["features"][:bounded_limit]:
            if not isinstance(feature, dict):
                raise SourceUnavailable("Invalid address feature")
            props = feature.get("properties")
            if not isinstance(props, dict):
                raise SourceUnavailable("Missing address properties")
            identifier = props.get("id")
            label = props.get("label")
            if (
                not isinstance(identifier, str)
                or not identifier
                or not isinstance(label, str)
            ):
                raise SourceUnavailable("Missing address identity")

            citycode = props.get("citycode")
            postcode = props.get("postcode")
            address_type = props.get("type")

            results.append(
                {
                    "source_id": identifier,
                    "entity_type": "address",
                    "display_mode": "card",
                    "title": label,
                    "subtitle": props.get("city") or props.get("context"),
                    "status": "BAN",
                    "status_color": "blue",
                    "meta1": f"INSEE : {citycode}" if citycode else "",
                    "meta2": f"Code postal : {postcode}" if postcode else "",
                    "meta3": f"Type : {address_type}" if address_type else "",
                    "provider": self.source_type,
                    "origin": "upstream",
                    "verified_at": None,
                    "retrieved_at": timezone.now().isoformat(),
                    "raw_payload": props,
                    "url": f"https://adresse.data.gouv.fr/base-adresse-nationale/{identifier}",
                }
            )
        return results

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        """
        The upstream BAN Addok API on data.geopf.fr does not support direct ID lookup.
        In live mode, get_detail returns None for un-cached IDs without inventing a non-existent endpoint.
        """
        if getattr(settings, "LASUITE_SOURCES_DEMO", False):
            for item in MOCK_ADDRESS_RESULTS:
                if item["source_id"] == source_id:
                    return {
                        **item,
                        "origin": "demo",
                        "provider": self.source_type,
                        "verified_at": None,
                        "status": "Demonstration",
                    }
            return None
        return None
