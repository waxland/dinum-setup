import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const filesRaw = execSync(
  'grep -L "DocHeaderSummary" $(find documentation/docs documentation-international/docs -name "*.mdx")',
).toString();
const files = filesRaw.split("\n").filter(Boolean);

let updated = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  if (content.includes("<DocHeaderSummary")) {
    continue;
  }

  // Find the end of frontmatter (either --- or +++)
  const lines = content.split("\n");
  let inFrontmatter = false;
  let endIdx = -1;
  let delimiter = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (i === 0 && (line === "---" || line === "+++")) {
      inFrontmatter = true;
      delimiter = line;
      continue;
    }
    if (inFrontmatter && line === delimiter) {
      endIdx = i;
      break;
    }
  }

  if (endIdx !== -1) {
    const isEn = file.includes("documentation-international");

    const docHeader = isEn
      ? `\n<DocHeaderSummary
  readingTime="3 min"
  level="Intermediate"
  roles={["Developers", "Contributors"]}
  prerequisites={["None"]}
  status="Production Ready"
  statusColor="success"
  takeaway="Detailed documentation page containing context, specs, and references."
/>\n`
      : `\n<DocHeaderSummary
  readingTime="3 min"
  level="Débutant à Intermédiaire"
  roles={["Développeurs", "Contributeurs"]}
  prerequisites={["Aucun"]}
  status="DPG Standard"
  statusColor="success"
  takeaway="Page documentaire détaillée contenant contexte, spécifications et références."
/>\n`;

    lines.splice(endIdx + 1, 0, docHeader);
    fs.writeFileSync(file, lines.join("\n"), "utf8");
    updated++;
  }
}

console.log(`Updated ${updated} files with missing DocHeaderSummary.`);
