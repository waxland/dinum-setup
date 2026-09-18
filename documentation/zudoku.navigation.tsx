import type { ZudokuConfig } from "zudoku";

export const docsNavigation: ZudokuConfig["navigation"] = [
  {
    "type": "doc",
    "file": "index.mdx",
    "path": "/",
    "label": "Accueil",
    "icon": "home"
  },
  {
    "type": "category",
    "label": "Onboarding & Démarrage",
    "icon": "compass",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "01-onboarding/index.mdx",
        "path": "/01-onboarding"
      },
      {
        "type": "category",
        "label": "Contexte & Hackathon 42",
        "icon": "folder",
        "collapsed": false,
        "items": [
          "/01-onboarding/00-contexte/challenge-42",
          "/01-onboarding/00-contexte/planning"
        ]
      },
      {
        "type": "category",
        "label": "Demarrage",
        "icon": "rocket",
        "collapsed": false,
        "items": [
          "/01-onboarding/01-demarrage/environnement-machine-hote",
          "/01-onboarding/01-demarrage/git-ssh",
          "/01-onboarding/01-demarrage/urls-et-identifiants",
          "/01-onboarding/01-demarrage/vscode",
          {
            "type": "category",
            "label": "Configuration Serveur",
            "icon": "server",
            "collapsed": false,
            "items": [
              "/01-onboarding/01-demarrage/configuration-serveur/01-guide-configuration-serveur",
              "/01-onboarding/01-demarrage/configuration-serveur/02-pr-support-serveurs-distants"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Workflow Et Contribution",
        "icon": "git-pull-request",
        "collapsed": false,
        "items": [
          "/01-onboarding/02-workflow-et-contribution/bonnes-pratiques-dinum",
          "/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit",
          "/01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite",
          "/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur",
          "/01-onboarding/02-workflow-et-contribution/tests-et-qualite",
          "/01-onboarding/02-workflow-et-contribution/workflow",
          {
            "type": "category",
            "label": "Adr",
            "icon": "folder",
            "collapsed": false,
            "items": [
              {
                "type": "doc",
                "file": "01-onboarding/02-workflow-et-contribution/adr/index.mdx",
                "path": "/01-onboarding/02-workflow-et-contribution/adr"
              },
              "/01-onboarding/02-workflow-et-contribution/adr/0001-architecture-monorepo-4-piliers",
              "/01-onboarding/02-workflow-et-contribution/adr/0002-rendu-tri-format-dsfr-cunningham",
              "/01-onboarding/02-workflow-et-contribution/adr/0003-proxy-django-anti-ssrf-circuit-breaker",
              "/01-onboarding/02-workflow-et-contribution/adr/0004-dual-trigger-slash-et-mention"
            ]
          }
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
      },
      {
        "type": "category",
        "label": "Ressources",
        "icon": "folder",
        "collapsed": false,
        "items": [
          "/01-onboarding/04-ressources/communaute",
          "/01-onboarding/04-ressources/roadmap",
          "/01-onboarding/04-ressources/templates-et-outils"
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "La Suite Numérique",
    "icon": "palette",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "02-la-suite/index.mdx",
        "path": "/02-la-suite"
      },
      {
        "type": "category",
        "label": "Applications & Projets",
        "icon": "folder",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "02-la-suite/01-applications/index.mdx",
            "path": "/02-la-suite/01-applications"
          },
          {
            "type": "category",
            "label": "Documents Et Contenus",
            "icon": "file-text",
            "collapsed": false,
            "items": [
              "/02-la-suite/01-applications/01-documents-et-contenus/docs",
              "/02-la-suite/01-applications/01-documents-et-contenus/fichiers-drive",
              "/02-la-suite/01-applications/01-documents-et-contenus/grist"
            ]
          },
          {
            "type": "category",
            "label": "Communication Et Echange",
            "icon": "message-square",
            "collapsed": false,
            "items": [
              "/02-la-suite/01-applications/02-communication-et-echange/meet",
              "/02-la-suite/01-applications/02-communication-et-echange/tchap",
              "/02-la-suite/01-applications/02-communication-et-echange/transfers"
            ]
          },
          {
            "type": "category",
            "label": "Gestion Et Utilisateurs",
            "icon": "users",
            "collapsed": false,
            "items": [
              "/02-la-suite/01-applications/03-gestion-et-utilisateurs/accounts",
              "/02-la-suite/01-applications/03-gestion-et-utilisateurs/people",
              "/02-la-suite/01-applications/03-gestion-et-utilisateurs/projects"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Architecture & Données",
        "icon": "folder",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "02-la-suite/02-architecture/index.mdx",
            "path": "/02-la-suite/02-architecture"
          },
          {
            "type": "category",
            "label": "Securite Et Identite",
            "icon": "shield-check",
            "collapsed": false,
            "items": [
              "/02-la-suite/02-architecture/01-securite-et-identite/auth",
              "/02-la-suite/02-architecture/01-securite-et-identite/federation-identite-proconnect",
              "/02-la-suite/02-architecture/01-securite-et-identite/secrets-sops"
            ]
          },
          {
            "type": "category",
            "label": "Donnees Et Temps Reel",
            "icon": "database",
            "collapsed": false,
            "items": [
              "/02-la-suite/02-architecture/02-donnees-et-temps-reel/flux-stockage-s3",
              "/02-la-suite/02-architecture/02-donnees-et-temps-reel/sauvegardes-et-restauration",
              "/02-la-suite/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt"
            ]
          },
          {
            "type": "category",
            "label": "Devops Et Deploiement",
            "icon": "cloud",
            "collapsed": false,
            "items": [
              "/02-la-suite/02-architecture/03-devops-et-deploiement/cicd-github-actions",
              "/02-la-suite/02-architecture/03-devops-et-deploiement/deploiement-production",
              "/02-la-suite/02-architecture/03-devops-et-deploiement/env",
              "/02-la-suite/02-architecture/03-devops-et-deploiement/hot-reload"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Design System & DSFR",
        "icon": "folder",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "02-la-suite/03-design-system/index.mdx",
            "path": "/02-la-suite/03-design-system"
          },
          {
            "type": "category",
            "label": "Fondations",
            "icon": "sliders",
            "collapsed": false,
            "items": [
              "/02-la-suite/03-design-system/01-fondations/accessibilite-rgaa",
              "/02-la-suite/03-design-system/01-fondations/couleurs-et-themes",
              "/02-la-suite/03-design-system/01-fondations/figma",
              "/02-la-suite/03-design-system/01-fondations/icones",
              "/02-la-suite/03-design-system/01-fondations/installation",
              "/02-la-suite/03-design-system/01-fondations/typographie"
            ]
          },
          {
            "type": "category",
            "label": "Composants",
            "icon": "box",
            "collapsed": false,
            "items": [
              "/02-la-suite/03-design-system/02-composants/alertes-et-callouts",
              "/02-la-suite/03-design-system/02-composants/badges-et-statuts",
              "/02-la-suite/03-design-system/02-composants/boutons",
              "/02-la-suite/03-design-system/02-composants/cartes-et-conteneurs",
              "/02-la-suite/03-design-system/02-composants/formulaires",
              "/02-la-suite/03-design-system/02-composants/modales-et-dialogues",
              "/02-la-suite/03-design-system/02-composants/notices-et-bandeaux",
              "/02-la-suite/03-design-system/02-composants/pagination-et-stepper",
              "/02-la-suite/03-design-system/02-composants/tableaux"
            ]
          },
          {
            "type": "category",
            "label": "Layout Et Structure",
            "icon": "layout-grid",
            "collapsed": false,
            "items": [
              "/02-la-suite/03-design-system/03-layout-et-structure/navigation-et-layout"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Ressources",
        "icon": "folder",
        "collapsed": false,
        "items": [
          "/02-la-suite/04-ressources/communaute",
          "/02-la-suite/04-ressources/roadmap",
          "/02-la-suite/04-ressources/templates-et-outils"
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Slasheurs France (DINUM)",
    "icon": "terminal",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "03-slasheurs-france/index.mdx",
        "path": "/03-slasheurs-france"
      },
      "/03-slasheurs-france/00-socle-technique",
      "/03-slasheurs-france/01-architecture-standardisee",
      "/03-slasheurs-france/02-composant-customblock-unique",
      "/03-slasheurs-france/03-proxy-backend-et-cache",
      "/03-slasheurs-france/04-tutoriel-ajouter-une-api",
      "/03-slasheurs-france/05-proposition",
      "/03-slasheurs-france/07-roadmap",
      "/03-slasheurs-france/13-reutilisation-transverse",
      "/03-slasheurs-france/14-retour-d-experience",
      {
        "type": "category",
        "label": "Projet de Loi (/loi)",
        "icon": "scale",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/01-loi/index.mdx",
            "path": "/03-slasheurs-france/01-loi"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/01-loi/01-metier-loi/01-fondations-et-cadre",
              "/03-slasheurs-france/01-loi/01-metier-loi/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/01-loi/02-api-loi/01-benchmark-des-apis",
              "/03-slasheurs-france/01-loi/02-api-loi/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/01-loi/03-implementation-loi/01-provider-django",
              "/03-slasheurs-france/01-loi/03-implementation-loi/02-rendu-et-settings"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Assemblée Nationale (/assemblee)",
        "icon": "landmark",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/02-assemblee/index.mdx",
            "path": "/03-slasheurs-france/02-assemblee"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/02-assemblee/01-metier-assemblee/01-fondations-et-cadre",
              "/03-slasheurs-france/02-assemblee/01-metier-assemblee/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/02-assemblee/02-api-assemblee/01-benchmark-des-apis",
              "/03-slasheurs-france/02-assemblee/02-api-assemblee/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/02-assemblee/03-implementation-assemblee/01-provider-django",
              "/03-slasheurs-france/02-assemblee/03-implementation-assemblee/02-rendu-et-settings"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Entreprises (/entreprise)",
        "icon": "building-2",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/03-entreprise/index.mdx",
            "path": "/03-slasheurs-france/03-entreprise"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/03-entreprise/01-metier-entreprise/01-fondations-et-cadre",
              "/03-slasheurs-france/03-entreprise/01-metier-entreprise/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/03-entreprise/02-api-entreprise/01-benchmark-des-apis",
              "/03-slasheurs-france/03-entreprise/02-api-entreprise/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/03-entreprise/03-implementation-entreprise/01-provider-django",
              "/03-slasheurs-france/03-entreprise/03-implementation-entreprise/02-rendu-et-settings"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Base Adresse Nationale (/adresse)",
        "icon": "map-pin",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/04-adresse/index.mdx",
            "path": "/03-slasheurs-france/04-adresse"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/04-adresse/01-metier-adresse/01-fondations-et-cadre",
              "/03-slasheurs-france/04-adresse/01-metier-adresse/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/04-adresse/02-api-adresse/01-benchmark-des-apis",
              "/03-slasheurs-france/04-adresse/02-api-adresse/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/04-adresse/03-implementation-adresse/01-provider-django",
              "/03-slasheurs-france/04-adresse/03-implementation-adresse/02-rendu-et-settings"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Albert",
        "icon": "folder",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/05-albert/index.mdx",
            "path": "/03-slasheurs-france/05-albert"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/05-albert/01-metier-albert/01-fondations-et-cadre",
              "/03-slasheurs-france/05-albert/01-metier-albert/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/05-albert/02-api-albert/01-benchmark-des-apis",
              "/03-slasheurs-france/05-albert/02-api-albert/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/05-albert/03-implementation-albert/01-provider-django",
              "/03-slasheurs-france/05-albert/03-implementation-albert/02-rendu-et-settings"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "SDK Developpeur",
        "icon": "code",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/06-sdk-developpeur/index.mdx",
            "path": "/03-slasheurs-france/06-sdk-developpeur"
          }
        ]
      },
      {
        "type": "category",
        "label": "Marchés Publics (/marche)",
        "icon": "folder",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/08-marche/index.mdx",
            "path": "/03-slasheurs-france/08-marche"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/08-marche/01-metier-marche/01-fondations-et-cadre",
              "/03-slasheurs-france/08-marche/01-metier-marche/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/08-marche/02-api-marche/01-benchmark-des-apis",
              "/03-slasheurs-france/08-marche/02-api-marche/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/08-marche/03-implementation-marche/01-provider-django",
              "/03-slasheurs-france/08-marche/03-implementation-marche/02-rendu-et-settings"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Subventions (/subvention)",
        "icon": "folder",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/09-subvention/index.mdx",
            "path": "/03-slasheurs-france/09-subvention"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/09-subvention/01-metier-subvention/01-fondations-et-cadre",
              "/03-slasheurs-france/09-subvention/01-metier-subvention/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/09-subvention/02-api-subvention/01-benchmark-des-apis",
              "/03-slasheurs-france/09-subvention/02-api-subvention/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/09-subvention/03-implementation-subvention/01-provider-django",
              "/03-slasheurs-france/09-subvention/03-implementation-subvention/02-rendu-et-settings"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Stats",
        "icon": "folder",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/10-stats/index.mdx",
            "path": "/03-slasheurs-france/10-stats"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/10-stats/01-metier-stats/01-fondations-et-cadre",
              "/03-slasheurs-france/10-stats/01-metier-stats/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/10-stats/02-api-stats/01-benchmark-des-apis",
              "/03-slasheurs-france/10-stats/02-api-stats/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/10-stats/03-implementation-stats/01-provider-django",
              "/03-slasheurs-france/10-stats/03-implementation-stats/02-rendu-et-settings"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Agent",
        "icon": "folder",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/11-agent/index.mdx",
            "path": "/03-slasheurs-france/11-agent"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/11-agent/01-metier-agent/01-fondations-et-cadre",
              "/03-slasheurs-france/11-agent/01-metier-agent/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/11-agent/02-api-agent/01-benchmark-des-apis",
              "/03-slasheurs-france/11-agent/02-api-agent/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/11-agent/03-implementation-agent/01-provider-django",
              "/03-slasheurs-france/11-agent/03-implementation-agent/02-rendu-et-settings"
            ]
          }
        ]
      },
      {
        "type": "category",
        "label": "Cadastre (/cadastre)",
        "icon": "folder",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "03-slasheurs-france/12-cadastre/index.mdx",
            "path": "/03-slasheurs-france/12-cadastre"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/12-cadastre/01-metier-cadastre/01-fondations-et-cadre",
              "/03-slasheurs-france/12-cadastre/01-metier-cadastre/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/12-cadastre/02-api-cadastre/01-benchmark-des-apis",
              "/03-slasheurs-france/12-cadastre/02-api-cadastre/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/03-slasheurs-france/12-cadastre/03-implementation-cadastre/01-provider-django",
              "/03-slasheurs-france/12-cadastre/03-implementation-cadastre/02-rendu-et-settings"
            ]
          }
        ]
      }
    ]
  }
];

export const docsRedirects: ZudokuConfig["redirects"] = [
  {
    "from": "/index",
    "to": "/fr"
  },
  {
    "from": "/accueil",
    "to": "/fr"
  },
  {
    "from": "/00-accueil",
    "to": "/fr"
  },
  {
    "from": "/00-accueil/index",
    "to": "/fr"
  },
  {
    "from": "/fr/index",
    "to": "/fr"
  },
  {
    "from": "/fr/00-accueil",
    "to": "/fr"
  },
  {
    "from": "/fr/00-accueil/index",
    "to": "/fr"
  },
  {
    "from": "/fr/00-accueil/challenge-42",
    "to": "/fr/01-onboarding/00-contexte/challenge-42"
  },
  {
    "from": "/fr/00-accueil/planning",
    "to": "/fr/01-onboarding/00-contexte/planning"
  },
  {
    "from": "/challenge-42",
    "to": "/fr/01-onboarding/00-contexte/challenge-42"
  },
  {
    "from": "/planning",
    "to": "/fr/01-onboarding/00-contexte/planning"
  },
  {
    "from": "/en/index",
    "to": "/en"
  },
  {
    "from": "/02-architecture",
    "to": "/fr/02-la-suite/02-architecture"
  },
  {
    "from": "/fr/02-architecture",
    "to": "/fr/02-la-suite/02-architecture"
  },
  {
    "from": "/03-projets",
    "to": "/fr/02-la-suite/01-applications"
  },
  {
    "from": "/fr/03-projets",
    "to": "/fr/02-la-suite/01-applications"
  },
  {
    "from": "/projets",
    "to": "/fr/02-la-suite/01-applications"
  },
  {
    "from": "/04-design-system",
    "to": "/fr/02-la-suite/03-design-system"
  },
  {
    "from": "/fr/04-design-system",
    "to": "/fr/02-la-suite/03-design-system"
  },
  {
    "from": "/design-system",
    "to": "/fr/02-la-suite/03-design-system"
  },
  {
    "from": "/dsfr",
    "to": "/fr/02-la-suite/03-design-system"
  },
  {
    "from": "/05-ressources",
    "to": "/fr/02-la-suite/04-ressources/communaute"
  },
  {
    "from": "/fr/05-ressources",
    "to": "/fr/02-la-suite/04-ressources/communaute"
  },
  {
    "from": "/ressources",
    "to": "/fr/02-la-suite/04-ressources/communaute"
  },
  {
    "from": "/slash",
    "to": "/fr/03-slasheurs-france"
  },
  {
    "from": "/08-slash",
    "to": "/fr/03-slasheurs-france"
  },
  {
    "from": "/fr/08-slash",
    "to": "/fr/03-slasheurs-france"
  },
  {
    "from": "/loi",
    "to": "/fr/03-slasheurs-france/01-loi"
  },
  {
    "from": "/law",
    "to": "/fr/03-slasheurs-france/01-loi"
  },
  {
    "from": "/onboarding",
    "to": "/fr/01-onboarding"
  },
  {
    "from": "/01-onboarding",
    "to": "/fr/01-onboarding"
  },
  {
    "from": "/guide",
    "to": "/fr/01-onboarding"
  },
  {
    "from": "/01-onboarding/challenge-42",
    "to": "/00-accueil/challenge-42"
  },
  {
    "from": "/challenge-42",
    "to": "/00-accueil/challenge-42"
  },
  {
    "from": "/01-onboarding/01-demarrage/challenge-42",
    "to": "/00-accueil/challenge-42"
  },
  {
    "from": "/01-onboarding/planning",
    "to": "/00-accueil/planning"
  },
  {
    "from": "/planning",
    "to": "/00-accueil/planning"
  },
  {
    "from": "/planning-42",
    "to": "/00-accueil/planning"
  },
  {
    "from": "/01-onboarding/01-demarrage/planning",
    "to": "/00-accueil/planning"
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
    "from": "/07-skills/dsfr-skill",
    "to": "/07-skills/dsfr"
  },
  {
    "from": "/07-skills/rgaa-review-skill",
    "to": "/07-skills/rgaa-review"
  },
  {
    "from": "/07-skills/lasuite-dev-skill",
    "to": "/07-skills/lasuite-dev"
  },
  {
    "from": "/07-skills/docs-mdx-skill",
    "to": "/07-skills/docs-mdx"
  },
  {
    "from": "/07-skills/code-review-skill",
    "to": "/07-skills/code-review"
  },
  {
    "from": "/07-skills/architecture-review-skill",
    "to": "/07-skills/architecture-review"
  },
  {
    "from": "/07-skills/design-change-skill",
    "to": "/07-skills/design-change"
  },
  {
    "from": "/skills/dsfr",
    "to": "/07-skills/dsfr"
  },
  {
    "from": "/skills/rgaa-review",
    "to": "/07-skills/rgaa-review"
  },
  {
    "from": "/skills/lasuite-dev",
    "to": "/07-skills/lasuite-dev"
  },
  {
    "from": "/skills/docs-mdx",
    "to": "/07-skills/docs-mdx"
  },
  {
    "from": "/skills/code-review",
    "to": "/07-skills/code-review"
  },
  {
    "from": "/skills/architecture-review",
    "to": "/07-skills/architecture-review"
  },
  {
    "from": "/skills/design-change",
    "to": "/07-skills/design-change"
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
    "to": "/01-onboarding"
  },
  {
    "from": "/guide/onboarding",
    "to": "/01-onboarding"
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
    "to": "/02-architecture"
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
    "to": "/03-projets"
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
