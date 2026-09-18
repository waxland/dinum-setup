# django-lasuite-sources

Django/DRF registry for source providers. Python 3.12 or newer is required.

## Actual Capabilities

The `address` provider searches the IGN Geoplateforme geocoding API. Its live
detail-by-ID operation is not implemented. All other bundled providers currently
contain demonstration datasets and are disabled by default. Supplying their
historical API environment variables does not make them live integrations.
Third-party providers can register through the `lasuite_sources.providers`
Python entry-point group. Duplicate provider identifiers are rejected.

Demonstration data is never a fallback for an unavailable upstream API. It is
marked `origin: demo`, `status: Demonstration`, and `verified_at: null`.

## Installation

```sh
pip install django-lasuite-sources
```

Configure the real settings read by the package (the historical
`LASUITE_SOURCES` dictionary was not implemented):

```python
import os

INSTALLED_APPS = [
    # Existing host applications...
    "rest_framework",
    "lasuite_sources",
]
LASUITE_SOURCES_DEMO = False
LASUITE_SOURCES_CACHE_ALIAS = "sources"
LASUITE_SOURCES_CACHE_TTL = 86400
CACHES = {
    "default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"},
    "sources": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": os.environ["SOURCES_REDIS_URL"],
    },
}
LASUITE_SOURCES_QUOTA_POLICIES = {
    "address": {
        "max_daily_requests": 10000,
        "safety_margin_percent": 20,
        "burst_per_minute_user": 60,
        "circuit_breaker_threshold": 3,
        "cooldown_seconds": 60,
    },
}
```

Use a single Redis primary URL, with credentials/TLS in that URL when required.
The quota client does not support replica lists, custom serializers or Redis
authentication supplied only through Django cache `OPTIONS`. In production,
non-Redis caches fail closed. Process-local quotas are permitted only with
`DEBUG=True`; they are not a multi-worker substitute for Redis.

```python
from django.urls import include, path

urlpatterns = [path("api/v1.0/", include("lasuite_sources.urls"))]
```

All endpoints require authentication from the host application's DRF settings.
Setting `LASUITE_SOURCES_DEMO=True` explicitly enables the bundled fixtures,
including replacing the address search with fixtures. Do not enable it in a
production integration. The standalone `demo/settings.py` opts in explicitly.

## HTTP Contract

See [OpenAPI](docs/openapi.yaml). HTTP payloads use `snake_case`; the BlockNote
HTTP adapter converts them explicitly. Nested `raw_payload` keys are unchanged.

- Search: `/sources/search/?type=address&q=Paris&limit=10` (limit 1 to 50).
- Suggestions: `/sources/suggest/?type=address&q=Paris&limit=5` (limit 1 to 20).
- Detail: `/sources/<source_type>/<source_id>/`.
- Availability policy: `/sources/status/` (enabled providers, not an upstream ping).

Queries are limited to 500 characters. `type` accepts registered plugin IDs and
aliases, not a closed list of categories. Unknown IDs return 400 for search and
suggest; disabled providers return 503. Authentication errors follow DRF (401
or 403). User throttling returns 429 with `Retry-After`; upstream failure,
open circuit or exhausted budget returns 503 when no fresh cache exists.
Detail returns 404 for an unknown or disabled provider or missing entity.

Cache keys are versioned (`v3`), isolated by user, canonical provider and
operation. `origin` distinguishes `demo` from `upstream`; `delivery` distinguishes
`live` from `cache`, without implying authenticity. Retrieval time does not
certify validity. The law monitoring task reports unknown validity for missing,
demo or unverified records and preserves the original verification timestamp.

## Security And Validation

The built-in HTTP transport allows HTTPS to explicitly allowed hosts only,
rejects redirects and private/mixed DNS responses at connection resolution,
disables environment proxies, limits responses to 2 MiB and uses a 3.5-second
total timeout. Plugins must use this transport to receive these guarantees;
the registry cannot sandbox arbitrary plugin code.

```sh
python -m pip install -e '.[test]' ruff build
ruff check .
ruff format --check .
TEST_REDIS_URL=redis://127.0.0.1:6379/0 pytest
python -m build
```

Use a dedicated Redis test service. Without `TEST_REDIS_URL`, distributed tests
are skipped and do not constitute distributed validation. No public API keys
are necessary for the automated suite.
