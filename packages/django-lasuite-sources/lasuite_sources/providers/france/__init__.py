"""Official French API Slashers (DINUM / République Française)."""

from lasuite_sources.providers.france.address import AddressSourceProvider
from lasuite_sources.providers.france.agent import AgentSourceProvider
from lasuite_sources.providers.france.albert import AlbertSourceProvider
from lasuite_sources.providers.france.cadastre import CadastreSourceProvider
from lasuite_sources.providers.france.company import CompanySourceProvider
from lasuite_sources.providers.france.demarche import DemarcheSourceProvider
from lasuite_sources.providers.france.grant import GrantSourceProvider
from lasuite_sources.providers.france.insee import InseeSourceProvider
from lasuite_sources.providers.france.law import LawSourceProvider
from lasuite_sources.providers.france.opendata import OpenDataSourceProvider
from lasuite_sources.providers.france.parliament import ParliamentSourceProvider
from lasuite_sources.providers.france.procurement import ProcurementSourceProvider

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
