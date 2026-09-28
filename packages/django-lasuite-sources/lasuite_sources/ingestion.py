"""Bulk dataset ingestion and indexing engine for open registries (CanadaBuys, DVF, flat catalogs)."""

import csv
import hashlib
import io
import json
import logging
import os
from typing import Any, Callable, Dict, Iterator, List, Optional, TypedDict
from urllib.parse import urlparse

from django.core.cache import caches
from django.utils import timezone

from lasuite_sources.types import SourceSearchResult

logger = logging.getLogger(__name__)

INGESTION_CACHE_TIMEOUT = 86400 * 7  # 7 days


class DatasetMetadata(TypedDict):
    """Metadata tracking source, date, version, hash, and record count for ingested datasets."""

    dataset_name: str
    dataset_version: str
    dataset_source: str
    ingested_at: str
    sha256_hash: str
    record_count: int


class BulkDatasetIngestionEngine:
    """Helper engine for scheduled ingestion, validation, and in-memory indexing of bulk public datasets."""

    def __init__(self, dataset_name: str, cache_alias: str = "default"):
        self.dataset_name = dataset_name
        self.cache_alias = cache_alias
        self._index: Dict[str, SourceSearchResult] = {}
        self.metadata: Optional[DatasetMetadata] = None

    @property
    def cache(self):
        return caches[self.cache_alias]

    def compute_sha256(self, content: bytes) -> str:
        """Compute deterministic SHA-256 hash of raw content."""
        return hashlib.sha256(content).hexdigest()

    def parse_csv_stream(
        self,
        raw_content: str,
        mapper_fn: Callable[[Dict[str, Any]], Optional[SourceSearchResult]],
        delimiter: str = ",",
        dataset_version: str = "1.0.0",
        dataset_source: str = "unknown",
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

        sha256 = self.compute_sha256(raw_content.encode("utf-8"))
        self.metadata = {
            "dataset_name": self.dataset_name,
            "dataset_version": dataset_version,
            "dataset_source": dataset_source,
            "ingested_at": timezone.now().isoformat(),
            "sha256_hash": sha256,
            "record_count": len(self._index),
        }
        return results

    def parse_jsonl_stream(
        self,
        raw_content: str,
        mapper_fn: Callable[[Dict[str, Any]], Optional[SourceSearchResult]],
        dataset_version: str = "1.0.0",
        dataset_source: str = "unknown",
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
                logger.warning(
                    "Skipping malformed JSON line in %s: %s", self.dataset_name, err
                )

        sha256 = self.compute_sha256(raw_content.encode("utf-8"))
        self.metadata = {
            "dataset_name": self.dataset_name,
            "dataset_version": dataset_version,
            "dataset_source": dataset_source,
            "ingested_at": timezone.now().isoformat(),
            "sha256_hash": sha256,
            "record_count": len(self._index),
        }
        return results

    def save_to_cache(
        self,
        version: str = "1.0.0",
        source: str = "unknown",
        content_bytes: Optional[bytes] = None,
        timeout: int = INGESTION_CACHE_TIMEOUT,
    ) -> bool:
        """Persist in-memory index and metadata into cache for reconstruction."""
        if content_bytes and self.metadata:
            self.metadata["sha256_hash"] = self.compute_sha256(content_bytes)

        if not self.metadata:
            self.metadata = {
                "dataset_name": self.dataset_name,
                "dataset_version": version,
                "dataset_source": source,
                "ingested_at": timezone.now().isoformat(),
                "sha256_hash": self.compute_sha256(repr(self._index).encode("utf-8")),
                "record_count": len(self._index),
            }

        payload = {
            "metadata": self.metadata,
            "index": self._index,
        }
        key = f"ingestion:index:{self.dataset_name}"
        self.cache.set(key, payload, timeout=timeout)
        logger.info(
            "Persisted local index '%s' (%d records, sha256=%s) into cache.",
            self.dataset_name,
            len(self._index),
            self.metadata["sha256_hash"][:12],
        )
        return True

    def load_from_cache(self) -> bool:
        """Reconstruct in-memory index and metadata from cache."""
        key = f"ingestion:index:{self.dataset_name}"
        payload = self.cache.get(key)
        if not payload or not isinstance(payload, dict):
            logger.info("No cached index found for dataset '%s'.", self.dataset_name)
            return False

        self.metadata = payload.get("metadata")
        self._index = payload.get("index", {})
        logger.info(
            "Reconstructed local index '%s' from cache (%d records).",
            self.dataset_name,
            len(self._index),
        )
        return True

    def get_dataset_metadata(self) -> Optional[DatasetMetadata]:
        """Return dataset version, source, date, hash, and record count."""
        return self.metadata

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
