"""Distributed Quota Manager, Health State Machine and Resilience Engine."""

import hashlib
import logging
import re
import threading
import time
from http import HTTPStatus
from typing import Dict, Literal, Optional, TypedDict

from django.conf import settings
from django.core.cache import caches

from redis import Redis
from redis.exceptions import RedisError, ResponseError

from lasuite_sources.errors import SourceUnavailable

logger = logging.getLogger(__name__)


def sanitize_redis_url(url_or_msg: str) -> str:
    """Mask password or credentials in Redis URL or exception messages for safe logging."""
    if not isinstance(url_or_msg, str):
        return ""
    cleaned = re.sub(r"://([^:@]+):([^@]+)@", r"://\1:***@", url_or_msg)
    cleaned = re.sub(r"://:([^@]+)@", r"://:***@", cleaned)
    return cleaned


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

RESERVE_DAILY_LUA = """
local current = tonumber(redis.call('GET', KEYS[1]) or '0')
local ceiling = tonumber(ARGV[1])
local ttl = tonumber(ARGV[2])
if current < ceiling then
    local new_val = redis.call('INCR', KEYS[1])
    if new_val == 1 then
        redis.call('EXPIRE', KEYS[1], ttl)
    end
    return 1
else
    return 0
end
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

    def get_canonical_provider_type(self, provider_type: str) -> str:
        """Canonize provider aliases to ensure rate limits and daily quotas cannot be bypassed by alias switching."""
        canonical_map = {
            "statistics": "insee",
            "place": "address",
            "case-law": "law",
            "research": "custom",
        }
        return canonical_map.get(provider_type, provider_type)

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

    def reserve_request(
        self, provider_type: str, date_str: Optional[str] = None
    ) -> bool:
        """Reserve before sending; failed upstream requests also consume budget."""
        canon_type = self.get_canonical_provider_type(provider_type)
        alias = self.cache_alias or getattr(
            settings, "LASUITE_SOURCES_CACHE_ALIAS", "default"
        )
        config = settings.CACHES.get(alias, {})
        backend_name = config.get("BACKEND", "").lower()
        real_backend = type(self.cache).__module__.lower()
        if (
            not settings.DEBUG
            and "redis" not in backend_name
            and "redis" not in real_backend
        ):
            raise SourceUnavailable("A Redis cache is required for live quotas")

        try:
            health = self.get_health_status(canon_type, date_str=date_str)
            if not health["is_live"]:
                return False
            circuit = self.cache.get(self._get_circuit_key(canon_type))
            if circuit is not None and not self.cache.add(
                f"slasher:probe:{canon_type}", True, timeout=5
            ):
                return False
        except SourceUnavailable:
            raise
        except (RedisError, OSError) as err:
            logger.warning(
                "Redis check failed during reservation for %s: %s",
                canon_type,
                sanitize_redis_url(str(err)),
            )
            raise SourceUnavailable("Quota service unavailable") from err

        policy = self.get_policy(canon_type)
        max_daily = policy.get("max_daily_requests", 10000)
        if max_daily <= 0:
            return False
        safety_margin = max(0, min(100, policy.get("safety_margin_percent", 20)))
        ceiling = int(max_daily * (100 - safety_margin) / 100)
        if ceiling <= 0:
            return False
        key = self._get_daily_counter_key(canon_type, date_str=date_str)

        location = config.get("LOCATION", "")
        if "redis" in backend_name:
            if not isinstance(location, str):
                raise SourceUnavailable(
                    "Quota cache requires a single Redis primary URL"
                )
            redis_key = self.cache.make_key(key)
            try:
                with Redis.from_url(
                    location, socket_connect_timeout=1, socket_timeout=1
                ) as client:
                    return bool(
                        client.eval(RESERVE_DAILY_LUA, 1, redis_key, ceiling, 172800)
                    )
            except ResponseError:
                try:
                    with Redis.from_url(
                        location, socket_connect_timeout=1, socket_timeout=1
                    ) as client:
                        val = client.incr(redis_key)
                        if val == 1:
                            client.expire(redis_key, 172800)
                        if val > ceiling:
                            client.decr(redis_key)
                            return False
                        return True
                except (RedisError, OSError) as err:
                    logger.warning(
                        "Redis reservation failed for %s: %s",
                        canon_type,
                        sanitize_redis_url(str(err)),
                    )
                    raise SourceUnavailable("Quota service unavailable") from err
            except (RedisError, OSError) as err:
                logger.warning(
                    "Redis reservation failed for %s: %s",
                    canon_type,
                    sanitize_redis_url(str(err)),
                )
                raise SourceUnavailable("Quota service unavailable") from err

        try:
            with LOCAL_BUCKET_LOCK:
                current = self.cache.get(key, 0)
                if current < ceiling:
                    self._increment(key, 172800)
                    return True
                return False
        except (RedisError, OSError) as err:
            logger.warning(
                "Local reservation failed for %s: %s",
                canon_type,
                sanitize_redis_url(str(err)),
            )
            raise SourceUnavailable("Quota service unavailable") from err

    def get_policy(self, provider_type: str) -> QuotaPolicy:
        """Get runtime quota policy for a provider."""
        canon_type = self.get_canonical_provider_type(provider_type)
        configured = getattr(settings, "LASUITE_SOURCES_QUOTA_POLICIES", {})
        if canon_type in configured:
            return {**DEFAULT_QUOTA_POLICIES["default"], **configured[canon_type]}
        if provider_type in configured:
            return {**DEFAULT_QUOTA_POLICIES["default"], **configured[provider_type]}
        return DEFAULT_QUOTA_POLICIES.get(
            canon_type,
            DEFAULT_QUOTA_POLICIES.get(
                provider_type, DEFAULT_QUOTA_POLICIES["default"]
            ),
        )

    def _get_daily_counter_key(
        self, provider_type: str, date_str: Optional[str] = None
    ) -> str:
        canon_type = self.get_canonical_provider_type(provider_type)
        if date_str is None:
            date_str = time.strftime("%Y-%m-%d")
        return f"slasher:quota:{canon_type}:{date_str}"

    def _get_circuit_key(self, provider_type: str) -> str:
        canon_type = self.get_canonical_provider_type(provider_type)
        return f"slasher:circuit:{canon_type}"

    def _get_error_count_key(self, provider_type: str) -> str:
        canon_type = self.get_canonical_provider_type(provider_type)
        return f"slasher:errors:{canon_type}"

    def _get_user_rate_key(self, user_id: str, provider_type: str) -> str:
        canon_type = self.get_canonical_provider_type(provider_type)
        digest = hashlib.sha256(user_id.encode()).hexdigest()
        return f"slasher:v2:bucket:{digest}:{canon_type}"

    def check_user_rate_limit(self, user_id: str, provider_type: str) -> bool:
        """Check if user has exceeded per-minute burst limit."""
        if not user_id:
            return True
        canon_type = self.get_canonical_provider_type(provider_type)
        policy = self.get_policy(canon_type)
        limit = policy.get("burst_per_minute_user", 60)
        key = self._get_user_rate_key(user_id, canon_type)

        if limit <= 0:
            return False
        alias = self.cache_alias or getattr(
            settings, "LASUITE_SOURCES_CACHE_ALIAS", "default"
        )
        config = settings.CACHES.get(alias, {})
        location = config.get("LOCATION", "")
        if "redis" in config.get("BACKEND", "").lower():
            if not isinstance(location, str):
                raise SourceUnavailable(
                    "Quota cache requires a single Redis primary URL"
                )
            redis_key = self.cache.make_key(key)
            try:
                with Redis.from_url(
                    location, socket_connect_timeout=1, socket_timeout=1
                ) as client:
                    return bool(client.eval(BUCKET_LUA, 1, redis_key, limit))
            except ResponseError:
                try:
                    with Redis.from_url(
                        location, socket_connect_timeout=1, socket_timeout=1
                    ) as client:
                        val = client.incr(redis_key)
                        if val == 1:
                            client.expire(redis_key, 60)
                        if val > limit:
                            client.decr(redis_key)
                            return False
                        return True
                except (RedisError, OSError) as err:
                    logger.warning(
                        "Redis rate limit failed for %s: %s",
                        canon_type,
                        sanitize_redis_url(str(err)),
                    )
                    raise SourceUnavailable(
                        "Quota rate limit service unavailable"
                    ) from err
            except (RedisError, OSError) as err:
                logger.warning(
                    "Redis rate limit failed for %s: %s",
                    canon_type,
                    sanitize_redis_url(str(err)),
                )
                raise SourceUnavailable("Quota rate limit service unavailable") from err

        if not settings.DEBUG and "redis" not in config.get("BACKEND", "").lower():
            raise SourceUnavailable(
                "A Redis cache is required for distributed rate limits"
            )
        # Only the standalone demo/tests may use this process-local implementation.
        try:
            with LOCAL_BUCKET_LOCK:
                now = time.monotonic()
                tokens, previous = self.cache.get(key, (float(limit), now))
                tokens = min(limit, tokens + max(0, now - previous) * limit / 60)
                allowed = tokens >= 1
                self.cache.set(
                    key, (tokens - 1 if allowed else tokens, now), timeout=120
                )
                return allowed
        except (RedisError, OSError) as err:
            logger.warning(
                "Local rate limit check failed for %s: %s",
                canon_type,
                sanitize_redis_url(str(err)),
            )
            raise SourceUnavailable("Quota rate limit service unavailable") from err

    def get_health_status(
        self, provider_type: str, date_str: Optional[str] = None
    ) -> ProviderHealthInfo:
        """Inspect health, circuit state and remaining quota for provider."""
        canon_type = self.get_canonical_provider_type(provider_type)
        policy = self.get_policy(canon_type)
        max_daily = policy.get("max_daily_requests", 10000)
        safety_margin = max(0, min(100, policy.get("safety_margin_percent", 20)))

        if max_daily <= 0:
            return {
                "status": "quota_exhausted",
                "message": "Daily API quota disabled or zero.",
                "remaining_quota_percent": 0,
                "circuit_open_until": None,
                "last_error": "Quota disabled (0 budget)",
                "is_live": False,
            }

        threshold_ceiling = int(max_daily * (100 - safety_margin) / 100)

        # Check circuit breaker
        try:
            circuit_open_until = self.cache.get(self._get_circuit_key(canon_type))
            daily_count = self.cache.get(
                self._get_daily_counter_key(canon_type, date_str=date_str), 0
            )
        except (RedisError, OSError) as err:
            logger.warning(
                "Redis health check failed for %s: %s",
                canon_type,
                sanitize_redis_url(str(err)),
            )
            return {
                "status": "degraded",
                "message": "Quota service unreachable; live upstream requests disabled.",
                "remaining_quota_percent": 0,
                "circuit_open_until": None,
                "last_error": "Redis cache unavailable",
                "is_live": False,
            }

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

        remaining_percent = max(
            0, min(100, int((max_daily - daily_count) / max_daily * 100))
        )

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
        canon_type = self.get_canonical_provider_type(provider_type)
        circuit_key = self._get_circuit_key(canon_type)
        try:
            until = self.cache.get(circuit_key)
            if until is not None and until > time.time():
                # A late concurrent success MUST NOT close an open circuit!
                return
            self.cache.delete(self._get_error_count_key(canon_type))
            self.cache.delete(circuit_key)
            self.cache.delete(f"slasher:probe:{canon_type}")
        except (RedisError, OSError) as err:
            logger.warning(
                "Failed to record success for %s: %s",
                canon_type,
                sanitize_redis_url(str(err)),
            )

    def record_request_failure(
        self,
        provider_type: str,
        status_code: Optional[int] = None,
        retry_after: Optional[int] = None,
    ) -> None:
        """Record provider failure, handle 429 Retry-After, or trip circuit breaker on threshold."""
        canon_type = self.get_canonical_provider_type(provider_type)
        policy = self.get_policy(canon_type)
        circuit_key = self._get_circuit_key(canon_type)
        cooldown = policy.get("cooldown_seconds", 60)

        try:
            # Clear probe lock on failure so a future probe can be attempted when circuit open time expires
            self.cache.delete(f"slasher:probe:{canon_type}")

            if status_code == HTTPStatus.TOO_MANY_REQUESTS:
                # Respect Retry-After if supplied, or default cooldown
                wait_time = retry_after if retry_after and retry_after > 0 else cooldown
                open_until = time.time() + wait_time
                existing_until = self.cache.get(circuit_key)
                if existing_until is not None and existing_until > open_until:
                    # Do NOT shorten a longer existing Retry-After or open circuit time
                    return
                self.cache.set(circuit_key, open_until, timeout=int(wait_time) + 86400)
                logger.warning(
                    "Provider %s returned HTTP 429 Too Many Requests. Circuit opened for %ds.",
                    canon_type,
                    wait_time,
                )
                return

            error_key = self._get_error_count_key(canon_type)
            errors = self._increment(error_key, 300)

            threshold = policy.get("circuit_breaker_threshold", 3)
            if errors >= threshold:
                open_until = time.time() + cooldown
                existing_until = self.cache.get(circuit_key)
                if existing_until is not None and existing_until > open_until:
                    # Do NOT shorten a longer existing Retry-After or open circuit time
                    return
                self.cache.set(circuit_key, open_until, timeout=cooldown + 86400)
                logger.error(
                    "Provider %s exceeded failure threshold (%d/%d). Circuit opened for %ds.",
                    canon_type,
                    errors,
                    threshold,
                    cooldown,
                )
        except (RedisError, OSError) as err:
            logger.warning(
                "Failed to record failure for %s: %s",
                canon_type,
                sanitize_redis_url(str(err)),
            )


# Global singleton instance
quota_manager = DistributedQuotaManager()
