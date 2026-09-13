---
title: Matrice des Projets
description: Tableau récapitulatif de l'état d'intégration et du niveau de support de chaque projet dans dinum-setup.
---

Ce tableau récapitule l'état d'intégration et le niveau de support actuel pour chaque dépôt de La Suite dans ce setup d'orchestration.

| Projet                        | Dépôt GitHub                                                            | Clone (`make clone`) | Env local (`make env`) | Lancement dev (`make dev`) | Notes & Mécanisme                                           |
| ----------------------------- | ----------------------------------------------------------------------- | :------------------: | :--------------------: | :------------------------: | ----------------------------------------------------------- |
| **[Docs](docs.md)**           | [suitenumerique/docs](https://github.com/suitenumerique/docs)           |        ✅ Oui        |         ✅ Oui         |           ✅ Oui           | Orchestré via le Makefile upstream (`make -C src/docs run`) |
| **[Projects](projects.md)**   | [suitenumerique/projects](https://github.com/suitenumerique/projects)   |        ✅ Oui        |         ✅ Oui         |           ✅ Oui           | Orchestré via `docker-compose-dev.yml`                      |
| **[Meet / Visio](meet.md)**   | [suitenumerique/meet](https://github.com/suitenumerique/meet)           |        ✅ Oui        |       ⚠️ Partiel       |         ⚠️ Manuel          | Prérequis LiveKit, OIDC et configuration de domaines        |
| **[Transfers](transfers.md)** | [suitenumerique/transfers](https://github.com/suitenumerique/transfers) |        ✅ Oui        |      ✅ Autonome       |        ✅ Autonome         | Possède son propre `make bootstrap` dans `src/transfers`    |
| **[People](people.md)**       | [suitenumerique/people](https://github.com/suitenumerique/people)       |        ✅ Oui        |      ✅ Autonome       |        ✅ Autonome         | Possède son propre `make bootstrap` dans `src/people`       |
| **[Accounts](accounts.md)**   | [suitenumerique/accounts](https://github.com/suitenumerique/accounts)   |        ✅ Oui        |      ✅ Autonome       |        ✅ Autonome         | Possède son propre `make bootstrap` dans `src/accounts`     |

---

## 🧭 Fiches Détaillées des Applications

- **[📝 Docs](docs.md)** : Éditeur collaboratif temps réel (Yjs CRDT, Django, BlockNote).
- **[📊 Projects](projects.md)** : Gestionnaire de tâches et tableaux Kanban (Sails.js, Redux).
- **[📹 Meet / Visio](meet.md)** : Visioconférence souveraine (LiveKit SFU, WebRTC).
- **[📦 Transfers](transfers.md)** : Envoi et partage sécurisé de gros fichiers (S3 Multipart).
- **[👥 People](people.md)** : Annuaire d'équipes et distribution des rôles (TS Client SDK).
- **[🔐 Accounts](accounts.md)** : Gestion des comptes et identités (2FA/TOTP).
