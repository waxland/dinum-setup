---
title: Tests, Linters & Qualité
description: Guide des commandes de tests unitaires, linters, tests end-to-end et conventions de code pour La Suite numérique.
---

La fiabilité et la sécurité de **La Suite numérique** reposent sur une politique rigoureuse de tests automatisés (unitaires, intégration, bout-en-bout) et de vérification continue du style de code (_linting_).

---

## 🎯 1. Conventions Générales de Contribution

Avant de soumettre une Pull Request sur l'un des dépôts :

- 📝 **Conventional Commits** : Préfixez vos messages de commits selon la norme (`feat: ...`, `fix: ...`, `docs: ...`, `refactor: ...`, `test: ...`).
- 🧹 **Linting Propre** : Votre code ne doit produire aucune erreur ou avertissement de linter.
- ✅ **Tests Passants** : Toute nouvelle fonctionnalité ou correction de bug doit s'accompagner de ses tests automatisés.

---

## 🔬 2. Commandes de Tests & Linting par Projet

### A. Docs (`src/docs`)

Docs combine des tests backend Django (pytest), des tests frontend (Vitest) et des tests E2E (Playwright) :

```bash
cd src/docs

# 1. Linters & Vérifications de style
make lint                 # Lance tous les linters (Python + TypeScript + CSS)
make lint-backend         # Pylint & flake8 sur le code Django
make lint-frontend        # ESLint & Prettier sur Next.js

# 2. Tests Unitaires & Intégration
make test                 # Lance l'ensemble des suites de tests
make test-backend         # Tests unitaires Django / Pytest
make test-frontend        # Tests Vitest / React Testing Library

# 3. Tests End-to-End (E2E) avec Playwright
make bootstrap-e2e        # Construit les images Docker de test E2E
make e2e                  # Exécute la suite complète Playwright
```

---

### B. Projects (`src/projects`)

Projects utilise un monorepo client React / serveur Sails.js :

```bash
cd src/projects

# 1. Tests & Linters globaux
npm run lint              # Vérification ESLint client et serveur
npm test                  # Exécute les tests unitaires

# 2. Tests Frontend (client/)
cd client
npm test -- --watchAll=false  # Tests Jest / React Testing Library

# 3. Tests Backend (server/)
cd ../server
npm test                  # Tests Mocha / Chai de l'API REST
```

---

### C. Transfers (`src/transfers`)

Transfers teste les flux de téléversement multipart S3 et les tâches asynchrones :

```bash
cd src/transfers

# 1. Linters
make lint                 # Ruff / Flake8 / Prettier

# 2. Tests Backend Django & Celery
make test                 # Pytest avec base de données PostgreSQL de test
```

---

### D. People (`src/people`) & Accounts (`src/accounts`)

```bash
# Pour People
cd src/people
make lint                 # Linters Python & TypeScript
make test                 # Tests Django REST Framework

# Pour Accounts
cd src/accounts
make lint                 # Linters
make test                 # Tests unitaires Django
```

---

## ⚙️ 3. Intégration Continue (GitHub Actions)

Chaque dépôt upstream exécute automatiquement sur GitHub Actions :

1. **Validation du titre et des commits** (Gitlint / Semantic Pull Requests).
2. **Matrices de tests multi-versions** (Python 3.12 à 3.14, Node.js 20 à 22).
3. **Analyses de sécurité** (Snyk, Trivy et audits des dépendances npm/pip).
4. **Vérification du build des conteneurs Docker** multi-architectures (`amd64` / `arm64`).
