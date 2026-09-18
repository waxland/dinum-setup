Several of the main providers can be integrated without credentials at all: European Parliament is public with a documented 500 requests/5 minutes/endpoint limit, TED Search requires no authentication, Eurostat is free programmatic access, PDOK/BAG explicitly states no authentication, and ONS is unrestricted with no key. CORDIS, KVK, Companies House, Bundestag DIP, Corporations Canada, Congress.gov and SAM.gov require some form of credential. 

Here is the documentation/TODO I would put into the project.

````md
# Slasher — Sovereign API Provider Bootstrap & Discovery TODO

> Goal: centralize all sovereign/public-data providers usable by Slasher,
> document how to obtain credentials, and automate as much API discovery as possible.
>
> Important rule:
> external credentials NEVER go into the BlockNote frontend.
> All authenticated calls go through `django-lasuite-sources`.

---

# 0. Core architecture

Recommended flow:

```text
BlockNote
   │
   ▼
django-lasuite-sources
   │
   ├── Provider Registry
   ├── Redis cache
   ├── Quota manager
   ├── Circuit breaker
   ├── Local search index
   │
   └── Sovereign API
```

Each provider should have:

```yaml
id: eu.eurostat
country: EU
type: statistics

base_url: https://ec.europa.eu/eurostat/api/

auth:
  type: none

quota:
  strategy: cache

security:
  allowed_hosts:
    - ec.europa.eu

health:
  enabled: true
  fallback: cache
```

Secrets:

```bash
SLASHER_EU_CORDIS_API_KEY=
SLASHER_DE_BUNDESTAG_API_KEY=
SLASHER_DE_DESTATIS_TOKEN=
SLASHER_NL_KVK_API_KEY=
SLASHER_CA_CORPORATIONS_API_KEY=
SLASHER_UK_COMPANIES_HOUSE_API_KEY=
SLASHER_US_CONGRESS_API_KEY=
SLASHER_US_SAM_API_KEY=
SLASHER_ES_AEMET_API_KEY=
```

Do NOT create a generic:

```bash
OPEN_DATA_API_KEY=
```

One key = one provider.

---

# 1. Python: do not manually implement every protocol

There is unfortunately no serious Python library that can magically discover
and normalize every sovereign API on Earth.

However, a large proportion of public data infrastructure uses only a handful
of standards.

Install:

```bash
pip install \
  httpx \
  pydantic \
  tenacity \
  redis \
  ckanapi \
  pandasdmx \
  pysdmx \
  SPARQLWrapper \
  OWSLib \
  sodapy \
  rdflib
```

## Libraries

### `ckanapi`

Documentation:

https://docs.ckan.org/en/latest/api/

Python:

```bash
pip install ckanapi
```

Useful for:

- data.gov
- open.canada.ca
- data.overheid.nl
- many regional portals
- many national open-data portals

Example:

```python
from ckanapi import RemoteCKAN

catalog = RemoteCKAN("https://open.canada.ca/data/en")

results = catalog.action.package_search(
    q="procurement",
    rows=10,
)
```

Most CKAN read/search operations do NOT require authentication.

---

### `pandaSDMX`

Documentation:

https://pandasdmx.readthedocs.io/

Python:

```bash
pip install pandasdmx
```

Very interesting for Slasher because it already knows how to work with
many statistical institutions.

Typical providers include:

- Eurostat
- OECD
- World Bank
- IMF-related SDMX services
- ECB
- ILO
- UNICEF
- United Nations
- national statistical offices

Example:

```python
import pandasdmx as sdmx

estat = sdmx.Request("ESTAT")
```

This is probably the closest existing Python library to a
"universal sovereign statistics connector".

Also evaluate:

https://py.sdmx.io/

Package:

```bash
pip install pysdmx
```

---

### `SPARQLWrapper`

Documentation:

https://sparqlwrapper.readthedocs.io/

Install:

```bash
pip install SPARQLWrapper
```

Useful for:

- CELLAR
- data.europa.eu
- EU linked data
- DCAT catalogues
- many semantic government datasets

---

### `OWSLib`

Documentation:

https://owslib.readthedocs.io/

Repository:

https://github.com/geopython/OWSLib

Install:

```bash
pip install OWSLib
```

Useful for:

- INSPIRE
- WFS
- WMS
- CSW
- OGC geographic services
- cadastral/geospatial APIs

---

### `sodapy`

Repository:

https://github.com/xmunoz/sodapy

Install:

```bash
pip install sodapy
```

Useful for Socrata-powered government portals.

Example:

```python
from sodapy import Socrata

client = Socrata(
    "data.example.gov",
    None,
)
```

Anonymous queries are possible on Socrata, but authenticated application tokens
generally receive better throttling conditions.

---

# 2. Build `slasher-discovery`

Instead of writing every provider manually, create:

```text
django-lasuite-sources/
└── discovery/
    ├── detector.py
    ├── ckan.py
    ├── dcat.py
    ├── sdmx.py
    ├── sparql.py
    ├── ogc.py
    ├── socrata.py
    ├── openapi.py
    └── registry.py
```

The detector should identify:

```text
CKAN
DCAT / DCAT-AP
SDMX
SPARQL
OGC API
Socrata
OpenAPI / Swagger
STAC
static bulk datasets
```

Example detection sequence:

```text
candidate domain
      │
      ├── /api/3/action/status_show
      │       └── CKAN
      │
      ├── /openapi.json
      │       └── OpenAPI
      │
      ├── /swagger.json
      │       └── Swagger
      │
      ├── /conformance
      │       └── OGC API
      │
      ├── /dataflow
      │       └── SDMX
      │
      └── RDF / DCAT metadata
              └── DCAT/SPARQL
```

IMPORTANT:

Discovery must NEVER automatically allow the discovered URL through SSRF
protection.

Flow must be:

```text
discover
   ↓
classify
   ↓
store candidate
   ↓
manual/automated security audit
   ↓
allowlist
   ↓
enable connector
```

---

# 3. Europe meta-discovery

## data.europa.eu

This should be the central EU discovery source.

Documentation:

https://data.europa.eu/api/hub/search/

Search API:

```text
https://data.europa.eu/api/hub/search/search
```

SPARQL:

```text
https://data.europa.eu/sparql
```

No personal token required for normal public search.

TODO:

- [ ] Implement `DataEuropaDiscoveryProvider`
- [ ] Search `dataset`
- [ ] Search `dataservice`
- [ ] Extract:
  - catalogue
  - publisher
  - accessURL
  - downloadURL
  - accessService
  - format
  - licence
- [ ] Classify each discovered service:
  - CKAN
  - SDMX
  - OGC
  - SPARQL
  - OpenAPI
- [ ] NEVER fetch arbitrary `accessURL` directly
- [ ] feed discovered endpoints into candidate registry

This can replace a huge amount of manual EU crawling.

---

# 4. 🇪🇺 European Union

## 4.1 EUR-Lex / CELLAR

Provider:

```text
eu.cellar.law
```

Slash:

```text
/law → European Union
```

SPARQL:

```text
https://publications.europa.eu/webapi/rdf/sparql
```

CELLAR resource:

```text
https://publications.europa.eu/resource/celex/{CELEX}
```

Example:

```text
https://publications.europa.eu/resource/celex/32024R1689
```

Documentation:

https://op.europa.eu/en/web/cellar

https://op.europa.eu/en/web/cellar/cellar-data/metadata/knowledge-graph

Authentication:

```text
NONE
```

Token:

```text
No token.
```

TODO:

- [ ] search using SPARQL
- [ ] retrieve CELEX identifier
- [ ] resolve document using CELLAR REST
- [ ] request RDF/XML metadata
- [ ] select FR/EN language expression
- [ ] normalize CELEX → `sourceId`
- [ ] cache metadata 24h+
- [ ] cache immutable historical versions much longer
- [ ] allowlist:
      `publications.europa.eu`
      `op.europa.eu`
      `data.europa.eu`

---

## 4.2 European Parliament

Provider:

```text
eu.parliament
```

API:

```text
https://data.europarl.europa.eu/api/v2
```

Swagger:

https://data.europarl.europa.eu/en/developer-corner/opendata-api

Authentication:

```text
NONE
```

Published limit:

```text
500 requests / 5 minutes / endpoint
```

TODO:

- [ ] local Redis limiter at 400/5 min
- [ ] leave 20% upstream safety margin
- [ ] cache MPs
- [ ] cache procedures
- [ ] cache adopted texts
- [ ] cache votes
- [ ] refresh active procedures more frequently
- [ ] fallback to cached results on 429

Allowlist:

```text
data.europarl.europa.eu
```

---

## 4.3 TED

Provider:

```text
eu.ted
```

API base:

```text
https://api.ted.europa.eu
```

Swagger:

```text
https://api.ted.europa.eu/swagger
```

Search:

```text
POST https://api.ted.europa.eu/v3/notices/search
```

Documentation:

https://docs.ted.europa.eu/api/latest/

Search docs:

https://docs.ted.europa.eu/api/latest/search.html

Authentication for PUBLIC SEARCH:

```text
NONE
```

Authentication is required for publication/submission APIs, but Slasher
does not need those.

TODO:

- [ ] implement local expert-query builder
- [ ] never expose raw expert-query execution to frontend
- [ ] cache search results
- [ ] index frequently requested notices
- [ ] use iteration token for large ingestion
- [ ] use pagination only for interactive search
- [ ] resolve notice URL after selection

Allowlist:

```text
api.ted.europa.eu
ted.europa.eu
```

---

## 4.4 Eurostat

Provider:

```text
eu.eurostat
```

Statistics API:

```text
https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/
```

API docs:

https://ec.europa.eu/eurostat/web/user-guides/data-browser/api-data-access/

Authentication:

```text
NONE
```

Token:

```text
No token.
```

TODO:

- [ ] use Catalogue API to discover dataset codes
- [ ] store dataset metadata locally
- [ ] autocomplete locally
- [ ] use live API only after dataset/dimensions selected
- [ ] never download entire statistical cube interactively
- [ ] investigate `pandaSDMX`
- [ ] investigate `pysdmx`
- [ ] normalize provider-independent type to `statistics`

Allowlist:

```text
ec.europa.eu
```

---

## 4.5 Funding & Tenders

Provider:

```text
eu.funding
```

Documentation:

https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/support/apis

Search API:

```text
https://api.tech.ec.europa.eu/search-api/prod/rest/search
```

Example:

```text
https://api.tech.ec.europa.eu/search-api/prod/rest/search?apiKey=SEDIA&text=AI
```

Facet API:

```text
https://api.tech.ec.europa.eu/search-api/prod/rest/facet?apiKey=SEDIA&text=...
```

Organisation:

```text
https://api.tech.ec.europa.eu/search-api/prod/rest/document/{PIC}?apiKey=SEDIA_PERSON
```

Authentication:

```text
No personal account/token required for these documented public services.
```

Important:

`SEDIA`, `SEDIA_PERSON`, etc. are service identifiers exposed by the public
API examples, not private Slasher secrets.

TODO:

- [ ] implement topics search
- [ ] grants search
- [ ] tenders search
- [ ] PIC organisation lookup
- [ ] normalize calls → `grant`
- [ ] cache facet dictionaries aggressively

Allowlist:

```text
api.tech.ec.europa.eu
ec.europa.eu
```

---

## 4.6 data.europa.eu

Provider:

```text
eu.dataeuropa
```

Documentation:

```text
https://data.europa.eu/api/hub/search/
```

Authentication:

```text
NONE
```

TODO:

- [ ] use both as `/opendata` provider
- [ ] use as internal API discovery engine
- [ ] cache catalogues
- [ ] classify access services
- [ ] do NOT proxy arbitrary dataset URLs

---

## 4.7 CORDIS

Provider:

```text
eu.cordis
```

Documentation:

https://cordis.europa.eu/about/dataextractions-api

OpenAPI:

```text
https://cordis.europa.eu/dataextractions/api-docs-ui
```

Authentication:

```text
API KEY REQUIRED for DET API
```

How to get token:

1. Create/sign in to a CORDIS account.
2. Open the CORDIS Data Extraction API support page.
3. Generate/retrieve the API key.
4. The same area allows regenerating the key.

Environment:

```bash
SLASHER_EU_CORDIS_API_KEY=
```

TODO:

- [ ] create dedicated CORDIS service account
- [ ] generate key
- [ ] store key server-side
- [ ] test DET API
- [ ] prefer public SPARQL/bulk routes for large indexing jobs
- [ ] use keyed DET API for targeted operations

Allowlist:

```text
cordis.europa.eu
```

---

# 5. 🇪🇸 Spain

## 5.1 BOE

Provider:

```text
es.boe.law
```

Documentation / Swagger:

```text
https://www.boe.es/datosabiertos/api/api.php
```

Base:

```text
https://www.boe.es/datosabiertos/api/
```

Consolidated legislation:

```text
https://www.boe.es/datosabiertos/api/legislacion-consolidada
```

Authentication:

```text
No personal API key documented for public OpenData endpoints.
```

TODO:

- [ ] implement legislation search
- [ ] resolve consolidated law
- [ ] support BOE daily summaries
- [ ] map stable BOE identifiers
- [ ] cache legislation

Allowlist:

```text
www.boe.es
```

---

## 5.2 INE — Statistics Spain

Provider:

```text
es.ine
```

Base:

```text
https://servicios.ine.es/wstempus/js/
```

Pattern:

```text
https://servicios.ine.es/wstempus/js/{LANG}/{FUNCTION}/{INPUT}
```

Example:

```text
https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/...
```

Authentication:

```text
NONE
```

TODO:

- [ ] provider adapter
- [ ] metadata discovery
- [ ] local table index
- [ ] live targeted queries
- [ ] type = `statistics`

Allowlist:

```text
servicios.ine.es
```

---

## 5.3 datos.gob.es

Provider:

```text
es.datosgob
```

Documentation:

```text
https://datos.gob.es/es/apidata
```

API:

```text
https://datos.gob.es/apidata/catalog/dataset
```

SPARQL:

access from:

```text
https://datos.gob.es/es/apidata
```

Authentication:

```text
NONE for public catalogue API
```

Formats:

```text
JSON
XML
RDF
Turtle
CSV
```

TODO:

- [ ] use as Spain discovery catalogue
- [ ] harvest dataset metadata
- [ ] discover HVD APIs
- [ ] classify services by protocol
- [ ] never automatically trust an access URL

Allowlist:

```text
datos.gob.es
```

---

## 5.4 AEMET

Provider:

```text
es.aemet
```

Portal:

```text
https://opendata.aemet.es/
```

API:

```text
https://opendata.aemet.es/opendata/api/
```

Authentication:

```text
FREE API KEY REQUIRED
```

How to obtain:

1. Go to:
   https://opendata.aemet.es/
2. Request an API key.
3. Enter your email address.
4. Receive the key by email.
5. Send it using the documented `api_key` header.

Environment:

```bash
SLASHER_ES_AEMET_API_KEY=
```

Published guidance indicates approximately:

```text
50 requests/minute
```

TODO:

- [ ] create project-specific key
- [ ] Redis global limiter: <= 40 req/min
- [ ] cache weather datasets
- [ ] understand AEMET two-request model
- [ ] validate temporary second-stage download URL against AEMET allowlist

---

## 5.5 PLACSP

Provider:

```text
es.placsp.procurement
```

Portal:

```text
https://contrataciondelestado.es/
```

Main public-sector contracting platform:

```text
https://contrataciondelestado.es/wps/portal/plataforma
```

Recommended Slasher strategy:

```text
bulk/open feeds
    ↓
local ingestion
    ↓
PostgreSQL/OpenSearch
    ↓
/suggest
```

TODO:

- [ ] identify authoritative current machine-readable feed
- [ ] record its format/version
- [ ] ingest locally
- [ ] do not depend on an undocumented frontend endpoint
- [ ] cross-reference TED when applicable

---

# 6. 🇩🇪 Germany

## 6.1 Bundestag DIP

Provider:

```text
de.bundestag.dip
```

Base:

```text
https://search.dip.bundestag.de/api/v1
```

Swagger:

```text
https://search.dip.bundestag.de/api/v1/swagger-ui/
```

Official API help:

```text
https://dip.bundestag.de/über-dip/hilfe/api
```

Documentation PDF:

```text
https://dip.bundestag.de/documents/informationsblatt_zur_dip_api.pdf
```

Authentication:

```text
API KEY REQUIRED
```

Credential options:

1. Check the official DIP API help page.
2. Bundestag periodically publishes a usable public key there.
3. For production/shared infrastructure, request a dedicated key rather than
   depending permanently on a published shared key.
4. Contact:
   `parlamentsdokumentation@bundestag.de`

Environment:

```bash
SLASHER_DE_BUNDESTAG_API_KEY=
```

Send:

```http
Authorization: ApiKey YOUR_KEY
```

or where supported:

```text
?apikey=YOUR_KEY
```

TODO:

- [ ] request dedicated Slasher key
- [ ] never hardcode Bundestag's temporary/public key
- [ ] support cursor pagination
- [ ] cache parliamentary material
- [ ] open breaker on 429

---

## 6.2 Destatis GENESIS

Provider:

```text
de.destatis
```

Info:

```text
https://www.destatis.de/EN/Service/OpenData/api-webservice.html
```

Base:

```text
https://genesis.destatis.de/genesisWS/rest/2020/
```

User guide:

```text
https://genesis.destatis.de/datenbank/online/docs/GENESIS-Webservices_Introduction.pdf
```

Authentication:

```text
PERSONAL TOKEN or username/password
```

How to obtain a token:

1. Go to:
   https://genesis.destatis.de/datenbank/online/
2. Create/sign in to a GENESIS account.
3. Open the **Webservice (API)** modal.
4. Copy the personal API token shown there.
5. You can regenerate it from the same modal.
6. Once regenerated, the previous token becomes invalid.

Environment:

```bash
SLASHER_DE_DESTATIS_TOKEN=
```

The token is used as the API `username` value.

Password is unnecessary when using a personal token.

Important:

Since July 2025 the supported modern interface is POST REST/JSON rather than
the old GET/SOAP interface.

TODO:

- [ ] create Slasher GENESIS account
- [ ] generate personal token
- [ ] store token in secret manager
- [ ] use POST
- [ ] implement table search
- [ ] cache metadata catalogue locally

---

## 6.3 GovData

Provider:

```text
de.govdata
```

Portal:

```text
https://www.govdata.de/
```

Use as:

```text
German open-data discovery catalogue
```

TODO:

- [ ] identify current CKAN/SPARQL endpoints from official portal
- [ ] implement with `ckanapi` / SPARQL
- [ ] no arbitrary distribution fetch
- [ ] use discovered API URLs as candidates only

---

## 6.4 Gesetze im Internet

Provider:

```text
de.gesetze
```

Portal:

```text
https://www.gesetze-im-internet.de/
```

Structured laws are available in XML.

Authentication:

```text
NONE
```

Recommended strategy:

```text
XML ingestion
→ local legal index
→ autocomplete locally
→ official URL on output
```

TODO:

- [ ] ingest federal XML
- [ ] build local law/article index
- [ ] track upstream changes
- [ ] avoid HTML scraping where XML exists

---

# 7. 🇳🇱 Netherlands

## 7.1 KVK live API

Provider:

```text
nl.kvk
```

Developer portal:

```text
https://developers.kvk.nl/
```

Documentation:

```text
https://developers.kvk.nl/documentation
```

Search:

```text
https://api.kvk.nl/api/v2/zoeken
```

Basisprofiel:

```text
https://api.kvk.nl/api/v1/basisprofielen
```

Vestigingsprofiel:

```text
https://api.kvk.nl/api/v1/vestigingsprofielen
```

Authentication:

```text
API KEY + COMMERCIAL SUBSCRIPTION
```

How to get token:

1. Go to:
   https://developers.kvk.nl/apply-for-apis
2. Create a Developer Portal account.
3. Request an API subscription.
4. KVK reviews the request.
5. Once approved, open **My Developer Portal**.
6. Retrieve the generated API key.
7. Monitor usage there.

Requirements include a KVK registration for normal organisations.

Header:

```http
apikey: YOUR_API_KEY
```

Environment:

```bash
SLASHER_NL_KVK_API_KEY=
```

Important:

The normal KVK API is paid.

There is a free test environment.

Test docs:

```text
https://developers.kvk.nl/documentation/testing
```

TODO:

- [ ] determine whether paid KVK use is acceptable for public Slasher
- [ ] do not use one unrestricted key directly from frontend
- [ ] add per-user quota
- [ ] cache company profiles
- [ ] prefer HVD/open dataset where sufficient

---

## 7.2 KVK HVD Open Dataset

Docs:

```text
https://developers.kvk.nl/documentation/open-dataset-basis-bedrijfsgegevens-api
```

Endpoint:

```text
https://opendata.kvk.nl/api/v1/hvds/basisbedrijfsgegevens/kvknummer
```

Authentication:

```text
Public open-data endpoint
```

Known limits:

```text
1 request/minute/IP
200 requests/5 minutes globally
```

This is NOT suitable as the live autocomplete backend.

Use:

```text
bulk HVD
→ local ingestion
→ local search
```

TODO:

- [ ] obtain bulk HVD distribution
- [ ] ingest locally
- [ ] only use online HVD endpoint for low-rate verification

---

## 7.3 BAG / PDOK

Provider:

```text
nl.bag
```

API:

```text
https://api.pdok.nl/kadaster/bag/ogc/v2
```

OpenAPI:

```text
https://api.pdok.nl/kadaster/bag/ogc/v2/api?f=html
```

Addresses:

```text
https://api.pdok.nl/kadaster/bag/ogc/v2/collections/adres/items
```

Authentication:

```text
NONE
```

Cost:

```text
FREE
```

Updated:

```text
daily
```

TODO:

- [ ] use OGC API Features
- [ ] test `OWSLib`
- [ ] autocomplete addresses
- [ ] fetch building/place objects
- [ ] cache by BAG ID

---

## 7.4 CBS Statistics

Portal:

```text
https://opendata.cbs.nl/
```

StatLine:

```text
https://opendata.cbs.nl/portal.html
```

Authentication for public open data:

```text
NONE
```

TODO:

- [ ] investigate OData endpoint automatically from catalogue
- [ ] normalize as `statistics`
- [ ] local metadata catalogue
- [ ] only fetch selected dimensions live

---

## 7.5 data.overheid.nl

Documentation:

```text
https://data.overheid.nl/en/ondersteuning/data-publiceren/api
```

API:

```text
https://data.overheid.nl/data/api/3/
```

Protocol:

```text
CKAN Action API
```

Authentication:

```text
NONE for normal catalogue reads
```

Python:

```python
from ckanapi import RemoteCKAN
```

TODO:

- [ ] use as Netherlands discovery provider
- [ ] classify distributions
- [ ] detect OGC/SDMX/OpenAPI services

---

# 8. 🇨🇦 Canada

## 8.1 Justice Laws

Provider:

```text
ca.justice.laws
```

Portal:

```text
https://laws-lois.justice.gc.ca/
```

XML dictionary:

```text
https://laws-lois.justice.gc.ca/eng/XML/index.html
```

Official XML repository:

```text
https://github.com/justicecanada/laws-lois-xml
```

Authentication:

```text
NONE
```

TODO:

- [ ] clone/sync XML repository
- [ ] index locally
- [ ] use `UniqueID` as canonical sourceId
- [ ] use official Justice URL on rendered block
- [ ] refresh repository periodically

This should NOT require a live API call for every user search.

---

## 8.2 Corporations Canada

Provider:

```text
ca.corporations
```

Data services:

```text
https://ised-isde.canada.ca/site/corporations-canada/en/data-services
```

API docs:

```text
https://api.ised-isde.canada.ca/en/docs?api=corporations
```

French:

```text
https://api.ised-isde.canada.ca/fr/docs?api=corporations
```

Authentication:

```text
PUBLIC PLAN SUBSCRIPTION REQUIRED
```

Current public plan limit:

```text
60 requests/minute
```

How to obtain:

1. Open API documentation.
2. Sign in to the ISED API catalogue.
3. Subscribe to the **Public plan**.
4. Obtain the subscription/API credential provided by the portal.
5. Store server-side.

Environment:

```bash
SLASHER_CA_CORPORATIONS_API_KEY=
```

TODO:

- [ ] create project account
- [ ] subscribe public plan
- [ ] test exact authentication header from generated OpenAPI spec
- [ ] cap Slasher to <= 45 requests/min
- [ ] local autocomplete/index
- [ ] live company resolution after selection

---

## 8.3 House of Commons

Open Data:

```text
https://www.ourcommons.ca/en/open-data
```

Bills:

```text
https://www.parl.ca/legisinfo/en/bills/json
```

Authentication:

```text
NONE
```

Formats include:

```text
JSON
XML
RSS
```

TODO:

- [ ] MPs
- [ ] bills
- [ ] votes
- [ ] debates
- [ ] committees
- [ ] petitions
- [ ] cache parliamentary entities

---

## 8.4 Statistics Canada

Developer docs:

```text
https://www.statcan.gc.ca/en/developers/wds
```

Authentication:

```text
No API key documented for public WDS access
```

Also supports:

```text
SDMX REST
```

TODO:

- [ ] test `pandaSDMX`
- [ ] cache cube metadata
- [ ] autocomplete locally
- [ ] retrieve small selected slices live

---

## 8.5 Open Government Canada

Docs:

```text
https://open.canada.ca/en/access-our-application-programming-interface-api
```

API example:

```text
https://open.canada.ca/data/en/api/3/action/package_search?q=spending
```

Authentication:

```text
NONE for read-only calls
```

Protocol:

```text
CKAN
```

Important Canada-specific behavior:

```text
GET requests only
```

TODO:

- [ ] use `ckanapi`
- [ ] use as Canada discovery service
- [ ] index API/distribution metadata

---

# 9. 🇬🇧 United Kingdom

## 9.1 Companies House

Provider:

```text
uk.companieshouse
```

Developer portal:

```text
https://developer.company-information.service.gov.uk/
```

Getting started:

```text
https://developer.company-information.service.gov.uk/get-started
```

API base:

```text
https://api.company-information.service.gov.uk/
```

Authentication:

```text
API KEY REQUIRED
```

How to obtain:

1. Register a Companies House user account.
2. Sign into developer portal.
3. Create an application.
4. Select test or live.
5. Open application.
6. Click **Create new key**.
7. Choose **API key**.
8. Store generated key.

Detailed instructions:

```text
https://developer.company-information.service.gov.uk/how-to-create-an-application
```

Environment:

```bash
SLASHER_UK_COMPANIES_HOUSE_API_KEY=
```

Authentication uses HTTP Basic:

```bash
curl -u "$SLASHER_UK_COMPANIES_HOUSE_API_KEY:" \
  https://api.company-information.service.gov.uk/company/00000006
```

TODO:

- [ ] create live Slasher application
- [ ] generate API key
- [ ] local company autocomplete
- [ ] use live API on resolve/refresh
- [ ] central quota limiter

---

## 9.2 UK Parliament

OpenAPI:

```text
https://api.parliament.uk/openapi
```

API:

```text
https://api.parliament.uk/
```

Authentication:

```text
NONE for public linked-data API
```

TODO:

- [ ] introspect OpenAPI automatically
- [ ] generate typed client
- [ ] MPs
- [ ] legislation/parliamentary objects
- [ ] search
- [ ] cache immutable objects

---

## 9.3 ONS

Docs:

```text
https://developer.ons.gov.uk/
```

API:

```text
https://api.beta.ons.gov.uk/v1
```

Search:

```text
https://api.beta.ons.gov.uk/v1/search
```

Authentication:

```text
NONE
```

TODO:

- [ ] statistics provider
- [ ] cache dataset catalogue
- [ ] watch beta endpoint/deprecation notices

---

# 10. 🇺🇸 United States

## 10.1 Congress.gov

Provider:

```text
us.congress
```

OpenAPI:

```text
https://api.congress.gov/
```

Signup:

```text
https://api.congress.gov/sign-up
```

Underlying API-key platform:

```text
https://api.data.gov/signup/
```

Authentication:

```text
API KEY REQUIRED
```

How to get key:

1. Go to:
   https://api.congress.gov/sign-up
2. Complete api.data.gov signup.
3. Receive API key.
4. Store in secret manager.

Environment:

```bash
SLASHER_US_CONGRESS_API_KEY=
```

TODO:

- [ ] bills
- [ ] amendments
- [ ] members
- [ ] committees
- [ ] hearings
- [ ] CRS reports
- [ ] treaties
- [ ] cache aggressively

---

## 10.2 Census

Developers:

```text
https://www.census.gov/data/developers.html
```

Key signup:

```text
https://api.census.gov/data/key_signup.html
```

Authentication:

```text
Key optional at low usage.
```

Census guidance indicates a key should be requested when performing
more than roughly 500 queries/IP/day.

Environment:

```bash
SLASHER_US_CENSUS_API_KEY=
```

TODO:

- [ ] request free key anyway for production
- [ ] centralize key server-side
- [ ] integrate population/business/geography datasets

---

## 10.3 SEC EDGAR

Docs:

```text
https://www.sec.gov/search-filings/edgar-application-programming-interfaces
```

API host:

```text
https://data.sec.gov/
```

Authentication:

```text
NONE
```

API key:

```text
NONE
```

BUT:

A descriptive `User-Agent` is expected.

Example:

```http
User-Agent: Slasher/1.0 contact@example.org
```

TODO:

- [ ] configure explicit contact User-Agent
- [ ] company filings
- [ ] XBRL facts
- [ ] submissions
- [ ] respect SEC fair-access rules

---

## 10.4 SAM.gov

Developer docs:

```text
https://open.gsa.gov/api/
```

Opportunity API:

```text
https://open.gsa.gov/api/get-opportunities-public-api/
```

Assistance listings:

```text
https://open.gsa.gov/api/assistance-listings-api/
```

Entity API:

```text
https://open.gsa.gov/api/entity-api/
```

Authentication:

```text
API KEY REQUIRED
```

How to get:

1. Create a SAM.gov account.
2. Log in.
3. Open Account Details/Profile.
4. Locate **Public API Key**.
5. Request/reveal key.
6. A one-time code may be sent to account email.

Profile:

```text
https://sam.gov/workspace/profile/account-details
```

Environment:

```bash
SLASHER_US_SAM_API_KEY=
```

IMPORTANT:

Some SAM APIs have extremely low default limits for ordinary
non-federal users.

For example certain public APIs document:

```text
10 requests/day
```

for non-federal accounts without an assigned SAM role.

This means:

```text
DO NOT use SAM directly for Slasher autocomplete.
```

Strategy:

```text
bulk/cache/index
+
very limited live verification
```

---

## 10.5 Data.gov

Catalogue:

```text
https://catalog.data.gov/
```

Typical CKAN API:

```text
https://catalog.data.gov/api/3/action/package_search
```

Authentication for normal public catalogue search:

```text
NONE
```

Use:

```text
ckanapi
```

TODO:

- [ ] discovery only
- [ ] detect API distributions
- [ ] manual approve endpoint before adding provider

---

# 11. International statistical APIs

These are ideal targets for `pandaSDMX` / `pysdmx`.

## World Bank

```text
https://api.worldbank.org/v2/
```

Authentication:

```text
NONE for standard public API
```

Provider:

```text
intl.worldbank
```

---

## OECD

Developer/data ecosystem:

```text
https://data-explorer.oecd.org/
```

SDMX API host:

```text
https://sdmx.oecd.org/public/rest/v1/
```

Provider:

```text
intl.oecd
```

Use SDMX Python libraries.

---

# 12. Automated provider classification

Create:

```python
class ProviderProbeResult(BaseModel):
    url: str

    protocol: Literal[
        "ckan",
        "sdmx",
        "sparql",
        "dcat",
        "ogc-api",
        "socrata",
        "openapi",
        "bulk",
        "unknown",
    ]

    openapi_url: str | None = None
    requires_auth: bool | None = None
    confidence: float
```

Probe functions:

```python
async def probe_ckan(base_url): ...
async def probe_openapi(base_url): ...
async def probe_ogc(base_url): ...
async def probe_sdmx(base_url): ...
async def probe_sparql(base_url): ...
async def probe_dcat(base_url): ...
```

---

# 13. Provider auth classes

Normalize authentication internally:

```python
class ProviderAuthType(StrEnum):
    NONE = "none"
    API_KEY_HEADER = "api_key_header"
    API_KEY_QUERY = "api_key_query"
    BASIC_API_KEY = "basic_api_key"
    BEARER = "bearer"
    OAUTH2_CLIENT_CREDENTIALS = "oauth2_client_credentials"
    USERNAME_PASSWORD = "username_password"
    CUSTOM = "custom"
```

Examples:

```yaml
eu.eurostat:
  type: none

nl.kvk:
  type: api_key_header
  header: apikey

uk.companieshouse:
  type: basic_api_key

de.bundestag:
  type: api_key_header
  header: Authorization
  prefix: "ApiKey "

de.destatis:
  type: custom
  username_field: username
  token_as_username: true
```

---

# 14. Secret storage

Development:

```text
.env
```

Never committed.

Production:

prefer:

```text
AWS Secrets Manager
GCP Secret Manager
Vault
Kubernetes Secrets + encryption
```

Example:

```bash
SLASHER_NL_KVK_API_KEY=...
SLASHER_DE_DESTATIS_TOKEN=...
```

Django settings should retrieve them only at process startup.

Never return upstream credentials in:

```text
API responses
logs
Sentry breadcrumbs
BlockNote JSON
browser JS
```

---

# 15. Quota model

Provider configuration:

```yaml
id: ca.corporations

quota:
  upstream:
    requests: 60
    period_seconds: 60

  slasher:
    requests: 45
    period_seconds: 60

cache:
  suggest_ttl: 86400
  entity_ttl: 21600
  stale_if_error: 604800
```

Always reserve upstream headroom.

Example:

```text
Provider says 60/minute

Slasher hard limit:
45/minute

remaining 15:
- refresh
- admin
- retries
- health checks
- provider behavior changes
```

---

# 16. Provider runtime state

```python
class ProviderState(StrEnum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    CACHED_ONLY = "cached_only"
    DISABLED = "disabled"
```

State transition:

```text
HEALTHY
  │
  ├── quota > 80%
  ├── high latency
  ▼
DEGRADED
  │
  ├── 429
  ├── provider outage
  ▼
CACHED_ONLY
  │
  ├── cache unavailable
  ▼
DISABLED
```

Never delete an existing BlockNote source because an API is offline.

---

# 17. Most important implementation TODO

## Phase 1 — discovery framework

- [ ] Install `ckanapi`
- [ ] Install `pandaSDMX`
- [ ] Test `pysdmx`
- [ ] Install `SPARQLWrapper`
- [ ] Install `OWSLib`
- [ ] Install `sodapy`
- [ ] implement protocol probes
- [ ] implement provider registry
- [ ] implement candidate endpoint database
- [ ] implement host security review
- [ ] implement automatic OpenAPI ingestion

## Phase 2 — EU discovery

- [ ] data.europa.eu meta catalogue
- [ ] detect `dcat:DataService`
- [ ] discover national HVD services
- [ ] classify CKAN / OGC / SDMX / SPARQL
- [ ] create review dashboard

## Phase 3 — no-key providers

Implement first because deployment is trivial:

- [ ] CELLAR
- [ ] European Parliament
- [ ] TED Search
- [ ] Eurostat
- [ ] Funding & Tenders
- [ ] data.europa.eu
- [ ] BOE
- [ ] INE
- [ ] datos.gob.es
- [ ] BAG/PDOK
- [ ] CBS
- [ ] data.overheid.nl
- [ ] Justice Canada XML
- [ ] Canadian Parliament
- [ ] Statistics Canada
- [ ] Open Canada
- [ ] UK Parliament
- [ ] ONS
- [ ] SEC EDGAR
- [ ] Data.gov

## Phase 4 — credentials

Create accounts/credentials:

- [ ] CORDIS
- [ ] Bundestag DIP
- [ ] Destatis
- [ ] AEMET
- [ ] KVK
- [ ] Corporations Canada
- [ ] Companies House
- [ ] Congress.gov
- [ ] Census
- [ ] SAM.gov

## Phase 5 — expensive/restrictive providers

- [ ] never put these behind keystroke autocomplete
- [ ] build local index
- [ ] live lookup only after entity selection
- [ ] use stale cache during quota exhaustion

Particularly:

```text
KVK
SAM.gov
Corporations Canada
Destatis
CORDIS
```

---

# 18. Final recommendation

Do NOT make Slasher:

```text
a collection of 100 handwritten HTTP integrations
```

Make it:

```text
             Slasher
                │
         Protocol adapters
                │
   ┌────────────┼─────────────┐
   │            │             │
 CKAN         SDMX          DCAT
   │            │             │
SPARQL         OGC         OpenAPI
   │            │             │
   └────────────┼─────────────┘
                │
         Provider Registry
                │
     Sovereign source adapters
```

The long-term objective should be that adding a new provider often requires
only a YAML definition:

```yaml
id: nl.bag
country: NL
entity_type: address

protocol: ogc-api

base_url: https://api.pdok.nl/kadaster/bag/ogc/v2

collection: adres

auth:
  type: none

mapping:
  sourceId: identification
  title: formatted_address
  meta1: postcode
  meta2: woonplaats_naam
  meta3: adresseerbaar_object_type
```

rather than writing a completely new connector every time.
````

The Python piece is the part I would invest in first. CKAN itself explicitly recommends `ckanapi`; `pandaSDMX` can already explore more than 20 statistical providers; `SPARQLWrapper` handles generic SPARQL endpoints; and `OWSLib` provides a common Python client layer for OGC services. 

The especially interesting approach is therefore **`data.europa.eu + DCAT-AP` as the European API discovery engine**, not just as one more `/opendata` connector. Its Hub API can search `catalogue`, `dataset`, `dataservice` and `resource` objects, which gives you the metadata needed to discover candidate services before auditing and allowlisting them. 

And a few credential details above are worth highlighting because they materially affect Slasher architecture: KVK's normal live API requires an approved subscription/API key and is billed, whereas its HVD API is open but currently limited to one request/minute/IP and 200 requests/5 minutes globally; Corporations Canada documents a public subscription plan at 60 requests/minute; Companies House keys are generated after creating an application; Congress.gov keys come through api.data.gov; and SEC EDGAR's public data APIs require no key. 