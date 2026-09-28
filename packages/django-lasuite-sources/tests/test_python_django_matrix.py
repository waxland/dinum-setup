import os
import sys

import django

from lasuite_sources.types import SourceSearchResult


def test_runtime_python_and_django_versions():
    """Verify runtime Python >= 3.12 and Django >= 4.2 (R-07.05)."""
    assert sys.version_info >= (3, 12)
    assert django.VERSION >= (4, 2)


def test_python_django_matrix_documentation_exists():
    """Verify PYTHON_DJANGO_MATRIX.md exists and documents tested vs untested versions."""
    docs_dir = os.path.join(os.path.dirname(__file__), "../docs")
    matrix_path = os.path.join(docs_dir, "PYTHON_DJANGO_MATRIX.md")
    assert os.path.exists(matrix_path)

    with open(matrix_path, "r", encoding="utf-8") as f:
        content = f.read()

    assert "Python 3.12" in content
    assert "Python 3.13" in content
    assert "Python 3.14" in content
    assert "Django 4.2 LTS" in content
    assert "Django 6.1" in content
