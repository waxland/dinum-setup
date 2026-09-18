# 🏛️ DINUM & La Suite Engineering Guidelines (`GUIDELINES.md`)

This document serves as the authoritative engineering guide and best practice reference for developers and AI agents working on the `dinum-setup` monorepo, La Suite Numérique components, and sovereign data connectors.

---

## 📚 1. Authoritative Reference Corpus

The core engineering rules applied in this repository are derived from official DINUM, beta.gouv.fr, DesignGouv, and La Suite Numérique standards:

- **[La Suite numérique — Developer Handbook](https://suitenumerique.gitbook.io/handbook)**
- **[La Suite — Python Best Practices](https://github.com/suitenumerique/dev-handbook/blob/main/python.md)**
- **[La Suite — Code Reviews](https://github.com/suitenumerique/dev-handbook/blob/main/code-reviews.md)**
- **[La Suite — Accessibility Development Rules](https://github.com/suitenumerique/dev-handbook/blob/main/accessibility.md)**
- **[La Suite — Security Rules](https://github.com/suitenumerique/dev-handbook/blob/main/security.md)**
- **[beta.gouv — Official Quality Standards](https://standards.beta.gouv.fr/standards)**
- **[beta.gouv — Uniform Source Code / Linting Standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-source-est-uniforme.md)**
- **[beta.gouv — Unit and E2E Testing Standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-est-instrumente-par-des-tests-unitaires-et-des-tests-e2e.md)**
- **[beta.gouv — Technical Documentation Standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/les-aspects-techniques-du-produit-sont-documentes.md)**
- **[DesignGouv — Developer Accessibility Memo](https://design.numerique.gouv.fr/outils/memo-dev/)**
- **[DesignGouv — Developer Accessibility Checklist](https://design.numerique.gouv.fr/fr/outils/checklist-dev/)**
- **[DesignGouv — Developer Role and Responsibilities](https://design.numerique.gouv.fr/accessibilite-numerique/roles-cles/developer/)**
- **[La Suite Docs — Python Configuration Reference](https://github.com/suitenumerique/docs/blob/main/src/backend/pyproject.toml)**
- **[La Suite Docs — React/TypeScript Tooling Reference](https://github.com/suitenumerique/docs/blob/main/src/frontend/apps/impress/package.json)**
- **[La Suite UI Kit](https://github.com/suitenumerique/ui-kit/blob/main/README.md)**

---

## 🎯 2. Order of Rule Precedence

1. **Explicit user instruction**
2. **Repository instructions in [`AGENTS.md`](./AGENTS.md) and [`GUIDELINES.md`](./GUIDELINES.md)**
3. **Existing repository configuration and CI (`package.json`, `pyproject.toml`, `pytest.ini`)**
4. **Existing architectural and project conventions**
5. **DINUM / beta.gouv / La Suite recommendations ([`.skills/dinum-react.md`](.skills/dinum-react.md), [`.skills/dinum-python.md`](.skills/dinum-python.md))**
6. **Generic language/framework best practices**

*Note:* For example, the historical La Suite Python handbook recommends PEP 8 with 99 characters, whereas modern repositories enforce Ruff at 88 characters. **Local repository configuration always takes precedence.**

---

## ⚛️ 3. Frontend & React Guidelines (`dinum-react`)

Applicable to `.tsx`, `.ts`, `.jsx`, `.js`, CSS, React components, Next.js, and frontend tests.

### 3.1. Inspect Before Modifying
- Inspect `package.json`, TypeScript, ESLint, Prettier, Stylelint, Vitest, and design tokens.
- Never add unnecessary third-party dependencies when repository primitives suffice.

### 3.2. Uniform Source Code & Strict TypeScript
- Zero `any`, zero unproven type casts (`as ...`).
- Precise domain types and explicit nullable/optional modeling.
- Follow formatter/linter rules; never use broad `eslint-disable`.
- Clean code: no dead imports, no commented-out blocks, no `console.log`.

### 3.3. React Component Architecture
- Prefer small cohesive components, explicit props, composition, and derived state.
- Avoid giant monolithic components, premature memoization, and unnecessary `useEffect`.
- Pure rendering logic with domain logic extracted outside JSX.

### 3.4. Universal Accessibility (RGAA v4.1 AA / WCAG 2.1 AA)
- 100% keyboard navigable without focus trapping (<kbd>Tab</kbd>, <kbd>Escape</kbd>, arrows).
- Native HTML semantics first before ARIA (`<button>`, `<a>`, `<form>`).
- Form inputs connected to `<label>` and error messages.
- Color contrast $\ge 4.5:1$ on all interactive states.

### 3.5. Official Design Systems
- Exclusively use official DSFR components (`@codegouvfr/react-dsfr`), Cunningham tokens (`#000091`, `#f5f5fe`, `#e1000f`), and CSS variables.
- Zero Tailwind CSS and zero `@mantine/core` in final user-facing bundles.

---

## 🐍 4. Backend & Python Guidelines (`dinum-python`)

Applicable to `.py`, Django, Django REST Framework, Celery tasks, and Python tests.

### 4.1. Code Style & Automated Linting
- PEP 8, 88-character line length (or repository `ruff.toml`/`pyproject.toml`).
- Structured imports in 6 standard groups (future, stdlib, framework, third-party, app, local).
- Meaningful docstrings explaining *intent*, invariants, and edge cases.

### 4.2. Architecture & Typing
- Clean service/model/view separation in Django.
- Explicit type annotations (`typing`); avoid `Any`.
- Explicit error handling: never silently swallow exceptions; return stable machine-readable errors.

### 4.3. Defensive Security (Anti-SSRF & Circuit Breaker)
- Strict validation of all outbound network requests (`is_safe_external_url`) blocking private IPs (RFC 1918, RFC 3927, loopback).
- Circuit breaker with strict 3.5s timeout and automatic fallback to SHA-256 deterministic cache.
- Token Bucket distributed rate limiting with 80% safety threshold and HTTP 429 `Retry-After` compliance.

### 4.4. Database & ORM Hygiene
- Prevent N+1 query loops (`select_related`, `prefetch_related`).
- Atomic transactions for multi-step mutations.
- Reversible, safe, and backwards-compatible Django migrations.

---

## ✅ 5. Mandatory Quality Gate

Before declaring any implementation or refactoring complete:

1. Review the git diff.
2. Verify semantics and keyboard accessibility (100% keyboard, contrast $\ge 4.5:1$).
3. Run formatting, linting, and type checking (`tsc --noEmit`).
4. Run automated test suites (`make packages-test` / `pytest` / `vitest`).
5. Run documentation build (`npm run docs:build`) with 0 SSR errors.
6. Report any command that could not be run.
