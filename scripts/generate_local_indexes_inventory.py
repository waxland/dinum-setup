"""Script generating local_indexes_inventory.json and LOCAL_INDEXES_INVENTORY.md (R-04.06)."""

import json
import os

indexes_meta = [
    {
        "dataset_name": "canadabuys_sample",
        "category": "procurement",
        "format": "CSV",
        "source": "CanadaBuys Open Government Portal",
        "default_version": "2026.09.18",
        "operational_status": "template_only",
        "ingestion_engine": "BulkDatasetIngestionEngine",
        "sha256_verification": True,
        "reconstruction_supported": True,
        "description": "Federal Canadian procurement tenders and awards sample CSV stream."
    },
    {
        "dataset_name": "dvf_sample",
        "category": "property",
        "format": "CSV",
        "source": "Demandes de Valeurs Foncières (DGFiP / Etalab)",
        "default_version": "2026.04.01",
        "operational_status": "template_only",
        "ingestion_engine": "BulkDatasetIngestionEngine",
        "sha256_verification": True,
        "reconstruction_supported": True,
        "description": "French real estate transactions and land value requests sample CSV stream."
    },
    {
        "dataset_name": "boamp_sample",
        "category": "procurement",
        "format": "JSONL",
        "source": "Bulletin Officiel des Annonces des Marchés Publics (DILA)",
        "default_version": "2026.09.20",
        "operational_status": "template_only",
        "ingestion_engine": "BulkDatasetIngestionEngine",
        "sha256_verification": True,
        "reconstruction_supported": True,
        "description": "French official public procurement notices sample JSON Lines stream."
    }
]

inventory_payload = {
    "version": "1.0.0",
    "last_updated": "2026-09-28",
    "default_startup_status": "no_index_autopopulated",
    "summary": "No local index dataset is auto-populated on default startup. All 53 connectors operate in direct live HTTPS mode or explicit demo_only mode. Local indexing capabilities are provided by BulkDatasetIngestionEngine for scheduled ingestion, SHA-256 fingerprinting, versioning, and cache-backed index reconstruction.",
    "engine": "lasuite_sources.ingestion.BulkDatasetIngestionEngine",
    "indexes": indexes_meta
}

# Save JSON
out_json_path = "packages/django-lasuite-sources/docs/local_indexes_inventory.json"
os.makedirs(os.path.dirname(out_json_path), exist_ok=True)
with open(out_json_path, "w", encoding="utf-8") as f:
    json.dump(inventory_payload, f, indent=2, ensure_ascii=False)

# Save Markdown
out_md_path = "packages/django-lasuite-sources/docs/LOCAL_INDEXES_INVENTORY.md"
md_lines = [
    "# 🗄️ Local Dataset Indexes Inventory & Ingestion Engine",
    "",
    "**Version:** 1.0.0  ",
    "**Date:** 28 September 2026  ",
    "**Default Startup Status:** `no_index_autopopulated`  ",
    "**Ingestion Engine:** `lasuite_sources.ingestion.BulkDatasetIngestionEngine`  ",
    "",
    "## 📌 Operational Statement",
    "",
    "On default startup, **no local dataset index is auto-populated on disk or cache**. To avoid unverified claims of local dataset searches, all 53 registered connectors operate either in **direct live HTTPS API mode** (e.g. BAN Address) or in **explicit demo_only mode** (e.g. Légifrance, Albert, EurLex).",
    "",
    "When a local index is populated via scheduled tasks, `BulkDatasetIngestionEngine` tracks dataset source, version, ingestion date, record count, and deterministic SHA-256 content hashes, with support for index reconstruction from cache.",
    "",
    "## 📋 Tested Local Index Templates",
    "",
    "| Nom du Jeu de Données | Catégorie | Format | Source Officielle | Version Modèle | Statut Opérationnel | Empreinte SHA-256 | Reconstruction Cache |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |"
]

for idx in indexes_meta:
    md_lines.append(f"| `{idx['dataset_name']}` | `{idx['category']}` | `{idx['format']}` | {idx['source']} | `{idx['default_version']}` | `{idx['operational_status']}` | `Oui` | `Oui` |")

md_lines.extend([
    "",
    "## 🔄 Ingestion & Reconstruction Protocol",
    "",
    "```python",
    "from lasuite_sources.ingestion import BulkDatasetIngestionEngine",
    "",
    "# 1. Initialize engine for dataset",
    "engine = BulkDatasetIngestionEngine('canadabuys_sample')",
    "",
    "# 2. Check if pre-computed index exists in cache",
    "if not engine.load_from_cache():",
    "    # 3. Parse CSV or JSONL content stream with SHA-256 fingerprinting",
    "    engine.parse_csv_stream(raw_csv_data, mapper_fn, dataset_version='2026.09.18', dataset_source='CanadaBuys')",
    "    # 4. Save serialized index and metadata into Redis cache",
    "    engine.save_to_cache(version='2026.09.18', source='CanadaBuys', content_bytes=raw_csv_data.encode())",
    "",
    "# 5. Query local in-memory / reconstructed index",
    "results = engine.search_index('cloud', limit=10)",
    "metadata = engine.get_dataset_metadata()",
    "```"
])

with open(out_md_path, "w", encoding="utf-8") as f:
    f.write("\n".join(md_lines) + "\n")

print(f"Successfully generated local indexes inventory for {len(indexes_meta)} templates.")
