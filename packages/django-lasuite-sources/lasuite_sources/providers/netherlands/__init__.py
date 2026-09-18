"""Official Dutch API Slashers (KOOP Wettenbank, KVK, Kadaster BAG, CBS StatLine, Data.overheid.nl)."""

from lasuite_sources.providers.netherlands.address import BagSourceProvider
from lasuite_sources.providers.netherlands.company import KvkSourceProvider
from lasuite_sources.providers.netherlands.law import WettenbankSourceProvider
from lasuite_sources.providers.netherlands.opendata import DataOverheidSourceProvider
from lasuite_sources.providers.netherlands.statistics import CbsSourceProvider

__all__ = [
    "WettenbankSourceProvider",
    "KvkSourceProvider",
    "BagSourceProvider",
    "CbsSourceProvider",
    "DataOverheidSourceProvider",
]
