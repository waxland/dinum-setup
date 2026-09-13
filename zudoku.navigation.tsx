import type { ZudokuConfig } from "zudoku";

export const docsNavigation: ZudokuConfig["navigation"] = [
  {
    "type": "category",
    "label": "Onboarding",
    "icon": "compass",
    "collapsed": false,
    "items": [
      "/01-onboarding/index",
      {
        "type": "category",
        "label": "Demarrage",
        "icon": "rocket",
        "collapsed": false,
        "items": [
          "/01-onboarding/01-demarrage/challenge-42",
          "/01-onboarding/01-demarrage/environnement-machine-hote",
          "/01-onboarding/01-demarrage/git-ssh",
          "/01-onboarding/01-demarrage/urls-et-identifiants",
          "/01-onboarding/01-demarrage/vscode"
        ]
      },
      {
        "type": "category",
        "label": "Workflow Et Contribution",
        "icon": "git-pull-request",
        "collapsed": false,
        "items": [
          "/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit",
          "/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur",
          "/01-onboarding/02-workflow-et-contribution/tests-et-qualite",
          "/01-onboarding/02-workflow-et-contribution/workflow"
        ]
      },
      {
        "type": "category",
        "label": "Support",
        "icon": "life-buoy",
        "collapsed": false,
        "items": [
          "/01-onboarding/03-support/glossaire",
          "/01-onboarding/03-support/troubleshooting"
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Architecture",
    "icon": "layers",
    "collapsed": false,
    "items": [
      "/02-architecture/index",
      {
        "type": "category",
        "label": "Securite Et Identite",
        "icon": "shield-check",
        "collapsed": false,
        "items": [
          "/02-architecture/01-securite-et-identite/auth",
          "/02-architecture/01-securite-et-identite/federation-identite-proconnect",
          "/02-architecture/01-securite-et-identite/secrets-sops"
        ]
      },
      {
        "type": "category",
        "label": "Donnees Et Temps Reel",
        "icon": "database",
        "collapsed": false,
        "items": [
          "/02-architecture/02-donnees-et-temps-reel/flux-stockage-s3",
          "/02-architecture/02-donnees-et-temps-reel/sauvegardes-et-restauration",
          "/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt"
        ]
      },
      {
        "type": "category",
        "label": "Devops Et Deploiement",
        "icon": "cloud",
        "collapsed": false,
        "items": [
          "/02-architecture/03-devops-et-deploiement/cicd-github-actions",
          "/02-architecture/03-devops-et-deploiement/deploiement-production",
          "/02-architecture/03-devops-et-deploiement/env",
          "/02-architecture/03-devops-et-deploiement/hot-reload"
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Projets",
    "icon": "boxes",
    "collapsed": false,
    "items": [
      "/03-projets/index",
      {
        "type": "category",
        "label": "Documents Et Contenus",
        "icon": "file-text",
        "collapsed": false,
        "items": [
          "/03-projets/01-documents-et-contenus/blocknote",
          "/03-projets/01-documents-et-contenus/docs",
          "/03-projets/01-documents-et-contenus/docspec",
          "/03-projets/01-documents-et-contenus/fichiers-drive",
          "/03-projets/01-documents-et-contenus/grist"
        ]
      },
      {
        "type": "category",
        "label": "Communication Et Echange",
        "icon": "message-square",
        "collapsed": false,
        "items": [
          "/03-projets/02-communication-et-echange/meet",
          "/03-projets/02-communication-et-echange/tchap",
          "/03-projets/02-communication-et-echange/transfers"
        ]
      },
      {
        "type": "category",
        "label": "Gestion Et Utilisateurs",
        "icon": "users",
        "collapsed": false,
        "items": [
          "/03-projets/03-gestion-et-utilisateurs/accounts",
          "/03-projets/03-gestion-et-utilisateurs/people",
          "/03-projets/03-gestion-et-utilisateurs/projects"
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Design System",
    "icon": "palette",
    "collapsed": false,
    "items": [
      "/04-design-system/index",
      {
        "type": "category",
        "label": "Fondations",
        "icon": "sliders",
        "collapsed": false,
        "items": [
          "/04-design-system/01-fondations/accessibilite-rgaa",
          "/04-design-system/01-fondations/couleurs-et-themes",
          "/04-design-system/01-fondations/icones",
          "/04-design-system/01-fondations/installation",
          "/04-design-system/01-fondations/typographie"
        ]
      },
      {
        "type": "category",
        "label": "Composants",
        "icon": "box",
        "collapsed": false,
        "items": [
          "/04-design-system/02-composants/alertes-et-callouts",
          "/04-design-system/02-composants/badges-et-statuts",
          "/04-design-system/02-composants/boutons",
          "/04-design-system/02-composants/cartes-et-conteneurs",
          "/04-design-system/02-composants/formulaires",
          "/04-design-system/02-composants/modales-et-dialogues",
          "/04-design-system/02-composants/notices-et-bandeaux",
          "/04-design-system/02-composants/pagination-et-stepper",
          "/04-design-system/02-composants/tableaux"
        ]
      },
      {
        "type": "category",
        "label": "Layout Et Structure",
        "icon": "layout-grid",
        "collapsed": false,
        "items": [
          "/04-design-system/03-layout-et-structure/navigation-et-layout"
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Ressources",
    "icon": "map",
    "collapsed": false,
    "items": [
      "/05-ressources/communaute",
      "/05-ressources/roadmap"
    ]
  },
  {
    "type": "category",
    "label": "Tutoriels",
    "icon": "sparkles",
    "collapsed": false,
    "items": [
      "/06-tutoriels/index",
      {
        "type": "category",
        "label": "Developpement Applicatif",
        "icon": "code",
        "collapsed": false,
        "items": [
          "/06-tutoriels/01-developpement-applicatif/commande-slash-blocknote-legifrance",
          "/06-tutoriels/01-developpement-applicatif/creer-un-bloc-docs",
          "/06-tutoriels/01-developpement-applicatif/creer-un-bot-tchap-matrix"
        ]
      },
      {
        "type": "category",
        "label": "Integration Et Tests",
        "icon": "check-circle",
        "collapsed": false,
        "items": [
          "/06-tutoriels/02-integration-et-tests/ecrire-un-test-e2e-playwright",
          "/06-tutoriels/02-integration-et-tests/integrer-authentification-oidc"
        ]
      }
    ]
  }
];

export const docsRedirects: ZudokuConfig["redirects"] = [
  {
    "from": "/",
    "to": "/01-onboarding/index"
  },
  {
    "from": "/01-onboarding",
    "to": "/01-onboarding/index"
  },
  {
    "from": "/02-architecture",
    "to": "/02-architecture/index"
  },
  {
    "from": "/03-projets",
    "to": "/03-projets/index"
  },
  {
    "from": "/04-design-system",
    "to": "/04-design-system/index"
  },
  {
    "from": "/05-ressources",
    "to": "/05-ressources/communaute"
  },
  {
    "from": "/06-tutoriels",
    "to": "/06-tutoriels/index"
  },
  {
    "from": "/onboarding",
    "to": "/01-onboarding/index"
  },
  {
    "from": "/architecture",
    "to": "/02-architecture/index"
  },
  {
    "from": "/projets",
    "to": "/03-projets/index"
  },
  {
    "from": "/design-system",
    "to": "/04-design-system/index"
  },
  {
    "from": "/dsfr",
    "to": "/04-design-system/index"
  },
  {
    "from": "/ressources",
    "to": "/05-ressources/communaute"
  },
  {
    "from": "/tutoriels",
    "to": "/06-tutoriels/index"
  },
  {
    "from": "/guide",
    "to": "/01-onboarding/index"
  },
  {
    "from": "/01-onboarding/environnement-machine-hote",
    "to": "/01-onboarding/01-demarrage/environnement-machine-hote"
  },
  {
    "from": "/01-onboarding/git-ssh",
    "to": "/01-onboarding/01-demarrage/git-ssh"
  },
  {
    "from": "/01-onboarding/vscode",
    "to": "/01-onboarding/01-demarrage/vscode"
  },
  {
    "from": "/01-onboarding/urls-et-identifiants",
    "to": "/01-onboarding/01-demarrage/urls-et-identifiants"
  },
  {
    "from": "/01-onboarding/workflow",
    "to": "/01-onboarding/02-workflow-et-contribution/workflow"
  },
  {
    "from": "/01-onboarding/guide-du-premier-commit",
    "to": "/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit"
  },
  {
    "from": "/01-onboarding/tests-et-qualite",
    "to": "/01-onboarding/02-workflow-et-contribution/tests-et-qualite"
  },
  {
    "from": "/01-onboarding/securite-du-poste-developpeur",
    "to": "/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur"
  },
  {
    "from": "/01-onboarding/glossaire",
    "to": "/01-onboarding/03-support/glossaire"
  },
  {
    "from": "/01-onboarding/troubleshooting",
    "to": "/01-onboarding/03-support/troubleshooting"
  },
  {
    "from": "/02-architecture/auth",
    "to": "/02-architecture/01-securite-et-identite/auth"
  },
  {
    "from": "/02-architecture/federation-identite-proconnect",
    "to": "/02-architecture/01-securite-et-identite/federation-identite-proconnect"
  },
  {
    "from": "/02-architecture/secrets-sops",
    "to": "/02-architecture/01-securite-et-identite/secrets-sops"
  },
  {
    "from": "/02-architecture/temps-reel-et-crdt",
    "to": "/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt"
  },
  {
    "from": "/02-architecture/flux-stockage-s3",
    "to": "/02-architecture/02-donnees-et-temps-reel/flux-stockage-s3"
  },
  {
    "from": "/02-architecture/sauvegardes-et-restauration",
    "to": "/02-architecture/02-donnees-et-temps-reel/sauvegardes-et-restauration"
  },
  {
    "from": "/02-architecture/env",
    "to": "/02-architecture/03-devops-et-deploiement/env"
  },
  {
    "from": "/02-architecture/hot-reload",
    "to": "/02-architecture/03-devops-et-deploiement/hot-reload"
  },
  {
    "from": "/02-architecture/cicd-github-actions",
    "to": "/02-architecture/03-devops-et-deploiement/cicd-github-actions"
  },
  {
    "from": "/02-architecture/deploiement-production",
    "to": "/02-architecture/03-devops-et-deploiement/deploiement-production"
  },
  {
    "from": "/03-projets/docs",
    "to": "/03-projets/01-documents-et-contenus/docs"
  },
  {
    "from": "/03-projets/blocknote",
    "to": "/03-projets/01-documents-et-contenus/blocknote"
  },
  {
    "from": "/03-projets/docspec",
    "to": "/03-projets/01-documents-et-contenus/docspec"
  },
  {
    "from": "/03-projets/fichiers-drive",
    "to": "/03-projets/01-documents-et-contenus/fichiers-drive"
  },
  {
    "from": "/03-projets/grist",
    "to": "/03-projets/01-documents-et-contenus/grist"
  },
  {
    "from": "/03-projets/meet",
    "to": "/03-projets/02-communication-et-echange/meet"
  },
  {
    "from": "/03-projets/tchap",
    "to": "/03-projets/02-communication-et-echange/tchap"
  },
  {
    "from": "/03-projets/transfers",
    "to": "/03-projets/02-communication-et-echange/transfers"
  },
  {
    "from": "/03-projets/projects",
    "to": "/03-projets/03-gestion-et-utilisateurs/projects"
  },
  {
    "from": "/03-projets/people",
    "to": "/03-projets/03-gestion-et-utilisateurs/people"
  },
  {
    "from": "/03-projets/accounts",
    "to": "/03-projets/03-gestion-et-utilisateurs/accounts"
  },
  {
    "from": "/04-design-system/installation",
    "to": "/04-design-system/01-fondations/installation"
  },
  {
    "from": "/04-design-system/couleurs-et-themes",
    "to": "/04-design-system/01-fondations/couleurs-et-themes"
  },
  {
    "from": "/04-design-system/typographie",
    "to": "/04-design-system/01-fondations/typographie"
  },
  {
    "from": "/04-design-system/icones",
    "to": "/04-design-system/01-fondations/icones"
  },
  {
    "from": "/04-design-system/accessibilite-rgaa",
    "to": "/04-design-system/01-fondations/accessibilite-rgaa"
  },
  {
    "from": "/04-design-system/boutons",
    "to": "/04-design-system/02-composants/boutons"
  },
  {
    "from": "/04-design-system/badges-et-statuts",
    "to": "/04-design-system/02-composants/badges-et-statuts"
  },
  {
    "from": "/04-design-system/alertes-et-callouts",
    "to": "/04-design-system/02-composants/alertes-et-callouts"
  },
  {
    "from": "/04-design-system/modales-et-dialogues",
    "to": "/04-design-system/02-composants/modales-et-dialogues"
  },
  {
    "from": "/04-design-system/notices-et-bandeaux",
    "to": "/04-design-system/02-composants/notices-et-bandeaux"
  },
  {
    "from": "/04-design-system/tableaux",
    "to": "/04-design-system/02-composants/tableaux"
  },
  {
    "from": "/04-design-system/formulaires",
    "to": "/04-design-system/02-composants/formulaires"
  },
  {
    "from": "/04-design-system/cartes-et-conteneurs",
    "to": "/04-design-system/02-composants/cartes-et-conteneurs"
  },
  {
    "from": "/04-design-system/pagination-et-stepper",
    "to": "/04-design-system/02-composants/pagination-et-stepper"
  },
  {
    "from": "/04-design-system/navigation-et-layout",
    "to": "/04-design-system/03-layout-et-structure/navigation-et-layout"
  },
  {
    "from": "/06-tutoriels/creer-un-bloc-docs",
    "to": "/06-tutoriels/01-developpement-applicatif/creer-un-bloc-docs"
  },
  {
    "from": "/06-tutoriels/creer-un-bot-tchap-matrix",
    "to": "/06-tutoriels/01-developpement-applicatif/creer-un-bot-tchap-matrix"
  },
  {
    "from": "/06-tutoriels/integrer-authentification-oidc",
    "to": "/06-tutoriels/02-integration-et-tests/integrer-authentification-oidc"
  },
  {
    "from": "/06-tutoriels/ecrire-un-test-e2e-playwright",
    "to": "/06-tutoriels/02-integration-et-tests/ecrire-un-test-e2e-playwright"
  },
  {
    "from": "/04-ressources",
    "to": "/05-ressources/communaute"
  },
  {
    "from": "/04-ressources/communaute",
    "to": "/05-ressources/communaute"
  },
  {
    "from": "/04-ressources/roadmap",
    "to": "/05-ressources/roadmap"
  },
  {
    "from": "/guide/index",
    "to": "/01-onboarding/index"
  },
  {
    "from": "/guide/onboarding",
    "to": "/01-onboarding/index"
  },
  {
    "from": "/guide/git-ssh",
    "to": "/01-onboarding/01-demarrage/git-ssh"
  },
  {
    "from": "/guide/workflow",
    "to": "/01-onboarding/02-workflow-et-contribution/workflow"
  },
  {
    "from": "/guide/architecture",
    "to": "/02-architecture/index"
  },
  {
    "from": "/guide/auth",
    "to": "/02-architecture/01-securite-et-identite/auth"
  },
  {
    "from": "/guide/hot-reload",
    "to": "/02-architecture/03-devops-et-deploiement/hot-reload"
  },
  {
    "from": "/guide/env",
    "to": "/02-architecture/03-devops-et-deploiement/env"
  },
  {
    "from": "/guide/projects-status",
    "to": "/03-projets/index"
  },
  {
    "from": "/guide/roadmap",
    "to": "/05-ressources/roadmap"
  },
  {
    "from": "/projets/docs",
    "to": "/03-projets/01-documents-et-contenus/docs"
  },
  {
    "from": "/projets/projects",
    "to": "/03-projets/03-gestion-et-utilisateurs/projects"
  },
  {
    "from": "/projets/meet",
    "to": "/03-projets/02-communication-et-echange/meet"
  },
  {
    "from": "/projets/transfers",
    "to": "/03-projets/02-communication-et-echange/transfers"
  },
  {
    "from": "/projets/people",
    "to": "/03-projets/03-gestion-et-utilisateurs/people"
  },
  {
    "from": "/projets/accounts",
    "to": "/03-projets/03-gestion-et-utilisateurs/accounts"
  }
];
