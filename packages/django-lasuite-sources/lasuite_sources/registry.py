"""Central registry for sovereign source providers with dynamic entry_points and Redis caching."""

import hashlib
import importlib.metadata
import logging
import threading
from typing import Dict, List, Optional

from django.conf import settings
from django.core.cache import cache

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceEntityType, SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

CACHE_TTL_DEFAULT = getattr(settings, "LASUITE_SOURCES_CACHE_TTL", 86400)
ENTRY_POINT_GROUP = "lasuite_sources.providers"

# Alias mapping to ensure universal entity types resolve transparently
ENTITY_TYPE_ALIASES: Dict[str, str] = {
    "statistics": "insee",
    "insee": "statistics",
    "place": "address",
    "case-law": "law",
    "research": "custom",
}


class SourceProviderRegistry:
    """Thread-safe Singleton registry managing all active and plugin source providers."""

    _instance: Optional["SourceProviderRegistry"] = None
    _lock = threading.Lock()
    _providers: Dict[str, BaseSourceProvider] = {}
    _discovered: bool = False

    def __new__(cls) -> "SourceProviderRegistry":
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._providers = {}
                    cls._instance._discovered = False
        return cls._instance

    def discover_entry_points(self) -> None:
        """Dynamically load and register third-party country/domain providers from Python entry points."""
        with self._lock:
            if self._discovered:
                return

            try:
                eps = importlib.metadata.entry_points()
                # Python 3.10+ select by group
                if hasattr(eps, "select"):
                    matching_eps = eps.select(group=ENTRY_POINT_GROUP)
                else:
                    matching_eps = eps.get(ENTRY_POINT_GROUP, [])

                for ep in matching_eps:
                    try:
                        provider_cls = ep.load()
                        provider_instance = provider_cls()
                        self.register(provider_instance)
                        logger.info(
                            "Loaded plugin provider via entry point '%s': %s",
                            ep.name,
                            provider_cls.__name__,
                        )
                    except Exception as load_err:
                        logger.warning(
                            "Could not load entry point provider '%s': %s",
                            ep.name,
                            load_err,
                        )
            except Exception as err:
                logger.warning("Error scanning entry points for group '%s': %s", ENTRY_POINT_GROUP, err)

            self._discovered = True

    def register(self, provider: BaseSourceProvider) -> None:
        """Register a new source provider instance."""
        with self._lock:
            self._providers[provider.source_type] = provider
            logger.info(
                "Registered sovereign source provider: %s (%s)",
                provider.name,
                provider.source_type,
            )

    def get_provider(self, source_type: str) -> Optional[BaseSourceProvider]:
        """Retrieve provider by type or alias if registered and enabled."""
        if not self._discovered:
            self.discover_entry_points()

        provider = self._providers.get(source_type)
        if provider and provider.is_enabled():
            return provider

        # Try fallback alias
        alias_type = ENTITY_TYPE_ALIASES.get(source_type)
        if alias_type:
            alias_provider = self._providers.get(alias_type)
            if alias_provider and alias_provider.is_enabled():
                return alias_provider

        return None

    def list_enabled_types(self) -> List[str]:
        """List all active provider types."""
        if not self._discovered:
            self.discover_entry_points()

        return [
            source_type
            for source_type, provider in self._providers.items()
            if provider.is_enabled()
        ]

    def search_with_cache(
        self, source_type: str, query: str, limit: int = 10
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
        self, source_type: str, query: str, limit: int = 5
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
