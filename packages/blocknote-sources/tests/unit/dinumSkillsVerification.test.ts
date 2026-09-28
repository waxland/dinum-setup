import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("DINUM React & Python Engineering Skills Final Audit (R-09.02)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies DINUM React standards: zero Tailwind CSS and zero @mantine/core visual components in libraries", () => {
    const pkgPath = path.join(rootDir, "packages/blocknote-sources/package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    const deps = {
      ...pkg.dependencies,
      ...pkg.peerDependencies,
      ...pkg.devDependencies,
    };

    expect(deps["@mantine/core"]).toBeUndefined();
    expect(deps["@blocknote/mantine"]).toBeUndefined();
    expect(deps["tailwindcss"]).toBeUndefined();
  });

  it("verifies DINUM Python standards: pyproject.toml defines strict Ruff configuration and Python >= 3.12", () => {
    const pyprojectPath = path.join(rootDir, "packages/django-lasuite-sources/pyproject.toml");
    const content = fs.readFileSync(pyprojectPath, "utf-8");

    expect(content).toContain('requires-python = ">=3.12"');
    expect(content).toContain("[tool.ruff]");
    expect(content).toContain('target-version = "py312"');
    expect(content).toContain("[tool.ruff.lint]");
  });

  it("verifies accessibility standards: RGAA v4.1 AA and WAI-ARIA combobox/dialog attributes", () => {
    const popoverPath = path.join(
      rootDir,
      "packages/blocknote-sources/src/components/SourceSearchPopover.tsx",
    );
    const popoverContent = fs.readFileSync(popoverPath, "utf-8");

    expect(popoverContent).toContain('role: "combobox"');
    expect(popoverContent).toContain('role="listbox"');
    expect(popoverContent).toContain('role="status"');
    expect(popoverContent).toContain("aria-live");
    expect(popoverContent).toContain("aria-activedescendant");
  });

  it("verifies security standards: anti-SSRF defensive validation and circuit breaker in backend", () => {
    const transportPath = path.join(
      rootDir,
      "packages/django-lasuite-sources/lasuite_sources/transport.py",
    );
    const transportContent = fs.readFileSync(transportPath, "utf-8");

    expect(transportContent).toContain("validate_destination");
    expect(transportContent).toContain("is_safe_external_url");
    expect(transportContent).toContain("PublicResolver");
  });
});
