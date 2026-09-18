"""International Organizations API Slashers (World Bank, OECD, WHO, Council of Europe CEDH)."""

from lasuite_sources.providers.international.hudoc import HudocSourceProvider
from lasuite_sources.providers.international.oecd import OecdSourceProvider
from lasuite_sources.providers.international.who import WhoSourceProvider
from lasuite_sources.providers.international.worldbank import WorldBankSourceProvider

__all__ = [
    "WorldBankSourceProvider",
    "OecdSourceProvider",
    "WhoSourceProvider",
    "HudocSourceProvider",
]
