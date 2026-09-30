import fs from "fs";
import path from "path";

const presetsDir = "documentation-international/docs/04-presets";
const files = fs.readdirSync(presetsDir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  if (file === "index.mdx") continue;
  const filePath = path.join(presetsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("<DocHeaderSummary")) {
    const summary = `<DocHeaderSummary
  readingTime="4 min"
  level="Intermediate"
  roles={["Developers", "Architects"]}
  prerequisites={["Slasher SDK"]}
  status="Production Ready"
  statusColor="success"
  takeaway="Integrate official public registries into your application."
/>

`;
    content = content.replace(/---\n\n/, "---\n\n" + summary);
    fs.writeFileSync(filePath, content);
  }
}
