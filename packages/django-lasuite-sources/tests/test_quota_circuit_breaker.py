"""Unit tests for DistributedQuotaManager, Rate Limiting and Circuit Breaker."""

import time

from django.core.cache import cache

import pytest

from lasuite_sources.quota import DistributedQuotaManager, quota_manager


@pytest.fixture(autouse=True)
def clear_quota_cache():
    """Clear test cache before and after each test."""
    cache.clear()
    yield
    cache.clear()


def test_quota_manager_initial_health():
    """Verify fresh provider starts with healthy state and 100% quota."""
    health = quota_manager.get_health_status("law")
    assert health["status"] == "healthy"
    assert health["is_live"] is True
    assert health["remaining_quota_percent"] == 100
    assert health["circuit_open_until"] is None


def test_user_burst_rate_limiting():
    """Verify per-user burst limit throttles aggressive requests."""
    manager = DistributedQuotaManager()
    user_id = "user_test_42"

    # Default burst is 60 req/min
    for _ in range(60):
        assert manager.check_user_rate_limit(user_id, "law") is True

    # 61st request should trip burst rate limit
    assert manager.check_user_rate_limit(user_id, "law") is False


def test_quota_degraded_and_exhausted_thresholds():
    """Verify quota degradation at 80% and exhaustion at 100%."""
    manager = DistributedQuotaManager()
    counter_key = manager._get_daily_counter_key("law")  # noqa: SLF001 - seed an exact boundary without 20,000 requests

    # Policy for law has max 20,000, 15% safety margin -> degraded at 17,000
    cache.set(counter_key, 17500, timeout=3600)
    health_degraded = manager.get_health_status("law")
    assert health_degraded["status"] == "degraded"
    assert health_degraded["is_live"] is False
    assert health_degraded["remaining_quota_percent"] <= 15

    # 100% quota reached
    cache.set(counter_key, 20000, timeout=3600)
    health_exhausted = manager.get_health_status("law")
    assert health_exhausted["status"] == "quota_exhausted"
    assert health_exhausted["is_live"] is False
    assert health_exhausted["remaining_quota_percent"] == 0


def test_circuit_breaker_on_consecutive_failures():
    """Verify circuit breaker trips and enters cached_only mode on failures."""
    manager = DistributedQuotaManager()

    # Law has threshold = 3 failures
    manager.record_request_failure("law")
    manager.record_request_failure("law")
    assert manager.get_health_status("law")["status"] == "healthy"

    # 3rd failure trips circuit
    manager.record_request_failure("law")
    health = manager.get_health_status("law")
    assert health["status"] == "cached_only"
    assert health["is_live"] is False
    assert health["circuit_open_until"] is not None


def test_circuit_breaker_on_http_429_retry_after():
    """Verify HTTP 429 opens circuit breaker respecting Retry-After header."""
    manager = DistributedQuotaManager()

    # Upstream returns HTTP 429 with Retry-After: 45s
    manager.record_request_failure("eurlex", status_code=429, retry_after=45)
    health = manager.get_health_status("eurlex")
    assert health["status"] == "cached_only"
    assert health["is_live"] is False
    assert health["circuit_open_until"] > time.time()
