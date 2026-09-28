"""Tests for Redis outage, connection timeouts, secret sanitization, and fail-closed safety (R-03.04)."""

import logging
from unittest.mock import MagicMock, patch

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import override_settings
from rest_framework.test import APIClient

import pytest
from redis.exceptions import ConnectionError as RedisConnectionError
from redis.exceptions import TimeoutError as RedisTimeoutError

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.quota import DistributedQuotaManager, sanitize_redis_url
from lasuite_sources.registry import source_registry
from lasuite_sources.tasks import check_laws_validity_task

User = get_user_model()


class MockOutageProvider(BaseSourceProvider):
    source_type = "outage-test"
    name = "Outage Test Provider"

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5):
        return [{"id": "s1", "title": "Suggest Title"}]

    def search(self, query: str, limit: int = 10):
        return [
            {
                "source_id": "outage-1",
                "entity_type": "outage-test",
                "display_mode": "callout",
                "title": "Live Outage Search Item",
            }
        ]

    def get_detail(self, source_id: str):
        return {
            "source_id": source_id,
            "entity_type": "outage-test",
            "display_mode": "callout",
            "title": f"Detail for {source_id}",
        }


@pytest.fixture(autouse=True)
def setup_outage_provider():
    cache.clear()
    provider = MockOutageProvider()
    if source_registry.get_provider("outage-test") is None:
        source_registry.register(provider)
    yield
    cache.clear()


def test_sanitize_redis_url_masks_passwords_and_credentials():
    """Verify passwords in Redis URLs and error strings are masked for logging (R-03.04)."""
    raw_pass_url = "redis://:super_secret_password_123@redis.internal.gov:6379/0"
    sanitized_pass = sanitize_redis_url(raw_pass_url)
    assert "super_secret_password_123" not in sanitized_pass
    assert sanitized_pass == "redis://:***@redis.internal.gov:6379/0"

    raw_user_pass_url = "rediss://admin:my_secret_token@redis-cluster.prod:6379/1"
    sanitized_user_pass = sanitize_redis_url(raw_user_pass_url)
    assert "my_secret_token" not in sanitized_user_pass
    assert sanitized_user_pass == "rediss://admin:***@redis-cluster.prod:6379/1"

    error_msg = (
        "Failed to connect to redis://:secret_pass@10.0.0.1:6379/0: Connection refused"
    )
    sanitized_msg = sanitize_redis_url(error_msg)
    assert "secret_pass" not in sanitized_msg
    assert "redis://:***@10.0.0.1:6379/0" in sanitized_msg


def test_redis_timeout_in_health_status_returns_degraded_not_live():
    """Verify Redis timeout during get_health_status returns degraded and is_live=False (R-03.04)."""
    manager = DistributedQuotaManager()
    with patch.object(
        manager.cache,
        "get",
        side_effect=RedisTimeoutError("Redis connection timed out"),
    ):
        health = manager.get_health_status("outage-test")
        assert health["status"] == "degraded"
        assert health["is_live"] is False
        assert health["remaining_quota_percent"] == 0
        assert health["last_error"] == "Redis cache unavailable"


@override_settings(LASUITE_SOURCES_DEMO=False, DEBUG=False)
def test_redis_connection_error_in_reserve_request_prevents_upstream_calls():
    """Verify Redis outage during reserve_request prevents uncontrolled upstream API calls (R-03.04)."""
    provider = source_registry.get_provider("outage-test")
    assert provider is not None

    search_spy = MagicMock(side_effect=provider.search)
    provider.search = search_spy

    with patch(
        "lasuite_sources.quota.Redis.from_url",
        side_effect=RedisConnectionError(
            "Connection refused to redis://:secret_pass@redis.internal:6379/0"
        ),
    ):
        with pytest.raises(SourceUnavailable):
            source_registry.search_with_cache(
                "outage-test", query="test", limit=10, user_id="user_123"
            )

        # Provider's upstream search MUST NEVER be called when Redis reservation fails
        assert search_spy.call_count == 0


@override_settings(LASUITE_SOURCES_DEMO=False, DEBUG=False)
def test_redis_timeout_in_check_user_rate_limit_prevents_upstream_calls():
    """Verify Redis timeout during check_user_rate_limit prevents uncontrolled upstream calls (R-03.04)."""
    provider = source_registry.get_provider("outage-test")
    assert provider is not None

    suggest_spy = MagicMock(side_effect=provider.suggest)
    provider.suggest = suggest_spy

    with patch(
        "lasuite_sources.quota.Redis.from_url",
        side_effect=RedisTimeoutError("Redis socket timeout"),
    ):
        with pytest.raises(SourceUnavailable):
            source_registry.suggest_with_cache(
                "outage-test", query="test", limit=5, user_id="user_456"
            )

        # Provider's upstream suggest MUST NEVER be called
        assert suggest_spy.call_count == 0


@pytest.mark.django_db
@override_settings(LASUITE_SOURCES_DEMO=False, DEBUG=False)
def test_api_view_returns_http_503_without_secrets_on_redis_outage(caplog):
    """Verify DRF API views return HTTP 503 and log sanitized messages on Redis outage (R-03.04)."""
    client = APIClient()
    user = User.objects.create_user(username="agent.outage")
    client.force_authenticate(user=user)

    with patch(
        "lasuite_sources.quota.Redis.from_url",
        side_effect=RedisConnectionError(
            "Failed to connect to redis://:secret_api_key@10.0.0.1:6379/0"
        ),
    ):
        with caplog.at_level(logging.WARNING):
            response = client.get("/sources/search/?type=outage-test&q=test")
            assert response.status_code == 503
            assert response.json()["code"] == "provider_unavailable"

            # Check that log output does not contain raw passwords
            full_log = caplog.text
            assert "secret_api_key" not in full_log


def test_celery_task_handles_redis_outage_gracefully():
    """Verify check_laws_validity_task handles Redis outage gracefully without crashing (R-03.04)."""
    document = [{"content": "Citation LEGIARTI000006419280 in text."}]

    with patch.object(
        source_registry,
        "detail_with_cache",
        side_effect=SourceUnavailable("Redis cache unavailable"),
    ):
        result = check_laws_validity_task(document)
        assert result["status"] == "completed"
        assert result["unknown_laws_count"] == 1
        assert result["checked_laws_count"] == 1
        assert len(result["abrogated_details"]) == 0
