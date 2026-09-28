"""Tests for BulkDatasetIngestionEngine, cache-backed index reconstruction, SHA-256 fingerprinting, and local indexes inventory (R-04.06)."""

import json
import os

from django.core.cache import cache

import pytest

from lasuite_sources.ingestion import BulkDatasetIngestionEngine
from lasuite_sources.types import SourceSearchResult


@pytest.fixture(autouse=True)
def clear_local_cache():
    cache.clear()
    yield
    cache.clear()


def test_bulk_dataset_ingestion_engine_metadata_and_cache_reconstruction():
    """Verify BulkDatasetIngestionEngine tracks dataset metadata, computes SHA-256, and reconstructs index from cache (R-04.06)."""
    engine = BulkDatasetIngestionEngine(dataset_name="canadabuys_sample")

    csv_data = """tender_id,title,buyer,status,closing_date
T-2026-001,Cloud Hosting Services,Shared Services Canada,Active,2026-12-31
T-2026-002,Office Furniture Supply,Public Works Canada,Closed,2026-05-15
"""

    def mapper(row):
        return SourceSearchResult(
            source_id=row["tender_id"],
            entity_type="procurement",
            display_mode="card",
            title=row["title"],
            subtitle=row["buyer"],
            status=row["status"],
            status_color="blue" if row["status"] == "Active" else "gray",
            meta1=row["tender_id"],
            meta2=row["buyer"],
            meta3=f"Closing: {row['closing_date']}",
            excerpt=f"Tender {row['tender_id']} issued by {row['buyer']}.",
            summary=row["title"],
            url=f"https://canadabuys.canada.ca/en/tender/{row['tender_id']}",
            verified_at="2026-09-18",
            raw_payload=row,
        )

    # 1. Parse CSV stream and verify metadata tracking
    results = engine.parse_csv_stream(
        csv_data,
        mapper,
        dataset_version="2026.09.18",
        dataset_source="CanadaBuys Portal",
    )
    assert len(results) == 2

    meta = engine.get_dataset_metadata()
    assert meta is not None
    assert meta["dataset_name"] == "canadabuys_sample"
    assert meta["dataset_version"] == "2026.09.18"
    assert meta["dataset_source"] == "CanadaBuys Portal"
    assert meta["record_count"] == 2
    assert len(meta["sha256_hash"]) == 64
    assert meta["ingested_at"] is not None

    # 2. Persist index to cache
    assert engine.save_to_cache(content_bytes=csv_data.encode("utf-8")) is True

    # 3. Create fresh engine instance and reconstruct index from cache
    reconstructed_engine = BulkDatasetIngestionEngine(dataset_name="canadabuys_sample")
    assert reconstructed_engine.load_from_cache() is True

    # 4. Query reconstructed index
    search_res = reconstructed_engine.search_index("cloud")
    assert len(search_res) == 1
    assert search_res[0]["source_id"] == "T-2026-001"

    item = reconstructed_engine.get_by_id("T-2026-002")
    assert item is not None
    assert item["title"] == "Office Furniture Supply"

    reconstructed_meta = reconstructed_engine.get_dataset_metadata()
    assert reconstructed_meta is not None
    assert reconstructed_meta["sha256_hash"] == meta["sha256_hash"]
    assert reconstructed_meta["record_count"] == 2


def test_jsonl_parsing_and_indexing():
    """Verify JSONL stream parsing in BulkDatasetIngestionEngine (R-04.06)."""
    engine = BulkDatasetIngestionEngine(dataset_name="boamp_sample")

    jsonl_data = """{"id": "BOAMP-2026-001", "title": "Fourniture de logiciels libres", "buyer": "DINUM"}
{"id": "BOAMP-2026-002", "title": "Maintenance des serveurs", "buyer": "DSI"}
"""

    def mapper(row):
        return SourceSearchResult(
            source_id=row["id"],
            entity_type="procurement",
            display_mode="callout",
            title=row["title"],
            subtitle=row["buyer"],
            status="Publié",
            status_color="blue",
        )

    results = engine.parse_jsonl_stream(
        jsonl_data, mapper, dataset_version="2026.09.20", dataset_source="BOAMP DILA"
    )
    assert len(results) == 2

    assert len(engine.search_index("logiciels")) == 1
    assert (
        engine.get_by_id("BOAMP-2026-001")["title"] == "Fourniture de logiciels libres"
    )


def test_local_indexes_inventory_file_validity():
    """Verify local_indexes_inventory.json exists and states no_index_autopopulated on default startup (R-04.06)."""
    inventory_path = os.path.join(
        os.path.dirname(__file__), "..", "docs", "local_indexes_inventory.json"
    )
    assert os.path.exists(inventory_path), (
        "local_indexes_inventory.json file MUST exist in docs/"
    )

    with open(inventory_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert data["default_startup_status"] == "no_index_autopopulated"
    assert "BulkDatasetIngestionEngine" in data["engine"]
    assert len(data["indexes"]) >= 3

    for item in data["indexes"]:
        assert "dataset_name" in item
        assert "format" in item
        assert item["operational_status"] == "template_only"
        assert item["sha256_verification"] is True
        assert item["reconstruction_supported"] is True
