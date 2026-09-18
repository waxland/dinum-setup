---
title: Technical Documentation Authoring (MDX & Zudoku)
sidebar_label: Docs MDX
description: MDX authoring rules for Zudoku, H1 title deduplication, mandatory interactive Mermaid component, and dynamic widgets (CodeTabs, DocHeaderSummary).
---

This skill provides mandatory engineering rules and styling standards for authoring clean, interactive, and error-free technical documentation in **Zudoku (Vite SSR + MDX)**.

---

## 1. When to Use

- Creating, updating, or refactoring documentation pages in `documentation/docs/en/` or `documentation/docs/fr/`.
- Adding or modifying interactive React components in `documentation/src/components/`.
- Harmonizing headings, syntax highlighting, and architecture diagrams.
- Resolving Zudoku SSR build errors or React hydration mismatches.

---

## 2. Core MDX Authoring Rules

### 🛑 Rule 1: Zero H1 Title Duplication (Frontmatter vs Markdown Heading)
- **Principle:** Zudoku automatically renders the main page `<h1>` from the frontmatter `title` property.
- **Strict Prohibition:** **NEVER** add a `# Page Title` (H1 Markdown heading) at the top of the body text after the frontmatter.
- **Best Practice:**
  ```mdx
  ---
  title: Universal Architecture Guide
  sidebar_label: Architecture
  description: Concise page summary for SEO and search indexing.
  ---

  <!-- ✅ No "# Title" here! Start directly with <DocHeaderSummary> or introduction -->
  <DocHeaderSummary
    readingTime="5 min"
    level="Intermediate"
    roles={["Frontend", "Backend"]}
    prerequisites={["Docker", "Node.js 22+"]}
    status="Production Ready"
    takeaway="3-tier modular architecture with Redis cache."
  />

  ## 🏛️ 1. Architecture Overview
  ```

---

### 🎨 Rule 2: Mandatory `<Mermaid>` Component (Zero Raw Code Blocks)
- **Principle:** **NEVER** use raw Markdown code blocks (```` ```mermaid ````) in `.mdx` files.
- **Rationale:** The interactive `<Mermaid chart={`...`} />` component provides:
  1. **Immersive Fullscreen Mode** with zoom, pan, and keyboard exit (<kbd>Escape</kbd>).
  2. Dynamic light/dark theme adaptation using official French State tokens (`#000091`, `#f5f5fe`).
  3. Prevention of layout shifts (CLS) and SSR hydration mismatches.
- **Best Practice:**
  ```mdx
  <Mermaid chart={`flowchart TD
      Client["BlockNote Editor"] --> SDK["@suitenumerique/slash-sources-sdk"]
      SDK --> Backend["django-lasuite-sources"]
      Backend --> API["Sovereign APIs"]
  `} />
  ```

---

### 📦 Rule 3: Systematize Dynamic Tabs (`<CodeTabs>`)
For installation commands and language comparisons, never use separate static snippets:

1. **JavaScript/TypeScript Packages:**
   ```mdx
   <PackageInstallTabs packages="@suitenumerique/slash-sources-sdk @suitenumerique/blocknote-sources" />
   ```
2. **Python Environments:**
   ```mdx
   <PythonInstallTabs packages="django-lasuite-sources" />
   ```
3. **TypeScript $\leftrightarrow$ Python Comparative Snippets:**
   ```mdx
   <DualLanguageTabs
     tsTitle="Frontend BlockNote"
     pyTitle="Backend Django"
     tsCode={`const source = defineSourceProvider({ ... });`}
     pyCode={`class SourceProvider(BaseSourceProvider): ...`}
   />
   ```

---

### 🛡️ Rule 4: JSX Purity & SSR Hydration Safety
- ⚠️ **Self-closing Tags:** All HTML tags in MDX must be self-closing (e.g. `<br />`, `<hr />`, `<img ... />`).
- **No Unparsed Empty Lines in HTML Blocks:** Avoid `<div>` containers enclosing raw paragraphs with blank lines (causes React `cannot appear as a descendant of <p>`).
- Prefer reusable components: `<FeatureGrid cols={3}>`, `<FeatureCard ... />`, `<Kanban />`, `<LawSlashPreview />`.

---

## 3. Standard Page Structure

Every new documentation page must adhere to the standard template:

1. **YAML Frontmatter:** `title`, `sidebar_label`, `description`.
2. **Header Summary:** `<DocHeaderSummary>` (reading time, difficulty level, target roles, prerequisites, takeaway).
3. **Structured Body:**
   - `## 1. Context & Problem Statement`
   - `## 2. Architecture & Interactive Diagram (<Mermaid>)`
   - `## 3. Installation & Setup (<PackageInstallTabs>)`
   - `## 4. Implementation & Code (<CodeTabs> or <DualLanguageTabs>)`
   - `## 5. Automated Tests & Validation`

---

## 4. Local Verification Workflow

```bash
# 1. Regenerate automatic navigation
npm run docs:nav

# 2. Compile SSR and verify 0 hydration errors & 0 warnings
npm run docs:build
```

---

## 5. Acceptance Checklist

- [ ] 0 H1 title duplication (title comes exclusively from frontmatter).
- [ ] 100% of Mermaid diagrams wrapped in `<Mermaid chart={`...`} />`.
- [ ] Package install commands wrapped in `<PackageInstallTabs>` or `<PythonInstallTabs>`.
- [ ] SSR build passes with `npm run docs:build` with 0 errors.
