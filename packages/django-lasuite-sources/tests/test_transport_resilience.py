"""Tests for HTTP transport resilience: 3.5s total timeout, slow DNS/read, max response size, invalid JSON, and redirects (R-03.07)."""

import asyncio
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from lasuite_sources.errors import SourceUnavailable, UnsafeDestination, UpstreamError
from lasuite_sources.transport import (
    MAX_RESPONSE_BYTES,
    TOTAL_TIMEOUT,
    PublicResolver,
    get_json,
    validate_destination,
)


def test_transport_total_timeout_constant():
    """Verify total timeout constant is strictly set to 3.5 seconds (R-03.07)."""
    assert TOTAL_TIMEOUT == 3.5
    assert MAX_RESPONSE_BYTES == 2 * 1024 * 1024  # 2MB


def test_validate_destination_rejects_private_and_non_https():
    """Verify public transport rejects non-HTTPS, private IPs, credentials, fragments, and unapproved hosts (R-03.07)."""
    allowed = frozenset({"api.gouv.fr", "data.geopf.fr"})

    # Approved HTTPS host -> OK
    validate_destination("https://api.gouv.fr/v1/search", allowed)
    validate_destination("https://data.geopf.fr/geocodage/search", allowed)

    # HTTP scheme -> rejected
    with pytest.raises(UnsafeDestination, match="Destination not permitted"):
        validate_destination("http://api.gouv.fr/v1/search", allowed)

    # Unapproved host -> rejected
    with pytest.raises(UnsafeDestination, match="Destination not permitted"):
        validate_destination("https://evil.example.com/v1/search", allowed)

    # User/Pass credentials in URL -> rejected
    with pytest.raises(UnsafeDestination, match="Destination not permitted"):
        validate_destination("https://user:pass@api.gouv.fr/v1/search", allowed)

    # Non-standard port -> rejected
    with pytest.raises(UnsafeDestination, match="Destination not permitted"):
        validate_destination("https://api.gouv.fr:8443/v1/search", allowed)

    # Fragment -> rejected
    with pytest.raises(UnsafeDestination, match="Destination not permitted"):
        validate_destination("https://api.gouv.fr/v1/search#fragment", allowed)

    # Direct private IP host -> rejected
    with pytest.raises(UnsafeDestination, match="Non-public address"):
        validate_destination("https://127.0.0.1/v1/search", frozenset({"127.0.0.1"}))


def test_response_exceeding_max_bytes_raises_source_unavailable(monkeypatch):
    """Verify stream exceeding 2MB response limit raises SourceUnavailable('Response exceeds size limit') (R-03.07)."""

    async def mock_chunked_generator(chunk_size):
        yield b"X" * (1024 * 1024)  # 1MB
        yield b"Y" * (1024 * 1024)  # 1MB
        yield b"Z" * (512 * 1024)  # 0.5MB -> total 2.5MB > MAX_RESPONSE_BYTES

    content_mock = MagicMock()
    content_mock.iter_chunked = mock_chunked_generator

    response = MagicMock(status=200, content=content_mock)
    session = MagicMock()
    session.get.return_value.__aenter__ = AsyncMock(return_value=response)
    factory = MagicMock()
    factory.return_value.__aenter__ = AsyncMock(return_value=session)

    monkeypatch.setattr("aiohttp.ClientSession", factory)

    with pytest.raises(SourceUnavailable, match="Response exceeds size limit"):
        get_json(
            "https://api.gouv.fr/v1/search",
            allowed_hosts=frozenset({"api.gouv.fr"}),
            params={},
        )


def test_invalid_json_payload_raises_source_unavailable(monkeypatch):
    """Verify non-JSON or truncated HTML error page raises SourceUnavailable (R-03.07)."""

    async def mock_chunked_generator(chunk_size):
        yield b"<html><body>502 Bad Gateway HTML Error</body></html>"

    content_mock = MagicMock()
    content_mock.iter_chunked = mock_chunked_generator

    response = MagicMock(status=200, content=content_mock)
    session = MagicMock()
    session.get.return_value.__aenter__ = AsyncMock(return_value=response)
    factory = MagicMock()
    factory.return_value.__aenter__ = AsyncMock(return_value=session)

    monkeypatch.setattr("aiohttp.ClientSession", factory)

    with pytest.raises(
        SourceUnavailable, match="Invalid or unavailable upstream response"
    ):
        get_json(
            "https://api.gouv.fr/v1/search",
            allowed_hosts=frozenset({"api.gouv.fr"}),
            params={},
        )


def test_timeout_during_dns_resolution_raises_source_unavailable(monkeypatch):
    """Verify timeout during DNS resolution raises SourceUnavailable (R-03.07)."""
    session = MagicMock()
    session.get.side_effect = TimeoutError("DNS resolution timed out after 3.5s")
    factory = MagicMock()
    factory.return_value.__aenter__ = AsyncMock(return_value=session)

    monkeypatch.setattr("aiohttp.ClientSession", factory)

    with pytest.raises(
        SourceUnavailable, match="Invalid or unavailable upstream response"
    ):
        get_json(
            "https://api.gouv.fr/v1/search",
            allowed_hosts=frozenset({"api.gouv.fr"}),
            params={},
        )


def test_timeout_during_slow_chunked_read_raises_source_unavailable(monkeypatch):
    """Verify timeout during slow chunked response stream raises SourceUnavailable (R-03.07)."""

    async def slow_chunked_generator(chunk_size):
        yield b'{"status":'
        raise TimeoutError("Socket timeout while reading chunked body")

    content_mock = MagicMock()
    content_mock.iter_chunked = slow_chunked_generator

    response = MagicMock(status=200, content=content_mock)
    session = MagicMock()
    session.get.return_value.__aenter__ = AsyncMock(return_value=response)
    factory = MagicMock()
    factory.return_value.__aenter__ = AsyncMock(return_value=session)

    monkeypatch.setattr("aiohttp.ClientSession", factory)

    with pytest.raises(
        SourceUnavailable, match="Invalid or unavailable upstream response"
    ):
        get_json(
            "https://api.gouv.fr/v1/search",
            allowed_hosts=frozenset({"api.gouv.fr"}),
            params={},
        )


@pytest.mark.parametrize("status_code", [301, 302, 307, 308])
def test_redirects_are_never_followed_and_raise_upstream_error(
    status_code, monkeypatch
):
    """Verify HTTP redirect status codes are never followed automatically and raise UpstreamError (R-03.07)."""
    response = MagicMock(
        status=status_code,
        headers={"Location": "https://evil.example.com/stolen_token"},
    )
    session = MagicMock()
    session.get.return_value.__aenter__ = AsyncMock(return_value=response)
    factory = MagicMock()
    factory.return_value.__aenter__ = AsyncMock(return_value=session)

    monkeypatch.setattr("aiohttp.ClientSession", factory)

    with pytest.raises(UpstreamError) as err:
        get_json(
            "https://api.gouv.fr/v1/search",
            allowed_hosts=frozenset({"api.gouv.fr"}),
            params={},
        )

    assert err.value.status_code == status_code
    # Verify allow_redirects=False was passed to session.get
    assert session.get.call_args.kwargs["allow_redirects"] is False
