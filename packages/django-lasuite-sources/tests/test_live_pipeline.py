"""End-to-end provider admission, real adapter errors and demo provenance."""

from concurrent.futures import ThreadPoolExecutor
from unittest.mock import Mock

from django.core.cache import cache

import pytest

from lasuite_sources.errors import SourceRateLimited, SourceUnavailable, UpstreamError
from lasuite_sources.providers.france.albert import AlbertSourceProvider
from lasuite_sources.providers.france.law import LawSourceProvider
from lasuite_sources.quota import DistributedQuotaManager, quota_manager
from lasuite_sources.registry import source_registry


@pytest.fixture(autouse=True)
def live_settings(settings):
    settings.LASUITE_SOURCES_DEMO = False
    cache.clear()
    yield
    cache.clear()


def test_demo_only_connectors_cannot_be_enabled_by_credentials(monkeypatch, settings):
    monkeypatch.setenv("PISTE_CLIENT_ID", "test")
    monkeypatch.setenv("PISTE_CLIENT_SECRET", "test")
    monkeypatch.setenv("ALBERT_API_KEY", "test")
    for provider in (LawSourceProvider(), AlbertSourceProvider()):
        assert not provider.is_enabled()
        with pytest.raises(SourceUnavailable):
            provider.search("")
    settings.LASUITE_SOURCES_DEMO = True
    result = LawSourceProvider().search("commande")[0]
    assert result["origin"] == "demo"
    assert result["verified_at"] is None
    assert LawSourceProvider().search("not-a-matching-fixture") == []


def test_user_quota_refusal_prevents_provider_calls(settings, monkeypatch):
    settings.LASUITE_SOURCES_QUOTA_POLICIES = {"address": {"burst_per_minute_user": 1}}
    transport = Mock(return_value={"features": []})
    monkeypatch.setattr("lasuite_sources.providers.france.address.get_json", transport)
    assert source_registry.search_with_cache("address", "first", user_id="user") == []
    for query in ("second", "third"):
        with pytest.raises(SourceRateLimited):
            source_registry.search_with_cache("place", query, user_id="user")
    transport.assert_called_once()


@pytest.mark.parametrize(
    "operation", ["search_with_cache", "suggest_with_cache", "detail_with_cache"]
)
def test_429_opens_real_provider_circuit(operation, monkeypatch):
    provider = source_registry.get_provider("address")
    method = (
        "get_detail" if operation == "detail_with_cache" else operation.split("_")[0]
    )
    failing = Mock(side_effect=UpstreamError(429, 45))
    monkeypatch.setattr(provider, method, failing)
    call = getattr(source_registry, operation)
    for query in ("first", "second", "third"):
        with pytest.raises(SourceUnavailable):
            call("address", query, user_id="user")
    failing.assert_called_once()
    assert quota_manager.get_health_status("address")["is_live"] is False


def test_atomic_reservations_limit_actual_calls_under_concurrency(settings):
    settings.LASUITE_SOURCES_QUOTA_POLICIES = {
        "address": {"max_daily_requests": 10, "safety_margin_percent": 20}
    }
    with ThreadPoolExecutor(max_workers=16) as workers:
        results = list(
            workers.map(
                lambda _: DistributedQuotaManager().reserve_request("address"),
                range(80),
            )
        )
    assert sum(results) == 8


def test_empty_live_ban_response_is_not_replaced_with_a_fixture(monkeypatch):
    transport = Mock(return_value={"features": []})
    monkeypatch.setattr("lasuite_sources.providers.france.address.get_json", transport)
    assert source_registry.search_with_cache("address", "unknown") == []
    assert transport.call_args.args[0] == "https://data.geopf.fr/geocodage/search"
