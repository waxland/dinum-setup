import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const ADR_DIR = path.join(
  ROOT_DIR,
  "documentation/docs/01-onboarding/02-workflow-et-contribution/adr",
);

const REQUIRED_SECTIONS = [
  "## Statut",
  "## Contexte", // Covers "Contexte & Problématique"
  "## Décision Prise",
  "## Conséquences",
];

async function lintAdrs() {
  let hasError = false;

  try {
    const files = await fs.readdir(ADR_DIR);

    // Check index file for references
    let indexContent = "";
    const indexPath = path.join(ADR_DIR, "index.mdx");
    try {
      indexContent = await fs.readFile(indexPath, "utf-8");
    } catch {
      console.error("❌ ADR index file not found at", indexPath);
      hasError = true;
    }

    for (const file of files) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;
      if (file === "index.mdx" || file === "index.md") continue;

      const filePath = path.join(ADR_DIR, file);
      const content = await fs.readFile(filePath, "utf-8");

      console.log(`Checking ${file}...`);

      // Check Frontmatter
      if (!content.startsWith("---")) {
        console.error(`  ❌ Missing frontmatter in ${file}`);
        hasError = true;
      }

      // Check required sections
      for (const section of REQUIRED_SECTIONS) {
        if (!content.includes(section)) {
          console.error(`  ❌ Missing section '${section}' in ${file}`);
          hasError = true;
        }
      }

      // Check if referenced in index
      if (indexContent && !indexContent.includes(file)) {
        console.error(`  ❌ ADR ${file} is not referenced in the index file (index.mdx)`);
        hasError = true;
      }
    }
  } catch (error) {
    console.error("❌ Failed to read ADR directory:", error);
    process.exit(1);
  }

  if (hasError) {
    console.error(
      "\n⚠️ ADR linting failed. Please fix the errors above to ensure ADR structure consistency.",
    );
    process.exit(1);
  } else {
    console.log("\n✅ ADR linting passed! All ADRs follow the standard structure.");
    process.exit(0);
  }
}

lintAdrs().catch(console.error);
