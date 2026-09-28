# 🧪 End-to-End Recipe & Validation Scenarios Report (`END_TO_END_RECIPE_REPORT.md`)

**Date:** 28 September 2026  
**Reference:** AUD-001 to AUD-018, `PLAN_ACTIONS.md` (Task R-09.01, Section 8 REC-01 to REC-14)  
**Tested Revision:** `d21cf6d`  
**Scope:** Complete end-to-end recipe scenarios across the 4 monorepo pillars

---

## 🏛️ 1. Executive Recipe Matrix (REC-01 to REC-14)

| Test ID    | Scenario & Journey Description                                                                          | Expected Outcome                                                          | Execution Result | Primary Evidence & Test Suite                                           |
| ---------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------- |
| **REC-01** | Clean checkout, `npm ci` installation & build                                                           | Stable `package-lock.json` hash, 0 implicit host dependencies             | 🟢 **PASS**      | `scripts/check-runtime.mjs`, `.sessions/r-01-idempotence.log`           |
| **REC-02** | Reentrant plugin discovery & concurrent search                                                          | Bounded 3.0s execution, single-flight loading, 0 deadlock                 | 🟢 **PASS**      | `test_registry_discovery.py` (4 tests)                                  |
| **REC-03** | Custom provider $\rightarrow$ Django $\rightarrow$ Palette $\rightarrow$ Insertion $\rightarrow$ Reload | Identity, content, and provenance preserved across serialization          | 🟢 **PASS**      | `test_api_sources.py`, `contracts-and-persistence.test.ts`              |
| **REC-04** | Empty query vs disabled/unavailable provider                                                            | Empty list `[]` (HTTP 200) vs HTTP 503, 0 mock fallback injection         | 🟢 **PASS**      | `test_ban_provider.py`, `test_cache_and_health_policy.py`               |
| **REC-05** | Burst requests & multi-worker Redis concurrency                                                         | Lua script token bucket applies budget with 0 lost updates                | 🟢 **PASS**      | `test_redis_concurrency.py` (multi-process execution)                   |
| **REC-06** | Upstream HTTP 429 with `Retry-After` & circuit probe                                                    | Circuit opens, cooldown enforced, single atomic probe in half-open        | 🟢 **PASS**      | `test_circuit_breaker_transitions.py` (4 tests)                         |
| **REC-07** | Forbidden IP/DNS & HTTP redirect attempts                                                               | Non-public IP resolution blocked before connect, 0 redirect followed      | 🟢 **PASS**      | `test_security_ssrf.py`, `test_transport_resilience.py`                 |
| **REC-08** | Fast query editing & slow request cleardown                                                             | In-flight request aborted via `AbortController`, 0 stale UI state         | 🟢 **PASS**      | `useSourceSearch.test.tsx` (21 tests)                                   |
| **REC-09** | Switching country/locale after prose entry                                                              | Text retained, search client target updated, localized ARIA labels        | 🟢 **PASS**      | `countriesAndPresets.test.ts`, `i18nAndPalette.test.tsx`                |
| **REC-10** | Isolated package consumer installation                                                                  | Tarballs & wheel installed in clean venv/npm dir, ESM/CJS verified        | 🟢 **PASS**      | `verify-packages.mjs`, `independentExporters.test.ts`                   |
| **REC-11** | Keyboard-only & accessible modal navigation                                                             | 0 WCAG/RGAA violations, focus trapping & restoration verified             | 🟢 **PASS**      | `axe-audit.spec.ts`, `uiAccessibilityRecipe.test.ts`                    |
| **REC-12** | Dual Zudoku SSR portals build & Pagefind search                                                         | 270 FR / 148 EN routes prerendered, 0 hydration errors                    | 🟢 **PASS**      | `PORTALS_AND_BUILD_VERIFICATION.md`, `portalsBuildVerification.test.ts` |
| **REC-13** | Fault injection & release tag mismatch blocking                                                         | Version mismatch or injected fault fails build/release immediately        | 🟢 **PASS**      | `check-tag-version.mjs`, `tagVersionCheck.test.ts`                      |
| **REC-14** | Offline loading & immutability of legacy snapshots                                                      | Legacy snapshots render without missing props, 0 synthetic dates injected | 🟢 **PASS**      | `contracts-and-persistence.test.ts` (legacy snapshot tests)             |

---

## 📋 2. Detailed Scenario Verification Logs

### REC-01: Clean Checkout & Installation

- **Command:** `node scripts/check-runtime.mjs && npm ci && make check`
- **Result:** `package-lock.json` SHA-256 hash remains identical before and after double installation. Zero implicit host dependencies required beyond Node.js 22+ and Python 3.12+.

### REC-02: Reentrant Plugin Discovery

- **Command:** `PYTHONPATH=. packages/django-lasuite-sources/.venv/bin/pytest packages/django-lasuite-sources/tests/test_registry_discovery.py`
- **Result:** 4 Pytest tests passed. Bounded 3.0s subprocess isolation prevents lock contention deadlocks during concurrent entry point queries.

### REC-03: Custom Provider End-to-End Roundtrip

- **Command:** `PYTHONPATH=. packages/django-lasuite-sources/.venv/bin/pytest packages/django-lasuite-sources/tests/test_api_sources.py` & `npm --prefix packages/blocknote-sources run test tests/unit/contracts-and-persistence.test.ts`
- **Result:** Custom provider roundtrip verified. Search payload converts `source_id` to `sourceId`, preserving `provider`, `origin`, `country`, and `freshness`.

### REC-04: Empty Query vs Unavailable Provider

- **Command:** `PYTHONPATH=. packages/django-lasuite-sources/.venv/bin/pytest packages/django-lasuite-sources/tests/test_ban_provider.py`
- **Result:** Empty search queries return `[]` immediately without network calls. Unconfigured providers raise `SourceUnavailable` and return HTTP 503 without falling back to mock fixtures.

### REC-05: Multi-Process Redis Quota Concurrency

- **Command:** `PYTHONPATH=. packages/django-lasuite-sources/.venv/bin/pytest packages/django-lasuite-sources/tests/test_redis_concurrency.py`
- **Result:** Multi-process execution using `ProcessPoolExecutor` confirms atomic token bucket reservations. Zero lost counter updates or ceiling overshoots under concurrent load.

### REC-06: Circuit Breaker Transitions & Single-Probe Lock

- **Command:** `PYTHONPATH=. packages/django-lasuite-sources/.venv/bin/pytest packages/django-lasuite-sources/tests/test_circuit_breaker_transitions.py`
- **Result:** HTTP 429 response opens the circuit. Atomic probe lock `slasher:probe:<provider>` ensures exactly 1 test request is admitted in half-open state.

### REC-07: Anti-SSRF Defense & Network Transport

- **Command:** `PYTHONPATH=. packages/django-lasuite-sources/.venv/bin/pytest packages/django-lasuite-sources/tests/test_security_ssrf.py`
- **Result:** Calls to loopback, link-local, or private IP ranges (`127.0.0.1`, `10.0.0.1`, `169.254.169.254`, `::1`) are blocked at DNS resolution before socket creation. HTTP redirects are blocked (`allow_redirects=False`).

### REC-08: Search Cancellation & Debounce

- **Command:** `npm --prefix packages/blocknote-sources run test tests/unit/useSourceSearch.test.tsx`
- **Result:** 21 Vitest tests passed. Clearing the search query via `setQuery('')` or modifying the search text immediately aborts pending HTTP requests via `AbortController`.

### REC-09: Multi-Country & i18n Switching

- **Command:** `npm --prefix packages/blocknote-sources run test tests/unit/countriesAndPresets.test.ts`
- **Result:** 31 Vitest tests passed. Switching dataset country (`fr` $\rightarrow$ `ca`) or UI locale (`fr` $\rightarrow$ `en`) preserves active document text while updating search parameters and ARIA labels.

### REC-10: Isolated Package Consumer Distribution

- **Command:** `node scripts/verify-packages.mjs`
- **Result:** `.tgz` tarballs and `.whl` wheel installed in isolated non-monorepo consumer directories. Verified ESM, CommonJS `require()`, and TypeScript `.mts` compilation across all format-specific exporters.

### REC-11: Keyboard Navigation & Axe Accessibility

- **Command:** `npm --prefix packages/blocknote-sources run test:e2e` & `uiAccessibilityRecipe.test.ts`
- **Result:** 0 WCAG 2.1 AA / RGAA v4.1 violations detected by `@axe-core/playwright`. Full keyboard operation (`Tab`, `↑`, `↓`, `Enter`, `Escape`) with focus trapping and focus restoration upon modal exit.

### REC-12: Zudoku SSR Portals & Pagefind Search Index

- **Command:** `npm run docs:build`
- **Result:** 270 FR routes + 148 EN routes prerendered with zero React 19 hydration errors. Pagefind indexes 118 FR content pages (3,822 terms) and 31 EN content pages (1,564 terms).

### REC-13: Fault Injection & Release Tag Verification

- **Command:** `node scripts/check-tag-version.mjs v9.9.9` & `tagVersionCheck.test.ts`
- **Result:** Mismatched tags fail the release pipeline with non-zero exit code (exit code 1).

### REC-14: Offline Readability of Legacy Documents

- **Command:** `npm --prefix packages/blocknote-sources run test tests/unit/contracts-and-persistence.test.ts`
- **Result:** Legacy document JSON snapshots created without new metadata fields render cleanly offline without property errors or silent date injection.
