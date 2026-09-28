"""Automated test validating that providers_backlog.json matches all non-connected providers in source_registry (R-04.05)."""

import json
import os

import pytest

from lasuite_sources.registry import source_registry


def test_providers_backlog_matches_unconnected_providers():
    """Verify providers_backlog.json exists and lists every non-connected provider (R-04.05)."""
    backlog_path = os.path.join(
        os.path.dirname(__file__), "..", "docs", "providers_backlog.json"
    )
    assert os.path.exists(backlog_path), (
        "providers_backlog.json file MUST exist in docs/"
    )

    inventory_path = os.path.join(
        os.path.dirname(__file__), "..", "docs", "providers_inventory.json"
    )
    assert os.path.exists(inventory_path), (
        "providers_inventory.json file MUST exist in docs/"
    )

    with open(backlog_path, "r", encoding="utf-8") as f:
        backlog_data = json.load(f)

    with open(inventory_path, "r", encoding="utf-8") as f:
        inventory_data = json.load(f)

    assert "version" in backlog_data
    assert "backlog" in backlog_data
    backlog_list = backlog_data["backlog"]

    # Filter non-connected providers from inventory
    non_connected_ids = {
        p["id"] for p in inventory_data["providers"] if p["mode"] != "connected"
    }
    backlog_ids = {p["id"] for p in backlog_list}

    assert backlog_ids == non_connected_ids, (
        f"Mismatch between non-connected inventory and backlog: diff={non_connected_ids ^ backlog_ids}"
    )

    # Verify mandatory fields on each backlog item
    required_fields = {
        "id",
        "name",
        "class_name",
        "country",
        "category",
        "official_endpoint",
        "authentication",
        "prerequisites",
        "contract_type",
        "honest_status",
        "verification_recipe",
        "test_suite",
    }

    for item in backlog_list:
        p_id = item["id"]
        assert required_fields.issubset(item.keys()), (
            f"Backlog item '{p_id}' missing required fields: {required_fields - set(item.keys())}"
        )

        # Verify honest_status is valid
        assert item["honest_status"] in {
            "demo_only",
            "disabled",
        }, f"Invalid honest_status for '{p_id}': {item['honest_status']}"

        # Verify prerequisites and recipe are non-empty strings/lists
        assert len(item["prerequisites"]) > 0, f"Prerequisites empty for '{p_id}'"
        assert len(item["verification_recipe"]) > 0, (
            f"Verification recipe empty for '{p_id}'"
        )
        assert len(item["contract_type"]) > 0, f"Contract type empty for '{p_id}'"

        # Verify provider in registry is maintained in honest mode
        provider_instance = source_registry.get_provider(p_id)
        assert provider_instance is not None
        # Unconfigured live provider MUST NOT claim to be connected live
        if not provider_instance.is_enabled():
            assert item["honest_status"] in {"demo_only", "disabled"}
