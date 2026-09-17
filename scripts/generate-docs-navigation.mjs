import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const CONFIGS = {
  docs: {
    docsDir: path.join(ROOT_DIR, "docs"),
    outputFile: path.join(ROOT_DIR, "zudoku.navigation.tsx"),
  },
};

/**
 * Formats directory name into a human-readable title.
 * Removes leading numbering prefixes like '01-', '1-' and formats acronyms.
 */
function formatLabel(name) {
  const clean = name.replace(/^(\d+-)+/, "");

  if (clean === "socle-technique") {
    return "Socle Technique Unifié";
  }
  if (clean.toLowerCase() === "pr") {
    return "Stratégies de Pull Requests (PR)";
  }
  if (clean === "pr-interne-monolithique") {
    return "Typologie 1 : PR Interne In-Tree";
  }
  if (clean === "pr-externe-packagee") {
    return "Typologie 2 : PR Externe Packagée";
  }
  if (clean === "guide-d-arbitrage-et-migration") {
    return "Guide d'Arbitrage & Décision";
  }
  if (clean.startsWith("metier")) {
    return "Pôle Métier & Usages";
  }
  if (clean.startsWith("api")) {
    return "Pôle API & Veille";
  }
  if (clean.startsWith("implementation")) {
    return "Pôle Implémentation";
  }

  const acronyms = {
    roi: "ROI",
    api: "API",
    sdk: "SDK",
    ui: "UI",
    crm: "CRM",
    v1: "V1",
    v2: "V2",
    v3: "V3",
    faq: "FAQ",
    sso: "SSO",
    oidc: "OIDC",
    ssh: "SSH",
    git: "Git",
    vscode: "VS Code",
    ide: "IDE",
    url: "URL",
    urls: "URLs",
    dsfr: "DSFR",
    rgaa: "RGAA",
    crdt: "CRDT",
    s3: "S3",
    cicd: "CI/CD",
    ci: "CI",
    cd: "CD",
    pra: "PRA",
    pca: "PCA",
    e2e: "E2E",
    blocknote: "BlockNote",
    legifrance: "Légifrance",
    mdx: "MDX",
    figma: "Figma",
    slash: "Commandes Slash",
    loi: "Projet de Loi (/loi)",
    dila: "DILA",
    piste: "PISTE",
    mvp: "MVP",
    poc: "PoC",
    ux: "UX",
    ia: "IA",
    jwt: "JWT",
    pr: "PR",
    ip: "IP",
    vm: "VM",
    nat: "NAT",
    pappers: "Entreprises (/pappers)",
    entreprise: "Entreprises (/entreprise)",
    assemblee: "Assemblée Nationale (/assemblee)",
    adresse: "Base Adresse Nationale (/adresse)",
    ban: "BAN",
    marche: "Marchés Publics (/marche)",
    cadastre: "Cadastre (/cadastre)",
    subvention: "Subventions (/subvention)",
    insee: "INSEE",
    tchap: "Tchap",
    demarche: "Démarches Simplifiées",
    opendata: "Open Data",
    parapheur: "Parapheur Électronique",
    siren: "SIREN",
    siret: "SIRET",
    django: "Django",
    redis: "Redis",
    settings: "Activation & Settings",
  };

  return clean
    .split(/[-_]+/)
    .map((word) => {
      const lower = word.toLowerCase();
      if (acronyms[lower]) return acronyms[lower];
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Returns default Lucide icon name for categories and sub-categories.
 */
function getDefaultIcon(name, depth) {
  const lower = name.toLowerCase();

  if (depth === 0) {
    if (lower.includes("accueil") || lower.includes("home"))
      return "home";
    if (lower.includes("onboarding") || lower.includes("demarrage"))
      return "compass";
    if (lower.includes("archi")) return "layers";
    if (lower.includes("projet") || lower.includes("project")) return "boxes";
    if (
      lower.includes("design") ||
      lower.includes("dsfr") ||
      lower.includes("ui")
    )
      return "palette";
    if (
      lower.includes("tutoriel") ||
      lower.includes("tutorial") ||
      lower.includes("recette")
    )
      return "sparkles";
    if (
      lower.includes("skill") ||
      lower.includes("agent") ||
      lower.includes("competence")
    )
      return "bot";
    if (
      lower.includes("slash") ||
      lower.includes("commande")
    )
      return "terminal";
    if (
      lower.includes("ressource") ||
      lower.includes("roadmap") ||
      lower.includes("communaute")
    )
      return "map";
    if (lower.includes("guide") || lower.includes("doc")) return "book-open";
    if (lower.includes("lien") || lower.includes("link"))
      return "external-link";
  }

  // Depth > 0 (Sub-categories)
  if (lower.includes("metier")) return "briefcase";
  if (lower.includes("api") || lower.includes("sdk")) return "code";
  if (lower.includes("implementation")) return "terminal";
  if (lower.includes("fondation")) return "sliders";
  if (lower.includes("composant")) return "box";
  if (lower.includes("layout") || lower.includes("structure"))
    return "layout-grid";
  if (lower.includes("demarrage")) return "rocket";
  if (lower.includes("workflow") || lower.includes("contribution"))
    return "git-pull-request";
  if (lower.includes("support")) return "life-buoy";
  if (lower.includes("securite") || lower.includes("identite"))
    return "shield-check";
  if (lower.includes("donnees") || lower.includes("temps-reel"))
    return "database";
  if (lower.includes("devops") || lower.includes("deploiement")) return "cloud";
  if (lower.includes("socle") || lower.includes("standard") || lower.includes("technique")) return "layers";
  if (lower.includes("loi") || lower.includes("juridique") || lower.includes("legal"))
    return "scale";
  if (lower.includes("pappers") || lower.includes("entreprise") || lower.includes("societe"))
    return "building-2";
  if (lower.includes("assemblee") || lower.includes("parlement") || lower.includes("claire"))
    return "landmark";
  if (lower.includes("adresse") || lower.includes("ban") || lower.includes("geo"))
    return "map-pin";
  if (lower.includes("proposition") || lower.includes("idee"))
    return "lightbulb";
  if (lower.includes("remplir") || lower.includes("auto"))
    return "sparkles";
  if (lower.includes("document") || lower.includes("contenu"))
    return "file-text";
  if (lower.includes("communication") || lower.includes("echange"))
    return "message-square";
  if (lower.includes("gestion") || lower.includes("utilisateur"))
    return "users";
  if (lower.includes("developpement")) return "code";
  if (lower.includes("integration") || lower.includes("test"))
    return "check-circle";
  if (lower.includes("serveur") || lower.includes("server")) return "server";
  if (lower.includes("pr-") || lower.includes("pull-request")) return "git-pull-request";

  if (lower.includes("backend") || lower.includes("django")) return "server";
  if (lower.includes("frontend") || lower.includes("blocknote") || lower.includes("react")) return "monitor";
  if (lower.includes("components")) return "box";
  if (lower.includes("sdk") || lower.includes("api")) return "code";

  return "folder";
}

/**
 * Recursively scans a directory and builds Zudoku navigation items.
 */
function scanDir(dir, baseDir, depth = 0) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Filter valid files and folders (ignore hidden files, non-markdown files, etc.)
  const validEntries = entries.filter((e) => {
    if (e.name.startsWith("_") || e.name.startsWith(".")) return false;
    if (e.name === "README.md") return false;
    if (e.isFile() && !e.name.endsWith(".md") && !e.name.endsWith(".mdx"))
      return false;
    return true;
  });

  // Sort entries: index first, then files before directories, then natural sorting
  validEntries.sort((a, b) => {
    const aIsIndex = a.name.startsWith("index.");
    const bIsIndex = b.name.startsWith("index.");
    if (aIsIndex && !bIsIndex) return -1;
    if (!aIsIndex && bIsIndex) return 1;

    // Place files before directories so root documents appear above sub-categories
    if (a.isFile() && b.isDirectory()) return -1;
    if (a.isDirectory() && b.isFile()) return 1;

    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

  const items = [];
  for (const entry of validEntries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      const subItems = scanDir(fullPath, baseDir, depth + 1);
      if (subItems.length > 0) {
        const categoryObj = {
          type: "category",
          label: formatLabel(entry.name),
          icon: getDefaultIcon(entry.name, depth),
          collapsed: false,
          items: subItems,
        };

        items.push(categoryObj);
      }
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
    ) {
      if (entry.name.startsWith("index.")) {
        if (depth === 0) {
          items.push({
            type: "doc",
            file: relPath,
            path: "/",
            label: "Accueil",
            icon: "home",
          });
        } else if (path.dirname(relPath).replace(/^(\d+-)+/, "") === "accueil") {
          items.push({
            type: "doc",
            file: relPath,
            path: "/",
          });
        } else {
          items.push({
            type: "doc",
            file: relPath,
            path: `/${path.dirname(relPath)}`,
          });
        }
      } else {
        const route = "/" + relPath.replace(/\.mdx?$/, "");
        items.push(route);
      }
    }
  }

  return items;
}

/**
 * Generates Zudoku navigation file for target doc app.
 */
function generateNavForTarget(target) {
  const config = CONFIGS[target];
  if (!config) {
    console.error(
      `Unknown target: ${target}. Valid targets are: ${Object.keys(CONFIGS).join(", ")}`,
    );
    process.exit(1);
  }

  console.log(`Scanning ${config.docsDir}...`);
  const navItems = scanDir(config.docsDir, config.docsDir);

  const redirects = [
    // Category aliases and root redirects
    { from: "/index", to: "/" },
    { from: "/accueil", to: "/" },
    { from: "/00-accueil", to: "/" },
    { from: "/00-accueil/index", to: "/" },
    { from: "/05-ressources", to: "/05-ressources/communaute" },
    { from: "/onboarding", to: "/01-onboarding" },
    { from: "/architecture", to: "/02-architecture" },
    { from: "/projets", to: "/03-projets" },
    { from: "/design-system", to: "/04-design-system" },
    { from: "/dsfr", to: "/04-design-system" },
    { from: "/ressources", to: "/05-ressources/communaute" },
    { from: "/skills", to: "/07-skills" },
    { from: "/slash", to: "/08-slash" },
    { from: "/08-slash/index", to: "/08-slash" },
    { from: "/08-slash/loi", to: "/08-slash/loi" },
    { from: "/loi", to: "/08-slash/loi" },
    { from: "/law", to: "/08-slash/loi" },
    { from: "/comprendre-les-lois", to: "/comprendre-les-lois" },
    { from: "/ressources-juridiques", to: "/ressources-juridiques" },
    { from: "/guide", to: "/01-onboarding" },

    // Flat to subfolder backwards compatibility: Accueil / Onboarding
    {
      from: "/01-onboarding/challenge-42",
      to: "/00-accueil/challenge-42",
    },
    {
      from: "/challenge-42",
      to: "/00-accueil/challenge-42",
    },
    {
      from: "/01-onboarding/01-demarrage/challenge-42",
      to: "/00-accueil/challenge-42",
    },
    {
      from: "/01-onboarding/planning",
      to: "/00-accueil/planning",
    },
    {
      from: "/planning",
      to: "/00-accueil/planning",
    },
    {
      from: "/planning-42",
      to: "/00-accueil/planning",
    },
    {
      from: "/01-onboarding/01-demarrage/planning",
      to: "/00-accueil/planning",
    },
    {
      from: "/01-onboarding/environnement-machine-hote",
      to: "/01-onboarding/01-demarrage/environnement-machine-hote",
    },
    {
      from: "/01-onboarding/git-ssh",
      to: "/01-onboarding/01-demarrage/git-ssh",
    },
    { from: "/01-onboarding/vscode", to: "/01-onboarding/01-demarrage/vscode" },
    {
      from: "/01-onboarding/urls-et-identifiants",
      to: "/01-onboarding/01-demarrage/urls-et-identifiants",
    },
    {
      from: "/01-onboarding/workflow",
      to: "/01-onboarding/02-workflow-et-contribution/workflow",
    },
    {
      from: "/01-onboarding/guide-du-premier-commit",
      to: "/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit",
    },
    {
      from: "/01-onboarding/tests-et-qualite",
      to: "/01-onboarding/02-workflow-et-contribution/tests-et-qualite",
    },
    {
      from: "/01-onboarding/securite-du-poste-developpeur",
      to: "/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur",
    },
    {
      from: "/01-onboarding/glossaire",
      to: "/01-onboarding/03-support/glossaire",
    },
    {
      from: "/01-onboarding/troubleshooting",
      to: "/01-onboarding/03-support/troubleshooting",
    },

    // Flat to subfolder backwards compatibility: Architecture
    {
      from: "/02-architecture/auth",
      to: "/02-architecture/01-securite-et-identite/auth",
    },
    {
      from: "/02-architecture/federation-identite-proconnect",
      to: "/02-architecture/01-securite-et-identite/federation-identite-proconnect",
    },
    {
      from: "/02-architecture/secrets-sops",
      to: "/02-architecture/01-securite-et-identite/secrets-sops",
    },
    {
      from: "/02-architecture/temps-reel-et-crdt",
      to: "/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt",
    },
    {
      from: "/02-architecture/flux-stockage-s3",
      to: "/02-architecture/02-donnees-et-temps-reel/flux-stockage-s3",
    },
    {
      from: "/02-architecture/sauvegardes-et-restauration",
      to: "/02-architecture/02-donnees-et-temps-reel/sauvegardes-et-restauration",
    },
    {
      from: "/02-architecture/env",
      to: "/02-architecture/03-devops-et-deploiement/env",
    },
    {
      from: "/02-architecture/hot-reload",
      to: "/02-architecture/03-devops-et-deploiement/hot-reload",
    },
    {
      from: "/02-architecture/cicd-github-actions",
      to: "/02-architecture/03-devops-et-deploiement/cicd-github-actions",
    },
    {
      from: "/02-architecture/deploiement-production",
      to: "/02-architecture/03-devops-et-deploiement/deploiement-production",
    },

    // Flat to subfolder backwards compatibility: Projets
    {
      from: "/03-projets/docs",
      to: "/03-projets/01-documents-et-contenus/docs",
    },
    {
      from: "/03-projets/blocknote",
      to: "/03-projets/01-documents-et-contenus/blocknote",
    },
    {
      from: "/03-projets/docspec",
      to: "/03-projets/01-documents-et-contenus/docspec",
    },
    {
      from: "/03-projets/fichiers-drive",
      to: "/03-projets/01-documents-et-contenus/fichiers-drive",
    },
    {
      from: "/03-projets/grist",
      to: "/03-projets/01-documents-et-contenus/grist",
    },
    {
      from: "/03-projets/meet",
      to: "/03-projets/02-communication-et-echange/meet",
    },
    {
      from: "/03-projets/tchap",
      to: "/03-projets/02-communication-et-echange/tchap",
    },
    {
      from: "/03-projets/transfers",
      to: "/03-projets/02-communication-et-echange/transfers",
    },
    {
      from: "/03-projets/projects",
      to: "/03-projets/03-gestion-et-utilisateurs/projects",
    },
    {
      from: "/03-projets/people",
      to: "/03-projets/03-gestion-et-utilisateurs/people",
    },
    {
      from: "/03-projets/accounts",
      to: "/03-projets/03-gestion-et-utilisateurs/accounts",
    },

    // Flat to subfolder backwards compatibility: Design System
    {
      from: "/04-design-system/installation",
      to: "/04-design-system/01-fondations/installation",
    },
    {
      from: "/04-design-system/couleurs-et-themes",
      to: "/04-design-system/01-fondations/couleurs-et-themes",
    },
    {
      from: "/04-design-system/typographie",
      to: "/04-design-system/01-fondations/typographie",
    },
    {
      from: "/04-design-system/icones",
      to: "/04-design-system/01-fondations/icones",
    },
    {
      from: "/04-design-system/accessibilite-rgaa",
      to: "/04-design-system/01-fondations/accessibilite-rgaa",
    },
    {
      from: "/04-design-system/boutons",
      to: "/04-design-system/02-composants/boutons",
    },
    {
      from: "/04-design-system/badges-et-statuts",
      to: "/04-design-system/02-composants/badges-et-statuts",
    },
    {
      from: "/04-design-system/alertes-et-callouts",
      to: "/04-design-system/02-composants/alertes-et-callouts",
    },
    {
      from: "/04-design-system/modales-et-dialogues",
      to: "/04-design-system/02-composants/modales-et-dialogues",
    },
    {
      from: "/04-design-system/notices-et-bandeaux",
      to: "/04-design-system/02-composants/notices-et-bandeaux",
    },
    {
      from: "/04-design-system/tableaux",
      to: "/04-design-system/02-composants/tableaux",
    },
    {
      from: "/04-design-system/formulaires",
      to: "/04-design-system/02-composants/formulaires",
    },
    {
      from: "/04-design-system/cartes-et-conteneurs",
      to: "/04-design-system/02-composants/cartes-et-conteneurs",
    },
    {
      from: "/04-design-system/pagination-et-stepper",
      to: "/04-design-system/02-composants/pagination-et-stepper",
    },
    {
      from: "/04-design-system/navigation-et-layout",
      to: "/04-design-system/03-layout-et-structure/navigation-et-layout",
    },

    // Skills aliases and backwards compatibility
    { from: "/07-skills/dsfr-skill", to: "/07-skills/dsfr" },
    { from: "/07-skills/rgaa-review-skill", to: "/07-skills/rgaa-review" },
    { from: "/07-skills/lasuite-dev-skill", to: "/07-skills/lasuite-dev" },
    { from: "/07-skills/docs-mdx-skill", to: "/07-skills/docs-mdx" },
    { from: "/07-skills/code-review-skill", to: "/07-skills/code-review" },
    {
      from: "/07-skills/architecture-review-skill",
      to: "/07-skills/architecture-review",
    },
    { from: "/07-skills/design-change-skill", to: "/07-skills/design-change" },
    { from: "/skills/dsfr", to: "/07-skills/dsfr" },
    { from: "/skills/rgaa-review", to: "/07-skills/rgaa-review" },
    { from: "/skills/lasuite-dev", to: "/07-skills/lasuite-dev" },
    { from: "/skills/docs-mdx", to: "/07-skills/docs-mdx" },
    { from: "/skills/code-review", to: "/07-skills/code-review" },
    {
      from: "/skills/architecture-review",
      to: "/07-skills/architecture-review",
    },
    { from: "/skills/design-change", to: "/07-skills/design-change" },

    // Backwards compatibility for 04-ressources moved to 05-ressources
    { from: "/04-ressources", to: "/05-ressources/communaute" },
    { from: "/04-ressources/communaute", to: "/05-ressources/communaute" },
    { from: "/04-ressources/roadmap", to: "/05-ressources/roadmap" },
    // Legacy guide redirects
    { from: "/guide/index", to: "/01-onboarding" },
    { from: "/guide/onboarding", to: "/01-onboarding" },
    { from: "/guide/git-ssh", to: "/01-onboarding/01-demarrage/git-ssh" },
    {
      from: "/guide/workflow",
      to: "/01-onboarding/02-workflow-et-contribution/workflow",
    },
    { from: "/guide/architecture", to: "/02-architecture" },
    {
      from: "/guide/auth",
      to: "/02-architecture/01-securite-et-identite/auth",
    },
    {
      from: "/guide/hot-reload",
      to: "/02-architecture/03-devops-et-deploiement/hot-reload",
    },
    { from: "/guide/env", to: "/02-architecture/03-devops-et-deploiement/env" },
    { from: "/guide/projects-status", to: "/03-projets" },
    { from: "/guide/roadmap", to: "/05-ressources/roadmap" },
    { from: "/projets/docs", to: "/03-projets/01-documents-et-contenus/docs" },
    {
      from: "/projets/projects",
      to: "/03-projets/03-gestion-et-utilisateurs/projects",
    },
    {
      from: "/projets/meet",
      to: "/03-projets/02-communication-et-echange/meet",
    },
    {
      from: "/projets/transfers",
      to: "/03-projets/02-communication-et-echange/transfers",
    },
    {
      from: "/projets/people",
      to: "/03-projets/03-gestion-et-utilisateurs/people",
    },
    {
      from: "/projets/accounts",
      to: "/03-projets/03-gestion-et-utilisateurs/accounts",
    },
  ];

  const content = `import type { ZudokuConfig } from "zudoku";

export const docsNavigation: ZudokuConfig["navigation"] = ${JSON.stringify(navItems, null, 2)};

export const docsRedirects: ZudokuConfig["redirects"] = ${JSON.stringify(redirects, null, 2)};
`;

  fs.mkdirSync(path.dirname(config.outputFile), { recursive: true });
  fs.writeFileSync(config.outputFile, content, "utf-8");
  console.log(
    `✓ Successfully updated ${path.relative(ROOT_DIR, config.outputFile)}`,
  );
}

// Main execution
const targetArg = process.argv[2] || "all";

if (targetArg === "all") {
  for (const t of Object.keys(CONFIGS)) {
    generateNavForTarget(t);
  }
} else {
  generateNavForTarget(targetArg);
}
