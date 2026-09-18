"""Explicit, opt-in fixture providers; never an upstream error fallback."""

import unicodedata

from django.conf import settings

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.errors import SourceUnavailable
from lasuite_sources.types import SourceSearchResult


class DemoSourceProvider(BaseSourceProvider):
    """Existing fixture connectors are unavailable unless demonstration is selected."""

    def is_enabled(self) -> bool:
        return bool(getattr(settings, "LASUITE_SOURCES_DEMO", False))

    def demo_search(
        self, items: list[SourceSearchResult], query: str, limit: int
    ) -> list[SourceSearchResult]:
        """Search fixture text, without substituting unrelated records on a miss."""

        def normalize(value: str) -> str:
            return "".join(
                c
                for c in unicodedata.normalize("NFKD", value.casefold())
                if not unicodedata.combining(c)
            )

        normalized = normalize(query.strip())
        return self.demo_results(
            [
                item
                for item in items
                if any(
                    normalized in normalize(item.get(field) or "")
                    for field in (
                        "title",
                        "subtitle",
                        "excerpt",
                        "summary",
                        "meta1",
                        "meta2",
                        "meta3",
                    )
                )
            ][:limit]
        )

    def demo_results(
        self, results: list[SourceSearchResult]
    ) -> list[SourceSearchResult]:
        """Remove false verification and preserve the fixture's explicit origin."""
        if not self.is_enabled():
            raise SourceUnavailable("This provider is demonstration-only")
        return [
            {
                **item,
                "provider": self.source_type,
                "origin": "demo",
                "verified_at": None,
                "status": "Demonstration",
                "status_color": "gray",
            }
            for item in results
        ]
