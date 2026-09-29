# 📋 International Documentation Audit & Action Plan (`PLAN_DOCUMENTATION_EN.md`)

**Date:** September 28, 2026  
**Standards:** DINUM / Universal DPI / DPGA Indicators / WAI-ARIA 1.2 / BlockNote Community RFC  
**Scope:** International portal `documentation-international/docs/` (148 routes).

---

## 🧭 International Audit Tracking Table

| Audited File                                                             |       Status        |  Iteration  | Recommendations Summary                                                                                                                          |
| :----------------------------------------------------------------------- | :-----------------: | :---------: | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `documentation-international/docs/index.mdx`                             | 🟡 Needs Enrichment | Iteration 1 | Fix French titles in frontmatter, add `<DocHeaderSummary>`, clarify BlockNote community package naming vs DINUM naming, enrich cross-navigation. |
| `documentation-international/docs/00-overview/index.mdx`                 | 🟡 Needs Enrichment | Iteration 2 | Add `<DocHeaderSummary>`, expand architectural motivation, link sub-sections (3-Tier, Standards, International Vision, TOML), add sequence flow. |
| `documentation-international/docs/00-overview/architecture-3-tier.mdx`   | 🟡 Needs Enrichment | Iteration 3 | Harmonize package naming to official monorepo scope, add runtime contracts, detail Anti-SSRF PublicResolver & Redis Lua rate-limiting.           |
| `documentation-international/docs/00-overview/engineering-standards.mdx` |     🟢 Conforme     | Iteration 4 | Add `<DocHeaderSummary>`, link to automated Quality Gate commands (`make check`), add DPGA & Axe-Core validation context.                        |
| `documentation-international/docs/00-overview/international-vision.mdx`  | 🟡 Needs Enrichment | Iteration 5 | Align package names in Mermaid, add DPG 9-indicator compliance matrix, expand European sovereign registries (Estonia, Nordic countries).         |

---

## 📑 Detailed File-by-File Audit Reports

### 📄 `documentation-international/docs/index.mdx`

- **Audit Status:** 🟡 **Needs Enrichment**
- **Architectural Role:** Landing page of the international documentation portal targeting the global open source ecosystem, European public sectors, and BlockNote.js community maintainers.
- **Line-by-Line Diagnostic:**
  - `L.1-5`: Frontmatter has `title: "Accueil"` and `sidebar_label: "Accueil"`. Must be corrected to `title: "Home"` (or `"Overview"`) and `sidebar_label: "Home"`. Description is strong and highlights WAI-ARIA accessibility and native vector exporters.
  - `L.7-8`: Introductory paragraph introduces Slasher (`@blocknote/xl-external-sources`) and SDK (`@blocknote/source-provider-sdk` < 5 kB). Excellent positioning, but should mention the DINUM monorepo origin and DPG alignment.
  - `L.10-25`: The Mermaid diagram is clear and depicts the 3-tier architecture. It can be enhanced to show the security boundaries (Anti-SSRF, deterministic SHA-256 caching, token bucket rate limits).
  - `L.29-50`: `<FeatureGrid>` with 4 cards (3 Formats, WAI-ARIA, Multi-Country Presets, Native Exporters) is clear and well balanced.
  - `L.54-58`: `<BlockNoteSlashPlayground />` provides instant live interactivity.
  - `L.62-65`: Language switch section lists raw `/fr` and `/en` paths. It would benefit from visual buttons or an integrated banner component.
- **Content Recommendations:**
  1. _Fix Frontmatter Localization_: Change `Accueil` to `Home` or `Overview` to ensure 100% English UI consistency in breadcrumbs and tab headers.
  2. _Add Summary Header_: Insert an English-adapted `<DocHeaderSummary>` component:
     - `readingTime="5 min"`
     - `level="Beginner to Advanced"`
     - `roles={["Frontend", "Full-Stack", "Maintainers", "Technical Architects"]}`
     - `prerequisites={["BlockNote.js 0.15+", "React 18 / 19", "TypeScript 5+"]}`
  3. _Quick Navigation Tracks_: Add cards or quick links pointing directly to:
     - `00-overview/quick-start.mdx` (5-minute quick start)
     - `01-blocknote-extension/` (BlockNote integration)
     - `02-provider-sdk/` (Creating custom data providers)
     - `04-presets/` (EU, Canada, Germany, Netherlands, Spain presets)
- **Proposed Enhanced Mermaid Diagram:**
  ```mermaid
  flowchart TD
      subgraph Editor["📝 Rich Text Editor (React 18 / 19)"]
          SlashCommand["Type '/' or Trigger Shortcut"] --> Popover["Accessible Floating Popover (cmdk + ARIA)"]
          Popover --> Block["Universal Connected Block (Callout, Card, Inline)"]
      end

      subgraph Core["📦 Decoupled Packages"]
          SDK["🛠️ Provider SDK (@suitenumerique/slash-sources-sdk)"]
          Proxy["🐍 Resilient Backend Proxy (django-lasuite-sources)"]
      end

      subgraph GlobalData["🌍 Sovereign & Global APIs"]
          EU["🇪🇺 EUR-Lex & EU Open Data"]
          CA["🇨🇦 Justice Laws Canada & StatsCan"]
          FR["🇫🇷 BAN, Légifrance & BOAMP"]
          DE["🇩🇪 Destatis & GovData Germany"]
      end

      Popover --> SDK
      SDK --> Proxy
      Proxy --> EU & CA & FR & DE
  ```
- **Cross-References & Documentation Links:**
  - Quick Start: `/00-overview/quick-start`
  - BlockNote Extension Guide: `/01-blocknote-extension/`
  - Multi-Country Presets: `/04-presets/`

---

### 📄 `documentation-international/docs/00-overview/index.mdx`

- **Audit Status:** 🟡 **Needs Enrichment**
- **Architectural Role:** Introduction and index page for the `00. Overview` category. It must establish the foundational concepts of the Slasher ecosystem: live data provenance vs static copy-pasting, the 3-tier architectural model, and serve as the hub for sub-articles (`architecture-3-tier`, `engineering-standards`, `international-vision`, `05-toml-frontmatter`).
- **Line-by-Line Diagnostic:**
  - `L.1-5`: Frontmatter is clean (`title: "Overview"`, `sidebar_label: "Overview"`).
  - `L.7-8`: Short opening sentence. While concise, it misses key architectural context: explains _what_ it is, but lacks the core motivation (_why_ editors need live verifiable citations vs dead text).
  - `L.10-17`: The horizontal flowchart (`flowchart LR`) is basic. It should detail the protocol steps (floating palette trigger $\rightarrow$ SDK adapter $\rightarrow$ anti-SSRF caching proxy $\rightarrow$ remote sovereign registries $\rightarrow$ switchable UI block).
  - `L.19-35`: "Why Slasher?" `<FeatureGrid>` is informative (Zero UI Lock-in, WAI-ARIA Compliant, Multi-Country Presets), but there are no direct links to the deep-dive pages in the `00. Overview` section.
- **Content Recommendations:**
  1. _Add Header Summary Component_: Insert `<DocHeaderSummary>` tailored for international architects and open source developers.
  2. _Add Category Navigation Grid_: Add a dedicated sub-section linking explicitly to:
     - `architecture-3-tier.mdx` (Deep dive into the 3 decoupled tiers)
     - `engineering-standards.mdx` (Type safety, 0 any / 0 cast, testing, and RGAA/WAI-ARIA criteria)
     - `international-vision.mdx` (Global Digital Public Goods alignment & European interoperability)
     - `05-toml-frontmatter.mdx` (Data contract and metadata conventions)
  3. _Problem vs Solution Matrix_: Add a comparison table highlighting _Dead Copy-Paste_ vs _Slasher Verified Connected Blocks_ (live status badges, source immutability, vector export fidelity).
- **Proposed Enhanced Sequence Diagram:**
  ```mermaid
  sequenceDiagram
      autonumber
      actor User as 👤 Document Author
      participant Editor as 📝 BlockNote Editor
      participant Popover as 🔍 cmdk Popover (ARIA)
      participant SDK as 🛠️ Slasher SDK
      participant Proxy as 🐍 Defensive Proxy
      participant Source as 🏛️ Public Registry (EU/Gov)

      User->>Editor: Type /slash command
      Editor->>Popover: Mount floating accessible palette
      User->>Popover: Type search query
      Popover->>SDK: execute search()
      SDK->>Proxy: Forward query with Anti-SSRF check
      Proxy->>Source: Query upstream API (Timeout 3.5s)
      Source-->>Proxy: Return JSON record
      Proxy-->>SDK: Normalized DTO
      SDK-->>Popover: Typed entities
      User->>Popover: Select result (Enter)
      Popover->>Editor: Insert SlasherBlock (Callout / Card / Inline)
  ```
- **Cross-References & Documentation Links:**
  - 3-Tier Architecture: `/00-overview/architecture-3-tier`
  - Engineering Standards: `/00-overview/engineering-standards`
  - International Vision (DPG): `/00-overview/international-vision`
  - BlockNote Extension Docs: `/01-blocknote-extension/`

---

### 📄 `documentation-international/docs/00-overview/architecture-3-tier.mdx`

- **Audit Status:** 🟡 **Needs Enrichment**
- **Architectural Role:** The primary deep-dive technical specification explaining the separation of concerns across the 3 independent tiers: Tier 1 (Editor UI), Tier 2 (Universal SDK), and Tier 3 (Defensive Backend Proxy).
- **Line-by-Line Diagnostic:**
  - `L.1-5`: Frontmatter is succinct and valid.
  - `L.7`: Opening sentence is very brief (1 line). It should provide the rationale: why decouple data definition (Tier 2) from UI rendering (Tier 1) and network security (Tier 3).
  - `L.9-26`: Mermaid flowchart illustrates the 3 tiers, but uses placeholder/generic package names:
    - `@slasher/blocknote` (instead of `@suitenumerique/blocknote-sources` / `@blocknote/xl-external-sources`)
    - `@slasher/sdk` (instead of `@suitenumerique/slash-sources-sdk`)
    - `django-slasher-core` (instead of `django-lasuite-sources`)
  - `L.28+`: Missing deep-dive technical explanations of each tier:
    - **Tier 1:** Headless nature of `createReactBlockSpec`, zero Mantine in library bundle, WAI-ARIA combobox pattern, 3 switchable layouts, clipboard error handling.
    - **Tier 2:** `Object.freeze` immutability, `defineSourceProvider` signature, zero external dependencies (< 5 kB bundle).
    - **Tier 3:** `PublicResolver` anti-SSRF DNS pinning, 3.5s strict timeout, Redis Lua atomic token bucket, HTTP 429 circuit breaker with `Retry-After`.
- **Content Recommendations:**
  1. _Package Name Realignment_: Harmonize package identifiers to match published npm and PyPI distributions (`@suitenumerique/slash-sources-sdk`, `@suitenumerique/blocknote-sources`, `django-lasuite-sources`).
  2. _Add Detailed Sub-Sections_: Add structured `## Tier 1: Client & CustomBlock`, `## Tier 2: Universal SDK`, and `## Tier 3: Defensive Proxy & Caching` sections with code snippets and TypeScript interface references.
  3. _Add Security & Isolation Table_: Highlight the threat model (SSRF, rate-limit bypass, memory exhaustion, credential leakage) and how each tier mitigates it.
- **Proposed Enhanced Architecture Diagram:**
  ```mermaid
  flowchart TD
      subgraph Tier1["🖥️ Tier 1: Editor Layer (@suitenumerique/blocknote-sources)"]
          CustomBlock["SourceBlock (createReactBlockSpec)"]
          Popover["SourceSearchPopover (cmdk + ARIA)"]
          Formats["3 Formats: Callout / Card / Inline"]
      end

      subgraph Tier2["🛠️ Tier 2: Universal SDK (@suitenumerique/slash-sources-sdk)"]
          Define["defineSourceProvider() (Object.freeze)"]
          Contracts["TypeScript DTOs: ExternalSourceEntity, SuggestResult"]
      end

      subgraph Tier3["🛡️ Tier 3: Defensive Backend (django-lasuite-sources)"]
          Proxy["DRF REST Endpoints (/suggest/, /search/, /detail/)"]
          Security["PublicResolver (Anti-SSRF & 3.5s Timeout)"]
          Quotas["Redis Lua (Token Bucket & Circuit Breaker HTTP 429)"]
      end

      Tier1 --> Tier2
      Tier2 --> Tier3
  ```
- **Cross-References & Documentation Links:**
  - Provider SDK Documentation: `/02-provider-sdk/`
  - Backend Proxy Security: `/03-backend-proxy/defensive-security-ssrf`
  - BlockNote Extension Guide: `/01-blocknote-extension/`

---

### 📄 `documentation-international/docs/00-overview/engineering-standards.mdx`

- **Audit Status:** 🟢 **Conforme**
- **Architectural Role:** The international developer guidelines consolidating DINUM, beta.gouv.fr, and La Suite engineering policies (rule precedence, strict typing, React architecture, Python/Django quality, RGAA v4.1 AA accessibility, and defensive security).
- **Line-by-Line Diagnostic:**
  - `L.1-5`: Frontmatter is clean and descriptive.
  - `L.7-9`: Direct introduction referencing DINUM, beta.gouv.fr, and La Suite Numérique.
  - `L.11-47`: Section 1 - Comprehensive grid of official handbooks (La Suite Developer Handbook, Python Best Practices, DesignGouv memo, beta.gouv standards, UI Kit, Security rules).
  - `L.49-65`: Section 2 - Rule Precedence Mermaid flowchart and concrete example resolving conflicts (Ruff 88 vs historical PEP 8 99).
  - `L.67-89`: Section 3 - Frontend Standards (Strict TypeScript with 0 `any` / 0 `as ...`, 6 UI lifecycle states, RGAA v4.1 AA accessibility rules).
  - `L.91-110`: Section 4 - Backend Standards (Ruff, 6 import blocks, Django $N+1$ query prevention, `transaction.atomic`, Anti-SSRF, circuit breakers).
  - `L.112-126`: Section 5 - Canonical URLs & Resources to beta.gouv.fr and La Suite repositories.
- **Content Recommendations:**
  1. _Add Standardized Header_: Insert an English `<DocHeaderSummary>` component:
     - `readingTime="6 min"`
     - `level="All Developers"`
     - `roles={["Frontend", "Backend", "Maintainers", "Security Auditors"]}`
     - `prerequisites={["TypeScript 5+", "Python 3.12+", "Ruff", "ESLint"]}`
  2. _Add Quality Gate Commands_: Explicitly link these rules to the monorepo's automated validation commands (`make check`, `npm run typecheck`, `npm run lint`, `ruff check`, `pytest`, `npm run test:e2e`).
  3. _Mention Digital Public Goods (DPG) & Axe-Core_: Include references to DPGA standard alignment and automated zero-violation Axe-Core accessibility audits.
- **Proposed Enhanced Rule Enforcement Diagram:**
  ```mermaid
  flowchart LR
      subgraph Standards["🏛️ Engineering Standards"]
          TS["Strict TypeScript (0 any / 0 cast)"]
          Py["Python / Django (Ruff 88, 6 Import Groups)"]
          A11y["RGAA v4.1 AA / WAI-ARIA (0 Axe Errors)"]
          Sec["Defensive Security (Anti-SSRF & Timeouts)"]
      end

      subgraph Automation["⚡ Automated Quality Gate"]
          MakeCheck["make check (16/16 Steps)"]
      end

      subgraph Output["📦 Verified Artifacts"]
          NPM["npm Packages (@suitenumerique/*)"]
          PyPI["PyPI Package (django-lasuite-sources)"]
          SSR["Zudoku Portals (0 SSR Errors)"]
      end

      Standards --> MakeCheck --> Output
  ```
- **Cross-References & Documentation Links:**
  - Onboarding Engineering Quality: `/01-onboarding/02-workflow-et-contribution/qualite-et-architecture-la-suite`
  - 3-Tier Architecture: `/00-overview/architecture-3-tier`
  - GitHub CI Workflow: `.github/workflows/ci-packages.yml`

---

### 📄 `documentation-international/docs/00-overview/international-vision.mdx`

- **Audit Status:** 🟡 **Needs Enrichment**
- **Architectural Role:** Strategic manifesto presenting Slasher as an open, borderless standard for European Digital Public Goods (DPG) and international public administrations connecting verifiable data registries to modern collaborative editors.
- **Line-by-Line Diagnostic:**
  - `L.1-5`: Frontmatter is clean and valid.
  - `L.7-8`: Strong opening highlighting the 15-minute provider onboarding model.
  - `L.10-27`: Mermaid flowchart demonstrates international hubs (France, Germany, Netherlands, Spain, EU, Enterprise). However:
    - Diagram references generic names `@slasher/sdk` and `@slasher/blocknote`.
    - Lacks Canada 🇨🇦 (which is fully implemented with PIPEDA and Shared Services Canada).
    - Can be expanded to show Nordic / Baltic data initiatives (e.g. Estonia X-Road, European Data Portal).
  - `L.29+`: Document ends abruptly after the Mermaid diagram without deep-dive sections on:
    - **DPGA 9 Indicators**: Open standard, platform independence, data privacy, and SDG 9 & 16 relevance.
    - **Sovereignty & GDPR**: No tracker, no third-party telemetry, self-hosted proxies.
    - **Federation Model**: How regional and national hubs can federate without a single point of failure.
- **Content Recommendations:**
  1. _Add Header Summary_: Insert `<DocHeaderSummary>` tailored for policy makers, open source maintainers, and international architects.
  2. _Update Mermaid Diagram_: Include Canada (`ca`), official package names (`@suitenumerique/slash-sources-sdk`, `@suitenumerique/blocknote-sources`), and European open data networks.
  3. _Add DPGA Compliance Matrix_: Include a structured table showing how Slasher complies with the 9 Digital Public Goods Alliance criteria.
  4. _Add Case Studies / Preset Highlights_: Brief callouts for France (Légifrance/BAN), Germany (Destatis), Netherlands (KVK), Spain (BOE), EU (EUR-Lex), and Canada (Justice Laws).
- **Proposed Enhanced Federation Diagram:**
  ```mermaid
  flowchart TD
      subgraph Standard["🌐 Universal Slasher Standard (DPGA Compliant)"]
          SDK["@suitenumerique/slash-sources-sdk (< 5 kB)"]
          Editor["@suitenumerique/blocknote-sources (0-Mantine UI)"]
          Proxy["django-lasuite-sources (Defensive Anti-SSRF)"]
      end

      subgraph Hubs["🏛️ Verified Sovereign Registries"]
          EU["🇪🇺 European Union (EUR-Lex / TED)"]
          FR["🇫🇷 France (BAN, Légifrance, BOAMP)"]
          DE["🇩🇪 Germany (Gesetze im Internet, Destatis)"]
          NL["🇳🇱 Netherlands (Wettenbank, KVK)"]
          ES["🇪🇸 Spain (BOE, Registro Mercantil)"]
          CA["🇨🇦 Canada (Justice Laws, StatsCan)"]
      end

      Standard --> EU & FR & DE & NL & ES & CA
  ```
- **Cross-References & Documentation Links:**
  - Presets Catalog: `/04-presets/`
  - European Union Preset: `/04-presets/european-union`
  - Canada Preset: `/04-presets/canada`
  - DPGA Standards: https://digitalpublicgoods.net/
