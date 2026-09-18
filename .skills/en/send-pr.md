---
title: Pull Request Submission & Upstream Contribution
sidebar_label: Send PR
description: Standards, Gitlint/Gitmoji conventions, DCO/SSH signing, and step-by-step procedure to prepare and open Pull Requests for La Suite Numérique.
---

This skill defines the standardized procedure for preparing, signing, and submitting official Pull Requests to **La Suite Numérique** upstream repositories (`suitenumerique/docs`, `projects`, `meet`, `transfers`, `people`, `accounts`) and external partners (`TypeCellOS/BlockNote`).

---

## 1. When to Use

- Submitting a new feature, bugfix, or documentation update upstream.
- Formatting commit messages complying with Gitlint rules and Gitmoji conventions.
- Ensuring DCO (`git commit -s`) and cryptographic SSH/GPG signature compliance.
- Configuring Git remotes (`upstream` official vs `origin` personal fork).
- _Do not use for:_ code review or diff quality analysis (use [Code Review Skill](code-review.md)).

---

## 2. Context & Inputs

- Target repository guidelines: `CONTRIBUTING.md` and `.github/PULL_REQUEST_TEMPLATE.md`.
- PR specification dossier in `PR/` (e.g. `PR/01-docs-serveur-config.md`).
- Local clone state in `LaSuite/<repo>`.

---

## 3. Step-by-Step Procedure

### Step 1: Check Write Permissions & Remote Setup

1. Check if the user has direct write access or needs a fork:
   - **With write access:** Push directly to `origin` (`suitenumerique/<repo>`).
   - **Without write access (Standard contributor):** Fork the repository on GitHub (`github.com/YOUR_USERNAME/<repo>`), then configure remotes:
     ```bash
     cd LaSuite/<repo>
     git remote rename origin upstream 2>/dev/null || true
     git remote add origin git@github.com:YOUR_USERNAME/<repo>.git 2>/dev/null || git remote set-url origin git@github.com:YOUR_USERNAME/<repo>.git
     ```

### Step 2: Create Feature Branch from Upstream Main

```bash
git fetch upstream
git checkout -b feature/<feature-name> upstream/main
```

### Step 3: Enforce Gitlint & DCO Commit Message Conventions

Commit messages must strictly follow the format: `<gitmoji>(<scope>) <subject>`:
- `<gitmoji>`: Valid emoji from [gitmoji.dev](https://gitmoji.dev) (`✨` feature, `🐛` fix, `🔧` config, `📝` doc).
- `(<scope>)`: Subsystem `(dev)`, `(frontend)`, `(backend)`, `(docker)`, `(sources)`, `(ci)`.
- `<subject>`: Concise description (< 80 chars).
- Mandatory `-s` flag for DCO signoff (`Signed-off-by:`).

```bash
git add <modified-files>
git commit -S -s -m "✨(dev) make development URLs configurable for remote servers and VMs"
```

### Step 4: Push to Fork & Open PR with Official Template

```bash
# Push branch to fork
git push -u origin feature/<feature-name>

# Create official Pull Request via GitHub CLI
gh pr create   --repo suitenumerique/<repo>   --title "✨(dev) make development URLs configurable for remote servers and VMs"   --body-file ../../PR/<pr-dossier>.md   --base main   --head YOUR_USERNAME:feature/<feature-name>
```

---

## 4. Deliverables & Verification

- Clean commit log with valid Gitlint syntax and `Signed-off-by:` footer.
- Pull Request open on GitHub with all required template checkboxes completed.
- CI pipeline triggers and passes with 0 errors.

---

## 5. Sources & References

- **Official Docs Contributing Guide:** [suitenumerique/docs CONTRIBUTING.md](https://github.com/suitenumerique/docs/blob/main/CONTRIBUTING.md)
- **Gitmoji Catalog:** [https://gitmoji.dev/](https://gitmoji.dev/)
- **Developer Certificate of Origin:** [https://developercertificate.org/](https://developercertificate.org/)
