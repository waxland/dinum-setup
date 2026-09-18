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
    "label": "00. Vision & Architecture",
    "icon": "folder",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "00-overview/index.mdx",
        "path": "/00-overview"
      },
      "/00-overview/architecture-3-tier",
      "/00-overview/engineering-standards",
      "/00-overview/international-vision"
    ]
  },
  {
    "type": "category",
    "label": "01. BlockNote Extension Specification",
    "icon": "monitor",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "01-blocknote-extension/index.mdx",
        "path": "/01-blocknote-extension"
      },
      "/01-blocknote-extension/3-display-formats",
      "/01-blocknote-extension/document-exports",
      "/01-blocknote-extension/floating-search-popover",
      "/01-blocknote-extension/styling-and-themes"
    ]
  },
  {
    "type": "category",
    "label": "02. Provider TypeScript SDK",
    "icon": "code",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "02-provider-sdk/index.mdx",
        "path": "/02-provider-sdk"
      },
      "/02-provider-sdk/build-provider-in-15-min",
      "/02-provider-sdk/define-source-provider",
      "/02-provider-sdk/typescript-contracts"
    ]
  },
  {
    "type": "category",
    "label": "03. Backend Proxy & Resilience",
    "icon": "server",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "03-backend-proxy/index.mdx",
        "path": "/03-backend-proxy"
      },
      "/03-backend-proxy/defensive-security-ssrf",
      "/03-backend-proxy/deterministic-cache",
      "/03-backend-proxy/quota-and-rate-limiting"
    ]
  },
  {
    "type": "category",
    "label": "04. Multi-Country Sovereign Presets",
    "icon": "folder",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "04-presets/index.mdx",
        "path": "/04-presets"
      },
      "/04-presets/canada",
      "/04-presets/european-union",
      "/04-presets/germany-bund",
      "/04-presets/international",
      "/04-presets/netherlands-gov",
      "/04-presets/spain-boe"
    ]
  },
  {
    "type": "category",
    "label": "05. Upstream BlockNote RFC",
    "icon": "folder",
    "collapsed": false,
    "items": [
      {
        "type": "doc",
        "file": "05-rfc-upstream/index.mdx",
        "path": "/05-rfc-upstream"
      },
      "/05-rfc-upstream/blocknote-rfc-specification"
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
