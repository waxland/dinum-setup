"""Unit tests for DistributedQuotaManager, Rate Limiting and Circuit Breaker."""

import time

from django.core.cache import cache

import pytest

from lasuite_sources.errors import SourceUnavailable
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
    counter_key = manager._get_daily_counter_key("law")

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


def test_reserve_request_atomic_ceiling_and_no_counter_inflation():
    """Verify daily counter does NOT inflate when requests are refused at or above ceiling (R-03.01)."""
    manager = DistributedQuotaManager()
    counter_key = manager._get_daily_counter_key("law")

    # Law policy: max 20,000, 15% safety margin -> ceiling is 17,000
    # Seed counter exactly at ceiling
    cache.set(counter_key, 17000, timeout=3600)

    # Subsequent reservation requests MUST be refused (return False)
    assert manager.reserve_request("law") is False
    assert manager.reserve_request("law") is False
    assert manager.reserve_request("law") is False

    # Counter in cache MUST NOT inflate beyond ceiling (17000)
    assert cache.get(counter_key) == 17000


def test_reserve_request_increments_until_ceiling_reached():
    """Verify reserve_request allows requests until ceiling and stops at ceiling."""
    manager = DistributedQuotaManager()
    counter_key = manager._get_daily_counter_key("law")

    # Seed counter near ceiling (16,998)
    cache.set(counter_key, 16998, timeout=3600)

    # 1st request -> counter becomes 16,999 (allowed)
    assert manager.reserve_request("law") is True
    assert cache.get(counter_key) == 16999

    # 2nd request -> counter becomes 17,000 (allowed, reaches ceiling)
    assert manager.reserve_request("law") is True
    assert cache.get(counter_key) == 17000

    # 3rd request -> counter is at ceiling (17,000), refused, counter remains 17,000
    assert manager.reserve_request("law") is False
    assert cache.get(counter_key) == 17000


def test_zero_or_negative_budget_prevents_accidental_admission(settings):
    """Verify zero or negative max_daily_requests budget prevents accidental admission (R-03.03)."""
    settings.LASUITE_SOURCES_QUOTA_POLICIES = {
        "zero_budget": {
            "max_daily_requests": 0,
            "safety_margin_percent": 20,
            "burst_per_minute_user": 30,
        },
        "negative_budget": {
            "max_daily_requests": -100,
            "safety_margin_percent": 20,
            "burst_per_minute_user": 30,
        },
    }
    manager = DistributedQuotaManager()

    # Zero budget MUST refuse live requests
    assert manager.reserve_request("zero_budget") is False
    health_zero = manager.get_health_status("zero_budget")
    assert health_zero["status"] == "quota_exhausted"
    assert health_zero["is_live"] is False
    assert health_zero["remaining_quota_percent"] == 0

    # Negative budget MUST refuse live requests
    assert manager.reserve_request("negative_budget") is False
    health_neg = manager.get_health_status("negative_budget")
    assert health_neg["status"] == "quota_exhausted"
    assert health_neg["is_live"] is False
    assert health_neg["remaining_quota_percent"] == 0


def test_out_of_range_safety_margin_is_clamped(settings):
    """Verify safety_margin_percent out of range (< 0 or > 100) is safely clamped (R-03.03)."""
    settings.LASUITE_SOURCES_QUOTA_POLICIES = {
        "negative_margin": {
            "max_daily_requests": 100,
            "safety_margin_percent": -50,  # Clamped to 0 -> ceiling = 100
        },
        "excessive_margin": {
            "max_daily_requests": 100,
            "safety_margin_percent": 150,  # Clamped to 100 -> ceiling = 0
        },
    }
    manager = DistributedQuotaManager()

    # Negative margin clamped to 0%: ceiling = 100
    assert manager.reserve_request("negative_margin") is True

    # Excessive margin clamped to 100%: ceiling = 0 (no live requests allowed)
    assert manager.reserve_request("excessive_margin") is False


def test_zero_or_negative_user_burst_rate_limit(settings):
    """Verify zero or negative user burst rate limit refuses requests immediately (R-03.03)."""
    settings.LASUITE_SOURCES_QUOTA_POLICIES = {
        "zero_burst": {
            "burst_per_minute_user": 0,
        },
        "negative_burst": {
            "burst_per_minute_user": -10,
        },
    }
    manager = DistributedQuotaManager()

    assert manager.check_user_rate_limit("user1", "zero_burst") is False
    assert manager.check_user_rate_limit("user1", "negative_burst") is False


def test_unsupported_non_redis_backend_in_production_is_rejected(settings):
    """Verify unsupported non-Redis backend in production (DEBUG=False) raises SourceUnavailable (R-03.03)."""
    settings.DEBUG = False
    manager = DistributedQuotaManager()

    with pytest.raises(SourceUnavailable, match="Redis"):
        manager.reserve_request("law")

    with pytest.raises(SourceUnavailable, match="Redis"):
        manager.check_user_rate_limit("user1", "law")
