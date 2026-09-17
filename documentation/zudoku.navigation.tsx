import type { ZudokuConfig } from "zudoku";

export const docsNavigation: ZudokuConfig["navigation"] = [
  {
    "type": "category",
    "label": "Accueil",
    "icon": "home",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "00-accueil/index.mdx",
        "path": "/"
      },
      "/00-accueil/challenge-42",
      "/00-accueil/planning"
    ]
  },
  {
    "type": "category",
    "label": "Onboarding",
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
    "label": "Architecture",
    "icon": "layers",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "02-architecture/index.mdx",
        "path": "/02-architecture"
      },
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
      {
        "type": "doc",
        "file": "03-projets/index.mdx",
        "path": "/03-projets"
      },
      {
        "type": "category",
        "label": "Documents Et Contenus",
        "icon": "file-text",
        "collapsed": false,
        "items": [
          "/03-projets/01-documents-et-contenus/docs",
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
      {
        "type": "doc",
        "file": "04-design-system/index.mdx",
        "path": "/04-design-system"
      },
      {
        "type": "category",
        "label": "Fondations",
        "icon": "sliders",
        "collapsed": false,
        "items": [
          "/04-design-system/01-fondations/accessibilite-rgaa",
          "/04-design-system/01-fondations/couleurs-et-themes",
          "/04-design-system/01-fondations/figma",
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
      "/05-ressources/roadmap",
      "/05-ressources/templates-et-outils"
    ]
  },
  {
    "type": "category",
    "label": "Skills Ai",
    "icon": "bot",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "05-skills-ai/index.mdx",
        "path": "/05-skills-ai"
      },
      "/05-skills-ai/architecture-review",
      "/05-skills-ai/code-review",
      "/05-skills-ai/code-standards",
      "/05-skills-ai/design-change",
      "/05-skills-ai/docs-mdx",
      "/05-skills-ai/dsfr",
      "/05-skills-ai/lasuite-dev",
      "/05-skills-ai/rgaa-review"
    ]
  },
  {
    "type": "category",
    "label": "Skills",
    "icon": "bot",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "07-skills/index.mdx",
        "path": "/07-skills"
      },
      "/07-skills/architecture-review",
      "/07-skills/code-review",
      "/07-skills/code-standards",
      "/07-skills/design-change",
      "/07-skills/docs-mdx",
      "/07-skills/dsfr",
      "/07-skills/lasuite-dev",
      "/07-skills/rgaa-review"
    ]
  },
  {
    "type": "category",
    "label": "Commandes Slash",
    "icon": "terminal",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "08-slash/index.mdx",
        "path": "/08-slash"
      },
      "/08-slash/00-socle-technique",
      "/08-slash/01-architecture-standardisee",
      "/08-slash/02-composant-customblock-unique",
      "/08-slash/03-proxy-backend-et-cache",
      "/08-slash/04-tutoriel-ajouter-une-api",
      "/08-slash/05-proposition",
      "/08-slash/07-roadmap",
      "/08-slash/13-reutilisation-transverse",
      "/08-slash/14-retour-d-experience",
      {
        "type": "category",
        "label": "Projet de Loi (/loi)",
        "icon": "scale",
        "collapsed": false,
        "items": [
          {
            "type": "doc",
            "file": "08-slash/01-loi/index.mdx",
            "path": "/08-slash/01-loi"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/01-loi/01-metier-loi/01-fondations-et-cadre",
              "/08-slash/01-loi/01-metier-loi/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/01-loi/02-api-loi/01-benchmark-des-apis",
              "/08-slash/01-loi/02-api-loi/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/01-loi/03-implementation-loi/01-provider-django",
              "/08-slash/01-loi/03-implementation-loi/02-rendu-et-settings"
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
            "file": "08-slash/02-assemblee/index.mdx",
            "path": "/08-slash/02-assemblee"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/02-assemblee/01-metier-assemblee/01-fondations-et-cadre",
              "/08-slash/02-assemblee/01-metier-assemblee/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/02-assemblee/02-api-assemblee/01-benchmark-des-apis",
              "/08-slash/02-assemblee/02-api-assemblee/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/02-assemblee/03-implementation-assemblee/01-provider-django",
              "/08-slash/02-assemblee/03-implementation-assemblee/02-rendu-et-settings"
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
            "file": "08-slash/03-entreprise/index.mdx",
            "path": "/08-slash/03-entreprise"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/03-entreprise/01-metier-entreprise/01-fondations-et-cadre",
              "/08-slash/03-entreprise/01-metier-entreprise/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/03-entreprise/02-api-entreprise/01-benchmark-des-apis",
              "/08-slash/03-entreprise/02-api-entreprise/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/03-entreprise/03-implementation-entreprise/01-provider-django",
              "/08-slash/03-entreprise/03-implementation-entreprise/02-rendu-et-settings"
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
            "file": "08-slash/04-adresse/index.mdx",
            "path": "/08-slash/04-adresse"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/04-adresse/01-metier-adresse/01-fondations-et-cadre",
              "/08-slash/04-adresse/01-metier-adresse/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/04-adresse/02-api-adresse/01-benchmark-des-apis",
              "/08-slash/04-adresse/02-api-adresse/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/04-adresse/03-implementation-adresse/01-provider-django",
              "/08-slash/04-adresse/03-implementation-adresse/02-rendu-et-settings"
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
            "file": "08-slash/05-albert/index.mdx",
            "path": "/08-slash/05-albert"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/05-albert/01-metier-albert/01-fondations-et-cadre",
              "/08-slash/05-albert/01-metier-albert/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/05-albert/02-api-albert/01-benchmark-des-apis",
              "/08-slash/05-albert/02-api-albert/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/05-albert/03-implementation-albert/01-provider-django",
              "/08-slash/05-albert/03-implementation-albert/02-rendu-et-settings"
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
            "file": "08-slash/06-sdk-developpeur/index.mdx",
            "path": "/08-slash/06-sdk-developpeur"
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
            "file": "08-slash/08-marche/index.mdx",
            "path": "/08-slash/08-marche"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/08-marche/01-metier-marche/01-fondations-et-cadre",
              "/08-slash/08-marche/01-metier-marche/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/08-marche/02-api-marche/01-benchmark-des-apis",
              "/08-slash/08-marche/02-api-marche/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/08-marche/03-implementation-marche/01-provider-django",
              "/08-slash/08-marche/03-implementation-marche/02-rendu-et-settings"
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
            "file": "08-slash/09-subvention/index.mdx",
            "path": "/08-slash/09-subvention"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/09-subvention/01-metier-subvention/01-fondations-et-cadre",
              "/08-slash/09-subvention/01-metier-subvention/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/09-subvention/02-api-subvention/01-benchmark-des-apis",
              "/08-slash/09-subvention/02-api-subvention/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/09-subvention/03-implementation-subvention/01-provider-django",
              "/08-slash/09-subvention/03-implementation-subvention/02-rendu-et-settings"
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
            "file": "08-slash/10-stats/index.mdx",
            "path": "/08-slash/10-stats"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/10-stats/01-metier-stats/01-fondations-et-cadre",
              "/08-slash/10-stats/01-metier-stats/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/10-stats/02-api-stats/01-benchmark-des-apis",
              "/08-slash/10-stats/02-api-stats/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/10-stats/03-implementation-stats/01-provider-django",
              "/08-slash/10-stats/03-implementation-stats/02-rendu-et-settings"
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
            "file": "08-slash/11-agent/index.mdx",
            "path": "/08-slash/11-agent"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/11-agent/01-metier-agent/01-fondations-et-cadre",
              "/08-slash/11-agent/01-metier-agent/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/11-agent/02-api-agent/01-benchmark-des-apis",
              "/08-slash/11-agent/02-api-agent/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/11-agent/03-implementation-agent/01-provider-django",
              "/08-slash/11-agent/03-implementation-agent/02-rendu-et-settings"
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
            "file": "08-slash/12-cadastre/index.mdx",
            "path": "/08-slash/12-cadastre"
          },
          {
            "type": "category",
            "label": "Pôle Métier & Usages",
            "icon": "briefcase",
            "collapsed": false,
            "items": [
              "/08-slash/12-cadastre/01-metier-cadastre/01-fondations-et-cadre",
              "/08-slash/12-cadastre/01-metier-cadastre/02-cas-usage-et-scenarios"
            ]
          },
          {
            "type": "category",
            "label": "Pôle API & Veille",
            "icon": "code",
            "collapsed": false,
            "items": [
              "/08-slash/12-cadastre/02-api-cadastre/01-benchmark-des-apis",
              "/08-slash/12-cadastre/02-api-cadastre/02-specifications-techniques"
            ]
          },
          {
            "type": "category",
            "label": "Pôle Implémentation",
            "icon": "terminal",
            "collapsed": false,
            "items": [
              "/08-slash/12-cadastre/03-implementation-cadastre/01-provider-django",
              "/08-slash/12-cadastre/03-implementation-cadastre/02-rendu-et-settings"
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Pull Requests & Contributions",
    "icon": "folder",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "09-PR/index.mdx",
        "path": "/09-PR"
      },
      "/09-PR/01-docs-serveur-config",
      "/09-PR/02-docs-packages-souverains",
      "/09-PR/03-blocknote-external-sources",
      "/09-PR/04-guide-d-arbitrage-et-migration",
      "/09-PR/05-commande-PR"
    ]
  }
];

export const docsRedirects: ZudokuConfig["redirects"] = [
  {
    "from": "/index",
    "to": "/"
  },
  {
    "from": "/accueil",
    "to": "/"
  },
  {
    "from": "/00-accueil",
    "to": "/"
  },
  {
    "from": "/00-accueil/index",
    "to": "/"
  },
  {
    "from": "/05-ressources",
    "to": "/05-ressources/communaute"
  },
  {
    "from": "/onboarding",
    "to": "/01-onboarding"
  },
  {
    "from": "/architecture",
    "to": "/02-architecture"
  },
  {
    "from": "/projets",
    "to": "/03-projets"
  },
  {
    "from": "/design-system",
    "to": "/04-design-system"
  },
  {
    "from": "/dsfr",
    "to": "/04-design-system"
  },
  {
    "from": "/ressources",
    "to": "/05-ressources/communaute"
  },
  {
    "from": "/skills",
    "to": "/07-skills"
  },
  {
    "from": "/slash",
    "to": "/08-slash"
  },
  {
    "from": "/08-slash/index",
    "to": "/08-slash"
  },
  {
    "from": "/pr",
    "to": "/09-PR"
  },
  {
    "from": "/prs",
    "to": "/09-PR"
  },
  {
    "from": "/08-slash/00-PR",
    "to": "/09-PR"
  },
  {
    "from": "/08-slash/00-PR/index",
    "to": "/09-PR"
  },
  {
    "from": "/08-slash/00-PR/00-dossier-pull-request-officielle",
    "to": "/09-PR/02-docs-packages-souverains"
  },
  {
    "from": "/08-slash/00-PR/01-pr-interne-monolithique",
    "to": "/09-PR/04-guide-d-arbitrage-et-migration"
  },
  {
    "from": "/08-slash/00-PR/02-pr-externe-packagee",
    "to": "/09-PR/02-docs-packages-souverains"
  },
  {
    "from": "/08-slash/00-PR/03-guide-d-arbitrage-et-migration",
    "to": "/09-PR/04-guide-d-arbitrage-et-migration"
  },
  {
    "from": "/08-slash/00-PR/04-proposition-amont-blocknote",
    "to": "/09-PR/03-blocknote-external-sources"
  },
  {
    "from": "/08-slash/loi",
    "to": "/08-slash/loi"
  },
  {
    "from": "/loi",
    "to": "/08-slash/loi"
  },
  {
    "from": "/law",
    "to": "/08-slash/loi"
  },
  {
    "from": "/comprendre-les-lois",
    "to": "/comprendre-les-lois"
  },
  {
    "from": "/ressources-juridiques",
    "to": "/ressources-juridiques"
  },
  {
    "from": "/guide",
    "to": "/01-onboarding"
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
