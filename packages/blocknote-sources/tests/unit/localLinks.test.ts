import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Local Links and Arbitrage Guide Verification (R-08.01)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies existence and content of PR/04-guide-d-arbitrage.md", () => {
    const arbitragePath = path.join(rootDir, "PR/04-guide-d-arbitrage.md");
    expect(fs.existsSync(arbitragePath)).toBe(true);

    const content = fs.readFileSync(arbitragePath, "utf-8");
    expect(content).toContain("Guide d'Arbitrage Stratégique");
    expect(content).toContain("Option A");
    expect(content).toContain("Option B");
    expect(content).toContain("In-Tree Monolith");
    expect(content).toContain("Packages Autonomes");
  });

  it("verifies all relative file links in PR/README.md resolve to existing files", () => {
    const prReadmePath = path.join(rootDir, "PR/README.md");
    expect(fs.existsSync(prReadmePath)).toBe(true);

    const content = fs.readFileSync(prReadmePath, "utf-8");
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(content)) !== null) {
      const linkPath = match[2];
      if (
        !linkPath ||
        linkPath.startsWith("http://") ||
        linkPath.startsWith("https://") ||
        linkPath.startsWith("#") ||
        linkPath.startsWith("/")
      ) {
        continue;
      }

      const cleanPath = linkPath.split("#")[0];
      if (!cleanPath) {
        continue;
      }

      const resolvedPath = path.resolve(path.dirname(prReadmePath), cleanPath);
      expect(
        fs.existsSync(resolvedPath),
        `Link in PR/README.md pointing to '${linkPath}' does not exist on disk`,
      ).toBe(true);
    }
  });

  it("verifies all relative file links in root README.md resolve to existing files", () => {
    const rootReadmePath = path.join(rootDir, "README.md");
    expect(fs.existsSync(rootReadmePath)).toBe(true);

    const content = fs.readFileSync(rootReadmePath, "utf-8");
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(content)) !== null) {
      const linkPath = match[2];
      if (
        !linkPath ||
        linkPath.startsWith("http://") ||
        linkPath.startsWith("https://") ||
        linkPath.startsWith("#") ||
        linkPath.startsWith("/")
      ) {
        continue;
      }

      const cleanPath = linkPath.split("#")[0];
      if (!cleanPath) {
        continue;
      }

      const resolvedPath = path.resolve(path.dirname(rootReadmePath), cleanPath);
      expect(
        fs.existsSync(resolvedPath),
        `Link in README.md pointing to '${linkPath}' does not exist on disk`,
      ).toBe(true);
    }
  });
});
