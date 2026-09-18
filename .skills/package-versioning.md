---
title: Package Versioning, Build & Distribution
sidebar_label: Package Versioning
description: Semantic versioning rules (SemVer 2.0.0), artifact compilation (.tgz, .whl), multi-package synchronization, and 100% CLI release workflows.
---

This skill defines the standardized procedure for managing versions, compiling distributable artifacts, and publishing releases for all packages in the `dinum-setup` repository (`packages/slash-sources-sdk`, `packages/blocknote-sources`, `packages/django-lasuite-sources`).

---

## 1. When to Use

- Bumping package versions following new features, bugfixes, or breaking changes.
- Compiling TypeScript packages into ESM, CJS, and DTS bundles.
- Packaging Python packages into wheel (`.whl`) and source archives (`.tar.gz`).
- Creating and publishing official releases via GitHub CLI (`gh release create`).
- _Do not use for:_ submitting pull requests to upstream applications (use [Send PR Skill](send-pr.md)).

---

## 2. Context & Inputs

- Root architecture guide: `PACKAGES_VERSIONING.md`.
- Package manifests:
  - `packages/slash-sources-sdk/package.json`
  - `packages/blocknote-sources/package.json`
  - `packages/django-lasuite-sources/pyproject.toml`
- Automated workflows: `.github/workflows/publish-packages.yml`.

---

## 3. Step-by-Step Procedure

### Step 1: Determine the Semantic Version Bump Type

Follow **SemVer 2.0.0** (`MAJOR.MINOR.PATCH`):
- **`PATCH` (`v1.0.0` $\to$ `v1.0.1`):** Bug fixes, internal refactoring, anti-SSRF security patches, zero contract changes.
- **`MINOR` (`v1.0.0` $\to$ `v1.1.0`):** New sovereign API connectors, new export adapters, non-breaking schema additions.
- **`MAJOR` (`v1.0.0` $\to$ `v2.0.0`):** Breaking changes to `SourceEntityProps` DTO, API signature changes, dropping runtime support.

### Step 2: Synchronize Version Strings Across Manifests

Update the version field in all relevant files:
```bash
# Example for bumping to 1.0.1
# packages/slash-sources-sdk/package.json -> "version": "1.0.1"
# packages/blocknote-sources/package.json -> "version": "1.0.1"
# packages/django-lasuite-sources/pyproject.toml -> version = "1.0.1"
# packages/django-lasuite-sources/lasuite_sources/__init__.py -> __version__ = "1.0.1"
```

### Step 3: Run Full Test & Validation Suites

```bash
# 1. Run Vitest on TypeScript packages (15/15)
npm run packages:test

# 2. Run Pytest on Django package (22/22)
cd packages/django-lasuite-sources && PYTHONPATH=. .venv/bin/pytest && cd ../..
```

### Step 4: Compile & Build Distributable Artifacts

```bash
# 1. Build TypeScript packages
npm run packages:build

# 2. Generate npm tarballs (.tgz)
cd packages/slash-sources-sdk && npm pack && cd ../..
cd packages/blocknote-sources && npm pack && cd ../..

# 3. Build Python Wheel and sdist
cd packages/django-lasuite-sources && .venv/bin/python -m build && cd ../..
```

### Step 5: Publish Release via GitHub CLI

```bash
# Publish official release with all binary artifacts attached
gh release create vX.Y.Z \
  packages/slash-sources-sdk/suitenumerique-slash-sources-sdk-X.Y.Z.tgz \
  packages/blocknote-sources/suitenumerique-blocknote-sources-X.Y.Z.tgz \
  packages/django-lasuite-sources/dist/django_lasuite_sources-X.Y.Z-py3-none-any.whl \
  packages/django-lasuite-sources/dist/django_lasuite_sources-X.Y.Z.tar.gz \
  --title "vX.Y.Z — Sovereign Slasher Packages Release" \
  --notes "Detailed release notes for vX.Y.Z"
```

---

## 4. Deliverables & Verification

- Version strings synchronized across all 3 package manifests.
- All test suites passing (`15/15` TS tests, `22/22` Pytest tests).
- All 4 binary packages generated and downloadable with HTTP 200:
  - `suitenumerique-slash-sources-sdk-X.Y.Z.tgz`
  - `suitenumerique-blocknote-sources-X.Y.Z.tgz`
  - `django_lasuite_sources-X.Y.Z-py3-none-any.whl`
  - `django_lasuite_sources-X.Y.Z.tar.gz`
- GitHub Release visible and verified with `gh release view vX.Y.Z`.

---

## 5. Sources & References

- **Semantic Versioning 2.0.0:** [https://semver.org/](https://semver.org/)
- **Python Packaging User Guide (PyPA):** [https://packaging.python.org/](https://packaging.python.org/)
- **npm Packaging & Publishing Guide:** [https://docs.npmjs.com/packages-and-modules](https://docs.npmjs.com/packages-and-modules)
- **Architecture & Versioning Guide:** [`PACKAGES_VERSIONING.md`](../PACKAGES_VERSIONING.md)
