"""Providers package initializing and registering built-in source providers."""

from lasuite_sources.providers.canada import (
    CanadaBuysSourceProvider,
    CanadaGrantsSourceProvider,
    CorporationsCanadaSourceProvider,
    GeoNamesCanadaSourceProvider,
    JusticeLawsSourceProvider,
    OpenCanadaSourceProvider,
    ParliamentCanadaSourceProvider,
    StatCanSourceProvider,
)
from lasuite_sources.providers.europe import (
    CordisSourceProvider,
    CuriaSourceProvider,
    DataEuropaSourceProvider,
    EurLexSourceProvider,
    EuroparlSourceProvider,
    EurostatSourceProvider,
    FundingTendersSourceProvider,
    TedSourceProvider,
    WhoiswhoSourceProvider,
)
from lasuite_sources.providers.france import (
    AddressSourceProvider,
    AgentSourceProvider,
    AlbertSourceProvider,
    CadastreSourceProvider,
    CompanySourceProvider,
    DemarcheSourceProvider,
    GrantSourceProvider,
    InseeSourceProvider,
    LawSourceProvider,
    OpenDataSourceProvider,
    ParliamentSourceProvider,
    ProcurementSourceProvider,
)
from lasuite_sources.registry import source_registry

# Auto-register France default providers
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

# Auto-register Europe sovereign providers
source_registry.register(EurLexSourceProvider())
source_registry.register(EuroparlSourceProvider())
source_registry.register(TedSourceProvider())
source_registry.register(EurostatSourceProvider())
source_registry.register(FundingTendersSourceProvider())
source_registry.register(DataEuropaSourceProvider())
source_registry.register(WhoiswhoSourceProvider())
source_registry.register(CordisSourceProvider())
source_registry.register(CuriaSourceProvider())

# Auto-register Canada federal providers
source_registry.register(JusticeLawsSourceProvider())
source_registry.register(CorporationsCanadaSourceProvider())
source_registry.register(ParliamentCanadaSourceProvider())
source_registry.register(StatCanSourceProvider())
source_registry.register(OpenCanadaSourceProvider())
source_registry.register(CanadaBuysSourceProvider())
source_registry.register(CanadaGrantsSourceProvider())
source_registry.register(GeoNamesCanadaSourceProvider())


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
    "EurLexSourceProvider",
    "EuroparlSourceProvider",
    "TedSourceProvider",
    "EurostatSourceProvider",
    "FundingTendersSourceProvider",
    "DataEuropaSourceProvider",
    "WhoiswhoSourceProvider",
    "CordisSourceProvider",
    "CuriaSourceProvider",
    "JusticeLawsSourceProvider",
    "CorporationsCanadaSourceProvider",
    "ParliamentCanadaSourceProvider",
    "StatCanSourceProvider",
    "OpenCanadaSourceProvider",
    "CanadaBuysSourceProvider",
    "CanadaGrantsSourceProvider",
    "GeoNamesCanadaSourceProvider",
]
