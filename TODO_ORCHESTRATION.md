# 🏛️ Master Orchestration & Architecture Plan (`TODO_ORCHESTRATION.md`)

> **Architecture Paradigm:** **Option 2 — Core Engine & Decentralized Country Plugins**  
> **Repository Target:** `dinum-setup`  
> **Documentation Governance Rule:** Clean root workspace. All future guides, specifications, and architecture documentation must be created exclusively inside `documentation/docs/` (SSR Zudoku portal) or `.skills/` (AI agent operational instructions). Root `.md` files will be pruned and centralized.

---

## 🧭 1. Architecture Option 2 : Core Engine & Plugin System

```mermaid
flowchart TD
    subgraph Core["🐍 django-lasuite-sources-core (or core engine)"]
        Registry["SourceProviderRegistry<br/>• Dynamic entry_points discovery ('lasuite_sources.providers')<br/>• Thread-safe registration<br/>• Fallback Mock Engine"]
        Cache["SHA-256 Redis Deterministic Cache (24h)"]
        Security["Anti-SSRF Validator & URL Sanitizer (is_safe_external_url)"]
        CircuitBreaker["Circuit Breaker (3.5s timeout fallback)"]
        Views["DRF Endpoints (/search/, /suggest/, /detail/, /health/)"]
        Celery["Celery Tasks (Law abrogation & scheduled dataset sync)"]
    end

    subgraph Plugins["📦 Decentralized Sovereign Provider Plugins"]
        FR["🇫🇷 django-lasuite-sources-france<br/>(Légifrance, RNE, BAN, BOAMP, Aides-Territoires, INSEE, Albert)"]
        EU["🇪🇺 django-lasuite-sources-eu<br/>(EUR-Lex CELLAR, Europarl, TED, Eurostat, Funding & Tenders, data.europa.eu)"]
        CA["🇨🇦 django-lasuite-sources-canada<br/>(Justice Laws XML, Corporations Canada, LEGISinfo, StatCan, GeoNames)"]
        DE["🇩🇪 django-lasuite-sources-germany<br/>(Gesetze im Internet, Handelsregister, Bundestag DIP)"]
        NL["🇳🇱 django-lasuite-sources-netherlands<br/>(KOOP Wettenbank, KVK, Kadaster BAG)"]
        ES["🇪🇸 django-lasuite-sources-spain<br/>(BOE Leyes, Registro Mercantil, PLACSP, Catastro)"]
    end

    subgraph UI_SDK["🧩 Universal Frontend Layer"]
        SDK["🛠️ @suitenumerique/slash-sources-sdk<br/>• Universal defineSourceProvider()<br/>• Normalized DTOs (SourceEntityProps)"]
        BlockNote["🎨 @suitenumerique/blocknote-sources<br/>• 3 Hot-switchable Formats (Callout, Card, Link)<br/>• Non-intrusive Popover (cmdk + ARIA)<br/>• Lossless Vector Exporters (PDF, DOCX, ODT)"]
    end

    Plugins -->|Register via entry_points| Registry
    Registry --> Cache --> Security --> CircuitBreaker --> Views
    SDK --> BlockNote
    Views -.->|REST JSON| BlockNote
```

### 🔌 Standard Python Entry Point Specification
In `pyproject.toml` of each country plugin:
```toml
[project.entry-points."lasuite_sources.providers"]
eurlex = "lasuite_sources_eu.providers.law:EurLexSourceProvider"
europarl = "lasuite_sources_eu.providers.parliament:EuroparlSourceProvider"
ted = "lasuite_sources_eu.providers.procurement:TedSourceProvider"
eurostat = "lasuite_sources_eu.providers.statistics:EurostatSourceProvider"
funding = "lasuite_sources_eu.providers.grant:FundingTendersSourceProvider"
dataeuropa = "lasuite_sources_eu.providers.opendata:DataEuropaSourceProvider"
canlaw = "lasuite_sources_ca.providers.law:JusticeLawsSourceProvider"
corporation_ca = "lasuite_sources_ca.providers.company:CorporationsCanadaSourceProvider"
parliament_ca = "lasuite_sources_ca.providers.parliament:LegisInfoSourceProvider"
statcan = "lasuite_sources_ca.providers.statistics:StatCanSourceProvider"
```

---

## 🧱 2. Universal DTO & Entity Types Modernization

Universal abstraction replacing vendor-locked types (e.g. `insee` $\to$ `statistics`):

```typescript
export type SourceEntityType =
  | 'law'          // Statutory codes, acts, regulations, treaties
  | 'case-law'     // Court rulings, jurisprudence, ECLI, CURIA decisions
  | 'company'      // Corporate registries, business identifiers (SIREN, EUID, BN9)
  | 'parliament'   // Bills, debates, amendments, parliamentary questions, votes
  | 'address'      // Street-level geocoded addresses (BAN, BAG, INSPIRE)
  | 'place'        // Authoritative geographic names, administrative areas, GeoNames
  | 'procurement'  // Tender notices, contract awards, eForms, TED, BOAMP
  | 'grant'        // Funding programs, territorial subsidies, Horizon Europe calls
  | 'statistics'   // Official indicators, census, demographics (INSEE, Eurostat, StatCan, Destatis)
  | 'agent'        // Public official directory, administrative services, Whoiswho
  | 'cadastre'     // Land parcels, land registry plots, boundary geometry
  | 'demarche'     // Online citizen/business administrative procedures (Your Europe, DS.fr)
  | 'opendata'     // Open data catalog records (data.gouv.fr, data.europa.eu, open.canada.ca)
  | 'research'     // Scientific projects, EU CORDIS grants, innovation publications
  | 'custom';      // Sovereign AI RAG, specialized agency micro-services
```

---

## 📋 3. Step-by-Step Orchestration Roadmap

### 📦 Phase 1 : Core Engine Refactoring (Option 2 Setup)
- [x] **T-101 : Entry Points Dynamic Registry Architecture**
  - Implement Python `importlib.metadata.entry_points(group='lasuite_sources.providers')` discovery in `SourceProviderRegistry`.
  - Maintain backward compatibility with in-tree registered fallback providers.
  - Add thread-safe singleton lock for concurrency safety.
- [x] **T-102 : Universal Entity Type Harmonization**
  - Update `packages/slash-sources-sdk/src/types.ts` to support universal `statistics`, `case-law`, `research`, and `place`.
  - Update `packages/blocknote-sources/src/types.ts` and format components.
  - Maintain fallback alias mapping (`insee` $\to$ `statistics`).
- [x] **T-103 : Ingestion & Dataset Cache Engine for Bulk Registries**
  - Implement scheduled background ingestion pipeline for bulk open data files (e.g., CanadaBuys XML/CSV, DVF flat files).
  - Provide local SQLite / Redis indexed full-text search fallback.

---

### 🇪🇺 Phase 2 : European Union Native & Federated Connectors

#### P0 — Connecteurs EU Natifs Prioritaires
- [x] **T-201 : EUR-Lex / CELLAR Publications Office (`/eurlex`)**
  - *Type Slasher :* `law` / `eurlex`
  - *Interface :* CELLAR SPARQL triplestore + EUR-Lex REST Webservice.
  - *Identifiants supportés :* CELEX (ex: `32016R0679` RGPD, `32024R1689` AI Act, `32022L2555` NIS 2).
  - *Setup minimal :* Provider Django avec connecteur SPARQL / REST, parsing XML/JSON-LD, fallback mock certifié.
- [x] **T-202 : European Parliament Open Data API v2 (`/europarl`, `/parlement-eu`)**
  - *Type Slasher :* `parliament` / `europarl`
  - *Interface :* REST API v2 (`https://data.europarl.europa.eu/api/v2/`), OpenAPI, JSON-LD.
  - *Modèles supportés :* ELI-EP, ORG-EP, DCAT-EP (Députés, résolutions adoptées, amendements).
  - *Setup minimal :* Client REST asynchrone avec pagination, extraction des DTOs parlementaires, mock certifié.
- [x] **T-203 : TED — Tenders Electronic Daily (`/ted`, `/marche-eu`)**
  - *Type Slasher :* `procurement` / `ted`
  - *Interface :* TED Search API (`https://api.ted.europa.eu/`) & Open Data v3 eForms.
  - *Données :* Avis d'appels d'offres européens, codes CPV, acheteurs publics (DIGIT, ENISA).
  - *Setup minimal :* Recherche textuelle avec filtre sur pays/CPV, normalisation des montants et statuts.
- [x] **T-204 : Eurostat Statistics API (`/eurostat`, `/stats`)**
  - *Type Slasher :* `statistics` / `eurostat`
  - *Interface :* Statistics REST API & SDMX 2.1 / 3.0.
  - *Données :* Inflation HICP harmonisée, démographie de l'UE27, PIB régional.
  - *Setup minimal :* DTO 3 colonnes (Valeur, Période, Zone géographique).
- [x] **T-205 : EU Funding & Tenders Portal (`/funding`, `/subvention-eu`)**
  - *Type Slasher :* `grant` / `funding`
  - *Interface :* Search API (`https://api.tech.ec.europa.eu/`), Facet API, Topic Details.
  - *Programmes couverts :* Horizon Europe, Digital Europe (EUDI Wallet), LIFE, CEF.
  - *Setup minimal :* Recherche d'appels à projets ouverts, budgets et dates de clôture.
- [x] **T-206 : data.europa.eu Catalog API (`/dataeuropa`, `/opendata-eu`)**
  - *Type Slasher :* `opendata` / `dataeuropa`
  - *Interface :* Hub Search API (`https://data.europa.eu/api/hub/search/`), DCAT-AP.
  - *Setup minimal :* Recherche fédérée sur les catalogues des 27 pays membres et NUTS.

#### P1 — Connecteurs EU Natifs Complémentaires & Jurisprudence
- [x] **T-207 : EU Whoiswho Directory (`/whoiswho`, `/eu-agent`)**
  - *Type Slasher :* `agent` / `whoiswho` (Organigrammes Secrétariat général Commission, DGs).
- [x] **T-208 : CORDIS Horizon Research & Innovation (`/cordis`, `/recherche-eu`)**
  - *Type Slasher :* `research` / `cordis` (Projets de recherche financés OpenSovereignAI, consortiums).
- [x] **T-209 : CURIA & ECLI Search (`/curia`, `/ecli`)**
  - *Type Slasher :* `case-law` / `curia` (Arrêts CJUE Grande chambre, conformité RGPD).

#### P1 — Connecteurs EU Fédérés (Résolution par Délégation Nationale)
- [ ] **T-210 : BRIS European Companies Federation (`/eu-company`)**
  - *Architecture :* Détection du préfixe pays $\to$ Délégation au provider national souverain (FR $\to$ RNE, DE $\to$ Handelsregister, NL $\to$ KVK, ES $\to$ Registro Mercantil) $\to$ Préservation de l'identifiant européen **EUID**.
- [ ] **T-211 : INSPIRE European Address Federation (`/eu-address`)**
  - *Architecture :* Résolution par pays auprès des API d'adresses High-Value Datasets (HVD) nationales.
- [ ] **T-212 : INSPIRE European Cadastral Parcels (`/eu-cadastre`)**
  - *Architecture :* Modèle harmonisé INSPIRE déléguant aux couches cadastrales géospatiales souveraines.

#### P2 — Démarches & Enrichissement
- [ ] **T-213 : Your Europe / Single Digital Gateway (`/your-europe`, `/demarche-eu`)**
  - *Type Slasher :* `demarche` (Guides et démarches transfrontalières pour citoyens et entreprises de l'UE).
- [ ] **T-214 : eTranslation Multilingual Enrichment Service**
  - *Type Slasher :* Middleware d'enrichissement multilingue temps réel préservant la version officielle d'origine.

#### P1 — Connecteurs EU Fédérés (Résolution par Délégation Nationale)
- [x] **T-210 : BRIS European Companies Federation (`/eu-company`)**
  - *Architecture :* Détection du préfixe pays $\to$ Délégation au provider national souverain (FR $\to$ RNE, DE $\to$ Handelsregister, NL $\to$ KVK, ES $\to$ Registro Mercantil) $\to$ Préservation de l'identifiant européen **EUID**.
- [x] **T-211 : INSPIRE European Address Federation (`/eu-address`)**
  - *Architecture :* Résolution par pays auprès des API d'adresses High-Value Datasets (HVD) nationales.
- [x] **T-212 : INSPIRE European Cadastral Parcels (`/eu-cadastre`)**
  - *Architecture :* Modèle harmonisé INSPIRE déléguant aux couches cadastrales géospatiales souveraines.

#### P2 — Démarches & Enrichissement
- [x] **T-213 : Your Europe / Single Digital Gateway (`/your-europe`, `/demarche-eu`)**
  - *Type Slasher :* `demarche` (Guides et démarches transfrontalières pour citoyens et entreprises de l'UE).
- [x] **T-214 : eTranslation Multilingual Enrichment Service**
  - *Type Slasher :* Middleware d'enrichissement multilingue temps réel préservant la version officielle d'origine.

---

### 🇨🇦 Phase 3 : Canada Federal & Federated Connectors

#### P0 — Fédéral Canadien Natif
- [x] **T-301 : Justice Laws Website / Lois Codifiées du Canada (`/canlaw`, `/loi-ca`)**
  - *Type Slasher :* `law` / `canlaw`
  - *Institution :* Ministère de la Justice du Canada (Department of Justice Canada).
  - *Données :* Lois constitutionnelles, lois révisées (L.R.C.), règlements fédéraux (PIPEDA, Access to Information Act).
  - *Setup minimal :* Parser XML structuré Justice Canada, cache déterministe, affichage bilingue FR/EN.
- [x] **T-302 : Corporations Canada REST API (`/corporation-ca`, `/company-ca`)**
  - *Type Slasher :* `company` / `corporation_ca`
  - *Institution :* Innovation, Sciences et Développement économique Canada (ISED).
  - *Données :* Sociétés sous régime fédéral, statut légal (Active/Dissolved), Numéro d'entreprise (BN9), administrateurs.
  - *Setup minimal :* Client REST JSON officiel avec résolution par Corporation ID et Numéro d'Entreprise.
- [x] **T-303 : House of Commons Open Data & LEGISinfo (`/parliament-ca`, `/commons`, `/legisinfo`)**
  - *Type Slasher :* `parliament` / `parliament_ca`
  - *Données :* Députés, projets de loi émanant du gouvernement (Bill C-27), votes en séance, débats du Hansard, comités.
  - *Setup minimal :* Parser XML LEGISinfo, sous-types (projet de loi, député, vote), mock certifié.
- [x] **T-304 : Statistics Canada / Statistique Canada (`/statcan`, `/stats-ca`)**
  - *Type Slasher :* `statistics` / `statcan`
  - *Interface :* Web Data Service (WDS API) REST & SDMX (`https://www.statcan.gc.ca/`).
  - *Données :* Tableaux de données démographiques, IPC/inflation, marché du travail, comptes économiques.
  - *Setup minimal :* Client WDS REST avec extraction des séries chronologiques et métadonnées bilingues.
- [x] **T-305 : Open Government Canada / Gouvernement Ouvert (`/opencanada`, `/data-ca`)**
  - *Type Slasher :* `opendata` / `opencanada`
  - *Interface :* CKAN Action API (`https://open.canada.ca/data/api/3/action/package_search`).
  - *Setup minimal :* Recherche de jeux de données ouverts fédéraux avec filtres par ministère et format (CSV/GeoJSON).

#### P1 — Marchés Publics, Subventions & Géographie
- [x] **T-306 : CanadaBuys Tender Datasets (`/canadabuys`, `/marche-ca`)**
  - *Type Slasher :* `procurement` / `canadabuys`
  - *Architecture :* Ingestion périodique des flux ouverts CanadaBuys vers index local pour autocomplétion instantanée sans latence.
- [x] **T-307 : Proactive Disclosure Grants & Contributions (`/grant-ca`, `/subvention-ca`)**
  - *Type Slasher :* `grant` / `grant_ca` (Données ouvertes de divulgation proactive des subventions fédérales attribuées).
- [x] **T-308 : Canadian Geographical Names Database / GeoNames (`/geonames-ca`, `/place-ca`)**
  - *Type Slasher :* `place` / `geonames_ca`
  - *Institution :* Ressources naturelles Canada (RNCan).
  - *Interface :* REST API avec recherche par nom, code de province, coordonnées GPS et bounding box (Ottawa, Montréal).

#### P2 — Fédérations Provinciales Canadiennes
- [x] **T-309 : Canadian Corporate & Address Provincial Federation (`/address-ca`, `/company-provincial-ca`)**
  - *Architecture :* Routage provincial (Québec $\to$ Registraire des entreprises du Québec / Données Québec, Ontario, Colombie-Britannique).

---

### 🇩🇪 🇳🇱 🇪🇸 🇬🇧 🌍 Phase 4 : Presets Fédéraux & Organisations Internationales

- [x] **T-401 : Allemagne Fédérale (`/gesetz`, `/register`, `/bundestag`, `/destatis`, `/govdata`)**
  - Connecteurs *Gesetze im Internet*, *Handelsregister*, *Bundestag DIP REST API*, *Destatis Genesis* et *GovData.de*.
- [x] **T-402 : Pays-Bas (`/wet`, `/kvk`, `/bag`, `/cbs`, `/dataoverheid`)**
  - Connecteurs *KOOP Wettenbank*, *KVK Handelsregister*, *Kadaster BAG API v2*, *CBS StatLine* et *Data.overheid.nl*.
- [x] **T-403 : Espagne (`/ley`, `/empresa`, `/licitacion`, `/catastro`, `/ine`, `/datosgob`)**
  - Connecteurs *BOE Open Data*, *Registro Mercantil*, *PLACSP Marchés*, *Sede Catastro*, *INEbase* et *Datos.gob.es*.
- [x] **T-404 : Organisations Internationales**
  - *Banque Mondiale :* `/worldbank` (Indicateurs macro-économiques mondiaux WDI).
  - *OCDE :* `/oecd` (Données statistiques et études comparatives).
  - *OMS :* `/who` (Indicateurs sanitaires mondiaux).
  - *Conseil de l'Europe :* `/hudoc`, `/cedh` (Jurisprudence de la Cour européenne des droits de l'homme).

---

## 🧹 4. Règle de Gouvernance & Nettoyage de la Racine

Conformément à la directive d'architecture :

1. **Aucun guide documentaire technique permanent à la racine.**
2. **Migration vers `documentation/docs/` :**
   - Spécifications de connecteurs $\to$ `documentation/docs/en/04-presets/` et `documentation/docs/fr/03-slasheurs-france/`.
   - Guides d'architecture $\to$ `documentation/docs/en/00-overview/`.
3. **Migration vers `.skills/` :**
   - Procédures opérationnelles $\to$ `.skills/` et `.skills/en/`.
4. **Fichiers racine autorisés :** `README.md`, `Makefile`, `package.json`, `tsconfig.json`, `vercel.json`, `.gitignore`, `AGENTS.md`, `TODO_ORCHESTRATION.md` (feuille de route active).

---

## ⚡ 5. Commandes de Validation du Pipeline

```bash
# 1. Valider l'intégrité TypeScript (SDK + Extension UI)
npm run packages:test

# 2. Valider l'intégrité Python Django (Anti-SSRF + Circuit Breaker)
cd packages/django-lasuite-sources && PYTHONPATH=. .venv/bin/pytest && cd ../..

# 3. Compiler les packages et vérifier les binaires
make packages-pack

# 4. Compiler la documentation SSR Zudoku (270 routes)
make docs-build
```
