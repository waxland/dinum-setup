import { execSync } from "node:child_process";
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
 * Formats directory name into a human-readable title for International docs.
 */
function formatLabel(name) {
  const clean = name.replace(/^(\d+-)+/, "");

  const specialLabels = {
    overview: "Overview",
    "blocknote-extension": "BlockNote Extension",
    "provider-sdk": "Provider SDK",
    "backend-proxy": "Backend Proxy",
    presets: "Presets",
    "rfc-upstream": "RFC & Specification",
    "european-union": "European Union",
    canada: "Canada",
    "germany-bund": "Germany (Bund)",
    "netherlands-gov": "Netherlands (Gov)",
    "spain-boe": "Spain (BOE)",
    international: "International",
    "3-display-formats": "Display Formats",
    "document-exports": "Document Exports",
    "floating-search-popover": "Search Popover",
    "styling-and-themes": "Themes & Styling",
    "consumer-migration-guide": "Consumer Migration Guide",
    "build-provider-in-15-min": "Quickstart Tutorial",
    "define-source-provider": "Source Provider",
    "typescript-contracts": "TypeScript Contracts",
    "defensive-security-ssrf": "Defensive Security",
    "deterministic-cache": "Deterministic Cache",
    "quota-and-rate-limiting": "Quotas & Rate Limiting",
    "blocknote-rfc-specification": "BlockNote RFC",
    "architecture-3-tier": "3-Tier Architecture",
    "engineering-standards": "Engineering Standards",
    "international-vision": "International Vision",
    "05-toml-frontmatter": "TOML Frontmatter",
  };

  if (specialLabels[clean]) {
    return specialLabels[clean];
  }

  const acronyms = {
    sdk: "SDK",
    api: "API",
    rfc: "RFC",
    ssrf: "SSRF",
    rgaa: "RGAA",
    wcag: "WCAG",
    crdt: "CRDT",
    yjs: "Yjs",
    eu: "EU",
    un: "UN",
    uk: "UK",
    ca: "CA",
    de: "DE",
    nl: "NL",
    es: "ES",
    fr: "FR",
    dto: "DTO",
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
    if (lower === "fr") return "flag";
    if (lower === "en" || lower === "de" || lower === "nl" || lower === "es") return "globe";
    if (lower.includes("accueil") || lower.includes("home")) return "home";
    if (lower.includes("onboarding") || lower.includes("demarrage")) return "compass";
    if (lower.includes("archi")) return "layers";
    if (lower.includes("projet") || lower.includes("project")) return "boxes";
    if (lower.includes("design") || lower.includes("dsfr") || lower.includes("ui"))
      return "palette";
    if (lower.includes("tutoriel") || lower.includes("tutorial") || lower.includes("recette"))
      return "sparkles";
    if (lower.includes("skill") || lower.includes("agent") || lower.includes("competence"))
      return "bot";
    if (lower.includes("slash") || lower.includes("commande")) return "terminal";
    if (lower.includes("ressource") || lower.includes("roadmap") || lower.includes("communaute"))
      return "map";
    if (lower.includes("guide") || lower.includes("doc")) return "book-open";
    if (lower.includes("lien") || lower.includes("link")) return "external-link";
  }

  // Depth > 0 (Sub-categories)
  if (lower.includes("metier")) return "briefcase";
  if (lower.includes("api") || lower.includes("sdk")) return "code";
  if (lower.includes("implementation")) return "terminal";
  if (lower.includes("fondation")) return "sliders";
  if (lower.includes("composant")) return "box";
  if (lower.includes("layout") || lower.includes("structure")) return "layout-grid";
  if (lower.includes("demarrage")) return "rocket";
  if (lower.includes("workflow") || lower.includes("contribution")) return "git-pull-request";
  if (lower.includes("support")) return "life-buoy";
  if (lower.includes("securite") || lower.includes("identite")) return "shield-check";
  if (lower.includes("donnees") || lower.includes("temps-reel")) return "database";
  if (lower.includes("devops") || lower.includes("deploiement")) return "cloud";
  if (lower.includes("socle") || lower.includes("standard") || lower.includes("technique"))
    return "layers";
  if (lower.includes("loi") || lower.includes("juridique") || lower.includes("legal"))
    return "scale";
  if (lower.includes("pappers") || lower.includes("entreprise") || lower.includes("societe"))
    return "building-2";
  if (lower.includes("assemblee") || lower.includes("parlement") || lower.includes("claire"))
    return "landmark";
  if (lower.includes("adresse") || lower.includes("ban") || lower.includes("geo")) return "map-pin";
  if (lower.includes("proposition") || lower.includes("idee")) return "lightbulb";
  if (lower.includes("remplir") || lower.includes("auto")) return "sparkles";
  if (lower.includes("document") || lower.includes("contenu")) return "file-text";
  if (lower.includes("communication") || lower.includes("echange")) return "message-square";
  if (lower.includes("gestion") || lower.includes("utilisateur")) return "users";
  if (lower.includes("developpement")) return "code";
  if (lower.includes("integration") || lower.includes("test")) return "check-circle";
  if (lower.includes("serveur") || lower.includes("server")) return "server";
  if (lower.includes("pr-") || lower.includes("pull-request")) return "git-pull-request";

  if (lower.includes("backend") || lower.includes("django")) return "server";
  if (lower.includes("frontend") || lower.includes("blocknote") || lower.includes("react"))
    return "monitor";
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
    if (e.isFile() && !e.name.endsWith(".md") && !e.name.endsWith(".mdx")) return false;
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
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      if (entry.name.startsWith("index.")) {
        if (depth === 0) {
          items.push({
            type: "doc",
            file: relPath,
            path: "/",
            label: "Home",
            icon: "home",
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
    { from: "/index", to: "/" },
    { from: "/overview", to: "/00-overview" },
    { from: "/blocknote", to: "/01-blocknote-extension" },
    { from: "/sdk", to: "/02-provider-sdk" },
    { from: "/proxy", to: "/03-backend-proxy" },
    { from: "/presets", to: "/04-presets" },
    { from: "/rfc", to: "/05-rfc-upstream" },
  ];

  const content = `import type { ZudokuConfig } from "zudoku";

export const docsNavigation: ZudokuConfig["navigation"] = ${JSON.stringify(navItems, null, 2)};

export const docsRedirects: ZudokuConfig["redirects"] = ${JSON.stringify(redirects, null, 2)};
`;

  fs.mkdirSync(path.dirname(config.outputFile), { recursive: true });
  fs.writeFileSync(config.outputFile, content, "utf-8");
  try {
    execSync(`npx prettier --write "${config.outputFile}"`, { stdio: "ignore" });
  } catch {
    // Fallback if prettier is not available
  }
  console.log(`✓ Successfully updated ${path.relative(ROOT_DIR, config.outputFile)}`);
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
