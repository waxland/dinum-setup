# 🛠️ `@suitenumerique/slash-sources-sdk`

> Official TypeScript SDK for easily creating and connecting sovereign data sources to **La Suite Numérique** (`La Suite Docs`, `La Suite Projects`, etc.).

---

## ⚡ Installation

```bash
pnpm add @suitenumerique/slash-sources-sdk
# or
npm install @suitenumerique/slash-sources-sdk
```

---

## 🚀 Build a Source Connector in < 15 min

```typescript
import { defineSourceProvider } from '@suitenumerique/slash-sources-sdk';

export const justiceProvider = defineSourceProvider({
  type: 'custom',
  name: 'National Criminal Record',
  iconName: 'gavel',
  slashCommand: 'record',
  slashAliases: ['justice', 'bulletin'],
  description: 'Search and reference official Criminal Record notices',

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

## 🛡️ Quality Standards & Strict Typing

- **Zero `any`**: All interfaces are strictly typed.
- **Zero `as ...` cast**: Definitions are runtime-validated and immutable (`Object.freeze`).
- **Universal Compatibility**: Compatible with Node.js 20+, modern browsers, and edge runtimes.
