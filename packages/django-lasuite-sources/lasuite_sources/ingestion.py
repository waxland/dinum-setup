"""Bulk dataset ingestion and indexing engine for open registries (CanadaBuys, DVF, flat catalogs)."""

import csv
import hashlib
import io
import json
import logging
import os
from typing import Any, Callable, Dict, Iterator, List, Optional
from urllib.parse import urlparse

from django.core.cache import cache
from lasuite_sources.types import SourceSearchResult

logger = logging.getLogger(__name__)

INGESTION_CACHE_TIMEOUT = 86400 * 7  # 7 days


class BulkDatasetIngestionEngine:
    """Helper engine for scheduled ingestion, validation, and in-memory indexing of bulk public datasets."""

    def __init__(self, dataset_name: str, cache_alias: str = "default"):
        self.dataset_name = dataset_name
        self.cache_alias = cache_alias
        self._index: Dict[str, SourceSearchResult] = {}

    def compute_sha256(self, content: bytes) -> str:
        """Compute deterministic SHA-256 hash of raw content."""
        return hashlib.sha256(content).hexdigest()

    def parse_csv_stream(
        self,
        raw_content: str,
        mapper_fn: Callable[[Dict[str, Any]], Optional[SourceSearchResult]],
        delimiter: str = ",",
    ) -> List[SourceSearchResult]:
        """Parse raw CSV content stream into normalized Slasher SourceSearchResults."""
        results: List[SourceSearchResult] = []
        reader = csv.DictReader(io.StringIO(raw_content), delimiter=delimiter)
        for row in reader:
            mapped = mapper_fn(row)
            if mapped:
                results.append(mapped)
                if "source_id" in mapped:
                    self._index[mapped["source_id"]] = mapped
        return results

    def parse_jsonl_stream(
        self,
        raw_content: str,
        mapper_fn: Callable[[Dict[str, Any]], Optional[SourceSearchResult]],
    ) -> List[SourceSearchResult]:
        """Parse raw JSON Lines (JSONL) into normalized Slasher SourceSearchResults."""
        results: List[SourceSearchResult] = []
        for line in raw_content.splitlines():
            line_str = line.strip()
            if not line_str:
                continue
            try:
                row = json.loads(line_str)
                mapped = mapper_fn(row)
                if mapped:
                    results.append(mapped)
                    if "source_id" in mapped:
                        self._index[mapped["source_id"]] = mapped
            except json.JSONDecodeError as err:
                logger.warning("Skipping malformed JSON line in %s: %s", self.dataset_name, err)
        return results

    def search_index(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        """Perform simple full-text search across in-memory indexed records."""
        q = query.strip().lower()
        if not q:
            return list(self._index.values())[:limit]

        matched = []
        for item in self._index.values():
            if (
                q in item["title"].lower()
                or (item.get("subtitle") and q in item["subtitle"].lower())
                or (item.get("excerpt") and q in item["excerpt"].lower())
                or (item.get("meta1") and q in item["meta1"].lower())
            ):
                matched.append(item)
                if len(matched) >= limit:
                    break
        return matched

    def get_by_id(self, source_id: str) -> Optional[SourceSearchResult]:
        """Retrieve single item by exact ID."""
        return self._index.get(source_id)
