"""Distributed Quota Manager, Health State Machine and Resilience Engine."""

import hashlib
import logging
import threading
import time
from http import HTTPStatus
from typing import Dict, Literal, Optional, TypedDict

from django.conf import settings
from django.core.cache import caches

from redis import Redis

from lasuite_sources.errors import SourceUnavailable

logger = logging.getLogger(__name__)
LOCAL_BUCKET_LOCK = threading.Lock()
BUCKET_LUA = """
local now_parts = redis.call('TIME')
local now = tonumber(now_parts[1]) + tonumber(now_parts[2]) / 1000000
local capacity = tonumber(ARGV[1])
local state = redis.call('HMGET', KEYS[1], 'tokens', 'time')
local tokens = tonumber(state[1]) or capacity
local previous = tonumber(state[2]) or now
tokens = math.min(capacity, tokens + math.max(0, now - previous) * capacity / 60)
local allowed = 0
if tokens >= 1 then tokens = tokens - 1; allowed = 1 end
redis.call('HSET', KEYS[1], 'tokens', tokens, 'time', now)
redis.call('EXPIRE', KEYS[1], 120)
return allowed
"""

ProviderHealthStatus = Literal[
    "healthy",
    "degraded",
    "cached_only",
    "rate_limited",
    "quota_exhausted",
    "disabled",
]


class ProviderHealthInfo(TypedDict):
    """Health information and quota statistics for a sovereign provider."""

    status: ProviderHealthStatus
    message: str
    remaining_quota_percent: int
    circuit_open_until: Optional[float]
    last_error: Optional[str]
    is_live: bool


class QuotaPolicy(TypedDict, total=False):
    """Configuration policy for provider quota limits."""

    max_daily_requests: int
    safety_margin_percent: int  # Default 20% (switches to degraded at 80%)
    burst_per_minute_user: int  # Default 30 req/min per user
    circuit_breaker_threshold: int  # consecutive failures before opening circuit
    cooldown_seconds: int  # seconds circuit remains open


DEFAULT_QUOTA_POLICIES: Dict[str, QuotaPolicy] = {
    "default": {
        "max_daily_requests": 10000,
        "safety_margin_percent": 20,
        "burst_per_minute_user": 60,
        "circuit_breaker_threshold": 3,
        "cooldown_seconds": 60,
    },
    "law": {
        "max_daily_requests": 20000,
        "safety_margin_percent": 15,
        "burst_per_minute_user": 60,
        "circuit_breaker_threshold": 3,
        "cooldown_seconds": 30,
    },
    "eurlex": {
        "max_daily_requests": 50000,
        "safety_margin_percent": 20,
        "burst_per_minute_user": 100,
        "circuit_breaker_threshold": 5,
        "cooldown_seconds": 60,
    },
}


class DistributedQuotaManager:
    """Manages global distributed quota budgets, burst rate limits, and circuit breakers in Redis."""

    def __init__(self, cache_alias: str | None = None):
        self.cache_alias = cache_alias

    @property
    def cache(self):
        """Honor the host's selected cache rather than the default proxy."""
        return caches[
            self.cache_alias
            or getattr(settings, "LASUITE_SOURCES_CACHE_ALIAS", "default")
        ]

    def _increment(self, key: str, timeout: int) -> int:
        self.cache.add(key, 0, timeout=timeout)
        return self.cache.incr(key)

    def reserve_request(self, provider_type: str) -> bool:
        """Reserve before sending; failed upstream requests also consume budget."""
        backend = type(self.cache).__module__
        if not settings.DEBUG and "redis" not in backend:
            raise SourceUnavailable("A Redis cache is required for live quotas")
        if not self.get_health_status(provider_type)["is_live"]:
            return False
        circuit = self.cache.get(self._get_circuit_key(provider_type))
        if circuit is not None and not self.cache.add(
            f"slasher:probe:{provider_type}", True, timeout=5
        ):
            return False
        policy = self.get_policy(provider_type)
        ceiling = max(
            1,
            int(
                policy.get("max_daily_requests", 10000)
                * (100 - policy.get("safety_margin_percent", 20))
                / 100
            ),
        )
        return (
            self._increment(self._get_daily_counter_key(provider_type), 86400 * 2)
            <= ceiling
        )

    def get_policy(self, provider_type: str) -> QuotaPolicy:
        """Get runtime quota policy for a provider."""
        configured = getattr(settings, "LASUITE_SOURCES_QUOTA_POLICIES", {})
        if provider_type in configured:
            return {**DEFAULT_QUOTA_POLICIES["default"], **configured[provider_type]}
        return DEFAULT_QUOTA_POLICIES.get(
            provider_type, DEFAULT_QUOTA_POLICIES["default"]
        )

    def _get_daily_counter_key(self, provider_type: str) -> str:
        date_str = time.strftime("%Y-%m-%d")
        return f"slasher:quota:{provider_type}:{date_str}"

    def _get_circuit_key(self, provider_type: str) -> str:
        return f"slasher:circuit:{provider_type}"

    def _get_error_count_key(self, provider_type: str) -> str:
        return f"slasher:errors:{provider_type}"

    def _get_user_rate_key(self, user_id: str, provider_type: str) -> str:
        digest = hashlib.sha256(user_id.encode()).hexdigest()
        return f"slasher:v2:bucket:{digest}:{provider_type}"

    def check_user_rate_limit(self, user_id: str, provider_type: str) -> bool:
        """Check if user has exceeded per-minute burst limit."""
        if not user_id:
            return True
        policy = self.get_policy(provider_type)
        limit = policy.get("burst_per_minute_user", 60)
        key = self._get_user_rate_key(user_id, provider_type)

        if limit <= 0:
            return False
        alias = self.cache_alias or getattr(
            settings, "LASUITE_SOURCES_CACHE_ALIAS", "default"
        )
        config = settings.CACHES[alias]
        location = config.get("LOCATION", "")
        if "redis" in config["BACKEND"].lower():
            if not isinstance(location, str):
                raise SourceUnavailable(
                    "Quota cache requires a single Redis primary URL"
                )
            with Redis.from_url(
                location, socket_connect_timeout=1, socket_timeout=1
            ) as client:
                return bool(client.eval(BUCKET_LUA, 1, self.cache.make_key(key), limit))
        if not settings.DEBUG:
            raise SourceUnavailable(
                "A Redis cache is required for distributed rate limits"
            )
        # Only the standalone demo/tests may use this process-local implementation.
        with LOCAL_BUCKET_LOCK:
            now = time.monotonic()
            tokens, previous = self.cache.get(key, (float(limit), now))
            tokens = min(limit, tokens + max(0, now - previous) * limit / 60)
            allowed = tokens >= 1
            self.cache.set(key, (tokens - 1 if allowed else tokens, now), timeout=120)
            return allowed

    def get_health_status(self, provider_type: str) -> ProviderHealthInfo:
        """Inspect health, circuit state and remaining quota for provider."""
        policy = self.get_policy(provider_type)
        max_daily = policy.get("max_daily_requests", 10000)
        safety_margin = policy.get("safety_margin_percent", 20)
        threshold_ceiling = int(max_daily * (100 - safety_margin) / 100)

        # Check circuit breaker
        circuit_open_until = self.cache.get(self._get_circuit_key(provider_type))
        now = time.time()
        if circuit_open_until and circuit_open_until > now:
            return {
                "status": "cached_only",
                "message": f"Circuit breaker open until {time.strftime('%H:%M:%S', time.localtime(circuit_open_until))} due to upstream failure.",
                "remaining_quota_percent": 0,
                "circuit_open_until": circuit_open_until,
                "last_error": "Upstream service timeout / 5xx error",
                "is_live": False,
            }

        daily_count = self.cache.get(self._get_daily_counter_key(provider_type), 0)
        remaining_percent = max(0, int((max_daily - daily_count) / max_daily * 100))

        if daily_count >= max_daily:
            return {
                "status": "quota_exhausted",
                "message": "Daily API quota exhausted. Only existing cached records are available.",
                "remaining_quota_percent": 0,
                "circuit_open_until": None,
                "last_error": "Quota 100% reached",
                "is_live": False,
            }
        elif daily_count >= threshold_ceiling:
            return {
                "status": "degraded",
                "message": "Quota safety threshold reached. Cached data only.",
                "remaining_quota_percent": remaining_percent,
                "circuit_open_until": None,
                "last_error": None,
                "is_live": False,
            }

        return {
            "status": "healthy",
            "message": "Requests permitted by local policy; upstream availability is not verified.",
            "remaining_quota_percent": remaining_percent,
            "circuit_open_until": None,
            "last_error": None,
            "is_live": True,
        }

    def record_request_success(self, provider_type: str) -> None:
        """Record successful live request."""
        until = self.cache.get(self._get_circuit_key(provider_type))
        if until is not None and until > time.time():
            return
        self.cache.delete(self._get_error_count_key(provider_type))
        self.cache.delete(self._get_circuit_key(provider_type))
        self.cache.delete(f"slasher:probe:{provider_type}")

    def record_request_failure(
        self,
        provider_type: str,
        status_code: Optional[int] = None,
        retry_after: Optional[int] = None,
    ) -> None:
        """Record provider failure, handle 429 Retry-After, or trip circuit breaker on threshold."""
        policy = self.get_policy(provider_type)
        circuit_key = self._get_circuit_key(provider_type)
        cooldown = policy.get("cooldown_seconds", 60)

        if status_code == HTTPStatus.TOO_MANY_REQUESTS:
            # Respect Retry-After if supplied, or default cooldown
            wait_time = retry_after if retry_after and retry_after > 0 else cooldown
            open_until = time.time() + wait_time
            self.cache.set(circuit_key, open_until, timeout=int(wait_time) + 86400)
            logger.warning(
                "Provider %s returned HTTP 429 Too Many Requests. Circuit opened for %ds.",
                provider_type,
                wait_time,
            )
            return

        error_key = self._get_error_count_key(provider_type)
        errors = self._increment(error_key, 300)

        threshold = policy.get("circuit_breaker_threshold", 3)
        if errors >= threshold:
            open_until = time.time() + cooldown
            self.cache.set(circuit_key, open_until, timeout=cooldown + 86400)
            logger.error(
                "Provider %s exceeded failure threshold (%d/%d). Circuit opened for %ds.",
                provider_type,
                errors,
                threshold,
                cooldown,
            )


# Global singleton instance
quota_manager = DistributedQuotaManager()
