---
title: People (Annuaire)
description: Présentation détaillée, architecture, roadmap et démarrage local du projet People de La Suite numérique.
---

# 👥 People : Annuaire d'Équipes & Distribution des Rôles

**People** est le service d'annuaire, de gestion des équipes et de distribution des permissions et rôles à travers l'ensemble des applications de **La Suite numérique**.

- **Dépôt officiel :** [suitenumerique/people](https://github.com/suitenumerique/people)
- **Licence :** Open Source
- **Écosystème :** [lasuite.numerique.gouv.fr](https://lasuite.numerique.gouv.fr/)

---

## 🌟 Fonctionnalités Clés

- **Annuaire centralisé :** Gestion des profils utilisateurs, des coordonnées professionnelles et des organisations.
- **Gestion des Équipes & Collectifs :** Création d'équipes transverses et de groupes de travail.
- **Distribution des Rôles :** Attribution de droits d'accès partagés pour les autres applications de La Suite (Docs, Projects, Drive, etc.).
- **Interopérabilité :** Endpoints d'API pour la synchronisation avec les systèmes d'information RH et les protocoles d'annuaire.

---

## 🏗️ Architecture & Stack Technique

- **Backend API :** Python, Django, Django REST Framework (DRF).
- **Base de données :** PostgreSQL.
- **Conteneurisation :** Docker & Docker Compose.
- **Client TypeScript SDK (`src/people/src/tsclient`) :** Client SDK typé généré pour la consommation d'API dans les autres frontends.
- **Authentification :** OpenID Connect (Keycloak).

---

## 🗺️ Roadmap & Ressources

- 📋 **Suivi des issues & développements :** [suitenumerique/people/issues](https://github.com/suitenumerique/people/issues)
- 📖 **Spécifications d'interopérabilité :** Voir `src/people/docs/interoperability/`
- 💬 **Canal de discussion :** Salons interministériels La Suite / DINUM

---

## 🚀 Démarrage et Commandes Locales

```bash
# 1. Cloner le projet
REPOS="people" make clone

# 2. Initialiser la stack locale
cd src/people
make bootstrap

# 3. Créer un super-utilisateur d'administration
make superuser

# 4. Charger un jeu de données de démonstration (optionnel)
make demo

# 5. Lancer l'environnement de développement
make run-dev
```

### URLs et Accès Locaux

- **API & Interface :** [http://localhost:8071](http://localhost:8071)
- **Administration Django :** [http://localhost:8071/admin](http://localhost:8071/admin) (identifiants créés avec `make superuser` : `admin` / `admin`)
