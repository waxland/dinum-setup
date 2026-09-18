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
import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import { SourceBlock } from '@suitenumerique/blocknote-sources';

export const customSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    sourceBlock: SourceBlock(),
  },
});
```

### 2. Add to Slash Suggestion Menu (`/`)

```tsx
import { getSourceReactSlashMenuItems } from '@suitenumerique/blocknote-sources';

const slashMenuItems = [
  ...defaultMenu,
  ...getSourceReactSlashMenuItems(editor, t, 'Sovereign Sources'),
];
```

### 3. Register Exporters (PDF / Word DOCX / LibreOffice ODT)

```tsx
import {
  blockMappingSourceBlockPDF,
  blockMappingSourceBlockDocx,
  blockMappingSourceBlockODT,
} from '@suitenumerique/blocknote-sources/exporters';

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

## 🛡️ Code Standards Compliance

- **Zero `any` & Zero Cast:** Strict TypeScript typing across all components.
- **Zero Tailwind CSS:** Exclusive Cunningham and DSFR Marianne primitives.
- **Zero `@mantine/core` in UI:** Accessible standalone popover search palette.
- **RGAA v4.1 (AA) Accessibility:** 100% keyboard navigability (`↑`, `↓`, `Enter`, `Escape`).
