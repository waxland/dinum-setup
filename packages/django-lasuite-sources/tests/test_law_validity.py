"""A demonstration, failed lookup, or unknown status cannot certify a law."""

from unittest.mock import Mock

from django.core.cache import cache

import pytest

from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.registry import source_registry
from lasuite_sources.tasks import check_laws_validity_task

SOURCE_ID = "LEGIARTI000037812976"


@pytest.mark.parametrize(
    ("detail", "expected_reason"),
    [
        (None, "data_missing"),
        ({"origin": "demo", "status": "En vigueur"}, "demo"),
        ({"origin": "upstream", "status": "En vigueur"}, "unverified_data"),
        (
            {"origin": "upstream", "status": "inconnu", "verified_at": "2026-09-18"},
            "unverified_data",
        ),
    ],
)
def test_unverified_data_remains_unknown(monkeypatch, detail, expected_reason):
    lookup = Mock(return_value=detail)
    monkeypatch.setattr(source_registry, "detail_with_cache", lookup)
    result = check_laws_validity_task([{"content": SOURCE_ID}])
    lookup.assert_called_once_with("law", SOURCE_ID)
    assert result["unknown_laws_count"] == 1
    assert result["reasons_breakdown"][expected_reason] == 1
    record = cache.get(f"law:validity:{SOURCE_ID}")
    assert record["is_abrogated"] is None
    assert record["checked_at"] is None
    assert record["reason"] == expected_reason


def test_failed_lookup_remains_unknown_with_provider_outage_reason(monkeypatch):
    monkeypatch.setattr(
        source_registry, "detail_with_cache", Mock(side_effect=SourceUnavailable())
    )
    result = check_laws_validity_task([{"content": SOURCE_ID}])
    assert result["unknown_laws_count"] == 1
    assert result["reasons_breakdown"]["provider_outage"] == 1
    record = cache.get(f"law:validity:{SOURCE_ID}")
    assert record["is_abrogated"] is None
    assert record["checked_at"] is None
    assert record["reason"] == "provider_outage"


def test_disabled_provider_logs_provider_disabled_reason(monkeypatch):
    monkeypatch.setattr(source_registry, "get_provider", Mock(return_value=None))
    result = check_laws_validity_task([{"content": SOURCE_ID}])
    assert result["unknown_laws_count"] == 1
    assert result["reasons_breakdown"]["provider_disabled"] == 1
    record = cache.get(f"law:validity:{SOURCE_ID}")
    assert record["is_abrogated"] is None
    assert record["checked_at"] is None
    assert record["reason"] == "provider_disabled"


@pytest.mark.parametrize(
    ("status", "abrogated"), [("ABROGE", True), ("En vigueur", False)]
)
def test_explicit_upstream_verification_preserves_timestamp(
    monkeypatch, status, abrogated
):
    monkeypatch.setattr(
        source_registry,
        "detail_with_cache",
        Mock(
            return_value={
                "origin": "upstream",
                "status": status,
                "verified_at": "2026-09-01T12:00:00Z",
            }
        ),
    )
    result = check_laws_validity_task([{"content": SOURCE_ID}])
    assert result["unknown_laws_count"] == 0
    assert result["reasons_breakdown"]["verified"] == 1
    record = cache.get(f"law:validity:{SOURCE_ID}")
    assert record["is_abrogated"] is abrogated
    assert record["checked_at"] == "2026-09-01T12:00:00Z"
    assert record["reason"] == "verified"
