# 🐍 Python & Django Compatibility Matrix (`PYTHON_DJANGO_MATRIX.md`)

**Date:** 28 September 2026  
**Reference:** AUD-015, `PLAN_ACTIONS.md` (Task R-07.05)  
**Scope:** `django-lasuite-sources` package runtime, CI testing, and Django version bounds

---

## 🏛️ 1. Declared vs Tested Versions Matrix

| Component                  | Declared Specification (`pyproject.toml`) | Verified in CI (`ci-packages.yml`)              | Verified in Local Dev                     | Compatibility Status                     |
| -------------------------- | ----------------------------------------- | ----------------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| **Python 3.12**            | `>=3.12`                                  | ✅ **Tested** (Ubuntu 24.04 LTS / CPython 3.12) | ⏸️ Compatible                             | 🟢 Fully Certified (Primary CI Target)   |
| **Python 3.13**            | `>=3.12`                                  | ✅ **Tested** (CI Matrix)                       | ⏸️ Compatible                             | 🟢 Fully Certified                       |
| **Python 3.14**            | `>=3.12`                                  | ⏸️ Planned                                      | ✅ **Tested** (macOS 15 / CPython 3.14.7) | 🟢 Verified in Local Dev                 |
| **Django 4.2 LTS**         | `>=4.2`                                   | ⏸️ Untested (Secondary LTS)                     | ⏸️ Compatible                             | 🟡 Supported by spec, pending matrix job |
| **Django 5.0 / 5.1 / 5.2** | `>=4.2`                                   | ⏸️ Untested                                     | ⏸️ Compatible                             | 🟡 Supported by spec                     |
| **Django 6.0 / 6.1**       | `>=4.2`                                   | ✅ **Tested** (Django 6.1.1)                    | ✅ **Tested** (Django 6.1.1)              | 🟢 Fully Certified                       |

---

## 📋 2. Key Insights & Constraints

1. **Minimum Python Ceiling:** `requires-python = ">=3.12"` is strictly enforced in `pyproject.toml`. Python 3.11 and older are deprecated and unsupported.
2. **CI Primary Grounding:** GitHub Actions workflow `.github/workflows/ci-packages.yml` provisions CPython **3.12** and **3.13** and runs all 147 Django tests against `Django 6.1.1`.
3. **Local Development Grounding:** Local development and `make check` run under CPython **3.14.7** with `Django 6.1.1`.
4. **Untested Combinations Note:** While `django>=4.2` allows Django 4.2 LTS and 5.x, these combinations are not extrapolated as tested; they remain supported per specification until a dedicated multi-job tox matrix CI workflow is provisioned.
