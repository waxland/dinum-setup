# 📑 Remediations & Migration Assessment (AUD-001 to AUD-018)

**Date:** 28 September 2026  
**Reference:** AUD-001 to AUD-018, `PLAN_ACTIONS.md` (Task R-08.03 / T-018.06)  
**Scope:** Remediated audit findings, proof artifacts, remaining items, and external limitations.  
**Historical Reference Note:** The initial audit log [`AUDIT.md`](../AUDIT.md) is preserved as an immutable historical record of the initial state (`f447bf3ce7dcc76fac975ffd3b8f270a24594c30`). This document provides the official dated remediation assessment.

---

## 🏛️ 1. Executive Summary & Remediation Status

All **18 audit findings (AUD-001 through AUD-018)** have been systematically remediated, tested, and validated across the 4 monorepo pillars (`packages/`, `demo/`, `documentation/`, `documentation-international/`).

| Audit ID    | Topic & Finding Summary                   | Status            | Primary Proofs & Test Suites                                                                   | Remaining Items / External Limitations                                |
| ----------- | ----------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **AUD-001** | Lockfile & `npm ci` reproducibility       | 🟢 **Remediated** | `package-lock.json` hash identity, `.sessions/r-01-idempotence.log`                            | None                                                                  |
| **AUD-002** | Concurrent plugin discovery deadlock      | 🟢 **Remediated** | `test_registry_discovery.py` (4 tests, bounded 3s subprocess)                                  | None                                                                  |
| **AUD-003** | DTO contracts & document immutability     | 🟢 **Remediated** | `contracts-and-persistence.test.ts` (23 tests)                                                 | None                                                                  |
| **AUD-004** | Search client injection & security        | 🟢 **Remediated** | `searchClient.test.ts`, `useSourceSearch.test.tsx`                                             | Host app must inject `<SourceSearchProvider>`                         |
| **AUD-005** | Honest provider status & inventory        | 🟢 **Remediated** | `PROVIDERS_INVENTORY.md`, `test_providers_inventory.py`, `test_ban_provider.py`                | Live Albert & Légifrance require production API credentials           |
| **AUD-006** | Distributed quotas & Redis token bucket   | 🟢 **Remediated** | `test_quota_circuit_breaker.py`, `test_redis_concurrency.py`                                   | Production (`DEBUG=False`) requires Redis instance                    |
| **AUD-007** | Circuit breaker & observability           | 🟢 **Remediated** | `test_circuit_breaker_transitions.py`, `test_telemetry_and_correlation.py`                     | None                                                                  |
| **AUD-008** | Defensive transport & anti-SSRF           | 🟢 **Remediated** | `test_transport_resilience.py`, `test_security_ssrf.py`                                        | Upstream endpoints must be public HTTPS                               |
| **AUD-009** | Dependency security & overrides           | 🟢 **Remediated** | `docs/DEPENDENCY_SECURITY_AND_OVERRIDES.md`, `tomlAndOverrides.test.ts`, `npm audit` (0 vulns) | None                                                                  |
| **AUD-010** | Isolated package distribution & exporters | 🟢 **Remediated** | `verify-packages.mjs`, `independentExporters.test.ts`, `odtCompleteDocument.test.ts`           | None                                                                  |
| **AUD-011** | UI accessibility & design system          | 🟢 **Remediated** | `UI_ACCESSIBILITY_AND_DESIGN_SYSTEM_MAPPING.md`, `axe-audit.spec.ts` (0 vulns)                 | Screen reader audio walk-through documented for human tester sign-off |
| **AUD-012** | Hook race conditions & debounce           | 🟢 **Remediated** | `useSourceSearch.test.tsx` (21 tests)                                                          | None                                                                  |
| **AUD-013** | OpenAPI contract & parameter bounds       | 🟢 **Remediated** | `openapi.yaml`, `test_parameters.py`, `test_openapi_validation.py`                             | None                                                                  |
| **AUD-014** | Multi-country presets & i18n              | 🟢 **Remediated** | `countriesAndPresets.test.ts`, `i18nAndPalette.test.tsx` (5 locales, 6 countries)              | None                                                                  |
| **AUD-015** | Quality Gate & CI consolidation           | 🟢 **Remediated** | `make check` (16 steps), `.github/workflows/ci-packages.yml`, `tagVersionCheck.test.ts`        | Publishing requires GitHub repository secrets                         |
| **AUD-016** | Onboarding & idempotence                  | 🟢 **Remediated** | `scripts/check-runtime.mjs`, `README.md`, `.sessions/r-01-idempotence.log`                     | None                                                                  |
| **AUD-017** | Bundle purity & 0-Mantine in extension    | 🟢 **Remediated** | `BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md`, `renderingConstraints.test.ts`                | None                                                                  |
| **AUD-018** | Artifact cleanliness & local links        | 🟢 **Remediated** | `PR/04-guide-d-arbitrage.md`, `verify-local-links.mjs`, `localLinks.test.ts`                   | None                                                                  |

---

## 🔄 2. Migration Notes for Host Applications

When migrating a host application (such as **La Suite Docs**, **Projects**, or third-party React/Django integrations) to the current version of the sovereign packages:

### A. Frontend Migration (`@suitenumerique/blocknote-sources`)

1. **Wrap Editor with Search Client Provider:**
   Replace direct API calls with the `<SourceSearchProvider>` context provider:

   ```tsx
   import { SourceSearchProvider, createHttpSourceClient } from "@suitenumerique/blocknote-sources";

   const searchClient = createHttpSourceClient("/api/v1.0/sources");

   export function AppEditor() {
     return (
       <SourceSearchProvider value={{ client: searchClient, country: "fr", locale: "fr" }}>
         <BlockNoteView editor={editor} />
       </SourceSearchProvider>
     );
   }
   ```

2. **Use Decoupled Exporter Entry Points (Tree-Shaking):**
   To avoid bundling unused export engines (such as PDF or DOCX), import format-specific entry points:

   ```tsx
   import { blockMappingSourceBlockPDF } from "@suitenumerique/blocknote-sources/exporters/pdf";
   import { blockMappingSourceBlockDocx } from "@suitenumerique/blocknote-sources/exporters/docx";
   import { blockMappingSourceBlockODT } from "@suitenumerique/blocknote-sources/exporters/odt";
   ```

3. **Legacy Block Immutability:**
   Existing BlockNote document JSON props without new fields (`verifiedAt`, `freshness`, `provider`, `origin`, `country`) render seamlessly without missing property errors. Saving legacy documents offline does **not** inject synthetic dates or fake verification metadata.

---

### B. Backend Migration (`django-lasuite-sources`)

1. **Register Application & Configure Redis Cache:**
   Add `"lasuite_sources"` to `INSTALLED_APPS` and configure the `"sources"` Redis cache alias:

   ```python
   INSTALLED_APPS += ["rest_framework", "lasuite_sources"]

   CACHES = {
       "default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"},
       "sources": {
           "BACKEND": "django.core.cache.backends.redis.RedisCache",
           "LOCATION": os.environ["SOURCES_REDIS_URL"],
       },
   }
   LASUITE_SOURCES_CACHE_ALIAS = "sources"
   ```

2. **Honest Provider Status:**
   Setting `LASUITE_SOURCES_DEMO = False` connects the Base Adresse Nationale (BAN / Addok) live. Unconfigured providers stay explicitly `is_enabled() = False` and are displayed as `status: Demonstration` in demo mode, never disguised as live connected APIs.
