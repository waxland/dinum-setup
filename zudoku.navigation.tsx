import type { ZudokuConfig } from "zudoku";

export const docsNavigation: ZudokuConfig["navigation"] = [
  {
    "type": "category",
    "label": "Guide",
    "icon": "book-open",
    "collapsed": false,
    "items": [
      "/guide/index",
      "/guide/auth",
      "/guide/env",
      "/guide/git-ssh",
      "/guide/hot-reload",
      "/guide/onboarding",
      "/guide/projects-status",
      "/guide/roadmap",
      "/guide/workflow"
    ]
  },
  {
    "type": "category",
    "label": "Projets",
    "icon": "boxes",
    "collapsed": false,
    "items": [
      "/projets/accounts",
      "/projets/docs",
      "/projets/meet",
      "/projets/people",
      "/projets/projects",
      "/projets/transfers"
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
  "to": "/guide/index"
}
];
