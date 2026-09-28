"""Tests for Albert (IA Souveraine DINUM / Etalab) RAG provider (R-04.03)."""

from unittest.mock import patch

from django.core.cache import cache
from django.test import override_settings

import pytest

from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.providers.france.albert import AlbertSourceProvider


@pytest.fixture(autouse=True)
def clear_cache():
    cache.clear()
    yield
    cache.clear()


def test_albert_is_enabled_only_when_api_key_or_demo_configured(monkeypatch):
    """Verify Albert provider is_enabled is False in live mode without ALBERT_API_KEY (R-04.03)."""
    monkeypatch.delenv("ALBERT_API_KEY", raising=False)
    provider = AlbertSourceProvider()

    # Live mode without API key -> disabled
    with override_settings(LASUITE_SOURCES_DEMO=False):
        assert provider.is_enabled() is False

    # Live mode with API key -> enabled
    provider.api_key = "test-albert-key-123"
    with override_settings(LASUITE_SOURCES_DEMO=False):
        assert provider.is_enabled() is True

    # Demo mode -> enabled
    with override_settings(LASUITE_SOURCES_DEMO=True):
        assert provider.is_enabled() is True


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_albert_live_search_parses_rag_results(monkeypatch):
    """Verify live search on Albert API parses RAG results and includes metadata (R-04.03)."""
    provider = AlbertSourceProvider()
    provider.api_key = "albert-secret-token"

    mock_albert_response = {
        "results": [
            {
                "id": "ALBERT-RAG-123",
                "title": "Préavis de démission agent contractuel",
                "subtitle": "Décret n° 86-83 - Art. 48",
                "excerpt": "L'agent contractuel qui démissionne doit respecter un préavis...",
                "summary": "Durée légale du préavis de démission",
                "source": "DGAFP / Service-Public",
                "model": "Albert-Large-Fr-v2",
                "score": 96,
                "url": "https://albert.etalab.gouv.fr/doc/123",
                "verified_at": "2026-09-28T10:00:00Z",
                "raw_payload": {"tokens": 150},
            }
        ]
    }

    with patch(
        "lasuite_sources.providers.france.albert.get_json",
        return_value=mock_albert_response,
    ) as mock_get_json:
        results = provider.search("préavis démission", limit=5)

        mock_get_json.assert_called_once_with(
            "https://albert.api.etalab.gouv.fr/v1/search",
            allowed_hosts=frozenset({"albert.api.etalab.gouv.fr"}),
            params={"q": "préavis démission", "limit": 5},
        )

        assert len(results) == 1
        item = results[0]
        assert item["source_id"] == "ALBERT-RAG-123"
        assert item["entity_type"] == "custom"
        assert item["display_mode"] == "callout"
        assert item["title"] == "Préavis de démission agent contractuel"
        assert item["status"] == "Certifié Albert RAG"
        assert item["status_color"] == "purple"
        assert item["provider"] == "custom"
        assert item["origin"] == "upstream"
        assert item["verified_at"] == "2026-09-28T10:00:00Z"


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_albert_live_search_raises_source_unavailable_without_key():
    """Verify live search raises SourceUnavailable when ALBERT_API_KEY is missing (R-04.03)."""
    provider = AlbertSourceProvider()
    provider.api_key = ""

    with pytest.raises(SourceUnavailable, match="Albert API key"):
        provider.search("démission")


@override_settings(LASUITE_SOURCES_DEMO=True)
def test_albert_demo_mode_returns_demo_fixtures():
    """Verify Albert in demo mode returns demo fixtures and handles get_detail (R-04.03)."""
    provider = AlbertSourceProvider()

    results = provider.search("démission", limit=5)
    assert len(results) >= 1
    assert results[0]["origin"] == "demo"
    assert results[0]["provider"] == "custom"

    detail = provider.get_detail("ALBERT-RAG-FP-001")
    assert detail is not None
    assert detail["source_id"] == "ALBERT-RAG-FP-001"
    assert "démission" in detail["title"].lower()
