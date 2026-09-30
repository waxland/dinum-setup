from unittest.mock import MagicMock, patch

import pytest

from lasuite_sources.providers.europe.eurlex import EurLexSourceProvider


@pytest.fixture
def provider():
    p = EurLexSourceProvider()
    p.mock_mode = False
    return p


@patch("lasuite_sources.providers.europe.eurlex.get_json")
def test_eurlex_search_sparql(mock_get_json, provider):
    mock_get_json.return_value = {
        "results": {
            "bindings": [
                {
                    "celex": {"value": "32016R0679"},
                    "title": {"value": "General Data Protection Regulation"},
                    "work": {
                        "value": "http://publications.europa.eu/resource/celex/32016R0679"
                    },
                }
            ]
        }
    }

    results = provider.search("GDPR", limit=1)

    assert len(results) == 1
    assert results[0]["source_id"] == "CELEX-32016R0679"
    assert results[0]["title"] == "General Data Protection Regulation"

    mock_get_json.assert_called_once()
    args, kwargs = mock_get_json.call_args
    assert args[0] == "https://publications.europa.eu/webapi/rdf/sparql"
    assert "query" in kwargs["params"]
    assert "format" in kwargs["params"]
    assert "GDPR" in kwargs["params"]["query"]


@patch("lasuite_sources.providers.europe.eurlex.get_json")
def test_eurlex_get_detail_sparql(mock_get_json, provider):
    mock_get_json.return_value = {
        "results": {
            "bindings": [
                {
                    "celex": {"value": "32016R0679"},
                    "title": {"value": "General Data Protection Regulation"},
                    "work": {
                        "value": "http://publications.europa.eu/resource/celex/32016R0679"
                    },
                }
            ]
        }
    }

    result = provider.get_detail("CELEX-32016R0679")

    assert result is not None
    assert result["source_id"] == "CELEX-32016R0679"
    assert result["title"] == "General Data Protection Regulation"

    mock_get_json.assert_called_once()
    args, kwargs = mock_get_json.call_args
    assert "32016R0679" in kwargs["params"]["query"]
