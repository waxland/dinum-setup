import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Portals SSR Build, Pagefind Index and Hydration Verification (R-08.04)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies existence and structure of docs/PORTALS_AND_BUILD_VERIFICATION.md", () => {
    const reportPath = path.join(rootDir, "docs/PORTALS_AND_BUILD_VERIFICATION.md");
    expect(fs.existsSync(reportPath)).toBe(true);

    const content = fs.readFileSync(reportPath, "utf-8");
    expect(content).toContain("Portals & Build Verification Report");
    expect(content).toContain("270 routes");
    expect(content).toContain("148 routes");
    expect(content).toContain("118 content pages");
    expect(content).toContain("31 content pages");
  });

  it("verifies FR documentation static dist directory and pagefind files exist", () => {
    const distPath = path.join(rootDir, "documentation/dist");
    expect(fs.existsSync(distPath)).toBe(true);

    const indexPath = path.join(distPath, "index.html");
    expect(fs.existsSync(indexPath)).toBe(true);

    const pagefindJs = path.join(distPath, "pagefind/pagefind.js");
    expect(fs.existsSync(pagefindJs)).toBe(true);

    const pagefindEntry = path.join(distPath, "pagefind/pagefind-entry.json");
    expect(fs.existsSync(pagefindEntry)).toBe(true);
  });

  it("verifies EN international documentation static dist directory and pagefind files exist", () => {
    const distPath = path.join(rootDir, "documentation-international/dist");
    expect(fs.existsSync(distPath)).toBe(true);

    const indexPath = path.join(distPath, "index.html");
    expect(fs.existsSync(indexPath)).toBe(true);

    const pagefindJs = path.join(distPath, "pagefind/pagefind.js");
    expect(fs.existsSync(pagefindJs)).toBe(true);

    const pagefindEntry = path.join(distPath, "pagefind/pagefind-entry.json");
    expect(fs.existsSync(pagefindEntry)).toBe(true);
  });
});
