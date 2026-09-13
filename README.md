# DINUM / La Suite dev setup

Depot d'orchestration pour recuperer et lancer en local les projets de La Suite numerique.

Ce depot ne contient pas le code des applications. Le Makefile clone les projets dans `src/`, prepare les fichiers d'environnement connus, puis lance les projets deja cables.

## Lecture rapide

- **Onboarding & Démarrage :** [docs/01-onboarding/index.md](docs/01-onboarding/index.md)
  - [Services, URLs & Identifiants](docs/01-onboarding/urls-et-identifiants.md)
  - [Configuration Git & SSH](docs/01-onboarding/git-ssh.md)
  - [Environnement & Extensions VS Code](docs/01-onboarding/vscode.md)
  - [Workflow Makefile](docs/01-onboarding/workflow.md)
  - [Tests, Linters & Qualité](docs/01-onboarding/tests-et-qualite.md)
  - [Guide de Dépannage & FAQ](docs/01-onboarding/troubleshooting.md)
- **Architecture & Fonctionnement :** [docs/02-architecture/index.md](docs/02-architecture/index.md) (ou [TODO_ARCHITECTURE.md](TODO_ARCHITECTURE.md))
  - [Authentification OIDC & Keycloak](docs/02-architecture/auth.md)
  - [Stratégie de Hot Reload](docs/02-architecture/hot-reload.md)
  - [Variables et .env](docs/02-architecture/env.md)
  - [Gestion des Secrets (SOPS & age)](docs/02-architecture/secrets-sops.md)
- **Fiches Projets :** [docs/03-projets/index.md](docs/03-projets/index.md)
- **Design System & DSFR :** [docs/04-design-system/index.md](docs/04-design-system/index.md)
  - [Couleurs & Thèmes](docs/04-design-system/couleurs-et-themes.md)
  - [Typographie & Échelle](docs/04-design-system/typographie.md)
  - [Boutons & Actions](docs/04-design-system/boutons.md)
  - [Badges & Statuts](docs/04-design-system/badges-et-statuts.md)
  - [Alertes & Callouts](docs/04-design-system/alertes-et-callouts.md)
  - [Formulaires & Saisie](docs/04-design-system/formulaires.md)
  - [Cartes & Conteneurs](docs/04-design-system/cartes-et-conteneurs.md)
  - [Navigation & Layout](docs/04-design-system/navigation-et-layout.md)
  - [Icônes & Visuels](docs/04-design-system/icones.md)
  - [Accessibilité RGAA](docs/04-design-system/accessibilite-rgaa.md)
- **Ressources & Communauté :** [docs/05-ressources/roadmap.md](docs/05-ressources/roadmap.md)
  - [Salons Matrix & Contacts](docs/05-ressources/communaute.md)

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

| Projet    | Clone | Env local | Lancement dev | Notes                                 |
| --------- | ----: | --------: | ------------: | ------------------------------------- |
| Docs      |   Oui |       Oui |           Oui | Via le Makefile upstream              |
| Projects  |   Oui |       Oui |           Oui | Via `docker-compose-dev.yml`          |
| Meet      |   Oui |   Partiel |           Non | LiveKit/OIDC/domaines a clarifier     |
| Transfers |   Oui |       Non |           Non | Lire le README upstream avant cablage |
| People    |   Oui |       Non |           Non | Lire le README upstream avant cablage |
| Accounts  |   Oui |       Non |           Non | Lire le README upstream avant cablage |

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
