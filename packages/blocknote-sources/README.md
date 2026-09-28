# 📦 `@suitenumerique/blocknote-sources`

> Official BlockNote CustomBlock extension connecting **La Suite Docs** to **Sovereign Public Data Sources** with 100% Cunningham and DSFR rendering.

---

## ⚡ Installation & Quickstart

```bash
pnpm add @suitenumerique/blocknote-sources
# or
yarn add @suitenumerique/blocknote-sources
# or
npm install @suitenumerique/blocknote-sources
```

---

## 🚀 Integration in BlockNote Editor

### 1. Register in BlockNote Schema

```tsx
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { SourceBlock } from "@suitenumerique/blocknote-sources";

export const customSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    sourceBlock: SourceBlock(),
  },
});
```

### 2. Configure Injected Search Client (`SourceSearchProvider`)

```tsx
import { SourceSearchProvider, createHttpSourceClient } from "@suitenumerique/blocknote-sources";

// Injected search client owned by host application
const searchClient = createHttpSourceClient("/api/v1.0/sources");

export function EditorWrapper() {
  return (
    <SourceSearchProvider value={{ client: searchClient, country: "fr", locale: "fr" }}>
      <BlockNoteView editor={editor} />
    </SourceSearchProvider>
  );
}
```

### 3. Add to Slash Suggestion Menu (`/`)

```tsx
import { getSourceReactSlashMenuItems } from "@suitenumerique/blocknote-sources";

const slashMenuItems = [
  ...defaultMenu,
  ...getSourceReactSlashMenuItems(editor, t, "Sovereign Sources"),
];
```

### 4. Register Exporters (PDF / Word DOCX / LibreOffice ODT)

You can import all exporters from the aggregated entry point `@suitenumerique/blocknote-sources/exporters`, or import decoupled format-specific entry points to avoid bundling unused export engines:

```tsx
// Option A: Decoupled independent entry points (Recommended for tree-shaking)
import { blockMappingSourceBlockPDF } from "@suitenumerique/blocknote-sources/exporters/pdf";
import { blockMappingSourceBlockDocx } from "@suitenumerique/blocknote-sources/exporters/docx";
import { blockMappingSourceBlockODT } from "@suitenumerique/blocknote-sources/exporters/odt";

// Option B: Aggregated entry point
// import { blockMappingSourceBlockPDF, blockMappingSourceBlockDocx, blockMappingSourceBlockODT } from '@suitenumerique/blocknote-sources/exporters';

// PDF (@blocknote/xl-pdf-exporter)
pdfSchemaMappings.blockMapping.sourceBlock = blockMappingSourceBlockPDF;

// Word (@blocknote/xl-docx-exporter)
docxSchemaMappings.blockMapping.sourceBlock = blockMappingSourceBlockDocx;

// LibreOffice (@blocknote/xl-odt-exporter)
odtSchemaMappings.blockMapping.sourceBlock = blockMappingSourceBlockODT;
```

---

## 🎨 3 Interchangeable Display Formats (Cunningham / DSFR)

1. **📢 Callout Format:** Left accent border (`var(--c--globals--colors--brand-primary)`), full text excerpt, status badge, and official source link.
2. **🗂️ Card Format:** 3-column metadata card with thematic icon and summary.
3. **🔗 Link Format:** Compact inline clickable badge with interactive hover tooltip.

---

## � Consumer Migration & Architectural Principles

### 1. Injected Search Client (`SourceSearchProvider`)

Host applications must now inject an explicit search client via `<SourceSearchProvider value={{ client, country, locale }}>`. Host applications retain full ownership of authentication, credentials, base URLs, and network headers. No API tokens, secrets, or function instances are ever stored inside the persisted BlockNote document JSON props.

### 2. Explicit Demo Mode (`demoSearchClient`)

Static demonstration fixtures (`MOCK_SOURCES`, `ALL_INTERNATIONAL_MOCK_SOURCES`) are no longer used as silent fallbacks. Host applications in playground, demo, or offline testing environments must explicitly pass `demoSearchClient` to `SourceSearchProvider`.

### 3. Removal of Implicit Mock Fallbacks

If an HTTP request returns an error (e.g. `HTTP 401`, `HTTP 403`, `HTTP 429` Rate Limit, `HTTP 503` Provider Unavailable), the search palette displays an honest, localized error message (`Fournisseur indisponible`, `Authentification requise`, `Limite de requêtes atteinte`). Network failures will never silently substitute mock data or present mock results as verified live data.

### 4. Legacy Document Snapshots & Immutability

Document JSON snapshots created with earlier schema versions (lacking `verifiedAt`, `retrievedAt`, `freshness`, `provider`, `origin`, `country`) remain 100% backward compatible. Reloading and rendering old documents offline or online operates cleanly without errors. No new verification dates or default properties are injected silently into legacy snapshots when re-deserializing or saving documents.

### 5. Node.js & Tooling Runtime Requirements

Building, SSR pre-rendering, and running package tools require **Node.js >= 22.23.2** and **npm >= 10.9.0**.

---

## �🛡️ Code Standards Compliance

- **Zero `any` & Zero Cast:** Strict TypeScript typing across all components.
- **Zero Tailwind CSS:** Exclusive Cunningham and DSFR Marianne primitives.
- **Zero `@mantine/core` in UI:** Accessible standalone popover search palette.
- **RGAA v4.1 (AA) Accessibility:** 100% keyboard navigability (`↑`, `↓`, `Enter`, `Escape`).
