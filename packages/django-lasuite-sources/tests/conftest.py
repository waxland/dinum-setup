"""Pytest test setup and standalone Django test settings for lasuite_sources."""

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
SECRET_KEY = "test-secret-key-for-lasuite-sources"
ALLOWED_HOSTS = ["*"]
USE_TZ = True



