"""Official European Union API Slashers (EUR-Lex, Europarl, TED, Eurostat, Funding & Tenders, data.europa.eu)."""

from lasuite_sources.providers.europe.cordis import CordisSourceProvider
from lasuite_sources.providers.europe.curia import CuriaSourceProvider
from lasuite_sources.providers.europe.dataeuropa import DataEuropaSourceProvider
from lasuite_sources.providers.europe.eurlex import EurLexSourceProvider
from lasuite_sources.providers.europe.europarl import EuroparlSourceProvider
from lasuite_sources.providers.europe.eurostat import EurostatSourceProvider
from lasuite_sources.providers.europe.funding import FundingTendersSourceProvider
from lasuite_sources.providers.europe.ted import TedSourceProvider
from lasuite_sources.providers.europe.whoiswho import WhoiswhoSourceProvider

__all__ = [
    "EurLexSourceProvider",
    "EuroparlSourceProvider",
    "TedSourceProvider",
    "EurostatSourceProvider",
    "FundingTendersSourceProvider",
    "DataEuropaSourceProvider",
    "WhoiswhoSourceProvider",
    "CordisSourceProvider",
    "CuriaSourceProvider",
]
