"""Exercise production URL/DNS controls, with no requests to private services."""

import asyncio
from datetime import datetime, timedelta, timezone
from email.utils import format_datetime
from unittest.mock import AsyncMock, MagicMock

import pytest

from lasuite_sources.errors import UnsafeDestination, UpstreamError
from lasuite_sources.transport import (
    PublicResolver,
    get_json,
    parse_retry_after,
    validate_destination,
)


@pytest.mark.parametrize(
    "url",
    [
        "https://127.0.0.1/",
        "https://10.0.0.1/",
        "https://[::1]/",
        "https://169.254.169.254/",
        "https://[::ffff:127.0.0.1]/",
        "http://public.example/",
        "https://user:secret@public.example/",
        "https://public.example:8443/",
        "file:///etc/passwd",
        "https://unapproved.example/",
    ],
)
def test_forbidden_url_never_creates_a_session(url, monkeypatch):
    session = MagicMock()
    monkeypatch.setattr("aiohttp.ClientSession", session)
    with pytest.raises(UnsafeDestination):
        get_json(
            url,
            allowed_hosts=frozenset(
                {
                    "public.example",
                    "127.0.0.1",
                    "10.0.0.1",
                    "::1",
                    "169.254.169.254",
                    "::ffff:127.0.0.1",
                }
            ),
            params={},
        )
    session.assert_not_called()


@pytest.mark.parametrize(
    "addresses",
    [["127.0.0.1"], ["8.8.8.8", "10.1.2.3"], ["::ffff:192.168.1.1"], ["fe80::1"]],
)
def test_actual_connector_rejects_nonpublic_dns_before_connect(addresses, monkeypatch):
    resolver = AsyncMock(
        return_value=[
            {
                "host": address,
                "hostname": "public.example",
                "port": 443,
                "family": 2,
                "proto": 0,
                "flags": 0,
            }
            for address in addresses
        ]
    )
    connection = AsyncMock()
    monkeypatch.setattr("aiohttp.resolver.AsyncResolver.resolve", resolver)
    monkeypatch.setattr("aiohttp.TCPConnector._wrap_create_connection", connection)
    with pytest.raises(UnsafeDestination):
        get_json(
            "https://public.example/",
            allowed_hosts=frozenset({"public.example"}),
            params={},
        )
    resolver.assert_awaited_once()
    connection.assert_not_called()


def test_resolver_returns_the_validated_addresses_without_second_resolution(
    monkeypatch,
):
    addresses = [
        {
            "host": "8.8.8.8",
            "hostname": "public.example",
            "port": 443,
            "family": 2,
            "proto": 0,
            "flags": 0,
        }
    ]
    underlying = AsyncMock(return_value=addresses)
    monkeypatch.setattr("aiohttp.resolver.AsyncResolver.resolve", underlying)

    async def run():
        resolver = PublicResolver()
        try:
            assert await resolver.resolve("public.example", 443) is addresses
        finally:
            await resolver.close()

    asyncio.run(run())
    underlying.assert_awaited_once()


def test_http_429_preserves_retry_after_and_never_follows_redirects(monkeypatch):
    response = MagicMock(status=429, headers={"Retry-After": "45"})
    session = MagicMock()
    session.get.return_value.__aenter__ = AsyncMock(return_value=response)
    factory = MagicMock()
    factory.return_value.__aenter__ = AsyncMock(return_value=session)
    monkeypatch.setattr("aiohttp.ClientSession", factory)
    with pytest.raises(UpstreamError) as failure:
        get_json(
            "https://public.example/",
            allowed_hosts=frozenset({"public.example"}),
            params={},
        )
    assert failure.value.status_code == 429
    assert failure.value.retry_after == 45
    assert session.get.call_args.kwargs["allow_redirects"] is False
    assert factory.call_args.kwargs["trust_env"] is False
    assert factory.call_args.kwargs["timeout"].total == 3.5
    asyncio.run(factory.call_args.kwargs["connector"].close())


def test_retry_after_handles_http_dates_and_invalid_values():
    assert parse_retry_after("45") == 45
    assert parse_retry_after("invalid") is None
    assert parse_retry_after(None) is None
    future = format_datetime(datetime.now(timezone.utc) + timedelta(seconds=30))
    assert 29 <= parse_retry_after(future) <= 30
    validate_destination(
        "https://data.geopf.fr/geocodage/search", frozenset({"data.geopf.fr"})
    )
