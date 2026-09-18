---
title: DSFR & React-DSFR
sidebar_label: DSFR
description: Build, integrate, and maintain UI components compliant with French State Design System standards and @codegouvfr/react-dsfr.
---

This skill defines the procedure for designing and integrating user interfaces that comply with the **French State Design System (DSFR)** and the official library **`@codegouvfr/react-dsfr`**.

---

## 1. When to Use

- Creating or modifying a UI component (Buttons, Modals, Forms, Tables, Alerts, Headers, Breadcrumbs).
- Styling a view respecting French institutional colors (Bleu France `#000091`, Rouge Marianne `#E1000F`) and semantic tokens.
- Configuring Dark Mode support or Marianne typography.
- _Do not use for:_ a pure accessibility audit without code modification (use [RGAA Review Skill](rgaa-review.md)).

---

## 2. Context & Inputs

- Project dependencies: check the installed `@codegouvfr/react-dsfr` version in `package.json`.
- Existing theme and tokens: inspect `zudoku.theme.css` and style tokens.
- Reference documentation: official DSFR documentation and component catalogs.

---

## 3. Step-by-Step Procedure

### Step 1: Choose the Right Approach (React-DSFR vs HTML Core)

- **In a React / Next.js / Zudoku application:** Exclusively import typed official components from `@codegouvfr/react-dsfr/<ComponentName>`:
  ```tsx
  import Button from "@codegouvfr/react-dsfr/Button";
  import Alert from "@codegouvfr/react-dsfr/Alert";
  import { createModal } from "@codegouvfr/react-dsfr/Modal";
  ```
- **In pure HTML / CSS or Django templates:** Use official prefixed CSS classes (`fr-btn`, `fr-alert`, `fr-table`, `fr-input`).

### Step 2: Respect CSS Tokens and Institutional Colors

- Never hardcode arbitrary hex colors (e.g., `#1a73e8` or `#0070f3`).
- Use official DSFR CSS variables:
  - Primary: `--blue-france-sun-113` (`#000091`) / Hover: `--blue-france-sun-113-hover` (`#1212ff`).
  - Accent: `--red-marianne-425` (`#E1000F`).
  - Success: `--background-contrast-success` (`#18753C`).
  - Error: `--background-contrast-error` (`#CE0500`).
  - Warning: `--background-contrast-warning` (`#B34000`).

### Step 3: Ensure Native Dark Mode Support

- Pair each background color with its dark mode equivalent.
- Ensure borders and text remain readable with a contrast ratio $\ge 4.5:1$.

### Step 4: Strict Prop & Variant Compliance

- Check TypeScript signatures of `@codegouvfr/react-dsfr`.
- Allowed button priorities: `priority="primary"`, `priority="secondary"`, `priority="tertiary"`, `priority="tertiary no outline"`.
- Allowed button sizes: `size="small"`, `size="medium"` (default), `size="large"`.

---

## 4. Deliverables & Verification

- **Clean and strictly typed code:** No TypeScript compilation errors (`tsc --noEmit` or `npm run docs:build`).
- **Visual rendering:** Component tested in both Light and Dark themes.
- **Accessibility:** Visible keyboard focus indicator, explicit labels, and accessible button semantics.

---

## 5. Sources & References

- **Official DSFR Website:** [https://www.systeme-de-design.gouv.fr/version-courante/fr](https://www.systeme-de-design.gouv.fr/version-courante/fr)
- **React-DSFR Storybook:** [https://components.react-dsfr.fr/](https://components.react-dsfr.fr/)
- **React-DSFR GitHub Repository:** [https://github.com/codegouvfr/react-dsfr](https://github.com/codegouvfr/react-dsfr)
