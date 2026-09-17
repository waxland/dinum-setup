"""Pytest test setup and standalone Django test settings for lasuite_sources."""

import django
from django.conf import settings

def pytest_configure():
    settings.configure(
        DEBUG=True,
        DATABASES={
            "default": {
                "ENGINE": "django.db.backends.sqlite3",
                "NAME": ":memory:",
            }
        },
        INSTALLED_APPS=[
            "django.contrib.auth",
            "django.contrib.contenttypes",
            "rest_framework",
            "lasuite_sources",
        ],
        ROOT_URLCONF="lasuite_sources.urls",
        CACHES={
            "default": {
                "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            }
        },
        SECRET_KEY="test-secret-key-for-lasuite-sources",
        ALLOWED_HOSTS=["*"],
    )
    django.setup()
