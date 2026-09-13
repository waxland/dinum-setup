---
title: Onboarding Développeur
description: Guide d'accueil, prise en main rapide et bonnes pratiques pour contribuer à l'écosystème La Suite numérique.
---

# 🚀 Onboarding Développeur : Bienvenue sur La Suite !

Bienvenue dans l'écosystème de développement de **La Suite numérique** (DINUM / ANCT) !

Ce guide a pour objectif de vous accompagner pas à pas dès votre premier jour : comprendre la vision globale, configurer votre poste de travail, lancer votre premier projet et rejoindre les espaces de discussion de l'équipe.

---

## 🧭 Vision et Philosophie

**La Suite numérique** est une suite d'outils collaboratifs souverains, libres et sécurisés développée par la direction interministérielle du numérique (**DINUM**) et l'Agence Nationale de la Cohésion des Territoires (**ANCT**), destinée aux agents publics de l'État, des collectivités territoriales et aux organisations publiques.

### Nos principes fondamentaux :
- 🔓 **100% Open Source & Souverain** : Tout le code est public, auditable et hébergeable en autonomie (licences MIT, AGPL, etc.).
- 🌐 **Digital Public Goods (DPG)** : Conformité aux standards internationaux des biens publics numériques.
- ⚡ **Interopérabilité & SSO** : Authentification centralisée via OpenID Connect (Keycloak, ProConnect) et communication via des API standards.
- 🤝 **Collaboration temps réel** : Prise de notes, tableaux de bord et visio conçus pour le travail synchrone et asynchrone des équipes.

---

## 📋 Checklist du 1er Jour (Day-1 Setup)

Suivez ces 5 étapes pour avoir un environnement de développement opérationnel en quelques minutes :

### 1. Cloner ce dépôt d'orchestration
```bash
git clone https://github.com/suitenumerique/dinum-setup.git
cd dinum-setup
```

### 2. Installer les prérequis système
Ce script configure automatiquement les paquets de base, les dépôts Docker officiels, ainsi que les plugins Docker Compose v2 et Buildx nécessaires pour compiler les conteneurs :
```bash
make install
```
> 💡 Cette commande ajoute également l'entrée `127.0.0.1 auth.local` dans votre fichier `/etc/hosts`.

### 3. Cloner les dépôts applicatifs
Pour cloner l'ensemble des dépôts dans le dossier `./src` :
```bash
make clone
```
*Astuce : Pour ne cloner qu'un sous-ensemble (ex: Docs et Projects) :*
```bash
REPOS="docs projects" make clone
```

### 4. Préparer les environnements et amorcer les projets
Générez les fichiers d'environnement locaux et lancez le bootstrap initial (construction des images, migrations des bases de données et fixtures de test) :
```bash
make env
make bootstrap
```

### 5. Démarrer les services et la documentation locale
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
| **Docs** (Frontend) | Éditeur collaboratif temps réel | [http://localhost:3000](http://localhost:3000) | Compte de test local |
| **Docs** (API / Admin) | Backend Django & API | [http://localhost:8071/admin](http://localhost:8071/admin) | `admin` / `admin` |
| **Projects** | Tableaux Kanban & Tâches | [http://localhost:8000](http://localhost:8000) | Connexion OIDC |
| **Meet (Visio)** | Visioconférence WebRTC (LiveKit) | [http://localhost:3001](http://localhost:3001) | — |
| **Transfers** | Envoi sécurisé de gros fichiers | [http://localhost:8980](http://localhost:8980) | `agent@collectivite.fr` / `transferts` |
| **Transfers** (Keycloak) | SSO d'authentification OIDC | [http://localhost:8902](http://localhost:8902) | `admin` / `admin` |
| **Accounts** | Gestion centrale des comptes | [http://localhost:9900](http://localhost:9900) | `accounts` / `accounts` |
| **People** | Annuaire et profils | [http://localhost:8071](http://localhost:8071) | `admin` / `admin` |

---

## 💬 Canaux de Communication & Communauté

Les équipes de La Suite communiquent principalement via le réseau ouvert **Matrix** :

- 📝 **Docs (Salon officiel)** : [`#docs-official:matrix.org`](https://matrix.to/#/#docs-official:matrix.org)
- 📹 **Meet / Visio (Salon officiel)** : [`#meet-official:matrix.org`](https://matrix.to/#/#meet-official:matrix.org)
- 📊 **Projects (Salon officiel)** : [`#projects-official:matrix.org`](https://matrix.to/#/#projects-official:matrix.org)
- 🏛️ **Site institutionnel** : [lasuite.numerique.gouv.fr](https://lasuite.numerique.gouv.fr/)
- 📧 **Contacts généraux** : `docs@numerique.gouv.fr` • `visio@numerique.gouv.fr` • `contact@suite.anct.gouv.fr`

---

## 🛠️ Règles de Contribution & Bonnes Pratiques

Quand vous développez sur l'un des dépôts dans `src/` :

1. **Branchement Git :**
   - Créez toujours une branche dédiée depuis `main` (ex: `feat/mon-super-composant` ou `fix/erreur-migration`).
2. **Conventions de Commits :**
   - Utilisez les conventions *Conventional Commits* (`feat: ...`, `fix: ...`, `docs: ...`, `refactor: ...`).
3. **Tests et Linting :**
   - Exécutez les suites de tests et vérifications de style locales avant toute Pull Request (`make test`, `make lint` dans le dossier du projet).
4. **Accessibilité & Design System :**
   - Veillez au respect des normes d'accessibilité (RGAA) et à la cohérence avec le Design System de l'État (DSFR) et les composants UI partagés.
