"""URL routing for sovereign sources endpoints."""

from django.urls import path

from lasuite_sources import views
from lasuite_sources.health import HealthcheckView
from lasuite_sources.openapi import OpenAPIView

urlpatterns = [
    path("health/", HealthcheckView.as_view(), name="healthcheck"),
    path("openapi.json", OpenAPIView.as_view(), name="openapi-schema"),
    path("sources/search/", views.SourceSearchView.as_view(), name="source-search"),
    path("sources/suggest/", views.SourceSuggestView.as_view(), name="source-suggest"),
    path("sources/status/", views.SourceStatusView.as_view(), name="source-status"),
    path(
        "sources/<str:source_type>/<str:source_id>/",
        views.SourceDetailView.as_view(),
        name="source-detail",
    ),
]
