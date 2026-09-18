"""A demonstration, failed lookup, or unknown status cannot certify a law."""

from unittest.mock import Mock

from django.core.cache import cache

import pytest

from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.registry import source_registry
from lasuite_sources.tasks import check_laws_validity_task

SOURCE_ID = "LEGIARTI000037812976"


@pytest.mark.parametrize(
    "detail",
    [
        None,
        {"origin": "demo", "status": "En vigueur"},
        {"origin": "upstream", "status": "En vigueur"},
        {"origin": "upstream", "status": "inconnu", "verified_at": "2026-09-18"},
    ],
)
def test_unverified_data_remains_unknown(monkeypatch, detail):
    lookup = Mock(return_value=detail)
    monkeypatch.setattr(source_registry, "detail_with_cache", lookup)
    result = check_laws_validity_task([{"content": SOURCE_ID}])
    lookup.assert_called_once_with("law", SOURCE_ID)
    assert result["unknown_laws_count"] == 1
    record = cache.get(f"law:validity:{SOURCE_ID}")
    assert record["is_abrogated"] is None
    assert record["checked_at"] is None


def test_failed_lookup_remains_unknown(monkeypatch):
    monkeypatch.setattr(
        source_registry, "detail_with_cache", Mock(side_effect=SourceUnavailable())
    )
    assert check_laws_validity_task([{"content": SOURCE_ID}])["unknown_laws_count"] == 1


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
    record = cache.get(f"law:validity:{SOURCE_ID}")
    assert record["is_abrogated"] is abrogated
    assert record["checked_at"] == "2026-09-01T12:00:00Z"
