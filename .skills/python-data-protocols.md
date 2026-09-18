---
title: Protocoles de Données Souveraines & Intégration de Bibliothèques Python
sidebar_label: Protocoles de Données
description: Bonnes pratiques et patterns pour intégrer les bibliothèques spécialisées de données publiques (ckanapi, pandasdmx, SPARQLWrapper, OWSLib, sodapy) avec clés réelles et fallbacks de mock.
---

Ce skill définit la procédure standardisée pour intégrer, configurer et sécuriser les bibliothèques clientes de protocoles de données publiques (`ckanapi`, `pandasdmx`, `SPARQLWrapper`, `OWSLib`, `sodapy`, `httpx`) au sein de `django-lasuite-sources` lors de la connexion à des APIs gouvernementales réelles en production.

---

## 1. Quand l'utiliser

- Implémentation d'appels clients réels vers des APIs souveraines utilisant des standards ouverts (CKAN, SDMX, SPARQL/RDF, OGC/WFS).
- Configuration des dépendances optionnelles dans `pyproject.toml` (extras) sans alourdir le cœur du package de base.
- Mise en place du pattern bimode : Client de protocole réel authentifié $\leftrightarrow$ Mock certifié de secours hors-ligne.
- Encapsulation des clients tiers avec la sécurité défensive obligatoire (filtrage anti-SSRF, timeout strict de 3.5s, cache Redis SHA-256, circuit breaker).
- _Ne pas utiliser pour :_ de simples intégrations REST sans protocole spécialisé (utiliser [Standards Python DINUM](dinum-python.md)).

---

## 2. Informations à lire

- Classe de base du package : `packages/django-lasuite-sources/lasuite_sources/base.py` (`BaseSourceProvider`).
- Moteur de quotas et circuit breaker : `packages/django-lasuite-sources/lasuite_sources/quota.py` (`DistributedQuotaManager`).
- Validateur de sécurité : `packages/django-lasuite-sources/tests/test_security_ssrf.py` (`is_safe_external_url`).
- Manifeste de dépendances : `packages/django-lasuite-sources/pyproject.toml`.

---

## 3. Procédure Pas à Pas

### Étape 1 : Associer les registres publics aux bibliothèques de protocoles

| Protocole Standard | Bibliothèque Python | Registres & Portails Cibles | Commandes Slash Associées |
|---|---|---|:---:|
| **Open Data CKAN** | `ckanapi` | `data.gouv.fr`, `data.overheid.nl`, `open.canada.ca`, `govdata.de`, `datos.gob.es` | `/opendata`, `/dataoverheid`, `/opencanada`, `/govdata`, `/datosgob` |
| **Données Statistiques SDMX** | `pandasdmx`, `pysdmx` | `Eurostat SDMX API`, `Statistics Canada WDS`, `OECD Data Explorer`, `Destatis Genesis` | `/eurostat`, `/statcan`, `/oecd`, `/destatis` |
| **SPARQL / Linked Data** | `SPARQLWrapper`, `rdflib` | `EUR-Lex / CELLAR`, `data.europa.eu SPARQL endpoint`, `UK Parliament Linked Data` | `/eurlex`, `/dataeuropa`, `/whoiswho` |
| **Géospatial OGC (WFS/WMS)** | `OWSLib` | `INSPIRE Adresses & Cadastre`, `IGN Géoplateforme`, `PDOK / Kadaster BAG` | `/eu-address`, `/eu-cadastre`, `/cadastre` |
| **Open Data Socrata** | `sodapy` | Portails open data utilisant la Socrata Open Data API (SODA) | `/socrata`, `/us-opendata` |
| **OAuth2 / REST** | `httpx`, `requests` | `Légifrance (PISTE)`, `BOAMP`, `Corporations Canada`, `DIP Bundestag` | `/loi`, `/marche`, `/corporation-ca`, `/bundestag` |

---

### Étape 2 : Configurer les dépendances optionnelles dans `pyproject.toml`

Pour conserver la légèreté du package de base `django-lasuite-sources` (< 50 ko), les bibliothèques de protocoles doivent être déclarées en extras optionnels :

```toml
[project.optional-dependencies]
protocols = [
    "httpx>=0.27.0",
    "ckanapi>=4.7.0",
    "pandasdmx>=1.9.0",
    "SPARQLWrapper>=2.0.0",
    "OWSLib>=0.31.0",
    "sodapy>=2.2.0",
    "rdflib>=7.0.0",
]
all = [
    "django-lasuite-sources[protocols,celery]",
]
```

---

### Étape 3 : Implémenter le Pattern Bimode (Live $\leftrightarrow$ Fallback Mock)

Chaque connecteur doit importer paresseusement (*lazy-import*) son client de protocole pour basculer de manière transparente sur les mocks vérifiés en mode déconnecté ou en CI :

```python
import os
import logging
from typing import List, Optional
from lasuite_sources.base import BaseSourceProvider
from lasuite_sources.types import SourceSearchResult, SourceSuggestResult

logger = logging.getLogger(__name__)

class CkanOpenDataSourceProvider(BaseSourceProvider):
    """Provider Open Data exploitant ckanapi avec fallback de mock hors-ligne."""

    source_type = "opendata"
    name = "data.gouv.fr / Open Data"

    def __init__(self):
        self.api_url = os.getenv("DATAGOUV_API_URL", "https://www.data.gouv.fr")
        self.api_key = os.getenv("DATAGOUV_API_KEY", "")
        self.mock_mode = os.getenv("OPENDATA_MOCK_ENABLED", "true").lower() in ("true", "1", "yes")
        self._client = None

    def _get_client(self):
        """Charge le client RemoteCKAN uniquement si le mode live est actif."""
        if self._client is None and not self.mock_mode:
            try:
                from ckanapi import RemoteCKAN
                self._client = RemoteCKAN(self.api_url, apikey=self.api_key, user_agent="Slasher-LaSuite/1.0")
            except ImportError:
                logger.warning("ckanapi non installé ; bascule en mode mock pour %s", self.name)
                self.mock_mode = True
        return self._client

    def is_enabled(self) -> bool:
        return True

    def search(self, query: str, limit: int = 10) -> List[SourceSearchResult]:
        client = self._get_client()
        if client and not self.mock_mode:
            try:
                response = client.action.package_search(q=query, rows=limit)
                return [self._normalize_package(item) for item in response.get("results", [])]
            except Exception as err:
                logger.error("Échec de recherche live CKAN sur %s : %s ; utilisation du mock", self.name, err)

        return self._search_mock(query, limit)
```

---

### Étape 4 : Appliquer la Sécurité Défensive (Anti-SSRF & Circuit Breaker)

1. **Validation Anti-SSRF :** Vérifier systématiquement les noms d'hôtes cibles :
   ```python
   from lasuite_sources.quota import is_safe_external_url

   if not is_safe_external_url(endpoint_url):
       raise ValueError(f"L'URL {endpoint_url} enfreint la politique anti-SSRF.")
   ```
2. **Timeouts Stricts :** Définir un timeout réseau de **$3.5\text{ s}$ maximum** sur tous les drivers de protocoles.
3. **Enregistrement du Circuit Breaker :** Notifier les succès via `quota_manager.record_request_success()` et les erreurs via `quota_manager.record_request_failure()`.

---

## 4. Livrable & Vérification

- Le provider hérite de `BaseSourceProvider` avec import paresseux des bibliothèques de protocoles.
- Les tests unitaires passent à 100% en mode hors-ligne (`PYTHONPATH=. pytest`).
- Aucun secret codé en dur ; clés lues depuis l'environnement (`SLASHER_<PAYS>_<SERVICE>_API_KEY`).
- Les DTOs renvoyés respectent rigoureusement `SourceSearchResult` / `SourceEntityProps`.

---

## 5. Sources & Références

- **Documentation Officielle CKAN :** [https://docs.ckan.org/en/latest/api/](https://docs.ckan.org/en/latest/api/)
- **Documentation SDMX (pandaSDMX) :** [https://pandasdmx.readthedocs.io/](https://pandasdmx.readthedocs.io/)
- **Guide SPARQLWrapper :** [https://rdflib.dev/sparqlwrapper/](https://rdflib.dev/sparqlwrapper/)
- **OWSLib (Services Géospatiaux OGC) :** [https://geopython.github.io/OWSLib/](https://geopython.github.io/OWSLib/)
- **Standards Python DINUM :** [`.skills/dinum-python.md`](dinum-python.md)
- **Gestion des Quotas & Résilience :** [`.skills/quota-resilience.md`](quota-resilience.md)
