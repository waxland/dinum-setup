"""Abstract base class for all sovereign source providers."""

from abc import ABC, abstractmethod
from typing import Optional

from lasuite_sources.types import (
    SourceEntityType,
    SourceSearchResult,
    SourceSuggestResult,
)


class BaseSourceProvider(ABC):
    """
    Abstract contract that all source connectors must fulfill.
    Guarantees uniform search, autocomplete, and detail retrieval across public sources.
    """

    source_type: SourceEntityType
    name: str

    @abstractmethod
    def is_enabled(self) -> bool:
        """Check if required API credentials/environment flags are configured."""

    @abstractmethod
    def suggest(self, query: str, limit: int = 5) -> list[SourceSuggestResult]:
        """Fast autocomplete lookup (< 100ms response time)."""

    @abstractmethod
    def search(self, query: str, limit: int = 10) -> list[SourceSearchResult]:
        """Structured search returning normalized cards/callouts."""

    @abstractmethod
    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        """Fetch complete verified payload for a specific entity ID."""
