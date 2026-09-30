import fs from "fs";
import path from "path";

const extDir = "documentation-international/docs/01-blocknote-extension";
const files = fs.readdirSync(extDir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  if (file === "index.mdx" || file === "consumer-migration-guide.mdx") continue;
  const filePath = path.join(extDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("<DocHeaderSummary")) {
    const summary = `<DocHeaderSummary
  readingTime="4 min"
  level="Intermediate"
  roles={["Frontend", "React Developers"]}
  prerequisites={["BlockNote.js"]}
  status="Standard"
  statusColor="info"
  takeaway="Understand and extend the capabilities of the Slasher BlockNote component."
/>

`;
    content = content.replace(/---\n\n/, "---\n\n" + summary);
    fs.writeFileSync(filePath, content);
  }
}
