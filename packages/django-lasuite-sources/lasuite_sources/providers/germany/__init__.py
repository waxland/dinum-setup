"""Official German Federal API Slashers (Gesetze im Internet, Handelsregister, Bundestag, Destatis, GovData)."""

from lasuite_sources.providers.germany.company import HandelsregisterSourceProvider
from lasuite_sources.providers.germany.law import GesetzeSourceProvider
from lasuite_sources.providers.germany.opendata import GovDataSourceProvider
from lasuite_sources.providers.germany.parliament import BundestagSourceProvider
from lasuite_sources.providers.germany.statistics import DestatisSourceProvider

__all__ = [
    "GesetzeSourceProvider",
    "HandelsregisterSourceProvider",
    "BundestagSourceProvider",
    "DestatisSourceProvider",
    "GovDataSourceProvider",
]
