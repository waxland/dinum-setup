import type { ZudokuConfig } from "zudoku";

export const docsNavigation: ZudokuConfig["navigation"] = [
  {
    "type": "category",
    "label": "Onboarding",
    "icon": "compass",
    "collapsed": false,
    "items": [
      "/01-onboarding/index",
      "/01-onboarding/git-ssh",
      "/01-onboarding/tests-et-qualite",
      "/01-onboarding/troubleshooting",
      "/01-onboarding/urls-et-identifiants",
      "/01-onboarding/vscode",
      "/01-onboarding/workflow"
    ]
  },
  {
    "type": "category",
    "label": "Architecture",
    "icon": "layers",
    "collapsed": false,
    "items": [
      "/02-architecture/index",
      "/02-architecture/auth",
      "/02-architecture/env",
      "/02-architecture/hot-reload",
      "/02-architecture/secrets-sops"
    ]
  },
  {
    "type": "category",
    "label": "Projets",
    "icon": "boxes",
    "collapsed": false,
    "items": [
      "/03-projets/index",
      "/03-projets/accounts",
      "/03-projets/docs",
      "/03-projets/meet",
      "/03-projets/people",
      "/03-projets/projects",
      "/03-projets/transfers"
    ]
  },
  {
    "type": "category",
    "label": "Design System",
    "icon": "palette",
    "collapsed": false,
    "items": [
      "/04-design-system/index",
      "/04-design-system/accessibilite-rgaa",
      "/04-design-system/alertes-et-callouts",
      "/04-design-system/badges-et-statuts",
      "/04-design-system/boutons",
      "/04-design-system/cartes-et-conteneurs",
      "/04-design-system/couleurs-et-themes",
      "/04-design-system/formulaires",
      "/04-design-system/icones",
      "/04-design-system/navigation-et-layout",
      "/04-design-system/typographie"
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
    "label": "Liens",
    "icon": "external-link",
    "items": [
      {
        "type": "link",
        "label": "GitHub La Suite",
        "to": "https://github.com/suitenumerique",
        "target": "_blank"
      },
      {
        "type": "link",
        "label": "Site La Suite",
        "to": "https://lasuite.numerique.gouv.fr/",
        "target": "_blank"
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
    "from": "/guide",
    "to": "/01-onboarding/index"
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
    "to": "/01-onboarding/git-ssh"
  },
  {
    "from": "/guide/workflow",
    "to": "/01-onboarding/workflow"
  },
  {
    "from": "/guide/architecture",
    "to": "/02-architecture/index"
  },
  {
    "from": "/guide/auth",
    "to": "/02-architecture/auth"
  },
  {
    "from": "/guide/hot-reload",
    "to": "/02-architecture/hot-reload"
  },
  {
    "from": "/guide/env",
    "to": "/02-architecture/env"
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
    "to": "/03-projets/docs"
  },
  {
    "from": "/projets/projects",
    "to": "/03-projets/projects"
  },
  {
    "from": "/projets/meet",
    "to": "/03-projets/meet"
  },
  {
    "from": "/projets/transfers",
    "to": "/03-projets/transfers"
  },
  {
    "from": "/projets/people",
    "to": "/03-projets/people"
  },
  {
    "from": "/projets/accounts",
    "to": "/03-projets/accounts"
  }
];
