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
    "label": "Ressources",
    "icon": "map",
    "collapsed": false,
    "items": [
      "/04-ressources/communaute",
      "/04-ressources/roadmap"
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
    "to": "/04-ressources/roadmap"
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
