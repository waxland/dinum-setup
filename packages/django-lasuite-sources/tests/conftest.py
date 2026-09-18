"""Pytest test setup and standalone Django test settings for lasuite_sources."""

import secrets

from django.core.cache import cache

import pytest

DEBUG = True
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    }
}
INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "rest_framework",
    "lasuite_sources",
]
MIDDLEWARE = [
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
]
ROOT_URLCONF = "lasuite_sources.urls"
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    }
}
SECRET_KEY = secrets.token_urlsafe(32)
ALLOWED_HOSTS = ["*"]
USE_TZ = True
LASUITE_SOURCES_DEMO = True


@pytest.fixture(autouse=True)
def isolated_local_cache(settings):
    """Unit tests explicitly opt into the process-local quota implementation."""
    settings.DEBUG = True
    cache.clear()
    yield
    cache.clear()
