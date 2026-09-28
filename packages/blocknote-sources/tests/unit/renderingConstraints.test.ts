import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("R-06.02: BlockNote & Zudoku Rendering Primitives & Constraints Audit", () => {
  const docPath = resolve(
    __dirname,
    "../../../../docs/BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md",
  );

  it("verifies docs/BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md exists and is non-empty", () => {
    expect(existsSync(docPath)).toBe(true);
    const content = readFileSync(docPath, "utf-8");
    expect(content).toContain("BlockNote & Zudoku Rendering Primitives");
    expect(content).toContain("createReactBlockSpec");
    expect(content).toContain("Zudoku");
    expect(content).toContain("0 Mantine");
  });

  it("verifies packages/blocknote-sources/package.json contains 0 dependencies on @blocknote/mantine or @mantine/core", () => {
    const pkgPath = resolve(__dirname, "../../package.json");
    const pkgJson = JSON.parse(readFileSync(pkgPath, "utf-8"));

    const allDeps = {
      ...pkgJson.dependencies,
      ...pkgJson.peerDependencies,
      ...pkgJson.devDependencies,
    };

    expect(allDeps["@blocknote/mantine"]).toBeUndefined();
    expect(allDeps["@mantine/core"]).toBeUndefined();
    expect(allDeps["@mantine/hooks"]).toBeUndefined();
    expect(allDeps["tailwindcss"]).toBeUndefined();
  });

  it("verifies SourceBlock uses UI-agnostic createReactBlockSpec from @blocknote/react", () => {
    const sourceBlockPath = resolve(__dirname, "../../src/SourceBlock.tsx");
    const sourceBlockContent = readFileSync(sourceBlockPath, "utf-8");

    expect(sourceBlockContent).toContain(
      'import { createReactBlockSpec } from "@blocknote/react";',
    );
    expect(sourceBlockContent).not.toContain("@blocknote/mantine");
    expect(sourceBlockContent).not.toContain("@mantine/core");
  });
});
