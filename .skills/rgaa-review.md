---
title: Accessibility Review (RGAA / WCAG 2.1 AA)
sidebar_label: RGAA Review
description: Audit, validate, and fix digital accessibility across the 13 RGAA v4.1 criteria and WCAG 2.1 Level AA requirements.
---

This skill provides the evaluation methodology to audit and correct digital accessibility for components, pages, or user journeys.

---

## 1. When to Use

- Auditing a web page, component, or form before production release.
- Verifying full keyboard navigability (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`).
- Checking graphical and textual color contrast ratios.
- Adding ARIA landmarks, roles, and screen-reader accessible descriptions.

---

## 2. Context & Inputs

- Targeted page or component files (`.tsx`, `.mdx`, or HTML templates).
- Official RGAA v4.1 / WCAG 2.1 guidelines.

---

## 3. Step-by-Step Procedure

### Step 1: Verify Keyboard Navigation (RGAA Topics 7 & 12)

- [ ] All interactive elements (links, buttons, inputs) are reachable via `Tab`.
- [ ] Tab order matches the logical visual reading order.
- [ ] Focus indicators are never suppressed (`outline: none` is forbidden without an accessible visible replacement).
- [ ] Modals implement a strict **Focus Trap**, and `Escape` closes the modal while restoring focus to the trigger element.

### Step 2: Verify Color Contrasts (RGAA Topics 3 & 10)

- [ ] **Standard text:** Contrast ratio $\ge 4.5:1$ against its background.
- [ ] **Large text (≥ 18.5px bold or ≥ 24px regular):** Contrast ratio $\ge 3:1$.
- [ ] **Graphical components and UI controls:** Contrast ratio $\ge 3:1$.
- [ ] Information is never conveyed *solely* through color (supplement with icons, text, or patterns).

### Step 3: Structure Forms and Input Fields (RGAA Topic 11)

- [ ] Every `<input>`, `<select>`, and `<textarea>` has an explicit `<label>` bound via `htmlFor="id"` / `id="..."`.
- [ ] Helper and error texts are linked via `aria-describedby="error-id"`.
- [ ] Required fields are explicitly marked with `required` and `aria-required="true"`.

### Step 4: Validate HTML Semantics and Heading Hierarchy (RGAA Topics 8 & 9)

- [ ] Exactly one primary `<h1>` per page.
- [ ] No skipping heading levels (e.g., no `<h3>` directly nested under `<h1>`).
- [ ] Informative images have explicit `alt="Clear description"`, decorative images have `alt=""`.
- [ ] Data tables include a descriptive `<caption>` and column headers with `<th scope="col">`.

---

## 4. Deliverables & Verification

Produce a structured audit report (stored in `.sessions/AUDIT_<TOPIC>.md` for multi-step tasks) containing:

1. **Scope & Audited Targets:** File paths or page routes.
2. **Findings Table:**
   | RGAA / WCAG Criterion | Severity (Blocker / Major / Minor) | Observed Issue | Recommended Fix |
   |---|---|---|---|
3. **Overall Status:** Compliant / Non-compliant with prioritized remediation actions.

---

## 5. Sources & References

- **Official RGAA Website:** [https://accessibilite.numerique.gouv.fr/](https://accessibilite.numerique.gouv.fr/)
- **RGAA 4.1.2 Criteria and Testing Method:** [https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/)
- **W3C WCAG 2.1 Guidelines:** [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)
- **Axe-Core Accessibility Engine:** [https://www.deque.com/axe/](https://www.deque.com/axe/)
