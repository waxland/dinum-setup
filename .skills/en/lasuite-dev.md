---
title: Local Development & Orchestration
sidebar_label: La Suite Dev
description: Clone repositories, configure .env files, initialize PostgreSQL databases, and start local Docker microservices.
---

This skill defines the standardized procedure to orchestrate, configure, and develop locally across the microservices of La Suite Numérique.

---

## 1. When to Use

- Initial workspace bootstrap (`make clone`, `make env`, `make bootstrap`, `make dev`).
- Troubleshooting port collisions or Docker container states.
- Configuring 1-click PostgreSQL connections in VS Code (SQLTools).
- Adding or modifying root `Makefile` targets.
- _Do not use for:_ editing Zudoku documentation content (use [Docs MDX Skill](docs-mdx.md)).

---

## 2. Context & Inputs

- Root `Makefile` and setup shell scripts.
- Template environment files: `.env.example` at root and in each subproject.
- Port allocation and default credentials.
- VS Code configuration: `.vscode/settings.json` and `.vscode/extensions.json`.

---

## 3. Step-by-Step Procedure

### Step 1: Verify System Prerequisites

- Container runtime: Docker Desktop, OrbStack, or Colima active (`docker info`).
- Local DNS resolution: ensure `127.0.0.1 auth.local` is present in `/etc/hosts`.

### Step 2: Clone Application Repositories

```bash
# Clone all applications into ./LaSuite/
make clone

# Or clone a targeted subset
REPOS="docs projects" make clone
```

### Step 3: Prepare `.env` Environments Without Overwriting

- The `make env` target copies template files (`.env.example` $\to$ `.env`) only if they do not already exist.
- Never overwrite existing custom configurations of a developer.

### Step 4: Bootstrap Databases

- Run `make bootstrap` to build images, execute Django/Node migrations, and load seed fixtures.
- Verify dedicated PostgreSQL ports to prevent conflicts:
  - **Docs (Impress):** Port `15432` (`impress` / `password`)
  - **Keycloak SSO:** Port `5433` (`keycloak` / `password`)
  - **Projects:** Port `5432` (`postgres` / `postgres`)
  - **Transfers:** Port `5432` (`transfers` / `password`)
  - **People & Accounts:** Port `15432` / `5432`

### Step 5: Start and Validate Services

- Launch development mode: `make dev`.
- Check container health: `docker compose ps` or VS Code Docker extension.
- Connect to databases via the VS Code **SQLTools** panel (`mtxr.sqltools`).

---

## 4. Deliverables & Verification

- Services reachable on their local URLs (`http://localhost:3000`, `http://localhost:8000`, etc.).
- Zero regressions and zero uncommitted configuration overwrites.
- Record any anomalies in `.sessions/RETOUR_EXEC_<TOPIC>.md`.

---

## 5. Sources & References

- **Official Repositories:** [https://github.com/suitenumerique](https://github.com/suitenumerique)
