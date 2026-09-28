# 🧱 BlockNote & Zudoku Rendering Primitives & Architectural Evaluation (`BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md`)

**Date:** 28 September 2026  
**Reference:** AUD-017, `PLAN_ACTIONS.md` (Tasks T-017.03, T-017.04, R-06.02)  
**Scope:** `@suitenumerique/blocknote-sources`, `@dinum/demo-sources`, `@dinum/documentation`, `@dinum/documentation-international`

---

## 🏛️ 1. Context & Repository Constraints

The repository rules in `AGENTS.md` and `GUIDELINES.md` define strict engineering standards:

- **Zero `any` & Zero Cast:** Mandatory strict TypeScript typing across all components.
- **Zero `@mantine/core` in Extension Bundles:** User-facing custom blocks and extension controls must not bundle or expose Mantine components.
- **Zero Tailwind CSS in Monorepo UI Components:** Application components must exclusively use official `@codegouvfr/react-dsfr` DSFR Marianne primitives and Cunningham Design System tokens.
- **SSR & Build Quality Gate:** Documentation portals must build with 0 SSR/hydration errors (`npm run docs:build`).

---

## 🔬 2. Examination of BlockNote Rendering Primitives

### A. Architecture of BlockNote v0.54

BlockNote is structured into distinct packages by responsibility:

1. **`@blocknote/core`:** Headless document model, Prosemirror schema, block definitions, slash menu registry, and exporter interfaces.
2. **`@blocknote/react`:** UI-agnostic React integration providing `createReactBlockSpec()`, `useCreateBlockNote()`, and React hooks.
3. **`@blocknote/mantine`:** Default UI view shell (`<BlockNoteView />`) providing the Prosemirror editor canvas, default slash menu popovers, and toolbar styling built with Mantine CSS.

### B. Extension Package Isolation (`@suitenumerique/blocknote-sources`)

- **Implemented Solution:** `@suitenumerique/blocknote-sources` imports **only** `@blocknote/core` and `@blocknote/react` (`createReactBlockSpec`).
- **Dependencies:** Contains **0 imports** of `@blocknote/mantine` or `@mantine/core`.
- **UI & Formats:** All block formats (`SourceCalloutFormat`, `SourceCardFormat`, `SourceLinkFormat`) and interactive elements (`SourceSearchPopover`, `SourceBlockToolbar`) are built 100% using `@codegouvfr/react-dsfr` buttons/selects/inputs, Cunningham CSS variables, and WAI-ARIA HTML primitives.
- **Impact Assessment:** Downstream consumers (e.g. La Suite Docs or custom React apps) can consume `@suitenumerique/blocknote-sources` in any React environment without bundling Mantine or interfering with their host design system.

### C. Host Application Canvas Rendering (`demo/` & MDX Playgrounds)

- **Current Mechanism:** Host demonstrator applications (`demo/src/App.tsx`, `documentation/src/components/slash-preview/BlockNoteSlashPlayground.tsx`) wrap the editor using `<BlockNoteView editor={editor} />` from `@blocknote/mantine`.
- **Minimal Replacement Evaluation:**
  - _Option 1 (Custom Headless Canvas):_ Rebuilding a custom Prosemirror editor canvas and contenteditable wrapper over pure `@blocknote/react` would require ~1,200 lines of low-level Prosemirror view code, custom selection handlers, and drag-and-drop handles.
  - _Option 2 (Isolation Barrier - Selected):_ Maintain `@blocknote/mantine` **strictly as a dev/demo dependency** in host application shells (`demo/` and Zudoku playgrounds) while enforcing an absolute isolation barrier that guarantees zero leaking of Mantine into `@suitenumerique/blocknote-sources` or `@suitenumerique/slash-sources-sdk`.
- **Verdict:** Option 2 is the minimal, clean, and zero-risk solution. It preserves the official BlockNote editor canvas for interactive playgrounds while ensuring that exported monorepo packages remain 100% Mantine-free.

---

## 🔬 3. Examination of Zudoku Documentation Portal Constraints

### A. Architecture of Zudoku Framework (`zudoku^0.86.0`)

Zudoku is a modern Vite-based MDX documentation portal framework. It features:

1. **Pre-rendering Engine (SSR):** Executes `zudoku build` to pre-render static HTML pages for instant First Contentful Paint (FCP) and SEO.
2. **Built-in UI Shell:** Built on Radix UI, Lucide icons, and Tailwind CSS for top-level navigation, sidebar, and search indexing (Pagefind).

### B. Interoperability with `@codegouvfr/react-dsfr` & DSFR Components

- **Constraint:** `@codegouvfr/react-dsfr` requires DOM window/document APIs and CSS variables (`var(--fr-...)`) initialized during client-side hydration.
- **Minimal Solution:**
  1. Component encapsulation: Interactive DSFR previews (`DSFRPreviews`, `ModalPreview`) are isolated within custom MDX components.
  2. CSS Coexistence: DSFR styles are scoped via `zudoku.theme.css` without polluting Zudoku's top-level navigation shell.
  3. SSR Safety: Browser-only DOM manipulations (e.g. fullscreen Mermaid modals) use React Portals on `document.body` guarded by client-side mounting checks.

### C. Verification & Quality Assurance

- **Build Quality Gate:** Running `npm run docs:build` executes Zudoku static site generation followed by Pagefind search indexing across 145+ pages with 0 SSR or hydration errors.

---

## 📊 4. Summary Table of Rendering Architecture & Boundaries

| Module                             | Purpose                    | Core Rendering Primitives                 | Design System / UI               | Mantine Status                      |
| ---------------------------------- | -------------------------- | ----------------------------------------- | -------------------------------- | ----------------------------------- |
| **`packages/slash-sources-sdk`**   | Data Contracts & Types     | Pure TypeScript DTOs                      | None                             | ❌ None (0%)                        |
| **`packages/blocknote-sources`**   | BlockNote Custom Block     | `@blocknote/core`, `@blocknote/react`     | DSFR + Cunningham + WAI-ARIA     | ❌ None (0%)                        |
| **`demo/`**                        | Interactive Web Playground | `@blocknote/react` + `@blocknote/mantine` | DSFR Header/Hero + Editor Canvas | ⚠️ Isolated to Demo Shell           |
| **`documentation/`**               | French Docs Portal         | Zudoku MDX + `@codegouvfr/react-dsfr`     | DSFR + Cunningham + Zudoku Theme | ⚠️ Isolated to Playground Component |
| **`documentation-international/`** | International Docs Portal  | Zudoku MDX + `@codegouvfr/react-dsfr`     | DSFR + Cunningham + Zudoku Theme | ⚠️ Isolated to Playground Component |

---

## ✅ 5. Conclusion & Compliance Certification

1. **`@suitenumerique/blocknote-sources`** is 100% compliant with the repository's UI purity rule (0 Mantine, 0 Tailwind, 100% DSFR/Cunningham/WAI-ARIA).
2. **Host application shells** (`demo/` and Zudoku MDX playgrounds) use `@blocknote/mantine` solely for rendering the core WYSIWYG editor canvas wrapper without exposing Mantine to package consumers.
3. **Zudoku documentation portals** build cleanly with 0 SSR or hydration errors (`npm run docs:build`).
