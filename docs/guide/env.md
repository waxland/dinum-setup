---
title: Variables et .env
description: Gestion des variables d'environnement et fichiers locaux.
---

Chaque service de La Suite utilise ses propres fichiers d'environnement pour configurer les connexions aux bases de données, aux serveurs d'authentification et aux services tiers.

## Préparation automatique : `make env`

La cible `make env` du `Makefile` orchestre la création des fichiers d'environnement minimaux pour le développement local.

### Docs (`src/docs`)
Docs s'appuie sur une arborescence de fichiers de configuration dans `env.d/development/`.
La commande `make env-docs` initialise :
- `crowdin.local`
- `common.local`
- `postgresql.local`
- `kc_auth.local`
- `kc_postgresql.local`

### Projects (`src/projects`)
Projects utilise un fichier `.env` au niveau du serveur.
La commande `make env-projects` :
1. Copie `server/.env.sample` vers `server/.env` s'il n'existe pas encore.
2. Rappelle d'ajouter l'entrée DNS locale suivante dans `/etc/hosts` si nécessaire :
   ```text
   127.0.0.1 auth.local
   ```

### Autres projets (Meet, Transfers, People, Accounts)
Pour les projets dont le mode dev automatisé est en cours de consolidation :
- Consultez le fichier `README.md` dans le dépôt cloné sous `src/<projet>`.
- Vérifiez les `.env.sample` ou `.env.example` fournis en amont.

## Bonnes pratiques

- Ne commitez jamais de secrets ou de tokens de production dans vos fichiers locaux.
- Conservez les valeurs par défaut proposées par les fichiers `.env.sample` pour assurer l'interopérabilité entre services en local.
