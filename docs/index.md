---
title: Accueil
description: Documentation locale pour cloner, configurer et lancer les projets de La Suite numérique en développement.
---

# DINUM / La Suite dev setup

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

### Guide
- [Workflow Makefile](workflow.md) : Détail des commandes disponibles
- [Variables et .env](env.md) : Gestion des variables d'environnement
- [Authentification](auth.md) : Keycloak, OIDC et configuration locale
- [Hot reload](hot-reload.md) : Fonctionnement du rechargement à chaud
- [État des projets](projects-status.md) : Matrice de support des différents dépôts
- [DSFR officiel](dsfr.md) : Intégration du Système de Design de l'État

### Projets
- [Docs](docs.md) : Gestion documentaire et partage
- [Projects](projects.md) : Gestion de projets et tâches
- [Meet](meet.md) : Visioconférence (LiveKit)
- [Transfers](transfers.md) : Transfert de fichiers
- [People](people.md) : Annuaire et gestion des profils
- [Accounts](accounts.md) : Gestion des comptes et identités
