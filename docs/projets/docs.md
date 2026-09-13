---
title: Docs
description: Documentation du projet Docs de La Suite numérique.
---

# Docs

**Docs** est l'outil collaboratif de gestion documentaire et de prise de notes de La Suite numérique.

- **Dépôt GitHub :** [suitenumerique/docs](https://github.com/suitenumerique/docs)
- **Stack technique :** Python / Django, PostgreSQL, Keycloak, React.

## Commandes dédiées

- **Cloner le projet :**
  ```bash
  REPOS="docs" make clone
  ```

- **Préparer l'environnement :**
  ```bash
  make env-docs
  ```
  Crée les fichiers `.local` dans `src/docs/env.d/development/`.

- **Initialiser le projet :**
  ```bash
  make bootstrap-docs
  ```

- **Lancer le serveur de développement :**
  ```bash
  make dev-docs
  ```

- **Consulter les logs :**
  ```bash
  make logs-docs
  ```
