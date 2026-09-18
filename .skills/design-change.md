---
title: Evolution Design & ADR
sidebar_label: Design Change
description: Design new features, model interface contracts, compare architectural alternatives, and formalize durable ADRs.
---

This skill provides the methodology to design technical evolutions, evaluate trade-offs, and formalize sustainable Architectural Decision Records (ADRs).

---

## 1. When to Use

- Designing a new module, connector, or extension (e.g., `/law` slash command in BlockNote, LiveKit integration).
- Comparing multiple technical approaches requiring an objective architectural trade-off.
- Formalizing an engineering team decision (Architectural Decision Record).
- _Do not use for:_ a code review on an existing diff (use [Code Review Skill](code-review.md)).

---

## 2. Context & Inputs

- User requirements and regulatory / technical constraints.
- Existing architecture specs and code contracts.
- Prior decisions recorded in `.sessions/RETOUR_EXEC_<TOPIC>.md` if available.

---

## 3. Step-by-Step Procedure

### Step 1: Scope the Problem & Invariants

- Define the target usage scenario: _Who uses the feature? What is the expected user flow?_
- Pin down non-negotiable constraints (e.g., zero modification in `node_modules`, RGAA v4.1 AA compliance, E2EE encryption).

### Step 2: Systematically Compare at Least 2 Options

Compare:

- **Option A (Minimal Evolution / Zero New Dependency):** Extension via existing hooks and local adapters.
- **Option B (Dedicated Architecture / New Modules):** Dedicated microservice or specialized library.
- Evaluate against a consistent matrix: _Coupling, Maintainability, Testability, Migration Cost, Regression Risk_.

### Step 3: Specify Interface Contracts

- Write explicit TypeScript signatures or OpenAPI endpoints:
  ```typescript
  export interface CommandExtension {
    trigger: string;
    execute: (context: EditorContext) => Promise<BlockResult>;
  }
  ```
- Define nominal and degraded error cases (network timeouts, third-party outages).

### Step 4: Formalize the Decision (ADR)

Record the decision in `.sessions/RETOUR_EXEC_<TOPIC>.md` with standard structure:

- **`DEC-001` — Decision Title**
- **Date & Status:** Proposed / Accepted / Implemented / Superseded
- **Context & Evaluated Options**
- **Selected Choice & Rationale**
- **Consequences & Re-evaluation Conditions**

---

## 4. Deliverables & Verification

Produce a concise design brief containing:

1. **Motivated Recommendation & Summary** of the selected solution.
2. **Interface Contracts (TypeScript / OpenAPI)**.
3. **Implementation Plan with autonomous task slices** (ready for `.sessions/TODO_<TOPIC>.md`).
4. **Updated Decision Log in `.sessions/RETOUR_EXEC_<TOPIC>.md`**.

---

## 5. Sources & References

- **ADR Methodology:** [https://adr.github.io/](https://adr.github.io/)
- **BlockNote Extensibility:** [https://www.blocknotejs.org/](https://www.blocknotejs.org/)
