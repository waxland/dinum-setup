# 🎨 UI, Accessibility & Design System Mapping (`UI_MAPPING.md`)

**Date:** 28 September 2026  
**Reference:** AUD-011, AUD-017, `PLAN_ACTIONS.md` (Tasks T-011, T-017, R-06.01–R-06.07)  
**Scope:** `@suitenumerique/blocknote-sources`, `demo/`, `documentation/`, `documentation-international/`

---

## 🏛️ 1. Architectural Principles & UI Purity Rules

1. **Zero `any` & Zero Cast:** Strict TypeScript typing across all UI components and props interfaces.
2. **Zero Mantine in Extension Bundle:** `@blocknote/mantine` is isolated exclusively to the BlockNote core text editor shell wrapper (`demo/` and MDX playgrounds). All extension popovers, toolbars, and cards in `packages/blocknote-sources` are 100% Mantine-free.
3. **Zero Tailwind CSS in Monorepo Components:** Monorepo application code uses DSFR Marianne utility classes (`fr-*`), Cunningham Design System tokens (`var(--c--globals--colors--brand-primary)`), or DSFR theme variables (`var(--background-default-grey)`).
4. **Universal RGAA v4.1 (AA) Accessibility:** 100% keyboard navigability (`Tab`, `↑`, `↓`, `Enter`, `Escape`), WAI-ARIA roles (`combobox`, `listbox`, `dialog`, `status`), no focus trapping in non-modal popovers, focus restoration, and contrast ratio $\ge 4.5:1$.

---

## 📋 2. Exhaustive UI Component & Modal Mapping

### A. Extension Components (`packages/blocknote-sources/`)

| Component                 | File Path                                | Category                | UI Library / Primitives                                | ARIA & Keyboard Support                                                                                 | Compliance Status                |
| ------------------------- | ---------------------------------------- | ----------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **`SourceSearchPopover`** | `src/components/SourceSearchPopover.tsx` | Floating Popover        | `@codegouvfr/react-dsfr` (`Button`, `Input`, `Select`) | `role="combobox"`, `role="listbox"`, `aria-activedescendant`, `aria-expanded`, `↑`/`↓`/`Enter`/`Escape` | ✅ Compliant (DSFR + WAI-ARIA)   |
| **`SourceBlockToolbar`**  | `src/formats/SourceBlockToolbar.tsx`     | Block Action Bar        | HTML `<button>`, `<a>`, DSFR CSS tokens                | `type="button"`, focus ring, theme variables                                                            | ✅ Compliant (DSFR tokens)       |
| **`SourceCalloutFormat`** | `src/formats/SourceCalloutFormat.tsx`    | Card Format             | Marianne Accent (`#000091`), `fr-badge`                | High contrast text, semantic `<span>`, status badge                                                     | ✅ Compliant (DSFR + Cunningham) |
| **`SourceCardFormat`**    | `src/formats/SourceCardFormat.tsx`       | 3-Col Card Format       | DSFR surface variables                                 | Grid layout, responsive, contrast $\ge 4.5:1$                                                           | ✅ Compliant (DSFR tokens)       |
| **`SourceLinkFormat`**    | `src/formats/SourceLinkFormat.tsx`       | Inline Link & Popover   | HTML `<a>`, `<div>` popover                            | `role="dialog"`, `aria-haspopup="dialog"`, `aria-expanded`, hover/focus trigger                         | ✅ Compliant (WAI-ARIA)          |
| **`SourceInlineContent`** | `src/components/SourceInlineContent.tsx` | Mention Badge & Tooltip | DSFR Marianne badge                                    | Inline mention, hover/focus popover                                                                     | ✅ Compliant (DSFR + WAI-ARIA)   |
| **`SourceIcon`**          | `src/components/SourceIcon.tsx`          | SVG Icon Primitive      | Pure SVG                                               | `color="currentColor"`, aria-hidden                                                                     | ✅ Compliant                     |

---

### B. Demonstrator Application (`demo/`)

| Component       | File Path                   | Category              | UI Library / Primitives             | ARIA & Keyboard Support                                  | Compliance Status                           |
| --------------- | --------------------------- | --------------------- | ----------------------------------- | -------------------------------------------------------- | ------------------------------------------- |
| **`Header`**    | `src/components/Header.tsx` | Navigation Bar        | `@codegouvfr/react-dsfr` buttons    | `aria-label`, keyboard focusable, dark/light toggle      | ✅ Compliant (DSFR)                         |
| **`Hero`**      | `src/components/Hero.tsx`   | Hero Banner & Toolbar | Radio group, country buttons        | `role="radiogroup"`, `aria-checked`, keyboard accessible | ✅ Compliant (DSFR)                         |
| **`Footer`**    | `src/components/Footer.tsx` | Footer Links          | DSFR links                          | Semantic `<footer>`, contrast $\ge 4.5:1$                | ✅ Compliant (DSFR)                         |
| **`App` Shell** | `src/App.tsx`               | Main Application      | `@blocknote/mantine` (Editor Shell) | Editor focus, slash menu, mentions menu                  | ⚠️ Mantine isolated to BlockNote core shell |

---

### C. Documentation Portals (`documentation/` & `documentation-international/`)

| Component                      | File Path                             | Category                | UI Library / Primitives                          | ARIA & Keyboard Support                                              | Compliance Status                           |
| ------------------------------ | ------------------------------------- | ----------------------- | ------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------- |
| **`DSFRPreviews`**             | `src/components/DSFRPreviews.tsx`     | Interactive Showcase    | Official DSFR (`fr-btn`, `fr-badge`, `fr-alert`) | Full keyboard focus, native DSFR accessibility                       | ✅ Compliant (DSFR)                         |
| **`Mermaid` Fullscreen**       | `src/components/Mermaid.tsx`          | Diagram & Modal Overlay | React Portal (`document.body`)                   | `role="dialog"`, `aria-modal="true"`, `Escape` key close, focus trap | ✅ Compliant (WAI-ARIA Modal)               |
| **`ModalPreview`**             | `src/components/ModalPreview.tsx`     | Modal Component         | `@codegouvfr/react-dsfr/Modal`                   | Native DSFR accessible modal dialog, focus restoration               | ✅ Compliant (DSFR Modal)                   |
| **`OnboardingTracks`**         | `src/components/OnboardingTracks.tsx` | Content Grid            | DSFR Card tokens                                 | Semantic links, high contrast                                        | ✅ Compliant                                |
| **`BlockNoteSlashPlayground`** | `src/components/slash-preview/`       | Interactive MDX Editor  | `@blocknote/mantine` (Playground)                | Keyboard accessible, aria-live status                                | ⚠️ Mantine isolated to BlockNote core shell |

---

## 🔍 3. Audit of Non-Compliant Occurrences & Isolation Rationale

### 1. `@blocknote/mantine`

- **Occurrence:** `demo/src/App.tsx`, `documentation/src/components/slash-preview/`, `documentation-international/src/components/slash-preview/`.
- **Audit Result:** `@blocknote/mantine` is the official React wrapper provided by the BlockNote core library (`@blocknote/react`) to render the underlying text editor canvas.
- **Isolation Verification:** **0 imports of `@blocknote/mantine` or `@mantine/core`** exist inside `packages/blocknote-sources/` or `packages/slash-sources-sdk/`. The exported extension package is 100% Mantine-free and relies solely on `@codegouvfr/react-dsfr`, Cunningham Design System tokens, and native WAI-ARIA primitives.

### 2. Tailwind CSS

- **Occurrence:** Only mentioned in MDX documentation text describing external upstream La Suite applications (e.g., Next.js Docs/Accounts).
- **Audit Result:** **0 Tailwind CSS class names or dependencies** are used in the monorepo's source code or CSS bundles. All styling relies on `@codegouvfr/react-dsfr`, Cunningham CSS variables, or `zudoku.theme.css`.

### 3. Custom CSS & Tokens

- **Occurrence:** Inline style objects in `SourceSearchPopover`, `SourceCalloutFormat`, `SourceBlockToolbar`.
- **Audit Result:** Custom inline CSS is restricted to setting CSS variables (`var(--background-default-grey)`, `var(--text-default-grey)`, `var(--blue-france, #000091)`). All colors strictly follow Cunningham and DSFR token palettes (`#000091`, `#f5f5fe`, `#e1000f`, `#0e793c`).

---

## 🎯 4. Modernization & Action Plan (R-06.02 – R-06.07)

1. **R-06.02 (BlockNote Core Shell & Zudoku Constraints):** Document and maintain the strict isolation barrier preventing Mantine from leaking into `@suitenumerique/blocknote-sources`.
2. **R-06.03 (Control Migration to DSFR/Cunningham):** Ensure all buttons, selects, and inputs in `SourceSearchPopover` use `@codegouvfr/react-dsfr` native components.
3. **R-06.04 (Modal Accessibility):** Ensure all modal overlays (`Mermaid`, `ModalPreview`) possess `aria-modal="true"`, initial focus management, and focus restoration upon exit.
4. **R-06.05 (Keyboard & Clipboard Actions):** Verify keyboard navigation for popovers and link formats (`Escape`, `Enter`, `Tab`) and handle clipboard permission errors gracefully.
5. **R-06.06 (Axe-Core & Contrast Audits):** Run `@axe-core/playwright` audits across dark and light themes to ensure 0 WCAG 2.1 AA / RGAA v4.1 violations.
6. **R-06.07 (Screen Reader Verification):** Conduct manual keyboard and VoiceOver/NVDA screen reader walkthroughs and record exact test scenarios.
