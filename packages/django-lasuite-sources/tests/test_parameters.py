"""Invalid inputs must never reach a provider or silently reset to defaults."""

from unittest.mock import Mock

from rest_framework.test import APIClient

import pytest


@pytest.mark.parametrize("endpoint,maximum", [("search", 50), ("suggest", 20)])
@pytest.mark.parametrize("limit", ["0", "-1", "999999999", "1.5", "invalid"])
def test_invalid_limits_are_rejected(endpoint, maximum, limit, monkeypatch):
    search = Mock()
    monkeypatch.setattr(
        "lasuite_sources.registry.source_registry.search_with_cache", search
    )
    monkeypatch.setattr(
        "lasuite_sources.registry.source_registry.suggest_with_cache", search
    )
    client = APIClient()
    client.force_authenticate(user=Mock(is_authenticated=True, id=1))
    response = client.get(f"/sources/{endpoint}/", {"limit": limit, "q": "test"})
    assert response.status_code == 400
    assert "limit" in response.data
    search.assert_not_called()


@pytest.mark.parametrize("parameters", [{"type": "not-installed"}, {"q": "x" * 501}])
def test_invalid_provider_or_query_is_rejected(parameters):
    client = APIClient()
    client.force_authenticate(user=Mock(is_authenticated=True, id=1))
    assert client.get("/sources/search/", parameters).status_code == 400
