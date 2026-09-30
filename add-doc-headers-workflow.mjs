import fs from "fs";
import path from "path";

const wfDir = "documentation/docs/01-onboarding/02-workflow-et-contribution";
const files = fs.readdirSync(wfDir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  const filePath = path.join(wfDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("<DocHeaderSummary")) {
    const summary = `<DocHeaderSummary
  readingTime="5 min"
  level="Débutant à Avancé"
  roles={["Développeurs", "Contributeurs"]}
  prerequisites={["Environnement local configuré"]}
  status="DPG Standard"
  statusColor="success"
  takeaway="Comprendre et appliquer les normes de qualité, les tests et le workflow de contribution attendus sur le projet."
/>

`;
    content = content.replace(/---\n\n/, "---\n\n" + summary);
    fs.writeFileSync(filePath, content);
  }
}
