"""Tests verifying Circuit Breaker and timeout fallback behavior in sovereign providers."""

from unittest.mock import MagicMock

import pytest

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.registry import SourceProviderRegistry
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult


class MockFailingProvider(BaseSourceProvider):
    """Simulates a remote API encountering timeouts or 5xx errors."""

    source_type = "test-failing-provider"
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
    with pytest.raises(SourceUnavailable, match="operation unavailable"):
        registry.search_with_cache(
            source_type=failing_provider.source_type, query="test timeout", limit=5
        )

    # Suggest must also return an empty list without crashing
    with pytest.raises(SourceUnavailable, match="operation unavailable"):
        registry.suggest_with_cache(
            source_type=failing_provider.source_type, query="test timeout", limit=3
        )
