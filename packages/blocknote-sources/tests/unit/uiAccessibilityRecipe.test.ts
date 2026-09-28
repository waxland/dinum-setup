import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("UI Accessibility & Modal Recipe Verification (R-06.04–R-06.07)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies existence and structure of docs/UI_ACCESSIBILITY_AND_RECIPE.md", () => {
    const docPath = path.join(rootDir, "docs/UI_ACCESSIBILITY_AND_RECIPE.md");
    expect(fs.existsSync(docPath)).toBe(true);

    const content = fs.readFileSync(docPath, "utf-8");
    expect(content).toContain("Modal & Overlay Accessibility Matrix (R-06.04)");
    expect(content).toContain("Keyboard & Clipboard Action Verification (R-06.05)");
    expect(content).toContain("Contrast Ratios & Responsive Viewports (R-06.06)");
    expect(content).toContain("Screen Reader Recipe Status & Test Scenarios (R-06.07)");
  });

  it("verifies accessible modal properties in Mermaid.tsx and DSFRPreviews.tsx", () => {
    const mermaidPath = path.join(rootDir, "documentation/src/components/Mermaid.tsx");
    const previewsPath = path.join(rootDir, "documentation/src/components/DSFRPreviews.tsx");

    const mermaidContent = fs.readFileSync(mermaidPath, "utf-8");
    expect(mermaidContent).toContain('role="dialog"');
    expect(mermaidContent).toContain('aria-modal="true"');
    expect(mermaidContent).toContain("triggerRef");
    expect(mermaidContent).toContain("closeBtnRef");

    const previewsContent = fs.readFileSync(previewsPath, "utf-8");
    expect(previewsContent).toContain('role="dialog"');
    expect(previewsContent).toContain('aria-modal="true"');
    expect(previewsContent).toContain("cancelBtnRef");
  });

  it("verifies clipboard error handling in CodeTabs.tsx", () => {
    const codeTabsPath = path.join(rootDir, "documentation/src/components/CodeTabs.tsx");
    const content = fs.readFileSync(codeTabsPath, "utf-8");

    expect(content).toContain('setCopyState("error")');
    expect(content).toContain("Échec de la copie");
  });
});
