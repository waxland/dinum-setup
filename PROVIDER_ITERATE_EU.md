The generated file needs a few corrections before I’d treat it as the real roadmap. The biggest issue is that the **EU section does not yet reflect the deep audit**: the European Parliament has a substantial official v2 API, Funding & Tenders exposes public REST APIs, and Eurostat exposes Statistics, SDMX 2.1/3.0 and Catalogue APIs. 

There is also a factual correction around **ECLI**: ECLI is an identifier/search mechanism covering EU and national case law; the CJEU uses `ECLI:EU:...`. The **ECHR/CEDH is not an EU institution**, but belongs to the Council of Europe, so it should not be bundled as “ECLI = CJUE/CEDH”. 

I would replace your EU section with this:

```md
### 🇪🇺 2.2. Union Européenne — Institutions & Infrastructure Européenne

> **Principe d'architecture :**
> L'Union européenne dispose de plusieurs APIs centrales extrêmement solides
> pour la législation, le Parlement, les marchés publics, les statistiques,
> les financements et l'open data.
>
> En revanche, les entreprises, adresses et données cadastrales restent
> principalement détenues par les États membres.
>
> Slasher doit donc distinguer :
>
> - les **connecteurs EU natifs** ;
> - les **connecteurs EU fédérés vers les États membres**.

---

#### P0 — Connecteurs EU natifs prioritaires

- [ ] **EUR-Lex / CELLAR — Publications Office**
  - Slash : `/eurlex`
  - Type Slasher : `law`
  - Données :
    - règlements ;
    - directives ;
    - décisions ;
    - traités ;
    - actes consolidés ;
    - métadonnées juridiques.
  - Interfaces :
    - CELLAR REST ;
    - CELLAR SPARQL ;
    - EUR-Lex Webservice ;
    - Linked Open Data.
  - Identifiants :
    - CELEX ;
    - ELI ;
    - URI CELLAR.
  - Intérêt Slasher : **très élevé**
  - Priorité : **P0**
  - Documentation :
    - https://op.europa.eu/en/web/cellar
    - https://eur-lex.europa.eu/content/help/data-reuse/webservice.html

- [ ] **European Parliament Open Data API**
  - Slash : `/europarl`
  - Alias possible : `/parlement-eu`
  - Type Slasher : `parliament`
  - Données :
    - députés européens ;
    - procédures législatives ;
    - amendements et documents ;
    - textes adoptés ;
    - votes ;
    - questions parlementaires ;
    - réunions ;
    - discours ;
    - organes parlementaires.
  - Interface :
    - REST API v2 ;
    - OpenAPI ;
    - JSON-LD ;
    - feeds.
  - Modèles :
    - ELI-EP ;
    - ORG-EP ;
    - DCAT-EP.
  - Priorité : **P0**
  - Documentation :
    - https://data.europarl.europa.eu/en/developer-corner

- [ ] **TED — Tenders Electronic Daily**
  - Slash : `/ted`
  - Alias : `/marche-eu`
  - Type Slasher : `procurement`
  - Données :
    - avis de marché ;
    - appels d'offres ;
    - avis d'attribution ;
    - acheteurs publics ;
    - CPV ;
    - eForms ;
    - dates limites ;
    - montants et lots.
  - Interfaces :
    - TED Search API ;
    - TED Open Data ;
    - SPARQL ;
    - téléchargements XML.
  - Priorité : **P0**
  - Documentation :
    - https://docs.ted.europa.eu/api/latest/
    - https://docs.ted.europa.eu/ODS/latest/

- [ ] **Eurostat**
  - Slash : `/eurostat`
  - Alias générique futur : `/stats`
  - Type Slasher actuel : `insee`
  - Type recommandé futur : `statistics`
  - Données :
    - démographie ;
    - économie ;
    - emploi ;
    - entreprises ;
    - territoires ;
    - environnement ;
    - commerce ;
    - indicateurs européens.
  - Interfaces :
    - Statistics REST API ;
    - SDMX 3.0 ;
    - SDMX 2.1 ;
    - Catalogue API ;
    - API asynchrone.
  - Formats :
    - JSON-stat 2.0 ;
    - SDMX-JSON ;
    - SDMX-XML ;
    - SDMX-CSV ;
    - TSV.
  - Priorité : **P0**
  - Documentation :
    - https://ec.europa.eu/eurostat/web/user-guides/data-browser/api-data-access/

- [ ] **EU Funding & Tenders Portal**
  - Slash : `/funding`
  - Alias : `/subvention-eu`
  - Type Slasher : `grant`
  - Données :
    - appels à projets ;
    - Horizon Europe ;
    - Digital Europe ;
    - LIFE ;
    - CEF ;
    - appels d'offres européens ;
    - topics ;
    - projets financés ;
    - organisations participantes.
  - Interfaces :
    - Search API ;
    - Facet API ;
    - Topic Details ;
    - Organisation Public Data ;
    - Project & Results.
  - Endpoint racine public :
    - `https://api.tech.ec.europa.eu/`
  - Priorité : **P0**
  - Documentation :
    - https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/support/apis

- [ ] **data.europa.eu**
  - Slash : `/dataeuropa`
  - Alias : `/opendata-eu`
  - Type Slasher : `opendata`
  - Données :
    - catalogues européens ;
    - datasets des institutions ;
    - datasets des États membres ;
    - distributions ;
    - licences ;
    - producteurs ;
    - formats.
  - Interfaces :
    - Search API ;
    - SPARQL ;
    - DCAT-AP.
  - Priorité : **P0**
  - Documentation :
    - https://data.europa.eu/api/hub/search/
    - https://data.europa.eu/data/sparql

---

#### P1 — Connecteurs EU natifs complémentaires

- [ ] **EU Whoiswho / CELLAR**
  - Slash : `/eu-agent`
  - Alias : `/whoiswho`
  - Type Slasher : `agent`
  - Données :
    - institutions européennes ;
    - directions générales ;
    - services ;
    - fonctions ;
    - responsables publics ;
    - structures organisationnelles.
  - Interfaces :
    - Linked Open Data ;
    - CELLAR ;
    - SPARQL.
  - Priorité : **P1**
  - Portail :
    - https://op.europa.eu/en/web/who-is-who

- [ ] **CORDIS / EURIO**
  - Slash : `/cordis`
  - Alias : `/recherche-eu`
  - Type Slasher actuel : `custom`
  - Type futur recommandé : `research`
  - Données :
    - projets Horizon ;
    - programmes européens ;
    - bénéficiaires ;
    - financements ;
    - publications ;
    - résultats de recherche.
  - Interfaces :
    - CORDIS ;
    - EURIO Knowledge Graph ;
    - SPARQL ;
    - exports ;
    - services REST selon usage.
  - Priorité : **P1**
  - Portail :
    - https://cordis.europa.eu/

- [ ] **European e-Justice / ECLI Search**
  - Slash : `/ecli`
  - Type Slasher recommandé : `case-law`
  - Fallback v1 : `custom`
  - Objet :
    - rechercher des décisions disposant d'un ECLI ;
    - agréger de la jurisprudence provenant de juridictions européennes
      et nationales participantes.
  - Identifiant :
    - ECLI.
  - Exemple CJUE :
    - `ECLI:EU:C:2024:...`
  - Attention :
    - ECLI est avant tout un **standard d'identification de jurisprudence** ;
    - ne pas le confondre avec une base juridique unique analogue à EUR-Lex.
  - Priorité : **P1 / à qualifier techniquement**
  - Portail :
    - https://e-justice.europa.eu/

- [ ] **CURIA — Cour de justice de l'Union européenne**
  - Slash : `/curia`
  - Alias : `/jurisprudence-eu`
  - Type recommandé : `case-law`
  - Données :
    - Cour de justice ;
    - Tribunal ;
    - arrêts ;
    - conclusions ;
    - ordonnances ;
    - affaires.
  - Identifiants :
    - ECLI ;
    - numéro d'affaire.
  - Priorité : **P1**
  - Point d'investigation :
    - déterminer le meilleur accès machine officiel ;
    - comparer CURIA, EUR-Lex et ECLI pour éviter la duplication.

---

#### P1 — Connecteurs EU fédérés

##### Entreprises

- [ ] **BRIS — Business Registers Interconnection System**
  - Slash générique : `/eu-company`
  - Type Slasher : `company`
  - Rôle :
    - interconnexion européenne des registres nationaux.
  - Identifiant stratégique :
    - EUID — European Unique Identifier.
  - Limite :
    - BRIS ne doit pas être considéré comme une API REST publique générique
      équivalente à SIRENE.
  - Architecture recommandée :

    `/eu-company`
    → détection du pays
    → provider souverain national
    → normalisation Slasher
    → conservation de l'EUID lorsqu'il existe.

  - Exemples :
    - FR → SIRENE / RNE ;
    - DE → Handelsregister ;
    - NL → KVK ;
    - ES → Registro Mercantil.

  - Priorité : **P1 — architecture fédérée**

##### Adresses

- [ ] **INSPIRE Addresses + APIs nationales HVD**
  - Slash : `/eu-address`
  - Type Slasher : `address`
  - Architecture :
    - modèle européen harmonisé ;
    - résolution auprès du provider national.
  - Technologies possibles :
    - OGC API Features ;
    - services INSPIRE ;
    - REST national.
  - Priorité : **P1 — architecture fédérée**

##### Cadastre

- [ ] **INSPIRE Cadastral Parcels + APIs nationales HVD**
  - Slash : `/eu-cadastre`
  - Type Slasher : `cadastre`
  - Architecture :
    - modèle européen harmonisé ;
    - source de vérité nationale.
  - Priorité : **P1 — architecture fédérée**

---

#### P2 — Démarches & interopérabilité administrative

- [ ] **Your Europe / Single Digital Gateway**
  - Slash : `/your-europe`
  - Alias : `/demarche-eu`
  - Type Slasher : `demarche`
  - Usage :
    - découverte de procédures administratives européennes
      et nationales ;
    - liens officiels vers les démarches.
  - Priorité : **P2**

- [ ] **Once-Only Technical System — OOTS**
  - Pas de commande publique Slasher par défaut.
  - Usage :
    - échanges de justificatifs entre administrations ;
    - Evidence Broker ;
    - Data Service Directory ;
    - Semantic Repository.
  - Attention :
    - infrastructure de confiance ;
    - APIs non destinées à devenir un proxy public anonyme.
  - Intérêt :
    - futur déploiement Slasher institutionnel authentifié.
  - Priorité : **P2 / R&D**

---

#### P2 — IA / Enrichissement

- [ ] **European Commission eTranslation / Language Tools**
  - Type : service d'enrichissement, pas `SourceEntity`.
  - Cas d'usage :
    - traduction d'une donnée CELLAR ;
    - traduction de métadonnées Eurostat ;
    - affichage multilingue.
  - Règle :
    - conserver systématiquement la valeur officielle originale
      en plus de la traduction.
  - Priorité : **P2**

---

### ⚠️ Cas à sortir de la section « Union Européenne »

- [ ] **CEDH / ECHR — HUDOC**
  - La Cour européenne des droits de l'homme relève du
    **Conseil de l'Europe**, et non de l'Union européenne.
  - Elle doit être placée dans une future section :

    `🌍 Organisations internationales / Conseil de l'Europe`

  - Slash possible :
    - `/hudoc`
    - `/echr`
    - `/cedh`

---

### Architecture EU cible

Slasher
├── EU Native
│   ├── EUR-Lex / CELLAR
│   ├── European Parliament
│   ├── TED
│   ├── Eurostat
│   ├── Funding & Tenders
│   ├── data.europa.eu
│   ├── Whoiswho
│   ├── CORDIS
│   └── ECLI / CURIA
│
└── EU Federation
    ├── Company
    │   └── BRIS / EUID → providers nationaux
    ├── Address
    │   └── INSPIRE / HVD → providers nationaux
    ├── Cadastre
    │   └── INSPIRE / HVD → providers nationaux
    └── Procedure
        └── Your Europe / SDG

---

### Priorité d'implémentation EU

| Priorité | Connector | Slash |
|---|---|---|
| P0 | EUR-Lex / CELLAR | `/eurlex` |
| P0 | European Parliament Open Data | `/europarl` |
| P0 | TED | `/ted` |
| P0 | Eurostat | `/eurostat` |
| P0 | Funding & Tenders | `/funding` |
| P0 | data.europa.eu | `/dataeuropa` |
| P1 | EU Whoiswho | `/whoiswho` |
| P1 | CORDIS | `/cordis` |
| P1 | ECLI / CURIA | `/ecli`, `/curia` |
| P1 | EU Companies Federation | `/eu-company` |
| P1 | EU Addresses Federation | `/eu-address` |
| P1 | EU Cadastre Federation | `/eu-cadastre` |
| P2 | Your Europe | `/your-europe` |
| P2 | OOTS | infrastructure uniquement |
| P2 | eTranslation | enrichissement uniquement |
```

There are also **two structural fixes** I would make in the rest of `TODO_PROVIDER_SOURCE.md`.

First, this:

```typescript
entityType:
  | "law"
  | "company"
  | "parliament"
  | "address"
  | "procurement"
  | "grant"
  | "insee"
```

should eventually become something provider-independent such as:

```typescript
entityType:
  | "law"
  | "case-law"
  | "company"
  | "parliament"
  | "address"
  | "procurement"
  | "grant"
  | "statistics"
  | "agent"
  | "cadastre"
  | "demarche"
  | "opendata"
  | "research"
  | "custom";
```

`insee` is a **provider**, not a universal entity type. Eurostat makes that abstraction problem immediately visible.

Second, your generated Markdown has a fence issue: the “Master Prompt” starts with ```` ```text ```` and then contains ```` ```typescript ````. A three-backtick outer fence cannot safely contain another three-backtick fence. The outer prompt should use **four backticks**:

````md
````text
...
```typescript
...
```
...
````
````

So the earlier version using four backticks around the full research prompt was actually the correct one.

I would also change the roadmap wording from **“Preset Europe = EUR-Lex + TED”** to **“EU Core = CELLAR + Parliament + TED + Eurostat + Funding & Tenders + data.europa.eu”**. That is much closer to the actual breadth of the European public-data ecosystem.

Yes. **Canada is a very good next country**, and it is richer than the current roadmap suggests.

At the federal level, Canada already has several sources that map almost directly to Slasher: Justice Canada publishes consolidated legislation in structured XML with unique identifiers; Corporations Canada exposes a real-time federal-company JSON API; the House of Commons publishes official open datasets for MPs, bills, votes, debates, committees and petitions; Statistics Canada has WDS + SDMX APIs; and Open Government Canada exposes a CKAN API. 

There are two important limitations: CanadaBuys currently exposes up-to-date tender/award datasets rather than a general public search API, so I would ingest/index those datasets rather than proxying searches directly; and addresses/cadastre are much more provincial/municipal. Natural Resources Canada does, however, expose a strong GeoNames REST API for authoritative geographical names. 

I would add this to your roadmap:

```md
### 🇨🇦 2.6. Canada — Gouvernement du Canada / Government of Canada

> **Architecture :**
> Le Canada dispose d'une infrastructure Open Data fédérale particulièrement
> intéressante pour Slasher.
>
> Plusieurs domaines disposent d'APIs officielles directement exploitables :
>
> - législation ;
> - entreprises fédérales ;
> - Parlement ;
> - statistiques ;
> - open data ;
> - géographie.
>
> Comme dans l'Union européenne, certaines données restent cependant
> fédérées au niveau des provinces et municipalités :
>
> - adresses ;
> - cadastre ;
> - certaines entreprises ;
> - certaines aides ;
> - marchés provinciaux.

---

#### P0 — Législation fédérale

- [ ] **Justice Laws Website / Lois et règlements codifiés**
  - Slash : `/canlaw`
  - Alias : `/loi-ca`
  - Type Slasher : `law`
  - Institution :
    - Department of Justice Canada
  - Données :
    - lois fédérales ;
    - règlements ;
    - versions consolidées ;
    - dates d'entrée en vigueur ;
    - historique des modifications.
  - Formats :
    - XML ;
    - HTML ;
    - PDF.
  - Identifiants :
    - `UniqueID` officiel ;
    - référence de loi ;
    - référence réglementaire.
  - Architecture recommandée :
    - index local des métadonnées ;
    - récupération XML à la résolution ;
    - cache Redis ;
    - normalisation `SourceEntityProps`.
  - Priorité : **P0**

---

#### P0 — Entreprises fédérales

- [ ] **Corporations Canada API**
  - Slash : `/corporation-ca`
  - Alias :
    - `/company-ca`
    - `/entreprise-ca`
  - Type Slasher : `company`
  - Institution :
    - Innovation, Science and Economic Development Canada
  - Données :
    - sociétés fédérales ;
    - statut ;
    - nom légal ;
    - numéro d'entreprise ;
    - adresse du siège ;
    - administrateurs ;
    - historique des noms ;
    - loi constitutive.
  - Interface :
    - REST / JSON.
  - Résolution possible par :
    - Corporation ID ;
    - Business Number à 9 chiffres.
  - Multilingue :
    - français ;
    - anglais.
  - Attention :
    - couvre les sociétés constituées au niveau fédéral ;
    - ne remplace pas les registres provinciaux.
  - Architecture future :

    `/company-ca`
    → fédéral
    → Corporations Canada

    `/company-ca`
    → Québec
    → Registraire des entreprises du Québec

    `/company-ca`
    → Ontario
    → provider provincial

  - Priorité : **P0**

---

#### P0 — Parlement canadien

- [ ] **House of Commons Open Data / LEGISinfo**
  - Slash : `/parliament-ca`
  - Alias :
    - `/commons`
    - `/legisinfo`
  - Type Slasher : `parliament`
  - Données :
    - députés ;
    - projets de loi ;
    - votes ;
    - débats / Hansard ;
    - comités ;
    - témoignages ;
    - pétitions ;
    - circonscriptions ;
    - rôles parlementaires.
  - Format principal :
    - XML.
  - Sous-types Slasher :
    - `member`
    - `bill`
    - `vote`
    - `debate`
    - `committee`
    - `petition`
  - Priorité : **P0**

---

#### P0 — Statistiques officielles

- [ ] **Statistics Canada / Statistique Canada**
  - Slash : `/statcan`
  - Alias :
    - `/stats-ca`
  - Type actuel Slasher :
    - `insee`
  - Type universel recommandé :
    - `statistics`
  - Interfaces :
    - Web Data Service ;
    - SDMX REST ;
    - Reference Data as a Service ;
    - téléchargements complets ;
    - fichiers Delta.
  - Données :
    - population ;
    - économie ;
    - emploi ;
    - logement ;
    - entreprises ;
    - territoires ;
    - commerce ;
    - recensement ;
    - classifications officielles.
  - Formats :
    - JSON ;
    - SDMX ;
    - CSV.
  - Priorité : **P0**

---

#### P0 — Open Data fédéral

- [ ] **Open Government Canada**
  - Slash : `/opencanada`
  - Alias :
    - `/data-ca`
    - `/opendata-ca`
  - Type Slasher : `opendata`
  - Infrastructure :
    - CKAN.
  - Interface :
    - CKAN Action API.
  - Données :
    - datasets fédéraux ;
    - ressources ;
    - organismes producteurs ;
    - formats ;
    - licences ;
    - dates de mise à jour ;
    - métadonnées.
  - Recherche :
    - datasets ;
    - producteurs ;
    - mots-clés ;
    - formats.
  - Particularité :
    - API publique principalement en GET.
  - Priorité : **P0**

---

#### P1 — Marchés publics

- [ ] **CanadaBuys**
  - Slash : `/canadabuys`
  - Alias :
    - `/tender-ca`
    - `/marche-ca`
  - Type Slasher : `procurement`
  - Institution :
    - Public Services and Procurement Canada.
  - Données :
    - appels d'offres ;
    - avis d'attribution ;
    - contrats ;
    - standing offers ;
    - supply arrangements ;
    - fournisseurs.
  - Formats publiés :
    - CSV ;
    - XML ;
    - datasets téléchargeables.
  - Données régulièrement mises à jour.

  ⚠️ Contrairement à TED, ne pas considérer CanadaBuys comme une
  API publique de recherche interactive complète.

  Architecture Slasher recommandée :

    CanadaBuys datasets
          ↓
    ingestion périodique
          ↓
    index Slasher
          ↓
    API `/suggest`
          ↓
    SourceEntityProps

  Cela permet :
    - autocomplétion rapide ;
    - absence de dépendance temps réel ;
    - cache déterministe ;
    - recherche full-text ;
    - limitation des risques SSRF.

  - Priorité : **P1**

---

#### P1 — Subventions et contributions

- [ ] **Proactive Disclosure — Grants and Contributions**
  - Slash : `/grant-ca`
  - Alias :
    - `/subvention-ca`
  - Type Slasher : `grant`
  - Données :
    - bénéficiaires ;
    - organismes financeurs ;
    - montants ;
    - programmes ;
    - dates ;
    - descriptions.
  - Formats :
    - JSON ;
    - CSV ;
    - XLSX.
  - Attention :
    - principalement données de subventions attribuées ;
    - ce n'est pas nécessairement un catalogue centralisé
      d'appels à projets actuellement ouverts.
  - Priorité : **P1**

---

#### P1 — Géographie officielle

- [ ] **Canadian Geographical Names Database / GeoNames**
  - Slash : `/geonames-ca`
  - Alias :
    - `/place-ca`
  - Type recommandé :
    - `address` temporairement ;
    - futur type `place`.
  - Institution :
    - Natural Resources Canada.
  - Interface :
    - REST.
  - Recherche possible par :
    - nom ;
    - wildcard ;
    - province ;
    - type de lieu ;
    - latitude / longitude ;
    - rayon ;
    - bounding box ;
    - identifiant officiel.
  - Formats :
    - JSON ;
    - GeoJSON ;
    - CSV ;
    - GML ;
    - KML.
  - Identifiant :
    - clé CGNDB.
  - Priorité : **P1**

---

#### P2 — Adresses

- [ ] **Canadian Address Federation**
  - Slash : `/address-ca`
  - Type Slasher : `address`

  Le Canada ne dispose pas d'un équivalent fédéral unique
  et évident de la Base Adresse Nationale française.

  Architecture recommandée :

    `/address-ca`
       ↓
    détection province
       ↓
    provider provincial / municipal
       ↓
    normalisation Slasher

  Exemples de zones à investiguer :
    - Québec ;
    - Ontario ;
    - British Columbia ;
    - Alberta ;
    - villes disposant d'Open Data géographique.

  GeoNames peut être utilisé pour :
    - villes ;
    - villages ;
    - lieux géographiques ;
    - entités administratives.

  Mais ne doit pas être présenté comme un registre national
  complet d'adresses postales.

  - Priorité : **P2 / fédération**

---

#### P2 — Cadastre & foncier

- [ ] **Canadian Cadastre / Land Registry Federation**
  - Slash : `/cadastre-ca`
  - Type Slasher : `cadastre`

  Architecture :
    - providers provinciaux ;
    - données géospatiales fédérales complémentaires.

  Le foncier canadien doit être traité comme un système fédéré,
  et non comme une base cadastrale fédérale unique analogue à
  celle de la DGFiP française.

  - Priorité : **P2 / fédération**

---

### Architecture Canada cible

Slasher
├── Canada Federal
│   ├── Justice Laws
│   ├── Corporations Canada
│   ├── House of Commons / LEGISinfo
│   ├── Statistics Canada
│   ├── Open Government Canada
│   ├── CanadaBuys
│   ├── Grants & Contributions
│   └── NRCan GeoNames
│
└── Canada Federation
    ├── Companies
    │   └── Federal + provincial registries
    ├── Addresses
    │   └── Provincial / municipal providers
    ├── Cadastre
    │   └── Provincial land registries
    └── Procurement
        └── Federal + provincial procurement systems

---

### Priorité d'implémentation Canada

| Priorité | Provider | Slash |
|---|---|---|
| P0 | Justice Laws | `/canlaw` |
| P0 | Corporations Canada | `/corporation-ca` |
| P0 | House of Commons | `/parliament-ca` |
| P0 | Statistics Canada | `/statcan` |
| P0 | Open Government Canada | `/opencanada` |
| P1 | CanadaBuys | `/canadabuys` |
| P1 | Grants & Contributions | `/grant-ca` |
| P1 | NRCan GeoNames | `/geonames-ca` |
| P2 | Address Federation | `/address-ca` |
| P2 | Cadastre Federation | `/cadastre-ca` |
```

And I would **expand the international roadmap beyond Germany / Netherlands / Spain / Canada**. The technically interesting next targets are:

```md
## 🌍 Autres zones recommandées

### 🇬🇧 Royaume-Uni

Très intéressant pour Slasher grâce à un écosystème API public très mature.

À auditer :

- [ ] Legislation.gov.uk → `/uk-law`
- [ ] Companies House API → `/companies-house`
- [ ] UK Parliament APIs → `/uk-parliament`
- [ ] Contracts Finder → `/contracts-uk`
- [ ] Find a Tender → `/fts`
- [ ] Office for National Statistics → `/ons`
- [ ] Data.gov.uk → `/data-uk`
- [ ] GOV.UK Content API → `/govuk`

Particularité intéressante :
Companies House dispose d'une véritable API REST permettant
la recherche et la résolution d'entreprises.

---

### 🇺🇸 États-Unis

Probablement l'un des plus gros écosystèmes publics disponibles.

À auditer :

- [ ] Congress.gov API → `/congress`
- [ ] Federal Register API → `/federal-register`
- [ ] Regulations.gov → `/regulations`
- [ ] Census API → `/census`
- [ ] SEC EDGAR → `/sec`
- [ ] USAspending → `/usaspending`
- [ ] SAM.gov → `/sam`
- [ ] Data.gov → `/data-us`
- [ ] USGS → `/usgs`

Très intéressant pour tester Slasher sur un écosystème
ayant plusieurs dizaines de providers souverains spécialisés.

---

### 🇨🇭 Suisse

Très intéressante notamment pour :
- multilinguisme ;
- législation ;
- géographie ;
- statistiques ;
- entreprises.

À auditer :

- [ ] Fedlex → `/fedlex`
- [ ] Zefix → `/zefix`
- [ ] Office fédéral de la statistique → `/bfs`
- [ ] opendata.swiss → `/opendata-ch`
- [ ] GeoAdmin / swisstopo → `/geoadmin`
- [ ] Parlement suisse → `/parlament-ch`

---

### 🇦🇺 Australie

Très bon candidat.

À auditer :

- [ ] Federal Register of Legislation → `/aus-law`
- [ ] Australian Bureau of Statistics → `/abs`
- [ ] AusTender → `/austender`
- [ ] Data.gov.au → `/data-au`
- [ ] Australian Parliament → `/parliament-au`
- [ ] Australian Business Register → `/abr`

Le Federal Register of Legislation dispose notamment
d'une API REST OpenAPI officielle sans clé.

---

### 🇳🇴 Norvège

Très intéressante pour les registres structurés.

À auditer :

- [ ] Brønnøysund Register Centre → `/brreg`
- [ ] Statistics Norway → `/ssb`
- [ ] Data.norge.no → `/data-no`
- [ ] Kartverket → `/kartverket`
- [ ] Stortinget → `/storting`

Le registre norvégien des entreprises expose une API REST/OpenAPI
particulièrement adaptée au modèle Slasher.

---

### 🇩🇰 Danemark

À auditer :

- [ ] CVR / registre entreprises → `/cvr`
- [ ] Dataforsyningen → `/address-dk`
- [ ] StatBank Denmark → `/statbank`
- [ ] Folketinget → `/folketing`
- [ ] Udbud.dk → `/udbud`
- [ ] Data.dk → `/data-dk`

Très intéressant pour tester les connecteurs :
- entreprise ;
- adresse ;
- statistiques ;
- démocratie.

---

### 🌍 Organisations internationales

Créer également un preset indépendant des États :

#### Banque mondiale
- [ ] World Bank API → `/worldbank`

#### OCDE
- [ ] OECD SDMX → `/oecd`

#### Nations Unies
- [ ] UN Data / UN APIs → `/un`

#### FMI
- [ ] IMF Data → `/imf`

#### OMS
- [ ] WHO Data APIs → `/who`

#### Conseil de l'Europe
- [ ] HUDOC / CEDH → `/hudoc`

Cela permettrait à Slasher de couvrir :

France
→ Union européenne
→ États européens
→ Canada / UK / USA / Australie
→ organisations internationales
```

For Slasher specifically, I’d investigate **UK + Canada + USA next**. The UK is attractive because Companies House has a live REST API and Contracts Finder exposes procurement APIs; Australia is also unexpectedly strong, with a free OpenAPI-based Federal Register of Legislation API and a public ABS statistics API. Norway is notable for its current OpenAPI company-register service. 

The **USA** is especially useful if the goal is to prove that Slasher is genuinely universal: Congress.gov alone exposes structured bills, laws, amendments, members, committees, votes, hearings, treaties and CRS reports, while Census has a dedicated data API. 

So your roadmap could ultimately become **France → EU → Canada → UK → USA → Switzerland/Australia → Nordics → international organizations**, with the same normalized `SourceEntityProps` contract across all of them.


Yes. I would **substantially expand the roadmap**. Spain, Germany and the Netherlands are only the beginning. For Slasher, there are enough serious official public-data infrastructures to define **20–30 national presets**.

The important distinction is: some countries have excellent real APIs for multiple domains; others mainly provide open-data catalogues, XML/bulk exports, or authenticated government interoperability services.

### Countries I would add

| Country | Particularly interesting official sources | Slasher coverage | Priority |
|---|---|---|---:|
| 🇪🇸 **Spain** | **BOE OpenData API**, INE API/OpenAPI, datos.gob.es API + SPARQL, PLACSP open procurement feeds | law, stats, opendata, procurement | **P0** |
| 🇩🇪 **Germany** | Gesetze im Internet XML, **Bundestag DIP REST/OpenAPI**, Destatis GENESIS REST, GovData CKAN + SPARQL | law, parliament, stats, opendata | **P0** |
| 🇳🇱 **Netherlands** | KOOP/Wetten.nl, **KVK APIs**, **BAG/PDOK OGC API**, CBS StatLine, TenderNed, data.overheid.nl | law, company, address, building, stats, procurement, data | **P0** |
| 🇫🇮 **Finland** | **Finlex REST API + Akoma Ntoso**, Finnish open-data/statistical services | law, case-law, public data | **P0** |
| 🇳🇴 **Norway** | **Brønnøysund company REST/OpenAPI**, SSB PxWeb 2, Data.norge APIs/SPARQL | company, stats, opendata | **P0** |
| 🇸🇪 **Sweden** | SCB PxWeb 2, SCB company-register API, national data portal, Lantmäteriet APIs | company, stats, geodata, opendata | **P0** |
| 🇵🇱 **Poland** | **Sejm + ELI API**, GUS statistical APIs | parliament, legislation, stats | **P0** |
| 🇪🇪 **Estonia** | e-Business Register APIs, Statistics Estonia API, public cadastre API/X-Road services | company, stats, cadastre | **P0** |
| 🇨🇭 **Switzerland** | opendata.swiss API, Parliament web services, Fedlex/geodata ecosystem | law, parliament, stats/data, geodata | **P1** |
| 🇩🇰 **Denmark** | StatBank API, CVR ecosystem, Dataforsyningen, Folketinget | company, address, stats, parliament | **P1** |
| 🇮🇪 **Ireland** | data.gov.ie CKAN, Oireachtas Open Data APIs, Irish Statute Book XML/ELI | parliament, law, opendata | **P1** |
| 🇮🇹 **Italy** | **Normattiva OpenData/OpenAPI**, public-data ecosystem, ANAC procurement | law, procurement, opendata | **P1** |
| 🇵🇹 **Portugal** | **BASE public-procurement REST API**, national open data and statistics | procurement, stats, opendata | **P1** |
| 🇧🇪 **Belgium** | Statbel APIs/PostgREST, be.STAT, data.gov.be, regional geodata | stats, data, geodata | **P1** |
| 🇦🇹 **Austria** | **RIS legal information + OGD interfaces**, Statistik Austria | law, case-law, stats | **P1** |
| 🇨🇿 **Czechia** | **e-Sbírka/e-Legislativa REST API**, open-data infrastructure | law, opendata | **P1** |
| 🇱🇺 **Luxembourg** | **data.public.lu uData REST API + DCAT**, statistics/geodata | opendata, stats | **P1** |
| 🇭🇷 **Croatia** | data.gov.hr + SPARQL/open-data services | opendata, HVD | P2 |
| 🇸🇮 **Slovenia** | OPSI national open-data infrastructure | opendata, geodata, stats | P2 |
| 🇷🇴 **Romania** | data.gov.ro + public datasets | opendata | P2 |
| 🇬🇷 **Greece** | data.gov.gr + national registries | opendata, procurement | P2 |
| 🇱🇻 **Latvia** | national open-data portal + national registries | opendata, company, geodata | P2 |
| 🇱🇹 **Lithuania** | national open-data portal + company/geodata services | opendata, company, geodata | P2 |
| 🇮🇸 **Iceland** | national data services + Statistics Iceland | stats, geodata, data | P2 |
| 🇸🇰 **Slovakia** | Slov-Lex, data.gov.sk, statistical services | law, data, stats | P2 |

Spain is already much stronger than your current roadmap suggests. **BOE exposes a real legal Open Data API**, INE has JSON/OpenAPI services, datos.gob.es exposes both API and SPARQL, and PLACSP publishes procurement data as machine-processable, daily-updated feeds. 

Germany is also clearly P0. Bundestag's DIP has an OAS3 API for procedures, documents and parliamentary material; Destatis exposes a REST/JSON GENESIS API; GovData exposes CKAN and SPARQL; and `Gesetze im Internet` provides structured XML and a daily XML index of federal legislation. 

The Netherlands may actually be one of the **best Slasher test countries after France**. KVK has search and company-profile APIs plus new HVD open-company datasets, BAG is directly exposed through Kadaster/PDOK APIs, CBS exposes statistical APIs, TenderNed has an OpenAPI-described publication service, and data.overheid.nl exposes a CKAN API. 

### Outside Europe

I would also extend Slasher internationally:

| Country | Particularly good sources | Slasher coverage | Priority |
|---|---|---|---:|
| 🇨🇦 **Canada** | Justice Laws XML, Corporations Canada API, Parliament, Statistics Canada, Open Government | law, company, parliament, stats, data | **P0** |
| 🇬🇧 **United Kingdom** | Companies House REST, UK Parliament API, ONS API, legislation.gov.uk, data.gov.uk | almost everything | **P0** |
| 🇺🇸 **United States** | Congress.gov API, Federal Register, Census, SEC EDGAR, USAspending, SAM.gov, Data.gov | huge coverage | **P0** |
| 🇯🇵 **Japan** | e-Gov Laws API v2, e-Stat API | law, stats | **P0/P1** |
| 🇰🇷 **South Korea** | Law Open API, KOSIS API, data.go.kr, OpenDART | law, stats, company/filings, data | **P1** |
| 🇸🇬 **Singapore** | data.gov.sg APIs, SingStat, ACRA datasets | stats, company, housing, transport, data | **P1** |
| 🇦🇺 **Australia** | ABS Data API, legislation, AusTender, government open data | law, procurement, stats, data | **P1** |
| 🇳🇿 **New Zealand** | NZBN API, Stats NZ API, data.govt.nz APIs | company, stats, data | **P1** |
| 🇧🇷 **Brazil** | Câmara REST API, dados.gov.br API, CNPJ, transparency APIs | parliament, company, data, spending | **P1** |
| 🇲🇽 **Mexico** | INEGI APIs, datos.gob.mx, government transparency systems | stats, data, geodata | **P1/P2** |
| 🇦🇷 **Argentina** | Datos Argentina CKAN, GeoRef, time-series APIs | address/geography, stats, opendata | **P1/P2** |
| 🇨🇱 **Chile** | Datos.gob.cl, Mercado Público, INE | procurement, stats, data | P2 |

Canada's federal company API is particularly useful because it now has official OpenAPI documentation and a public plan capped at 60 hits/minute; its federal laws have stable XML identifiers. 

The UK is another excellent reference architecture: Companies House serves live company information through a REST API, UK Parliament exposes authoritative linked data through an OAS3 API, and ONS has a programmatic statistics API. 

The US is interesting because it proves that the same Slasher model scales to a **very fragmented sovereign-data ecosystem**: Congress.gov alone exposes bills, amendments, members, committees, actions and legislative metadata through an official OAS3 API. 

Japan is also surprisingly clean: e-Gov now has a **Law API v2 with OpenAPI/Swagger**, while e-Stat exposes official statistics through APIs. 

South Korea has an official legislation Open API, KOSIS statistical OpenAPI, the national public-data API portal, and OpenDART for corporate filings. 

Singapore is probably one of the simplest international presets to demonstrate visually: data.gov.sg alone advertises **4,500+ datasets from 70+ agencies**, including real-time APIs, with ACRA company data among the publishers. 

New Zealand also has an unusually good business connector: the official NZBN API has Swagger-compatible definitions, subscription keys, ETags and change-event search. 

Brazil has a modern OpenAPI national data catalogue and an excellent Chamber of Deputies REST/OpenAPI service; its government also documents CNPJ APIs, although some CNPJ services have eligibility/commercial constraints. 

### What this means for Slasher

Rather than a roadmap limited to:

```text
France
EU
Germany
Netherlands
Spain
International
```

I would make the conceptual hierarchy:

```text
Slasher Sovereign Sources

Europe
├── France
├── European Union
├── Spain
├── Germany
├── Netherlands
├── Belgium
├── Italy
├── Portugal
├── Austria
├── Switzerland
├── Finland
├── Sweden
├── Norway
├── Denmark
├── Estonia
├── Poland
├── Ireland
├── Czechia
├── Luxembourg
└── Other EU/EEA

North America
├── Canada
├── United States
└── Mexico

Asia-Pacific
├── Japan
├── South Korea
├── Singapore
├── Australia
└── New Zealand

Latin America
├── Brazil
├── Argentina
└── Chile

International
├── European Union
├── Council of Europe
├── OECD
├── World Bank
├── United Nations
├── IMF
└── WHO
```

And I would **not create a completely different slash command for every country** long term.

Instead of eventually having:

```text
/loi
/eurlex
/gesetz
/wet
/ley
/canlaw
/uk-law
/jp-law
```

the universal goal should probably be:

```text
/law
/company
/parliament
/address
/procurement
/grant
/stats
/agent
/cadastre
/procedure
/opendata
/research
```

with a provider selector:

```text
/law
  🇫🇷 France — Légifrance
  🇪🇺 EU — EUR-Lex
  🇪🇸 Spain — BOE
  🇩🇪 Germany — Gesetze im Internet
  🇳🇱 Netherlands — Wetten.nl
  🇫🇮 Finland — Finlex
  🇦🇹 Austria — RIS
  🇵🇱 Poland — ELI
  🇨🇿 Czechia — e-Sbírka
  🇨🇦 Canada — Justice Laws
  🇬🇧 UK — legislation.gov.uk
  🇯🇵 Japan — e-Gov Laws
  🇰🇷 South Korea — 국가법령정보
```

That, to me, is where the project becomes much more interesting: **Slasher stops being a collection of French slash commands and becomes a normalized access layer for sovereign public data internationally.**

For the next research batches, I would do them in this order: **Spain → Germany → Netherlands → Finland/Norway/Sweden/Denmark → Estonia/Poland → UK → Canada → US → Japan/South Korea/Singapore**. Those countries already have enough machine-readable official infrastructure to test almost every `SourceEntityProps` type. 