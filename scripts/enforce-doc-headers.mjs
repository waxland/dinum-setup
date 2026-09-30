import fs from "fs";
import path from "path";
import { execSync } from "child_process";

console.log("Checking MDX files for <DocHeaderSummary> presence...");

const filesRaw = execSync(
  'find documentation/docs documentation-international/docs -name "*.mdx"',
).toString();
const files = filesRaw.split("\n").filter(Boolean);

let missing = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes("<DocHeaderSummary")) {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error("❌ ERROR: The following files are missing <DocHeaderSummary>:");
  missing.forEach((f) => console.error(`  - ${f}`));
  console.error(
    "\nPlease add a <DocHeaderSummary> component to these files or run 'node scripts/add-missing-doc-headers.mjs'",
  );
  process.exit(1);
}

console.log(`✅ Success: All ${files.length} MDX files contain a <DocHeaderSummary>.`);
process.exit(0);
