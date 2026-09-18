"""API views for sovereign source search, autocomplete, and details."""

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from redis.exceptions import RedisError

from lasuite_sources.errors import SourceRateLimited, SourceUnavailable
from lasuite_sources.registry import source_registry
from lasuite_sources.serializers import SearchParameters, SuggestParameters

MAX_SOURCE_ID_LENGTH = 256


class SourceAPIView(APIView):
    """Expose controlled errors, never provider exception bodies."""

    def handle_exception(self, exc):
        if isinstance(exc, SourceRateLimited):
            return Response(
                {"code": "rate_limited"}, status=429, headers={"Retry-After": "60"}
            )
        if isinstance(exc, SourceUnavailable):
            return Response({"code": "provider_unavailable"}, status=503)
        if isinstance(exc, RedisError):
            return Response({"code": "quota_service_unavailable"}, status=503)
        return super().handle_exception(exc)


class SourceSearchView(SourceAPIView):
    """
    Search endpoint across sovereign source providers.
    GET /api/v1.0/sources/search/?type=law&q=commande+publique&limit=10
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        parameters = SearchParameters(data=request.query_params)
        parameters.is_valid(raise_exception=True)
        source_type = parameters.validated_data["type"]
        query = parameters.validated_data["q"]
        limit = parameters.validated_data["limit"]
        if source_registry.get_provider(source_type) is None:
            return Response({"code": "provider_unavailable"}, status=503)

        user_id = str(request.user.id) if request.user.is_authenticated else None
        results = source_registry.search_with_cache(
            source_type=source_type,  # type: ignore[arg-type]
            query=query,
            limit=limit,
            user_id=user_id,
        )
        health = source_registry.provider_health(source_type)
        return Response(
            {
                "type": source_type,
                "query": query,
                "count": len(results),
                "health": health,
                "results": results,
            },
            status=status.HTTP_200_OK,
        )


class SourceSuggestView(SourceAPIView):
    """
    Fast autocomplete endpoint (< 100ms).
    GET /api/v1.0/sources/suggest/?type=law&q=art
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        parameters = SuggestParameters(data=request.query_params)
        parameters.is_valid(raise_exception=True)
        source_type = parameters.validated_data["type"]
        query = parameters.validated_data["q"]
        limit = parameters.validated_data["limit"]
        if source_registry.get_provider(source_type) is None:
            return Response({"code": "provider_unavailable"}, status=503)

        user_id = str(request.user.id) if request.user.is_authenticated else None
        suggestions = source_registry.suggest_with_cache(
            source_type=source_type,  # type: ignore[arg-type]
            query=query,
            limit=limit,
            user_id=user_id,
        )
        health = source_registry.provider_health(source_type)
        return Response(
            {
                "type": source_type,
                "query": query,
                "health": health,
                "suggestions": suggestions,
            },
            status=status.HTTP_200_OK,
        )


class SourceDetailView(SourceAPIView):
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

        if len(source_id) > MAX_SOURCE_ID_LENGTH:
            return Response({"code": "invalid_source_id"}, status=400)
        detail = source_registry.detail_with_cache(
            source_type, source_id, str(request.user.pk)
        )
        if not detail:
            return Response(
                {"detail": f"Source entity '{source_id}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(detail, status=status.HTTP_200_OK)


class SourceStatusView(SourceAPIView):
    """
    Health check, circuit state, and quota telemetry endpoint.
    GET /api/v1.0/sources/status/
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        enabled_types = source_registry.list_enabled_types()
        statuses = {}
        for st in enabled_types:
            statuses[st] = source_registry.provider_health(st)

        return Response(
            {
                "providers": statuses,
                "count": len(statuses),
            },
            status=status.HTTP_200_OK,
        )
