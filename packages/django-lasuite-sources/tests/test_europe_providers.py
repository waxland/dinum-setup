"""Tests for European Union sovereign source providers."""

import pytest

from lasuite_sources.providers.europe import (
    CordisSourceProvider,
    CuriaSourceProvider,
    DataEuropaSourceProvider,
    EurLexSourceProvider,
    EuroparlSourceProvider,
    EurostatSourceProvider,
    FundingTendersSourceProvider,
    TedSourceProvider,
    WhoiswhoSourceProvider,
)


def test_eurlex_provider():
    """Verify EUR-Lex provider search, suggest and get_detail."""
    provider = EurLexSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "eurlex"

    # Search GDPR
    results = provider.search("gdpr")
    assert len(results) >= 1
    assert "2016/679" in results[0]["title"]
    assert results[0]["display_mode"] == "callout"

    # Suggest
    suggestions = provider.suggest("ai")
    assert len(suggestions) >= 1

    # Detail
    detail = provider.get_detail("CELEX-32016R0679")
    assert detail is not None
    assert detail["source_id"] == "CELEX-32016R0679"


def test_europarl_provider():
    """Verify European Parliament provider."""
    provider = EuroparlSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "europarl"

    results = provider.search("resolution")
    assert len(results) >= 1
    assert "Resolution" in results[0]["title"]


def test_ted_provider():
    """Verify TED eProcurement provider."""
    provider = TedSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "ted"

    results = provider.search("cloud")
    assert len(results) >= 1
    assert "Cloud" in results[0]["title"]


def test_eurostat_provider():
    """Verify Eurostat statistics provider."""
    provider = EurostatSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "eurostat"

    results = provider.search("inflation")
    assert len(results) >= 1
    assert "HICP" in results[0]["title"]


def test_funding_tenders_provider():
    """Verify EU Funding & Tenders provider."""
    provider = FundingTendersSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "funding"

    results = provider.search("horizon")
    assert len(results) >= 1
    assert "Horizon Europe" in results[0]["title"]


def test_dataeuropa_provider():
    """Verify data.europa.eu Open Data provider."""
    provider = DataEuropaSourceProvider()
    assert provider.is_enabled()
    assert provider.source_type == "dataeuropa"

    results = provider.search("nuts")
    assert len(results) >= 1
    assert "NUTS" in results[0]["title"]


def test_whoiswho_cordis_curia_providers():
    """Verify Whoiswho, CORDIS and CURIA providers."""
    whoiswho = WhoiswhoSourceProvider()
    assert whoiswho.source_type == "whoiswho"
    assert len(whoiswho.search("commission")) >= 1

    cordis = CordisSourceProvider()
    assert cordis.source_type == "cordis"
    assert len(cordis.search("sovereign")) >= 1

    curia = CuriaSourceProvider()
    assert curia.source_type == "curia"
    assert len(curia.search("gdpr")) >= 1
