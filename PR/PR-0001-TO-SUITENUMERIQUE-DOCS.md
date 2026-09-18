---
title: "PR 1: Remote Servers & Cloud VMs Support (suitenumerique/docs)"
sidebar_label: "PR 1: Remote Servers Support"
description: Complete Pull Request dossier for suitenumerique/docs making La Suite Docs compatible with remote deployments and VMs without modifying source code.
---

import { Mermaid } from "../../../src/components/Mermaid";
import { DocHeaderSummary } from "../../../src/components/DocHeaderSummary";

# 🌐 PR 1: Remote Servers & Cloud VMs Support for La Suite Docs

<DocHeaderSummary
  readingTime="5 min"
  level="Intermediate"
  roles={["DevOps", "Backend Django", "Maintainer"]}
  prerequisites={["suitenumerique/docs", "DCO signoff", "Docker"]}
  status="Merged / Submitted (PR #2703)"
  statusColor="success"
  takeaway="Enables running La Suite Docs on remote servers, VMs, and cloud instances without modifying source code."
/>

**Upstream Reference:** [suitenumerique/docs#2703](https://github.com/suitenumerique/docs/pull/2703)

---

## 📌 Executive Summary

| Attribute | Specification |
| :--- | :--- |
| **Target Repository** | [`suitenumerique/docs`](https://github.com/suitenumerique/docs) |
| **Target Branch** | `main` |
| **Pull Request Status** | 🟢 **Open & Submitted:** [PR #2703](https://github.com/suitenumerique/docs/pull/2703) |
| **Commit Title** | `✨(dev) make development URLs configurable for remote servers and VMs` |
| **Scope** | Docker Compose environment configuration, Keycloak public hostname, Next.js `allowedDevOrigins`. |

---

## 📝 GitHub PR Description (Submitted)

```markdown
## Purpose

Make La Suite Docs easily runnable on remote servers, virtual machines, and cloud instances by parameterizing development origins and Keycloak endpoints without code hacks.

## Proposal

* [x] Add dynamic `API_ORIGIN` variable to `env.d/development/common.dist`.
* [x] Configure Keycloak public hostname support in `env.d/development/kc_auth.dist`.
* [x] Support `allowedDevOrigins` parameterization in `src/frontend/apps/impress/next.config.js`.

## External contributions

### General requirements

* [x] I have read and followed the contributing guidelines
* [x] I have read and agreed to the Code of Conduct
* [x] I have added corresponding tests for new features or bug fixes (if applicable)

### CI requirements

* [x] I made sure that all existing tests are passing
* [x] I have signed off my commits with `git commit --signoff` (DCO compliance)
* [x] My commit messages follow the required format: `<gitmoji>(type) title description`
```

---

## 🚀 Exact GitHub CLI Command to Open this PR

```bash
# 1. Navigate to Docs fork
cd LaSuite/docs

# 2. Create feature branch from upstream main
git fetch upstream
git checkout -b feature/remote-server-support upstream/main

# 3. Stage modified files and commit with DCO signoff & Gitmoji
git commit -S -s -m "✨(dev) make development URLs configurable for remote servers and VMs"

# 4. Push to personal fork
git push -u origin feature/remote-server-support

# 5. Open upstream Pull Request via GitHub CLI
gh pr create \
  --repo suitenumerique/docs \
  --title "✨(dev) make development URLs configurable for remote servers and VMs" \
  --body-file ../../PR/PR-0001-TO-SUITENUMERIQUE-DOCS.md \
  --base main \
  --head waxland:feature/remote-server-support
```
