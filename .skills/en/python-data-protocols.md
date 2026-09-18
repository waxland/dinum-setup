---
title: Sovereign Data Protocols & Python Client Integration
sidebar_label: Data Protocols
description: Guidelines and patterns for integrating specialized public data libraries (ckanapi, pandasdmx, SPARQLWrapper, OWSLib, sodapy) with live API keys and mock fallbacks.
---

This skill defines the standardized procedure for integrating, configuring, and securing specialized public data protocol libraries (`ckanapi`, `pandasdmx`, `SPARQLWrapper`, `OWSLib`, `sodapy`, `httpx`) within `django-lasuite-sources` when connecting to live production government APIs instead of certified offline mocks.

---

## 1. When to Use

- Implementing live production client calls for sovereign APIs using open government standards (CKAN, SDMX, SPARQL/RDF, OGC/WFS).
- Configuring optional dependencies in `pyproject.toml` (extras) without bloating the lightweight core package.
- Establishing the dual-mode pattern: Live authenticated protocol client $\leftrightarrow$ Verified offline mock fixture.
- Wrapping third-party protocol clients with mandatory defensive security (anti-SSRF validation, 3.5s timeouts, Redis SHA-256 caching, circuit breaker).
- _Do not use for:_ generic REST API integrations without specialized protocols (use [DINUM Python Standards](dinum-python.md)).

---

## 2. Context & Inputs

- Package base class: `packages/django-lasuite-sources/lasuite_sources/base.py` (`BaseSourceProvider`).
- Quota and circuit breaker engine: `packages/django-lasuite-sources/lasuite_sources/quota.py` (`DistributedQuotaManager`).
- Security validator: `packages/django-lasuite-sources/tests/test_security_ssrf.py` (`is_safe_external_url`).
- Dependencies manifest: `packages/django-lasuite-sources/pyproject.toml`.

---

## 3. Step-by-Step Procedure

### Step 1: Map Public Service Registries to Standard Protocol Libraries

| Standard Protocol | Python Library | Target Public Registries & Portals | Target Slash Commands |
|---|---|---|:---:|
| **CKAN Open Data** | `ckanapi` | `data.gouv.fr`, `data.overheid.nl`, `open.canada.ca`, `govdata.de`, `datos.gob.es` | `/opendata`, `/dataoverheid`, `/opencanada`, `/govdata`, `/datosgob` |
| **SDMX Statistical Data** | `pandasdmx`, `pysdmx` | `Eurostat SDMX API`, `Statistics Canada WDS`, `OECD Data Explorer`, `Destatis Genesis` | `/eurostat`, `/statcan`, `/oecd`, `/destatis` |
| **SPARQL / Linked Data** | `SPARQLWrapper`, `rdflib` | `EUR-Lex / CELLAR`, `data.europa.eu SPARQL endpoint`, `UK Parliament Linked Data` | `/eurlex`, `/dataeuropa`, `/whoiswho` |
| **OGC Geospatial (WFS/WMS)** | `OWSLib` | `INSPIRE European Addresses & Cadastre`, `IGN Géoplateforme`, `PDOK / Kadaster BAG` | `/eu-address`, `/eu-cadastre`, `/cadastre` |
| **Socrata Open Data** | `sodapy` | Public open data portals using Socrata Open Data API (SODA) | `/socrata`, `/us-opendata` |
| **OAuth2 / REST** | `httpx`, `requests` | `Légifrance (PISTE)`, `BOAMP`, `Corporations Canada`, `DIP Bundestag` | `/loi`, `/marche`, `/corporation-ca`, `/bundestag` |

---

### Step 2: Configure Optional Dependencies in `pyproject.toml`

To keep the base `django-lasuite-sources` package ultra-lightweight (< 50 kB), protocol libraries must be configured under optional extras:

```toml
[project.optional-dependencies]
protocols = [
    "httpx>=0.27.0",
    "ckanapi>=4.7.0",
    "pandasdmx>=1.9.0",
    "SPARQLWrapper>=2.0.0",
    "OWSLib>=0.31.0",
    "sodapy>=2.2.0",
    "rdflib>=7.0.0",
]
all = [
    "django-lasuite-sources[protocols,celery]",
]
```

---

### Step 3: Implement the Dual-Mode Provider Pattern (Live $\leftrightarrow$ Mock Fallback)

Every provider must conditionally use the live protocol client when credentials/network are available, and seamlessly fall back to verified mock datasets when offline or during CI runs:

```python
import os
import logging
from typing import List, Optional
from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

class CkanOpenDataSourceProvider(BaseSourceProvider):
    """Sovereign Open Data provider utilizing ckanapi with offline mock fallback."""

    source_type = "opendata"
    name = "data.gouv.fr / Open Data"

    def __init__(self):
        self.api_url = os.getenv("DATAGOUV_API_URL", "https://www.data.gouv.fr")
        self.api_key = os.getenv("DATAGOUV_API_KEY", "")
        self.mock_mode = os.getenv("OPENDATA_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")
        self._client = None

    def _get_client(self):
        """Lazy-load the ckanapi RemoteCKAN client only when live mode is active."""
        if self._client is None and not self.mock_mode:
            try:
                from ckanapi import RemoteCKAN
                self._client = RemoteCKAN(self.api_url, apikey=self.api_key, user_agent="Slasher-LaSuite/1.0")
            except ImportError:
                logger.warning("ckanapi not installed; falling back to mock mode for %s", self.name)
                self.mock_mode = True
        return self._client

    def is_enabled(self) -> bool:
        return True

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        client = self._get_client()
        if client and not self.mock_mode:
            try:
                response = client.action.package_search(q=query, rows=limit)
                return [self._normalize_package(item) for item in response.get("results", [])]
            except Exception as err:
                logger.error("Live CKAN search failed on %s: %s; using mock fallback", self.name, err)

        # Verified offline mock fallback
        return self._search_mock(query, limit)
```

---

### Step 4: Enforce Defensive Security Wrapping (Anti-SSRF & Circuit Breaker)

Whenever instantiating live protocol clients or executing network queries:

1. **Anti-SSRF Verification:** Validate destination hostnames before making calls:
   ```python
   from urllib.parse import urlparse
   from lasuite_sources.quota import is_safe_external_url

   if not is_safe_external_url(endpoint_url):
       raise ValueError(f"Destination URL {endpoint_url} violates anti-SSRF policy.")
   ```
2. **Strict Timeouts:** Set network timeout to **$3.5\text{ s}$ maximum** across all protocol drivers (e.g. `timeout=3.5` in `httpx` or `SPARQLWrapper.setTimeout(3.5)`).
3. **Circuit Breaker Registration:** Report live successes via `quota_manager.record_request_success()` and failures via `quota_manager.record_request_failure()`.

---

## 4. Deliverables & Verification

- Provider implements `BaseSourceProvider` with lazy import of protocol libraries.
- Unit tests run with 100% pass rate in offline mode (`PYTHONPATH=. pytest`).
- Zero hardcoded API keys; all credentials read from environment (`SLASHER_<COUNTRY>_<SERVICE>_API_KEY`).
- DTO responses strictly conform to `SourceSearchResult` / `SourceEntityProps`.

---

## 5. Sources & References

- **CKAN API Documentation:** [https://docs.ckan.org/en/latest/api/](https://docs.ckan.org/en/latest/api/)
- **SDMX Python (pandaSDMX):** [https://pandasdmx.readthedocs.io/](https://pandasdmx.readthedocs.io/)
- **SPARQLWrapper User Guide:** [https://rdflib.dev/sparqlwrapper/](https://rdflib.dev/sparqlwrapper/)
- **OWSLib (OGC Web Services):** [https://geopython.github.io/OWSLib/](https://geopython.github.io/OWSLib/)
- **DINUM Python Standards:** [`.skills/en/dinum-python.md`](dinum-python.md)
- **Quota & Resilience Engine:** [`.skills/en/quota-resilience.md`](quota-resilience.md)
