---
title: React & Frontend Engineering Standards (DINUM / La Suite / DesignGouv)
sidebar_label: DINUM React Standards
description: Engineering rules for React, TypeScript, RGAA accessibility, DSFR design system, and testing in La Suite Numérique and beta.gouv.fr applications.
---

This skill defines the procedures and engineering standards to apply whenever creating, modifying, or reviewing frontend code (**React**, **TypeScript**, **DSFR**, **Cunningham**, **HTML/CSS**, **E2E/Playwright Tests**).

---

## 🎯 1. Activation Scope

Activate this skill when working on:
- React components (`.tsx`, `.jsx`)
- TypeScript & JavaScript modules (`.ts`, `.js`)
- CSS stylesheets, tokens, and theme configurations
- Next.js / Vite / Zudoku applications
- Forms, client navigation, and keyboard interactions
- Frontend testing (Vitest, Testing Library, Playwright)

---

## 🧭 2. Rules Precedence Order

1. **Explicit user instruction**
2. **`AGENTS.md` / `AGENT.md` instructions**
3. **Existing repository configuration (`package.json`, `tsconfig.json`, `eslint.config.js`, CI)**
4. **Established architectural conventions in the project**
5. **DINUM / beta.gouv.fr / La Suite guidelines**
6. **Generic React ecosystem best practices**

---

## 📋 3. Mandatory Implementation Checklist

### A. Pre-flight Inspection
- [ ] Inspect `package.json` and already installed UI libraries.
- [ ] Inspect TypeScript compiler rules, ESLint/Biome, and Prettier configurations.
- [ ] Reuse existing design system primitives (`@codegouvfr/react-dsfr`, Cunningham tokens).
- [ ] Never add a third-party package if an existing dependency already solves the problem.

### B. TypeScript Quality & Typing
- [ ] **Zero `any`** : create explicit domain interfaces.
- [ ] **Zero forced casts (`as ...`)** without documented technical justification.
- [ ] Fully type component `props` and API contracts.
- [ ] Explicitly model nullable and optional states (`null | undefined`).

### C. React Component Architecture
- [ ] Modular, single-responsibility components.
- [ ] Derive state during render instead of synchronizing with `useEffect`.
- [ ] Systematically design the 6 UI states: *Initial, Loading, Success, Empty, Recoverable Error, Disabled*.
- [ ] Avoid premature memoization (`useMemo`/`useCallback` without clear benchmarks).

### D. RGAA v4.1 AA Accessibility
- [ ] Use semantic HTML elements before reaching for ARIA.
- [ ] 100% keyboard navigable with visible focus ring (`Tab`, `Arrows`, `Escape`, `Enter`).
- [ ] Explicit accessible names on all interactive elements (`aria-label` or visible text).
- [ ] Decorative images and SVGs must have `aria-hidden="true"`.
- [ ] Color contrast ratio $\ge 4.5:1$.

### E. Testing & Verification
- [ ] Update and maintain existing tests (Vitest / Playwright).
- [ ] Test user-observable behaviour rather than internal implementation details.
- [ ] Run `npm run packages:test` or `npm run test:e2e` before completion.
- [ ] Ensure `npm run docs:build` passes with zero errors.

---

## 🔗 4. Official References

- [La Suite Developer Handbook](https://suitenumerique.gitbook.io/handbook)
- [DesignGouv — Developer Accessibility Memo](https://design.numerique.gouv.fr/outils/memo-dev/)
- [beta.gouv — Uniform Source Code Standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-source-est-uniforme.md)
- [beta.gouv — Unit & E2E Testing Standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-est-instrumente-par-des-tests-unitaires-et-des-tests-e2e.md)
