import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

function getAllMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    if (
      entry.name === "node_modules" ||
      entry.name === "dist" ||
      entry.name === ".venv" ||
      entry.name === "LaSuite" ||
      entry.name.startsWith(".")
    ) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      results.push(fullPath);
    }
  }
  return results;
}

const markdownFiles = getAllMarkdownFiles(ROOT_DIR);
let brokenLinks = 0;

for (const file of markdownFiles) {
  const content = fs.readFileSync(file, "utf-8");
  // Match markdown links [text](path)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const linkPath = match[2];
    // Ignore external URLs (http, https, mailto, etc.), anchor links, and Zudoku router absolute paths starting with /
    if (
      linkPath.startsWith("http://") ||
      linkPath.startsWith("https://") ||
      linkPath.startsWith("mailto:") ||
      linkPath.startsWith("#") ||
      linkPath.startsWith("/")
    ) {
      continue;
    }

    // Strip optional anchor
    const cleanPath = linkPath.split("#")[0];
    if (!cleanPath) continue;

    // Resolve relative path
    const resolvedPath = path.resolve(path.dirname(file), cleanPath);
    if (!fs.existsSync(resolvedPath)) {
      console.error(
        `❌ Broken link in ${path.relative(ROOT_DIR, file)}: '${linkPath}' -> ${path.relative(ROOT_DIR, resolvedPath)}`,
      );
      brokenLinks++;
    }
  }
}

if (brokenLinks > 0) {
  console.error(`❌ Found ${brokenLinks} broken local markdown link(s).`);
  process.exit(1);
} else {
  console.log(`✅ All local markdown links across all files are valid!`);
}
