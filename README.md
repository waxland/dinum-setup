# DINUM / La Suite dev setup

Depot d'orchestration pour recuperer et lancer en local les projets de La Suite numerique.

Ce depot ne contient pas le code des applications. Le Makefile clone les projets dans `src/`, prepare les fichiers d'environnement connus, puis lance les projets deja cables.

## Lecture rapide

- **Onboarding & Démarrage :** [docs/01-onboarding/index.mdx](docs/01-onboarding/index.mdx)
  - [Challenge La Suite Numérique x 42](docs/01-onboarding/01-demarrage/challenge-42.mdx)
  - [Services, URLs & Identifiants](docs/01-onboarding/01-demarrage/urls-et-identifiants.mdx)
  - [Glossaire & Concepts Clés](docs/01-onboarding/03-support/glossaire.mdx)
  - [Configuration de la Machine Hôte](docs/01-onboarding/01-demarrage/environnement-machine-hote.mdx)
  - [Configuration Git & SSH](docs/01-onboarding/01-demarrage/git-ssh.mdx)
  - [Guide du Premier Commit](docs/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit.mdx)
  - [Sécurité du Poste Développeur](docs/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur.mdx)
  - [Environnement & Extensions VS Code](docs/01-onboarding/01-demarrage/vscode.mdx)
  - [Workflow Makefile](docs/01-onboarding/02-workflow-et-contribution/workflow.mdx)
  - [Tests, Linters & Qualité](docs/01-onboarding/02-workflow-et-contribution/tests-et-qualite.mdx)
  - [Guide de Dépannage & FAQ](docs/01-onboarding/03-support/troubleshooting.mdx)
- **Architecture & Fonctionnement :** [docs/02-architecture/index.mdx](docs/02-architecture/index.mdx)
  - [Fédération d'Identité & ProConnect](docs/02-architecture/01-securite-et-identite/federation-identite-proconnect.mdx)
  - [Collaboration Temps Réel & CRDT (Yjs)](docs/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt.mdx)
  - [Stockage d'Objets & Flux S3](docs/02-architecture/02-donnees-et-temps-reel/flux-stockage-s3.mdx)
  - [Intégration Continue (CI/CD GitHub Actions)](docs/02-architecture/03-devops-et-deploiement/cicd-github-actions.mdx)
  - [Déploiement en Production & Cloud Souverain](docs/02-architecture/03-devops-et-deploiement/deploiement-production.mdx)
  - [Sauvegardes & Plan de Continuité (PRA / PCA)](docs/02-architecture/02-donnees-et-temps-reel/sauvegardes-et-restauration.mdx)
  - [Authentification OIDC & Keycloak](docs/02-architecture/01-securite-et-identite/auth.mdx)
  - [Stratégie de Hot Reload](docs/02-architecture/03-devops-et-deploiement/hot-reload.mdx)
  - [Variables et .env](docs/02-architecture/03-devops-et-deploiement/env.mdx)
  - [Gestion des Secrets (SOPS & age)](docs/02-architecture/01-securite-et-identite/secrets-sops.mdx)
- **Fiches Projets :** [docs/03-projets/index.mdx](docs/03-projets/index.mdx)
  - [Docs](docs/03-projets/01-documents-et-contenus/docs.mdx) • [BlockNote](docs/03-projets/01-documents-et-contenus/blocknote.mdx) • [Docspec](docs/03-projets/01-documents-et-contenus/docspec.mdx) • [Fichiers & Drive](docs/03-projets/01-documents-et-contenus/fichiers-drive.mdx) • [Grist](docs/03-projets/01-documents-et-contenus/grist.mdx)
  - [Meet](docs/03-projets/02-communication-et-echange/meet.mdx) • [Tchap](docs/03-projets/02-communication-et-echange/tchap.mdx) • [Transfers](docs/03-projets/02-communication-et-echange/transfers.mdx)
  - [Projects](docs/03-projets/03-gestion-et-utilisateurs/projects.mdx) • [People](docs/03-projets/03-gestion-et-utilisateurs/people.mdx) • [Accounts](docs/03-projets/03-gestion-et-utilisateurs/accounts.mdx)
- **Design System & DSFR :** [docs/04-design-system/index.mdx](docs/04-design-system/index.mdx)
  - [Installation & Setup](docs/04-design-system/01-fondations/installation.mdx)
  - [Couleurs & Thèmes](docs/04-design-system/01-fondations/couleurs-et-themes.mdx)
  - [Typographie & Échelle](docs/04-design-system/01-fondations/typographie.mdx)
  - [Boutons & Actions](docs/04-design-system/02-composants/boutons.mdx)
  - [Badges & Statuts](docs/04-design-system/02-composants/badges-et-statuts.mdx)
  - [Alertes & Callouts](docs/04-design-system/02-composants/alertes-et-callouts.mdx)
  - [Modales & Boîtes de Dialogue](docs/04-design-system/02-composants/modales-et-dialogues.mdx)
  - [Tableaux de Données](docs/04-design-system/02-composants/tableaux.mdx)
  - [Pagination & Stepper](docs/04-design-system/02-composants/pagination-et-stepper.mdx)
  - [Notices & Bandeaux](docs/04-design-system/02-composants/notices-et-bandeaux.mdx)
  - [Formulaires & Saisie](docs/04-design-system/02-composants/formulaires.mdx)
  - [Cartes & Conteneurs](docs/04-design-system/02-composants/cartes-et-conteneurs.mdx)
  - [Navigation & Layout](docs/04-design-system/03-layout-et-structure/navigation-et-layout.mdx)
  - [Icônes & Visuels](docs/04-design-system/01-fondations/icones.mdx)
  - [Accessibilité RGAA](docs/04-design-system/01-fondations/accessibilite-rgaa.mdx)
- **Tutoriels & Recettes Pratiques :** [docs/06-tutoriels/index.mdx](docs/06-tutoriels/index.mdx)
  - [Ajouter la Commande /law dans BlockNote](docs/06-tutoriels/01-developpement-applicatif/commande-slash-blocknote-legifrance.mdx)
  - [Créer un Bloc dans Docs](docs/06-tutoriels/01-developpement-applicatif/creer-un-bloc-docs.mdx)
  - [Intégrer l'Authentification OIDC](docs/06-tutoriels/02-integration-et-tests/integrer-authentification-oidc.mdx)
  - [Écrire un Test E2E Playwright](docs/06-tutoriels/02-integration-et-tests/ecrire-un-test-e2e-playwright.mdx)
  - [Créer un Bot Tchap (Matrix)](docs/06-tutoriels/01-developpement-applicatif/creer-un-bot-tchap-matrix.mdx)
- **Ressources & Communauté :** [docs/05-ressources/roadmap.mdx](docs/05-ressources/roadmap.mdx)
  - [Salons Matrix & Contacts](docs/05-ressources/communaute.mdx)

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
