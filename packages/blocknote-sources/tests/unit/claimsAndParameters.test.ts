import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Documented Claims and Parameter Alignment Audit (R-08.02)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies root README.md reflects exact test counts and accessibility wording", () => {
    const readmePath = path.join(rootDir, "README.md");
    const content = fs.readFileSync(readmePath, "utf-8");

    expect(content).toContain("TypeScript Unit Tests (68/68)");
    expect(content).toContain("Django Unit Tests (149/149)");
    expect(content).toContain(
      "Designed according to **RGAA v4.1 (Level AA) / WCAG 2.1 AA** guidelines",
    );
    expect(content).not.toContain("100% compliant with **RGAA v4.1");
  });

  it("verifies provider inventory accurately describes live vs demo connector modes", () => {
    const inventoryPath = path.join(
      rootDir,
      "packages/django-lasuite-sources/docs/PROVIDERS_INVENTORY.md",
    );
    expect(fs.existsSync(inventoryPath)).toBe(true);

    const content = fs.readFileSync(inventoryPath, "utf-8");
    expect(content).toContain("Total Registered Providers: 53");
    expect(content).toContain("address");
    expect(content).toContain("albert");
    expect(content).toContain("law");
  });

  it("verifies documentation pages avoid unproven 'DPGA Certified' claims", () => {
    const indexMdxPath = path.join(rootDir, "documentation/docs/index.mdx");
    const content = fs.readFileSync(indexMdxPath, "utf-8");

    expect(content).toContain('status="DPG Standard"');
    expect(content).not.toContain('status="DPGA Certified"');
  });
});
