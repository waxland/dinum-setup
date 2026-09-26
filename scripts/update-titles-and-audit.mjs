import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

function countWords(str) {
  const clean = str.replace(/^[0-9.]+\s*/, "").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  return words.length;
}

const enDocTitles = {
  "00-overview/architecture-3-tier.mdx": "Architecture",
  "00-overview/engineering-standards.mdx": "Standards",
  "00-overview/index.mdx": "Overview",
  "00-overview/international-vision.mdx": "Vision",
  "01-blocknote-extension/3-display-formats.mdx": "Formats",
  "01-blocknote-extension/document-exports.mdx": "Exports",
  "01-blocknote-extension/floating-search-popover.mdx": "Popover",
  "01-blocknote-extension/index.mdx": "Extension",
  "01-blocknote-extension/styling-and-themes.mdx": "Thèmes",
  "02-provider-sdk/build-provider-in-15-min.mdx": "Tutoriel",
  "02-provider-sdk/define-source-provider.mdx": "Provider",
  "02-provider-sdk/index.mdx": "SDK",
  "02-provider-sdk/typescript-contracts.mdx": "Types",
  "03-backend-proxy/defensive-security-ssrf.mdx": "Sécurité",
  "03-backend-proxy/deterministic-cache.mdx": "Cache",
  "03-backend-proxy/index.mdx": "Proxy",
  "03-backend-proxy/quota-and-rate-limiting.mdx": "Quotas",
  "04-presets/canada.mdx": "Canada",
  "04-presets/european-union.mdx": "Europe",
  "04-presets/germany-bund.mdx": "Allemagne",
  "04-presets/index.mdx": "Presets",
  "04-presets/international.mdx": "International",
  "04-presets/netherlands-gov.mdx": "Pays-Bas",
  "04-presets/spain-boe.mdx": "Espagne",
  "05-rfc-upstream/blocknote-rfc-specification.mdx": "Spécification",
  "05-rfc-upstream/index.mdx": "RFC",
  "index.mdx": "Accueil",
};

const frDocTitles = {
  "01-onboarding/00-contexte/challenge-42.mdx": "Challenge 42",
  "01-onboarding/00-contexte/planning.mdx": "Planning 42",
  "01-onboarding/01-demarrage/configuration-serveur/01-guide-configuration-serveur.mdx":
    "Serveur Distant",
  "01-onboarding/01-demarrage/configuration-serveur/02-pr-support-serveurs-distants.mdx":
    "Support Serveurs",
  "01-onboarding/01-demarrage/environnement-machine-hote.mdx": "Machine Hôte",
  "01-onboarding/01-demarrage/git-ssh.mdx": "Git SSH",
  "01-onboarding/01-demarrage/urls-et-identifiants.mdx": "Identifiants",
  "01-onboarding/01-demarrage/vscode.mdx": "VS Code",
  "01-onboarding/02-workflow-et-contribution/adr/0001-architecture-monorepo-4-piliers.mdx":
    "ADR-0001 Architecture",
  "01-onboarding/02-workflow-et-contribution/adr/0002-rendu-tri-format-dsfr-cunningham.mdx":
    "ADR-0002 Tri-Format",
  "01-onboarding/02-workflow-et-contribution/adr/0003-proxy-django-anti-ssrf-circuit-breaker.mdx":
    "ADR-0003 Proxy",
  "01-onboarding/02-workflow-et-contribution/adr/0004-dual-trigger-slash-et-mention.mdx":
    "ADR-0004 Triggers",
  "01-onboarding/02-workflow-et-contribution/adr/index.mdx": "ADRs",
  "01-onboarding/02-workflow-et-contribution/bonnes-pratiques-dinum.mdx":
    "Standards DINUM",
  "01-onboarding/02-workflow-et-contribution/guide-du-premier-commit.mdx":
    "Premier Commit",
  "01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite.mdx":
    "Qualité Code",
  "01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur.mdx":
    "Sécurité Poste",
  "01-onboarding/02-workflow-et-contribution/tests-et-qualite.mdx":
    "Tests Qualité",
  "01-onboarding/02-workflow-et-contribution/workflow.mdx": "Workflow Make",
  "01-onboarding/03-support/glossaire.mdx": "Glossaire",
  "01-onboarding/03-support/troubleshooting.mdx": "Dépannage FAQ",
  "01-onboarding/04-ressources/communaute.mdx": "Communauté",
  "01-onboarding/04-ressources/roadmap.mdx": "Roadmaps",
  "01-onboarding/04-ressources/templates-et-outils.mdx": "Templates Outils",
  "01-onboarding/index.mdx": "Onboarding",
  "02-la-suite/01-applications/01-documents-et-contenus/docs.mdx": "Docs",
  "02-la-suite/01-applications/01-documents-et-contenus/fichiers-drive.mdx":
    "Drive",
  "02-la-suite/01-applications/01-documents-et-contenus/grist.mdx": "Grist",
  "02-la-suite/01-applications/02-communication-et-echange/meet.mdx": "Meet",
  "02-la-suite/01-applications/02-communication-et-echange/tchap.mdx": "Tchap",
  "02-la-suite/01-applications/02-communication-et-echange/transfers.mdx":
    "Transfers",
  "02-la-suite/01-applications/03-gestion-et-utilisateurs/accounts.mdx":
    "Accounts",
  "02-la-suite/01-applications/03-gestion-et-utilisateurs/people.mdx": "People",
  "02-la-suite/01-applications/03-gestion-et-utilisateurs/projects.mdx":
    "Projects",
  "02-la-suite/01-applications/index.mdx": "Applications",
  "02-la-suite/02-architecture/01-securite-et-identite/auth.mdx":
    "Authentification SSO",
  "02-la-suite/02-architecture/01-securite-et-identite/federation-identite-proconnect.mdx":
    "ProConnect",
  "02-la-suite/02-architecture/01-securite-et-identite/secrets-sops.mdx":
    "Secrets SOPS",
  "02-la-suite/02-architecture/02-donnees-et-temps-reel/flux-stockage-s3.mdx":
    "Stockage S3",
  "02-la-suite/02-architecture/02-donnees-et-temps-reel/sauvegardes-et-restauration.mdx":
    "Sauvegardes PRA",
  "02-la-suite/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt.mdx":
    "Temps Réel",
  "02-la-suite/02-architecture/03-devops-et-deploiement/cicd-github-actions.mdx":
    "CI/CD Actions",
  "02-la-suite/02-architecture/03-devops-et-deploiement/deploiement-production.mdx":
    "Déploiement Production",
  "02-la-suite/02-architecture/03-devops-et-deploiement/env.mdx":
    "Environnement",
  "02-la-suite/02-architecture/03-devops-et-deploiement/hot-reload.mdx":
    "Hot Reload",
  "02-la-suite/02-architecture/index.mdx": "Architecture",
  "02-la-suite/03-design-system/01-fondations/accessibilite-rgaa.mdx":
    "Accessibilité RGAA",
  "02-la-suite/03-design-system/01-fondations/couleurs-et-themes.mdx":
    "Couleurs Thèmes",
  "02-la-suite/03-design-system/01-fondations/figma.mdx": "Figma",
  "02-la-suite/03-design-system/01-fondations/icones.mdx": "Icônes",
  "02-la-suite/03-design-system/01-fondations/installation.mdx": "Installation",
  "02-la-suite/03-design-system/01-fondations/typographie.mdx": "Typographie",
  "02-la-suite/03-design-system/02-composants/alertes-et-callouts.mdx":
    "Alertes Callouts",
  "02-la-suite/03-design-system/02-composants/badges-et-statuts.mdx":
    "Badges Statuts",
  "02-la-suite/03-design-system/02-composants/boutons.mdx": "Boutons",
  "02-la-suite/03-design-system/02-composants/cartes-et-conteneurs.mdx":
    "Cartes Conteneurs",
  "02-la-suite/03-design-system/02-composants/formulaires.mdx": "Formulaires",
  "02-la-suite/03-design-system/02-composants/modales-et-dialogues.mdx":
    "Modales",
  "02-la-suite/03-design-system/02-composants/notices-et-bandeaux.mdx":
    "Notices Bandeaux",
  "02-la-suite/03-design-system/02-composants/pagination-et-stepper.mdx":
    "Pagination Stepper",
  "02-la-suite/03-design-system/02-composants/tableaux.mdx": "Tableaux",
  "02-la-suite/03-design-system/03-layout-et-structure/navigation-et-layout.mdx":
    "Navigation Layout",
  "02-la-suite/03-design-system/index.mdx": "Design System",
  "02-la-suite/04-ressources/communaute.mdx": "Communauté",
  "02-la-suite/04-ressources/roadmap.mdx": "Roadmaps",
  "02-la-suite/04-ressources/templates-et-outils.mdx": "Templates Outils",
  "02-la-suite/index.mdx": "La Suite",
  "03-slasheurs-france/00-socle-technique.mdx": "Socle Technique",
  "03-slasheurs-france/01-architecture-standardisee.mdx":
    "Architecture Standard",
  "03-slasheurs-france/01-loi/01-metier-loi/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/01-loi/01-metier-loi/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/01-loi/02-api-loi/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/01-loi/02-api-loi/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/01-loi/03-implementation-loi/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/01-loi/03-implementation-loi/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/01-loi/03-implementation-loi/03-gestion-des-quotas.mdx":
    "Gestion Quotas",
  "03-slasheurs-france/01-loi/03-implementation-loi/04-tutoriel-ajouter-une-api.mdx":
    "Tutoriel API",
  "03-slasheurs-france/01-loi/04-pr-loi/01-fiche-pr.mdx": "Fiche PR",
  "03-slasheurs-france/01-loi/04-pr-loi/02-patch-et-fichiers.mdx":
    "Patch Fichiers",
  "03-slasheurs-france/01-loi/04-pr-loi/03-tests-et-validation.mdx":
    "Tests Validation",
  "03-slasheurs-france/01-loi/05-proposition/01-concept-et-valeur.mdx":
    "Concept Valeur",
  "03-slasheurs-france/01-loi/05-proposition/02-maquette-et-flux.mdx":
    "Maquette Flux",
  "03-slasheurs-france/01-loi/05-proposition/03-plan-implementation.mdx":
    "Plan Implémentation",
  "03-slasheurs-france/01-loi/index.mdx": "Slasheur Loi",
  "03-slasheurs-france/02-assemblee/01-metier-assemblee/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/02-assemblee/01-metier-assemblee/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/02-assemblee/02-api-assemblee/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/02-assemblee/02-api-assemblee/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/02-assemblee/03-implementation-assemblee/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/02-assemblee/03-implementation-assemblee/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/02-assemblee/index.mdx": "Slasheur Assemblée",
  "03-slasheurs-france/02-composant-customblock-unique.mdx": "Composant Block",
  "03-slasheurs-france/03-entreprise/01-metier-entreprise/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/03-entreprise/01-metier-entreprise/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/03-entreprise/02-api-entreprise/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/03-entreprise/02-api-entreprise/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/03-entreprise/03-implementation-entreprise/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/03-entreprise/03-implementation-entreprise/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/03-entreprise/index.mdx": "Slasheur Entreprises",
  "03-slasheurs-france/03-proxy-backend-et-cache.mdx": "Proxy Cache",
  "03-slasheurs-france/04-adresse/01-metier-adresse/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/04-adresse/01-metier-adresse/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/04-adresse/02-api-adresse/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/04-adresse/02-api-adresse/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/04-adresse/03-implementation-adresse/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/04-adresse/03-implementation-adresse/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/04-adresse/index.mdx": "Slasheur Adresse",
  "03-slasheurs-france/04-tutoriel-ajouter-une-api.mdx": "Tutoriel API",
  "03-slasheurs-france/05-albert/01-metier-albert/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/05-albert/01-metier-albert/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/05-albert/02-api-albert/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/05-albert/02-api-albert/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/05-albert/03-implementation-albert/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/05-albert/03-implementation-albert/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/05-albert/index.mdx": "Slasheur Albert",
  "03-slasheurs-france/05-proposition.md": "Proposition Sources",
  "03-slasheurs-france/06-sdk-developpeur/index.mdx": "SDK Développeur",
  "03-slasheurs-france/07-roadmap.mdx": "Roadmap Sources",
  "03-slasheurs-france/08-marche/01-metier-marche/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/08-marche/01-metier-marche/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/08-marche/02-api-marche/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/08-marche/02-api-marche/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/08-marche/03-implementation-marche/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/08-marche/03-implementation-marche/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/08-marche/index.mdx": "Slasheur Marchés",
  "03-slasheurs-france/09-subvention/01-metier-subvention/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/09-subvention/01-metier-subvention/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/09-subvention/02-api-subvention/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/09-subvention/02-api-subvention/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/09-subvention/03-implementation-subvention/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/09-subvention/03-implementation-subvention/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/09-subvention/index.mdx": "Slasheur Subventions",
  "03-slasheurs-france/10-stats/01-metier-stats/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/10-stats/01-metier-stats/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/10-stats/02-api-stats/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/10-stats/02-api-stats/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/10-stats/03-implementation-stats/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/10-stats/03-implementation-stats/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/10-stats/index.mdx": "Slasheur Statistiques",
  "03-slasheurs-france/11-agent/01-metier-agent/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/11-agent/01-metier-agent/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/11-agent/02-api-agent/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/11-agent/02-api-agent/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/11-agent/03-implementation-agent/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/11-agent/03-implementation-agent/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/11-agent/index.mdx": "Slasheur Agents",
  "03-slasheurs-france/12-cadastre/01-metier-cadastre/01-fondations-et-cadre.mdx":
    "Fondations Cadre",
  "03-slasheurs-france/12-cadastre/01-metier-cadastre/02-cas-usage-et-scenarios.mdx":
    "Cas Usage",
  "03-slasheurs-france/12-cadastre/02-api-cadastre/01-benchmark-des-apis.mdx":
    "Benchmark APIs",
  "03-slasheurs-france/12-cadastre/02-api-cadastre/02-specifications-techniques.mdx":
    "Spécifications Endpoints",
  "03-slasheurs-france/12-cadastre/03-implementation-cadastre/01-provider-django.mdx":
    "Provider Django",
  "03-slasheurs-france/12-cadastre/03-implementation-cadastre/02-rendu-et-settings.mdx":
    "Rendu Settings",
  "03-slasheurs-france/12-cadastre/index.mdx": "Slasheur Cadastre",
  "03-slasheurs-france/13-reutilisation-transverse.mdx":
    "Réutilisation Transverse",
  "03-slasheurs-france/14-retour-d-experience.mdx": "Retour Expérience",
  "04-pr/01-docs-serveur-config.mdx": "PR Serveurs",
  "04-pr/02-docs-packages-souverains.mdx": "PR Packages",
  "04-pr/03-blocknote-external-sources.mdx": "PR BlockNote",
  "04-pr/04-guide-d-arbitrage-et-migration.mdx": "Arbitrage Migration",
  "04-pr/05-pr-interne-monolithique.mdx": "PR Interne",
  "04-pr/06-pr-externe-packagee.mdx": "PR Externe",
  "04-pr/index.mdx": "Pull Requests",
  "05-skills/01-dinum-react.mdx": "DINUM React",
  "05-skills/02-dinum-python.mdx": "DINUM Python",
  "05-skills/03-code-standards.mdx": "Code Standards",
  "05-skills/04-dsfr.mdx": "DSFR Design",
  "05-skills/05-rgaa-review.mdx": "Revue RGAA",
  "05-skills/06-lasuite-dev.mdx": "Dev LaSuite",
  "05-skills/07-docs-mdx.mdx": "Docs MDX",
  "05-skills/08-code-review.mdx": "Code Review",
  "05-skills/09-architecture-review.mdx": "Revue Architecture",
  "05-skills/10-design-change.mdx": "Design Change",
  "05-skills/11-send-pr.mdx": "Send PR",
  "05-skills/12-package-versioning.mdx": "Versionnage Packages",
  "05-skills/13-quota-resilience.mdx": "Résilience Quotas",
  "05-skills/14-python-data-protocols.mdx": "Protocoles Données",
  "05-skills/15-dpg-review.mdx": "Revue DPG",
  "05-skills/index.mdx": "Compétences Agents",
  "index.mdx": "Accueil",
};

function updateFrontmatter(filePath, newTitle) {
  const content = fs.readFileSync(filePath, "utf8");
  let oldTitle = "Sans titre";

  const oldTitleMatch =
    content.match(/^title:\s*["\x27]?(.*?)["\x27]?\s*$/m) ||
    content.match(/^#\s+(.+)$/m);
  if (oldTitleMatch) {
    oldTitle = oldTitleMatch[1].trim();
  }

  let updated = content;
  if (content.startsWith("---")) {
    const endFm = content.indexOf("---", 3);
    if (endFm !== -1) {
      let fm = content.slice(3, endFm);
      const rest = content.slice(endFm + 3);

      if (/^title:/m.test(fm)) {
        fm = fm.replace(/^title:\s*.*$/m, `title: "${newTitle}"`);
      } else {
        fm = `\ntitle: "${newTitle}"` + fm;
      }

      if (/^sidebar_label:/m.test(fm)) {
        fm = fm.replace(
          /^sidebar_label:\s*.*$/m,
          `sidebar_label: "${newTitle}"`,
        );
      }

      updated = `---${fm}---${rest}`;
    }
  } else {
    updated = `---\ntitle: "${newTitle}"\nsidebar_label: "${newTitle}"\n---\n\n${content}`;
  }

  fs.writeFileSync(filePath, updated, "utf8");
  return oldTitle;
}

const auditRecords = [];

console.log("Updating documentation-international/docs...");
for (const [relPath, newTitle] of Object.entries(enDocTitles)) {
  const fullPath = path.join(
    ROOT_DIR,
    "documentation-international",
    "docs",
    relPath,
  );
  if (fs.existsSync(fullPath)) {
    const oldTitle = updateFrontmatter(fullPath, newTitle);
    auditRecords.push({
      portal: "International (EN)",
      file: `documentation-international/docs/${relPath}`,
      oldTitle,
      newTitle,
    });
  }
}

console.log("Updating documentation/docs...");
for (const [relPath, newTitle] of Object.entries(frDocTitles)) {
  const fullPath = path.join(ROOT_DIR, "documentation", "docs", relPath);
  if (fs.existsSync(fullPath)) {
    const oldTitle = updateFrontmatter(fullPath, newTitle);
    auditRecords.push({
      portal: "National (FR)",
      file: `documentation/docs/${relPath}`,
      oldTitle,
      newTitle,
    });
  }
}

console.log(`Updated ${auditRecords.length} documentation pages.`);

// Write AUDIT.md
let auditMd = `# 📑 Audit & Révision des Titres de Navigation (Portails DINUM)

Ce document liste l'ensemble des titres de pages et des catégories de navigation révisés pour respecter la règle de concision : **maximum 2 mots par titre**, afin de garantir une lisibilité optimale sans troncature dans la barre latérale de navigation Zudoku.

---

## 🎯 Synthèse des Modifications

- **Portail International (\`documentation-international\`) :** ${auditRecords.filter((r) => r.portal.includes("EN")).length} pages mises à jour
- **Portail National FR (\`documentation\`) :** ${auditRecords.filter((r) => r.portal.includes("FR")).length} pages mises à jour
- **Total général :** ${auditRecords.length} pages documentaires révisées
- **Règle appliquée :** Titre court (<= 2 mots), suppression du verbiage technique long dans la navigation, conservation des descriptions riches dans les métadonnées SEO (\`description\`).

---

## 🌍 1. Portail International (\`documentation-international\`)

| Fichier | Ancien Titre (Long) | Nouveau Titre (Max 2 Mots) | Statut |
| :--- | :--- | :--- | :---: |
`;

auditRecords
  .filter((r) => r.portal.includes("EN"))
  .forEach((r) => {
    auditMd += `| \`${r.file}\` | ${r.oldTitle} | **${r.newTitle}** | ✅ Validé |\n`;
  });

auditMd += `\n---

## 🇫🇷 2. Portail National FR (\`documentation\`)

| Fichier | Ancien Titre (Long) | Nouveau Titre (Max 2 Mots) | Statut |
| :--- | :--- | :--- | :---: |
`;

auditRecords
  .filter((r) => r.portal.includes("FR"))
  .forEach((r) => {
    auditMd += `| \`${r.file}\` | ${r.oldTitle} | **${r.newTitle}** | ✅ Validé |\n`;
  });

auditMd += `\n---

## 🧭 3. Catégories & Sections de Navigation (Zudoku)

| Section / Catégorie | Ancien Libellé | Nouveau Libellé (Max 2 Mots) |
| :--- | :--- | :--- |
| **00. Overview** | \`00. Vision & Architecture\` | **\`00. Overview\`** |
| **01. BlockNote** | \`01. BlockNote Extension Specification\` | **\`01. BlockNote\`** |
| **02. SDK** | \`02. Provider TypeScript SDK\` | **\`02. SDK\`** |
| **03. Proxy** | \`03. Backend Proxy & Resilience\` | **\`03. Proxy\`** |
| **04. Presets** | \`04. Multi-Country Sovereign Presets\` | **\`04. Presets\`** |
| **05. RFC** | \`05. Upstream BlockNote RFC\` | **\`05. RFC\`** |
| **01. Onboarding FR** | \`Onboarding & Démarrage\` | **\`01. Onboarding\`** |
| **02. La Suite FR** | \`La Suite Numérique\` | **\`02. La Suite\`** |
| **03. Slasheurs France FR** | \`Slasheurs France (DINUM)\` | **\`03. Slasheurs France\`** |
| **04. Pull Requests FR** | \`Pull Requests & Contributions\` | **\`04. Pull Requests\`** |
| **05. Skills FR** | \`Compétences Agents & Skills\` | **\`05. Skills\`** |
`;

fs.writeFileSync(path.join(ROOT_DIR, "AUDIT.md"), auditMd, "utf8");
console.log("AUDIT.md generated successfully.");

export { countWords, enDocTitles, frDocTitles };
