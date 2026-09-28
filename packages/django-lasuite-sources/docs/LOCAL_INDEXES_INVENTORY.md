# 🗄️ Local Dataset Indexes Inventory & Ingestion Engine

**Version:** 1.0.0  
**Date:** 28 September 2026  
**Default Startup Status:** `no_index_autopopulated`  
**Ingestion Engine:** `lasuite_sources.ingestion.BulkDatasetIngestionEngine`

## 📌 Operational Statement

On default startup, **no local dataset index is auto-populated on disk or cache**. To avoid unverified claims of local dataset searches, all 53 registered connectors operate either in **direct live HTTPS API mode** (e.g. BAN Address) or in **explicit demo_only mode** (e.g. Légifrance, Albert, EurLex).

When a local index is populated via scheduled tasks, `BulkDatasetIngestionEngine` tracks dataset source, version, ingestion date, record count, and deterministic SHA-256 content hashes, with support for index reconstruction from cache.

## 📋 Tested Local Index Templates

| Nom du Jeu de Données | Catégorie     | Format  | Source Officielle                                         | Version Modèle | Statut Opérationnel | Empreinte SHA-256 | Reconstruction Cache |
| --------------------- | ------------- | ------- | --------------------------------------------------------- | -------------- | ------------------- | ----------------- | -------------------- |
| `canadabuys_sample`   | `procurement` | `CSV`   | CanadaBuys Open Government Portal                         | `2026.09.18`   | `template_only`     | `Oui`             | `Oui`                |
| `dvf_sample`          | `property`    | `CSV`   | Demandes de Valeurs Foncières (DGFiP / Etalab)            | `2026.04.01`   | `template_only`     | `Oui`             | `Oui`                |
| `boamp_sample`        | `procurement` | `JSONL` | Bulletin Officiel des Annonces des Marchés Publics (DILA) | `2026.09.20`   | `template_only`     | `Oui`             | `Oui`                |

## 🔄 Ingestion & Reconstruction Protocol

```python
from lasuite_sources.ingestion import BulkDatasetIngestionEngine

# 1. Initialize engine for dataset
engine = BulkDatasetIngestionEngine("canadabuys_sample")

# 2. Check if pre-computed index exists in cache
if not engine.load_from_cache():
    # 3. Parse CSV or JSONL content stream with SHA-256 fingerprinting
    engine.parse_csv_stream(
        raw_csv_data,
        mapper_fn,
        dataset_version="2026.09.18",
        dataset_source="CanadaBuys",
    )
    # 4. Save serialized index and metadata into Redis cache
    engine.save_to_cache(
        version="2026.09.18", source="CanadaBuys", content_bytes=raw_csv_data.encode()
    )

# 5. Query local in-memory / reconstructed index
results = engine.search_index("cloud", limit=10)
metadata = engine.get_dataset_metadata()
```
