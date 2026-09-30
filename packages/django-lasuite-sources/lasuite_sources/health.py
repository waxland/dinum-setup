import socket

from django.db import connections
from django.db.utils import OperationalError
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from lasuite_sources.registry import source_registry


class HealthcheckView(APIView):
    """
    Global aggregated healthcheck returning the operational status of Redis, Database
    and the DNS resolution.
    """

    permission_classes = [permissions.AllowAny]

    def _check_db(self):
        db_conn = connections["default"]
        try:
            db_conn.cursor()
        except OperationalError:
            return False
        return True

    def _check_redis(self):
        try:
            # Reusing the quota redis connection check
            from lasuite_sources.quota import DistributedQuotaManager

            mgr = DistributedQuotaManager()
            # Simple ping
            mgr.get_redis_client().ping()
            return True
        except Exception:
            return False

    def _check_dns(self):
        try:
            socket.gethostbyname("beta.gouv.fr")
            return True
        except Exception:
            return False

    def get(self, request):
        db_status = "up" if self._check_db() else "down"
        redis_status = "up" if self._check_redis() else "down"
        dns_status = "up" if self._check_dns() else "down"

        status_code = (
            200
            if all(s == "up" for s in [db_status, redis_status, dns_status])
            else 503
        )

        response_data = {
            "status": "ok" if status_code == 200 else "degraded",  # noqa: PLR2004
            "checks": {"database": db_status, "redis": redis_status, "dns": dns_status},
            "providers_circuit_status": {},
        }

        # Add brief circuit status
        enabled_types = source_registry.list_enabled_types()
        for st in enabled_types:
            health = source_registry.provider_health(st)
            if health:
                response_data["providers_circuit_status"][st] = health.get(
                    "status", "unknown"
                )

        return Response(response_data, status=status_code)
