---
title: Projects
description: Documentation du projet Projects de La Suite numérique.
---

# Projects

**Projects** est le gestionnaire de projets, tableaux kanban et suivi de tâches de La Suite numérique.

- **Dépôt GitHub :** [suitenumerique/projects](https://github.com/suitenumerique/projects)
- **Stack technique :** Node.js, TypeScript, React, PostgreSQL.

## Commandes dédiées

- **Cloner le projet :**
  ```bash
  REPOS="projects" make clone
  ```

- **Préparer l'environnement :**
  ```bash
  make env-projects
  ```
  Copie `src/projects/server/.env.sample` vers `.env` et rappelle l'entrée DNS `/etc/hosts`.

- **Lancer le serveur de développement :**
  ```bash
  make dev-projects
  ```
  Exécute `docker compose -f docker-compose-dev.yml up -d` dans `src/projects`.

- **Consulter les logs :**
  ```bash
  make logs-projects
  ```
