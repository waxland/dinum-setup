"""Tests for error categories, cache hit circuit isolation, demo mode non-reset, and health status recalculation (R-03.06)."""

from unittest.mock import MagicMock, patch

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import override_settings
from rest_framework.test import APIClient

import pytest

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.errors import SourceRateLimited, SourceUnavailable
from lasuite_sources.quota import DistributedQuotaManager, quota_manager
from lasuite_sources.registry import source_registry

User = get_user_model()


class PolicyMockProvider(BaseSourceProvider):
    source_type = "policy-test"
    name = "Policy Test Provider"

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5):
        return [{"id": "s-1", "title": f"Suggest: {query}"}]

    def search(self, query: str, limit: int = 10):
        return [
            {
                "source_id": f"id-{query}",
                "entity_type": "policy-test",
                "display_mode": "callout",
                "title": f"Live Result for {query}",
                "origin": "upstream",
            }
        ]

    def get_detail(self, source_id: str):
        return {
            "source_id": source_id,
            "entity_type": "policy-test",
            "display_mode": "callout",
            "title": f"Detail for {source_id}",
            "origin": "upstream",
        }


@pytest.fixture(autouse=True)
def setup_policy_provider():
    cache.clear()
    if source_registry.get_provider("policy-test") is None:
        source_registry.register(PolicyMockProvider())
    yield
    cache.clear()


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_cache_hit_does_not_reset_circuit_breaker_or_clear_errors():
    """Verify that returning a cached response does NOT call record_request_success or reset circuit breaker (R-03.06)."""
    provider_type = "policy-test"

    # 1. First live search populates the cache
    res1 = source_registry.search_with_cache(
        provider_type, "stable_query", user_id="u1"
    )
    assert len(res1) == 1
    assert res1[0]["delivery"] == "live"

    # 2. Simulate 2 consecutive failures on the provider (threshold is 3)
    quota_manager.record_request_failure(provider_type)
    quota_manager.record_request_failure(provider_type)

    error_key = quota_manager._get_error_count_key(provider_type)
    assert quota_manager.cache.get(error_key) == 2

    # 3. Second search for the same query is served from cache
    res2 = source_registry.search_with_cache(
        provider_type, "stable_query", user_id="u1"
    )
    assert len(res2) == 1
    assert res2[0]["delivery"] == "cache"

    # 4. Error count MUST remain 2 (cache hit MUST NOT clear error counter)
    assert quota_manager.cache.get(error_key) == 2


@override_settings(LASUITE_SOURCES_DEMO=True)
def test_demo_mode_does_not_reset_circuit_breaker_or_error_counters():
    """Verify that queries executed in demo mode do NOT reset circuit breaker state or errors (R-03.06)."""
    provider_type = "policy-test"

    # Set circuit breaker in open state in cache
    circuit_key = quota_manager._get_circuit_key(provider_type)
    quota_manager.cache.set(circuit_key, 9999999999.0)

    # Search in demo mode
    res = source_registry.search_with_cache(provider_type, "demo_query", user_id="u1")
    assert len(res) == 1

    # Circuit breaker key MUST still be present in cache (demo call did not reset circuit)
    assert quota_manager.cache.get(circuit_key) == 9999999999.0


@pytest.mark.django_db
@override_settings(LASUITE_SOURCES_DEMO=False)
def test_health_status_recalculated_dynamically_without_upstream_ping():
    """Verify health status is recalculated on every API response and clearly declares upstream is unverified (R-03.06)."""
    client = APIClient()
    user = User.objects.create_user(username="agent.health")
    client.force_authenticate(user=user)

    provider = source_registry.get_provider("policy-test")
    assert provider is not None

    search_spy = MagicMock(side_effect=provider.search)
    provider.search = search_spy

    response = client.get("/sources/search/?type=policy-test&q=health_check")
    assert response.status_code == 200
    payload = response.json()

    # Health status is present in response
    health = payload["health"]
    assert health["status"] in {"healthy", "degraded", "cached_only", "quota_exhausted"}
    assert "upstream availability is not verified" in health["message"]

    # Provider search was called once for the search, NOT for an extra health ping
    assert search_spy.call_count == 1


@pytest.mark.django_db
@override_settings(LASUITE_SOURCES_DEMO=False)
def test_error_categories_remain_stable_and_machine_parseable():
    """Verify error categories returned across views are stable and machine-parseable (R-03.06)."""
    client = APIClient()
    user = User.objects.create_user(username="agent.categories")
    client.force_authenticate(user=user)

    # 1. Invalid source type -> 400 invalid_source_type
    res_type = client.get(f"/sources/{'x' * 101}/id1/")
    assert res_type.status_code == 400
    assert res_type.json()["code"] == "invalid_source_type"

    # 2. Invalid source ID -> 400 invalid_source_id
    res_id = client.get(f"/sources/law/{'x' * 300}/")
    assert res_id.status_code == 400
    assert res_id.json()["code"] == "invalid_source_id"

    # 3. Unknown/Unregistered provider in search -> 400 Bad Request (serializer validation)
    res_unknown = client.get("/sources/search/?type=non_existent_provider&q=test")
    assert res_unknown.status_code == 400
    assert "type" in res_unknown.json()

    # 4. Registered but disabled provider -> 503 provider_unavailable
    disabled_mock = MagicMock()
    disabled_mock.source_type = "disabled-test"
    disabled_mock.is_enabled.return_value = False
    source_registry.register(disabled_mock)

    res_disabled = client.get("/sources/search/?type=disabled-test&q=test")
    assert res_disabled.status_code == 503
    assert res_disabled.json()["code"] == "provider_unavailable"

    # 4. Rate limit -> 429 rate_limited
    with patch.object(
        source_registry,
        "search_with_cache",
        side_effect=SourceRateLimited("Limit exceeded"),
    ):
        res_rate = client.get("/sources/search/?type=policy-test&q=test")
        assert res_rate.status_code == 429
        assert res_rate.json()["code"] == "rate_limited"
        assert res_rate.headers.get("Retry-After") == "60"

    # 5. Service unavailable -> 503 provider_unavailable
    with patch.object(
        source_registry,
        "search_with_cache",
        side_effect=SourceUnavailable("Service down"),
    ):
        res_unavail = client.get("/sources/search/?type=policy-test&q=test")
        assert res_unavail.status_code == 503
        assert res_unavail.json()["code"] == "provider_unavailable"
