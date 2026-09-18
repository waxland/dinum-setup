---
name: dinum-python
description: Apply DINUM, beta.gouv.fr and La Suite numérique Python engineering standards when creating, modifying or reviewing Python code.
---

# DINUM Python Engineering Standards

This skill defines the engineering standards applicable across backend Python services, Django applications, and API connectors.

## 🧭 Precedence Order

1. explicit user instruction
2. repository AGENT.md / AGENTS.md instructions
3. existing repository configuration (pyproject.toml, ruff.toml, .flake8, pytest.ini)
4. existing architectural/project conventions
5. La Suite Python Handbook recommendations
6. generic language/framework best practices

## 📋 Required Behaviour

### 1. Inspect repository rules first
- Inspect `pyproject.toml`, `ruff.toml`, `pytest.ini`, and existing codebase conventions.
- Repository configuration always wins over historical handbook defaults (e.g. 88 vs 99 char line length).

### 2. Style and imports
- Follow repository linter and formatter.
- Group imports into 6 distinct sections:
  1. `__future__`
  2. Standard library
  3. Frameworks (Django, DRF, FastAPI)
  4. Third-party dependencies
  5. Internal application modules
  6. Local/relative imports.
- No wildcard imports, no debug `print()` statements.

### 3. Architecture & Django
- Prevent N+1 queries with `select_related()` and `prefetch_related()`.
- Atomic transactions for multi-row mutations (`transaction.atomic`).
- Safe, idempotent, and backward-compatible database migrations.
- Always validate authorization and data boundaries server-side.

### 4. Defensive security & API robustness
- Zero hard-coded credentials or secrets.
- Mandatory anti-SSRF validation on outgoing HTTP requests.
- Strict timeouts (3.5s) and Circuit Breaker pattern on external dependencies.
- Handle exceptions specifically; never use bare `except Exception: pass`.

### 5. Automated testing
- Write and update `pytest` test suites.
- Mock external network calls with `responses` or `unittest.mock`.
- Run `PYTHONPATH=. pytest` before declaring task complete.
