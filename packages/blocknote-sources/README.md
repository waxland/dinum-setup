# 📦 `@suitenumerique/blocknote-sources`

> Extension BlockNote CustomBlock officielle pour connecter **La Suite Docs** aux **Sources Souveraines de Données Publiques de l'État** avec rendu 100% Cunningham et DSFR.

---

## ⚡ Installation & Démarrage Rapide

```bash
pnpm add @suitenumerique/blocknote-sources
# ou
yarn add @suitenumerique/blocknote-sources
# ou
npm install @suitenumerique/blocknote-sources
```

---

## 🚀 Intégration dans l'Éditeur BlockNote

### 1. Enregistrement dans le Schéma BlockNote

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

### 2. Ajout au Menu Suggestion Slash (`/`)

```tsx
import { getSourceReactSlashMenuItems } from '@suitenumerique/blocknote-sources';

const slashMenuItems = [
  ...defaultMenu,
  ...getSourceReactSlashMenuItems(editor, t, 'Sources Souveraines'),
];
```

### 3. Enregistrement des Exportateurs (PDF / Word DOCX / LibreOffice ODT)

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

## 🎨 3 Formats de Rendu Interchangeables (Cunningham / DSFR)

1. **📢 Format Encadré (Callout) :** Bordure gauche Marianne (`var(--c--globals--colors--brand-primary)`), extrait textuel in extenso, badge de statut et lien vers la source officielle.
2. **🗂️ Format Carte (Card) :** Carte 3 colonnes de métadonnées avec icône thématique et résumé.
3. **🔗 Format Lien (Link) :** Pastille inline compacte cliquable avec infobulle interactive au survol.

---

## 🛡️ Respect des Normes de Code (Skill `code-standards`)

- **Zéro `any` & Zéro cast :** Typage TypeScript strict à 100%.
- **Zéro Tailwind CSS :** Primitives Cunningham et DSFR Marianne exclusives.
- **Zéro `@mantine/core` dans l'UI :** Palette popover autonome accessible.
- **Accessibilité RGAA v4.1 (AA) :** Navigabilité 100% au clavier (`↑`, `↓`, `Entrée`, `Échap`).
