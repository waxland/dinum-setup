---
title: Technical Documentation Authoring (MDX & Zudoku)
sidebar_label: Docs MDX
description: Author, structure, and maintain technical documentation in Zudoku using MDX, injected React components, and navigation scripts.
---

This skill provides rules and best practices for writing and publishing clear, interactive technical documentation pages with the Zudoku framework.

---

## 1. When to Use

- Creating or updating documentation pages in `documentation/docs/`.
- Adding new React visual components in `documentation/src/components/` for MDX injection.
- Regenerating sidebar navigation and redirects via `scripts/generate-docs-navigation.mjs`.
- Fixing Zudoku build errors or React hydration mismatches.

---

## 2. Context & Inputs

- Global Zudoku configuration: `documentation/zudoku.config.tsx`.
- Navigation generator script: `documentation/scripts/generate-docs-navigation.mjs`.
- Available components catalog: `documentation/src/components/index.ts`.
- Current navigation map: `documentation/zudoku.navigation.tsx`.

---

## 3. Step-by-Step Procedure

### Step 1: Structure the MDX File

- Create the file with `.mdx` extension under the appropriate topic folder (e.g. `docs/en/...` or `docs/fr/...`).
- Mandatory YAML frontmatter:
  ```yaml
  ---
  title: Explicit Page Title
  description: Concise one-sentence summary for SEO and navigation previews.
  ---
  ```

### Step 2: Use Injected React Components (Avoid Raw Problematic HTML)

- ⚠️ **Critical Rule:** Do not insert raw HTML blocks (`<div>`, `<p>`) containing empty line breaks inside MDX to prevent React hydration errors (`cannot appear as a descendant of <p>`).
- Use global MDX components:
  - `<FeatureGrid cols={2|3}>` and `<FeatureCard ... />`
  - `<TrackCard trackNumber={1} ... />`
  - `<TutorialCard ... />`
  - `<Mermaid chart={\`...\`} />` (with fullscreen and dark mode support)
  - DSFR previews: `<ButtonPreview />`, `<AlertPreview />`, `<TablePreview />`, etc.

### Step 3: Organize Content Flow

For a project or component document, follow this standard structure:

1. **Overview & Official Links:** Purpose, GitHub repos, contacts, and maturity status.
2. **Features / Visual Preview:** Screenshots, Mermaid architecture diagrams, or interactive widgets.
3. **Architecture & Tech Stack:** Data flows, backend/frontend breakdown, database, and protocols.
4. **Commands & Local Usage:** Step-by-step local testing with Makefile/Docker commands.

### Step 4: Regenerate Navigation & Validate Build

```bash
# 1. Regenerate zudoku.navigation.tsx with newly added routes and redirects
npm run docs:nav

# 2. Build and validate zero hydration or pre-rendering errors
npm run docs:build
```

---

## 4. Deliverables & Verification

- `.mdx` file created or updated with valid internal links.
- `npm run docs:build` passes with **0 errors and 0 warnings**.
- The new page appears in the sidebar under the expected category.

---

## 5. Sources & References

- **Zudoku Documentation:** [https://zudoku.dev/](https://zudoku.dev/)
- **MDX Specification:** [https://mdxjs.com/](https://mdxjs.com/)
