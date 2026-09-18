"""Run against an isolated Redis service, not a simulated cache backend."""

import os
import uuid
from concurrent.futures import ThreadPoolExecutor

from django.core.cache import caches

import pytest
from redis import Redis

from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.quota import DistributedQuotaManager


@pytest.fixture
def redis_manager(settings):
    url = os.environ.get("TEST_REDIS_URL")
    if not url:
        pytest.skip("TEST_REDIS_URL required for distributed quota verification")
    prefix = f"lasuite-test-{uuid.uuid4().hex}"
    settings.CACHES = {
        **settings.CACHES,
        "quota_test": {
            "BACKEND": "django.core.cache.backends.redis.RedisCache",
            "LOCATION": url,
            "KEY_PREFIX": prefix,
        },
    }
    settings.DEBUG = False
    settings.LASUITE_SOURCES_QUOTA_POLICIES = {
        "example": {
            "max_daily_requests": 10,
            "safety_margin_percent": 20,
            "burst_per_minute_user": 10,
        }
    }
    with Redis.from_url(url) as redis:
        assert redis.ping()
        try:
            yield DistributedQuotaManager("quota_test")
        finally:
            keys = list(redis.scan_iter(f"{prefix}:*"))
            if keys:
                redis.delete(*keys)
            caches["quota_test"].close()


def test_redis_reservations_never_exceed_safety_budget(redis_manager):
    with ThreadPoolExecutor(max_workers=16) as pool:
        reservations = list(
            pool.map(lambda _: redis_manager.reserve_request("example"), range(80))
        )
    assert sum(reservations) == 8


def test_redis_token_bucket_has_no_lost_updates(redis_manager):
    with ThreadPoolExecutor(max_workers=16) as pool:
        allowed = list(
            pool.map(
                lambda _: redis_manager.check_user_rate_limit("same-user", "example"),
                range(80),
            )
        )
    assert sum(allowed) == 10
    assert redis_manager.check_user_rate_limit("other-user", "example")


def test_production_local_cache_is_rejected(settings):
    settings.DEBUG = False

    with pytest.raises(SourceUnavailable, match="Redis"):
        DistributedQuotaManager().reserve_request("example")
