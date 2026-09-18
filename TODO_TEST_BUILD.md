# 📋 Checklist Complète des Tests & Builds (`TODO_TEST_BUILD.md`)

Ce document liste l'ensemble des étapes de vérification, de build et de tests automatisés (unitaires, intégration, Playwright E2E, documentation SSR, démo web, backend Python) pour garantir l'intégrité et la robustesse de l'espace de travail `dinum-setup`.

---

## 📦 1. Packages TypeScript (`packages/`)

### 1.1. `@suitenumerique/slash-sources-sdk`
- [x] **Typecheck TypeScript** : `npm --prefix packages/slash-sources-sdk run typecheck` *(Succès - 0 erreur)*
- [x] **Build du SDK** : `npm --prefix packages/slash-sources-sdk run build` *(Succès)*
- [x] **Tests unitaires (Vitest)** : `npm --prefix packages/slash-sources-sdk run test` *(3/3 tests validés)*
- [x] **Vérification des artefacts générés** : existence de `packages/slash-sources-sdk/dist/index.js` et `dist/index.d.ts`

### 1.2. `@suitenumerique/blocknote-sources`
- [x] **Typecheck TypeScript** : `npm --prefix packages/blocknote-sources run typecheck` *(Succès)*
- [x] **Build du package (tsup)** : `npm --prefix packages/blocknote-sources run build` *(Succès - ESM, CJS, DTS générés)*
- [x] **Tests unitaires (Vitest)** : `npm --prefix packages/blocknote-sources run test` *(12/12 tests validés)*
- [x] **Vérification des exports & formats d'exportation** :
  - [x] Bundle principal (`dist/index.js`, `dist/index.mjs`, `dist/index.d.ts`)
  - [x] Bundle exporters (`dist/exporters/index.js`, `dist/exporters/index.mjs`, `dist/exporters/index.d.ts`)

---

## 🖥️ 2. Application de Démonstration (`demo/`)

- [x] **Typecheck de la Démo** : `npx tsc -p demo/tsconfig.json --noEmit` *(Succès - 0 erreur)*
- [x] **Build de Production Vite** : `npm run demo:build` *(Succès - bundle HTML/CSS/JS optimisé)*
- [x] **Vérification du bundle HTML/CSS/JS** : existence de `demo/dist/index.html` et des assets générés

---

## 📚 3. Portail Documentaire Zudoku (`documentation/`)

- [x] **Génération de la navigation dynamique** : `npm run docs:nav` *(Succès - zudoku.navigation.tsx à jour)*
- [x] **Indexation de la recherche locale** : `npm run docs:search` *(Succès)*
- [x] **Compilation complète SSR Zudoku** : `npm run docs:build` *(Succès - 0 erreur SSR)*
- [x] **Contrôle d'absence d'erreurs d'hydratation / React SSR** (0 erreur)
- [x] **Vérification des routes générées** dans `documentation/dist/` (accueil, onboarding, architecture, composants DSFR, PRs)

---

## 🎭 4. Tests E2E & Accessibilité Playwright

- [x] **Vérification des navigateurs Playwright installés** : Chromium headless shell et dépendances Debian
- [x] **Tests E2E `@suitenumerique/blocknote-sources`** :
  - [x] `npm --prefix packages/blocknote-sources run test:e2e` *(3/3 passed)*
  - [x] Insertion de blocs sources souveraines via menu Slash (`/loi`, `/geo`, `/rag`, `/aide`, etc.)
  - [x] Rendu des composants UI (Design System Cunningham & DSFR)
- [x] **Audit d'accessibilité RGAA v4.1 (Niveau AA)** :
  - [x] Navigation 100% au clavier (Tab, Flèches, Escape, Entrée)
  - [x] Présence des rôles ARIA, labels accessibles et focus ring visibles
  - [x] 0 modale bloquante ou piège au focus

---

## 🐍 5. Backend Django des Sources Souveraines (`packages/django-lasuite-sources/`)

- [x] **Vérification de l'environnement Python / pytest** *(Python 3.11 + pytest 7.2 + django 5.2)*
- [x] **Tests unitaires de l'API des sources** : `pytest packages/django-lasuite-sources/tests/test_api_sources.py` *(6/6 passed)*
- [x] **Tests de sécurité SSRF & validation des URLs** : `pytest packages/django-lasuite-sources/tests/test_security_ssrf.py` *(15/15 passed)*
- [x] **Tests du Circuit Breaker & tolérance aux pannes** : `pytest packages/django-lasuite-sources/tests/test_circuit_breaker.py` *(1/1 passed)*

---

## 🛠️ 6. Orchestration Globale (`Makefile` & Intégration)

- [x] **Build global de l'espace de travail** : `npm run build` *(Succès)*
- [x] **Exécution globale de la suite de tests** : `npm run packages:test` *(15/15 unit tests passed)*
- [x] **Validation des cibles Makefile** :
  - [x] `make packages-build`
  - [x] `make packages-test`
  - [x] `make demo-build`
  - [x] `make docs-build`

---

## 🔍 7. Journal des Corrections & Fixes Appliqués

| Réf Fix | Composant / Fichier | Description du Problème | Correction Appliquée | Statut |
| :--- | :--- | :--- | :--- | :--- |
| **FIX-001** | `documentation/docs/**/*.mdx` | Chemins d'imports relatifs incorrects vers `src/components/` | Script de recalcul automatique des chemins relatifs MDX | ✅ Résolu |
| **FIX-002** | `documentation/docs/**/*.mdx` | Double quotes échappées dans les imports Acorn/MDX | Normalisation des imports avec quotes simples/doubles propres | ✅ Résolu |
| **FIX-003** | `packages/blocknote-sources` | Paquets Playwright manquants et absence de `playwright.config.ts` | Ajout de la configuration Playwright avec serveur web demo | ✅ Résolu |
| **FIX-004** | Système Debian | Manque des bibliothèques C pour Chromium headless (`libnspr4`, etc.) | Installation des dépendances système via `apt-get` | ✅ Résolu |
| **FIX-005** | `tests/e2e/*.spec.ts` | Sélecteurs stricts et ambiguïtés sur les éléments du DOM | Utilisation de sélecteurs accessibles ciblés (`.first()`, `getByRole`) | ✅ Résolu |
| **FIX-006** | `django-lasuite-sources` | Modules manquants (`django`, `djangorestframework`, `pytest-django`) | Installation des paquets Python et exécution avec `PYTHONPATH=.` | ✅ Résolu |
