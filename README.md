# DINUM / La Suite dev setup

Depot d'orchestration pour recuperer et lancer en local les projets de La Suite numerique.

Ce depot ne contient pas le code des applications. Le Makefile clone les projets dans `src/`, prepare les fichiers d'environnement connus, puis lance les projets deja cables.

## Lecture rapide

- Onboarding Développeur : [docs/guide/onboarding.md](docs/guide/onboarding.md)
- Configuration Git & SSH : [docs/guide/git-ssh.md](docs/guide/git-ssh.md)
- Roadmaps & Ressources : [docs/guide/roadmap.md](docs/guide/roadmap.md)
- Documentation principale : [docs/guide/index.md](docs/guide/index.md)
- Workflow Makefile : [docs/guide/workflow.md](docs/guide/workflow.md)
- Authentification en dev : [docs/guide/auth.md](docs/guide/auth.md)
- Hot reload : [docs/guide/hot-reload.md](docs/guide/hot-reload.md)
- Variables et `.env` : [docs/guide/env.md](docs/guide/env.md)
- Etat de cablage des projets : [docs/guide/projects-status.md](docs/guide/projects-status.md)

## Commandes principales

Afficher l'aide :

```bash
make help
```

Installer les prérequis système (plugins Docker, etc.) :

```bash
make install # ou ./install.sh
```

Cloner les projets declares :

```bash
make clone
```

Cloner seulement certains projets :

```bash
REPOS="docs projects" make clone
```

Preparer les fichiers d'environnement locaux :

```bash
make env
```

Preparer les projets supportes :

```bash
make bootstrap
```

Lancer le mode dev :

```bash
make dev
```

Arreter les stacks connues :

```bash
make stop
```

## Ce qui est cable aujourd'hui

| Projet | Clone | Env local | Lancement dev | Notes |
|---|---:|---:|---:|---|
| Docs | Oui | Oui | Oui | Via le Makefile upstream |
| Projects | Oui | Oui | Oui | Via `docker-compose-dev.yml` |
| Meet | Oui | Partiel | Non | LiveKit/OIDC/domaines a clarifier |
| Transfers | Oui | Non | Non | Lire le README upstream avant cablage |
| People | Oui | Non | Non | Lire le README upstream avant cablage |
| Accounts | Oui | Non | Non | Lire le README upstream avant cablage |

## Point important sur le hot reload

Les changements dans `src/<projet>` sont visibles automatiquement seulement si le projet est lance en vrai mode developpement depuis ce code clone.

Ils ne seront pas visibles si le service lance uniquement une image Docker deja construite, sans monter le code local.

Details : [docs/hot-reload.md](docs/hot-reload.md)

## Point important sur l'authentification

Le chemin recommande en dev est d'utiliser Keycloak/OIDC avec des comptes de test, pas de supprimer l'authentification dans le code.

Details : [docs/auth.md](docs/auth.md)

## Documentation visuelle

Zudoku est installe pour afficher le dossier `docs/` sous forme de documentation navigable.

Generer la navigation automatique :

```bash
make generate-docs-nav
```

Lancer le serveur local :

```bash
make docs-dev
```

Construire la version statique :

```bash
make docs-build
```

Previsualiser le build statique :

```bash
make docs-preview
```

Les scripts npm equivalents sont `npm run docs:nav`, `npm run docs:dev`, `npm run docs:build` et `npm run docs:preview`.
