"""Tests for Circuit Breaker state transitions, single probe lock, Retry-After preservation, and concurrent success isolation (R-03.05)."""

import time
from unittest.mock import patch

from django.core.cache import cache

import pytest

from lasuite_sources.quota import DistributedQuotaManager


@pytest.fixture(autouse=True)
def clear_cache():
    cache.clear()
    yield
    cache.clear()


def test_circuit_breaker_single_probe_on_half_open_state():
    """Verify that when a circuit expires (half-open state), exactly ONE probe request is allowed (R-03.05)."""
    manager = DistributedQuotaManager()
    provider_type = "law"

    # 1. Trip circuit breaker with 3 failures
    manager.record_request_failure(provider_type)
    manager.record_request_failure(provider_type)
    manager.record_request_failure(provider_type)

    health = manager.get_health_status(provider_type)
    assert health["status"] == "cached_only"
    assert health["is_live"] is False
    open_until = health["circuit_open_until"]
    assert open_until is not None

    # While circuit is open, reservations are refused
    assert manager.reserve_request(provider_type) is False

    # 2. Advance time past circuit_open_until (half-open state)
    with patch("time.time", return_value=open_until + 1):
        # Health check now shows healthy / live in half-open state
        assert manager.get_health_status(provider_type)["is_live"] is True

        # First request acts as single probe -> succeeds
        assert manager.reserve_request(provider_type) is True

        # Second concurrent request while probe is active -> refused
        assert manager.reserve_request(provider_type) is False
        assert manager.reserve_request(provider_type) is False

        # 3a. If probe succeeds -> circuit is closed and probe lock is cleared
        manager.record_request_success(provider_type)
        assert manager.get_health_status(provider_type)["status"] == "healthy"

        # Subsequent requests are allowed normally again
        assert manager.reserve_request(provider_type) is True


def test_circuit_breaker_probe_failure_reopens_circuit():
    """Verify that if a probe request fails in half-open state, circuit reopens and probe lock is cleared (R-03.05)."""
    manager = DistributedQuotaManager()
    provider_type = "law"

    # Trip circuit
    for _ in range(3):
        manager.record_request_failure(provider_type)

    open_until = manager.get_health_status(provider_type)["circuit_open_until"]

    # Advance time past open_until
    with patch("time.time", return_value=open_until + 1):
        # Probe allowed
        assert manager.reserve_request(provider_type) is True
        # Concurrent request refused
        assert manager.reserve_request(provider_type) is False

        # Probe fails
        manager.record_request_failure(provider_type, status_code=500)

        # Circuit is reopened with new cooldown
        new_health = manager.get_health_status(provider_type)
        assert new_health["status"] == "cached_only"
        assert new_health["is_live"] is False
        assert new_health["circuit_open_until"] > open_until + 1


def test_subsequent_failure_does_not_shorten_long_retry_after():
    """Verify a subsequent short failure never shortens an active long Retry-After (R-03.05)."""
    manager = DistributedQuotaManager()
    provider_type = "eurlex"
    now = 1000.0

    with patch("time.time", return_value=now):
        # 1. 429 returned with 1-hour (3600s) Retry-After -> open until 4600.0
        manager.record_request_failure(provider_type, status_code=429, retry_after=3600)
        health1 = manager.get_health_status(provider_type)
        assert health1["circuit_open_until"] == 4600.0

    # 2. At time 1010.0 (10s later), a subsequent failure with default cooldown (60s) arrives
    with patch("time.time", return_value=now + 10):
        # Would normally open until 1010 + 60 = 1070.0, but 4600.0 is longer!
        manager.record_request_failure(provider_type, status_code=500)
        health2 = manager.get_health_status(provider_type)
        # circuit_open_until MUST NOT be shortened to 1070.0
        assert health2["circuit_open_until"] == 4600.0

        # Another 429 with short Retry-After: 30s
        manager.record_request_failure(provider_type, status_code=429, retry_after=30)
        health3 = manager.get_health_status(provider_type)
        assert health3["circuit_open_until"] == 4600.0


def test_concurrent_stale_success_does_not_close_open_circuit():
    """Verify that a late success from a request started before circuit opened does NOT close the circuit (R-03.05)."""
    manager = DistributedQuotaManager()
    provider_type = "law"
    now = 2000.0

    with patch("time.time", return_value=now):
        # Request A starts at T=2000.0 (before circuit opens)

        # At T=2001.0, 3 consecutive failures open the circuit for 30s (cooldown for law) -> until T=2031.0
        with patch("time.time", return_value=now + 1):
            for _ in range(3):
                manager.record_request_failure(provider_type)

            health_open = manager.get_health_status(provider_type)
            assert health_open["status"] == "cached_only"
            assert health_open["circuit_open_until"] == 2031.0

        # At T=2002.0, stale request A finishes with success
        with patch("time.time", return_value=now + 2):
            manager.record_request_success(provider_type)

            # Circuit MUST remain open!
            health_after = manager.get_health_status(provider_type)
            assert health_after["status"] == "cached_only"
            assert health_after["is_live"] is False
            assert health_after["circuit_open_until"] == 2031.0
