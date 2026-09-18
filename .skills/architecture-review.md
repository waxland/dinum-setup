---
title: Architecture Review & System Audit
sidebar_label: Architecture Review
description: Analyze, map, and assess distributed architecture, data flows, coupling, and sovereign cloud compliance.
---

This skill provides the methodology to analyze system robustness, boundary consistency, and communication flows across La Suite microservices.

---

## 1. When to Use

- Auditing system-level structure of the repository or a La Suite project.
- Detecting friction points, tight couplings, or performance bottlenecks.
- Analyzing OIDC/ProConnect authentication flows, Yjs CRDT real-time synchronization, or sovereign S3 storage.
- _Do not use for:_ designing a new feature from scratch (use [Design Change Skill](design-change.md)).

---

## 2. Context & Inputs

- Architecture overview documentation and repository manifests.
- Multi-tier schemas: Identity/Security, Data & Real-time, DevOps/Deployment.
- Orchestration files (`Makefile`, `docker-compose*.yml`) and network configs.

---

## 3. Step-by-Step Procedure

### Step 1: Map Responsibilities and Service Boundaries

- Clearly identify the role of each architectural tier:
  - **Frontend Tier:** Next.js / React (UI, DSFR components, client state).
  - **Backend / API Tier:** Django / Node.js (business logic, permissions, validation).
  - **Real-Time Tier:** WebSocket servers / Yjs CRDT / LiveKit SFU.
  - **Data Tier:** Isolated PostgreSQL 16 databases, Redis pub/sub, sovereign S3 buckets.
  - **Identity Tier:** Keycloak SSO / ProConnect OIDC.

### Step 2: Evaluate Communication Flows and Resilience

- [ ] **S3 Uploads:** Do heavy media files use Direct Presigned Uploads or overload API servers?
- [ ] **Real-Time:** Do CRDT structures converge deterministically without pessimistic locks?
- [ ] **Fault Isolation:** Does a microservice outage (e.g. Meet or Transfers) cascade to other apps?
- [ ] **OIDC Sessions:** Are JWT tokens validated properly and Backchannel Logout handled?

### Step 3: Identify Minimal Structural Improvements

- Seek the simplest, most robust architecture eliminating friction without adding unnecessary layers.
- Balance cost/benefit ratio with backward compatibility for upstream repositories.

---

## 4. Deliverables & Verification

Write an architecture audit report (in `.sessions/AUDIT_<TOPIC>.md` when applicable) containing:

1. **Scope & Current State Mermaid Diagram.**
2. **Architecture Findings Table:**
   | Component / Layer | Observed Friction / Risk | Operational Impact | Minimal Recommendation |
   |---|---|---|---|
3. **Transition Plan with reversible milestones.**

---

## 5. Sources & References

- **Yjs CRDT Real-time:** [https://yjs.dev/](https://yjs.dev/)
- **ProConnect Identity:** [https://proconnect.gouv.fr/](https://proconnect.gouv.fr/)
- **French Sovereign Cloud Doctrine (ANSSI):** [https://www.numerique.gouv.fr/services/cloud/doctrine/](https://www.numerique.gouv.fr/services/cloud/doctrine/)
