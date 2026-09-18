"""
La Suite Sources Souveraines - Application Django autonome et réutilisable.
Fournit le registre de providers, le cache Redis 24h et les connecteurs d'APIs publiques de l'État.
"""

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.ingestion import BulkDatasetIngestionEngine
from lasuite_sources.registry import SourceProviderRegistry, source_registry
from lasuite_sources.tasks import check_laws_validity_task
from lasuite_sources.types import SourceEntityType, SourceSearchResult, SourceSuggestResult

__all__ = [
    "BaseSourceProvider",
    "BulkDatasetIngestionEngine",
    "SourceProviderRegistry",
    "source_registry",
    "SourceEntityType",
    "SourceSearchResult",
    "SourceSuggestResult",
    "check_laws_validity_task",
]
