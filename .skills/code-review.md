---
title: Code Review & Git Diff Audit
sidebar_label: Code Review
description: Audit a Git diff, Pull Request, or local changes across 3 rigorous axes (Bugs/Regressions, Specifications, Secrets & Quality).
---

This skill defines the standardized procedure for auditing a Git diff, detecting regressions, and ensuring strict compliance with La Suite engineering standards.

---

## 1. When to Use

- User requests review: _"Review my changes"_, _"Audit this PR"_, _"Check for regressions"_.
- Pre-submission or pre-merge validation on any La Suite repository.
- Non-regression checks after major refactoring.
- _Do not use for:_ system-wide architectural audits without a code diff (use [Architecture Review Skill](architecture-review.md)).

---

## 2. Context & Inputs

- Full Git diff (`git diff`, `git diff --cached`, and untracked files).
- Project conventions (ESLint, Prettier, Ruff, DSFR).
- Tickets, tasks, or acceptance criteria in `.sessions/TODO_<TOPIC>.md` if present.

---

## 3. Step-by-Step Procedure

### Axis 1: Bugs & Potential Regressions

- [ ] **Error Handling:** Are exceptions and promise rejections caught and handled gracefully?
- [ ] **Side Effects:** Does a change in a shared module break dependent pages or consumers?
- [ ] **Edge Cases:** Are `null`, `undefined`, empty collections, and network failures handled?
- [ ] **Hydration & Rendering:** No unclosed HTML tags or nested `<p>` elements in MDX/React.

### Axis 2: Requirement Compliance & Scope

- [ ] Are all requested features fully implemented without omissions?
- [ ] No over-engineering (*YAGNI*): Does the code solve the problem cleanly without unnecessary abstraction?
- [ ] Are expected user interactions and keyboard shortcuts preserved?

### Axis 3: Secrets Security & Code Conventions

- [ ] 🔒 **Zero Plaintext Secrets:** Ensure no tokens, API keys, passwords, or private keys are in the diff.
- [ ] 🛑 **Zero `any` & Zero Abusive Type Casting (`as ...`):** All TypeScript code must be strictly typed (see [Code Standards Skill](code-standards.md)).
- [ ] 🎨 **Zero Tailwind CSS & Zero `@mantine/core` in UI:** Exclusively use Cunningham (`<Box>`, `<Card>`, CSS tokens) and official DSFR (`@codegouvfr/react-dsfr`).
- [ ] **Commit Naming:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- [ ] **DSFR & RGAA AA Compliance:** Official `fr-*` classes, ARIA roles (`combobox`, `listbox`), keyboard trap prevention.

---

## 4. Deliverables & Verification

Write a structured audit report (stored in `.sessions/AUDIT_<TOPIC>.md` when applicable), sorted by severity:

1. 🔴 **Blocker (P0):** Critical bug, secret leak, build failure, or major regression.
2. 🟡 **Major (P1):** RGAA accessibility defect, unhandled error, or technical debt.
3. 🟢 **Minor / Suggestion (P2):** Cosmetic tweak, syntax simplification, or doc comment.

**Finding Format:**

```text
[Severity] Location (file:line)
- Issue: Explanation of the unexpected behavior or risk.
- Proof / Scenario: How to reproduce the issue.
- Recommended Fix: Corrective code snippet.
```

If no issues are found, state so explicitly along with the list of checks executed.

---

## 5. Sources & References

- **Conventional Commits:** [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)
- **Code Standards Skill:** [`.skills/en/code-standards.md`](code-standards.md)
