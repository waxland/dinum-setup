import fs from "fs";
import path from "path";

const frDir = "documentation/docs/03-slasheurs-france";
const folders = fs.readdirSync(frDir).filter((f) => fs.statSync(path.join(frDir, f)).isDirectory());

for (const folder of folders) {
  const indexPath = path.join(frDir, folder, "index.mdx");
  if (!fs.existsSync(indexPath)) continue;
  let content = fs.readFileSync(indexPath, "utf8");

  if (!content.includes("<DocHeaderSummary")) {
    const summary = `<DocHeaderSummary
  readingTime="4 min"
  level="Intermédiaire"
  roles={["Agents Publics", "Développeurs Frontend"]}
  prerequisites={["Socle /slash"]}
  status="Production Ready"
  statusColor="success"
  takeaway="Découvrez et intégrez la commande souveraine dans La Suite Docs."
/>

`;
    content = content.replace(/---\n\n/, "---\n\n" + summary);
    fs.writeFileSync(indexPath, content);
  }
}
