"""Automated test validating that providers_inventory.json matches all registered providers in source_registry (R-04.01)."""

import json
import os

import pytest

from lasuite_sources.registry import source_registry


def test_providers_inventory_matches_registered_providers():
    """Verify providers_inventory.json exists and strictly matches source_registry (R-04.01)."""
    inventory_path = os.path.join(
        os.path.dirname(__file__), "..", "docs", "providers_inventory.json"
    )
    assert os.path.exists(inventory_path), (
        "providers_inventory.json file MUST exist in docs/"
    )

    with open(inventory_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert "version" in data
    assert "providers" in data
    providers_list = data["providers"]

    # Verify total count matches built-in registered providers in source_registry (53 connectors)
    registry_keys = {
        p_id
        for p_id, p_inst in source_registry._providers.items()
        if p_inst.__class__.__module__.startswith("lasuite_sources.providers.")
    }
    inventory_keys = {p["id"] for p in providers_list}

    assert inventory_keys == registry_keys, (
        f"Mismatch between source_registry and inventory: diff={registry_keys ^ inventory_keys}"
    )

    # Verify mandatory fields on each inventory item
    required_fields = {
        "id",
        "name",
        "class_name",
        "country",
        "category",
        "mode",
        "official_endpoint",
        "authentication",
        "provenance_license",
        "capabilities",
        "test_suite",
    }

    for item in providers_list:
        p_id = item["id"]
        assert required_fields.issubset(item.keys()), (
            f"Provider '{p_id}' missing required fields: {required_fields - set(item.keys())}"
        )

        # Verify provider instance matches class_name
        provider_instance = source_registry.get_provider(p_id)
        assert provider_instance is not None, f"Provider '{p_id}' not found in registry"
        assert provider_instance.__class__.__name__ == item["class_name"], (
            f"Class mismatch for '{p_id}': {provider_instance.__class__.__name__} vs {item['class_name']}"
        )

        # Verify capabilities
        caps = item["capabilities"]
        assert caps["search"] is True
        assert caps["suggest"] is True
        assert caps["detail"] is True

        # Verify mode is one of the valid modes
        valid_modes = {"connected", "local_index", "demo_only", "disabled"}
        assert item["mode"] in valid_modes, (
            f"Invalid mode '{item['mode']}' for '{p_id}'"
        )

        # BAN address is the active connected provider
        if p_id == "address":
            assert item["mode"] == "connected"
        else:
            assert item["mode"] in {"demo_only", "local_index", "disabled"}
