"""Distributed Quota Manager, Health State Machine and Resilience Engine."""

import hashlib
import logging
import time
from typing import Dict, Literal, Optional, Tuple, TypedDict

from django.conf import settings
from django.core.cache import cache

logger = logging.getLogger(__name__)

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

    def __init__(self, cache_alias: str = "default"):
        self.cache_alias = cache_alias

    def get_policy(self, provider_type: str) -> QuotaPolicy:
        """Get runtime quota policy for a provider."""
        configured = getattr(settings, "LASUITE_SOURCES_QUOTA_POLICIES", {})
        if provider_type in configured:
            return {**DEFAULT_QUOTA_POLICIES["default"], **configured[provider_type]}
        return DEFAULT_QUOTA_POLICIES.get(provider_type, DEFAULT_QUOTA_POLICIES["default"])

    def _get_daily_counter_key(self, provider_type: str) -> str:
        date_str = time.strftime("%Y-%m-%d")
        return f"slasher:quota:{provider_type}:{date_str}"

    def _get_circuit_key(self, provider_type: str) -> str:
        return f"slasher:circuit:{provider_type}"

    def _get_error_count_key(self, provider_type: str) -> str:
        return f"slasher:errors:{provider_type}"

    def _get_user_rate_key(self, user_id: str, provider_type: str) -> str:
        minute_str = time.strftime("%Y-%m-%d-%H-%M")
        return f"slasher:ratelimit:{user_id}:{provider_type}:{minute_str}"

    def check_user_rate_limit(self, user_id: str, provider_type: str) -> bool:
        """Check if user has exceeded per-minute burst limit."""
        if not user_id:
            return True
        policy = self.get_policy(provider_type)
        limit = policy.get("burst_per_minute_user", 60)
        key = self._get_user_rate_key(user_id, provider_type)

        try:
            current = cache.get(key, 0)
            if current >= limit:
                logger.warning(
                    "User %s exceeded burst rate limit on provider %s (%d/%d)",
                    user_id,
                    provider_type,
                    current,
                    limit,
                )
                return False
            cache.set(key, current + 1, timeout=90)
            return True
        except Exception:
            return True

    def get_health_status(self, provider_type: str) -> ProviderHealthInfo:
        """Inspect health, circuit state and remaining quota for provider."""
        policy = self.get_policy(provider_type)
        max_daily = policy.get("max_daily_requests", 10000)
        safety_margin = policy.get("safety_margin_percent", 20)
        threshold_ceiling = int(max_daily * (100 - safety_margin) / 100)

        # Check circuit breaker
        circuit_open_until = cache.get(self._get_circuit_key(provider_type))
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

        daily_count = cache.get(self._get_daily_counter_key(provider_type), 0)
        remaining_percent = max(0, int((max_daily - daily_count) / max_daily * 100))

        if daily_count >= max_daily:
            return {
                "status": "quota_exhausted",
                "message": "Daily API quota fully exhausted. Serving verified cached records.",
                "remaining_quota_percent": 0,
                "circuit_open_until": None,
                "last_error": "Quota 100% reached",
                "is_live": False,
            }
        elif daily_count >= threshold_ceiling:
            return {
                "status": "degraded",
                "message": f"Quota warning (>80% used). Operating in degraded mode.",
                "remaining_quota_percent": remaining_percent,
                "circuit_open_until": None,
                "last_error": None,
                "is_live": True,
            }

        return {
            "status": "healthy",
            "message": "Live API operational.",
            "remaining_quota_percent": remaining_percent,
            "circuit_open_until": None,
            "last_error": None,
            "is_live": True,
        }

    def record_request_success(self, provider_type: str) -> None:
        """Record successful live request."""
        try:
            counter_key = self._get_daily_counter_key(provider_type)
            current = cache.get(counter_key, 0)
            cache.set(counter_key, current + 1, timeout=86400 * 2)
            # Reset error count on success
            cache.delete(self._get_error_count_key(provider_type))
        except Exception as e:
            logger.debug("Quota recording error: %s", e)

    def record_request_failure(
        self, provider_type: str, status_code: Optional[int] = None, retry_after: Optional[int] = None
    ) -> None:
        """Record provider failure, handle 429 Retry-After, or trip circuit breaker on threshold."""
        policy = self.get_policy(provider_type)
        circuit_key = self._get_circuit_key(provider_type)
        cooldown = policy.get("cooldown_seconds", 60)

        if status_code == 429:
            # Respect Retry-After if supplied, or default cooldown
            wait_time = retry_after if retry_after and retry_after > 0 else cooldown
            open_until = time.time() + wait_time
            cache.set(circuit_key, open_until, timeout=int(wait_time) + 10)
            logger.warning(
                "Provider %s returned HTTP 429 Too Many Requests. Circuit opened for %ds.",
                provider_type,
                wait_time,
            )
            return

        error_key = self._get_error_count_key(provider_type)
        errors = cache.get(error_key, 0) + 1
        cache.set(error_key, errors, timeout=300)

        threshold = policy.get("circuit_breaker_threshold", 3)
        if errors >= threshold:
            open_until = time.time() + cooldown
            cache.set(circuit_key, open_until, timeout=cooldown + 10)
            logger.error(
                "Provider %s exceeded failure threshold (%d/%d). Circuit opened for %ds.",
                provider_type,
                errors,
                threshold,
                cooldown,
            )


# Global singleton instance
quota_manager = DistributedQuotaManager()
