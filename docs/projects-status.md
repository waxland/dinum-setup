---
title: État des projets
description: Tableau récapitulatif de l'état d'intégration des projets dans dinum-setup.
---

# État de câblage des projets

Ce tableau récapitule l'état d'intégration et le niveau de support actuel pour chaque dépôt de La Suite dans ce setup d'orchestration.

| Projet | Clone (`make clone`) | Env local (`make env`) | Lancement dev (`make dev`) | Notes & Mécanisme |
|---|:---:|:---:|:---:|---|
| **Docs** | ✅ Oui | ✅ Oui | ✅ Oui | Orchestré via le Makefile upstream (`make -C src/docs run`) |
| **Projects** | ✅ Oui | ✅ Oui | ✅ Oui | Orchestré via `docker-compose-dev.yml` |
| **Meet** | ✅ Oui | ⚠️ Partiel | ❌ Non | Prérequis LiveKit, OIDC et configuration de domaines à consolider |
| **Transfers** | ✅ Oui | ❌ Non | ❌ Non | Consulter le README upstream avant intégration |
| **People** | ✅ Oui | ❌ Non | ❌ Non | Consulter le README upstream avant intégration |
| **Accounts** | ✅ Oui | ❌ Non | ❌ Non | Consulter le README upstream avant intégration |

## Légende
- **✅ Oui** : Opération entièrement automatisée et testée dans le workflow principal.
- **⚠️ Partiel** : Ébauche de configuration disponible, nécessite une action manuelle complémentaire.
- **❌ Non** : Non automatisé à ce stade ; nécessite de suivre les instructions manuelles du dépôt d'origine.
