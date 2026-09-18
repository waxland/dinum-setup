"""Federated European & International API Slashers (BRIS, INSPIRE Address & Cadastre, Your Europe)."""

from lasuite_sources.providers.federation.bris import BrisFederatedSourceProvider
from lasuite_sources.providers.federation.inspire_address import (
    InspireAddressFederatedProvider,
)
from lasuite_sources.providers.federation.inspire_cadastre import (
    InspireCadastreFederatedProvider,
)
from lasuite_sources.providers.federation.your_europe import YourEuropeSourceProvider

__all__ = [
    "BrisFederatedSourceProvider",
    "InspireAddressFederatedProvider",
    "InspireCadastreFederatedProvider",
    "YourEuropeSourceProvider",
]
