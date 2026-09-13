---
title: Bienvenue & Démarrage Rapide
description: Guide d'accueil, prise en main pas à pas dès le premier jour et bonnes pratiques pour contribuer à l'écosystème La Suite numérique.
---

# 🚀 Onboarding Développeur : Bienvenue sur La Suite !

Bienvenue dans l'écosystème de développement de **La Suite numérique** (DINUM / ANCT) !

Ce guide a pour objectif de vous accompagner pas à pas dès votre premier jour : comprendre la vision globale, configurer votre poste de travail, lancer votre premier projet et rejoindre les espaces de discussion de l'équipe.

---

## 🧭 Vision et Philosophie

**La Suite numérique** est une suite d'outils collaboratifs souverains, libres et sécurisés développée par la Direction Interministérielle du Numérique (**DINUM**) et l'Agence Nationale de la Cohésion des Territoires (**ANCT**), destinée aux agents publics de l'État, des collectivités territoriales et aux organisations publiques.

### Nos principes fondamentaux :
- 🔓 **100% Open Source & Souverain** : Tout le code est public, auditable et hébergeable en autonomie (licences MIT, AGPL, etc.).
- 🌐 **Digital Public Goods (DPG)** : Conformité aux standards internationaux des biens publics numériques.
- ⚡ **Interopérabilité & SSO** : Authentification centralisée via OpenID Connect (Keycloak, ProConnect) et communication via des API standards.
- 🤝 **Collaboration temps réel** : Prise de notes, tableaux de bord et visio conçus pour le travail synchrone et asynchrone des équipes.

---

## � Prérequis Matériels & Système Recommandés

Faire tourner l'ensemble des stacks applicatives simultanément (Docs, Projects, Keycloak, PostgreSQL multiples, MinIO, Redis, Celery) nécessite des ressources suffisantes :

| Ressource | Configuration Minimale | Configuration Recommandée | Remarques |
|---|---|---|---|
| **CPU** | 2 cœurs (x86_64 ou ARM64) | 4 cœurs ou plus | Les compilations Docker Buildx et TypeScript tirent parti du multithreading. |
| **RAM** | 4 Go + 4 Go de Swap | **8 Go à 16 Go** | Keycloak (JVM Java) + Next.js + Django nécessitent au moins 3.5 Go de RAM active. |
| **Espace Disque** | 20 Go libres | **35 Go ou plus libres** | Les images Docker et volumes de données occupent environ 15 à 20 Go. |
| **OS** | Linux (Debian 12+, Ubuntu 22.04+), macOS, WSL2 | Linux Debian / Ubuntu | Support natif des bind-mounts Docker et performance I/O optimale. |

> 💡 **Conseil Espace Disque & Swap :** Si votre machine dispose de 4 Go de RAM, configurez un fichier de swap de 2 à 4 Go (`sudo swapon --show`). Pour purger l'espace Docker accumulé : `docker system prune -f`.

---

## �📋 Checklist du 1er Jour (Day-1 Setup)

Suivez ces étapes pour avoir un environnement de développement opérationnel en quelques minutes :

### Étape 0 : Configurer Git et votre clé SSH GitHub
Avant de cloner ou de pousser du code, assurez-vous que votre identité Git locale et votre clé SSH sont correctement configurées et ajoutées à votre compte GitHub :
👉 **[Consulter le tutoriel Configuration Git & SSH](git-ssh.md)**

### Étape 1 : Cloner ce dépôt d'orchestration
```bash
git clone https://github.com/suitenumerique/dinum-setup.git
cd dinum-setup
```

### Étape 2 : Installer les prérequis système
Ce script configure automatiquement les paquets de base, les dépôts Docker officiels, ainsi que les plugins Docker Compose v2 et Buildx nécessaires :
```bash
make install
```
> 💡 *Cette commande configure également l'entrée `127.0.0.1 auth.local` dans votre fichier `/etc/hosts`.*

### Étape 3 : Cloner les dépôts applicatifs
Pour cloner l'ensemble des dépôts dans le dossier `./src` :
```bash
make clone
```
*Astuce : Pour ne cloner qu'un sous-ensemble (ex: Docs et Projects) :*
```bash
REPOS="docs projects" make clone
```

### Étape 4 : Préparer les environnements et amorcer les projets
Générez les fichiers d'environnement locaux et lancez le bootstrap initial (construction des images, migrations des bases de données et fixtures de test) :
```bash
make env
make bootstrap
```

### Étape 5 : Démarrer les services et la documentation locale
```bash
# Lancer les applications en mode dev
make dev

# Dans un autre terminal, lancer le portail de documentation locale Zudoku
make docs-dev
```

Accédez ensuite à la documentation locale sur [http://localhost:3000](http://localhost:3000) et aux différents services selon les ports exposés ci-dessous.

---

## 🗺️ Cartographie des Services et Ports Locaux

| Service | Rôle | URL / Port Local | Identifiants par défaut |
|---|---|---|---|
| **Docs** (Frontend) | Éditeur collaboratif temps réel | [http://localhost:3000](http://localhost:3000) | `impress` / `impress` *(compte pré-créé)* |
| **Docs** (API / Admin) | Backend Django & API | [http://localhost:8071/admin](http://localhost:8071/admin) | `admin` / `admin` |
| **Projects** | Tableaux Kanban & Tâches | [http://localhost:8000](http://localhost:8000) | Connexion OIDC |
| **Meet (Visio)** | Visioconférence WebRTC (LiveKit) | [http://localhost:3001](http://localhost:3001) | — |
| **Transfers** | Envoi sécurisé de gros fichiers | [http://localhost:8980](http://localhost:8980) | `agent@collectivite.fr` / `transferts` |
| **Transfers** (Keycloak) | SSO d'authentification OIDC | [http://localhost:8902](http://localhost:8902) | `admin` / `admin` |
| **Accounts** | Gestion centrale des comptes | [http://localhost:9900](http://localhost:9900) | `accounts` / `accounts` |
| **People** | Annuaire et profils | [http://localhost:8071](http://localhost:8071) | `admin` / `admin` |

---

## 🧭 Parcours Recommandé

1. **[Configuration Git & Clés SSH](git-ssh.md)** : Initialiser votre profil Git et configurer vos accès SSH.
2. **[Workflow & Commandes Make](workflow.md)** : Découvrir toutes les cibles du `Makefile` et le cycle de vie de dev.
3. **[Tests, Linters & Qualité](tests-et-qualite.md)** : Exécuter les suites de tests unitaires, linters et tests E2E.
4. **[Guide de Dépannage & FAQ](troubleshooting.md)** : Diagnostiquer et résoudre les erreurs fréquentes (Docker, ports, BDD).
5. **[Architecture Globale](../02-architecture/index.md)** : Comprendre les flux, schémas Mermaid et choix techniques de l'écosystème.
6. **[Projets de La Suite](../03-projets/index.md)** : Explorer les fiches détaillées de chaque application.
