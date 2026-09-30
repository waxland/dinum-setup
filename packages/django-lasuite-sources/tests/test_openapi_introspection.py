from django.urls import reverse
from rest_framework.test import APIClient

import pytest


@pytest.mark.django_db
def test_openapi_introspection_endpoint():
    client = APIClient()
    url = reverse("openapi-schema")
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()

    assert "openapi" in data
    assert "components" in data
    assert "SourceType" in data["components"]["schemas"]

    # Check that our active source types are present in the Enum
    enum_values = data["components"]["schemas"]["SourceType"]["enum"]
    assert "law" in enum_values

    # Check that the description is augmented
    assert "Available Providers" in data["info"]["description"]
