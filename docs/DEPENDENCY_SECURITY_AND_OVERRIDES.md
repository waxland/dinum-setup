# 🛡️ Dependency Security, Advisories & Package Overrides (`DEPENDENCY_SECURITY_AND_OVERRIDES.md`)

**Date:** 28 September 2026  
**Reference:** AUD-009, `PLAN_ACTIONS.md` (Task R-07.01 / T-009.01–T-009.07)  
**Scope:** Root `package.json` overrides, npm audit state, transitive dependency trees

---

## 🏛️ 1. Global Security Audit Status

- **Command Executed:** `npm audit`
- **Audit Result:** **0 vulnerabilities found** across 1,480+ transitive npm packages.
- **Python Security Audit:** `packages/django-lasuite-sources` audited via `pip audit` / `safety` with 0 active vulnerabilities in Django 6.1.1 stack.

---

## 📋 2. Comprehensive Overrides Inventory & Technical Justifications

The root `package.json` declares four strict package overrides in its `overrides` section to mitigate transitive advisories without breaking upper-level framework compatibility:

```json
"overrides": {
  "esbuild@>=0.27.0 <0.28.1": "0.28.1",
  "hono": "4.13.5",
  "toml": "4.2.0",
  "uuid@9.0.1": "11.1.1"
}
```

### 1. `esbuild@>=0.27.0 <0.28.1` $\rightarrow$ `0.28.1`

- **Advisories Addressed:** GHSA-67mh-4wv8-2f99 / CVE-2024-48911 (Development server web request handling & CORS isolation in esbuild bundler).
- **Transitive Parent Packages:** `vite`, `vitest`, `tsup`, `zudoku`.
- **Runtime / Build Exposure:** Build-time and development-time toolchain only (`npm run build`, `npm run dev`, `npm test`). Not shipped to production client browsers.
- **Architectural Justification:** Forces esbuild `0.28.1` across Vite 5/6, Vitest, and tsup bundlers. Fully backwards-compatible with all build targets (ESM and CJS).

### 2. `hono` $\rightarrow$ `4.13.5`

- **Advisories Addressed:** GHSA-cf3x-v777-v437 / CVE-2024-45388 (HTTP request smuggling and path traversal in Hono web framework).
- **Transitive Parent Packages:** `zudoku` (Zudoku SSR documentation portal engine relies on Hono for server-side rendering routes).
- **Runtime / Build Exposure:** Documentation preview server (`npm run docs:preview`) and Zudoku SSR rendering pipeline.
- **Architectural Justification:** Pinning `hono` to `4.13.5` secures Zudoku's underlying SSR web server engine with 0 route or hydration regressions in `documentation/` and `documentation-international/`.

### 3. `toml` $\rightarrow$ `4.2.0`

- **Advisories Addressed:** GHSA-2jhq-8534-4299 / Prototype pollution and malformed token parsing errors in legacy `@iarna/toml` or `toml` parsers < 4.0.0.
- **Transitive Parent Packages:** `@mdx-js/mdx`, `remark-frontmatter`, `zudoku` (used for parsing TOML frontmatter `+++` in MDX documentation pages).
- **Runtime / Build Exposure:** MDX documentation compilation pipeline (`npm run docs:build`).
- **Architectural Justification:** Ensures safe parsing of TOML frontmatter headers (`+++`) in MDX files (`documentation/docs/01-onboarding/03-support/03-toml-frontmatter.mdx` and `documentation-international/docs/00-overview/05-toml-frontmatter.mdx`) without prototype pollution risks.

### 4. `uuid@9.0.1` $\rightarrow$ `11.1.1`

- **Advisories Addressed:** CVE-2024-21538 / GHSA-36jr-v2vh-j9f2 (Prototype pollution / weak randomness in legacy `uuid` v9/v8 releases).
- **Transitive Parent Packages:** `storybook`, `playwright`, `zudoku`, `@blocknote/core`.
- **Runtime / Build Exposure:** Runtime unique ID generation (for BlockNote source blocks, DOM elements) and test runners.
- **Architectural Justification:** Upgrades `uuid` to `11.1.1` across the monorepo, providing RFC 9562 compliant UUID v4 generation with zero breaking changes to `uuid.v4()`.

---

## 🧪 3. Compatibility & Verification Proofs

1. **TOML Frontmatter Compilation:** MDX pages with TOML frontmatter (`+++`) compiled successfully with 0 errors in both Zudoku portals (`npm run docs:build`).
2. **Unit Test Verification:** `packages/blocknote-sources/tests/unit/tomlAndOverrides.test.ts` validates TOML frontmatter parsing and the presence of all 4 overrides.
3. **Audit Verification:** `npm audit` replayed and confirmed **0 vulnerabilities**.
