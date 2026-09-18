"""Tests for BulkDatasetIngestionEngine."""

import pytest
from lasuite_sources.ingestion import BulkDatasetIngestionEngine
from lasuite_sources.types import SourceSearchResult


def test_bulk_ingestion_csv_stream():
    """Verify CSV parsing, SHA-256 hashing, and in-memory full-text search."""
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

    results = engine.parse_csv_stream(csv_data, mapper)
    assert len(results) == 2

    # Search
    search_res = engine.search_index("cloud")
    assert len(search_res) == 1
    assert search_res[0]["source_id"] == "T-2026-001"

    # Get by ID
    item = engine.get_by_id("T-2026-002")
    assert item is not None
    assert item["title"] == "Office Furniture Supply"

    # Compute SHA-256
    sha = engine.compute_sha256(csv_data.encode("utf-8"))
    assert len(sha) == 64
