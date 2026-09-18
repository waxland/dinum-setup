"""Regression coverage for plugin reentrancy and concurrent discovery."""

import threading
from concurrent.futures import ThreadPoolExecutor
from unittest.mock import Mock

import pytest

from lasuite_sources.providers.france.law import LawSourceProvider
from lasuite_sources.registry import source_registry


def test_plugin_discovery_is_reentrant_and_single_flight(monkeypatch):
    """A constructor can register and look up providers without holding a lock."""
    entered = threading.Event()
    release = threading.Event()
    plugin = LawSourceProvider()
    plugin.source_type = "test-discovery-plugin"
    original = dict(source_registry._providers)  # noqa: SLF001 - isolate singleton state
    monkeypatch.setattr(source_registry, "_discovered", False)

    def construct():
        source_registry.list_enabled_types()
        source_registry.register(plugin)
        entered.set()
        assert release.wait(2)
        return plugin

    entry = Mock(name="test-entry")
    entry.load.return_value = construct
    monkeypatch.setattr("importlib.metadata.entry_points", lambda **_: [entry])
    try:
        with ThreadPoolExecutor(max_workers=2) as executor:
            first = executor.submit(source_registry.discover_entry_points)
            assert entered.wait(2)
            second = executor.submit(source_registry.discover_entry_points)
            release.set()
            first.result(timeout=2)
            second.result(timeout=2)
        entry.load.assert_called_once()
        with pytest.raises(ValueError, match="already registered"):
            duplicate = LawSourceProvider()
            duplicate.source_type = plugin.source_type
            source_registry.register(duplicate)
    finally:
        release.set()
        source_registry._providers = original  # noqa: SLF001 - restore singleton state


def test_broken_plugin_does_not_prevent_following_plugins(monkeypatch):
    monkeypatch.setattr(source_registry, "_discovered", False)
    broken = Mock()
    broken.load.side_effect = ImportError("missing dependency")
    valid = Mock()
    valid.load.return_value = lambda: source_registry.get_provider("law")
    monkeypatch.setattr("importlib.metadata.entry_points", lambda **_: [broken, valid])
    source_registry.discover_entry_points()
    valid.load.assert_called_once()
