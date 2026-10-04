# 🎯 MISSION : Exécution Séquentielle du Plan de Revue & Harmonisation (`REVIEW_PLAN.md`)

Tu es l'agent d'ingénierie principal du monorepo DINUM / La Suite.
Exécute de façon rigoureuse et séquentielle les 12 tâches atomiques définies dans le fichier `REVIEW_PLAN.md`.

---

## 🏛️ RÈGLES IMPÉRATIVES DE CONTEXTE ET TERMINOLOGIE

Applique strictement le triptyque de dénominations officielles :

1. **Niveau Produit & Métier (Utilisateur) :** « Connecteurs de Données Souverains »
2. **Niveau UX & Éditeur (Composant) :** « Blocs Connectés »
3. **Niveau Standard Open Source (Écosystème) :** « BlockNote External Sources Extension »

Ressources Figma officielles à insérer :

- 🎨 **Maquettes Design :** `https://www.figma.com/design/mDkEb8Pl4A4DFeQ7Xez11d/La-Suite-%25E2%2580%2594-Loi-Source-%25E2%2580%2594-Feature-Flow---Mockups?node-id=2273-6883&t=6IRdUmyY2ONJPlD1-0`
- 🚀 **Prototype Démo Interactif :** `https://www.figma.com/proto/mDkEb8Pl4A4DFeQ7Xez11d/La-Suite-%E2%80%94-Loi-Source-%E2%80%94-Feature-Flow-and-Mockups?node-id=2267-12521&t=6IRdUmyY2ONJPlD1-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&fuid=1039480416252129992`

---

## 📋 PLAN DE DÉROULEMENT PAR ÉTAPES

Gère ta liste de tâches via `manage_todo_list` et progresse étape par étape :

### 🔹 ÉTAPE 1 : Intégration Figma & Présentations Accueil (Tâches T-01, T-02, T-03)

- `documentation/docs/index.mdx` : Ajouter le bloc de présentation avec les 2 liens Figma (Maquettes et Prototype).
- `documentation/docs/03-slasheurs-france/01-loi/index.mdx` : Insérer le callout Figma en tête du cas d'usage pilote Légifrance.
- `documentation-international/docs/index.mdx` : Insérer la section en anglais présentant les Blocs Connectés, l'extension BlockNote et les liens Figma.

### 🔹 ÉTAPE 2 : Harmonisation de la Navigation & Socle Technique (Tâches T-04, T-05)

- `documentation/scripts/generate-docs-navigation.mjs` & `documentation-international/scripts/generate-docs-navigation.mjs` : Remplacer « Slasheurs Souverains » par « Connecteurs de Données Souverains » et « BlockNote Extension » par « BlockNote External Sources Extension ».
- Exécuter `npm run docs:nav` pour régénérer `zudoku.navigation.tsx`.
- `documentation/docs/03-slasheurs-france/00-socle-technique.mdx` : Insérer le tableau comparatif d'arbitrage de l'Option B (Packages Autonomes, < 10 lignes diff) issu de `04-guide-d-arbitrage.md`.

### 🔹 ÉTAPE 3 : Documentation Plugins & Observabilité (Tâches T-06, T-07)

- `documentation/docs/03-slasheurs-france/04-tutoriel-ajouter-une-api.mdx` : Documenter la découverte modulaire via `entry_points` Python dans `pyproject.toml`.
- `documentation/docs/03-slasheurs-france/03-proxy-backend-et-cache.mdx` : Documenter la résilience (disjoncteurs 5 échecs / 30s), le cache Redis SHA-256 (24h), le Token Bucket et l'endpoint `/api/v1.0/sources/health/`.

### 🔹 ÉTAPE 4 : Alignement des PRs, Demo & Storybook (Tâches T-08, T-09, T-10, T-11)

- Mettre à jour `PR/PR-0001-TO-SUITENUMERIQUE-DOCS.md`, `PR/PR-0002-TO-SUITENUMERIQUE-DOCS.md` et `PR/PR-0003-TO-TYPECELLOS-BLOCKNOTE.md` avec la nouvelle nomenclature et les liens Figma.
- `demo/src/App.tsx` et `demo/src/presets.config.ts` : Aligner les intitulés des presets et ajouter le bouton direct vers le prototype Figma.
- `packages/blocknote-sources/src/SourceBlock.stories.tsx` : Vérifier et renommer les stories pour les 3 formats (`FormatInline`, `FormatCard`, `FormatEmbed`).

### 🔹 ÉTAPE 5 : Validation Globale de Non-Régression (Tâche T-12)

Exécute séquentiellement :

1. `npm run docs:nav`
2. `npm run docs:build` (0 erreur SSR / hydratation, vérification Pagefind)
3. `npm run typecheck` (0 erreur TypeScript)
4. `npm run lint` (0 avertissement ESLint)
5. `npm run packages:test` (110 tests unitaires Vitest verts)

---

## 🎯 LIVRABLES ATTENDUS

À la fin de l'exécution, fournis un rapport synthétique listant :

- Les fichiers modifiés avec un résumé des modifications.
- L'état des tests et des builds SSR.
- La confirmation que tous les critères de la Definition of Done (DoD) sont au vert.
