"""EUR-Lex / CELLAR European Union Law & Treaties Source Provider."""

import logging
import os
from typing import List, Optional

from lasuite_sources.demo import DemoSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

MOCK_EURLEX_RESULTS: List[SourceSearchResult] = [
    {
        "source_id": "CELEX-32016R0679",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Regulation (EU) 2016/679 (General Data Protection Regulation — GDPR)",
        "subtitle": "European Parliament & Council · Official Journal L 119",
        "status": "In force",
        "status_color": "green",
        "meta1": "CELEX: 32016R0679",
        "meta2": "ELI: reg/2016/679/oj",
        "meta3": "Applicable: 25/05/2018",
        "excerpt": (
            "The protection of natural persons in relation to the processing of personal data is a "
            "fundamental right. Everyone has the right to the protection of personal data concerning him or her."
        ),
        "summary": "EU general regulation on personal data protection and privacy rules.",
        "url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "celex": "32016R0679",
            "eli": "reg/2016/679/oj",
            "type": "Regulation",
        },
    },
    {
        "source_id": "CELEX-32024R1689",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (AI Act)",
        "subtitle": "European Parliament & Council · Official Journal L 1689",
        "status": "In force",
        "status_color": "green",
        "meta1": "CELEX: 32024R1689",
        "meta2": "ELI: reg/2024/1689/oj",
        "meta3": "Applicable: 02/08/2026",
        "excerpt": (
            "This Regulation establishes a common regulatory framework for the placing on the market, "
            "the putting into service and the use of artificial intelligence systems in the Union."
        ),
        "summary": "European AI Act establishing risk tiers and safety rules for AI models.",
        "url": "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "celex": "32024R1689",
            "eli": "reg/2024/1689/oj",
            "type": "Regulation",
        },
    },
    {
        "source_id": "CELEX-32022L2555",
        "entity_type": "law",
        "display_mode": "callout",
        "title": "Directive (EU) 2022/2555 on measures for a high common level of cybersecurity (NIS 2)",
        "subtitle": "Official Journal L 333 · Transposition: 17/10/2024",
        "status": "In force",
        "status_color": "green",
        "meta1": "CELEX: 32022L2555",
        "meta2": "ELI: dir/2022/2555/oj",
        "meta3": "Cybersecurity Directive",
        "excerpt": (
            "This Directive lays down cybersecurity risk-management measures and reporting obligations "
            "for essential and important entities across critical sectors in the Union."
        ),
        "summary": "NIS 2 Directive harmonizing cybersecurity baselines across critical EU infrastructures.",
        "url": "https://eur-lex.europa.eu/eli/dir/2022/2555/oj",
        "verified_at": "18/09/2026",
        "raw_payload": {
            "celex": "32022L2555",
            "eli": "dir/2022/2555/oj",
            "type": "Directive",
        },
    },
]


class EurLexSourceProvider(DemoSourceProvider):
    """EUR-Lex / CELLAR SPARQL and REST API provider with offline mock fallback."""

    source_type = "eurlex"
    name = "EUR-Lex / CELLAR"

    def __init__(self):
        self.mock_mode = os.getenv("EURLEX_MOCK_ENABLED", "true").lower() in (
            "true",
            "1",
            "yes",
        )

    def is_enabled(self) -> bool:
        return super().is_enabled()

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

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        return self.demo_search(MOCK_EURLEX_RESULTS, query, limit)

    def get_detail(self, source_id: str) -> Optional[SourceSearchResult]:
        for item in MOCK_EURLEX_RESULTS:
            if item["source_id"] == source_id:
                return self.demo_results([item])[0]
        return None
