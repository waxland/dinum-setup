import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Git Ignore and Artifact Cleanliness Audit (R-08.05)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies existence and content of docs/GITIGNORE_AND_ARTIFACTS_AUDIT.md", () => {
    const auditDocPath = path.join(rootDir, "docs/GITIGNORE_AND_ARTIFACTS_AUDIT.md");
    expect(fs.existsSync(auditDocPath)).toBe(true);

    const content = fs.readFileSync(auditDocPath, "utf-8");
    expect(content).toContain("Gitignore, Secrets & Execution Artifacts Audit");
    expect(content).toContain("node_modules");
    expect(content).toContain(".venv");
    expect(content).toContain("test-results");
    expect(content).toContain(".env.example");
  });

  it("verifies no tracked files match ignored execution artifact patterns", () => {
    const gitStatus = execSync("git status -s", {
      cwd: rootDir,
      encoding: "utf-8",
    });

    const lines = gitStatus.split("\n");
    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }
      const statusPath = line.substring(3).trim();

      // Ensure no compiled pyc, __pycache__, test-results or secrets are tracked
      expect(statusPath).not.toMatch(/\.pyc$/);
      expect(statusPath).not.toMatch(/__pycache__/);
      expect(statusPath).not.toMatch(/^test-results\//);
      expect(statusPath).not.toMatch(/^\.env$/);
    }
  });
});
