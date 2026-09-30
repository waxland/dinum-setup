import fs from "fs";
import path from "path";

const frDir = "documentation/docs/03-slasheurs-france";
const files = fs.readdirSync(frDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

for (const file of files) {
  if (file === "index.mdx" || file === "01-loi" || file === "02-assemblee") continue;
  const filePath = path.join(frDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("<DocHeaderSummary")) {
    const summary = `<DocHeaderSummary
  readingTime="5 min"
  level="Débutant à Intermédiaire"
  roles={["Développeurs", "Chefs de Produit"]}
  prerequisites={["Architecture La Suite"]}
  status="Standard"
  statusColor="info"
  takeaway="Comprendre le fonctionnement technique et stratégique des slasheurs souverains."
/>

`;
    content = content.replace(/---\n\n/, "---\n\n" + summary);
    fs.writeFileSync(filePath, content);
  }
}
