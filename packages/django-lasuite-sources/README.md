# 🐍 `django-lasuite-sources`

> Standalone, reusable Django application connecting **La Suite Numérique** and public web applications to **Sovereign Data Sources** (Légifrance, Base Adresse Nationale, BOAMP, Aides-Territoires, INSEE, Annuaire Entreprises, Albert RAG, etc.).

---

## ⚡ Installation & Quickstart (< 5 min)

```bash
# With pip
pip install django-lasuite-sources

# Or with uv
uv add django-lasuite-sources
```

### 1. Declare in `settings.py`

```python
INSTALLED_APPS = [
    ...,
    "rest_framework",
    "lasuite_sources",
]

# Optional: Configuration of active providers
LASUITE_SOURCES = {
    "ENABLED_PROVIDERS": [
        "law",          # Légifrance / DILA (PISTE)
        "company",      # Corporate Registry / RNE
        "parliament",   # National Assembly
        "address",      # National Address Base (BAN)
        "procurement",  # Public Procurement & BOAMP
        "grant",        # Grants & Aides-Territoires
        "insee",        # Territorial Statistics INSEE
        "agent",        # Public Directory DILA
        "cadastre",     # Land Registry & Parcels DGFiP
        "demarche",     # Simplified Administrative Procedures
        "opendata",     # data.gouv.fr Open Data
        "custom",       # Albert Sovereign AI RAG
    ],
    "CACHE_TTL": 86400,          # 24h default
    "REDIS_CACHE_ALIAS": "default",
}
```

### 2. Include URLs in `urls.py`

```python
from django.urls import include, path

urlpatterns = [
    ...,
    path("api/v1.0/", include("lasuite_sources.urls")),
]
```

---

## 📡 Available REST Endpoints

- `GET /api/v1.0/sources/search/?type=<type>&q=<query>&limit=10`: Structured search with 24h Redis caching.
- `GET /api/v1.0/sources/suggest/?type=<type>&q=<query>&limit=5`: High-performance autocomplete (< 100ms).
- `GET /api/v1.0/sources/<type>/<source_id>/`: Detailed verified entity record.

---

## 🛡️ Network Resilience & Offline Mode

If ministerial API keys (PISTE, Albert, BOAMP) are not configured in local development, connectors automatically fall back to **certified mock data**, ensuring smooth local development without external dependencies.
