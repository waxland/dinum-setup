"""Central registry for sovereign source providers with Redis caching."""

import hashlib
import logging
from typing import Dict, List, Optional

from django.conf import settings
from django.core.cache import cache

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceEntityType, SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

CACHE_TTL_DEFAULT = getattr(settings, "LASUITE_SOURCES_CACHE_TTL", 86400)


class SourceProviderRegistry:
    """Singleton registry managing all active source providers."""

    _instance: Optional["SourceProviderRegistry"] = None
    _providers: Dict[SourceEntityType, BaseSourceProvider] = {}

    def __new__(cls) -> "SourceProviderRegistry":
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._providers = {}
        return cls._instance

    def register(self, provider: BaseSourceProvider) -> None:
        """Register a new source provider instance."""
        self._providers[provider.source_type] = provider
        logger.info(
            "Registered sovereign source provider: %s (%s)",
            provider.name,
            provider.source_type,
        )

    def get_provider(self, source_type: SourceEntityType) -> Optional[BaseSourceProvider]:
        """Retrieve provider if registered and enabled."""
        provider = self._providers.get(source_type)
        if provider and provider.is_enabled():
            return provider
        return None

    def list_enabled_types(self) -> List[SourceEntityType]:
        """List all active provider types."""
        return [
            source_type
            for source_type, provider in self._providers.items()
            if provider.is_enabled()
        ]

    def search_with_cache(
        self, source_type: SourceEntityType, query: str, limit: int = 10
    ) -> List[SourceSearchResult]:
        """Search a provider with 24h Redis cache and circuit breaker safety."""
        provider = self.get_provider(source_type)
        if not provider:
            return []

        query_normalized = query.strip().lower()
        query_hash = hashlib.sha256(query_normalized.encode("utf-8")).hexdigest()[:16]
        cache_key = f"source:search:{source_type}:{query_hash}:{limit}"

        cached_results = cache.get(cache_key)
        if cached_results is not None:
            return cached_results

        try:
            results = provider.search(query=query_normalized, limit=limit)
            cache.set(cache_key, results, timeout=CACHE_TTL_DEFAULT)
            return results
        except Exception as err:
            logger.error("Error executing search for provider %s: %s", source_type, err)
            return []

    def suggest_with_cache(
        self, source_type: SourceEntityType, query: str, limit: int = 5
    ) -> List[SourceSuggestResult]:
        """Fast autocomplete suggestions with short caching."""
        provider = self.get_provider(source_type)
        if not provider:
            return []

        query_normalized = query.strip().lower()
        query_hash = hashlib.sha256(query_normalized.encode("utf-8")).hexdigest()[:16]
        cache_key = f"source:suggest:{source_type}:{query_hash}:{limit}"

        cached_results = cache.get(cache_key)
        if cached_results is not None:
            return cached_results

        try:
            results = provider.suggest(query=query_normalized, limit=limit)
            cache.set(cache_key, results, timeout=3600)
            return results
        except Exception as err:
            logger.error("Error executing suggest for provider %s: %s", source_type, err)
            return []


# Global singleton instance
source_registry = SourceProviderRegistry()
