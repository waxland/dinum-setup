"""Official Canadian Federal API Slashers (Canada / Gouvernement du Canada)."""

from lasuite_sources.providers.canada.canadabuys import CanadaBuysSourceProvider
from lasuite_sources.providers.canada.corporations import CorporationsCanadaSourceProvider
from lasuite_sources.providers.canada.geonames import GeoNamesCanadaSourceProvider
from lasuite_sources.providers.canada.grants import CanadaGrantsSourceProvider
from lasuite_sources.providers.canada.law import JusticeLawsSourceProvider
from lasuite_sources.providers.canada.opencanada import OpenCanadaSourceProvider
from lasuite_sources.providers.canada.parliament import ParliamentCanadaSourceProvider
from lasuite_sources.providers.canada.statcan import StatCanSourceProvider

__all__ = [
    "JusticeLawsSourceProvider",
    "CorporationsCanadaSourceProvider",
    "ParliamentCanadaSourceProvider",
    "StatCanSourceProvider",
    "OpenCanadaSourceProvider",
    "CanadaBuysSourceProvider",
    "CanadaGrantsSourceProvider",
    "GeoNamesCanadaSourceProvider",
]
