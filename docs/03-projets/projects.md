---
title: Projects (Kanban)
description: Présentation détaillée, architecture, roadmap et démarrage local du projet Projects de La Suite numérique.
---

# 📊 Projects : Gestion de Projets & Tableaux Kanban

**Projects** est l'outil de gestion de tâches et de pilotage de projets agile de **La Suite numérique**, offrant une alternative souveraine aux plateformes comme *Trello* ou *Jira*.

- **Dépôt officiel :** [suitenumerique/projects](https://github.com/suitenumerique/projects)
- **Licence :** AGPL-3.0
- **Canal Matrix :** [`#projects-official:matrix.org`](https://matrix.to/#/#projects-official:matrix.org)
- **Contact :** `contact@suite.anct.gouv.fr`

---

## 🌟 Fonctionnalités Clés

- **Tableaux Kanban & Listes :** Création intuitive de projets, tableaux, listes et cartes de tâches.
- **Détails & Enrichissement :** Descriptions en Markdown, dates d'échéance, pièces jointes, suivi du temps passé et étiquettes personnalisables.
- **Collaboration Synchrone :** Mises à jour en direct (WebSockets via Socket.io) répercutées instantanément sur tous les écrans.
- **Filtres Avancés :** Recherche et filtrage par membre assigné, date, étiquette ou mot-clé.
- **Centre de Notifications :** Alertes internes pour les assignations et modifications de cartes.
- **Internationalisation :** Support multilingue natif (Français, Anglais...).

---

## 🏗️ Architecture & Stack Technique

- **Frontend :** React 18, TypeScript, Redux, Redux-Saga, composants UI Cunningham.
- **Backend / Serveur :** Node.js 22, Sails.js (MVC), Socket.io.
- **Base de données :** PostgreSQL (migrations Knex.js).
- **Stockage d'objets :** Compatible S3 (MinIO en dev / Scaleway / AWS en prod).
- **Authentification :** OpenID Connect (Keycloak).

---

## 🗺️ Roadmap & Ressources

- 📋 **Milestones & Backlog GitHub :** [suitenumerique/projects/milestones](https://github.com/suitenumerique/projects/milestones)
- 🐛 **Issues & Discussions :** [suitenumerique/projects/issues](https://github.com/suitenumerique/projects/issues)
- 💬 **Rejoindre le salon Matrix :** [`#projects-official:matrix.org`](https://matrix.to/#/#projects-official:matrix.org)
- 📝 **Variables d'environnement :** Consultez `src/projects/ENVIRONMENT_VARIABLES.md`

---

## 🚀 Démarrage et Commandes Locales

### Commandes Makefile

```bash
# 1. Cloner le projet
REPOS="projects" make clone

# 2. Préparer le fichier .env local
make env-projects

# 3. Lancer la stack en mode dev
make dev-projects

# 4. Consulter les logs de l'application
make logs-projects
```

### URLs et Configuration DNS

- **Application Web :** [http://localhost:8000](http://localhost:8000)
- **Résolution DNS requise :** Assurez-vous d'avoir la ligne suivante dans `/etc/hosts` :
  ```text
  127.0.0.1 auth.local
  ```
