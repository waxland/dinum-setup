---
title: Guide de Dépannage & FAQ
description: Résolution pas à pas des erreurs fréquentes en environnement de développement local (Docker, bases de données, ports, SSH, disque).
---

# 🛠️ Guide de Dépannage & FAQ Système

Cette page regroupe les diagnostics rapides et les solutions aux erreurs les plus fréquemment rencontrées lors du bootstrap et du développement local sur La Suite numérique.

---

## 🛑 1. Problèmes Docker & BuildKit

### `the --mount option requires BuildKit`
- **Symptôme :** Échec lors du `make bootstrap` avec le message `the --mount option requires BuildKit`.
- **Cause :** Les `Dockerfile` de nos projets utilisent des caches de compilation modernes (`RUN --mount=type=cache...`) qui nécessitent le plugin `docker-buildx`.
- **Solution :**
  Exécutez le script d'installation qui configure automatiquement le dépôt officiel Docker et installe le plugin :
  ```bash
  make install
  ```
  Vérifiez ensuite la disponibilité avec `docker buildx version`.

---

### `docker: 'compose' is not a docker command`
- **Symptôme :** Échec des commandes Make appelant `docker compose`.
- **Cause :** Docker Compose v2 n'est pas installé ou seul l'ancien binaire v1 `docker-compose` est présent.
- **Solution :**
  ```bash
  make install
  ```
  Le Makefile de `dinum-setup` intègre également un fallback automatique vers `docker-compose` si `docker compose` n'est pas disponible.

---

### `Error response from daemon: network with name lasuite-network already exists`
- **Symptôme :** Avertissement lors du lancement de Docs ou Projects.
- **Cause :** Le réseau partagé `lasuite-network` a déjà été créé lors d'un lancement précédent.
- **Solution :**
  C'est un comportement normal et sans danger. La cible `make prepare-docker` capture déjà cette condition (`docker network create lasuite-network || true`).

---

## 💾 2. Espace Disque Saturé & Gestion des Caches

### `initdb: error: could not create directory "/var/lib/postgresql/data/...": No space left on device`
- **Symptôme :** Le conteneur PostgreSQL (`docs-postgresql` ou `docs-kc_postgresql`) s'arrête en erreur au démarrage.
- **Cause :** La partition racine `/` est saturée à 100% par des images Docker non utilisées ou un fichier swap surdimensionné.
- **Diagnostic :**
  ```bash
  df -h
  docker system df
  ```
- **Solutions :**
  1. **Purger les conteneurs, images orphelines et caches de build :**
     ```bash
     docker system prune -f
     docker builder prune -f
     ```
  2. **Nettoyer les paquets APT :**
     ```bash
     sudo apt-get clean
     ```
  3. **Vérifier / redimensionner le swap (sur Linux) :**
     ```bash
     # Réduire un swapfile trop lourd (ex: 8 Go -> 2 Go)
     sudo /sbin/swapoff -a
     sudo dd if=/dev/zero of=/swapfile bs=1M count=2048 status=progress
     sudo /sbin/mkswap /swapfile
     sudo /sbin/swapon /swapfile
     ```

---

## 🔌 3. Conflits de Ports Locaux

Si un service refuse de démarrer avec l'erreur `bind: address already in use` :

| Port | Service associé | Vérification du processus |
|---|---|---|
| **3000** | Frontend Docs / Zudoku Docs | `ss -tulpn \| grep :3000` |
| **8071** | API Django Docs & People | `ss -tulpn \| grep :8071` |
| **8000** | Projects Web App | `ss -tulpn \| grep :8000` |
| **8080 / 8083** | Keycloak SSO | `ss -tulpn \| grep :8080` |
| **9000 / 9001** | MinIO S3 API & Console | `ss -tulpn \| grep :9000` |
| **5432 / 15432 / 5433** | PostgreSQL instances | `ss -tulpn \| grep :5432` |
| **4444** | Serveur Collaboration Yjs | `ss -tulpn \| grep :4444` |

### Solution rapide :
1. Arrêtez les stacks actives : `make stop`
2. Si un conteneur orphelin persiste : `docker ps -a` puis `docker rm -f <nom_conteneur>`.

---

## 🔄 4. Réinitialisation Propre des Bases de Données

Si vous souhaitez réinitialiser l'état d'une base de données PostgreSQL locale (par exemple après des migrations corrompues ou des tests poussés) :

### Pour Docs :
```bash
cd src/docs
# Arrête les conteneurs et supprime les volumes anonymes associés
docker compose down -v
# Relance l'amorçage avec migrations automatiques et données de démo
make bootstrap FLUSH_ARGS='--no-input'
```

### Pour Projects :
```bash
cd src/projects
docker compose -f docker-compose-dev.yml down -v
docker compose -f docker-compose-dev.yml up -d
```

---

## 🔑 5. Clés SSH & Droits GitHub

### `WARNING: UNPROTECTED PRIVATE KEY FILE! Permissions 0440 are too open`
- **Solution :** Les permissions de la clé privée doivent être `0600` :
  ```bash
  chmod 600 ~/.ssh/id_ed25519*
  ```

### `Load key "...": error in libcrypto`
- **Solution :** Le fichier de clé privée doit impérativement se terminer par un saut de ligne (`\n`) après `-----END OPENSSH PRIVATE KEY-----` :
  ```bash
  echo "" >> ~/.ssh/id_ed25519_votre_clef
  ssh-keygen -y -f ~/.ssh/id_ed25519_votre_clef  # Valider que la clé est lisible
  ```

### `ERROR: Permission to organization/repo.git denied to userX`
- **Cause :** La clé SSH présentée est rattachée à l'utilisateur `userX` sur GitHub, qui ne dispose pas des droits d'écriture sur le dépôt cible.
- **Solution :** Inviter l'utilisateur sur le dépôt GitHub (*Settings > Collaborators > Add people*) ou configurer un alias dédié dans `~/.ssh/config`.
