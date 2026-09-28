"""Automated validation of Django endpoints against the OpenAPI 3.0 specification."""

from pathlib import Path
from unittest.mock import Mock

from django.contrib.auth.models import User
from rest_framework.test import APIClient

import pytest
import yaml

from lasuite_sources.errors import SourceRateLimited, SourceUnavailable

pytestmark = pytest.mark.django_db


@pytest.fixture(scope="module")
def openapi_spec():
    spec_path = Path(__file__).resolve().parent.parent / "docs" / "openapi.yaml"
    assert spec_path.exists(), f"OpenAPI spec not found at {spec_path}"
    with open(spec_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def _resolve_schema(schema, spec_components):
    if "$ref" in schema:
        ref_name = schema["$ref"].split("/")[-1]
        return spec_components["schemas"][ref_name]
    return schema


def _validate_scalar(key, val, prop_schema):
    expected_type = prop_schema.get("type")
    if val is None:
        assert prop_schema.get("nullable", False) or "null" in prop_schema.get(
            "enum", []
        ), f"Field '{key}' is None but not nullable in schema"
    elif expected_type == "string":
        assert isinstance(val, str), f"Field '{key}' expected str, got {type(val)}"
        if "enum" in prop_schema:
            valid_enums = [e for e in prop_schema["enum"] if e is not None]
            assert val in valid_enums, (
                f"Field '{key}' value '{val}' not in {valid_enums}"
            )
    elif expected_type == "integer":
        assert isinstance(val, int) and not isinstance(val, bool), (
            f"Field '{key}' expected int"
        )
    elif expected_type == "boolean":
        assert isinstance(val, bool), f"Field '{key}' expected bool"


def _validate_schema_fields(data, schema, spec_components):
    """Recursively validate object keys against OpenAPI schema."""
    schema = _resolve_schema(schema, spec_components)

    if schema.get("type") == "object":
        assert isinstance(data, dict), f"Expected dict, got {type(data)}"
        for required_key in schema.get("required", []):
            assert required_key in data, f"Missing required key '{required_key}'"

        properties = schema.get("properties", {})
        for key, val in data.items():
            if key not in properties:
                continue
            prop_schema = _resolve_schema(properties[key], spec_components)
            if prop_schema.get("type") == "array" and isinstance(val, list):
                item_schema = prop_schema.get("items", {})
                for item in val:
                    _validate_schema_fields(item, item_schema, spec_components)
            elif prop_schema.get("type") == "object" and isinstance(val, dict):
                _validate_schema_fields(val, prop_schema, spec_components)
            else:
                _validate_scalar(key, val, prop_schema)

    elif schema.get("type") == "array":
        assert isinstance(data, list)
        item_schema = schema.get("items", {})
        for item in data:
            _validate_schema_fields(item, item_schema, spec_components)


def test_openapi_search_endpoint_contract(openapi_spec):
    """GET /sources/search/ response conforms to OpenAPI 200 schema."""
    client = APIClient()
    user = User.objects.create_user(username="agent.openapi.search")
    client.force_authenticate(user=user)

    # 1. Non-empty results
    resp = client.get("/sources/search/?type=law&q=commande")
    assert resp.status_code == 200
    data = resp.json()
    search_schema = openapi_spec["paths"]["/search/"]["get"]["responses"]["200"][
        "content"
    ]["application/json"]["schema"]
    _validate_schema_fields(data, search_schema, openapi_spec["components"])
    assert len(data["results"]) > 0

    # 2. Empty results
    resp_empty = client.get("/sources/search/?type=law&q=unmatched_query_12345_xyz")
    assert resp_empty.status_code == 200
    data_empty = resp_empty.json()
    _validate_schema_fields(data_empty, search_schema, openapi_spec["components"])
    assert len(data_empty["results"]) == 0


def test_openapi_suggest_endpoint_contract(openapi_spec):
    """GET /sources/suggest/ response conforms to OpenAPI 200 schema."""
    client = APIClient()
    user = User.objects.create_user(username="agent.openapi.suggest")
    client.force_authenticate(user=user)

    resp = client.get("/sources/suggest/?type=law&q=art")
    assert resp.status_code == 200
    data = resp.json()
    suggest_schema = openapi_spec["paths"]["/suggest/"]["get"]["responses"]["200"][
        "content"
    ]["application/json"]["schema"]
    _validate_schema_fields(data, suggest_schema, openapi_spec["components"])
    assert len(data["suggestions"]) > 0


def test_openapi_detail_endpoint_contract(openapi_spec):
    """GET /sources/<type>/<source_id>/ response conforms to OpenAPI schemas (200, 400, 404)."""
    client = APIClient()
    user = User.objects.create_user(username="agent.openapi.detail")
    client.force_authenticate(user=user)

    # 200 Success
    resp = client.get("/sources/law/LEGIARTI000037812976/")
    assert resp.status_code == 200
    detail_schema = openapi_spec["paths"]["/{source_type}/{source_id}/"]["get"][
        "responses"
    ]["200"]["content"]["application/json"]["schema"]
    _validate_schema_fields(resp.json(), detail_schema, openapi_spec["components"])

    # 404 Not Found
    resp_404 = client.get("/sources/law/NON_EXISTENT_ID/")
    assert resp_404.status_code == 404

    # 400 Invalid ID (exceeding length limit)
    resp_400 = client.get(f"/sources/law/{'x' * 257}/")
    assert resp_400.status_code == 400
    assert resp_400.json().get("code") == "invalid_source_id"


def test_openapi_status_endpoint_contract(openapi_spec):
    """GET /sources/status/ response conforms to OpenAPI 200 schema."""
    client = APIClient()
    user = User.objects.create_user(username="agent.openapi.status")
    client.force_authenticate(user=user)

    resp = client.get("/sources/status/")
    assert resp.status_code == 200
    data = resp.json()
    status_schema = openapi_spec["paths"]["/status/"]["get"]["responses"]["200"][
        "content"
    ]["application/json"]["schema"]
    _validate_schema_fields(data, status_schema, openapi_spec["components"])


def test_openapi_error_responses_contract(openapi_spec, monkeypatch):
    """Error codes and status codes conform to OpenAPI error definitions (400, 401, 429, 503)."""
    # 401 Unauthorized
    anon_client = APIClient()
    assert anon_client.get("/sources/search/?type=law").status_code in (401, 403)

    client = APIClient()
    user = User.objects.create_user(username="agent.openapi.errors")
    client.force_authenticate(user=user)

    # 400 Invalid query parameter
    resp_400 = client.get("/sources/search/?type=unknown_unregistered_type")
    assert resp_400.status_code == 400

    # 429 Rate limited
    monkeypatch.setattr(
        "lasuite_sources.registry.source_registry.search_with_cache",
        Mock(side_effect=SourceRateLimited()),
    )
    resp_429 = client.get("/sources/search/?type=law&q=test")
    assert resp_429.status_code == 429
    assert resp_429.headers.get("Retry-After") == "60"
    assert resp_429.json().get("code") == "rate_limited"

    # 503 Provider unavailable
    monkeypatch.setattr(
        "lasuite_sources.registry.source_registry.search_with_cache",
        Mock(side_effect=SourceUnavailable("Downstream API timeout")),
    )
    resp_503 = client.get("/sources/search/?type=law&q=test")
    assert resp_503.status_code == 503
    assert resp_503.json().get("code") == "provider_unavailable"
