"""Providers package initializing and registering built-in source providers."""

from lasuite_sources.providers.address import AddressSourceProvider
from lasuite_sources.providers.agent import AgentSourceProvider
from lasuite_sources.providers.albert import AlbertSourceProvider
from lasuite_sources.providers.cadastre import CadastreSourceProvider
from lasuite_sources.providers.company import CompanySourceProvider
from lasuite_sources.providers.demarche import DemarcheSourceProvider
from lasuite_sources.providers.grant import GrantSourceProvider
from lasuite_sources.providers.insee import InseeSourceProvider
from lasuite_sources.providers.law import LawSourceProvider
from lasuite_sources.providers.opendata import OpenDataSourceProvider
from lasuite_sources.providers.parliament import ParliamentSourceProvider
from lasuite_sources.providers.procurement import ProcurementSourceProvider
from lasuite_sources.registry import source_registry

# Auto-register all 12 default providers
source_registry.register(LawSourceProvider())
source_registry.register(AddressSourceProvider())
source_registry.register(CompanySourceProvider())
source_registry.register(ParliamentSourceProvider())
source_registry.register(AlbertSourceProvider())
source_registry.register(ProcurementSourceProvider())
source_registry.register(GrantSourceProvider())
source_registry.register(InseeSourceProvider())
source_registry.register(AgentSourceProvider())
source_registry.register(CadastreSourceProvider())
source_registry.register(DemarcheSourceProvider())
source_registry.register(OpenDataSourceProvider())

__all__ = [
    "LawSourceProvider",
    "AddressSourceProvider",
    "CompanySourceProvider",
    "ParliamentSourceProvider",
    "AlbertSourceProvider",
    "ProcurementSourceProvider",
    "GrantSourceProvider",
    "InseeSourceProvider",
    "AgentSourceProvider",
    "CadastreSourceProvider",
    "DemarcheSourceProvider",
    "OpenDataSourceProvider",
]
