from unittest.mock import MagicMock, patch

import pytest

from lasuite_sources.providers.france.opendatasoft import OpenDataSoftProvider


@pytest.fixture
def provider():
    return OpenDataSoftProvider()


@patch("lasuite_sources.providers.france.opendatasoft.get_json")
def test_ods_search(mock_get_json, provider):
    mock_get_json.return_value = {
        "records": [
            {
                "recordid": "12345",
                "fields": {
                    "title": "Dataset Test",
                    "publisher": "Gov",
                    "theme": "Education",
                    "license": "Open",
                },
            }
        ]
    }

    results = provider.search("Education", limit=1)

    assert len(results) == 1
    assert results[0]["source_id"] == "ODS-12345"
    assert results[0]["title"] == "Dataset Test"
    assert results[0]["meta1"] == "Education"

    mock_get_json.assert_called_once()
    args, kwargs = mock_get_json.call_args
    assert args[0] == "https://data.opendatasoft.com/api/records/1.0/search/"
    assert "q" in kwargs["params"]
    assert kwargs["params"]["q"] == "Education"


@patch("lasuite_sources.providers.france.opendatasoft.get_json")
def test_ods_get_detail(mock_get_json, provider):
    mock_get_json.return_value = {
        "records": [
            {
                "recordid": "12345",
                "fields": {
                    "title": "Dataset Test",
                    "publisher": "Gov",
                    "theme": "Education",
                    "license": "Open",
                },
            }
        ]
    }

    result = provider.get_detail("ODS-12345")

    assert result is not None
    assert result["source_id"] == "ODS-12345"
    assert result["title"] == "Dataset Test"

    mock_get_json.assert_called_once()
    args, kwargs = mock_get_json.call_args
    assert "12345" in kwargs["params"]["q"]
