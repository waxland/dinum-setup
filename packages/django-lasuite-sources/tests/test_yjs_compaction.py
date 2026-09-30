import base64

import pytest

from lasuite_sources.yjs_utils import compact_yjs_deltas


def test_compact_yjs_deltas_empty():
    assert compact_yjs_deltas([]) == ""


def test_compact_yjs_deltas_valid():
    delta1 = base64.b64encode(b"state1").decode()
    delta2 = base64.b64encode(b"state2").decode()

    result = compact_yjs_deltas([delta1, delta2])
    assert result == f"compacted_{delta2}"


def test_compact_yjs_deltas_invalid_base64():
    result = compact_yjs_deltas(["not_base_64!!!"])
    assert result == ""
