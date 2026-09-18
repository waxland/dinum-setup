# 🤖 AI Agent Skills Catalog (`.skills/en/README.md`)

This directory contains operational procedures, engineering standards, and reference guidelines enabling developers and AI agents to work effectively across the **`dinum-setup`** ecosystem and La Suite Numérique applications.

Each skill document is **100% self-contained** and structured into 5 sections:

1. **When to use:** Exact triggers and boundaries with other skills.
2. **Context & Inputs:** Required files and context to read before acting.
3. **Step-by-step Procedure:** Actionable workflow ensuring best practices.
4. **Deliverables & Verification:** Output format and acceptance criteria.
5. **Sources & References:** Official documentation and technical specs.

---

## 📋 Available Skills Catalog (P0)

| Skill | Role & Trigger | Skill File | Prompt Example |
|---|---|---|---|
| **`code-standards`** | Enforce strict engineering standards (Zero `any`, zero abusive `as` casts, zero Tailwind CSS, zero Mantine in UI). | [`.skills/en/code-standards.md`](code-standards.md) | _"Apply code-standards skill and clean up types on this component."_ |
| **`dsfr`** | Build, style, or fix UI components using the French State Design System (DSFR & React-DSFR). | [`.skills/en/dsfr.md`](dsfr.md) | _"Apply dsfr skill and create a confirmation modal component."_ |
| **`rgaa-review`** | Audit and guarantee digital accessibility across the 13 RGAA v4.1 (WCAG 2.1 AA) topics. | [`.skills/en/rgaa-review.md`](rgaa-review.md) | _"Apply rgaa-review skill and check keyboard accessibility of this form."_ |
| **`lasuite-dev`** | Clone repos, configure `.env`, manage PostgreSQL databases, and start local containers. | [`.skills/en/lasuite-dev.md`](lasuite-dev.md) | _"Apply lasuite-dev skill and help me run Docs and Projects locally."_ |
| **`docs-mdx`** | Author MDX documentation, inject React components, and regenerate Zudoku navigation. | [`.skills/en/docs-mdx.md`](docs-mdx.md) | _"Apply docs-mdx skill and add a new documentation page in 03-projects."_ |
| **`code-review`** | Audit a Git diff or PR across 3 axes: regressions, requirement compliance, and secrets safety. | [`.skills/en/code-review.md`](code-review.md) | _"Apply code-review skill and review my current unstaged changes."_ |
| **`architecture-review`** | Analyze system coupling, responsibility boundaries, and distributed flows (OIDC, CRDT, S3). | [`.skills/en/architecture-review.md`](architecture-review.md) | _"Apply architecture-review skill and evaluate the file-sharing architecture."_ |
| **`design-change`** | Design a new feature or connector, compare options, and formalize an ADR. | [`.skills/en/design-change.md`](design-change.md) | _"Apply design-change skill and design the /law slash command in BlockNote."_ |
| **`send-pr`** | Prepare, sign, and submit upstream Pull Requests with Gitlint & DCO. | [`.skills/en/send-pr.md`](send-pr.md) | _"Apply send-pr skill and open PR for remote server support."_ |
| **`package-versioning`** | Manage SemVer versions, compile artifacts (.tgz, .whl), and release packages via CLI. | [`.skills/en/package-versioning.md`](package-versioning.md) | _"Apply package-versioning skill and bump packages to v1.0.1."_ |
| **`quota-resilience`** | Audit provider rate limits, configure safety margins, and handle circuit breakers. | [`.skills/en/quota-resilience.md`](quota-resilience.md) | _"Apply quota-resilience skill and test HTTP 429 Retry-After handling."_ |
| **`python-data-protocols`** | Integrate specialized public data libraries (CKAN, SDMX, SPARQL, OGC, SODA) with live keys & mocks. | [`.skills/en/python-data-protocols.md`](python-data-protocols.md) | _"Apply python-data-protocols skill and integrate ckanapi client for Open Data."_ |
| **`dpg-review`** | Audit and certify compliance with the 9 Digital Public Goods Alliance (DPGA) indicators & UN SDGs. | [`.skills/en/dpg-review.md`](dpg-review.md) | _"Apply dpg-review skill and audit our packages for DPG Registry eligibility."_ |

---

## 🚀 How to Invoke a Skill in Your Prompt

To instruct an agent to follow a specific procedure:

```text
Read .skills/en/<skill-name>.md and apply this procedure to <my task>.
```
