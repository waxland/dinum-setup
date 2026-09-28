"""Tests for correlation IDs, request timing metrics, non-sensitive telemetry logging, and header propagation (R-03.08)."""

import logging
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


class TelemetryMockProvider(BaseSourceProvider):
    source_type = "telemetry-test"
    name = "Telemetry Test Provider"

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5):
        return [{"id": "t-s1", "title": "Telemetry Suggest"}]

    def search(self, query: str, limit: int = 10):
        return [
            {
                "source_id": "tel-1",
                "entity_type": "telemetry-test",
                "display_mode": "callout",
                "title": "Secret Documentary Title",
                "excerpt": "Secret sensitive documentary content text",
                "origin": "upstream",
            }
        ]

    def get_detail(self, source_id: str):
        return {
            "source_id": source_id,
            "entity_type": "telemetry-test",
            "display_mode": "callout",
            "title": "Secret Detail Title",
            "origin": "upstream",
        }


@pytest.fixture(autouse=True)
def setup_telemetry_provider():
    cache.clear()
    if source_registry.get_provider("telemetry-test") is None:
        source_registry.register(TelemetryMockProvider())
    yield
    cache.clear()


@pytest.mark.django_db
@override_settings(LASUITE_SOURCES_DEMO=False)
def test_correlation_id_propagated_and_generated_in_views():
    """Verify X-Correlation-ID is extracted if supplied, or generated, and returned in HTTP response headers (R-03.08)."""
    client = APIClient()
    user = User.objects.create_user(username="agent.telemetry")
    client.force_authenticate(user=user)

    # 1. Custom X-Correlation-ID header provided in request
    res_custom = client.get(
        "/sources/search/?type=telemetry-test&q=secret_query_term",
        HTTP_X_CORRELATION_ID="cid-custom-12345",
    )
    assert res_custom.status_code == 200
    assert res_custom.headers.get("X-Correlation-ID") == "cid-custom-12345"

    # 2. No correlation ID header provided -> auto-generated correlation_id returned
    res_generated = client.get("/sources/search/?type=telemetry-test&q=test")
    assert res_generated.status_code == 200
    generated_cid = res_generated.headers.get("X-Correlation-ID")
    assert generated_cid is not None
    assert len(generated_cid) >= 8


@pytest.mark.django_db
@override_settings(LASUITE_SOURCES_DEMO=False)
def test_structured_telemetry_logging_does_not_log_sensitive_query_or_doc_content(
    caplog,
):
    """Verify structured telemetry logs duration_ms, provider, operation, outcome, cid, but NO sensitive query q or doc content (R-03.08)."""
    client = APIClient()
    user = User.objects.create_user(username="agent.telemetry2")
    client.force_authenticate(user=user)

    sensitive_query = "CONFIDENTIAL_USER_QUERY_TEXT"

    with caplog.at_level(logging.INFO):
        response = client.get(
            f"/sources/search/?type=telemetry-test&q={sensitive_query}",
            HTTP_X_CORRELATION_ID="trace-id-9999",
        )
        assert response.status_code == 200

        logs = caplog.text
        # Verify structured telemetry fields
        assert "Source request telemetry:" in logs
        assert "correlation_id=trace-id-9999" in logs
        assert "provider=telemetry-test" in logs
        assert "operation=search" in logs
        assert "outcome=live_success" in logs
        assert "duration_ms=" in logs
        assert "count=1" in logs

        # CRITICAL: Verify NO sensitive query text or documentary content is logged
        assert sensitive_query not in logs
        assert "Secret Documentary Title" not in logs
        assert "Secret sensitive documentary content text" not in logs


@override_settings(LASUITE_SOURCES_DEMO=False)
def test_telemetry_outcomes_for_cache_hit_quota_refused_and_rate_limited(caplog):
    """Verify telemetry correctly logs outcomes cache_hit, quota_refused, and rate_limited (R-03.08)."""
    provider_type = "telemetry-test"

    with caplog.at_level(logging.INFO):
        # 1. Live success + cache population
        source_registry.search_with_cache(
            provider_type, "query1", user_id="u1", correlation_id="cid-live-1"
        )
        assert "outcome=live_success" in caplog.text
        caplog.clear()

        # 2. Cache hit
        source_registry.search_with_cache(
            provider_type, "query1", user_id="u1", correlation_id="cid-cache-2"
        )
        assert "outcome=cache_hit" in caplog.text
        assert "correlation_id=cid-cache-2" in caplog.text
        caplog.clear()

        # 3. Quota / Circuit refused
        with patch.object(quota_manager, "reserve_request", return_value=False):
            with pytest.raises(SourceUnavailable):
                source_registry.search_with_cache(
                    provider_type,
                    "uncached_q",
                    user_id="u1",
                    correlation_id="cid-quota-3",
                )
            assert "outcome=quota_refused" in caplog.text
            assert "correlation_id=cid-quota-3" in caplog.text
            caplog.clear()

        # 4. User rate limited
        with patch.object(quota_manager, "check_user_rate_limit", return_value=False):
            with pytest.raises(SourceRateLimited):
                source_registry.search_with_cache(
                    provider_type,
                    "uncached_q2",
                    user_id="u1",
                    correlation_id="cid-rate-4",
                )
            assert "outcome=rate_limited" in caplog.text
            assert "correlation_id=cid-rate-4" in caplog.text
            caplog.clear()
