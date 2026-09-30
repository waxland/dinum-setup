from unittest.mock import patch

from django.urls import reverse
from rest_framework.test import APIClient

import pytest


@pytest.mark.django_db
def test_healthcheck_all_up():
    client = APIClient()
    url = reverse("healthcheck")

    with (
        patch("lasuite_sources.health.HealthcheckView._check_db", return_value=True),
        patch("lasuite_sources.health.HealthcheckView._check_redis", return_value=True),
        patch("lasuite_sources.health.HealthcheckView._check_dns", return_value=True),
    ):
        response = client.get(url)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert data["checks"]["database"] == "up"
        assert data["checks"]["redis"] == "up"
        assert data["checks"]["dns"] == "up"
        assert "law" in data["providers_circuit_status"]


@pytest.mark.django_db
def test_healthcheck_redis_down():
    client = APIClient()
    url = reverse("healthcheck")

    with (
        patch("lasuite_sources.health.HealthcheckView._check_db", return_value=True),
        patch(
            "lasuite_sources.health.HealthcheckView._check_redis", return_value=False
        ),
        patch("lasuite_sources.health.HealthcheckView._check_dns", return_value=True),
    ):
        response = client.get(url)
        assert response.status_code == 503
        data = response.json()
        assert data["status"] == "degraded"
        assert data["checks"]["redis"] == "down"
