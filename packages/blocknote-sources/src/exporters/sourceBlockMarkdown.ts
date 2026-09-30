import { SourceBlockExportBlock } from "../types";

export const blockMappingSourceBlockMarkdown = (block: SourceBlockExportBlock): string => {
  const props = block.props;
  const metaParts = [props.meta1, props.meta2, props.meta3].filter(Boolean);

  let md = "";

  if (props.displayMode === "link") {
    if (props.url) {
      return `[${props.title || "Source"}](${props.url})`;
    }
    return `**${props.title || "Source"}**`;
  }

  // Callout or Card Format: Use GitHub Flavored Markdown blockquote
  md += `> [!NOTE]\n`;

  let titleLine = `> **${props.title || "Sovereign Source"}**`;
  if (props.status) {
    titleLine += ` [${props.status}]`;
  }
  md += `${titleLine}\n`;

  if (props.subtitle) {
    md += `> _${props.subtitle}_\n`;
  }

  if (metaParts.length > 0) {
    md += `> ${metaParts.join(" • ")}\n`;
  }

  if (props.excerpt) {
    md += `>\n> « ${props.excerpt} »\n`;
  } else if (props.summary) {
    md += `>\n> ${props.summary}\n`;
  }

  if (props.url) {
    md += `>\n> [Consulter la source officielle](${props.url})\n`;
  }

  if (props.citation) {
    md += `>\n> **Citation:**\n`;
    const lines = props.citation.split("\n");
    md += `> \`\`\`bibtex\n`;
    lines.forEach((line) => {
      md += `> ${line}\n`;
    });
    md += `> \`\`\`\n`;
  }

  return md;
};
