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
    defaultRedirect: { from: "/", to: "/guide/index" },
  },
};

/**
 * Formats directory name into a human-readable title.
 * Removes leading numbering prefixes like '01-', '1-' and formats acronyms.
 */
function formatLabel(name) {
  const clean = name.replace(/^(\d+-)+/, "");

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
 * Returns default Lucide icon name for top-level categories.
 */
function getDefaultIcon(name, depth) {
  if (depth === 0) {
    const lower = name.toLowerCase();
    if (lower.includes("archi")) return "layers";
    if (lower.includes("onboarding") || lower.includes("demarrage"))
      return "compass";
    if (lower.includes("roadmap") || lower.includes("ressource"))
      return "map";
    if (lower.includes("guide") || lower.includes("doc")) return "book-open";
    if (lower.includes("projet") || lower.includes("project")) return "boxes";
    if (lower.includes("lien") || lower.includes("link"))
      return "external-link";
    if (lower === "backend") return "server";
    if (lower === "frontend") return "monitor";
    if (lower === "components") return "box";
    if (lower.includes("sdk") || lower.includes("api")) return "code";
  }
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

  // Sort entries: index first, then natural sorting
  validEntries.sort((a, b) => {
    const aIsIndex = a.name.startsWith("index.");
    const bIsIndex = b.name.startsWith("index.");
    if (aIsIndex && !bIsIndex) return -1;
    if (!aIsIndex && bIsIndex) return 1;

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
      const route = "/" + relPath.replace(/\.mdx?$/, "");
      items.push(route);
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

  // Add external links category
  navItems.push({
    type: "category",
    label: "Liens",
    icon: "external-link",
    items: [
      {
        type: "link",
        label: "GitHub La Suite",
        to: "https://github.com/suitenumerique",
        target: "_blank",
      },
      {
        type: "link",
        label: "Site La Suite",
        to: "https://lasuite.numerique.gouv.fr/",
        target: "_blank",
      },
    ],
  });

  const content = `import type { ZudokuConfig } from "zudoku";

export const docsNavigation: ZudokuConfig["navigation"] = ${JSON.stringify(navItems, null, 2)};

export const docsRedirects: ZudokuConfig["redirects"] = [
  ${JSON.stringify(config.defaultRedirect, null, 2)}
];
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
