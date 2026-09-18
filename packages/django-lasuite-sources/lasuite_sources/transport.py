"""Bounded HTTPS transport: validated addresses are used by the connector itself."""

import asyncio
import ipaddress
import json
import math
import socket
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from http import HTTPStatus
from urllib.parse import urlsplit

import aiohttp
from aiohttp.abc import ResolveResult
from aiohttp.resolver import AsyncResolver

from lasuite_sources.errors import SourceUnavailable, UnsafeDestination, UpstreamError

MAX_RESPONSE_BYTES = 2 * 1024 * 1024
TOTAL_TIMEOUT = 3.5


def validate_destination(url: str, allowed_hosts: frozenset[str]) -> None:
    """Reject credentials, nonstandard ports and unapproved origins before DNS."""
    try:
        parsed = urlsplit(url)
        valid = (
            parsed.scheme == "https"
            and parsed.hostname in allowed_hosts
            and parsed.port in (None, 443)
            and not parsed.username
            and not parsed.password
            and not parsed.fragment
        )
    except ValueError as error:
        raise UnsafeDestination("Invalid destination") from error
    if not valid:
        raise UnsafeDestination("Destination not permitted")
    try:
        address = ipaddress.ip_address(parsed.hostname)
    except ValueError:
        return
    if not address.is_global:
        raise UnsafeDestination("Non-public address")


class PublicResolver(AsyncResolver):
    """Return only public numeric addresses; aiohttp connects to this same list."""

    async def resolve(
        self, host: str, port: int = 0, family: int = socket.AF_INET
    ) -> list[ResolveResult]:
        addresses = await super().resolve(host, port, family)
        if not addresses or any(
            not ipaddress.ip_address(item["host"]).is_global for item in addresses
        ):
            raise UnsafeDestination("DNS returned a non-public address")
        return addresses


def parse_retry_after(value: str | None) -> int | None:
    """Support both delay-seconds and HTTP-date without retrying early."""
    if value is None:
        return None
    try:
        if value.strip().isdigit():
            return max(0, int(value))
        date = parsedate_to_datetime(value)
        if date.tzinfo is None:
            date = date.replace(tzinfo=timezone.utc)
        return max(0, math.ceil((date - datetime.now(timezone.utc)).total_seconds()))
    except (ValueError, TypeError, OverflowError):
        return None


async def _get_json(url: str, params: dict[str, str | int]) -> object:
    resolver = PublicResolver()
    try:
        connector = aiohttp.TCPConnector(resolver=resolver, use_dns_cache=False)
        async with aiohttp.ClientSession(
            connector=connector,
            trust_env=False,
            timeout=aiohttp.ClientTimeout(total=TOTAL_TIMEOUT),
            cookie_jar=aiohttp.DummyCookieJar(),
            auto_decompress=False,
        ) as session:
            async with session.get(
                url,
                params=params,
                allow_redirects=False,
                headers={"Accept": "application/json", "Accept-Encoding": "identity"},
            ) as response:
                if response.status != HTTPStatus.OK:
                    raise UpstreamError(
                        response.status,
                        parse_retry_after(response.headers.get("Retry-After")),
                    )
                content = bytearray()
                async for chunk in response.content.iter_chunked(65536):
                    content.extend(chunk)
                    if len(content) > MAX_RESPONSE_BYTES:
                        raise SourceUnavailable("Response exceeds size limit")
                return json.loads(content)
    except (aiohttp.ClientError, TimeoutError, ValueError) as error:
        raise SourceUnavailable("Invalid or unavailable upstream response") from error
    finally:
        await resolver.close()


def get_json(
    url: str, *, allowed_hosts: frozenset[str], params: dict[str, str | int]
) -> object:
    """Synchronous provider entry point; all network work shares a 3.5s deadline."""
    validate_destination(url, allowed_hosts)
    return asyncio.run(_get_json(url, params))
