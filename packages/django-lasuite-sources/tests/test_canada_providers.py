"""Tests for Canadian Federal sovereign source providers."""

import pytest
from lasuite_sources.providers.canada import (
    CanadaBuysSourceProvider,
    CanadaGrantsSourceProvider,
    CorporationsCanadaSourceProvider,
    GeoNamesCanadaSourceProvider,
    JusticeLawsSourceProvider,
    OpenCanadaSourceProvider,
    ParliamentCanadaSourceProvider,
    StatCanSourceProvider,
)


def test_justice_laws_provider():
    """Verify Justice Laws Canada provider search, suggest and get_detail."""
    provider = JusticeLawsSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "canlaw"

    # Search PIPEDA
    results = provider.search("pipeda")
    assert len(results) >= 1
    assert "PIPEDA" in results[0]["title"]
    assert results[0]["display_mode"] == "callout"

    # Suggest
    suggestions = provider.suggest("access")
    assert len(suggestions) >= 1

    # Detail
    detail = provider.get_detail("CAN-STAT-PIPEDA")
    assert detail is not None
    assert detail["source_id"] == "CAN-STAT-PIPEDA"


def test_corporations_canada_provider():
    """Verify Corporations Canada provider."""
    provider = CorporationsCanadaSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "corporation_ca"

    results = provider.search("shared services")
    assert len(results) >= 1
    assert "Shared Services" in results[0]["title"]


def test_parliament_canada_provider():
    """Verify Parliament of Canada / LEGISinfo provider."""
    provider = ParliamentCanadaSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "parliament_ca"

    results = provider.search("c-27")
    assert len(results) >= 1
    assert "Bill C-27" in results[0]["title"]


def test_statcan_provider():
    """Verify Statistics Canada / StatCan provider."""
    provider = StatCanSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "statcan"

    results = provider.search("cpi")
    assert len(results) >= 1
    assert "CPI" in results[0]["title"]


def test_opencanada_provider():
    """Verify Open Government Canada provider."""
    provider = OpenCanadaSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "opencanada"

    results = provider.search("road")
    assert len(results) >= 1
    assert "National Road Network" in results[0]["title"]


def test_canadabuys_grants_geonames_providers():
    """Verify CanadaBuys, Canada Grants and GeoNames providers."""
    canadabuys = CanadaBuysSourceProvider()
    assert canadabuys.source_type == "canadabuys"
    assert len(canadabuys.search("cloud")) >= 1

    grants = CanadaGrantsSourceProvider()
    assert grants.source_type == "grant_ca"
    assert len(grants.search("clean energy")) >= 1

    geonames = GeoNamesCanadaSourceProvider()
    assert geonames.source_type == "geonames_ca"
    assert len(geonames.search("ottawa")) >= 1
