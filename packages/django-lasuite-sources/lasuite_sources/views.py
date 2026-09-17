"""API views for sovereign source search, autocomplete, and details."""

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from lasuite_sources.registry import source_registry


class SourceSearchView(APIView):
    """
    Search endpoint across sovereign source providers.
    GET /api/v1.0/sources/search/?type=law&q=commande+publique&limit=10
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        source_type = request.query_params.get("type", "law")
        query = request.query_params.get("q", "")
        limit_str = request.query_params.get("limit", "10")

        try:
            limit = int(limit_str)
        except ValueError:
            limit = 10

        results = source_registry.search_with_cache(
            source_type=source_type,  # type: ignore[arg-type]
            query=query,
            limit=limit,
        )
        return Response(
            {
                "type": source_type,
                "query": query,
                "count": len(results),
                "results": results,
            },
            status=status.HTTP_200_OK,
        )


class SourceSuggestView(APIView):
    """
    Fast autocomplete endpoint (< 100ms).
    GET /api/v1.0/sources/suggest/?type=law&q=art
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        source_type = request.query_params.get("type", "law")
        query = request.query_params.get("q", "")
        limit_str = request.query_params.get("limit", "5")

        try:
            limit = int(limit_str)
        except ValueError:
            limit = 5

        suggestions = source_registry.suggest_with_cache(
            source_type=source_type,  # type: ignore[arg-type]
            query=query,
            limit=limit,
        )
        return Response(
            {
                "type": source_type,
                "query": query,
                "suggestions": suggestions,
            },
            status=status.HTTP_200_OK,
        )


class SourceDetailView(APIView):
    """
    Retrieve full verified details for a specific source ID.
    GET /api/v1.0/sources/<type>/<source_id>/
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, source_type: str, source_id: str):
        provider = source_registry.get_provider(source_type)  # type: ignore[arg-type]
        if not provider:
            return Response(
                {"detail": f"Provider '{source_type}' not found or disabled."},
                status=status.HTTP_404_NOT_FOUND,
            )

        detail = provider.get_detail(source_id)
        if not detail:
            return Response(
                {"detail": f"Source entity '{source_id}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(detail, status=status.HTTP_200_OK)
