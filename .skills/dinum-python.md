---
title: Standards d'Ingénierie Python & Django (DINUM / La Suite)
sidebar_label: DINUM Python Standards
description: Règles de développement Python, Django, DRF, sécurité défensive SSRF, typage et tests pour La Suite Numérique et les services publics.
---

Ce skill définit la procédure et les règles à appliquer pour toute création, modification ou revue de code backend (**Python**, **Django**, **Django REST Framework**, **FastAPI**, **pytest**, **Celery**).

---

## 🎯 1. Périmètre d'Activation

Activer ce skill lors d'interventions sur :
- Modules et scripts Python (`.py`)
- Applications Django & Django REST Framework
- Modèles, migrations et requêtes ORM
- Fournisseurs de données et connecteurs d'APIs (`lasuite_sources/providers/`)
- Tâches asynchrones et workers (Celery, background tasks)
- Tests unitaires et d'intégration (`pytest`, `pytest-django`, `responses`)
- Configuration des dépendances (`pyproject.toml`, `requirements.txt`)

---

## 🧭 2. Ordre de Préséance des Règles

1. **Instruction explicite de l'utilisateur**
2. **Consignes `AGENTS.md` / `AGENT.md`**
3. **Configuration du dépôt (`pyproject.toml`, `ruff.toml`, `.flake8`, `pytest.ini`)**
4. **Conventions architecturales du projet existant**
5. **Recommandations du Python Handbook La Suite**
6. **Bonnes pratiques générales de l'écosystème Python / PEP 8**

> ⚠️ **Note sur la longueur de ligne :** Le handbook historique La Suite mentionne 99 caractères (PEP 8 étendu), tandis que les projets modernes peuvent être configurés avec Ruff à 88 caractères. **La configuration du dépôt prime toujours.**

---

## 📋 3. Checklist Obligatoire d'Implémentation

### A. Style, Formatage et Imports
- [ ] Respecter le linter et formateur configuré (Ruff / Black / Flake8).
- [ ] Regrouper les imports selon les 6 sections logiques :
  1. `__future__`
  2. Bibliothèque standard Python
  3. Frameworks (Django, DRF, FastAPI)
  4. Dépendances tierces (`requests`, `pydantic`, etc.)
  5. Modules applicatifs internes du package
  6. Imports relatifs locaux.
- [ ] Aucun import générique avec astérisque (`from module import *`).
- [ ] Aucun `print()` de debug ni code commenté résiduel.

### B. Architecture & Bonnes Pratiques Django
- [ ] Prévention des requêtes $N+1$ via `select_related()` et `prefetch_related()`.
- [ ] Mutations multi-tables encapsulées dans des transactions atomiques (`transaction.atomic`).
- [ ] Migrations de base de données rétrocompatibles et idempotentes.
- [ ] Validation stricte des permissions côté serveur (ne jamais faire confiance au client).

### C. Typage & Documentation
- [ ] Annotations de type (type hints) sur toutes les fonctions publiques.
- [ ] Modélisation explicite de `Optional[T]` / `T | None`.
- [ ] Docstrings explicites décrivant l'intention et les invariants métier.

### D. Sécurité Défensive & Robustesse Réseau
- [ ] Zéro mot de passe ou clé API hardcodée.
- [ ] Validation anti-SSRF obligatoire sur toutes les URLs externes appelées par le serveur.
- [ ] Circuit Breaker et timeouts stricts (ex: 3.5s) sur tous les appels réseau sortants.
- [ ] Gestion fine des exceptions : ne jamais capturer silencieusement `except Exception: pass`.

### E. Tests Automatisés
- [ ] Ajouter ou mettre à jour les tests pytest associés à chaque fonctionnalité.
- [ ] Utiliser `responses` ou `unittest.mock` pour isoler les requêtes HTTP externes.
- [ ] Exécuter `pytest` avec `PYTHONPATH=.` pour valider la suite complète (100% vert).

---

## 🔗 4. Références Officielles

- [La Suite — Python Best Practices](https://github.com/suitenumerique/dev-handbook/blob/main/python.md)
- [La Suite — Security Rules](https://github.com/suitenumerique/dev-handbook/blob/main/security.md)
- [La Suite — Code Reviews](https://github.com/suitenumerique/dev-handbook/blob/main/code-reviews.md)
- [beta.gouv — Standards de Qualité Logicielle](https://standards.beta.gouv.fr/standards)
