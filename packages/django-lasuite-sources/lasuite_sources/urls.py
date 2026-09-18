"""URL routing for sovereign sources endpoints."""

from django.urls import path

from lasuite_sources import views

urlpatterns = [
    path("sources/search/", views.SourceSearchView.as_view(), name="source-search"),
    path("sources/suggest/", views.SourceSuggestView.as_view(), name="source-suggest"),
    path("sources/status/", views.SourceStatusView.as_view(), name="source-status"),
    path(
        "sources/<str:source_type>/<str:source_id>/",
        views.SourceDetailView.as_view(),
        name="source-detail",
    ),
]
