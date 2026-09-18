---
name: dinum-react
description: Apply DINUM, beta.gouv.fr, La Suite numérique and DesignGouv engineering standards when creating, modifying or reviewing React, TypeScript, JavaScript, HTML or CSS code.
---

# ⚛️ DINUM & beta.gouv.fr React Engineering Standards

This skill defines the engineering and software architecture standards applicable across the repository when creating, modifying, or reviewing React, TypeScript, JavaScript, HTML, or CSS code.

> **Cross-cutting DINUM Principle :**
> Do not optimize for satisfying a checklist while degrading the product. DINUM/La Suite rules are intended to produce understandable, accessible, secure, and maintainable software. Repository context and user needs matter.

---

## 🎯 Activation Scope

Activate this skill whenever work touches:
- `.tsx`, `.ts`, `.jsx`, `.js`
- Frontend CSS / styling / design tokens
- React components and custom hooks
- Next.js / Vite / Zudoku applications
- Client-side navigation & routing
- Forms and validation
- Design-system components (DSFR / Cunningham)
- Frontend unit & E2E tests

---

## 🧭 Precedence Order

When recommendations conflict, apply this strict precedence:

1. **Explicit user instruction**
2. **Repository `AGENTS.md` / `AGENT.md` instructions**
3. **Existing repository configuration and CI (`package.json`, `tsconfig.json`, `eslint.config.js`, `prettier.config.js`)**
4. **Existing architectural/project conventions**
5. **DINUM / beta.gouv / La Suite recommendations**
6. **Generic language/framework best practices**

---

## 📋 Required Behaviour & Engineering Checklist

### 1. Inspect before modifying
Before writing code:
- Inspect `package.json` for installed dependencies and script names.
- Inspect TypeScript configuration (`tsconfig.json`).
- Inspect ESLint / Biome / Prettier / Stylelint configurations.
- Inspect test configuration (Vitest, Playwright, Testing Library).
- Inspect nearby components and existing UI primitives.
- Never introduce a new library when an existing project dependency already solves the problem adequately.
- Never replace repository conventions simply because another DINUM project uses a different convention.

### 2. Uniform source code
DINUM/beta.gouv expects source code to be uniform and automatically checked:
- Follow the repository formatter and linter.
- Follow TypeScript compiler rules (`tsc --noEmit`).
- Never disable lint rules without a justified reason; never add broad `eslint-disable`.
- Prefer a local and documented exception if unavoidable.
- Do not leave commented-out code or debug `console.log`.
- Remove dead imports and dead code.
- Preserve import conventions already used by the project.

### 3. TypeScript (Strict & Explicit)
When TypeScript is available:
- Prefer TypeScript over untyped JavaScript.
- Avoid `any` strictly.
- Prefer precise domain types and explicit interfaces.
- Model nullable and optional states explicitly (`null | undefined`).
- Type component props and API boundaries.
- Validate external/untrusted data when the project has a validation layer.
- Do not use unsafe type assertions (`as ...`) merely to silence the compiler.
- Avoid duplicated types when a canonical type already exists.

### 4. React component design
Prefer:
- Small cohesive components with single responsibilities.
- Explicit props and composition.
- Clear ownership of state.
- Derived state instead of synchronized duplicate state.
- Pure rendering logic where possible.
- Reusable domain logic outside JSX when appropriate.

Avoid:
- Giant components handling unrelated responsibilities.
- Unnecessary effects (`useEffect`) used to compute values that can be calculated during rendering.
- Duplicated state.
- Premature abstractions or premature memoization (`useMemo`/`useCallback`).
- Deeply nested conditional JSX when extracting a component improves readability.

### 5. Side effects and asynchronous work
For asynchronous data:
- Respect the project's existing query/fetching abstraction (e.g. TanStack Query, SWR, or dedicated API clients).
- Handle all 6 interface states:
  1. *Initial state*
  2. *Loading state*
  3. *Success state*
  4. *Empty state*
  5. *Recoverable error state*
  6. *Disabled / unauthorized state*
- Prevent stale or race-prone state.
- Do not introduce direct ad-hoc `fetch` calls if the project exposes an API client.

### 6. Accessibility (RGAA v4.1 AA) — Mandatory
Accessibility is part of implementation, not an optional post-processing task:
- Apply DesignGouv, RGAA v4.1 (Level AA), and La Suite accessibility principles.
- Use semantic HTML first (`<button>`, `<a>`, `<nav>`, `<main>`, `<dialog>`) before adding ARIA.
- Do not add ARIA when native HTML provides the required semantics.
- Correct `button` versus `a` semantics: `<button>` for actions, `<a>` for navigation.
- Form inputs must be programmatically connected to `<label>` and error messages.
- Full keyboard operation with visible focus ring (`Tab`, `Arrows`, `Escape`, `Enter`).
- Zero keyboard traps or blocking modals.
- Meaningful accessible names for interactive controls (`aria-label` or visible text).
- Informative images have useful alternative text; decorative SVGs/images have `aria-hidden="true"`.
- Information is never communicated by color alone.
- Contrast ratio must be $\ge 4.5:1$ for normal text and $\ge 3:1$ for UI components.

### 7. Tests & Quality Gates
beta.gouv standards expect automated testing:
- Identify and update existing tests when behaviour changes.
- Add regression tests for bugs.
- Test user-visible behaviour rather than implementation details.
- Use the test libraries already configured by the repository (e.g. Vitest, Testing Library, Playwright).
- Critical user flows must have integration/E2E protection when an E2E framework exists.

### 8. Security and Privacy
- Never hard-code secrets or API tokens.
- Never expose server-only secrets to browser bundles (`VITE_`, `NEXT_PUBLIC_`).
- Never trust client-side authorization: always enforce authorization server-side.
- Never log sensitive user data.
- Never use `dangerouslySetInnerHTML` without proving that content is sanitized (e.g. DOMPurify).

### 9. Design Systems (DSFR & Cunningham)
- If the project uses DSFR (`@codegouvfr/react-dsfr`), Cunningham (`@openfun/cunningham-tokens`), or La Suite UI Kit, reuse existing components and tokens before writing custom CSS.
- Never hardcode arbitrary hex colors when an official CSS variable exists (e.g. `--blue-france-sun-113: #000091`, `--red-marianne-425: #E1000F`).

### 10. Final Verification Checklist
Before declaring a React/frontend task complete:
1. Review the diff.
2. Remove debugging code.
3. Verify semantics and keyboard accessibility.
4. Run formatter / check mode.
5. Run linting (`npm run lint`).
6. Run type-check (`tsc --noEmit`).
7. Run relevant unit/integration tests (`npm test`).
8. Run relevant E2E tests (`npm run test:e2e`).
9. Run the build (`npm run build` / `npm run docs:build`).
10. Report any command that could not be run.

---

## 🔗 Official Sources & References

- [La Suite numérique — Developer Handbook](https://suitenumerique.gitbook.io/handbook)
- [La Suite — Code Reviews Guide](https://github.com/suitenumerique/dev-handbook/blob/main/code-reviews.md)
- [La Suite — Accessibility Development Rules](https://github.com/suitenumerique/dev-handbook/blob/main/accessibility.md)
- [La Suite — Security Rules](https://github.com/suitenumerique/dev-handbook/blob/main/security.md)
- [beta.gouv — Official Quality Standards](https://standards.beta.gouv.fr/standards)
- [beta.gouv — Uniform Source Code Standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-source-est-uniforme.md)
- [beta.gouv — Unit & E2E Testing Standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-est-instrumente-par-des-tests-unitaires-et-des-tests-e2e.md)
- [beta.gouv — Technical Documentation Standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/les-aspects-techniques-du-produit-sont-documentes.md)
- [DesignGouv — Developer Accessibility Memo](https://design.numerique.gouv.fr/outils/memo-dev/)
- [DesignGouv — Developer Accessibility Checklist](https://design.numerique.gouv.fr/fr/outils/checklist-dev/)
- [DesignGouv — Developer Role and Responsibilities](https://design.numerique.gouv.fr/accessibilite-numerique/roles-cles/developer/)
- [La Suite UI Kit Repository](https://github.com/suitenumerique/ui-kit)
- [La Suite Docs Frontend Impress Tooling](https://github.com/suitenumerique/docs/blob/main/src/frontend/apps/impress/package.json)
