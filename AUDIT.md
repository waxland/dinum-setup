# 📑 Audit & Révision des Titres de Navigation (Portails DINUM)

Ce document liste l'ensemble des titres de pages et des catégories de navigation révisés pour respecter la règle de concision : **maximum 2 mots par titre**, afin de garantir une lisibilité optimale sans troncature dans la barre latérale de navigation Zudoku.

---

## 🎯 Synthèse des Modifications

- **Portail International (`documentation-international`) :** 27 pages mises à jour
- **Portail National FR (`documentation`) :** 179 pages mises à jour
- **Total général :** 206 pages documentaires révisées
- **Règle appliquée :** Titre court (<= 2 mots), suppression du verbiage technique long dans la navigation, conservation des descriptions riches dans les métadonnées SEO (`description`).

---

## 💡 0. Règle Zudoku & Suppression des Doublons de Titres (H1)

> ⚠️ **Comportement Zudoku / SSR :** Zudoku génère et affiche automatiquement le titre principal de la page à partir du champ \`title\` situé dans le frontmatter YAML (métadonnées en haut de chaque fichier Markdown/MDX).
>
> **Bonne pratique et correction effectuée :**
>
> - **Aucun premier titre H1 (\`# Titre\`) manuel dans le corps du texte :** 63 fichiers comportaient un titre H1 redondant qui faisait doublon visuel immédiat avec le titre injecté par le layout Zudoku.
> - **Suppression systématique des H1 redondants :** Tous les premiers titres H1 manuels ont été retirés du corps des fichiers MDX, laissant le titre de métadonnées gérer le rendu propre du haut de page.
> - **Sous-titres :** Le contenu du document commence directement par l'introduction ou des sous-sections sémantiques (\`## Section\`, \`### Sous-section\`).

---

## 📊 0.bis Règle des Diagrammes : Utilisation Exclusive de \`<Mermaid />\`

> ⚠️ **Standard MDX / Zudoku :** Ne jamais utiliser les blocs Markdown bruts \`\`\`mermaid\`\`\` dans les fichiers MDX. Il faut utiliser le composant React dédié \`<Mermaid chart={\`...\`} />\` fourni dans la librairie de composants partagés (\`./src/components\`).
>
> **Pourquoi cette règle ?**
>
> - Les blocs bruts \`\`\`mermaid\`\`\` peuvent être rendus comme de simples blocs de code texte ou provoquer des incohérences de thème (mode clair / mode sombre).
> - Le composant \`<Mermaid />\` gère dynamiquement le rendu SVG vectoriel interactif, le centrage, la gestion du zoom et l'adaptation automatique aux thèmes sombre et clair de La Suite Numérique.
>
> **Fichiers audités et migrés vers \`<Mermaid chart={\`...\`} />\` (17 fichiers) :**
>
> 🇫🇷 **Portail National FR (\`documentation/docs\`) :**
>
> 1. \`documentation/docs/01-onboarding/02-workflow-et-contribution/bonnes-pratiques-dinum.mdx\`
> 2. \`documentation/docs/01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite.mdx\`
> 3. \`documentation/docs/01-onboarding/index.mdx\`
> 4. \`documentation/docs/02-la-suite/index.mdx\`
> 5. \`documentation/docs/03-slasheurs-france/13-reutilisation-transverse.mdx\`
> 6. \`documentation/docs/03-slasheurs-france/14-retour-d-experience.mdx\`
>
> 🌍 **Portail International (\`documentation-international/docs\`) :** 7. \`documentation-international/docs/00-overview/architecture-3-tier.mdx\` 8. \`documentation-international/docs/00-overview/engineering-standards.mdx\` 9. \`documentation-international/docs/00-overview/index.mdx\` 10. \`documentation-international/docs/00-overview/international-vision.mdx\` 11. \`documentation-international/docs/01-blocknote-extension/3-display-formats.mdx\` 12. \`documentation-international/docs/03-backend-proxy/defensive-security-ssrf.mdx\` 13. \`documentation-international/docs/03-backend-proxy/deterministic-cache.mdx\` 14. \`documentation-international/docs/03-backend-proxy/index.mdx\` 15. \`documentation-international/docs/03-backend-proxy/quota-and-rate-limiting.mdx\` 16. \`documentation-international/docs/05-rfc-upstream/index.mdx\` 17. \`documentation-international/docs/index.mdx\`

---

## 🌍 1. Portail International (`documentation-international`)

| Fichier                                                                               | Ancien Titre (Complet / Long)                                             | Nouveau Titre (Max 2 Mots) |  Statut   |
| :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------ | :------------------------- | :-------: |
| `documentation-international/docs/00-overview/architecture-3-tier.mdx`                | 3-Tier Architecture Pattern                                               | **Architecture**           | ✅ Validé |
| `documentation-international/docs/00-overview/engineering-standards.mdx`              | Engineering Standards & Quality Guidelines (DINUM / beta.gouv / La Suite) | **Standards**              | ✅ Validé |
| `documentation-international/docs/00-overview/index.mdx`                              | The Universal Connected Data Standard                                     | **Overview**               | ✅ Validé |
| `documentation-international/docs/00-overview/international-vision.mdx`               | Multi-Country Extensibility Model                                         | **Vision**                 | ✅ Validé |
| `documentation-international/docs/01-blocknote-extension/3-display-formats.mdx`       | 3 Switchable Display Formats                                              | **Formats**                | ✅ Validé |
| `documentation-international/docs/01-blocknote-extension/document-exports.mdx`        | Lossless Document Exporters (PDF, DOCX, ODF)                              | **Exports**                | ✅ Validé |
| `documentation-international/docs/01-blocknote-extension/floating-search-popover.mdx` | Floating Search Popover & WAI-ARIA Accessibility                          | **Popover**                | ✅ Validé |
| `documentation-international/docs/01-blocknote-extension/index.mdx`                   | Getting Started with @slasher/blocknote                                   | **Extension**              | ✅ Validé |
| `documentation-international/docs/01-blocknote-extension/styling-and-themes.mdx`      | Custom Styling & Theme Integration                                        | **Thèmes**                 | ✅ Validé |
| `documentation-international/docs/02-provider-sdk/build-provider-in-15-min.mdx`       | Build a Sovereign Country Connector in 15 Minutes                         | **Tutoriel**               | ✅ Validé |
| `documentation-international/docs/02-provider-sdk/define-source-provider.mdx`         | defineSourceProvider() Schema Helper                                      | **Provider**               | ✅ Validé |
| `documentation-international/docs/02-provider-sdk/index.mdx`                          | Slasher Provider SDK                                                      | **SDK**                    | ✅ Validé |
| `documentation-international/docs/02-provider-sdk/typescript-contracts.mdx`           | TypeScript Contracts & DTO Reference                                      | **Types**                  | ✅ Validé |
| `documentation-international/docs/03-backend-proxy/defensive-security-ssrf.mdx`       | Defensive Anti-SSRF Security & Circuit Breaker                            | **Sécurité**               | ✅ Validé |
| `documentation-international/docs/03-backend-proxy/deterministic-cache.mdx`           | Deterministic Redis Caching Strategy                                      | **Cache**                  | ✅ Validé |
| `documentation-international/docs/03-backend-proxy/index.mdx`                         | Backend Proxy & Deterministic Caching                                     | **Proxy**                  | ✅ Validé |
| `documentation-international/docs/03-backend-proxy/quota-and-rate-limiting.mdx`       | Distributed Quota Management & Circuit Breaker Resilience                 | **Quotas**                 | ✅ Validé |
| `documentation-international/docs/04-presets/canada.mdx`                              | 🇨🇦 Canada Sovereign Slasher Preset                                        | **Canada**                 | ✅ Validé |
| `documentation-international/docs/04-presets/european-union.mdx`                      | 🇪🇺 European Union Slasher Preset                                          | **Europe**                 | ✅ Validé |
| `documentation-international/docs/04-presets/germany-bund.mdx`                        | 🇩🇪 Germany Sovereign Slasher Preset                                       | **Allemagne**              | ✅ Validé |
| `documentation-international/docs/04-presets/index.mdx`                               | Multi-Country Sovereign Presets                                           | **Presets**                | ✅ Validé |
| `documentation-international/docs/04-presets/international.mdx`                       | 🌍 International Organizations Sovereign Slasher Preset                   | **International**          | ✅ Validé |
| `documentation-international/docs/04-presets/netherlands-gov.mdx`                     | 🇳🇱 Netherlands Sovereign Slasher Preset                                   | **Pays-Bas**               | ✅ Validé |
| `documentation-international/docs/04-presets/spain-boe.mdx`                           | 🇪🇸 Spain Sovereign Slasher Preset                                         | **Espagne**                | ✅ Validé |
| `documentation-international/docs/05-rfc-upstream/blocknote-rfc-specification.mdx`    | BlockNote RFC: Standardized Connected Data Blocks                         | **Spécification**          | ✅ Validé |
| `documentation-international/docs/05-rfc-upstream/index.mdx`                          | TypeCellOS / BlockNote Upstream RFC                                       | **RFC**                    | ✅ Validé |
| `documentation-international/docs/index.mdx`                                          | Slasher — Universal Connected Data Blocks for BlockNote                   | **Accueil**                | ✅ Validé |

---

## 🇫🇷 2. Portail National FR (`documentation`)

| Fichier                                                                                                            | Ancien Titre (Complet / Long)                                                  | Nouveau Titre (Max 2 Mots)   |  Statut   |
| :----------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- | :--------------------------- | :-------: |
| `documentation/docs/01-onboarding/00-contexte/challenge-42.mdx`                                                    | Challenge La Suite Numérique x 42                                              | **Challenge 42**             | ✅ Validé |
| `documentation/docs/01-onboarding/00-contexte/planning.mdx`                                                        | Planning & Agenda du Challenge DINUM x 42                                      | **Planning 42**              | ✅ Validé |
| `documentation/docs/01-onboarding/01-demarrage/configuration-serveur/01-guide-configuration-serveur.mdx`           | Configurer Docs sur un Serveur Distant                                         | **Serveur Distant**          | ✅ Validé |
| `documentation/docs/01-onboarding/01-demarrage/configuration-serveur/02-pr-support-serveurs-distants.mdx`          | Proposition de PR DINUM — Support des Serveurs Distants                        | **Support Serveurs**         | ✅ Validé |
| `documentation/docs/01-onboarding/01-demarrage/environnement-machine-hote.mdx`                                     | Configuration de la Machine Hôte                                               | **Machine Hôte**             | ✅ Validé |
| `documentation/docs/01-onboarding/01-demarrage/git-ssh.mdx`                                                        | Configuration Git & SSH                                                        | **Git SSH**                  | ✅ Validé |
| `documentation/docs/01-onboarding/01-demarrage/urls-et-identifiants.mdx`                                           | Services, URLs & Identifiants                                                  | **Identifiants**             | ✅ Validé |
| `documentation/docs/01-onboarding/01-demarrage/vscode.mdx`                                                         | Configuration VS Code & Outils                                                 | **VS Code**                  | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/0001-architecture-monorepo-4-piliers.mdx`        | ADR-0001 — Découplage du Monorepo en 4 Piliers Autonomes                       | **ADR-0001 Architecture**    | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/0002-rendu-tri-format-dsfr-cunningham.mdx`       | ADR-0002 — Rendu Tri-Format Unifié (Callout, Card, Link)                       | **ADR-0002 Tri-Format**      | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/0003-proxy-django-anti-ssrf-circuit-breaker.mdx` | ADR-0003 — Proxy Backend Django avec Sécurité Anti-SSRF & Circuit Breaker      | **ADR-0003 Proxy**           | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/0004-dual-trigger-slash-et-mention.mdx`          | ADR-0004 — Dual Trigger d'Interlinking (Slash pour Blocs, Mention pour Inline) | **ADR-0004 Triggers**        | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/adr/index.mdx`                                       | Dossiers de Décisions d'Architecture (ADRs)                                    | **ADRs**                     | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/bonnes-pratiques-dinum.mdx`                          | Standards d'Ingénierie & Qualité Logicielle (DINUM, beta.gouv.fr, La Suite)    | **Standards DINUM**          | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit.mdx`                         | Guide du Premier Commit & Workflow Git                                         | **Premier Commit**           | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite.mdx`                | Qualité de Code, Linters & Architecture La Suite                               | **Qualité Code**             | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur.mdx`                   | Sécurité du Poste Développeur                                                  | **Sécurité Poste**           | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/tests-et-qualite.mdx`                                | Tests, Linters & Qualité                                                       | **Tests Qualité**            | ✅ Validé |
| `documentation/docs/01-onboarding/02-workflow-et-contribution/workflow.mdx`                                        | Workflow & Commandes Make                                                      | **Workflow Make**            | ✅ Validé |
| `documentation/docs/01-onboarding/03-support/glossaire.mdx`                                                        | Glossaire & Termes Techniques                                                  | **Glossaire**                | ✅ Validé |
| `documentation/docs/01-onboarding/03-support/troubleshooting.mdx`                                                  | Guide de Dépannage & FAQ                                                       | **Dépannage FAQ**            | ✅ Validé |
| `documentation/docs/01-onboarding/04-ressources/communaute.mdx`                                                    | Communauté & Matrix                                                            | **Communauté**               | ✅ Validé |
| `documentation/docs/01-onboarding/04-ressources/roadmap.mdx`                                                       | Roadmaps & Chantiers                                                           | **Roadmaps**                 | ✅ Validé |
| `documentation/docs/01-onboarding/04-ressources/templates-et-outils.mdx`                                           | Templates & Outils Réutilisables                                               | **Templates Outils**         | ✅ Validé |
| `documentation/docs/01-onboarding/index.mdx`                                                                       | Portail La Suite dev setup (42 x DINUM)                                        | **Onboarding**               | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/01-documents-et-contenus/docs.mdx`                                 | Docs (Impress)                                                                 | **Docs**                     | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/01-documents-et-contenus/fichiers-drive.mdx`                       | Fichiers & Drive (Espace de Stockage Centralisé)                               | **Drive**                    | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/01-documents-et-contenus/grist.mdx`                                | Grist (Bases de Données Relationnelles No-Code)                                | **Grist**                    | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/02-communication-et-echange/meet.mdx`                              | Meet (Visio)                                                                   | **Meet**                     | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/02-communication-et-echange/tchap.mdx`                             | Tchap (Messagerie Sécurisée Matrix)                                            | **Tchap**                    | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/02-communication-et-echange/transfers.mdx`                         | Transfers (Fichiers)                                                           | **Transfers**                | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/03-gestion-et-utilisateurs/accounts.mdx`                           | Accounts (Identités)                                                           | **Accounts**                 | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/03-gestion-et-utilisateurs/people.mdx`                             | People (Annuaire)                                                              | **People**                   | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/03-gestion-et-utilisateurs/projects.mdx`                           | Projects (Kanban)                                                              | **Projects**                 | ✅ Validé |
| `documentation/docs/02-la-suite/01-applications/index.mdx`                                                         | Matrice des Projets                                                            | **Applications**             | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/01-securite-et-identite/auth.mdx`                                  | Authentification & SSO                                                         | **Authentification SSO**     | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/01-securite-et-identite/federation-identite-proconnect.mdx`        | Fédération d'Identité & ProConnect                                             | **ProConnect**               | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/01-securite-et-identite/secrets-sops.mdx`                          | Gestion des Secrets (SOPS & age)                                               | **Secrets SOPS**             | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/02-donnees-et-temps-reel/flux-stockage-s3.mdx`                     | Stockage d'Objets & Flux S3                                                    | **Stockage S3**              | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/02-donnees-et-temps-reel/sauvegardes-et-restauration.mdx`          | Sauvegardes & Plan de Continuité (PRA / PCA)                                   | **Sauvegardes PRA**          | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt.mdx`                   | Collaboration Temps Réel & CRDT (Yjs)                                          | **Temps Réel**               | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/03-devops-et-deploiement/cicd-github-actions.mdx`                  | Intégration Continue (CI/CD GitHub Actions)                                    | **CI/CD Actions**            | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/03-devops-et-deploiement/deploiement-production.mdx`               | Déploiement en Production & Cloud Souverain                                    | **Déploiement Production**   | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/03-devops-et-deploiement/env.mdx`                                  | Variables d'Environnement                                                      | **Environnement**            | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/03-devops-et-deploiement/hot-reload.mdx`                           | Hot-Reload & Dev Local                                                         | **Hot Reload**               | ✅ Validé |
| `documentation/docs/02-la-suite/02-architecture/index.mdx`                                                         | Vue d'Ensemble & Schémas                                                       | **Architecture**             | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/accessibilite-rgaa.mdx`                             | Accessibilité RGAA & Bonnes Pratiques                                          | **Accessibilité RGAA**       | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/couleurs-et-themes.mdx`                             | Couleurs & Thèmes                                                              | **Couleurs Thèmes**          | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/figma.mdx`                                          | Kits Figma, Cunningham & UI Kit La Suite                                       | **Figma**                    | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/icones.mdx`                                         | Icônes & Visuels                                                               | **Icônes**                   | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/installation.mdx`                                   | Installation & Téléchargement                                                  | **Installation**             | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/01-fondations/typographie.mdx`                                    | Typographie & Échelle                                                          | **Typographie**              | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/02-composants/alertes-et-callouts.mdx`                            | Alertes & Callouts                                                             | **Alertes Callouts**         | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/02-composants/badges-et-statuts.mdx`                              | Badges, Tags & Statuts                                                         | **Badges Statuts**           | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/02-composants/boutons.mdx`                                        | Boutons & Actions                                                              | **Boutons**                  | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/02-composants/cartes-et-conteneurs.mdx`                           | Cartes & Conteneurs                                                            | **Cartes Conteneurs**        | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/02-composants/formulaires.mdx`                                    | Formulaires & Saisie                                                           | **Formulaires**              | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/02-composants/modales-et-dialogues.mdx`                           | Modales & Boîtes de Dialogue                                                   | **Modales**                  | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/02-composants/notices-et-bandeaux.mdx`                            | Notices & Bandeaux d'Information                                               | **Notices Bandeaux**         | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/02-composants/pagination-et-stepper.mdx`                          | Pagination & Stepper                                                           | **Pagination Stepper**       | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/02-composants/tableaux.mdx`                                       | Tableaux de Données                                                            | **Tableaux**                 | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/03-layout-et-structure/navigation-et-layout.mdx`                  | Navigation & Layout                                                            | **Navigation Layout**        | ✅ Validé |
| `documentation/docs/02-la-suite/03-design-system/index.mdx`                                                        | Vue d'Ensemble & Principes DSFR                                                | **Design System**            | ✅ Validé |
| `documentation/docs/02-la-suite/04-ressources/communaute.mdx`                                                      | Communauté & Matrix                                                            | **Communauté**               | ✅ Validé |
| `documentation/docs/02-la-suite/04-ressources/roadmap.mdx`                                                         | Roadmaps & Chantiers                                                           | **Roadmaps**                 | ✅ Validé |
| `documentation/docs/02-la-suite/04-ressources/templates-et-outils.mdx`                                             | Templates & Outils Réutilisables                                               | **Templates Outils**         | ✅ Validé |
| `documentation/docs/02-la-suite/index.mdx`                                                                         | L'Écosystème de La Suite Numérique                                             | **La Suite**                 | ✅ Validé |
| `documentation/docs/03-slasheurs-france/00-socle-technique.mdx`                                                    | Socle Technique Unifié des Commandes Slash                                     | **Socle Technique**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-architecture-standardisee.mdx`                                          | Architecture Standardisée & Inspiration /link-doc                              | **Architecture Standard**    | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/01-metier-loi/01-fondations-et-cadre.mdx`                           | Hiérarchie des Normes & Structure des Textes Juridiques                        | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/01-metier-loi/02-cas-usage-et-scenarios.mdx`                        | Cas d'Usage Métier — Commande /loi                                             | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/02-api-loi/01-benchmark-des-apis.mdx`                               | Benchmark des APIs Juridiques — PISTE vs Albert API vs Judilibre               | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/02-api-loi/02-specifications-techniques.mdx`                        | Spécifications Techniques — Endpoints PISTE & Contrats de Données              | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/03-implementation-loi/01-provider-django.mdx`                       | Implémentation Backend — LawSourceProvider Django                              | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/03-implementation-loi/02-rendu-et-settings.mdx`                     | Rendu DSFR & Activation Conditionnelle (/loi)                                  | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/03-implementation-loi/03-gestion-des-quotas.mdx`                    | Nouveau fichier                                                                | **Gestion Quotas**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/03-implementation-loi/04-tutoriel-ajouter-une-api.mdx`              | Nouveau fichier                                                                | **Tutoriel API**             | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/04-pr-loi/01-fiche-pr.mdx`                                          | Nouveau fichier                                                                | **Fiche PR**                 | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/04-pr-loi/02-patch-et-fichiers.mdx`                                 | Nouveau fichier                                                                | **Patch Fichiers**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/04-pr-loi/03-tests-et-validation.mdx`                               | Nouveau fichier                                                                | **Tests Validation**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/05-proposition/01-concept-et-valeur.mdx`                            | Nouveau fichier                                                                | **Concept Valeur**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/05-proposition/02-maquette-et-flux.mdx`                             | Nouveau fichier                                                                | **Maquette Flux**            | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/05-proposition/03-plan-implementation.mdx`                          | Nouveau fichier                                                                | **Plan Implémentation**      | ✅ Validé |
| `documentation/docs/03-slasheurs-france/01-loi/index.mdx`                                                          | Commande Slash /loi — Légifrance & Droit Français                              | **Slasheur Loi**             | ✅ Validé |
| `documentation/docs/03-slasheurs-france/02-assemblee/01-metier-assemblee/01-fondations-et-cadre.mdx`               | Fonctionnement du Travail Parlementaire & Navette Législative                  | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/02-assemblee/01-metier-assemblee/02-cas-usage-et-scenarios.mdx`            | Cas d'Usage — Fiches de Banc en Cabinet & Veille Législative                   | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/02-assemblee/02-api-assemblee/01-benchmark-des-apis.mdx`                   | Benchmark des APIs Parlementaires — claire.vite vs Tricoteuse vs Open Data AN  | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/02-assemblee/02-api-assemblee/02-specifications-techniques.mdx`            | Spécifications Techniques — Endpoints Parlementaires & DTOs                    | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/02-assemblee/03-implementation-assemblee/01-provider-django.mdx`           | Implémentation Backend — ParliamentSourceProvider Django                       | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/02-assemblee/03-implementation-assemblee/02-rendu-et-settings.mdx`         | Rendu DSFR Parlementaire & Feature Flagging                                    | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/02-assemblee/index.mdx`                                                    | Commande Slash /assemblee — Travail Parlementaire & Assemblée Nationale        | **Slasheur Assemblée**       | ✅ Validé |
| `documentation/docs/03-slasheurs-france/02-composant-customblock-unique.mdx`                                       | Composant CustomBlock Unique & 3 Formats DSFR                                  | **Composant Block**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/03-entreprise/01-metier-entreprise/01-fondations-et-cadre.mdx`             | Immatriculation Légale des Entreprises & RNE                                   | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/03-entreprise/01-metier-entreprise/02-cas-usage-et-scenarios.mdx`          | Cas d'Usage — Marchés Publics & Instruction de Subventions                     | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/03-entreprise/02-api-entreprise/01-benchmark-des-apis.mdx`                 | Benchmark des APIs Entreprises — Pappers vs API Entreprise vs RNE              | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/03-entreprise/02-api-entreprise/02-specifications-techniques.mdx`          | Spécifications Techniques — API Pappers & Schémas JSON                         | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/03-entreprise/03-implementation-entreprise/01-provider-django.mdx`         | Implémentation Backend — CompanySourceProvider Django                          | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/03-implementation-entreprise/02-rendu-et-settings.mdx`                     | Rendu DSFR Entreprise & Configuration                                          | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/03-entreprise/index.mdx`                                                   | Commande Slash /entreprise — Fiches Entreprises & Registre Légal               | **Slasheur Entreprises**     | ✅ Validé |
| `documentation/docs/03-slasheurs-france/03-proxy-backend-et-cache.mdx`                                             | Proxy Backend Django 5 & Provider Registry                                     | **Proxy Cache**              | ✅ Validé |
| `documentation/docs/03-slasheurs-france/04-adresse/01-metier-adresse/01-fondations-et-cadre.mdx`                   | La Base Adresse Nationale & la Loi 3DS                                         | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/04-adresse/01-metier-adresse/02-cas-usage-et-scenarios.mdx`                | Cas d'Usage Territoriaux & Courriers Administratifs (/adresse)                 | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/04-adresse/02-api-adresse/01-benchmark-des-apis.mdx`                       | Benchmark des APIs Géographiques — BAN vs Addok Local vs IGN vs OSM            | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/04-adresse/02-api-adresse/02-specifications-techniques.mdx`                | Spécifications de l'API Base Adresse Nationale (BAN)                           | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/04-adresse/03-implementation-adresse/01-provider-django.mdx`               | Implémentation Backend — AddressSourceProvider Django                          | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/04-adresse/03-implementation-adresse/02-rendu-et-settings.mdx`             | Rendu DSFR d'Adresse & Configuration                                           | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/04-adresse/index.mdx`                                                      | Commande Slash /adresse — Base Adresse Nationale (BAN)                         | **Slasheur Adresse**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/04-tutoriel-ajouter-une-api.mdx`                                           | Tutoriel — Ajouter une Nouvelle API en 10 Minutes                              | **Tutoriel API**             | ✅ Validé |
| `documentation/docs/03-slasheurs-france/05-albert/01-metier-albert/01-fondations-et-cadre.mdx`                     | Cadrage Métier & Cas d'Usage de la Commande /albert                            | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/05-albert/01-metier-albert/02-cas-usage-et-scenarios.mdx`                  | Scénarios Métier & Cas d'Usage de la Commande /albert                          | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/05-albert/02-api-albert/01-benchmark-des-apis.mdx`                         | Benchmark & Architecture Technique de l'API Albert                             | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/05-albert/02-api-albert/02-specifications-techniques.mdx`                  | Spécifications Techniques de l'API Albert RAG                                  | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/05-albert/03-implementation-albert/01-provider-django.mdx`                 | Implémentation du Connecteur AlbertSourceProvider                              | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/05-albert/03-implementation-albert/02-rendu-et-settings.mdx`               | Rendu Visuel & Configuration de la Commande /albert                            | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/05-albert/index.mdx`                                                       | Commande Slash /albert — IA Souveraine & RAG Administratif                     | **Slasheur Albert**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/05-proposition.md`                                                         | Propositions de Nouvelles Commandes Slash                                      | **Proposition Sources**      | ✅ Validé |
| `documentation/docs/03-slasheurs-france/06-sdk-developpeur/index.mdx`                                              | SDK Développeur pour les Ministères & Partenaires                              | **SDK Développeur**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/07-roadmap.mdx`                                                            | Roadmap des Commandes Slash (/)                                                | **Roadmap Sources**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/08-marche/01-metier-marche/01-fondations-et-cadre.mdx`                     | Fondations & Cadre Juridique des Marchés Publics (/marche)                     | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/08-marche/01-metier-marche/02-cas-usage-et-scenarios.mdx`                  | Scénarios Métier & Cas d'Usage de la Commande /marche                          | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/08-marche/02-api-marche/01-benchmark-des-apis.mdx`                         | Benchmark & Comparatif des APIs de Marchés Publics                             | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/08-marche/02-api-marche/02-specifications-techniques.mdx`                  | Spécifications Techniques de l'API BOAMP                                       | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/08-marche/03-implementation-marche/01-provider-django.mdx`                 | Implémentation du Provider Django /marche                                      | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/08-marche/03-implementation-marche/02-rendu-et-settings.mdx`               | Rendu Visuel & Configuration de la Commande /marche                            | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/08-marche/index.mdx`                                                       | Commande Slash /marche — Marchés Publics & BOAMP                               | **Slasheur Marchés**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/09-subvention/01-metier-subvention/01-fondations-et-cadre.mdx`             | Fondations & Dispositifs Financiers Publics (/subvention)                      | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/09-subvention/01-metier-subvention/02-cas-usage-et-scenarios.mdx`          | Scénarios Métier & Cas d'Usage de la Commande /subvention                      | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/09-subvention/02-api-subvention/01-benchmark-des-apis.mdx`                 | Benchmark des Sources d'Aides Publiques                                        | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/09-subvention/02-api-subvention/02-specifications-techniques.mdx`          | Spécifications Techniques de l'API Aides-Territoires                           | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/09-subvention/03-implementation-subvention/01-provider-django.mdx`         | Implémentation du Provider Django /subvention                                  | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/09-subvention/03-implementation-subvention/02-rendu-et-settings.mdx`       | Rendu Visuel & Configuration de la Commande /subvention                        | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/09-subvention/index.mdx`                                                   | Commande Slash /subvention — Aides-Territoires & Fonds Vert                    | **Slasheur Subventions**     | ✅ Validé |
| `documentation/docs/03-slasheurs-france/10-stats/01-metier-stats/01-fondations-et-cadre.mdx`                       | Fondations & Cadre Statistique Public (/stats)                                 | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/10-stats/01-metier-stats/02-cas-usage-et-scenarios.mdx`                    | Scénarios Métier & Cas d'Usage de la Commande /stats                           | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/10-stats/02-api-stats/01-benchmark-des-apis.mdx`                           | Benchmark des Sources Statistiques Territoriales                               | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/10-stats/02-api-stats/02-specifications-techniques.mdx`                    | Spécifications Techniques de l'API INSEE / Stats                               | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/10-stats/03-implementation-stats/01-provider-django.mdx`                   | Implémentation du Provider Django /stats                                       | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/10-stats/03-implementation-stats/02-rendu-et-settings.mdx`                 | Rendu Visuel & Configuration de la Commande /stats                             | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/10-stats/index.mdx`                                                        | Commande Slash /stats — Données Territoriales INSEE                            | **Slasheur Statistiques**    | ✅ Validé |
| `documentation/docs/03-slasheurs-france/11-agent/01-metier-agent/01-fondations-et-cadre.mdx`                       | Fondations & Référentiel de l'Annuaire du Service Public (/agent)              | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/11-agent/01-metier-agent/02-cas-usage-et-scenarios.mdx`                    | Scénarios Métier & Cas d'Usage de la Commande /agent                           | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/11-agent/02-api-agent/01-benchmark-des-apis.mdx`                           | Benchmark des APIs d'Annuaires Publics                                         | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/11-agent/02-api-agent/02-specifications-techniques.mdx`                    | Spécifications Techniques de l'API Annuaire DILA                               | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/11-agent/03-implementation-agent/01-provider-django.mdx`                   | Implémentation du Provider Django /agent                                       | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/11-agent/03-implementation-agent/02-rendu-et-settings.mdx`                 | Rendu Visuel & Configuration de la Commande /agent                             | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/11-agent/index.mdx`                                                        | Commande Slash /agent — Annuaire du Service Public & Contacts                  | **Slasheur Agents**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/12-cadastre/01-metier-cadastre/01-fondations-et-cadre.mdx`                 | Fondations & Cadre Juridique du Cadastre (/cadastre)                           | **Fondations Cadre**         | ✅ Validé |
| `documentation/docs/03-slasheurs-france/12-cadastre/01-metier-cadastre/02-cas-usage-et-scenarios.mdx`              | Scénarios Métier & Cas d'Usage de la Commande /cadastre                        | **Cas Usage**                | ✅ Validé |
| `documentation/docs/03-slasheurs-france/12-cadastre/02-api-cadastre/01-benchmark-des-apis.mdx`                     | Benchmark des APIs Cadastrales & Cartographiques                               | **Benchmark APIs**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/12-cadastre/02-api-cadastre/02-specifications-techniques.mdx`              | Spécifications Techniques de l'API Cadastre                                    | **Spécifications Endpoints** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/12-cadastre/03-implementation-cadastre/01-provider-django.mdx`             | Implémentation du Provider Django /cadastre                                    | **Provider Django**          | ✅ Validé |
| `documentation/docs/03-slasheurs-france/12-cadastre/03-implementation-cadastre/02-rendu-et-settings.mdx`           | Rendu Visuel & Configuration de la Commande /cadastre                          | **Rendu Settings**           | ✅ Validé |
| `documentation/docs/03-slasheurs-france/12-cadastre/index.mdx`                                                     | Commande Slash /cadastre — Cadastre & Parcelles Foncières                      | **Slasheur Cadastre**        | ✅ Validé |
| `documentation/docs/03-slasheurs-france/13-reutilisation-transverse.mdx`                                           | Réutilisation Transverse & Mutualisation Interministérielle                    | **Réutilisation Transverse** | ✅ Validé |
| `documentation/docs/03-slasheurs-france/14-retour-d-experience.mdx`                                                | Retour d'Expérience (RXP) : L'Industrialisation des Packages Souverains        | **Retour Expérience**        | ✅ Validé |
| `documentation/docs/04-pr/01-docs-serveur-config.mdx`                                                              | Nouveau fichier                                                                | **PR Serveurs**              | ✅ Validé |
| `documentation/docs/04-pr/02-docs-packages-souverains.mdx`                                                         | Nouveau fichier                                                                | **PR Packages**              | ✅ Validé |
| `documentation/docs/04-pr/03-blocknote-external-sources.mdx`                                                       | Nouveau fichier                                                                | **PR BlockNote**             | ✅ Validé |
| `documentation/docs/04-pr/04-guide-d-arbitrage-et-migration.mdx`                                                   | Nouveau fichier                                                                | **Arbitrage Migration**      | ✅ Validé |
| `documentation/docs/04-pr/05-pr-interne-monolithique.mdx`                                                          | Nouveau fichier                                                                | **PR Interne**               | ✅ Validé |
| `documentation/docs/04-pr/06-pr-externe-packagee.mdx`                                                              | Nouveau fichier                                                                | **PR Externe**               | ✅ Validé |
| `documentation/docs/04-pr/index.mdx`                                                                               | Nouveau fichier                                                                | **Pull Requests**            | ✅ Validé |
| `documentation/docs/05-skills/01-dinum-react.mdx`                                                                  | Nouveau fichier                                                                | **DINUM React**              | ✅ Validé |
| `documentation/docs/05-skills/02-dinum-python.mdx`                                                                 | Nouveau fichier                                                                | **DINUM Python**             | ✅ Validé |
| `documentation/docs/05-skills/03-code-standards.mdx`                                                               | Nouveau fichier                                                                | **Code Standards**           | ✅ Validé |
| `documentation/docs/05-skills/04-dsfr.mdx`                                                                         | Nouveau fichier                                                                | **DSFR Design**              | ✅ Validé |
| `documentation/docs/05-skills/05-rgaa-review.mdx`                                                                  | Nouveau fichier                                                                | **Revue RGAA**               | ✅ Validé |
| `documentation/docs/05-skills/06-lasuite-dev.mdx`                                                                  | Nouveau fichier                                                                | **Dev LaSuite**              | ✅ Validé |
| `documentation/docs/05-skills/07-docs-mdx.mdx`                                                                     | Nouveau fichier                                                                | **Docs MDX**                 | ✅ Validé |
| `documentation/docs/05-skills/08-code-review.mdx`                                                                  | Nouveau fichier                                                                | **Code Review**              | ✅ Validé |
| `documentation/docs/05-skills/09-architecture-review.mdx`                                                          | Nouveau fichier                                                                | **Revue Architecture**       | ✅ Validé |
| `documentation/docs/05-skills/10-design-change.mdx`                                                                | Nouveau fichier                                                                | **Design Change**            | ✅ Validé |
| `documentation/docs/05-skills/11-send-pr.mdx`                                                                      | Nouveau fichier                                                                | **Send PR**                  | ✅ Validé |
| `documentation/docs/05-skills/12-package-versioning.mdx`                                                           | Nouveau fichier                                                                | **Versionnage Packages**     | ✅ Validé |
| `documentation/docs/05-skills/13-quota-resilience.mdx`                                                             | Nouveau fichier                                                                | **Résilience Quotas**        | ✅ Validé |
| `documentation/docs/05-skills/14-python-data-protocols.mdx`                                                        | Nouveau fichier                                                                | **Protocoles Données**       | ✅ Validé |
| `documentation/docs/05-skills/15-dpg-review.mdx`                                                                   | Nouveau fichier                                                                | **Revue DPG**                | ✅ Validé |
| `documentation/docs/05-skills/index.mdx`                                                                           | Nouveau fichier                                                                | **Compétences Agents**       | ✅ Validé |
| `documentation/docs/index.mdx`                                                                                     | Portail La Suite dev setup (42 x DINUM)                                        | **Accueil**                  | ✅ Validé |

---

## 🧭 3. Catégories & Sections de Navigation (Zudoku)

| Section / Catégorie         | Ancien Libellé                          | Nouveau Libellé (Max 2 Mots) |
| :-------------------------- | :-------------------------------------- | :--------------------------- |
| **00. Overview**            | `00. Vision & Architecture`             | **`00. Overview`**           |
| **01. BlockNote**           | `01. BlockNote Extension Specification` | **`01. BlockNote`**          |
| **02. SDK**                 | `02. Provider TypeScript SDK`           | **`02. SDK`**                |
| **03. Proxy**               | `03. Backend Proxy & Resilience`        | **`03. Proxy`**              |
| **04. Presets**             | `04. Multi-Country Sovereign Presets`   | **`04. Presets`**            |
| **05. RFC**                 | `05. Upstream BlockNote RFC`            | **`05. RFC`**                |
| **01. Onboarding FR**       | `Onboarding & Démarrage`                | **`01. Onboarding`**         |
| **02. La Suite FR**         | `La Suite Numérique`                    | **`02. La Suite`**           |
| **03. Slasheurs France FR** | `Slasheurs France (DINUM)`              | **`03. Slasheurs France`**   |
| **04. Pull Requests FR**    | `Pull Requests & Contributions`         | **`04. Pull Requests`**      |
| **05. Skills FR**           | `Compétences Agents & Skills`           | **`05. Skills`**             |
