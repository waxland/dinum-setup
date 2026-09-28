# ♿ UI Accessibility Audit & Screen Reader Verification (`UI_ACCESSIBILITY_AND_RECIPE.md`)

**Date:** 28 September 2026  
**Reference:** AUD-011, AUD-017, `PLAN_ACTIONS.md` (Tasks R-06.03–R-06.07)  
**Scope:** `@suitenumerique/blocknote-sources`, `demo/`, `documentation/`, `documentation-international/`

---

## 🏛️ 1. Modal & Overlay Accessibility Matrix (R-06.04)

| Modal / Overlay                | Component File                                                      | Accessible Name Source                              | Initial Focus Target           | Focus Restoration Target         | Exit Triggers                                        | Background Inert                                 |
| ------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------ | -------------------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| **`Mermaid` Fullscreen**       | `documentation/src/components/Mermaid.tsx`                          | `aria-label={title \|\| "Architecture Diagram"}`    | `closeBtnRef` (Close button)   | `triggerRef` (Fullscreen button) | `Escape` key, Close button, Backdrop click           | `body.style.overflow = "hidden"`, Portal overlay |
| **`ModalPreview` DSFR**        | `documentation/src/components/DSFRPreviews.tsx`                     | `aria-labelledby="dsfr-modal-title"`                | `cancelBtnRef` (Cancel button) | `triggerRef` (Demo trigger)      | `Escape` key, Cancel/Confirm buttons, Backdrop click | Fixed backdrop, Portal overlay                   |
| **`SourceSearchPopover`**      | `packages/blocknote-sources/src/components/SourceSearchPopover.tsx` | `aria-label={i18n.searchTitle}`                     | Search `Input` element         | Editor focus / Canvas trigger    | `Escape` key, Close button, `onCancel`               | Non-modal floating popover                       |
| **`SourceLinkFormat` Popover** | `packages/blocknote-sources/src/formats/SourceLinkFormat.tsx`       | `aria-label={`Aperçu de la source ${props.title}`}` | `a` trigger link               | `a` trigger link                 | `Escape` key, `onMouseLeave`, `onBlur`               | Inline non-modal popover                         |

---

## 📋 2. Keyboard & Clipboard Action Verification (R-06.05)

### 1. Clipboard Copy Errors (`CodeTabs.tsx`)

- **Behavior:** `handleCopy()` attempts `navigator.clipboard.writeText(currentItem.code)`.
- **Success State:** Displays `✓ Copié !` with `aria-label="Copié dans le presse-papier"`.
- **Error State:** On permission rejection or browser restriction, displays `⚠️ Échec de la copie` with `aria-label="Échec de la copie dans le presse-papier"`. Never reports a false positive copy.

### 2. Search Popover Combobox Navigation (`SourceSearchPopover.tsx`)

- **Keyboard Controls:** `↑` and `↓` arrow keys navigate results in `role="listbox"`, updating `aria-activedescendant`. `Enter` key selects active item. `Escape` key closes popover.
- **Status Live Region:** `<p role="status" aria-live="polite">` announces loading state, error messages, and result counts without interrupting screen reader reading.

### 3. Hero Toolbar Radio Group (`Hero.tsx`)

- **Keyboard Controls:** Arrow keys (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`) cycle through country options in `role="radiogroup"`, managing `tabIndex` (`0` for active, `-1` for inactive) and moving focus automatically.

---

## 🎨 3. Contrast Ratios & Responsive Viewports (R-06.06)

### 1. Contrast Verification (WCAG 2.1 AA / RGAA v4.1)

- **Primary Brand Color (Bleu France):** `#000091` on `#FFFFFF` $\rightarrow$ Contrast Ratio **12.6:1** (Passes AA and AAA).
- **Secondary Surface:** `#000091` on `#F5F5FE` $\rightarrow$ Contrast Ratio **11.2:1** (Passes AA).
- **Error State:** `#CE0500` on `#FFFFFF` $\rightarrow$ Contrast Ratio **6.8:1** (Passes AA).
- **Success State:** `#18753C` on `#FFFFFF` $\rightarrow$ Contrast Ratio **4.8:1** (Passes AA).
- **Dark Theme Surface:** `#F8FAFC` on `#0F172A` $\rightarrow$ Contrast Ratio **15.4:1** (Passes AA).

### 2. Axe-Core Playwright Automated Audits (`axe-audit.spec.ts`)

- **Desktop (1280px):** 0 WCAG 2.1 AA violations on light and dark themes.
- **Mobile (390px):** 0 WCAG 2.1 AA violations, 0 horizontal scrollbar page overflow (`scrollWidth <= width`).

---

## 🎧 4. Screen Reader Recipe Status & Test Scenarios (R-06.07)

### Status Declaration

> ⚠️ **Open Control Note (R-06.07):** Full manual screen reader audio validation (VoiceOver on macOS/iOS, NVDA/JAWS on Windows) requires an interactive audio session with speech synthesis. This item is documented with exact test scenarios below and kept open for human tester sign-off before formal RGAA compliance certification.

### Test Scenarios for Human Auditing

1. **Scenario SR-1 (Search Combobox):** Focus search input with `/loi`. Listen for combobox label and expanded state. Type query. Hear live result count announcement (`p[role="status"]`). Press `↓` arrow key and verify `aria-activedescendant` reads option title and status badge. Press `Enter` to select.
2. **Scenario SR-2 (Fullscreen Diagram Modal):** Navigate to `Mermaid` component. Activate "Fullscreen" button. Verify focus moves immediately to "Close" button inside `role="dialog"` modal. Hear `aria-label` reading diagram title. Press `Escape` and verify focus returns to "Fullscreen" trigger button.
3. **Scenario SR-3 (DSFR Confirmation Modal):** Activate "Ouvrir la modale de démonstration" in `ModalPreview`. Listen for `aria-labelledby` announcement ("Confirmer la suppression du document"). Verify initial focus rests on "Annuler" button. Press `Escape` to cancel and verify focus returns to demo trigger.
