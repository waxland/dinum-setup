"""Tests for sovereign sources registry and standalone API views."""

from django.contrib.auth.models import User
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)
from rest_framework.test import APIClient

import pytest

from lasuite_sources.registry import source_registry
from lasuite_sources.tasks import check_laws_validity_task

pytestmark = pytest.mark.django_db


def test_source_registry_registration():
    """Verify built-in providers are auto-registered and aliases work."""
    enabled = source_registry.list_enabled_types()
    assert "law" in enabled
    assert "address" in enabled
    assert "company" in enabled
    assert "parliament" in enabled
    assert "procurement" in enabled
    assert "grant" in enabled
    assert "insee" in enabled
    assert "agent" in enabled
    assert "cadastre" in enabled
    assert "demarche" in enabled
    assert "opendata" in enabled
    assert "custom" in enabled

    # Test universal aliases
    assert source_registry.get_provider("statistics") is not None
    assert source_registry.get_provider("case-law") is not None
    assert source_registry.get_provider("place") is not None


def test_source_search_anonymous():
    """Anonymous users should not be allowed to search sources."""
    client = APIClient()
    response = client.get("/sources/search/?type=law&q=commande")
    assert response.status_code in (HTTP_401_UNAUTHORIZED, 403)


def test_source_search_authenticated():
    """Authenticated users can search sovereign providers."""
    client = APIClient()
    user = User.objects.create_user(username="agent.public", email="agent@gouv.fr")
    client.force_authenticate(user=user)

    # Search law provider
    response = client.get("/sources/search/?type=law&q=commande")

    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "law"
    assert len(data["results"]) > 0
    assert "Article L. 111-1" in data["results"][0]["title"]

    # Search address provider
    response = client.get("/sources/search/", {"type": "address", "q": "Ségur"})
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "address"
    assert len(data["results"]) > 0

    # Search company provider
    response = client.get("/sources/search/?type=company&q=dinum")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "company"
    assert len(data["results"]) > 0

    # Search parliament provider
    response = client.get("/sources/search/?type=parliament&q=souverainete")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "parliament"
    assert len(data["results"]) > 0

    # Search procurement provider
    response = client.get("/sources/search/?type=procurement&q=cloud")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "procurement"
    assert len(data["results"]) > 0

    # Search grant provider
    response = client.get("/sources/search/?type=grant&q=fonds+vert")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "grant"
    assert len(data["results"]) > 0


def test_source_search_other_authenticated_providers():
    """Additional demo providers filter using the submitted query."""
    client = APIClient()
    user = User.objects.create_user(username="agent.other")
    client.force_authenticate(user=user)

    # Search insee provider
    response = client.get("/sources/search/?type=insee&q=paris")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "insee"
    assert len(data["results"]) > 0

    # Search agent provider
    response = client.get("/sources/search/?type=agent&q=dinum")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "agent"
    assert len(data["results"]) > 0

    # Search cadastre provider
    response = client.get("/sources/search/?type=cadastre&q=segur")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "cadastre"
    assert len(data["results"]) > 0

    # Search demarche provider
    response = client.get("/sources/search/?type=demarche&q=habilitation")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "demarche"
    assert len(data["results"]) > 0

    # Search opendata provider
    response = client.get("/sources/search/?type=opendata&q=sirene")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "opendata"
    assert len(data["results"]) > 0

    # Search Albert RAG provider
    response = client.get("/sources/search/?type=custom&q=preavis")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["type"] == "custom"
    assert len(data["results"]) > 0


def test_source_suggest_endpoint():
    """Suggest endpoint returns fast autocomplete payload."""
    client = APIClient()
    user = User.objects.create_user(username="agent.suggest", email="suggest@gouv.fr")
    client.force_authenticate(user=user)

    response = client.get("/sources/suggest/?type=law&q=art")
    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert "suggestions" in data
    assert len(data["suggestions"]) > 0
    assert "id" in data["suggestions"][0]
    assert "title" in data["suggestions"][0]


def test_source_detail_endpoint():
    """Detail endpoint returns complete verified entity."""
    client = APIClient()
    user = User.objects.create_user(username="agent.detail", email="detail@gouv.fr")
    client.force_authenticate(user=user)

    response = client.get("/sources/law/LEGIARTI000037812976/")

    assert response.status_code == HTTP_200_OK
    data = response.json()
    assert data["source_id"] == "LEGIARTI000037812976"
    assert "Article L. 111-1" in data["title"]
    assert data["status"] == "Demonstration"
    assert data["origin"] == "demo"
    assert data["verified_at"] is None

    # Non-existent ID returns 404
    response_404 = client.get("/sources/law/UNKNOWN_ID/")
    assert response_404.status_code == HTTP_404_NOT_FOUND


def test_check_laws_validity_task():
    """Verify task scans document contents and checks law validity."""
    mock_docs = [
        {
            "id": "doc-01",
            "title": "Note de cadrage Marchés Publics",
            "content": "Vu l'article LEGIARTI000037812976 relatif au code de la commande publique.",
        }
    ]

    result = check_laws_validity_task(document_contents=mock_docs)
    assert result["status"] == "completed"
    assert result["scanned_documents"] == 1
    assert result["checked_laws_count"] >= 1
