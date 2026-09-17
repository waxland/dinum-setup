"""URL routing for standalone demo of django-lasuite-sources."""

from django.urls import include, path

urlpatterns = [
    path("api/v1.0/sources/", include("lasuite_sources.urls")),
]
