# 📋 Checklist d'Alignement Qualité, Linters & Architecture (`LINT_TODO.md`)

Ce document formalise la feuille de route d'alignement technique et architectural du monorepo `dinum-setup` avec les standards officiels de **La Suite Numérique ([`suitenumerique/docs`](https://github.com/suitenumerique/docs))** et de **beta.gouv.fr**.

---

## 🏛️ 1. Matrice des Linters & Outils par Projet

Chaque sous-projet du monorepo dispose de son propre outillage de qualité, conforme aux règles officielles :

| Projet / Workspace | Type de Stack | Linters & Outils | Commandes Associées | Statut |
| :--- | :--- | :--- | :--- | :--- |
| **`packages/slash-sources-sdk`** | TypeScript SDK pur | TypeScript strict (`tsc`) + Vitest | `npm run typecheck`, `npm test` | ✅ Configuré |
| **`packages/blocknote-sources`** | React 19 + BlockNote | `tooling/eslint/` + `tsc` + Vitest + Playwright | `npm run typecheck`, `npm test`, `npm run test:e2e` | ✅ Configuré |
| **`packages/django-lasuite-sources`** | Python 3.12 / Django | Ruff (88 cols, 14 rule families) + pytest | `pytest`, `ruff check` | ✅ Configuré |
| **`demo/`** | Vite 6 + React 19 | `tsc` + Vite linter + Playwright E2E | `npm run build`, `npm run preview` | ✅ Configuré |
| **`documentation/`** | Zudoku SSR + MDX | Zudoku SSR compiler + Pagefind | `npm run build`, `npm run docs:nav` | ✅ Configuré |
| **Racine Monorepo** | Orchestration Globale | Makefile (`make check`) + Shared Tooling | `make check`, `make vercel-status` | ✅ Configuré |

---

## 📋 2. Checklist d'Exécution par Périmètre

### 2.1. Tooling ESLint Partagé (`tooling/eslint/`)
*Adapté du package officiel [`eslint-plugin-docs`](https://github.com/suitenumerique/docs/tree/main/src/frontend/packages/eslint-plugin-docs)*.

- [x] **Règles JavaScript de Base (`tooling/eslint/base.mjs`)** :
  - `no-var: error`, `prefer-const: error`
  - `curly: ["error", "all"]` (blocs stricts)
  - `eqeqeq: ["error", "always"]` (égalité stricte)
  - `no-duplicate-imports: error`
  - `no-console: ["warn", { allow: ["warn", "error"] }]`
- [x] **Règles TypeScript Strictes (`tooling/eslint/typescript.mjs`)** :
  - `@typescript-eslint/no-explicit-any: error` (zéro `any`)
  - `@typescript-eslint/no-unused-vars` avec exclusion des variables préfixées par `_`
  - `@typescript-eslint/no-non-null-assertion: warn` (évitement des `!`)
- [x] **Documentation & Index (`tooling/eslint/README.md`)** documentant les sources et règles upstream.

---

### 2.2. Configuration Python & Backend (`packages/django-lasuite-sources/`)
*Aligné sur [`src/backend/pyproject.toml`](https://github.com/suitenumerique/docs/blob/main/src/backend/pyproject.toml)*.

- [x] **Règles Ruff complètes dans `pyproject.toml`** :
  - Longueur de ligne : `line-length = 88`
  - `B` (flake8-bugbear) : détection des bugs courants et arguments mutables par défaut
  - `BLE` (blind exceptions) : interdiction des `except Exception: pass` silencieux
  - `C4` (flake8-comprehensions) : optimisation des compréhensions de listes/dictionnaires
  - `DJ` (flake8-django) : bonnes pratiques spécifiques aux modèles et vues Django
  - `I` (isort) : tri des imports ordonné en 6 sections architecturales
  - `PLC`, `PLE`, `PLR`, `PLW` : conventions et refactorings Pylint
  - `RUF100`, `RUF200` : contrôle des directives `# noqa` inutilisées et pyproject
  - `S` (flake8-bandit) : audits de sécurité statique (injections, random faible, etc.)
  - `SLF` (private member access) : contrôle des accès aux méthodes privées
  - `T20` (print detection) : interdiction des `print()` résiduels en production
- [x] **Tri isort en 6 sections hiérarchiques** :
  1. `future`
  2. `standard-library`
  3. `django` (`django`, `rest_framework`)
  4. `third-party`
  5. `first-party` (`lasuite_sources`)
  6. `local-folder`

---

### 2.3. Architecture & Documentation Technique
*Aligné sur [`documentation/architecture.md`](https://github.com/suitenumerique/docs/blob/main/documentation/architecture.md)*.

- [x] **Document Global d'Architecture ([`ARCHITECTURE.md`](ARCHITECTURE.md))** :
  - Contexte & Présentation des 4 Piliers
  - Schéma Mermaid des flux de données et dépendances
  - Conventions de placement pour les nouveaux composants, connecteurs et types
- [x] **Dossiers de Décisions d'Architecture ([`docs/adr/`](docs/adr/README.md))** :
  - [ADR-0001 : Découplage du Monorepo en 4 Piliers](docs/adr/0001-architecture-monorepo-4-piliers.md)
  - [ADR-0002 : Rendu Tri-Format DSFR / Cunningham](docs/adr/0002-rendu-tri-format-dsfr-cunningham.md)
  - [ADR-0003 : Proxy Django Anti-SSRF & Circuit Breaker](docs/adr/0003-proxy-django-anti-ssrf-circuit-breaker.md)
  - [ADR-0004 : Dual Trigger d'Interlinking Slash & Mention](docs/adr/0004-dual-trigger-slash-et-mention.md)
- [x] **Documentation d'Ingénierie & Qualité ([`documentation/docs/fr/01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite.mdx`](documentation/docs/fr/01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite.mdx))** :
  - Matrice des linters et commandes
  - Liens vers tous les fichiers amont de `suitenumerique/docs` et standards beta.gouv.fr

---

### 2.4. Compétences Spécialisées (`.skills/` & `.agents/skills/`)
*Mise en application des compétences IA normalisées*.

- [x] **Skill React & Frontend (`dinum-react`)** :
  - Fichiers : [`.agents/skills/dinum-react/SKILL.md`](.agents/skills/dinum-react/SKILL.md) et [`.skills/dinum-react.md`](.skills/dinum-react.md)
  - Règles : TypeScript strict (0 `any`), React hooks, accessibilité RGAA v4.1 AA (100% clavier, contrastes $\ge 4.5:1$), Design System Cunningham & DSFR.
- [x] **Skill Python & Backend (`dinum-python`)** :
  - Fichiers : [`.agents/skills/dinum-python/SKILL.md`](.agents/skills/dinum-python/SKILL.md) et [`.skills/dinum-python.md`](.skills/dinum-python.md)
  - Règles : Ruff 88 caractères, Django $N+1$ prevention, validation anti-SSRF obligatoire, Circuit Breaker 3.5s, tests pytest avec isolation réseau.
- [x] **Routage et Instructions Impératives** :
  - [`AGENTS.md`](AGENTS.md) : Section *« 🏛️ 3. DINUM / La Suite Engineering Standards (Mandatory Skills) »* forçant la consultation avant toute modification.
  - [`.github/copilot-instructions.md`](.github/copilot-instructions.md) : Règle d'or de préséance et vérification systématique de `AGENTS.md`.

---

## 🛠️ 3. Commandes Développeur Unifiées

Le [`Makefile`](Makefile) expose les cibles normalisées pour exécuter le Quality Gate en local et en CI :

```bash
# Valider l'intégralité du Quality Gate (Builds, Vitest, Playwright, Pytest, Docs SSR)
make check

# Lancer les tests unitaires et d'intégration
make packages-test

# Compiler les packages TypeScript et le bundle de démo
make packages-build
make demo-build

# Compiler la documentation Zudoku (284 routes SSR)
make docs-build

# Vérifier le statut temps réel des déploiements Vercel
make vercel-status
```

---

## 🎯 4. Critères d'Acceptation & Quality Gate

Toute contribution est considérée comme **terminée et conforme** uniquement si :
1. ✅ `make check` s'exécute avec succès (100% des tests verts, 0 erreur de compilation, 0 régression SSR).
2. ✅ Le code respecte les frontières d'architecture documentées dans `ARCHITECTURE.md`.
3. ✅ Toute modification architecturale majeure fait l'objet d'un nouvel **ADR** dans `docs/adr/`.
4. ✅ Aucune régression d'accessibilité RGAA n'est introduite (testable via la suite Playwright).
