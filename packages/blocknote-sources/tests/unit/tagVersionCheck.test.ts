import { execSync as exec } from "node:child_process";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("CI Release Tag and Version Coherence Verification (R-07.06)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");
  const scriptPath = path.join(rootDir, "scripts/check-tag-version.mjs");

  it("passes when git tag matches package versions (v1.0.0)", () => {
    const output = exec(`node "${scriptPath}" v1.0.0`, {
      encoding: "utf-8",
    });
    expect(output).toContain("Release version coherence confirmed!");
    expect(output).toContain("slash-sources-sdk");
    expect(output).toContain("blocknote-sources");
    expect(output).toContain("django-lasuite-sources");
  });

  it("fails when git tag version does not match package versions (v9.9.9)", () => {
    expect(() => {
      exec(`node "${scriptPath}" v9.9.9`, {
        encoding: "utf-8",
        stdio: "pipe",
      });
    }).toThrow();
  });
});
