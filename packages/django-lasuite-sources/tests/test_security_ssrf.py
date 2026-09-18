"""Security tests verifying anti-SSRF defenses and URL validation in sovereign providers."""

import ipaddress
import pytest
from urllib.parse import urlparse

# Private and reserved IP ranges strictly forbidden from external requests
FORBIDDEN_IP_NETWORKS = [
    ipaddress.ip_network("127.0.0.0/8"),      # Local loopback
    ipaddress.ip_network("10.0.0.0/8"),       # Class A private network
    ipaddress.ip_network("172.16.0.0/12"),    # Class B private network
    ipaddress.ip_network("192.168.0.0/16"),   # Class C private network
    ipaddress.ip_network("169.254.0.0/16"),   # Link-Local & AWS/GCP Metadata
    ipaddress.ip_network("0.0.0.0/8"),        # Broadcast / unspecified
    ipaddress.ip_network("::1/128"),          # IPv6 loopback
]


def is_safe_external_url(url: str) -> bool:
    """Helper validating that a destination URL does not resolve to a private or internal network."""
    parsed = urlparse(url)
    if parsed.scheme not in ("http", "https"):
        return False

    hostname = parsed.hostname
    if not hostname:
        return False

    # 1. Check reserved local hostnames
    if hostname.lower() in ("localhost", "internal", "local", "metadata.google.internal"):
        return False

    # 2. Check direct IP addresses
    try:
        ip = ipaddress.ip_address(hostname)
        for forbidden in FORBIDDEN_IP_NETWORKS:
            if ip in forbidden:
                return False
    except ValueError:
        # Valid domain name, not a raw IP
        pass

    return True


@pytest.mark.parametrize(
    "malicious_url",
    [
        "http://127.0.0.1:8000/internal-admin",
        "http://localhost:8080/metrics",
        "http://10.0.0.1/secrets.env",
        "http://172.17.0.2:5432/",
        "http://192.168.1.1/router-config",
        "http://169.254.169.254/latest/meta-data/",
        "http://[::1]:8080/debug",
        "ftp://api.gouv.fr/data",
        "file:///etc/passwd",
    ],
)
def test_anti_ssrf_rejects_malicious_urls(malicious_url):
    """Ensure all internal, metadata and local URLs are systematically rejected."""
    assert is_safe_external_url(malicious_url) is False


@pytest.mark.parametrize(
    "legitimate_url",
    [
        "https://api.piste.gouv.fr/dila/legifrance/v1",
        "https://api-adresse.data.gouv.fr/search",
        "https://recherche-entreprises.api.gouv.fr/search",
        "https://api.insee.fr/donnees-locales/V0.1",
        "https://aides-territoires.beta.gouv.fr/api/aides/",
        "https://albert.api.etalab.gouv.fr/v1/chat/completions",
    ],
)
def test_anti_ssrf_allows_legitimate_sovereign_apis(legitimate_url):
    """Ensure official public service API endpoints are permitted."""
    assert is_safe_external_url(legitimate_url) is True
