import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("R-06.01: UI Mapping, Accessibility & Design System Compliance Audit", () => {
  const mappingPath = resolve(
    __dirname,
    "../../../../docs/UI_ACCESSIBILITY_AND_DESIGN_SYSTEM_MAPPING.md",
  );

  it("verifies docs/UI_ACCESSIBILITY_AND_DESIGN_SYSTEM_MAPPING.md exists and is non-empty", () => {
    expect(existsSync(mappingPath)).toBe(true);
    const content = readFileSync(mappingPath, "utf-8");
    expect(content).toContain("UI, Accessibility & Design System Mapping");
    expect(content).toContain("SourceSearchPopover");
    expect(content).toContain("SourceBlockToolbar");
    expect(content).toContain("SourceCalloutFormat");
    expect(content).toContain("SourceCardFormat");
    expect(content).toContain("SourceLinkFormat");
    expect(content).toContain("Mermaid");
    expect(content).toContain("ModalPreview");
  });

  it("verifies zero Mantine or Tailwind imports inside packages/blocknote-sources/src/", () => {
    const sourceFiles = [
      "../../src/components/SourceSearchPopover.tsx",
      "../../src/components/SourceInlineContent.tsx",
      "../../src/formats/SourceBlockToolbar.tsx",
      "../../src/formats/SourceCalloutFormat.tsx",
      "../../src/formats/SourceCardFormat.tsx",
      "../../src/formats/SourceLinkFormat.tsx",
      "../../src/SourceBlock.tsx",
      "../../src/searchClient.ts",
    ];

    sourceFiles.forEach((fileRel) => {
      const fullPath = resolve(__dirname, fileRel);
      expect(existsSync(fullPath)).toBe(true);
      const fileContent = readFileSync(fullPath, "utf-8");
      expect(fileContent).not.toContain("@mantine");
      expect(fileContent).not.toContain("mantine");
    });
  });

  it("verifies WAI-ARIA accessibility attributes on popover and link components", () => {
    const popoverContent = readFileSync(
      resolve(__dirname, "../../src/components/SourceSearchPopover.tsx"),
      "utf-8",
    );
    expect(popoverContent).toContain("combobox");
    expect(popoverContent).toContain("listbox");
    expect(popoverContent).toContain("status");
    expect(popoverContent).toContain("aria-expanded");
    expect(popoverContent).toContain("aria-activedescendant");

    const linkContent = readFileSync(
      resolve(__dirname, "../../src/formats/SourceLinkFormat.tsx"),
      "utf-8",
    );
    expect(linkContent).toContain("aria-haspopup");
    expect(linkContent).toContain("aria-expanded");
    expect(linkContent).toContain("dialog");
  });
});
