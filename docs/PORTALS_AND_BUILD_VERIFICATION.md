# 📚 Portals & Build Verification Report (`PORTALS_AND_BUILD_VERIFICATION.md`)

**Date:** 28 September 2026  
**Reference:** AUD-018, `PLAN_ACTIONS.md` (Tasks R-08.04 / T-018.05 / T-018.07)  
**Scope:** `documentation/` (FR Portal) & `documentation-international/` (EN Portal) SSR builds, Pagefind search indexing, and hydration integrity

---

## 🏛️ 1. Build & Route Metrics Summary

| Portal App                  | Workspace Directory            | Prerendered SSR Routes | Pagefind Indexed Pages | Pagefind Word Count     | Build Status                 |
| --------------------------- | ------------------------------ | ---------------------- | ---------------------- | ----------------------- | ---------------------------- |
| **National FR Portal**      | `documentation/`               | **270 routes**         | **118 content pages**  | **3,822 indexed terms** | 🟢 **0 errors / 0 warnings** |
| **International EN Portal** | `documentation-international/` | **148 routes**         | **31 content pages**   | **1,564 indexed terms** | 🟢 **0 errors / 0 warnings** |

---

## 🔍 2. Distinction Between Routes, Indexed Pages, and Visited Pages

1. **Prerendered SSR Routes (270 FR / 148 EN):**
   Includes all top-level entry points (`/`), category routes (`/01-onboarding`, `/02-la-suite`, `/03-slasheurs-france`), subfolder index routes, alias/backwards-compatibility redirects, and individual MDX document pages.
2. **Pagefind Indexed Content Pages (118 FR / 31 EN):**
   Content pages containing explicit `<main data-pagefind-body>` tags. Redirect stubs and empty Category wrappers are excluded from search indexing to prevent search pollution.
3. **Visited & Verified Routes:**
   Primary navigation hubs, onboarding tracks, slash command specifications, ADRs, skills guides, and PR dossiers verified in browser previews (`npm run docs:preview`) with 0 SSR hydration errors or broken asset references.

---

## 🛠️ 3. Resource & Search Index Integrity

- **Pagefind Search Bundles:** Generated automatically post-build under `dist/pagefind/` (`pagefind.js`, `pagefind-entry.json`, WASM indexes).
- **SSR Hydration:** All MDX components (`<DocHeaderSummary />`, `<CodeTabs />`, `<Mermaid />`, `<DSFRPreviews />`) pre-render cleanly with React 19 SSR without client-side DOM mismatch warnings.
- **Static Assets:** CSS tokens, Marianne fonts, SVG icons, and bundled JS assets loaded via relative/absolute paths without 404 resource errors.
