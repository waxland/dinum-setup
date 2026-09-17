"""Type definitions for sovereign source providers."""

from typing import Literal, NotRequired, Optional, TypedDict

SourceEntityType = Literal[
    "law",
    "company",
    "parliament",
    "address",
    "procurement",
    "grant",
    "insee",
    "agent",
    "cadastre",
    "demarche",
    "opendata",
    "custom",
]

DisplayMode = Literal["callout", "card", "link"]
StatusColor = Literal["blue", "green", "yellow", "red", "purple", "gray"]


class SourceSuggestResult(TypedDict):
    """Result returned for quick autocomplete suggestions (<100ms)."""

    id: str
    title: str
    subtitle: NotRequired[str]
    type: SourceEntityType


class SourceSearchResult(TypedDict):
    """Structured result returned by source providers."""

    source_id: str
    entity_type: SourceEntityType
    display_mode: DisplayMode
    title: str
    subtitle: Optional[str]
    status: Optional[str]
    status_color: Optional[StatusColor]
    meta1: Optional[str]
    meta2: Optional[str]
    meta3: Optional[str]
    excerpt: Optional[str]
    summary: Optional[str]
    url: Optional[str]
    verified_at: Optional[str]
    raw_payload: Optional[dict]
