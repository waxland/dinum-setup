# 📋 Plan d'Audit & d'Amélioration de la Documentation Francophone (`PLAN_DOCUMENTATION_FR.md`)

**Date :** 28 Septembre 2026  
**Référentiel :** DINUM / La Suite Numérique / beta.gouv.fr / RGAA v4.1 AA / DSFR  
**Périmètre :** Portail francophone `documentation/docs/` (270 routes).

---

## 🧭 Tableau de Suivi de l'Audit Francophone

| Fichier Audité                                                                 |    Statut     |  Itération  | Synthèse des Recommandations                                                                                                                                               |
| :----------------------------------------------------------------------------- | :-----------: | :---------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `documentation/docs/index.mdx`                                                 | 🟡 À enrichir | Itération 1 | Découpler l'historique hackathon de l'accueil, enrichir la cartographie d'architecture et les liens vers les 3 piliers.                                                    |
| `documentation/docs/01-onboarding/index.mdx`                                   | 🔴 À refondre | Itération 2 | Éliminer le doublon de l'accueil, corriger les 5+ liens rompus (`/00-accueil`, `/03-projets`), structurer la checklist J1.                                                 |
| `documentation/docs/01-onboarding/01-demarrage/environnement-machine-hote.mdx` | 🟡 À enrichir | Itération 3 | Préciser `npm` comme gestionnaire officiel du monorepo (pas `pnpm`), ajouter l'outil `make check`, expliciter Linux & macOS.                                               |
| `documentation/docs/01-onboarding/01-demarrage/git-ssh.mdx`                    |  🟢 Conforme  | Itération 4 | Ajouter la signature des commits via clé SSH (`commit.gpgsign`), insérer `<DocHeaderSummary>` et lier au Guide du Premier Commit.                                          |
| `documentation/docs/01-onboarding/01-demarrage/vscode.mdx`                     | 🟡 À enrichir | Itération 5 | Actualiser les commandes de linting (`make check`, `npm run lint`, `ruff check`), clarifier l'exclusion de Biome/Tailwind dans les packages, insérer `<DocHeaderSummary>`. |

---

## 📑 Fiches d'Audit Détaillées par Document

### 📄 `documentation/docs/index.mdx`

- **Statut d'Audit :** 🟡 **À enrichir**
- **Rôle Architectural :** Point d'entrée principal du portail d'ingénierie et de la documentation francophone. Doit orienter immédiatement le lecteur (développeur interne, contributeur open source, chef de produit) vers le bon parcours tout en établissant la crédibilité technique et régalienne du socle.
- **Diagnostic Ligne par Ligne :**
  - `L.1-5` : Frontmatter propre mais `description` pourrait inclure la notion de biens communs numériques (DPG) et d'accessibilité RGAA.
  - `L.7-10` : L'introduction met l'accent sur le hackathon temporaire "42 x DINUM (Oléron 2026)". C'est un contexte historique précieux qui doit être déplacé dans un encart ou dans la section dédiée `01-onboarding/00-contexte/`, afin que la page d'accueil conserve une posture pérenne de portail d'ingénierie permanent.
  - `L.11-19` : `<DocHeaderSummary>` très pertinent. Veiller à ce que les prérequis et le résumé soulignent la nature 100% open source et modulaire.
  - `L.21` : `<OnboardingTracks />` offre une excellente orientation par rôle.
  - `L.23` : Les liens rapides pointent vers des pages internes et externes. Ajouter un lien direct vers la spécification OpenAPI / Backend et les composants DSFR.
  - `L.27-51` : La section "Figma & Storybook" est très utile mais intervient avant l'explication architecturale du projet. Il est préférable d'inverser pour présenter d'abord la vision globale du socle `/slash` et ensuite les références UI.
  - `L.55-83` : Le diagramme Mermaid est clair mais mentionne "12 grandes bases" alors que le socle répertorie 53 connecteurs (dont BAN en live, Albert, Légifrance, BOAMP, INSEE, etc.). Le schéma gagnerait à faire apparaître la résilience (Redis Token Bucket, disjoncteur HTTP 429).
  - `L.87-89` : Le composant `<BlockNoteSlashPlayground />` offre une interactivité remarquable dès l'accueil.
- **Recommandations de Contenu :**
  1. _Pérennisation du chapeau d'accueil_ : Présenter La Suite Numérique et le socle des commandes souveraines comme l'infrastructure documentaire de référence de l'État.
  2. _Mise à jour des chiffres clés_ : Aligner la mention du nombre de connecteurs (53 connecteurs souverains, 3 formats de blocs, 0 dépendance UI lourde).
  3. _Restructuration de la page_ :
     1. En-tête & Résumé (`<DocHeaderSummary>`, `<OnboardingTracks />`)
     2. Vision & Architecture du Socle (`Mermaid`, 3 tiers)
     3. Démonstration Interactive (`<BlockNoteSlashPlayground />`)
     4. Écosystème & Design System (Figma, Cunningham, DSFR)
- **Proposition de Diagramme Mermaid Amélioré :**
  ```mermaid
  flowchart TD
      subgraph Client["📝 Éditeur Collaboratif Docs (Navigateur)"]
          Saisie["Saisie au clavier : /loi, /adresse, /entreprise..."] --> Popover["Palette Popover Accessible (cmdk + ARIA)"]
          Popover --> Block["SourceBlock Tri-Format (Callout, Carte, Lien)"]
      end

      subgraph Backend["🐍 Proxy Sécurisé (django-lasuite-sources)"]
          Proxy["Proxy Django DRF (Anti-SSRF PublicResolver)"]
          Redis["⚡ Redis (Quotas Lua & Circuit Breaker HTTP 429)"]
          Proxy <--> Redis
      end

      subgraph APIs["🏛️ Sources Officielles Souveraines"]
          BAN["Base Adresse Nationale (Live)"]
          LEGI["Légifrance / PISTE (DILA)"]
          BOAMP["Marchés Publics BOAMP (DAE)"]
          INSEE["INSEE Sirene & Stats"]
          ALBERT["Albert IA Souveraine (Etalab)"]
      end

      Client --> Proxy
      Proxy --> BAN & LEGI & BOAMP & INSEE & ALBERT
  ```
- **Ressources & Liens Croisés Recommandés :**
  - Lien vers l'architecture globale : `/02-la-suite/02-architecture/`
  - Lien vers le catalogue des 53 connecteurs : `/03-slasheurs-france/`
  - Lien vers le guide d'onboarding : `/01-onboarding/`

---

### 📄 `documentation/docs/01-onboarding/index.mdx`

- **Statut d'Audit :** 🔴 **À refondre**
- **Rôle Architectural :** Hub d'accueil de la section Onboarding (`/01-onboarding`). Doit guider le développeur pas-à-pas dès son premier jour (Checklist J1, prérequis système, configuration VS Code/Git, premier commit conforme DINUM, architecture globale) plutôt que de dupliquer la page d'accueil générale.
- **Diagnostic Ligne par Ligne :**
  - `L.7-10` : Doublon textuel exact du paragraphe d'accueil sur le hackathon Oléron 2026.
  - `L.11-19` : `<DocHeaderSummary>` identique à l'accueil.
  - `L.23` : **Liens rompus critiques** : `[Challenge 42 x DINUM](/00-accueil/challenge-42)` et `[📅 Planning & Agenda](/00-accueil/planning)` renvoient vers `/00-accueil` qui n'existe pas dans l'arborescence (les vraies routes sont `/01-onboarding/00-contexte/challenge-42` et `/01-onboarding/00-contexte/planning`).
  - `L.27-51` : Répétition intégrale des cartes Figma & Storybook déjà présentes en page d'accueil.
  - `L.55-83` : Répétition intégrale du bloc "Le Projet Phare : Le Socle des Commandes Souveraines" et du schéma Mermaid.
  - `L.93-138` : Grille de navigation obsolète avec des liens inexistants ou non synchronisés avec l'arborescence (`/03-projets`, `/04-design-system`, `/07-skills`, `/08-slash`, `/09-PR`).
  - `L.142-156` : Bloc de commandes `make` incomplet / mal formaté (le commentaire `# 1.` a sauté devant `make clone`).
- **Recommandations de Contenu :**
  1. _Élimination des doublons_ : Remplacer les sections redondantes par un véritable sommaire d'onboarding structuré en 5 étapes clés.
  2. _Correction immédiate des liens_ : Rétablir les chemins exacts (`/01-onboarding/00-contexte/challenge-42`, `/01-onboarding/01-demarrage/environnement-machine-hote`, etc.).
  3. _Checklist J1 structurée_ :
     - Étape 1 : Prérequis machine (Node 22, Python 3.12+, Docker, Make)
     - Étape 2 : Clonage et configuration (`make clone && make env`)
     - Étape 3 : Bootstrap et lancement (`make bootstrap && make dev`)
     - Étape 4 : Règles d'ingénierie DINUM (0 any, 0 cast, RGAA v4.1 AA)
     - Étape 5 : Premier commit signé et workflow PR
- **Proposition de Diagramme Mermaid (Parcours Développeur J1) :**
  ```mermaid
  flowchart TD
      A[📥 1. Cloner le dépôt & sous-modules] --> B[⚙️ 2. make env - Préparer les .env]
      B --> C[🐳 3. make bootstrap - Monter Docker & DBs]
      C --> D[💻 4. make dev - Lancer l'orchestration locale]
      D --> E[🧪 5. make check - Valider le Quality Gate]
      E --> F[🚀 6. Prêt à développer & contribuer]
  ```
- **Ressources & Liens Croisés Recommandés :**
  - Guide Environnement hôte : `/01-onboarding/01-demarrage/environnement-machine-hote`
  - Guide Git & SSH : `/01-onboarding/01-demarrage/git-ssh`
  - Guide du Premier Commit : `/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit`
  - Bonnes Pratiques DINUM : `/01-onboarding/02-workflow-et-contribution/bonnes-pratiques-dinum`

---

### 📄 `documentation/docs/01-onboarding/01-demarrage/environnement-machine-hote.mdx`

- **Statut d'Audit :** 🟡 **À enrichir**
- **Rôle Architectural :** Guide technique des prérequis matériels, logiciels et moteurs de conteneurs pour démarrer le monorepo sur macOS et Linux.
- **Diagnostic Ligne par Ligne :**
  - `L.1-4` : Frontmatter propre.
  - `L.8-16` : Tableau des prérequis matériels réaliste et clair (16 Go RAM min, 32 Go optimal).
  - `L.18-42` : Section moteurs de conteneurs très pertinente (mise en avant d'OrbStack et Colima pour macOS pour éviter la lourdeur de Docker Desktop).
  - `L.44-78` : **Incohérence majeure de gestionnaire de paquets** :
    - Le document recommande `pnpm >= 9.x` et `corepack enable pnpm` (L.59, L.76-77).
    - **Réalité du monorepo :** Le workspace racine et tous les scripts `Makefile` / `package.json` utilisent strictement `npm` (`npm run format`, `npm test`, `npm run packages:build`, `npm --prefix ...`).
    - L'utilisation de `pnpm` dans ce monorepo génère des désynchronisations de `package-lock.json` et casse les scripts d'orchestration.
  - `L.56-62` : Python `>= 3.12.x` et Node.js `>= 22.x LTS (Iron)` sont conformes. Mentionner que Go n'est requis que si l'on compile des microservices spécifiques La Suite, mais n'est pas requis pour le socle `/slash`.
- **Recommandations de Contenu :**
  1. _Harmonisation du Package Manager_ : Remplacer `pnpm` par `npm >= 10.9.0` (natif avec Node.js 22 LTS) pour refléter l'outillage exact du monorepo.
  2. _Ajout de la commande de vérification automatique_ : Mentionner le script `node scripts/check-runtime.mjs` qui valide en un clin d'œil la version exacte de Node, npm et Python.
  3. _Ajout des paquets système Linux essentiels_ : Préciser pour Ubuntu/Debian les paquets requis (`build-essential`, `libpq-dev`, `python3-dev`, `curl`, `make`).
- **Proposition de Diagramme Mermaid (Stack Locale & Runtimes) :**
  ```mermaid
  graph LR
      subgraph System["💻 Machine de Développement"]
          Node["Node.js 22 LTS (Iron)<br/>npm >= 10.9.0"]
          Python["Python >= 3.12<br/>(uv / venv)"]
          Engine["Moteur Docker<br/>(OrbStack / Colima / Docker)"]
          Make["GNU Make"]
      end

      subgraph Automation["⚙️ Scripts de Validation"]
          CheckRuntime["scripts/check-runtime.mjs"]
          MakeCheck["make check (16 étapes)"]
      end

      System --> CheckRuntime --> MakeCheck
  ```
- **Ressources & Liens Croisés Recommandés :**
  - Guide Git & SSH : `/01-onboarding/01-demarrage/git-ssh`
  - Configuration VS Code : `/01-onboarding/01-demarrage/vscode`
  - Dépannage & Troubleshooting : `/01-onboarding/03-support/troubleshooting`

---

### 📄 `documentation/docs/01-onboarding/01-demarrage/git-ssh.mdx`

- **Statut d'Audit :** 🟢 **Conforme**
- **Rôle Architectural :** Guide pas-à-pas de configuration de l'identité Git, de génération de clés SSH Ed25519, de sécurisation des permissions système (`chmod 600/700`), de gestion multi-comptes (`~/.ssh/config`) et de diagnostic des erreurs fréquentes d'accès à GitHub.
- **Diagnostic Ligne par Ligne :**
  - `L.1-5` : Frontmatter propre et descriptif.
  - `L.7-10` : Liens vers la documentation officielle GitHub, les recommandations ANSSI et Git-SCM.
  - `L.12-32` : Section 1 - Configuration Git de base (`user.name`, `user.email`, `init.defaultBranch main`, `pull.ff only`).
  - `L.34-51` : Section 2 - Génération de clé Ed25519 claire et conforme aux recommandations cryptographiques modernes.
  - `L.53-73` : Section 3 - Permissions indispensables (`chmod 700 ~/.ssh`, `chmod 600 id_ed25519`) avec la note essentielle sur le saut de ligne final évitant l'erreur `libcrypto`.
  - `L.75-103` : Section 4 - Liens directs vers l'interface GitHub `/settings/keys`.
  - `L.105-133` : Section 5 - Exemple de configuration `~/.ssh/config` avec `IdentitiesOnly yes` pour éviter les fuites de clés lors des négociations SSH.
  - `L.135-151` : Section 6 - Test de connexion avec commande `ssh -T git@github.com`.
  - `L.153-195` : Section 7 - Diagnostic des erreurs courantes exhaustif (permissions trop ouvertes, permissions org refusées, agent SSH inactif).
- **Recommandations de Contenu :**
  1. _Ajout de la signature des commits via clé SSH_ : Les dépôts publics et organisationnels de l'État (DINUM / La Suite) valorisent les commits signés (`git config --global gpg.format ssh` et `git config --global user.signingkey ~/.ssh/id_ed25519.pub`).
  2. _Intégration d'un `<DocHeaderSummary>`_ : Ajouter l'en-tête standardisé (temps de lecture 4 min, prérequis: terminal Bash/Zsh).
  3. _Lien croisé avec le Guide du Premier Commit_ : Renvoyer vers `/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit` pour appliquer immédiatement la configuration.
- **Proposition de Diagramme Mermaid (Cycle de Configuration SSH & Signature) :**
  ```mermaid
  sequenceDiagram
      autonumber
      actor Dev as 💻 Développeur
      participant FS as 📁 ~/.ssh/
      participant GH as 🐙 GitHub
      participant Git as 🔧 Git Engine

      Dev->>FS: ssh-keygen -t ed25519 (chmod 600/700)
      Dev->>GH: Dépose la clé publique (id_ed25519.pub)
      Dev->>Git: git config --global user.signingkey ~/.ssh/id_ed25519.pub
      Dev->>Git: git config --global commit.gpgsign true
      Dev->>GH: git push (Authentification SSH + Commit Signé Vérifié)
      GH-->>Dev: Badge "Verified" sur les commits GitHub
  ```
- **Ressources & Liens Croisés Recommandés :**
  - Guide du Premier Commit : `/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit`
  - Sécurité du Poste Développeur : `/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur`
  - Recommandations ANSSI : https://cyber.gouv.fr/

---

### 📄 `documentation/docs/01-onboarding/01-demarrage/vscode.mdx`

- **Statut d'Audit :** 🟡 **À enrichir**
- **Rôle Architectural :** Guide d'outillage pour VS Code, présentant les extensions recommandées (`.vscode/extensions.json`), la configuration de formatage automatique à la sauvegarde (`.vscode/settings.json`), et la connexion aux bases PostgreSQL locales.
- **Diagnostic Ligne par Ligne :**
  - `L.1-4` : Frontmatter valide.
  - `L.6-10` : Introduction claire sur l'accélération de la boucle de rétroaction.
  - `L.14-30` : Section 1 Git (GitLens & Git Graph) claire.
  - `L.32-47` : Extensions Python (Ruff, Python, Pylance, Black, isort). Note : Ruff remplace avantageusement Black, Flake8 et isort ; clarifier que Ruff est le standard officiel unique.
  - `L.49-62` : Extensions Frontend (ESLint, Prettier, Tailwind, Biome). **Incohérence :** Mentionner que Tailwind CSS et Biome sont proscrits dans les bibliothèques distribuables (`@suitenumerique/blocknote-sources` applique 0-Tailwind / 0-Mantine).
  - `L.80-142` : Section PostgreSQL et SQLTools pré-configuré (`localhost:15432` pour Docs, `5433` pour Keycloak, `5432` pour Projects/Transfers) remarquable et immédiatement utilisable.
  - `L.144-172` : Section Configuration Automatique (`formatOnSave`, `organizeImports`, `fixAll`).
  - `L.174-196` : **Commandes de vérification terminal obsolètes** :
    - Mentionne `cd src/docs && make lint` et `cd src/transfers && make lint` (chemins upstream historiques).
    - Dans ce monorepo, les commandes de validation officielles sont `make check`, `npm run lint`, `npm run typecheck`, `ruff check .` et `pytest`.
- **Recommandations de Contenu :**
  1. _Actualisation des Commandes Terminal_ : Remplacer les chemins amont `src/docs` par les commandes réelles du monorepo (`make check`, `npm run lint`, `npm run format:check`).
  2. _Clarification sur les Extensions Autorisées_ : Préciser que Tailwind CSS et Mantine ne doivent pas être utilisés dans les composants de `packages/`.
  3. _Ajout de `<DocHeaderSummary>`_ : Insérer l'en-tête synthétique standard (temps de lecture 5 min, prérequis: VS Code ou VSCodium).
- **Proposition de Diagramme Mermaid (Cycle de Rétroaction IDE VS Code) :**
  ```mermaid
  flowchart LR
      Edit["📝 Édition de Code (TS / Python)"] --> Save["💾 Sauvegarde (Cmd+S)"]
      Save --> Format["🪄 Auto-Format (Ruff 88 / Prettier)"]
      Format --> Diagnostic["🔍 Linting en direct (ESLint / Pylance)"]
      Diagnostic --> SQL["🐘 Inspection BDD (SQLTools 1-clic)"]
      SQL --> Quality["⚡ Validation Terminal (make check)"]
  ```
- **Ressources & Liens Croisés Recommandés :**
  - Guide Environnement Hôte : `/01-onboarding/01-demarrage/environnement-machine-hote`
  - Qualité & Architecture La Suite : `/01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite`
  - Guide du Premier Commit : `/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit`
