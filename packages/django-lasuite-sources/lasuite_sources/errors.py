"""Stable provider failures, without leaking upstream bodies or credentials."""


class SourceUnavailable(Exception):
    """A known connector cannot provide live data."""


class SourceRateLimited(SourceUnavailable):
    """A user budget was exceeded before contacting a provider."""


class UpstreamError(SourceUnavailable):
    """HTTP metadata needed by the circuit breaker, without response content."""

    def __init__(self, status_code: int, retry_after: int | None = None):
        super().__init__("Upstream request failed")
        self.status_code = status_code
        self.retry_after = retry_after


class UnsafeDestination(SourceUnavailable):
    """The configured destination violates the external network policy."""
