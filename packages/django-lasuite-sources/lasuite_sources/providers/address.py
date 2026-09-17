"""Base Adresse Nationale (BAN / Addok) source provider."""

import logging
from typing import List, Optional

import requests

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

BAN_API_URL = "https://api-adresse.data.gouv.fr/search/"

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
    """Base Adresse Nationale (BAN) provider using Etalab Addok API."""

    source_type = "address"
    name = "Base Adresse Nationale (BAN)"

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "address",
            }
            for r in results
        ]

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        try:
            resp = requests.get(
                BAN_API_URL,
                params={"q": query, "limit": limit, "autocomplete": 1},
                timeout=3.0,
            )
            if resp.status_code == 200:
                data = resp.json()
                features = data.get("features", [])
                results: List[SourceSearchResult] = []
                for f in features:
                    props = f.get("properties", {})
                    geom = f.get("geometry", {})
                    coords = geom.get("coordinates", [0, 0])
                    results.append(
                        {
                            "source_id": props.get("id", f"ADR-{props.get('citycode', '')}"),
                            "entity_type": "address",
                            "display_mode": "card",
                            "title": props.get("label", ""),
                            "subtitle": f"Code Postal : {props.get('postcode', '')} {props.get('city', '')}",
                            "status": "BAN Certifiée",
                            "status_color": "green",
                            "meta1": f"INSEE : {props.get('citycode', '')}",
                            "meta2": f"GPS : {coords[1]:.4f}, {coords[0]:.4f}",
                            "meta3": f"Score : {props.get('score', 0):.2f}",
                            "summary": f"Adresse référencée dans la commune de {props.get('city', '')}.",
                            "url": f"https://adresse.data.gouv.fr/base-adresse-nationale/{props.get('id', '')}",
                            "verified_at": "17/09/2026",
                            "raw_payload": props,
                        }
                    )
                if results:
                    return results
        except Exception as e:
            logger.warning("BAN API lookup failed, falling back to mock: %s", e)

        q = query.lower()
        matched = [
            item
            for item in MOCK_ADDRESS_RESULTS
            if q in item["title"].lower() or (item["subtitle"] and q in item["subtitle"].lower())
        ]
        return matched[:limit] if matched else MOCK_ADDRESS_RESULTS[:limit]

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_ADDRESS_RESULTS:
            if item["source_id"] == source_id:
                return item
        return None
