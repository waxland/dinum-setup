---
title: Python & Django Engineering Standards (DINUM / La Suite)
sidebar_label: DINUM Python Standards
description: Engineering rules for Python, Django, DRF, defensive SSRF security, typing, and testing in La Suite Numérique and public service APIs.
---

This skill defines the procedures and engineering standards to apply whenever creating, modifying, or reviewing backend Python code (**Python**, **Django**, **Django REST Framework**, **FastAPI**, **pytest**, **Celery**).

---

## 🎯 1. Activation Scope

Activate this skill when working on:
- Python modules and scripts (`.py`)
- Django and Django REST Framework applications
- ORM models, migrations, and database queries
- Data source providers and API connectors (`lasuite_sources/providers/`)
- Asynchronous tasks and workers (Celery, background tasks)
- Automated testing (`pytest`, `pytest-django`, `responses`)
- Dependency configuration (`pyproject.toml`, `requirements.txt`)

---

## 🧭 2. Rules Precedence Order

1. **Explicit user instruction**
2. **`AGENTS.md` / `AGENT.md` instructions**
3. **Repository configuration (`pyproject.toml`, `ruff.toml`, `.flake8`, `pytest.ini`)**
4. **Established architectural conventions in the project**
5. **La Suite Python Handbook recommendations**
6. **Generic Python / PEP 8 ecosystem best practices**

> ⚠️ **Note on Line Length :** The legacy La Suite handbook mentions 99 characters (extended PEP 8), whereas modern repositories often configure Ruff at 88 characters. **Local repository configuration always wins.**

---

## 📋 3. Mandatory Implementation Checklist

### A. Style, Formatting & Imports
- [ ] Obey the repository's configured linter/formatter (Ruff / Black / Flake8).
- [ ] Group imports into 6 distinct sections:
  1. `__future__`
  2. Standard Python library
  3. Frameworks (Django, DRF, FastAPI)
  4. Third-party dependencies (`requests`, `pydantic`, etc.)
  5. Internal application modules
  6. Local/relative imports.
- [ ] No wildcard imports (`from module import *`).
- [ ] No leftover `print()` debug calls or commented-out code.

### B. Django & Database Best Practices
- [ ] Prevent $N+1$ query problems using `select_related()` and `prefetch_related()`.
- [ ] Wrap multi-table mutations inside atomic transactions (`transaction.atomic`).
- [ ] Ensure database migrations are idempotent, backwards-compatible, and safe.
- [ ] Always enforce authorization server-side (never trust the client).

### C. Typing & Documentation
- [ ] Type hints on all public functions, classes, and methods.
- [ ] Explicit modeling of `Optional[T]` / `T | None`.
- [ ] Clear docstrings explaining business intent, invariants, and edge cases.

### D. Defensive Security & Network Robustness
- [ ] Zero hard-coded credentials or API tokens.
- [ ] Mandatory anti-SSRF URL validation on all outgoing server-side requests (block private IP ranges: `127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254`).
- [ ] Circuit Breaker and strict timeouts (e.g. 3.5s) on external API calls.
- [ ] Avoid catching general exceptions without re-raising or logging (`except Exception: pass`).

### E. Automated Testing
- [ ] Add or update pytest test suites for every feature and bug fix.
- [ ] Mock external HTTP calls using `responses` or `unittest.mock`.
- [ ] Execute `pytest` with `PYTHONPATH=.` to ensure a 100% green test suite.

---

## 🔗 4. Official References

- [La Suite — Python Best Practices](https://github.com/suitenumerique/dev-handbook/blob/main/python.md)
- [La Suite — Security Rules](https://github.com/suitenumerique/dev-handbook/blob/main/security.md)
- [La Suite — Code Reviews](https://github.com/suitenumerique/dev-handbook/blob/main/code-reviews.md)
- [beta.gouv — Software Quality Standards](https://standards.beta.gouv.fr/standards)
