import { SourceBlockExportBlock } from "../../src/types";
import { describe, it, expect } from "vitest";
import { parseSearchResponse } from "../../src/searchClient";
import { blockMappingSourceBlockMarkdown } from "../../src/exporters/markdown";

describe("ACT-003: Citation parsing and export", () => {
  it("should parse citation from payload", () => {
    const payload = {
      results: [
        {
          source_id: "1",
          entity_type: "law",
          display_mode: "callout",
          title: "Test",
          citation: "@article{test,\n  title={Test}\n}",
        },
      ],
    };

    const parsed = parseSearchResponse(payload);
    expect(parsed[0].citation).toBe("@article{test,\n  title={Test}\n}");
  });

  it("should render citation in Markdown export if present", () => {
    const block = {
      type: "sourceBlock",
      props: {
        displayMode: "callout",
        title: "LOI 2026",
        citation: "@article{loi2026,\n  title={LOI 2026}\n}",
      },
    } as unknown as SourceBlockExportBlock;

    const md = blockMappingSourceBlockMarkdown(block);
    expect(md).toContain(
      "> **Citation:**\n> ```bibtex\n> @article{loi2026,\n>   title={LOI 2026}\n> }\n> ```",
    );
  });
});
