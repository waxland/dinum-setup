"""Regression coverage for plugin reentrancy and concurrent discovery."""

import subprocess
import sys
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
    original = dict(source_registry._providers)
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
        source_registry._providers = original


def test_broken_plugin_does_not_prevent_following_plugins(monkeypatch):
    monkeypatch.setattr(source_registry, "_discovered", False)
    broken = Mock()
    broken.load.side_effect = ImportError("missing dependency")
    valid = Mock()
    valid.load.return_value = lambda: source_registry.get_provider("law")
    monkeypatch.setattr("importlib.metadata.entry_points", lambda **_: [broken, valid])
    source_registry.discover_entry_points()
    valid.load.assert_called_once()


def test_metadata_query_failure_is_handled_gracefully(monkeypatch):
    """Corrupted metadata or entry point group lookup failures do not crash discovery."""
    monkeypatch.setattr(source_registry, "_discovered", False)

    def fail_entry_points(**_):
        raise OSError("Corrupted package metadata database")

    monkeypatch.setattr("importlib.metadata.entry_points", fail_entry_points)
    # Must not raise and must set _discovered = True
    source_registry.discover_entry_points()
    assert source_registry._discovered is True


def test_discovery_in_bounded_subprocess():
    """A subprocess runs discovery with strict timeout: lock regressions fail fast."""
    code = (
        "import os\n"
        "os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tests.conftest')\n"
        "import django\n"
        "django.setup()\n"
        "from lasuite_sources.registry import source_registry\n"
        "source_registry.discover_entry_points()\n"
        "enabled = source_registry.list_enabled_types()\n"
        "assert isinstance(enabled, list)\n"
    )

    result = subprocess.run(  # noqa: S603 - test-controlled internal Python invocation
        [sys.executable, "-c", code],
        capture_output=True,
        text=True,
        timeout=3.0,
        check=False,
    )
    assert result.returncode == 0, f"Subprocess failed: {result.stderr}"
