# 📚 Audit d'Architecture des Fichiers de Documentation

> **Généré le :** 04 Octobre 2026  
> **Workspace :** `dinum-setup`  
> **Périmètre :** Documentation Francophone (`documentation/docs/`), Documentation Internationale (`documentation-international/docs/`) et Rapports d'Architecture internes (`docs/`).

---

## 📊 1. Synthèse Globale

| Espace Documentaire                          | Répertoire Source                   | Nb de Fichiers   | Moteur SSR / Doc        |
| :------------------------------------------- | :---------------------------------- | :--------------- | :---------------------- |
| **Portail Francophone (La Suite / DINUM)**   | `documentation/docs/`               | **150 fichiers** | Zudoku + Pagefind       |
| **Portail International (Slasher Standard)** | `documentation-international/docs/` | **29 fichiers**  | Zudoku + Pagefind       |
| **Spécifications Internes & Rapports**       | `docs/`                             | **10 fichiers**  | Markdown / Architecture |
| **TOTAL**                                    | —                                   | **189 fichiers** | —                       |

### 🧭 Règle de Résolution Zudoku (Sidebar & Métadonnées)

- **Titre dans les Métadonnées (`title`) :** Extrait du frontmatter YAML (`title: "..."`) ou du premier titre `# Titre` Markdown. Utilisé pour la balise HTML `<title>` et le fil d'Ariane.
- **Nom dans la Sidebar (`sidebar_label`) :** Défini via le frontmatter `sidebar_label: "..."` (ou `label` dans la navigation Zudoku). S'il est absent, Zudoku utilise automatiquement la propriété `title`.

---

## 🎯 2. Recommandations & Règles d'Architecture Documentaire

### 🚫 Règle 1 : Zéro Préfixe Numérique dans les Titres et la Sidebar

- **Directive stricte appliquée :**
  - Les préfixes numériques (`01-`, `02-`, etc.) servent **uniquement pour l'ordonnancement technique sur disque**.
  - **Aucun numéro** n'apparaît dans les libellés affichés : `sidebar_label`, titres de catégories Zudoku (`Overview`, `Onboarding`, `La Suite`, `Slasheurs France`), ou balises `title`.

### 🔍 Règle 2 : Dissociation Titre SEO / Pagefind vs Sidebar Concise

- **Directive appliquée :**
  - **`sidebar_label` (Sidebar) :** Court et contextuel (1 à 3 mots, ex. `Benchmark APIs`, `Provider Django`, `Fondations & Cadre`).
  - **`title` (Métadonnées & Pagefind) :** Explicite et unique par connecteur (ex. `Benchmark des APIs & Sources — Slasheur Loi (Légifrance)`).

### 🌐 Règle 3 : 100% Anglophone sur le Portail International

- **Directive appliquée :**
  - Tous les libellés et titres du portail `documentation-international` sont intégralement en anglais (ex. `Themes & Styling`, `15-Min Quickstart`, `Defensive Security`, `European Union`).

---

## 🇫🇷 3. Portail Francophone (`documentation/docs/`)

Total : **150 fichiers**

### 📂 Section : `01-onboarding` (26 fichiers)

| Chemin du Fichier                                                                                                  | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                         |
| :----------------------------------------------------------------------------------------------------------------- | :------------------------------------ | :-------------------------------------------------- |
| `documentation/docs/01-onboarding/00-contexte/challenge-42.mdx`                                                    | **Challenge 42**                      | Hackathon 42 & Contexte DINUM                       |
| `documentation/docs/01-onboarding/00-contexte/planning.mdx`                                                        | **Planning**                          | Planning & Déroulé du Hackathon 42                  |
| `documentation/docs/01-onboarding/01-demarrage/configuration-serveur/01-guide-configuration-serveur.mdx`           | **Configuration Serveur**             | Guide de Configuration du Serveur Distant           |
| `documentation/docs/01-onboarding/01-demarrage/configuration-serveur/02-pr-support-serveurs-distants.mdx`          | **Support Serveurs**                  | Support des Serveurs Distants & Pull Requests       |
| `documentation/docs/01-onboarding/01-demarrage/environnement-machine-hote.mdx`                                     | **Machine Hôte**                      | Configuration de l'Environnement Machine Hôte       |
| `documentation/docs/01-onboarding/01-demarrage/git-ssh.mdx`                                                        | **Git & SSH**                         | Configuration Git & Authentification SSH            |
| `documentation/docs/01-onboarding/01-demarrage/urls-et-identifiants.mdx`                                           | **URLs & Identifiants**               | URLs, Ports & Identifiants de Développement Local   |
| `documentation/docs/01-onboarding/01-demarrage/vscode.mdx`                                                         | **VS Code**                           | Configuration VS Code & Extensions Recommandées     |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/0001-architecture-monorepo-4-piliers.mdx`        | **Architecture Monorepo**             | ADR-0001 : Architecture Monorepo en 4 Piliers       |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/0002-rendu-tri-format-dsfr-cunningham.mdx`       | **Rendu Tri-Format**                  | ADR-0002 : Rendu Tri-Format DSFR & Cunningham       |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/0003-proxy-django-anti-ssrf-circuit-breaker.mdx` | **Proxy Anti-SSRF**                   | ADR-0003 : Proxy Django Anti-SSRF & Circuit Breaker |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/0004-dual-trigger-slash-et-mention.mdx`          | **Double Déclencheur**                | ADR-0004 : Double Déclencheur Slash & Mention       |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/index.mdx`                                       | **ADRs**                              | Architecture Decision Records (ADRs)                |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/bonnes-pratiques-dinum.mdx`                          | **Standards DINUM**                   | Standards & Bonnes Pratiques d'Ingénierie DINUM     |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit.mdx`                         | **Premier Commit**                    | Guide du Premier Commit & Normes Git                |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite.mdx`                | **Qualité & Architecture**            | Exigences Qualité & Architecture La Suite           |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur.mdx`                   | **Sécurité du Poste**                 | Sécurité du Poste Développeur & Hygiène Numérique   |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/tests-et-qualite.mdx`                                | **Tests & Qualité**                   | Stratégie de Tests Automatisés & Assurance Qualité  |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/workflow.mdx`                                        | **Workflow Makefile**                 | Workflow Quotidien & Cibles Makefile                |
| `documentation/docs/01-onboarding/03-support/03-toml-frontmatter.mdx`                                              | **Frontmatter TOML**                  | Support & Compatibilité du Frontmatter TOML         |
| `documentation/docs/01-onboarding/03-support/glossaire.mdx`                                                        | **Glossaire**                         | Glossaire des Termes & Acronymes Souverains         |
| `documentation/docs/01-onboarding/03-support/troubleshooting.mdx`                                                  | **Dépannage FAQ**                     | Guide de Dépannage & FAQ Technique                  |
| `documentation/docs/01-onboarding/04-ressources/communaute.mdx`                                                    | **Communauté**                        | Communauté, Canaux de Support & Liens Utiles        |
| `documentation/docs/01-onboarding/04-ressources/roadmap.mdx`                                                       | **Roadmaps**                          | Feuille de Route & Jalons de Développement          |
| `documentation/docs/01-onboarding/04-ressources/templates-et-outils.mdx`                                           | **Templates & Outils**                | Templates & Boîte à Outils pour Développeurs        |
| `documentation/docs/01-onboarding/index.mdx`                                                                       | **Onboarding**                        | Guide d'Onboarding & Démarrage Rapide               |

### 📂 Section : `02-la-suite` (42 fichiers)

| Chemin du Fichier                                                                                           | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                           |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------ | :---------------------------------------------------- |
| `documentation/docs/02-la-suite/01-applications/01-documents-et-contenus/docs.mdx`                          | **Docs**                              | Docs — Éditeur Collaboratif BlockNote                 |
| `documentation/docs/02-la-suite/01-applications/01-documents-et-contenus/fichiers-drive.mdx`                | **Drive**                             | Drive — Gestionnaire de Fichiers Souverain            |
| `documentation/docs/02-la-suite/01-applications/01-documents-et-contenus/grist.mdx`                         | **Grist**                             | Grist — Tableur Relationnel Souverain                 |
| `documentation/docs/02-la-suite/01-applications/02-communication-et-echange/meet.mdx`                       | **Meet**                              | Meet — Visioconférence Sécurisée LiveKit              |
| `documentation/docs/02-la-suite/01-applications/02-communication-et-echange/tchap.mdx`                      | **Tchap**                             | Tchap — Messagerie Instantanée Matrix                 |
| `documentation/docs/02-la-suite/01-applications/02-communication-et-echange/transfers.mdx`                  | **Transfers**                         | Transfers — Partage Sécurisé de Gros Fichiers         |
| `documentation/docs/02-la-suite/01-applications/03-gestion-et-utilisateurs/accounts.mdx`                    | **Accounts**                          | Accounts — Gestion des Comptes & Profils              |
| `documentation/docs/02-la-suite/01-applications/03-gestion-et-utilisateurs/people.mdx`                      | **People**                            | People — Annuaire Interministériel des Agents         |
| `documentation/docs/02-la-suite/01-applications/03-gestion-et-utilisateurs/projects.mdx`                    | **Projects**                          | Projects — Gestion de Tâches & Projets                |
| `documentation/docs/02-la-suite/01-applications/index.mdx`                                                  | **Applications**                      | Écosystème des Applications La Suite                  |
| `documentation/docs/02-la-suite/02-architecture/01-securite-et-identite/auth.mdx`                           | **Authentification SSO**              | Authentification SSO & Sessions Django                |
| `documentation/docs/02-la-suite/02-architecture/01-securite-et-identite/federation-identite-proconnect.mdx` | **ProConnect OIDC**                   | Fédération d'Identité & ProConnect OIDC               |
| `documentation/docs/02-la-suite/02-architecture/01-securite-et-identite/secrets-sops.mdx`                   | **Secrets SOPS**                      | Gestion Sécurisée des Secrets avec SOPS & age         |
| `documentation/docs/02-la-suite/02-architecture/02-donnees-et-temps-reel/flux-stockage-s3.mdx`              | **Stockage S3**                       | Stockage Objet S3 & MinIO Souverain                   |
| `documentation/docs/02-la-suite/02-architecture/02-donnees-et-temps-reel/sauvegardes-et-restauration.mdx`   | **Sauvegardes & PRA**                 | Stratégie de Sauvegardes & Plan de Reprise d'Activité |
| `documentation/docs/02-la-suite/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt.mdx`            | **Temps Réel & CRDT**                 | Collaboration Temps Réel & CRDTs Yjs                  |
| `documentation/docs/02-la-suite/02-architecture/03-devops-et-deploiement/cicd-github-actions.mdx`           | **CI/CD Actions**                     | Pipelines CI/CD GitHub Actions                        |
| `documentation/docs/02-la-suite/02-architecture/03-devops-et-deploiement/deploiement-production.mdx`        | **Déploiement Prod**                  | Architecture & Déploiement en Production              |
| `documentation/docs/02-la-suite/02-architecture/03-devops-et-deploiement/env.mdx`                           | **Environnement**                     | Gestion des Variables d'Environnement (.env)          |
| `documentation/docs/02-la-suite/02-architecture/03-devops-et-deploiement/hot-reload.mdx`                    | **Hot Reload**                        | Développement Local & Hot Reload Docker               |
| `documentation/docs/02-la-suite/02-architecture/index.mdx`                                                  | **Architecture**                      | Architecture Globale de La Suite Numérique            |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/accessibilite-rgaa.mdx`                      | **Accessibilité RGAA**                | Accessibilité Numérique & Conformité RGAA v4.1        |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/couleurs-et-themes.mdx`                      | **Couleurs & Thèmes**                 | Palette de Couleurs & Tokens de Thème                 |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/figma.mdx`                                   | **Figma**                             | Ressources Design & Kits UI Figma                     |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/icones.mdx`                                  | **Icônes**                            | Système d'Icônes RemixIcon & Lucide                   |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/installation.mdx`                            | **Installation**                      | Installation de React DSFR & Cunningham               |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/typographie.mdx`                             | **Typographie**                       | Typographie Marianne & Échelle de Texte               |
| `documentation/docs/02-la-suite/03-design-system/02-composants/alertes-et-callouts.mdx`                     | **Alertes & Callouts**                | Composants Alertes & Callouts                         |
| `documentation/docs/02-la-suite/03-design-system/02-composants/badges-et-statuts.mdx`                       | **Badges & Statuts**                  | Composants Badges & Indicateurs de Statut             |
| `documentation/docs/02-la-suite/03-design-system/02-composants/boutons.mdx`                                 | **Boutons**                           | Composants Boutons & Liens d'Action                   |
| `documentation/docs/02-la-suite/03-design-system/02-composants/cartes-et-conteneurs.mdx`                    | **Cartes & Conteneurs**               | Composants Cartes & Conteneurs                        |
| `documentation/docs/02-la-suite/03-design-system/02-composants/formulaires.mdx`                             | **Formulaires**                       | Composants Formulaires & Champs de Saisie             |
| `documentation/docs/02-la-suite/03-design-system/02-composants/modales-et-dialogues.mdx`                    | **Modales & Dialogues**               | Composants Modales & Dialogues Accessibles            |
| `documentation/docs/02-la-suite/03-design-system/02-composants/notices-et-bandeaux.mdx`                     | **Notices & Bandeaux**                | Composants Notices & Bandeaux d'Information           |
| `documentation/docs/02-la-suite/03-design-system/02-composants/pagination-et-stepper.mdx`                   | **Pagination & Stepper**              | Composants Pagination & Steppers d'Étapes             |
| `documentation/docs/02-la-suite/03-design-system/02-composants/tableaux.mdx`                                | **Tableaux**                          | Composants Tableaux de Données Accessibles            |
| `documentation/docs/02-la-suite/03-design-system/03-layout-et-structure/navigation-et-layout.mdx`           | **Navigation & Layout**               | Structure de Page & En-tête / Pied de Page            |
| `documentation/docs/02-la-suite/03-design-system/index.mdx`                                                 | **Design System**                     | Design System — DSFR & Cunningham                     |
| `documentation/docs/02-la-suite/04-ressources/communaute.mdx`                                               | **Communauté**                        | Communauté & Canaux d'Échange                         |
| `documentation/docs/02-la-suite/04-ressources/roadmap.mdx`                                                  | **Roadmap**                           | Roadmap Produit & Évolutions La Suite                 |
| `documentation/docs/02-la-suite/04-ressources/templates-et-outils.mdx`                                      | **Templates & Outils**                | Boîte à Outils & Gabarits de Code                     |
| `documentation/docs/02-la-suite/index.mdx`                                                                  | **La Suite**                          | Vue d'Ensemble de La Suite Numérique                  |

### 📂 Section : `03-slasheurs-france` (81 fichiers)

| Chemin du Fichier                                                                                            | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                                                               |
| :----------------------------------------------------------------------------------------------------------- | :------------------------------------ | :---------------------------------------------------------------------------------------- |
| `documentation/docs/03-slasheurs-france/00-socle-technique.mdx`                                              | **Socle Technique**                   | Socle Technique & Architecture des Connecteurs                                            |
| `documentation/docs/03-slasheurs-france/01-architecture-standardisee.mdx`                                    | **Architecture Standard**             | Architecture Standardisée des Slasheurs                                                   |
| `documentation/docs/03-slasheurs-france/01-loi/01-metier-loi/01-fondations-et-cadre.mdx`                     | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Loi (Légifrance)                              |
| `documentation/docs/03-slasheurs-france/01-loi/01-metier-loi/02-cas-usage-et-scenarios.mdx`                  | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Loi (Légifrance)                                |
| `documentation/docs/03-slasheurs-france/01-loi/02-api-loi/01-benchmark-des-apis.mdx`                         | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Loi (Légifrance)                                  |
| `documentation/docs/03-slasheurs-france/01-loi/02-api-loi/02-specifications-techniques.mdx`                  | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Loi (Légifrance)                                  |
| `documentation/docs/03-slasheurs-france/01-loi/03-implementation-loi/01-provider-django.mdx`                 | **Provider Django**                   | Implémentation Provider Django — Slasheur Loi (Légifrance)                                |
| `documentation/docs/03-slasheurs-france/01-loi/03-implementation-loi/02-rendu-et-settings.mdx`               | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Loi (Légifrance)                                   |
| `documentation/docs/03-slasheurs-france/01-loi/index.mdx`                                                    | **Slasheur Loi**                      | Slasheur Loi (Légifrance) — Vue d'Ensemble & Guide                                        |
| `documentation/docs/03-slasheurs-france/02-assemblee/01-metier-assemblee/01-fondations-et-cadre.mdx`         | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Assemblée Nationale                           |
| `documentation/docs/03-slasheurs-france/02-assemblee/01-metier-assemblee/02-cas-usage-et-scenarios.mdx`      | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Assemblée Nationale                             |
| `documentation/docs/03-slasheurs-france/02-assemblee/02-api-assemblee/01-benchmark-des-apis.mdx`             | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Assemblée Nationale                               |
| `documentation/docs/03-slasheurs-france/02-assemblee/02-api-assemblee/02-specifications-techniques.mdx`      | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Assemblée Nationale                               |
| `documentation/docs/03-slasheurs-france/02-assemblee/03-implementation-assemblee/01-provider-django.mdx`     | **Provider Django**                   | Implémentation Provider Django — Slasheur Assemblée Nationale                             |
| `documentation/docs/03-slasheurs-france/02-assemblee/03-implementation-assemblee/02-rendu-et-settings.mdx`   | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Assemblée Nationale                                |
| `documentation/docs/03-slasheurs-france/02-assemblee/index.mdx`                                              | **Slasheur Assemblée**                | Slasheur Assemblée Nationale — Vue d'Ensemble & Guide                                     |
| `documentation/docs/03-slasheurs-france/02-composant-customblock-unique.mdx`                                 | **Composant CustomBlock**             | Composant CustomBlock Unique BlockNote                                                    |
| `documentation/docs/03-slasheurs-france/03-entreprise/01-metier-entreprise/01-fondations-et-cadre.mdx`       | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Entreprises (Recherche Entreprises & Pappers) |
| `documentation/docs/03-slasheurs-france/03-entreprise/01-metier-entreprise/02-cas-usage-et-scenarios.mdx`    | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Entreprises (Recherche Entreprises & Pappers)   |
| `documentation/docs/03-slasheurs-france/03-entreprise/02-api-entreprise/01-benchmark-des-apis.mdx`           | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Entreprises (Recherche Entreprises & Pappers)     |
| `documentation/docs/03-slasheurs-france/03-entreprise/02-api-entreprise/02-specifications-techniques.mdx`    | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Entreprises (Recherche Entreprises & Pappers)     |
| `documentation/docs/03-slasheurs-france/03-entreprise/03-implementation-entreprise/01-provider-django.mdx`   | **Provider Django**                   | Implémentation Provider Django — Slasheur Entreprises (Recherche Entreprises & Pappers)   |
| `documentation/docs/03-slasheurs-france/03-entreprise/03-implementation-entreprise/02-rendu-et-settings.mdx` | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Entreprises (Recherche Entreprises & Pappers)      |
| `documentation/docs/03-slasheurs-france/03-entreprise/index.mdx`                                             | **Slasheur Entreprises**              | Slasheur Entreprises (Recherche Entreprises & Pappers) — Vue d'Ensemble & Guide           |
| `documentation/docs/03-slasheurs-france/03-proxy-backend-et-cache.mdx`                                       | **Proxy & Cache**                     | Proxy Backend Sécurisé & Stratégie de Cache                                               |
| `documentation/docs/03-slasheurs-france/04-adresse/01-metier-adresse/01-fondations-et-cadre.mdx`             | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Adresse (Base Adresse Nationale)              |
| `documentation/docs/03-slasheurs-france/04-adresse/01-metier-adresse/02-cas-usage-et-scenarios.mdx`          | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Adresse (Base Adresse Nationale)                |
| `documentation/docs/03-slasheurs-france/04-adresse/02-api-adresse/01-benchmark-des-apis.mdx`                 | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Adresse (Base Adresse Nationale)                  |
| `documentation/docs/03-slasheurs-france/04-adresse/02-api-adresse/02-specifications-techniques.mdx`          | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Adresse (Base Adresse Nationale)                  |
| `documentation/docs/03-slasheurs-france/04-adresse/03-implementation-adresse/01-provider-django.mdx`         | **Provider Django**                   | Implémentation Provider Django — Slasheur Adresse (Base Adresse Nationale)                |
| `documentation/docs/03-slasheurs-france/04-adresse/03-implementation-adresse/02-rendu-et-settings.mdx`       | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Adresse (Base Adresse Nationale)                   |
| `documentation/docs/03-slasheurs-france/04-adresse/index.mdx`                                                | **Slasheur Adresse**                  | Slasheur Adresse (Base Adresse Nationale) — Vue d'Ensemble & Guide                        |
| `documentation/docs/03-slasheurs-france/04-tutoriel-ajouter-une-api.mdx`                                     | **Tutoriel Nouvelle API**             | Tutoriel : Ajouter une Nouvelle API Souveraine                                            |
| `documentation/docs/03-slasheurs-france/05-albert/01-metier-albert/01-fondations-et-cadre.mdx`               | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Albert (IA Générative Souveraine)             |
| `documentation/docs/03-slasheurs-france/05-albert/01-metier-albert/02-cas-usage-et-scenarios.mdx`            | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Albert (IA Générative Souveraine)               |
| `documentation/docs/03-slasheurs-france/05-albert/02-api-albert/01-benchmark-des-apis.mdx`                   | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Albert (IA Générative Souveraine)                 |
| `documentation/docs/03-slasheurs-france/05-albert/02-api-albert/02-specifications-techniques.mdx`            | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Albert (IA Générative Souveraine)                 |
| `documentation/docs/03-slasheurs-france/05-albert/03-implementation-albert/01-provider-django.mdx`           | **Provider Django**                   | Implémentation Provider Django — Slasheur Albert (IA Générative Souveraine)               |
| `documentation/docs/03-slasheurs-france/05-albert/03-implementation-albert/02-rendu-et-settings.mdx`         | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Albert (IA Générative Souveraine)                  |
| `documentation/docs/03-slasheurs-france/05-albert/index.mdx`                                                 | **Slasheur Albert**                   | Slasheur Albert (IA Générative Souveraine) — Vue d'Ensemble & Guide                       |
| `documentation/docs/03-slasheurs-france/05-proposition.md`                                                   | **Proposition Sources**               | Proposition & Spécifications Initiales des Sources                                        |
| `documentation/docs/03-slasheurs-france/06-sdk-developpeur/index.mdx`                                        | **SDK Développeur**                   | SDK Développeur pour Slasheurs Souverains                                                 |
| `documentation/docs/03-slasheurs-france/07-roadmap.mdx`                                                      | **Roadmap Connecteurs**               | Feuille de Route des Connecteurs Souverains                                               |
| `documentation/docs/03-slasheurs-france/08-marche/01-metier-marche/01-fondations-et-cadre.mdx`               | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Marchés Publics (BOAMP)                       |
| `documentation/docs/03-slasheurs-france/08-marche/01-metier-marche/02-cas-usage-et-scenarios.mdx`            | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Marchés Publics (BOAMP)                         |
| `documentation/docs/03-slasheurs-france/08-marche/02-api-marche/01-benchmark-des-apis.mdx`                   | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Marchés Publics (BOAMP)                           |
| `documentation/docs/03-slasheurs-france/08-marche/02-api-marche/02-specifications-techniques.mdx`            | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Marchés Publics (BOAMP)                           |
| `documentation/docs/03-slasheurs-france/08-marche/03-implementation-marche/01-provider-django.mdx`           | **Provider Django**                   | Implémentation Provider Django — Slasheur Marchés Publics (BOAMP)                         |
| `documentation/docs/03-slasheurs-france/08-marche/03-implementation-marche/02-rendu-et-settings.mdx`         | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Marchés Publics (BOAMP)                            |
| `documentation/docs/03-slasheurs-france/08-marche/index.mdx`                                                 | **Slasheur Marchés**                  | Slasheur Marchés Publics (BOAMP) — Vue d'Ensemble & Guide                                 |
| `documentation/docs/03-slasheurs-france/09-subvention/01-metier-subvention/01-fondations-et-cadre.mdx`       | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Subventions Publiques                         |
| `documentation/docs/03-slasheurs-france/09-subvention/01-metier-subvention/02-cas-usage-et-scenarios.mdx`    | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Subventions Publiques                           |
| `documentation/docs/03-slasheurs-france/09-subvention/02-api-subvention/01-benchmark-des-apis.mdx`           | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Subventions Publiques                             |
| `documentation/docs/03-slasheurs-france/09-subvention/02-api-subvention/02-specifications-techniques.mdx`    | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Subventions Publiques                             |
| `documentation/docs/03-slasheurs-france/09-subvention/03-implementation-subvention/01-provider-django.mdx`   | **Provider Django**                   | Implémentation Provider Django — Slasheur Subventions Publiques                           |
| `documentation/docs/03-slasheurs-france/09-subvention/03-implementation-subvention/02-rendu-et-settings.mdx` | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Subventions Publiques                              |
| `documentation/docs/03-slasheurs-france/09-subvention/index.mdx`                                             | **Slasheur Subventions**              | Slasheur Subventions Publiques — Vue d'Ensemble & Guide                                   |
| `documentation/docs/03-slasheurs-france/10-stats/01-metier-stats/01-fondations-et-cadre.mdx`                 | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Statistiques (Insee)                          |
| `documentation/docs/03-slasheurs-france/10-stats/01-metier-stats/02-cas-usage-et-scenarios.mdx`              | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Statistiques (Insee)                            |
| `documentation/docs/03-slasheurs-france/10-stats/02-api-stats/01-benchmark-des-apis.mdx`                     | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Statistiques (Insee)                              |
| `documentation/docs/03-slasheurs-france/10-stats/02-api-stats/02-specifications-techniques.mdx`              | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Statistiques (Insee)                              |
| `documentation/docs/03-slasheurs-france/10-stats/03-implementation-stats/01-provider-django.mdx`             | **Provider Django**                   | Implémentation Provider Django — Slasheur Statistiques (Insee)                            |
| `documentation/docs/03-slasheurs-france/10-stats/03-implementation-stats/02-rendu-et-settings.mdx`           | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Statistiques (Insee)                               |
| `documentation/docs/03-slasheurs-france/10-stats/index.mdx`                                                  | **Slasheur Statistiques**             | Slasheur Statistiques (Insee) — Vue d'Ensemble & Guide                                    |
| `documentation/docs/03-slasheurs-france/11-agent/01-metier-agent/01-fondations-et-cadre.mdx`                 | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Annuaire des Agents Publics                   |
| `documentation/docs/03-slasheurs-france/11-agent/01-metier-agent/02-cas-usage-et-scenarios.mdx`              | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Annuaire des Agents Publics                     |
| `documentation/docs/03-slasheurs-france/11-agent/02-api-agent/01-benchmark-des-apis.mdx`                     | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Annuaire des Agents Publics                       |
| `documentation/docs/03-slasheurs-france/11-agent/02-api-agent/02-specifications-techniques.mdx`              | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Annuaire des Agents Publics                       |
| `documentation/docs/03-slasheurs-france/11-agent/03-implementation-agent/01-provider-django.mdx`             | **Provider Django**                   | Implémentation Provider Django — Slasheur Annuaire des Agents Publics                     |
| `documentation/docs/03-slasheurs-france/11-agent/03-implementation-agent/02-rendu-et-settings.mdx`           | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Annuaire des Agents Publics                        |
| `documentation/docs/03-slasheurs-france/11-agent/index.mdx`                                                  | **Slasheur Agents**                   | Slasheur Annuaire des Agents Publics — Vue d'Ensemble & Guide                             |
| `documentation/docs/03-slasheurs-france/12-cadastre/01-metier-cadastre/01-fondations-et-cadre.mdx`           | **Fondations & Cadre**                | Fondations & Cadre Réglementaire — Slasheur Cadastre & Parcelles                          |
| `documentation/docs/03-slasheurs-france/12-cadastre/01-metier-cadastre/02-cas-usage-et-scenarios.mdx`        | **Cas d'Usage**                       | Cas d'Usage & Scénarios Métier — Slasheur Cadastre & Parcelles                            |
| `documentation/docs/03-slasheurs-france/12-cadastre/02-api-cadastre/01-benchmark-des-apis.mdx`               | **Benchmark APIs**                    | Benchmark des APIs & Sources — Slasheur Cadastre & Parcelles                              |
| `documentation/docs/03-slasheurs-france/12-cadastre/02-api-cadastre/02-specifications-techniques.mdx`        | **Spécifications Endpoints**          | Spécifications des Endpoints — Slasheur Cadastre & Parcelles                              |
| `documentation/docs/03-slasheurs-france/12-cadastre/03-implementation-cadastre/01-provider-django.mdx`       | **Provider Django**                   | Implémentation Provider Django — Slasheur Cadastre & Parcelles                            |
| `documentation/docs/03-slasheurs-france/12-cadastre/03-implementation-cadastre/02-rendu-et-settings.mdx`     | **Rendu & Réglages**                  | Rendu Tri-Format & Réglages — Slasheur Cadastre & Parcelles                               |
| `documentation/docs/03-slasheurs-france/12-cadastre/index.mdx`                                               | **Slasheur Cadastre**                 | Slasheur Cadastre & Parcelles — Vue d'Ensemble & Guide                                    |
| `documentation/docs/03-slasheurs-france/13-reutilisation-transverse.mdx`                                     | **Réutilisation Transverse**          | Guide de Réutilisation Transverse dans La Suite                                           |
| `documentation/docs/03-slasheurs-france/14-retour-d-experience.mdx`                                          | **Retour d'Expérience**               | Retour d'Expérience & Bonnes Pratiques d'Intégration                                      |
| `documentation/docs/03-slasheurs-france/index.mdx`                                                           | **Slasheurs Souverains**              | Socle des Sources & Slasheurs Souverains                                                  |

### 📂 Section : `Racine` (1 fichiers)

| Chemin du Fichier              | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                      |
| :----------------------------- | :------------------------------------ | :----------------------------------------------- |
| `documentation/docs/index.mdx` | **Accueil**                           | Portail de Documentation & Socle Souverain DINUM |

---

## 🌍 4. Portail International (`documentation-international/docs/`)

Total : **29 fichiers**

### 📂 Section : `00-overview` (5 fichiers)

| Chemin du Fichier                                                        | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                                |
| :----------------------------------------------------------------------- | :------------------------------------ | :--------------------------------------------------------- |
| `documentation-international/docs/00-overview/05-toml-frontmatter.mdx`   | **TOML Frontmatter**                  | TOML Frontmatter Support & Metadata Standards              |
| `documentation-international/docs/00-overview/architecture-3-tier.mdx`   | **3-Tier Architecture**               | 3-Tier Architecture & System Overview                      |
| `documentation-international/docs/00-overview/engineering-standards.mdx` | **Engineering Standards**             | Universal Engineering Standards & Quality Gates            |
| `documentation-international/docs/00-overview/index.mdx`                 | **Overview**                          | Overview — Universal Connected Data Standard for BlockNote |
| `documentation-international/docs/00-overview/international-vision.mdx`  | **International Vision**              | International Vision & Sovereign Data Federation           |

### 📂 Section : `01-blocknote-extension` (6 fichiers)

| Chemin du Fichier                                                                      | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                          |
| :------------------------------------------------------------------------------------- | :------------------------------------ | :--------------------------------------------------- |
| `documentation-international/docs/01-blocknote-extension/3-display-formats.mdx`        | **Display Formats**                   | 3 Display Formats — Inline, Card & Embed             |
| `documentation-international/docs/01-blocknote-extension/consumer-migration-guide.mdx` | **Migration Guide**                   | Consumer Migration Guide & Version Upgrades          |
| `documentation-international/docs/01-blocknote-extension/document-exports.mdx`         | **Document Exports**                  | Native Vector Document Exports (PDF, HTML, Markdown) |
| `documentation-international/docs/01-blocknote-extension/floating-search-popover.mdx`  | **Search Popover**                    | Accessible Floating Search Popover                   |
| `documentation-international/docs/01-blocknote-extension/index.mdx`                    | **BlockNote Extension**               | BlockNote Extension & UI Components                  |
| `documentation-international/docs/01-blocknote-extension/styling-and-themes.mdx`       | **Themes & Styling**                  | Themes, Tokens & Custom Styling                      |

### 📂 Section : `02-provider-sdk` (4 fichiers)

| Chemin du Fichier                                                               | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                                |
| :------------------------------------------------------------------------------ | :------------------------------------ | :--------------------------------------------------------- |
| `documentation-international/docs/02-provider-sdk/build-provider-in-15-min.mdx` | **15-Min Quickstart**                 | Quickstart Tutorial: Build a Source Provider in 15 Minutes |
| `documentation-international/docs/02-provider-sdk/define-source-provider.mdx`   | **Define Source Provider**            | Defining a Source Provider Interface & Methods             |
| `documentation-international/docs/02-provider-sdk/index.mdx`                    | **SDK Overview**                      | TypeScript SDK — Overview & Contracts                      |
| `documentation-international/docs/02-provider-sdk/typescript-contracts.mdx`     | **TypeScript Contracts**              | TypeScript Data Contracts, Schemas & Types                 |

### 📂 Section : `03-backend-proxy` (4 fichiers)

| Chemin du Fichier                                                               | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                      |
| :------------------------------------------------------------------------------ | :------------------------------------ | :----------------------------------------------- |
| `documentation-international/docs/03-backend-proxy/defensive-security-ssrf.mdx` | **Defensive Security**                | Defensive Security, Anti-SSRF & Circuit Breakers |
| `documentation-international/docs/03-backend-proxy/deterministic-cache.mdx`     | **Deterministic Cache**               | Deterministic Caching & Resilience Strategies    |
| `documentation-international/docs/03-backend-proxy/index.mdx`                   | **Proxy Architecture**                | Backend Proxy — Architecture & Security          |
| `documentation-international/docs/03-backend-proxy/quota-and-rate-limiting.mdx` | **Quotas & Rate Limiting**            | Quota Management & Token Bucket Rate Limiting    |

### 📂 Section : `04-presets` (7 fichiers)

| Chemin du Fichier                                                 | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                                         |
| :---------------------------------------------------------------- | :------------------------------------ | :------------------------------------------------------------------ |
| `documentation-international/docs/04-presets/canada.mdx`          | **Canada**                            | Canada Open Data & Sovereign Preset (Open Government)               |
| `documentation-international/docs/04-presets/european-union.mdx`  | **European Union**                    | European Union Open Data & EUR-Lex Preset                           |
| `documentation-international/docs/04-presets/germany-bund.mdx`    | **Germany (Bund)**                    | Germany Federal Open Data Preset (GovData / Bund)                   |
| `documentation-international/docs/04-presets/index.mdx`           | **Presets Overview**                  | Multi-Country Sovereign Presets & Catalogs                          |
| `documentation-international/docs/04-presets/international.mdx`   | **International**                     | International & Multilateral Organizations Preset (UN / World Bank) |
| `documentation-international/docs/04-presets/netherlands-gov.mdx` | **Netherlands (Gov)**                 | Netherlands Open Data Preset (data.overheid.nl)                     |
| `documentation-international/docs/04-presets/spain-boe.mdx`       | **Spain (BOE)**                       | Spain Official Gazette & Open Data Preset (BOE / datos.gob.es)      |

### 📂 Section : `05-rfc-upstream` (2 fichiers)

| Chemin du Fichier                                                                  | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                         |
| :--------------------------------------------------------------------------------- | :------------------------------------ | :-------------------------------------------------- |
| `documentation-international/docs/05-rfc-upstream/blocknote-rfc-specification.mdx` | **BlockNote RFC**                     | BlockNote External Sources RFC Specification        |
| `documentation-international/docs/05-rfc-upstream/index.mdx`                       | **RFC Overview**                      | Upstream RFCs & BlockNote Standardization Proposals |

### 📂 Section : `Racine` (1 fichiers)

| Chemin du Fichier                            | Nom dans la Sidebar (`sidebar_label`) | Titre Métadonnées (`title`)                  |
| :------------------------------------------- | :------------------------------------ | :------------------------------------------- |
| `documentation-international/docs/index.mdx` | **Home**                              | Slasher Open Standard — Documentation Portal |

---

## 🏛️ 5. Rapports d'Architecture & Spécifications Internes (`docs/`)

Total : **10 fichiers**

| Chemin du Fichier                                    | Nom / Fichier                                 | Titre du Document                                                                                                       |
| :--------------------------------------------------- | :-------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `docs/BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md` | BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md | 🧱 BlockNote & Zudoku Rendering Primitives & Architectural Evaluation (`BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md`) |
| `docs/DEPENDENCY_SECURITY_AND_OVERRIDES.md`          | DEPENDENCY_SECURITY_AND_OVERRIDES.md          | 🛡️ Dependency Security, Advisories & Package Overrides (`DEPENDENCY_SECURITY_AND_OVERRIDES.md`)                         |
| `docs/DINUM_SKILLS_VERIFICATION_REPORT.md`           | DINUM_SKILLS_VERIFICATION_REPORT.md           | 🎨 DINUM Engineering Skills Re-Audit & Final Verification (`DINUM_SKILLS_VERIFICATION_REPORT.md`)                       |
| `docs/DISTRIBUTION_MANIFEST.json`                    | DISTRIBUTION_MANIFEST.json                    | (Non défini)                                                                                                            |
| `docs/END_TO_END_RECIPE_REPORT.md`                   | END_TO_END_RECIPE_REPORT.md                   | 🧪 End-to-End Recipe & Validation Scenarios Report (`END_TO_END_RECIPE_REPORT.md`)                                      |
| `docs/GITIGNORE_AND_ARTIFACTS_AUDIT.md`              | GITIGNORE_AND_ARTIFACTS_AUDIT.md              | 🛡️ Gitignore, Secrets & Execution Artifacts Audit (`GITIGNORE_AND_ARTIFACTS_AUDIT.md`)                                  |
| `docs/MIGRATION_AND_REMEDIATION_ASSESSMENT.md`       | MIGRATION_AND_REMEDIATION_ASSESSMENT.md       | 📑 Remediations & Migration Assessment (AUD-001 to AUD-018)                                                             |
| `docs/PORTALS_AND_BUILD_VERIFICATION.md`             | PORTALS_AND_BUILD_VERIFICATION.md             | 📚 Portals & Build Verification Report (`PORTALS_AND_BUILD_VERIFICATION.md`)                                            |
| `docs/UI_ACCESSIBILITY_AND_DESIGN_SYSTEM_MAPPING.md` | UI_ACCESSIBILITY_AND_DESIGN_SYSTEM_MAPPING.md | 🎨 UI, Accessibility & Design System Mapping (`UI_MAPPING.md`)                                                          |
| `docs/UI_ACCESSIBILITY_AND_RECIPE.md`                | UI_ACCESSIBILITY_AND_RECIPE.md                | ♿ UI Accessibility Audit & Screen Reader Verification (`UI_ACCESSIBILITY_AND_RECIPE.md`)                               |
