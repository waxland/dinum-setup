from django.http import HttpResponse
from django.test import RequestFactory

import pytest

from lasuite_sources.middleware import SlasherCorsMiddleware


def dummy_get_response(request):
    return HttpResponse("OK")


@pytest.fixture
def middleware():
    return SlasherCorsMiddleware(dummy_get_response)


@pytest.fixture
def factory():
    return RequestFactory()


def test_cors_options_preflight_allowed(middleware, factory, settings):
    settings.LASUITE_SOURCES_CORS_ORIGINS = (
        "http://localhost:3000, http://localhost:5173"
    )
    request = factory.options(
        "/api/v1/sources/search/", HTTP_ORIGIN="http://localhost:5173"
    )

    response = middleware(request)

    assert response.status_code == 200
    assert response["Access-Control-Allow-Origin"] == "http://localhost:5173"
    assert response["Access-Control-Allow-Methods"] == "GET, OPTIONS"


def test_cors_get_allowed(middleware, factory, settings):
    settings.LASUITE_SOURCES_CORS_ORIGINS = "http://localhost:3000"
    request = factory.get(
        "/api/v1/sources/search/", HTTP_ORIGIN="http://localhost:3000"
    )

    response = middleware(request)

    assert response.status_code == 200
    assert response["Access-Control-Allow-Origin"] == "http://localhost:3000"


def test_cors_origin_not_allowed(middleware, factory, settings):
    settings.LASUITE_SOURCES_CORS_ORIGINS = "http://localhost:3000"
    request = factory.options(
        "/api/v1/sources/search/", HTTP_ORIGIN="http://malicious.com"
    )

    response = middleware(request)

    assert "Access-Control-Allow-Origin" not in response


def test_cors_wildcard(middleware, factory, settings):
    settings.LASUITE_SOURCES_CORS_ORIGINS = "*"
    request = factory.options(
        "/api/v1/sources/search/", HTTP_ORIGIN="http://anywhere.com"
    )

    response = middleware(request)

    assert response["Access-Control-Allow-Origin"] == "http://anywhere.com"


def test_cors_not_api_path(middleware, factory, settings):
    settings.LASUITE_SOURCES_CORS_ORIGINS = "http://localhost:3000"
    request = factory.options("/other/path/", HTTP_ORIGIN="http://localhost:3000")

    response = middleware(request)

    assert "Access-Control-Allow-Origin" not in response
