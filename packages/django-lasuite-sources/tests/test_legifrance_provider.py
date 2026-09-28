"""Tests for Légifrance / DILA (PISTE OAuth2) Law source provider (R-04.03)."""

from unittest.mock import patch

from django.core.cache import cache
from django.test import override_settings

import pytest

from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.providers.france.law import LawSourceProvider


@pytest.fixture(autouse=True)
def clear_cache():
    cache.clear()
    yield
    cache.clear()


def test_legifrance_is_enabled_only_when_piste_credentials_or_demo_configured(
    monkeypatch,
):
    """Verify Légifrance provider is_enabled is False in live mode without PISTE credentials (R-04.03)."""
    monkeypatch.delenv("PISTE_CLIENT_ID", raising=False)
    monkeypatch.delenv("PISTE_CLIENT_SECRET", raising=False)
    provider = LawSourceProvider()

    # Live mode without credentials -> disabled
    with override_settings(LASUITE_SOURCES_DEMO=False):
        assert provider.is_enabled() is False

    # Live mode with credentials -> enabled
    provider.client_id = "test-piste-client"
    provider.client_secret = "test-piste-secret"
    with override_settings(LASUITE_SOURCES_DEMO=False):
        assert provider.is_enabled() is True

    # Demo mode -> enabled
    with override_settings(LASUITE_SOURCES_DEMO=True):
        assert provider.is_enabled() is True


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_legifrance_live_search_parses_piste_results(monkeypatch):
    """Verify live search on PISTE Légifrance API parses legal articles and includes verified_at (R-04.03)."""
    provider = LawSourceProvider()
    provider.client_id = "piste-id"
    provider.client_secret = "piste-secret"

    mock_piste_response = {
        "results": [
            {
                "id": "LEGIARTI000037812976",
                "title": "Article L. 111-1 du Code de la commande publique",
                "subtitle": "Code de la commande publique",
                "status": "En vigueur",
                "excerpt": "Un marché est un contrat conclu par un ou plusieurs acheteurs...",
                "url": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976",
                "verified_at": "28/09/2026",
                "raw_payload": {"cid": "LEGITEXT000037701019"},
            }
        ]
    }

    with patch(
        "lasuite_sources.providers.france.law.get_json",
        return_value=mock_piste_response,
    ) as mock_get_json:
        results = provider.search("commande publique", limit=5)

        mock_get_json.assert_called_once_with(
            "https://api.piste.gouv.fr/dila/legifrance/v1/search",
            allowed_hosts=frozenset({"api.piste.gouv.fr"}),
            params={"q": "commande publique", "pageSize": 5},
        )

        assert len(results) == 1
        item = results[0]
        assert item["source_id"] == "LEGIARTI000037812976"
        assert item["entity_type"] == "law"
        assert item["display_mode"] == "callout"
        assert item["title"] == "Article L. 111-1 du Code de la commande publique"
        assert item["status"] == "En vigueur"
        assert item["status_color"] == "green"
        assert item["provider"] == "law"
        assert item["origin"] == "upstream"
        assert item["verified_at"] == "28/09/2026"


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_legifrance_live_search_raises_source_unavailable_without_credentials():
    """Verify live search raises SourceUnavailable when PISTE credentials are missing (R-04.03)."""
    provider = LawSourceProvider()
    provider.client_id = ""
    provider.client_secret = ""

    with pytest.raises(SourceUnavailable, match="Légifrance PISTE credentials"):
        provider.search("code civil")


@override_settings(LASUITE_SOURCES_DEMO=True)
def test_legifrance_demo_mode_returns_demo_fixtures():
    """Verify Légifrance in demo mode returns demo fixtures and handles get_detail (R-04.03)."""
    provider = LawSourceProvider()

    results = provider.search("commande publique", limit=5)
    assert len(results) >= 1
    assert results[0]["origin"] == "demo"
    assert results[0]["provider"] == "law"

    detail = provider.get_detail("LEGIARTI000037812976")
    assert detail is not None
    assert detail["source_id"] == "LEGIARTI000037812976"
    assert "article l. 111-1" in detail["title"].lower()
