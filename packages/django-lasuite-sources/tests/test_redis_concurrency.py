"""Distributed Redis concurrency tests using multi-process execution."""

import os
import threading
import uuid
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor

from django.conf import settings as django_settings
from django.core.cache import caches

import pytest
from redis import Redis

from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.quota import DistributedQuotaManager


def _worker_reserve(url, prefix, provider_type, date_str=None):
    """Top-level process worker for testing reserve_request in isolated process."""
    if not django_settings.configured:
        django_settings.configure(
            DEBUG=False,
            CACHES={
                "default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"},
                "quota_test": {
                    "BACKEND": "django.core.cache.backends.redis.RedisCache",
                    "LOCATION": url,
                    "KEY_PREFIX": prefix,
                    "OPTIONS": {"protocol": 3},
                },
            },
            LASUITE_SOURCES_CACHE_ALIAS="quota_test",
            LASUITE_SOURCES_QUOTA_POLICIES={
                "example": {
                    "max_daily_requests": 10,
                    "safety_margin_percent": 20,
                    "burst_per_minute_user": 10,
                },
                "law": {
                    "max_daily_requests": 100,
                    "safety_margin_percent": 20,
                    "burst_per_minute_user": 20,
                },
                "company": {
                    "max_daily_requests": 100,
                    "safety_margin_percent": 20,
                    "burst_per_minute_user": 20,
                },
                "insee": {
                    "max_daily_requests": 100,
                    "safety_margin_percent": 20,
                    "burst_per_minute_user": 15,
                },
            },
        )
    manager = DistributedQuotaManager("quota_test")
    return manager.reserve_request(provider_type, date_str=date_str)


def _worker_rate_limit(url, prefix, user_id, provider_type):
    """Top-level process worker for testing check_user_rate_limit in isolated process."""
    if not django_settings.configured:
        django_settings.configure(
            DEBUG=False,
            CACHES={
                "default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"},
                "quota_test": {
                    "BACKEND": "django.core.cache.backends.redis.RedisCache",
                    "LOCATION": url,
                    "KEY_PREFIX": prefix,
                    "OPTIONS": {"protocol": 3},
                },
            },
            LASUITE_SOURCES_CACHE_ALIAS="quota_test",
            LASUITE_SOURCES_QUOTA_POLICIES={
                "example": {
                    "max_daily_requests": 10,
                    "safety_margin_percent": 20,
                    "burst_per_minute_user": 10,
                },
                "insee": {
                    "max_daily_requests": 100,
                    "safety_margin_percent": 20,
                    "burst_per_minute_user": 15,
                },
            },
        )
    manager = DistributedQuotaManager("quota_test")
    return manager.check_user_rate_limit(user_id, provider_type)


@pytest.fixture
def redis_fixture(settings):
    url = os.environ.get("TEST_REDIS_URL")
    server = None
    if not url:
        from fakeredis import TcpFakeServer

        server = TcpFakeServer(("127.0.0.1", 0))
        t = threading.Thread(target=server.serve_forever, daemon=True)
        t.start()
        port = server.server_address[1]
        url = f"redis://127.0.0.1:{port}/0"

    prefix = f"lasuite-test-{uuid.uuid4().hex}"
    settings.CACHES = {
        **settings.CACHES,
        "quota_test": {
            "BACKEND": "django.core.cache.backends.redis.RedisCache",
            "LOCATION": url,
            "KEY_PREFIX": prefix,
            "OPTIONS": {"protocol": 3},
        },
    }
    settings.DEBUG = False
    settings.LASUITE_SOURCES_QUOTA_POLICIES = {
        "example": {
            "max_daily_requests": 10,
            "safety_margin_percent": 20,
            "burst_per_minute_user": 10,
        },
        "law": {
            "max_daily_requests": 100,
            "safety_margin_percent": 20,
            "burst_per_minute_user": 20,
        },
        "company": {
            "max_daily_requests": 100,
            "safety_margin_percent": 20,
            "burst_per_minute_user": 20,
        },
        "insee": {
            "max_daily_requests": 100,
            "safety_margin_percent": 20,
            "burst_per_minute_user": 15,
        },
    }
    with Redis.from_url(url) as redis:
        assert redis.ping()
        try:
            yield DistributedQuotaManager("quota_test"), url, prefix, redis
        finally:
            keys = list(redis.scan_iter(f"{prefix}:*"))
            if keys:
                redis.delete(*keys)
            caches["quota_test"].close()
            if server is not None:
                server.shutdown()


def test_redis_reservations_never_exceed_safety_budget(redis_fixture):
    manager, _url, _prefix, _redis = redis_fixture
    with ThreadPoolExecutor(max_workers=4) as pool:
        reservations = list(
            pool.map(lambda _: manager.reserve_request("example"), range(40))
        )
    assert sum(reservations) == 8


def test_redis_token_bucket_has_no_lost_updates(redis_fixture):
    manager, _url, _prefix, _redis = redis_fixture
    with ThreadPoolExecutor(max_workers=4) as pool:
        allowed = list(
            pool.map(
                lambda _: manager.check_user_rate_limit("same-user", "example"),
                range(40),
            )
        )
    assert sum(allowed) == 10
    assert manager.check_user_rate_limit("other-user", "example")


def test_production_local_cache_is_rejected(settings):
    settings.DEBUG = False

    with pytest.raises(SourceUnavailable, match="Redis"):
        DistributedQuotaManager().reserve_request("example")


def test_redis_multiprocess_rate_limits_same_and_multiple_users(redis_fixture):
    """Test multi-process concurrency for same user and distinct users (R-03.02)."""
    manager, url, prefix, _redis = redis_fixture

    # 1. Same user across 80 concurrent multi-process requests (burst limit = 10)
    with ProcessPoolExecutor(max_workers=4) as pool:
        futures = [
            pool.submit(_worker_rate_limit, url, prefix, "user_42", "example")
            for _ in range(80)
        ]
        results_same_user = [f.result() for f in futures]

    assert sum(results_same_user) == 10

    # 2. Distinct user_B in a new process is not affected by user_42's limit
    assert manager.check_user_rate_limit("user_B", "example") is True


def test_redis_multiprocess_alias_canonization(redis_fixture):
    """Test multi-process concurrency with provider alias canonization (R-03.02)."""
    manager, url, prefix, redis = redis_fixture

    # "statistics" is an alias for "insee" (burst limit = 15)
    # Concurrently call check_user_rate_limit with "statistics" and "insee" across processes
    with ProcessPoolExecutor(max_workers=4) as pool:
        f_insee = [
            pool.submit(_worker_rate_limit, url, prefix, "alias_user", "insee")
            for _ in range(20)
        ]
        f_stats = [
            pool.submit(_worker_rate_limit, url, prefix, "alias_user", "statistics")
            for _ in range(20)
        ]
        res_insee = [f.result() for f in f_insee]
        res_stats = [f.result() for f in f_stats]

    # Total allowed calls across alias names MUST equal exactly 15
    assert sum(res_insee) + sum(res_stats) == 15

    # Daily counter alias reservation: "case-law" alias resolves to "law"
    assert manager.reserve_request("case-law") is True
    counter_key = manager._get_daily_counter_key("law")
    # Verify counter in Redis was incremented under "law"
    assert redis.get(manager.cache.make_key(counter_key)) == b"1"


def test_redis_multiprocess_distinct_providers_isolation(redis_fixture):
    """Test multi-process concurrency isolation for distinct providers (R-03.02)."""
    _manager, url, prefix, _redis = redis_fixture

    # Provider "law" and provider "company" run concurrently across processes
    with ProcessPoolExecutor(max_workers=4) as pool:
        f_law = [pool.submit(_worker_reserve, url, prefix, "law") for _ in range(100)]
        f_company = [
            pool.submit(_worker_reserve, url, prefix, "company") for _ in range(100)
        ]
        res_law = [f.result() for f in f_law]
        res_company = [f.result() for f in f_company]

    # Law ceiling is 80 (100 * 80%), Company ceiling is 80 (100 * 80%)
    assert sum(res_law) == 80
    assert sum(res_company) == 80


def test_redis_multiprocess_day_crossing(redis_fixture):
    """Test multi-process concurrency across day boundary crossing (R-03.02)."""
    manager, url, prefix, redis = redis_fixture

    day1 = "2026-09-28"
    day2 = "2026-09-29"

    # Fill Day 1 quota (example ceiling = 8)
    with ProcessPoolExecutor(max_workers=4) as pool:
        futures1 = [
            pool.submit(_worker_reserve, url, prefix, "example", day1)
            for _ in range(20)
        ]
        res1 = [f.result() for f in futures1]

    assert sum(res1) == 8
    # Further Day 1 requests are refused
    assert manager.reserve_request("example", date_str=day1) is False
    assert manager.get_health_status("example", date_str=day1)["status"] == "degraded"

    # Day 2 arrives: requests on Day 2 succeed up to new ceiling
    with ProcessPoolExecutor(max_workers=4) as pool:
        futures2 = [
            pool.submit(_worker_reserve, url, prefix, "example", day2)
            for _ in range(20)
        ]
        res2 = [f.result() for f in futures2]

    assert sum(res2) == 8
    # Health status on Day 2 shows healthy for new day, while Day 1 counter is preserved in Redis
    assert (
        manager.get_health_status("example", date_str=day2)["remaining_quota_percent"]
        == 20
    )
    key1 = manager.cache.make_key(
        manager._get_daily_counter_key("example", date_str=day1)
    )
    key2 = manager.cache.make_key(
        manager._get_daily_counter_key("example", date_str=day2)
    )
    assert redis.get(key1) == b"8"
    assert redis.get(key2) == b"8"
