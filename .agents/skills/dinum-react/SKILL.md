---
name: dinum-react
description: Apply DINUM, beta.gouv.fr, La Suite numérique and DesignGouv engineering standards when creating, modifying or reviewing React, TypeScript, JavaScript, HTML or CSS code.
---

# DINUM React Engineering Standards

This skill defines the engineering and software architecture standards applicable across the repository when working on frontend code.

## 🧭 Precedence Order

1. explicit user instruction
2. repository AGENT.md / AGENTS.md instructions
3. existing repository configuration and CI
4. existing architectural/project conventions
5. DINUM / beta.gouv / La Suite recommendations
6. generic language/framework best practices

## 📋 Required Behaviour

### 1. Inspect before modifying
- Inspect `package.json`, `tsconfig.json`, ESLint, Prettier, Stylelint and test configuration.
- Inspect nearby components and existing UI primitives (`@codegouvfr/react-dsfr`, Cunningham).
- Never introduce a new library when an existing dependency already solves the problem.

### 2. Uniform source code
- Follow project linter, formatter and compiler rules.
- Never disable lint rules or add broad `eslint-disable` without justification.
- Remove dead code, commented-out code, and debug `console.log`.

### 3. TypeScript
- Prefer precise domain types, zero `any`.
- Avoid unsafe type assertions (`as ...`) merely to silence the compiler.
- Explicitly model nullable and optional states.

### 4. React component design
- Small, cohesive components with explicit props and clear state ownership.
- Derived state instead of synchronized duplicate state.
- Systematically handle: *Initial, Loading, Success, Empty, Recoverable Error, Disabled*.

### 5. Accessibility (RGAA v4.1 AA) — Mandatory
- Semantic HTML first before ARIA.
- 100% keyboard operation with visible focus ring.
- Explicit accessible labels on interactive elements.
- Decorative SVGs and images marked with `aria-hidden="true"`.
- Contrast ratio $\ge 4.5:1$.

### 6. Tests & Verification
- Maintain existing Vitest, Testing Library or Playwright suites.
- Verify user-visible behaviour and regression safety.
- Run `npm run docs:build` or `npm run packages:test` before declaring completion.
