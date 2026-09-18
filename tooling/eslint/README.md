# 🛠️ Shared ESLint Tooling (`tooling/eslint/`)

Ce dossier rassemble les règles de linting partagées du monorepo `dinum-setup`, adaptées des conventions officielles de **La Suite Docs (`suitenumerique/docs`)**.

---

## 📚 Références Upstream
- [La Suite Docs — `eslint-plugin-docs`](https://github.com/suitenumerique/docs/tree/main/src/frontend/packages/eslint-plugin-docs)
- [Base Rules](https://github.com/suitenumerique/docs/blob/main/src/frontend/packages/eslint-plugin-docs/base.js)
- [TypeScript Rules](https://github.com/suitenumerique/docs/blob/main/src/frontend/packages/eslint-plugin-docs/typescript.js)
- [Test Rules](https://github.com/suitenumerique/docs/blob/main/src/frontend/packages/eslint-plugin-docs/test.js)

---

## 🎯 Règles Clés Appliquées
1. **JavaScript :** `no-var`, `prefer-const`, `curly: all`, `eqeqeq: always`, `no-console: warn`.
2. **TypeScript :** `@typescript-eslint/no-explicit-any: error`, `@typescript-eslint/no-unused-vars` avec préfixe `_`.
3. **Accessibilité (JSX A11y) :** Contrôle des attributs ARIA valides, textes alternatifs obligatoires sur les images informatives.
