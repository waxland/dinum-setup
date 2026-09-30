import os

from django.conf import settings
from django.http import HttpResponse


class SlasherCorsMiddleware:
    """
    Middleware to handle CORS for Slasher API endpoints.
    Allows configuration via LASUITE_SOURCES_CORS_ORIGINS setting or env var.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == "OPTIONS" and request.path.startswith("/api/v1/sources/"):
            response = HttpResponse()
            self._set_cors_headers(request, response)
            return response

        response = self.get_response(request)

        if request.path.startswith("/api/v1/sources/"):
            self._set_cors_headers(request, response)

        return response

    def _set_cors_headers(self, request, response):
        origin = request.headers.get("Origin")
        if not origin:
            return

        # Get allowed origins from settings or environment variable
        allowed_origins_str = getattr(
            settings,
            "LASUITE_SOURCES_CORS_ORIGINS",
            os.environ.get("LASUITE_SOURCES_CORS_ORIGINS", ""),
        )

        if not allowed_origins_str:
            return

        allowed_origins = [
            o.strip() for o in allowed_origins_str.split(",") if o.strip()
        ]

        if "*" in allowed_origins or origin in allowed_origins:
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
            response["Access-Control-Allow-Headers"] = (
                "Content-Type, Authorization, X-Correlation-ID"
            )
            response["Access-Control-Max-Age"] = "86400"
