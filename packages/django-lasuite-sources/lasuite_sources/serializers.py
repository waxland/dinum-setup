"""Bound and validate public API inputs before invoking any connector."""

from rest_framework import serializers

from lasuite_sources.registry import source_registry


class SearchParameters(serializers.Serializer):
    """Search limits are independent of the dynamically installed providers."""

    type = serializers.CharField(default="law", max_length=100)
    q = serializers.CharField(default="", allow_blank=True, max_length=500)
    limit = serializers.IntegerField(default=10, min_value=1, max_value=50)

    def validate_type(self, value: str) -> str:
        """Reject unknown identifiers without conflating disabled providers."""
        if not source_registry.is_registered(value):
            raise serializers.ValidationError(
                "Unknown provider.", code="unknown_provider"
            )
        return value


class SuggestParameters(SearchParameters):
    """Autocomplete has a smaller result budget than full search."""

    limit = serializers.IntegerField(default=5, min_value=1, max_value=20)
