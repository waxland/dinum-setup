import fs from "node:fs";
import path from "node:path";
import toml from "toml";
import { describe, expect, it } from "vitest";

describe("Dependency Overrides and TOML Compatibility (R-07.01)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies the 4 security overrides declared in root package.json", () => {
    const pkgPath = path.join(rootDir, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    expect(pkg.overrides).toBeDefined();
    expect(pkg.overrides["esbuild@>=0.27.0 <0.28.1"]).toBe("0.28.1");
    expect(pkg.overrides["hono"]).toBe("4.13.5");
    expect(pkg.overrides["toml"]).toBe("4.2.0");
    expect(pkg.overrides["uuid@9.0.1"]).toBe("11.1.1");
  });

  it("parses TOML frontmatter data correctly using the overridden toml library (4.2.0)", () => {
    const sampleTomlFrontmatter = `
title = "Frontmatter TOML Support"
sidebar_label = "Support TOML"
description = "Vérification de la compatibilité du parseur TOML 4.2.0 dans la chaîne MDX Zudoku."
author = "DINUM"
version = 1.0
features = ["mdx", "toml", "zudoku"]
`;

    const parsed = toml.parse(sampleTomlFrontmatter);
    expect(parsed.title).toBe("Frontmatter TOML Support");
    expect(parsed.sidebar_label).toBe("Support TOML");
    expect(parsed.author).toBe("DINUM");
    expect(parsed.version).toBe(1.0);
    expect(parsed.features).toEqual(["mdx", "toml", "zudoku"]);
  });

  it("verifies existence of docs/DEPENDENCY_SECURITY_AND_OVERRIDES.md", () => {
    const docPath = path.join(rootDir, "docs/DEPENDENCY_SECURITY_AND_OVERRIDES.md");
    expect(fs.existsSync(docPath)).toBe(true);

    const content = fs.readFileSync(docPath, "utf-8");
    expect(content).toContain("esbuild");
    expect(content).toContain("hono");
    expect(content).toContain("toml");
    expect(content).toContain("uuid");
    expect(content).toContain("npm audit");
  });
});
