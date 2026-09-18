"""Tests verifying Circuit Breaker and timeout fallback behavior in sovereign providers."""

import pytest
from unittest.mock import MagicMock
from lasuite_sources.registry import SourceProviderRegistry
from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult


class MockFailingProvider(BaseSourceProvider):
    """Simulates a remote API encountering timeouts or 5xx errors."""

    source_type = "custom"
    name = "Mock Failing Provider"

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> list[SourceSuggestResult]:
        raise TimeoutError("Remote ministry API connection timed out after 3.5s")

    def search(self, query: str, limit: int = 10) -> list[SourceSearchResult]:
        raise ConnectionResetError("Remote server 503 Service Unavailable")

    def get_detail(self, source_id: str):
        return None


def test_registry_handles_provider_timeout_gracefully():
    """Verify registry catches provider exceptions and returns an empty list instead of crashing."""
    registry = SourceProviderRegistry()
    failing_provider = MockFailingProvider()
    registry.register(failing_provider)

    # Search must return an empty list without propagating unhandled exceptions
    results = registry.search_with_cache(source_type="custom", query="test timeout", limit=5)
    assert isinstance(results, list)
    assert len(results) == 0

    # Suggest must also return an empty list without crashing
    suggestions = registry.suggest_with_cache(source_type="custom", query="test timeout", limit=3)
    assert isinstance(suggestions, list)
    assert len(suggestions) == 0
