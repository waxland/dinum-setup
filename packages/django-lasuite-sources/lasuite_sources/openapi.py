import os

from django.conf import settings
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

import yaml

from lasuite_sources.registry import source_registry


class OpenAPIView(APIView):
    """
    Dynamically generates the OpenAPI specification for the available endpoints,
    merging the static openapi.yaml with dynamic provider schema.
    """

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        openapi_path = os.path.join(base_dir, "docs", "openapi.yaml")

        try:
            with open(openapi_path, "r", encoding="utf-8") as f:
                spec = yaml.safe_load(f)
        except FileNotFoundError:
            return Response({"error": "Base OpenAPI schema not found"}, status=500)

        # Enrich spec with registered providers
        enabled_types = source_registry.list_enabled_types()

        if "components" not in spec:
            spec["components"] = {}
        if "schemas" not in spec["components"]:
            spec["components"]["schemas"] = {}

        # Add Enum for available source types dynamically
        spec["components"]["schemas"]["SourceType"] = {
            "type": "string",
            "enum": list(enabled_types),
            "description": "Available source provider types",
        }

        # Override the parameter definition
        if "parameters" not in spec["components"]:
            spec["components"]["parameters"] = {}

        spec["components"]["parameters"]["SourceTypeParam"] = {
            "name": "type",
            "in": "query",
            "required": True,
            "schema": {"$ref": "#/components/schemas/SourceType"},
            "description": "The category of the source to query",
        }

        # Add provider quotas information in info description
        info_append = "\n\n## Available Providers\n\n"
        for st in enabled_types:
            provider = source_registry.get_provider(st)
            if provider:
                info_append += f"- **{provider.name}** (`{st}`)\n"

        spec["info"]["description"] = spec["info"].get("description", "") + info_append

        return Response(spec)
