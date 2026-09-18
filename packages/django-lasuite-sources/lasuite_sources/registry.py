"""Central registry for sovereign source providers with dynamic entry_points and Redis caching."""

import hashlib
import importlib.metadata
import logging
import threading
from typing import Callable, Dict, List, Optional

from django.conf import settings
from django.core.cache import caches

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.errors import SourceRateLimited, SourceUnavailable
from lasuite_sources.quota import ProviderHealthInfo, quota_manager
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

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
    _discovery_condition = threading.Condition(_lock)
    _discovering_thread: Optional[int] = None
    _providers: Dict[str, BaseSourceProvider] = {}
    _discovered: bool = False

    def __new__(cls) -> "SourceProviderRegistry":
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._providers = {}  # noqa: SLF001 - initialize this class's singleton
                    cls._instance._discovered = False  # noqa: SLF001 - initialize this class's singleton
        return cls._instance

    def discover_entry_points(self) -> None:
        """Dynamically load and register third-party country/domain providers from Python entry points."""
        owner = threading.get_ident()
        with self._discovery_condition:
            while self._discovering_thread is not None:
                if self._discovering_thread == owner:
                    return
                self._discovery_condition.wait()
            if self._discovered:
                return
            self._discovering_thread = owner

        # Plugin constructors may call back into this registry. Never run them
        # while holding the registry lock; other discoverers wait for completion.
        try:
            for ep in importlib.metadata.entry_points(group=ENTRY_POINT_GROUP):
                try:
                    provider = ep.load()()
                    if not isinstance(provider, BaseSourceProvider):
                        raise TypeError("Entry point must provide a BaseSourceProvider")
                    self.register(provider)
                except Exception:  # noqa: BLE001 - isolate arbitrary third-party plugins
                    logger.warning("Could not load source plugin '%s'.", ep.name)
        finally:
            with self._discovery_condition:
                self._discovered = True
                self._discovering_thread = None
                self._discovery_condition.notify_all()

    def register(self, provider: BaseSourceProvider) -> None:
        """Register a new source provider instance."""
        with self._lock:
            existing = self._providers.get(provider.source_type)
            if existing is not None and existing is not provider:
                raise ValueError(f"Provider already registered: {provider.source_type}")
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

        with self._lock:
            provider = self._providers.get(source_type)
            alias_provider = self._providers.get(ENTITY_TYPE_ALIASES.get(source_type))
        if provider and provider.is_enabled():
            return provider

        # Try fallback alias
        if alias_provider and alias_provider.is_enabled():
            return alias_provider

        return None

    def is_registered(self, source_type: str) -> bool:
        """Recognize disabled providers and aliases without invoking their APIs."""
        self.discover_entry_points()
        with self._lock:
            return (
                source_type in self._providers
                or ENTITY_TYPE_ALIASES.get(source_type) in self._providers
            )

    def list_enabled_types(self) -> List[str]:
        """List all active provider types."""
        if not self._discovered:
            self.discover_entry_points()

        with self._lock:
            providers = list(self._providers.items())
        return [
            source_type for source_type, provider in providers if provider.is_enabled()
        ]

    def _request[T](
        self,
        provider: BaseSourceProvider,
        operation: str,
        identity: str,
        user_id: Optional[str],
        fetch: Callable[[], T],
    ) -> tuple[T, bool]:
        """Share policy across search, suggestion, detail and background callers."""
        source_type = provider.source_type
        if user_id and not quota_manager.check_user_rate_limit(user_id, source_type):
            raise SourceRateLimited("User rate limit reached")
        mode = "demo" if getattr(settings, "LASUITE_SOURCES_DEMO", False) else "live"
        digest = hashlib.sha256(repr((identity, user_id)).encode()).hexdigest()
        key = f"source:v3:{mode}:{operation}:{source_type}:{digest}"
        storage = caches[getattr(settings, "LASUITE_SOURCES_CACHE_ALIAS", "default")]
        cached = storage.get(key)
        if cached is not None:
            return cached, True
        is_demo = isinstance(provider, DemoSourceProvider) or mode == "demo"
        if not is_demo and not quota_manager.reserve_request(source_type):
            raise SourceUnavailable("Provider budget or circuit unavailable")
        try:
            result = fetch()
        except Exception as error:
            if not is_demo:
                quota_manager.record_request_failure(
                    source_type,
                    status_code=getattr(error, "status_code", None),
                    retry_after=getattr(error, "retry_after", None),
                )
            logger.warning("Source operation failed: %s / %s", source_type, operation)
            raise SourceUnavailable("Provider operation unavailable") from error
        if not is_demo:
            quota_manager.record_request_success(source_type)
        storage.set(
            key, result, timeout=getattr(settings, "LASUITE_SOURCES_CACHE_TTL", 86400)
        )
        return result, False

    def _require_provider(self, source_type: str) -> BaseSourceProvider:
        provider = self.get_provider(source_type)
        if provider is None:
            raise SourceUnavailable("Provider unavailable")
        return provider

    def search_with_cache(
        self,
        source_type: str,
        query: str,
        limit: int = 10,
        user_id: Optional[str] = None,
    ) -> List[SourceSearchResult]:
        """Search with a user-scoped, versioned cache and explicit delivery metadata."""
        provider = self._require_provider(source_type)
        normalized = query.strip()
        result, cached = self._request(
            provider,
            "search",
            repr((normalized, limit)),
            user_id,
            lambda: provider.search(query=normalized, limit=limit),
        )
        return [
            {
                **item,
                "provider": provider.source_type,
                "delivery": "cache" if cached else "live",
            }
            for item in result
        ]

    def suggest_with_cache(
        self,
        source_type: str,
        query: str,
        limit: int = 5,
        user_id: Optional[str] = None,
    ) -> List[SourceSuggestResult]:
        """Autocomplete uses the same admission control as full search."""
        provider = self._require_provider(source_type)
        result, _ = self._request(
            provider,
            "suggest",
            repr((query.strip(), limit)),
            user_id,
            lambda: provider.suggest(query=query.strip(), limit=limit),
        )
        return result

    def detail_with_cache(
        self,
        source_type: str,
        source_id: str,
        user_id: Optional[str] = None,
    ) -> Optional[SourceSearchResult]:
        """Detail requests cannot bypass rate limits, circuit state or cache isolation."""
        provider = self._require_provider(source_type)
        result, cached = self._request(
            provider,
            "detail",
            source_id,
            user_id,
            lambda: provider.get_detail(source_id),
        )
        if result is None:
            return None
        return {
            **result,
            "provider": provider.source_type,
            "delivery": "cache" if cached else "live",
        }

    def provider_health(self, source_type: str) -> ProviderHealthInfo:
        """Availability is not a claim that a demonstration connector is live."""
        provider = self.get_provider(source_type)
        is_demo = isinstance(provider, DemoSourceProvider) or getattr(
            settings, "LASUITE_SOURCES_DEMO", False
        )
        if provider is None or is_demo:
            return {
                "status": "disabled",
                "message": "Demonstration only" if provider else "Unavailable",
                "is_live": False,
                "remaining_quota_percent": 0,
                "circuit_open_until": None,
                "last_error": None,
            }
        return quota_manager.get_health_status(provider.source_type)


# Global singleton instance
source_registry = SourceProviderRegistry()
