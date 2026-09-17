---
title: Orchestration & Dev Local
sidebar_label: La Suite Dev
description: Cloner, configurer les environnements .env, initialiser les bases de données PostgreSQL et lancer les conteneurs locaux.
---

Ce skill définit la procédure standardisée pour orchestrer et développer localement sur les microservices de La Suite numérique.

---

## 1. Quand l'utiliser

- Initialisation initiale du workspace (`make clone`, `make env`, `make bootstrap`, `make dev`).
- Dépannage d'un problème de port ou de conteneur Docker.
- Configuration des connexions PostgreSQL dans VS Code (SQLTools 1-clic).
- Ajout ou modification des cibles du `Makefile` racine.
- _Ne pas utiliser pour :_ éditer le contenu de la documentation Zudoku (utiliser [Skill Docs MDX](/07-skills/docs-mdx)).

---

## 2. Informations à lire

- `Makefile` à la racine et scripts d'installation.
- Fichiers d'environnement modèles : `.env.example` à la racine et dans chaque projet.
- Tableau des ports et des identifiants : [URLs & Identifiants](/01-onboarding/01-demarrage/urls-et-identifiants).
- Configuration VS Code : `.vscode/settings.json` et `.vscode/extensions.json`.

---

## 3. Procédure Pas à Pas

### Étape 1 : Vérifier les prérequis système

- Moteur de conteneurs : Docker Desktop, OrbStack ou Colima actif (`docker info`).
- Résolution DNS locale : s'assurer que `127.0.0.1 auth.local` est présent dans `/etc/hosts`.

### Étape 2 : Cloner les dépôts applicatifs

```bash
# Cloner l'ensemble des dépôts dans ./LaSuite/
make clone

# Ou cloner un sous-ensemble ciblé
REPOS="docs projects" make clone
```

### Étape 3 : Préparer les environnements `.env` sans écraser l'existant

- La cible `make env` copie les fichiers modèles (`.env.example` $\to$ `.env`) pour les projets supportés uniquement s'ils n'existent pas déjà.
- Ne jamais écraser une configuration locale personnalisée d'un développeur.

### Étape 4 : Initialiser les bases de données (Bootstrap)

- Exécuter `make bootstrap` pour construire les images, exécuter les migrations Django/Node et injecter les fixtures de test.
- Vérifier la séparation des ports PostgreSQL pour éviter les conflits :
  - **Docs (Impress) :** Port `15432` (`impress` / `password`)
  - **Keycloak SSO :** Port `5433` (`keycloak` / `password`)
  - **Projects :** Port `5432` (`postgres` / `postgres`)
  - **Transfers :** Port `5432` (`transfers` / `password`)
  - **People & Accounts :** Port `15432` / `5432`

### Étape 5 : Lancer et valider les services

- Lancer le mode développement : `make dev`.
- Vérifier la santé des conteneurs : `docker compose ps` ou via l'extension Docker de VS Code.
- Pour se connecter aux bases en 1 clic : ouvrir le panneau **SQLTools** dans VS Code (`mtxr.sqltools`).

---

## 4. Livrable & Vérification

- Services accessibles sur leurs URLs locales respectives (`http://localhost:3000`, `http://localhost:8000`, etc.).
- Aucune régression ni écrasement de fichier non commité.
- En cas d'anomalie, consigner le diagnostic dans `.sessions/RETOUR_EXEC_<SUJET>.md`.

---

## 5. Sources & Références

- **Guide Démarrage & URLs :** [URLs & Identifiants](/01-onboarding/01-demarrage/urls-et-identifiants)
- **Guide VS Code & SQLTools :** [Configuration VS Code](/01-onboarding/01-demarrage/vscode)
- **Dépôts officiels :** [https://github.com/suitenumerique](https://github.com/suitenumerique)
