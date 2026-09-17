# 🛠️ `@suitenumerique/slash-sources-sdk`

> SDK TypeScript officiel pour créer et raccorder facilement des sources de données souveraines à **La Suite Numérique** (`La Suite Docs`, `La Suite Projects`, etc.).

---

## ⚡ Installation

```bash
pnpm add @suitenumerique/slash-sources-sdk
# ou
npm install @suitenumerique/slash-sources-sdk
```

---

## 🚀 Créer un Connecteur de Source en < 15 min

```typescript
import { defineSourceProvider } from '@suitenumerique/slash-sources-sdk';

export const justiceProvider = defineSourceProvider({
  type: 'custom',
  name: 'Casier Judiciaire National',
  iconName: 'gavel',
  slashCommand: 'casier',
  slashAliases: ['cjn', 'justice', 'bulletin'],
  description: 'Consulter et référencer les textes officiels du Casier Judiciaire',

  suggest: async (query, limit = 5) => {
    const response = await fetch(`/api/v1.0/sources/suggest/?type=justice&q=${encodeURIComponent(query)}&limit=${limit}`);
    return await response.json();
  },

  search: async (query, limit = 10) => {
    const response = await fetch(`/api/v1.0/sources/search/?type=justice&q=${encodeURIComponent(query)}&limit=${limit}`);
    const data = await response.json();
    return data.results;
  },

  getDetail: async (sourceId) => {
    const response = await fetch(`/api/v1.0/sources/justice/${encodeURIComponent(sourceId)}/`);
    if (!response.ok) return null;
    return await response.json();
  },
});
```

---

## 🛡️ Règles de Qualité & Typage Strict

- **Zero `any`** : Toutes les interfaces sont typées de façon stricte.
- **Zero cast `as ...`** : Les définitions sont validées à l'exécution et immuables (`Object.freeze`).
- **Compatibilité Universelle** : Compatible Node.js 20+, navigateurs modernes et runtimes edge.
