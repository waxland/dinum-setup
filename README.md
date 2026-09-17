# DINUM / La Suite dev setup

Depot d'orchestration pour recuperer et lancer en local les projets de La Suite numerique.

Ce depot est articule en 4 piliers : `documentation/`, `packages/`, `demo/` et `LaSuite/`. Le Makefile clone les projets applicatifs dans `LaSuite/`, prepare les fichiers d'environnement connus, puis lance les projets deja cables.

## Lecture rapide

- **Accueil & Challenge 42 :** [documentation/docs/00-accueil/index.mdx](documentation/docs/00-accueil/index.mdx)
  - [Challenge La Suite Numérique x 42](documentation/docs/00-accueil/challenge-42.mdx)
  - [Planning & Agenda du Hackathon](documentation/docs/00-accueil/planning.mdx)
- **Onboarding & Démarrage :** [documentation/docs/01-onboarding/index.mdx](documentation/docs/01-onboarding/index.mdx)
  - [Services, URLs & Identifiants](documentation/docs/01-onboarding/01-demarrage/urls-et-identifiants.mdx)
  - [Glossaire & Concepts Clés](documentation/docs/01-onboarding/03-support/glossaire.mdx)
  - [Configuration de la Machine Hôte](documentation/docs/01-onboarding/01-demarrage/environnement-machine-hote.mdx)
  - [Configuration Git & SSH](documentation/docs/01-onboarding/01-demarrage/git-ssh.mdx)
  - [Guide du Premier Commit](documentation/docs/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit.mdx)
  - [Sécurité du Poste Développeur](documentation/docs/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur.mdx)
  - [Environnement & Extensions VS Code](documentation/docs/01-onboarding/01-demarrage/vscode.mdx)
  - [Workflow Makefile](documentation/docs/01-onboarding/02-workflow-et-contribution/workflow.mdx)
  - [Tests, Linters & Qualité](documentation/docs/01-onboarding/02-workflow-et-contribution/tests-et-qualite.mdx)
  - [Guide de Dépannage & FAQ](documentation/docs/01-onboarding/03-support/troubleshooting.mdx)
- **Architecture & Fonctionnement :** [documentation/docs/02-architecture/index.mdx](documentation/docs/02-architecture/index.mdx)
  - [Fédération d'Identité & ProConnect](documentation/docs/02-architecture/01-securite-et-identite/federation-identite-proconnect.mdx)
  - [Collaboration Temps Réel & CRDT (Yjs)](documentation/docs/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt.mdx)
  - [Stockage d'Objets & Flux S3](documentation/docs/02-architecture/02-donnees-et-temps-reel/flux-stockage-s3.mdx)
  - [Intégration Continue (CI/CD GitHub Actions)](documentation/docs/02-architecture/03-devops-et-deploiement/cicd-github-actions.mdx)
  - [Déploiement en Production & Cloud Souverain](documentation/docs/02-architecture/03-devops-et-deploiement/deploiement-production.mdx)
  - [Sauvegardes & Plan de Continuité (PRA / PCA)](documentation/docs/02-architecture/02-donnees-et-temps-reel/sauvegardes-et-restauration.mdx)
  - [Authentification OIDC & Keycloak](documentation/docs/02-architecture/01-securite-et-identite/auth.mdx)
  - [Stratégie de Hot Reload](documentation/docs/02-architecture/03-devops-et-deploiement/hot-reload.mdx)
  - [Variables et .env](documentation/docs/02-architecture/03-devops-et-deploiement/env.mdx)
  - [Gestion des Secrets (SOPS & age)](documentation/docs/02-architecture/01-securite-et-identite/secrets-sops.mdx)
- **Fiches Projets :** [documentation/docs/03-projets/index.mdx](documentation/docs/03-projets/index.mdx)
  - [Docs](documentation/docs/03-projets/01-documents-et-contenus/docs.mdx) • [Fichiers & Drive](documentation/docs/03-projets/01-documents-et-contenus/fichiers-drive.mdx) • [Grist](documentation/docs/03-projets/01-documents-et-contenus/grist.mdx)
  - [Meet](documentation/docs/03-projets/02-communication-et-echange/meet.mdx) • [Tchap](documentation/docs/03-projets/02-communication-et-echange/tchap.mdx) • [Transfers](documentation/docs/03-projets/02-communication-et-echange/transfers.mdx)
  - [Projects](documentation/docs/03-projets/03-gestion-et-utilisateurs/projects.mdx) • [People](documentation/docs/03-projets/03-gestion-et-utilisateurs/people.mdx) • [Accounts](documentation/docs/03-projets/03-gestion-et-utilisateurs/accounts.mdx)
- **Design System & DSFR :** [documentation/docs/04-design-system/index.mdx](documentation/docs/04-design-system/index.mdx)
  - [Installation & Setup](documentation/docs/04-design-system/01-fondations/installation.mdx)
  - [Figma & UI Kit La Suite](documentation/docs/04-design-system/01-fondations/figma.mdx)
  - [Couleurs & Thèmes](documentation/docs/04-design-system/01-fondations/couleurs-et-themes.mdx)
  - [Typographie & Échelle](documentation/docs/04-design-system/01-fondations/typographie.mdx)
  - [Boutons & Actions](documentation/docs/04-design-system/02-composants/boutons.mdx)
  - [Badges & Statuts](documentation/docs/04-design-system/02-composants/badges-et-statuts.mdx)
  - [Alertes & Callouts](documentation/docs/04-design-system/02-composants/alertes-et-callouts.mdx)
  - [Modales & Boîtes de Dialogue](documentation/docs/04-design-system/02-composants/modales-et-dialogues.mdx)
  - [Tableaux de Données](documentation/docs/04-design-system/02-composants/tableaux.mdx)
  - [Pagination & Stepper](documentation/docs/04-design-system/02-composants/pagination-et-stepper.mdx)
  - [Notices & Bandeaux](documentation/docs/04-design-system/02-composants/notices-et-bandeaux.mdx)
  - [Formulaires & Saisie](documentation/docs/04-design-system/02-composants/formulaires.mdx)
  - [Cartes & Conteneurs](documentation/docs/04-design-system/02-composants/cartes-et-conteneurs.mdx)
  - [Navigation & Layout](documentation/docs/04-design-system/03-layout-et-structure/navigation-et-layout.mdx)
  - [Icônes & Visuels](documentation/docs/04-design-system/01-fondations/icones.mdx)
  - [Accessibilité RGAA](documentation/docs/04-design-system/01-fondations/accessibilite-rgaa.mdx)
- **Skills d'Agent & Ingénierie :** [documentation/docs/07-skills/index.mdx](documentation/docs/07-skills/index.mdx)
  - [DSFR](documentation/docs/07-skills/dsfr.mdx) • [RGAA Review](documentation/docs/07-skills/rgaa-review.mdx) • [La Suite Dev](documentation/docs/07-skills/lasuite-dev.mdx)
  - [Docs MDX](documentation/docs/07-skills/docs-mdx.mdx) • [Code Review](documentation/docs/07-skills/code-review.mdx) • [Architecture Review](documentation/docs/07-skills/architecture-review.mdx) • [Design Change](documentation/docs/07-skills/design-change.mdx)
- **Ressources & Communauté :** [documentation/docs/05-ressources/roadmap.mdx](documentation/docs/05-ressources/roadmap.mdx)
  - [Templates & Outils Réutilisables](documentation/docs/05-ressources/templates-et-outils.mdx)
  - [Salons Matrix & Contacts](documentation/docs/05-ressources/communaute.mdx)

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
