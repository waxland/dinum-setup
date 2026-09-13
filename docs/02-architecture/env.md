---
title: Variables d'Environnement
description: Gestion des variables d'environnement (.env et .local) dans l'écosystème La Suite numérique.
---

# ⚙️ Variables d'Environnement & Secrets Locaux

Dans les projets de La Suite, la configuration applicative repose sur des fichiers d'environnement versionnés et des surcharges locales non versionnées.

---

## 🗂️ Convention des Fichiers `.local`

Dans la plupart des projets Django de La Suite (Docs, People, Accounts), la configuration se situe dans le dossier `env.d/development/` :
- `fichier` (ex: `common`, `postgresql`, `kc_auth`) : Contient les valeurs par défaut versionnées dans Git.
- `fichier.local` (ex: `common.local`, `postgresql.local`) : Fichier ignoré par Git permettant de surcharger localement des clés secrètes ou des ports sans modifier le dépôt partagé.

### Automatisation avec `make env`
La commande suivante crée automatiquement les fichiers `.local` nécessaires avec des clés secrètes générées :

```bash
make env
```

---

## 🔑 Variables Clés par Projet

### 1. Docs (`src/docs/env.d/development/`)
- `OIDC_STORE_REFRESH_TOKEN_KEY` : Clé de chiffrement des tokens de rafraîchissement OIDC (générée automatiquement).
- `DJANGO_CONFIGURATION=Development` : Active le mode de débogage et les barres d'outils de dev.

### 2. Projects (`src/projects/server/.env`)
- `SERVER_URL=http://localhost:8000` : URL d'accès publique du serveur.
- `OIDC_ISSUER_URL=http://auth.local:8080/realms/impress` : Fournisseur OIDC de référence.
- `DATABASE_URL=postgresql://...` : Connexion à la base de données PostgreSQL.
