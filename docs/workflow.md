---
title: Workflow Makefile
description: Guide des commandes disponibles dans le Makefile d'orchestration.
---

# Workflow Makefile

Le `Makefile` fournit une interface unifiée pour gérer l'ensemble des projets de La Suite en local.

## Structure des répertoires

Par défaut, les projets sont clonés dans `./src/` :

```text
dinum-setup/
├── Makefile
├── README.md
├── docs/             # Documentation Zudoku
└── src/              # Dépôts clonés (créé par `make clone`)
    ├── docs/
    ├── projects/
    ├── meet/
    ├── transfers/
    ├── people/
    └── accounts/
```

Vous pouvez surcharger le répertoire cible avec la variable `SRC_DIR` :

```bash
SRC_DIR=/opt/lasuite/src make clone
```

## Commandes principales

### 1. `make help`
Affiche le résumé de l'aide et les commandes disponibles.

### 2. `make clone`
Clone tous les dépôts déclarés dans la variable `REPOS` (par défaut : `docs projects meet transfers people accounts`).

Pour cloner uniquement certains dépôts :
```bash
REPOS="docs projects" make clone
```

### 3. `make pull`
Met à jour tous les dépôts déjà clonés en mode fast-forward (`git pull --ff-only`).

### 4. `make env`
Génère ou copie les fichiers `.env` et configurations nécessaires pour les services supportés.
Exécute séquentiellement : `env-docs`, `env-projects`, `env-meet`, etc.

### 5. `make bootstrap`
Exécute les étapes d'initialisation (migrations, création des super-utilisateurs ou données de test) sur les services supportés :
```bash
make bootstrap
```

### 6. `make dev`
Lance les projets supportés en mode développement (avec montage de volume et hot reload lorsque disponible).

### 7. `make stop`
Arrête proprement les stacks Docker Compose actives pour tous les dépôts.

### 8. `make status`
Affiche la liste des conteneurs Docker en cours d'exécution avec leurs ports associés.

### 9. `make logs-<projet>`
Permet de suivre en temps réel les logs d'un projet spécifique :
```bash
make logs-docs
make logs-projects
```

## Documentation locale (Zudoku)

- `make docs-dev` : Démarre le serveur de documentation en mode dev (`http://localhost:3001`).
- `make docs-build` : Compile le site de documentation statique dans le dossier `dist/`.
- `make docs-preview` : Prévisualise le build statique en local.
