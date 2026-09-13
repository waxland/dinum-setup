---
title: Hot reload
description: Fonctionnement et contraintes du rechargement à chaud en développement local.
---

Le rechargement à chaud (*hot reload*) permet de voir immédiatement les modifications apportées au code source dans le navigateur sans devoir redémarrer manuellement les conteneurs Docker.

## Principe de fonctionnement

Les changements effectués dans `src/<projet>` sont pris en compte automatiquement **uniquement** si :
1. Le conteneur Docker monte le dossier local `src/<projet>` en tant que volume.
2. Le processus lancé dans le conteneur écoute les modifications de fichiers (ex: serveur Vite/Webpack pour le frontend, `runserver` ou `uvicorn --reload` pour le backend).

## Différence entre image pré-construite et mode dev

| Mode | Volume monté | Hot reload | Cas d'usage |
|---|---|---|---|
| **Image pré-construite** | ❌ Non | ❌ Non | Déploiement, test de release |
| **Mode Dev (`make dev`)** | ✅ Oui (`./src/<projet>`) | ✅ Oui | Développement actif |

Si vous constatez que vos modifications de code ne sont pas prises en compte :
- Vérifiez que le conteneur utilise bien la configuration `docker-compose-dev.yml` ou la cible Makefile appropriée.
- Assurez-vous que le répertoire est bien présent dans `src/<projet>`.
- Vérifiez les logs avec `make logs-<projet>`.
