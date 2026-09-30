import { SourceBlockExportBlock } from "../../src/types";
import { describe, it, expect } from "vitest";
import { blockMappingSourceBlockMarkdown } from "../../src/exporters/markdown";

describe("Markdown Exporter", () => {
  it("exports inline as a bold text or link", () => {
    const block = {
      type: "sourceBlock",
      props: {
        displayMode: "link",
        title: "LOI 2026",
      },
    } as unknown as SourceBlockExportBlock;
    expect(blockMappingSourceBlockMarkdown(block)).toBe("**LOI 2026**");

    block.props.url = "https://example.com";
    expect(blockMappingSourceBlockMarkdown(block)).toBe("[LOI 2026](https://example.com)");
  });

  it("exports callout as a blockquote with notes", () => {
    const block = {
      type: "sourceBlock",
      props: {
        displayMode: "callout",
        title: "LOI 2026",
        status: "In force",
        subtitle: "Légifrance",
        meta1: "Article 1",
        excerpt: "This is a law",
        url: "https://example.com",
      },
    } as unknown as SourceBlockExportBlock;

    const result = blockMappingSourceBlockMarkdown(block);
    expect(result).toContain("> [!NOTE]");
    expect(result).toContain("> **LOI 2026** [In force]");
    expect(result).toContain("> _Légifrance_");
    expect(result).toContain("> Article 1");
    expect(result).toContain("> « This is a law »");
    expect(result).toContain("> [Consulter la source officielle](https://example.com)");
  });
});
