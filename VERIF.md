# 🔍 Comprehensive Quality & Verification Checklist (`VERIF.md`)

> **Repository:** `dinum-setup` (Slasher 4-Pillar Monorepo)  
> **Target Standards:** RGAA v4.1 Level AA, Strict TypeScript (`noImplicitAny`, zero `any`), Cunningham Design System, Anti-SSRF SecNumCloud Compliance.

---

## 🧭 Executive Summary Matrix

| Domain | Area / Component | Risk Level | Target Verification | Automated Command |
|---|---|:---:|---|---|
| **Pillar 1: Demo** | `demo/` | 🟡 Low | Interactive country switching, format toggling, dark mode | `npm run demo:build` |
| **Pillar 2: SDK** | `packages/slash-sources-sdk` | 🟢 Low | Zero dependency, immutable exports, DTS bundles | `npm --prefix packages/slash-sources-sdk test` |
| **Pillar 2: UI Extension** | `packages/blocknote-sources` | 🔴 High | Keyboard accessibility, zero `@mantine/core` in UI, vector PDF/DOCX exporters | `npm --prefix packages/blocknote-sources test` |
| **Pillar 2: Backend** | `packages/django-lasuite-sources` | 🔴 High | Anti-SSRF IP blocking, 3.5s circuit breaker, 24h Redis cache, Celery legal check | `PYTHONPATH=. pytest` |
| **Pillar 3: Documentation**| `documentation/` | 🟡 Medium | Zudoku SSR pre-rendering (270 routes), zero hydration mismatches | `npm run docs:build` |
| **Pillar 4: Orchestration** | `LaSuite/` & `Makefile` | 🟡 Medium | PostgreSQL port collisions, `.env` preservation, Docker networks | `make -n dev` |
| **Upstream PRs** | `PR/` | 🟢 Low | Alignment with upstream `suitenumerique/docs` and `TypeCellOS/BlockNote` | Manual review |

---

## 📦 1. Sovereign Packages (`packages/`)

### 🛠️ 1.1. `@suitenumerique/slash-sources-sdk`
- [ ] **Zero Runtime Dependencies:** Ensure `package.json` has `0` dependencies in `dependencies` (only `devDependencies`).
- [ ] **Immutability Guarantee:** Verify `defineSourceProvider()` executes `Object.freeze()` on provider definitions.
- [ ] **Strict Typing:** Ensure all DTO interfaces (`ExternalSourceEntity`, `SourceSuggestResult`, `SourceEntityProps`) are strictly typed without `any` or loose index signatures.
- [ ] **Bundle Generation:** Verify `dist/index.js` and `dist/index.d.ts` are generated without errors via `tsc -p tsconfig.json`.

### 🧩 1.2. `@suitenumerique/blocknote-sources`
- [ ] **3 Display Modes Lossless Switching:**
  - **Callout Mode:** Left Marianne border `#000091` (`4px`), full text excerpt, and secure external link.
  - **Card Mode:** 3-column metadata grid (Reference, Key Attribute, Validity Date).
  - **Link Mode:** Compact inline badge with hover / focus tooltip (`role="tooltip"`).
- [ ] **No `@mantine/core` in UI Layer:** Ensure the search popover uses `cmdk` or custom accessible markup and does not import Mantine components.
- [ ] **Custom Border Color Prop:** Verify `SourceBlock({ borderColor: '#...' })` overrides the default Marianne blue without breaking style rules.
- [ ] **Exporters Integrity:**
  - **PDF (`@react-pdf/renderer`):** Vector borders, no text overflow, valid link URIs.
  - **Word (`docx`):** Proper run breaks and hyperlink objects.
  - **LibreOffice (`ODT`):** Valid XML tag structure (`text:span`, `text:line-break`).
- [ ] **Storybook Coverage:** Run `npm run storybook` and ensure stories for Callout, Card, Link, and Popover render in both Light and Dark themes.

### 🐍 1.3. `django-lasuite-sources`
- [ ] **Anti-SSRF Defense Enforcement:**
  - Strict rejection of loopback (`127.0.0.0/8`, `::1`), link-local metadata (`169.254.169.254`), and private networks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`).
  - Rejection of non-HTTP protocols (`file://`, `ftp://`, `gopher://`).
- [ ] **Circuit Breaker & Timeout Fallback:** Ensure remote timeouts (over 3.5s) or 5xx server errors do not crash the view but return graceful empty result sets.
- [ ] **Deterministic SHA-256 Redis Caching:** Verify cache keys use SHA-256 hashing of `(provider, query, limit)` and TTL defaults to 24 hours (`86400s`).
- [ ] **Celery Legal Validity Task:** Verify `check_laws_validity_task` flags revoked legal articles (`ABROGÉ`, `PÉRIMÉ`) and records summaries into cache.
- [ ] **Country Providers Symmetry:** Check that all national hubs (`france`, `germany`, `netherlands`, `spain`, `europe`) implement `suggest()`, `search()`, and `get_detail()`.

---

## 🎮 2. Standalone Web Demonstrator (`demo/`)

- [ ] **Autonomous Operation:** Ensure the demo functions 100% in standalone mode without Docker or active backend (using client-side verified mock datasets).
- [ ] **Multi-Country Switcher:**
  - 🇫🇷 France (12 connectors: `/loi`, `/entreprise`, `/marche`, `/adresse`, `/subvention`, `/stats`, `/agent`, `/cadastre`, `/demarche`, `/opendata`, `/albert`).
  - 🇩🇪 Germany (`/gesetz`, `/register`, `/bundestag`, `/govdata`).
  - 🇳🇱 Netherlands (`/wet`, `/kvk`, `/bag`, `/dataoverheid`).
  - 🇪🇸 Spain (`/ley`, `/empresa`, `/licitacion`, `/catastro`).
  - 🇪🇺 European Union (`/eurlex`, `/ted`, `/dataeuropa`).
- [ ] **Instant UI Locale Switching:** Verify UI texts change cleanly between `en`, `fr`, `de`, `nl`, `es`.
- [ ] **Dark / Light Mode Contrast:** Ensure background `bg-gray-900` and text `text-gray-100` maintain WCAG AA contrast ratio $\ge 4.5:1$.

---

## 📚 3. Zudoku Documentation Portal (`documentation/`)

- [ ] **SSR Build Validation:** Run `npm run docs:build` and confirm:
  - `0` hydration mismatch warnings.
  - `0` unresolved import errors.
  - `270` pre-rendered routes generated in `documentation/dist/`.
- [ ] **Dynamic Navigation Sync:** Ensure `scripts/generate-docs-navigation.mjs` generates valid paths in `zudoku.navigation.tsx` whenever MDX files are moved or created.
- [ ] **React Injected Components:**
  - `<Mermaid chart="..." />`: Fullscreen modal, zoom controls (+ / - / reset), dark mode SVG rendering.
  - `<LawSlashPreview />`: Interactive demonstration of the 4 slash states.
  - `<BlockNoteSlashPlayground />`: Live editor instance inside the documentation.
  - `<FeatureCard />` & `<FeatureGrid />`: Responsive grid layouts.

---

## 🐙 4. Local Development Orchestration (`LaSuite/` & `Makefile`)

### 🔌 4.1. PostgreSQL Port Collision Check
Ensure every microservice uses its dedicated isolated port:

| Service | Application | Container Port | Host Port | Database / User |
|---|---|:---:|:---:|---|
| **Docs (Impress)** | `suitenumerique/docs` | `5432` | `15432` | `impress` / `impress` |
| **Projects** | `suitenumerique/projects` | `5432` | `5432` | `postgres` / `postgres` |
| **Keycloak SSO** | `suitenumerique/docs (auth)` | `5432` | `5433` | `keycloak` / `keycloak` |
| **Transfers** | `suitenumerique/transfers` | `5432` | `5432` (isolated) | `transfers` / `transfers` |
| **People & Accounts** | `suitenumerique/people` | `5432` | `15432` (isolated)| `people` / `people` |

### 🛡️ 4.2. Local Environment Hygiene
- [ ] **Idempotent `.env` Generation:** `make env` must never overwrite existing customized `.env` files.
- [ ] **DNS Mapping:** Check that `/etc/hosts` includes `127.0.0.1 auth.local` for Keycloak OIDC redirection.
- [ ] **No Committed Secrets:** Verify no `.env`, private keys, or API tokens are tracked in git.

---

## ♿ 5. Digital Accessibility Checklist (RGAA v4.1 / WCAG 2.1 AA)

- [ ] **Full Keyboard Navigability:**
  - `Tab` / `Shift+Tab`: Move between all interactive controls in logical sequence.
  - `ArrowUp` / `ArrowDown`: Navigate autocomplete suggestions in search popover.
  - `Enter`: Select suggestion or activate button.
  - `Escape`: Close popover, modal, or fullscreen diagram and restore focus to trigger element.
- [ ] **Focus Visibility:** Focus indicators are clear and never hidden with `outline: none`.
- [ ] **Color Contrast Ratios:**
  - Normal text: $\ge 4.5:1$.
  - Large text ($\ge 18.5$px bold or $\ge 24$px regular): $\ge 3:1$.
  - Interactive icons and border accents: $\ge 3:1$.
- [ ] **ARIA Roles & Attributes:**
  - Search input: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`.
  - Suggestions dropdown: `role="listbox"`, `role="option"`, `aria-selected`.
  - Format switcher: `role="toolbar"`, `aria-label`.
  - Tooltips: `role="tooltip"`, `aria-describedby`.

---

## 🐙 6. Upstream Pull Request Alignment (`PR/`)

- [x] **PR 1 (`01-docs-serveur-config.md`):** Submitted & Open online 👉 **[suitenumerique/docs#2703](https://github.com/suitenumerique/docs/pull/2703)** (Dynamic `API_ORIGIN` and `ALLOWED_DEV_ORIGIN` in `compose.yml`, `compose-e2e.yml`, and `next.config.js`).
- [ ] **PR 2 (`02-docs-packages-souverains.md`):** Verify ultra-lightweight (< 10 lines diff) plug-and-play wiring across `pyproject.toml`, `settings.py`, `package.json`, and `BlockNoteEditor.tsx`.
- [ ] **PR 3 (`03-blocknote-slasher-rfc.md`):** Verify RFC template readiness for `TypeCellOS/BlockNote` community extension proposal.
- [ ] **Arbitrage Guide (`04-guide-d-arbitrage.md`):** Confirm documented trade-offs between In-Tree Monolith vs Decoupled Packages.

---

## ⚡ 7. One-Line Full Verification Suite

Run this sequence to validate the entire repository in one pass:

```bash
# 1. Test TypeScript Packages (SDK + BlockNote extension)
npm run packages:test

# 2. Test Django Backend (Anti-SSRF + Registry + Circuit Breaker)
cd packages/django-lasuite-sources && PYTHONPATH=. .venv/bin/pytest && cd ../..

# 3. Build Web Demonstrator
npm run demo:build

# 4. Build Documentation (SSR 270 routes)
npm run docs:build
```
