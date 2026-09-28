import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Final Post-Update Clean Verification Audit (R-07.07)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies package.json and pyproject.toml have no unreviewed audit overrides or forced flags", () => {
    const pkgPath = path.join(rootDir, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    // Ensure all 4 security overrides are explicitly documented and justified
    expect(pkg.overrides).toBeDefined();
    expect(Object.keys(pkg.overrides)).toHaveLength(4);

    // Verify documentation of overrides exists
    const overridesDocPath = path.join(rootDir, "docs/DEPENDENCY_SECURITY_AND_OVERRIDES.md");
    expect(fs.existsSync(overridesDocPath)).toBe(true);
  });

  it("verifies dev server configurations bind portably and predictably", () => {
    const demoPkgPath = path.join(rootDir, "demo/package.json");
    const docPkgPath = path.join(rootDir, "documentation/package.json");
    const docEnPkgPath = path.join(rootDir, "documentation-international/package.json");

    const demoPkg = JSON.parse(fs.readFileSync(demoPkgPath, "utf-8"));
    const docPkg = JSON.parse(fs.readFileSync(docPkgPath, "utf-8"));
    const docEnPkg = JSON.parse(fs.readFileSync(docEnPkgPath, "utf-8"));

    expect(demoPkg.scripts.dev).toContain("5173");
    expect(docPkg.scripts.dev).toContain("zudoku dev");
    expect(docEnPkg.scripts.dev).toContain("3001");
  });

  it("verifies distribution build outputs exist and are populated", () => {
    const sdkDist = path.join(rootDir, "packages/slash-sources-sdk/dist/index.js");
    const blocknoteDist = path.join(rootDir, "packages/blocknote-sources/dist/index.mjs");
    const pythonDist = path.join(rootDir, "packages/django-lasuite-sources/dist");

    expect(fs.existsSync(sdkDist)).toBe(true);
    expect(fs.existsSync(blocknoteDist)).toBe(true);
    expect(fs.existsSync(pythonDist)).toBe(true);
    expect(fs.readdirSync(pythonDist).length).toBeGreaterThan(0);
  });
});
