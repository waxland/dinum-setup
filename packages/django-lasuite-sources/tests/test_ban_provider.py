"""Tests for Base Adresse Nationale (BAN / Addok) Geoplateforme provider (R-04.02)."""

from unittest.mock import patch

from django.core.cache import cache
from django.test import override_settings

import pytest

from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.providers.france.address import AddressSourceProvider


@pytest.fixture(autouse=True)
def clear_cache():
    cache.clear()
    yield
    cache.clear()


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_ban_search_live_geojson_parsing():
    """Verify BAN Addok live search parses GeoJSON features, bounds limit, and constructs permalink (R-04.02)."""
    provider = AddressSourceProvider()

    mock_geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [2.3082, 48.8504]},
                "properties": {
                    "id": "75107_0020_00020",
                    "label": "20 Avenue de Ségur 75007 Paris",
                    "name": "20 Avenue de Ségur",
                    "postcode": "75007",
                    "citycode": "75107",
                    "city": "Paris",
                    "context": "75, Paris, Île-de-France",
                    "type": "housenumber",
                    "score": 0.98,
                },
            }
        ],
    }

    with patch(
        "lasuite_sources.providers.france.address.get_json", return_value=mock_geojson
    ) as mock_get_json:
        results = provider.search("20 avenue de Ségur Paris", limit=10)

        mock_get_json.assert_called_once_with(
            "https://data.geopf.fr/geocodage/search",
            allowed_hosts=frozenset({"data.geopf.fr"}),
            params={"q": "20 avenue de Ségur Paris", "limit": 10, "index": "address"},
        )

        assert len(results) == 1
        item = results[0]
        assert item["source_id"] == "75107_0020_00020"
        assert item["entity_type"] == "address"
        assert item["display_mode"] == "card"
        assert item["title"] == "20 Avenue de Ségur 75007 Paris"
        assert item["subtitle"] == "Paris"
        assert item["status"] == "BAN"
        assert item["status_color"] == "blue"
        assert item["meta1"] == "INSEE : 75107"
        assert item["meta2"] == "Code postal : 75007"
        assert item["meta3"] == "Type : housenumber"
        assert item["provider"] == "address"
        assert item["origin"] == "upstream"
        assert item["verified_at"] is None
        assert item["retrieved_at"] is not None
        assert (
            item["url"]
            == "https://adresse.data.gouv.fr/base-adresse-nationale/75107_0020_00020"
        )
        assert item["raw_payload"] == mock_geojson["features"][0]["properties"]


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_ban_empty_or_whitespace_query_returns_empty_list():
    """Verify BAN search with empty string or whitespace returns [] without calling get_json (R-04.02)."""
    provider = AddressSourceProvider()

    with patch("lasuite_sources.providers.france.address.get_json") as mock_get_json:
        assert provider.search("", limit=10) == []
        assert provider.search("   ", limit=10) == []
        mock_get_json.assert_not_called()


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_ban_invalid_geojson_structure_raises_source_unavailable():
    """Verify BAN search raises SourceUnavailable when upstream returns non-dict or invalid GeoJSON (R-04.02)."""
    provider = AddressSourceProvider()

    with patch(
        "lasuite_sources.providers.france.address.get_json", return_value="not a dict"
    ):
        with pytest.raises(SourceUnavailable, match="Invalid Geoplateforme response"):
            provider.search("Paris")

    with patch(
        "lasuite_sources.providers.france.address.get_json",
        return_value={"features": "not a list"},
    ):
        with pytest.raises(SourceUnavailable, match="Invalid Geoplateforme response"):
            provider.search("Paris")

    with patch(
        "lasuite_sources.providers.france.address.get_json",
        return_value={"features": [{"properties": None}]},
    ):
        with pytest.raises(SourceUnavailable, match="Missing address properties"):
            provider.search("Paris")

    with patch(
        "lasuite_sources.providers.france.address.get_json",
        return_value={"features": [{"properties": {"id": "", "label": "no id"}}]},
    ):
        with pytest.raises(SourceUnavailable, match="Missing address identity"):
            provider.search("Paris")


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_ban_get_detail_live_mode_returns_none_without_inventing_endpoint():
    """Verify BAN Addok in live mode returns None for get_detail, documenting that direct ID lookup is unsupported (R-04.02)."""
    provider = AddressSourceProvider()

    with patch("lasuite_sources.providers.france.address.get_json") as mock_get_json:
        detail = provider.get_detail("75107_0020_00020")
        assert detail is None
        # Upstream search MUST NOT be called with fake endpoints
        mock_get_json.assert_not_called()


@override_settings(LASUITE_SOURCES_DEMO=True)
def test_ban_demo_mode_returns_demo_fixtures():
    """Verify BAN in demo mode returns demo fixtures and handles get_detail (R-04.02)."""
    provider = AddressSourceProvider()

    results = provider.search("Ségur", limit=5)
    assert len(results) >= 1
    assert results[0]["origin"] == "demo"
    assert results[0]["provider"] == "address"

    detail = provider.get_detail("ADR-75107-0020-0020")
    assert detail is not None
    assert detail["source_id"] == "ADR-75107-0020-0020"
    assert detail["title"] == "20 avenue de Ségur, 75007 Paris"
