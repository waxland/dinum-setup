"""EUR-Lex / CELLAR European Union Law & Treaties Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.errors import SourceUnavailable, UpstreamError
from lasuite_sources.transport import get_json
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_EURLEX_RESULTS: List[SourceSearchResult] = [
    # Mock data omitted for brevity in rewrite, but we don't strictly need it if we are always hitting sparql or mock
]


class EurLexSourceProvider(BaseSourceProvider):
    """EUR-Lex / CELLAR SPARQL provider."""

    source_type = "eurlex"
    name = "EUR-Lex / CELLAR"

    # CELLAR SPARQL Endpoint
    SPARQL_URL = "https://publications.europa.eu/webapi/rdf/sparql"
    ALLOWED_HOSTS = frozenset(["publications.europa.eu"])

    def __init__(self):
        super().__init__()
        self.mock_mode = os.getenv("EURLEX_MOCK_ENABLED", "false").lower() in (
            "true",
            "1",
            "yes",
        )

    def is_enabled(self) -> bool:
        return True

    def suggest(self, query: str, limit: int = 5) -> List[SourceSuggestResult]:
        results = self.search(query=query, limit=limit)
        return [
            {
                "id": r["source_id"],
                "title": r["title"],
                "subtitle": r["subtitle"] or "",
                "type": "law",
            }
            for r in results
        ]

    def _build_sparql_query(self, text_query: str, limit: int) -> str:
        query = f"""
        PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT DISTINCT ?work ?celex ?title
        WHERE {{
          ?work a cdm:work .
          ?work cdm:resource_legal_id_celex ?celex .
          ?work cdm:work_has_expression ?exp .
          ?exp cdm:expression_title ?title .
          FILTER(LANG(?title) = "en")
          FILTER(CONTAINS(LCASE(?title), LCASE("{text_query}")) || CONTAINS(LCASE(?celex), LCASE("{text_query}")))
        }}
        LIMIT {limit}
        """
        return query.strip()

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        if self.mock_mode:
            return []

        sparql_query = self._build_sparql_query(query, limit)
        params = {"query": sparql_query, "format": "application/sparql-results+json"}

        try:
            data = get_json(
                self.SPARQL_URL, allowed_hosts=self.ALLOWED_HOSTS, params=params
            )
        except (UpstreamError, SourceUnavailable) as e:
            logger.error(f"CELLAR SPARQL query failed: {e}")
            raise

        bindings = (
            data.get("results", {}).get("bindings", [])
            if isinstance(data, dict)
            else []
        )

        results: List[SourceSearchResult] = []
        for item in bindings:
            celex = item.get("celex", {}).get("value", "")
            title = item.get("title", {}).get("value", "")
            work_uri = item.get("work", {}).get("value", "")

            results.append(
                {
                    "source_id": f"CELEX-{celex}",
                    "entity_type": "law",
                    "display_mode": "callout",
                    "title": title,
                    "subtitle": f"CELEX: {celex}",
                    "status": "Unknown",
                    "status_color": "gray",
                    "meta1": f"CELEX: {celex}",
                    "meta2": "",
                    "meta3": "",
                    "excerpt": "",
                    "summary": "",
                    "url": f"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:{celex}",
                    "raw_payload": {
                        "celex": celex,
                        "work_uri": work_uri,
                        "title": title,
                    },
                }
            )

        return results

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        if self.mock_mode:
            return None

        if source_id.startswith("CELEX-"):
            celex = source_id[6:]
        else:
            celex = source_id

        query = f"""
        PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT DISTINCT ?work ?celex ?title
        WHERE {{
          ?work a cdm:work .
          ?work cdm:resource_legal_id_celex "{celex}" .
          ?work cdm:work_has_expression ?exp .
          ?exp cdm:expression_title ?title .
          FILTER(LANG(?title) = "en")
        }}
        LIMIT 1
        """

        params = {"query": query.strip(), "format": "application/sparql-results+json"}

        try:
            data = get_json(
                self.SPARQL_URL, allowed_hosts=self.ALLOWED_HOSTS, params=params
            )
            bindings = (
                data.get("results", {}).get("bindings", [])
                if isinstance(data, dict)
                else []
            )

            if not bindings:
                return None

            item = bindings[0]
            title = item.get("title", {}).get("value", "")
            work_uri = item.get("work", {}).get("value", "")

            return {
                "source_id": f"CELEX-{celex}",
                "entity_type": "law",
                "display_mode": "callout",
                "title": title,
                "subtitle": f"CELEX: {celex}",
                "status": "Unknown",
                "status_color": "gray",
                "meta1": f"CELEX: {celex}",
                "meta2": "",
                "meta3": "",
                "excerpt": "",
                "summary": "",
                "url": f"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:{celex}",
                "raw_payload": {"celex": celex, "work_uri": work_uri, "title": title},
            }
        except Exception as e:
            logger.error(f"Failed to fetch detail for {source_id}: {e}")
            return None
