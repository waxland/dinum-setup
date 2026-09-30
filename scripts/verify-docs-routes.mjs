import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const portals = [
  {
    docsDir: path.join(ROOT_DIR, "documentation", "docs"),
    navFile: path.join(ROOT_DIR, "documentation", "zudoku.navigation.tsx"),
  },
  {
    docsDir: path.join(ROOT_DIR, "documentation-international", "docs"),
    navFile: path.join(ROOT_DIR, "documentation-international", "zudoku.navigation.tsx"),
  },
];

function getAllMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      results.push(fullPath);
    }
  }
  return results;
}

let hasErrors = false;

for (const portal of portals) {
  if (!fs.existsSync(portal.docsDir) || !fs.existsSync(portal.navFile)) continue;

  const mdxFiles = getAllMarkdownFiles(portal.docsDir);
  const navContent = fs.readFileSync(portal.navFile, "utf-8");

  // Extract all paths from navFile. Simple regex for strings starting with /
  const routeRegex = /"(\/[^"]+)"|path:\s*"(\/[^"]+)"|path:\s*'(\/[^']+)'|'(\/[^']+)'/g;
  const registeredRoutes = new Set();
  let match;
  while ((match = routeRegex.exec(navContent)) !== null) {
    const route = match[1] || match[2] || match[3] || match[4];
    if (route) registeredRoutes.add(route.replace(/\/$/, "")); // remove trailing slash
  }
  // add root explicitly
  registeredRoutes.add("");
  registeredRoutes.add("/");

  // 1. Check for orphan routes
  for (const file of mdxFiles) {
    let relPath = "/" + path.relative(portal.docsDir, file).replace(/\\/g, "/");
    // Remove .mdx or .md extension
    relPath = relPath.replace(/\.mdx?$/, "");
    // If it's an index file, the route can be the folder path
    if (relPath.endsWith("/index")) {
      const folderPath = relPath.slice(0, -6);
      if (
        !registeredRoutes.has(relPath) &&
        !registeredRoutes.has(folderPath) &&
        !registeredRoutes.has(folderPath + "/")
      ) {
        console.error(`❌ Orphan route detected: File ${file} is not referenced in navigation.`);
        hasErrors = true;
      }
    } else {
      if (!registeredRoutes.has(relPath)) {
        console.error(`❌ Orphan route detected: File ${file} is not referenced in navigation.`);
        hasErrors = true;
      }
    }
  }

  // 2. Check internal markdown links starting with /
  for (const file of mdxFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(content)) !== null) {
      const linkPath = linkMatch[2];
      if (linkPath.startsWith("/") && !linkPath.startsWith("//")) {
        const cleanPath = linkPath.split("#")[0].replace(/\/$/, "");
        if (cleanPath === "" || cleanPath === "/") continue;

        const possibleFiles = [
          path.join(portal.docsDir, cleanPath + ".mdx"),
          path.join(portal.docsDir, cleanPath + ".md"),
          path.join(portal.docsDir, cleanPath, "index.mdx"),
          path.join(portal.docsDir, cleanPath, "index.md"),
        ];

        let found = false;
        for (const pf of possibleFiles) {
          if (fs.existsSync(pf)) {
            found = true;
            break;
          }
        }

        // Also check if it's a valid path in zudoku config (could be a generated page)
        // But for docs, it should exist on disk
        if (!found) {
          // Exclude language switch links like /fr or /en
          if (cleanPath === "/fr" || cleanPath === "/en" || cleanPath === "/openapi") continue;

          console.error(`❌ Broken absolute link in ${file}: '${linkPath}'`);
          hasErrors = true;
        }
      }
    }
  }
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log("✅ All docs routes and absolute links are valid.");
}
