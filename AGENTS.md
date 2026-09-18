# 🤖 General Instructions for AI Agents (`AGENTS.md`)

This document defines operating rules, security standards, and the routing table for **specialized skills** within the `dinum-setup` monorepo.

---

## 🏛️ 1. Repository Scope

The repository consists of distinct layers:

1. **Root Orchestration:** The `Makefile`, Docker configurations (`docker-compose*.yml`), and environment scripts coordinating local services.
2. **Open Source Packages (`packages/`):** Universal SDK (`slash-sources-sdk`), BlockNote extension (`blocknote-sources`), and Django backend (`django-lasuite-sources`).
3. **Zudoku Documentation Portal (`documentation/`):** The documentation application (`documentation/docs/`, `documentation/zudoku.config.tsx`, `documentation/zudoku.navigation.tsx`, `documentation/src/components/`, `documentation/public/`).
4. **Standalone Web Demo (`demo/`):** The interactive playground for BlockNote and sovereign connectors.
5. **Git Clone Workspace (`LaSuite/*`):** Upstream independent applications of La Suite (`docs`, `projects`, `meet`, `transfers`, `people`, `accounts`).

---

## 🛡️ 2. Core Rules & Engineering Standards

- 🔒 **Secrets Hygiene:** Never commit plaintext passwords, SSH/PGP private keys, or API tokens. Always use `.env.example` or SOPS/age encryption.
- 🛑 **Strict Typing & UI Purity:** Zero `any`, zero abusive type assertions/casts (`as ...`), zero Tailwind CSS, and zero `@mantine/core` in user-facing UI components. Exclusively use Cunningham Design System (`@openfun/cunningham-tokens`, `<Box>`), DSFR (`@codegouvfr/react-dsfr`), and `react-aria-components`.
- ♿ **Universal Accessibility:** Every web page or component must comply with **RGAA v4.1 / WCAG 2.1 Level AA** and be 100% navigable by keyboard with no trapping modals.
- 🎨 **Official Design System:** Exclusively use official `@codegouvfr/react-dsfr` components, Cunningham tokens, and DSFR `fr-*` classes.
- 🔄 **Idempotency:** Makefile targets and scripts must be re-runnable without silently overwriting existing developer configurations or destroying local data.
- ✅ **Mandatory Validation:** Any documentation or code change must pass `npm run docs:build` (0 hydration errors, 0 build failures).

---

## 🧭 3. Specialized Skills Routing Table

Before executing a task, load and read the detailed procedure from `.skills/en/` (or `.skills/` for French):

| Task Intent / Topic | Skill to Load | English File | French File |
| ------------------- | ------------- | ------------ | ----------- |
| **DINUM & beta.gouv React Standards** | `dinum-react` | [`.skills/en/dinum-react.md`](.skills/en/dinum-react.md) | [`.skills/dinum-react.md`](.skills/dinum-react.md) |
| **DINUM & La Suite Python Standards** | `dinum-python` | [`.skills/en/dinum-python.md`](.skills/en/dinum-python.md) | [`.skills/dinum-python.md`](.skills/dinum-python.md) |
| **TypeScript Standards, Cunningham & Zero any/cast** | `code-standards` | [`.skills/en/code-standards.md`](.skills/en/code-standards.md) | [`.skills/code-standards.md`](.skills/code-standards.md) |
| **DSFR Component or View** (Buttons, alerts, forms, tokens, theme) | `dsfr` | [`.skills/en/dsfr.md`](.skills/en/dsfr.md) | [`.skills/dsfr.md`](.skills/dsfr.md) |
| **Accessibility Audit or Fix** (Keyboard, ARIA, contrasts, RGAA) | `rgaa-review` | [`.skills/en/rgaa-review.md`](.skills/en/rgaa-review.md) | [`.skills/rgaa-review.md`](.skills/rgaa-review.md) |
| **Local Orchestration & Dev** (Makefile, Docker, PostgreSQL, ports) | `lasuite-dev` | [`.skills/en/lasuite-dev.md`](.skills/en/lasuite-dev.md) | [`.skills/lasuite-dev.md`](.skills/lasuite-dev.md) |
| **MDX Documentation Authoring** (Zudoku, navigation, React components) | `docs-mdx` | [`.skills/en/docs-mdx.md`](.skills/en/docs-mdx.md) | [`.skills/docs-mdx.md`](.skills/docs-mdx.md) |
| **Code Review / PR Audit** (Bugs, regressions, conventions, secrets) | `code-review` | [`.skills/en/code-review.md`](.skills/en/code-review.md) | [`.skills/code-review.md`](.skills/code-review.md) |
| **Architecture Review** (Coupling, responsibilities, real-time/S3 flows) | `architecture-review` | [`.skills/en/architecture-review.md`](.skills/en/architecture-review.md) | [`.skills/architecture-review.md`](.skills/architecture-review.md) |
| **Evolution Design & ADR** (New feature, option trade-offs, ADR) | `design-change` | [`.skills/en/design-change.md`](.skills/en/design-change.md) | [`.skills/design-change.md`](.skills/design-change.md) |
| **Pull Request Submission & CI Validation** (Gitlint, Gitmoji, DCO) | `send-pr` | [`.skills/en/send-pr.md`](.skills/en/send-pr.md) | [`.skills/send-pr.md`](.skills/send-pr.md) |
| **Package Versioning & Distribution** (SemVer, Wheels, Tarballs, CLI) | `package-versioning` | [`.skills/en/package-versioning.md`](.skills/en/package-versioning.md) | [`.skills/package-versioning.md`](.skills/package-versioning.md) |
| **Quota Management & Resilience** (Rate Limits, Circuit Breaker, Caching) | `quota-resilience` | [`.skills/en/quota-resilience.md`](.skills/en/quota-resilience.md) | [`.skills/quota-resilience.md`](.skills/quota-resilience.md) |

---

## 📋 4. Session Tracking & Structured Memory

For complex or multi-step missions, create or update tracking files in the **`.sessions/`** directory (ignored by git):

- **`.sessions/RETOUR_EXEC_<TOPIC>.md`**: Log of executed commands, observed results, architectural decisions (`DEC-001`), and resumption checkpoints.
- **`.sessions/AUDIT_<TOPIC>.md`**: Log of findings (`AUD-001`), severity ratings, test scenarios, and verification proofs.
- **`.sessions/TODO_<TOPIC>.md`**: Atomic task breakdown (`T-001`), dependencies, and observable acceptance criteria.
