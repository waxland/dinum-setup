---
title: Accueil
description: Documentation locale pour cloner, configurer et lancer les projets de La Suite numérique en développement.
---

Bienvenue sur la documentation d'orchestration locale des dépôts de **La Suite numérique** (DINUM).

Ce dépôt centralise les commandes et la configuration nécessaires pour cloner, initialiser et exécuter les différents services de La Suite sur un environnement de développement local.

## Objectif

Plutôt que d'avoir à configurer manuellement chaque projet individuellement, ce dépôt propose :
- Une arborescence centralisée dans `./src`
- Un `Makefile` avec des cibles standardisées (`clone`, `env`, `bootstrap`, `dev`, `stop`)
- Une gestion cohérente des variables d'environnement (`.env`)
- Des explications sur l'authentification partagée (OIDC / Keycloak) et le hot-reload

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Git** (version récente)
- **GNU Make**
- **Docker** et le plugin **Docker Compose**
- **Node.js** (v20+) pour la documentation locale

Vérifiez les prérequis avec :

```bash
make check-tools
```

## Démarrage rapide

1. **Cloner les projets supportés :**
   ```bash
   make clone
   ```

2. **Préparer les fichiers d'environnement :**
   ```bash
   make env
   ```

3. **Initialiser les dépendances et bases de données :**
   ```bash
   make bootstrap
   ```

4. **Lancer les services en développement :**
   ```bash
   make dev
   ```

5. **Arrêter les services :**
   ```bash
   make stop
   ```

## Sommaire de la documentation

### Guide & Onboarding
- [Onboarding Développeur](onboarding.md) : Prise en main pas à pas dès le premier jour
- [Configuration Git & SSH](git-ssh.md) : Configuration Git, génération de clés SSH et ajout sur GitHub
- [Roadmaps & Ressources](roadmap.md) : Feuilles de route, salons Matrix et liens officiels
- [Workflow Makefile](workflow.md) : Détail des commandes d'orchestration
- [Variables et .env](env.md) : Gestion des variables d'environnement
- [Authentification](auth.md) : Keycloak, OIDC et configuration locale
- [Hot reload](hot-reload.md) : Fonctionnement du rechargement à chaud
- [État des projets](projects-status.md) : Matrice de support des différents dépôts

### Projets & Applications
- [Docs](../projets/docs.md) : Éditeur de texte collaboratif temps réel
- [Projects](../projets/projects.md) : Gestion de projets, tableaux Kanban & tâches
- [Meet / Visio](../projets/meet.md) : Visioconférence haute performance (LiveKit)
- [Transfers](../projets/transfers.md) : Envoi et partage sécurisé de gros fichiers
- [People](../projets/people.md) : Annuaire d'équipes et distribution des rôles
- [Accounts](../projets/accounts.md) : Gestion d'identités et authentification SSO
