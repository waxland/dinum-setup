# 🐍 `django-lasuite-sources`

> Application Django autonome et réutilisable pour connecter **La Suite Numérique** et les applications web de l'État aux **Sources de Données Souveraines** (Légifrance, Base Adresse Nationale, BOAMP, Aides-Territoires, INSEE, Annuaire Entreprises, Albert RAG, etc.).

---

## ⚡ Installation & Démarrage Rapide (< 5 min)

```bash
# Avec pip
pip install django-lasuite-sources

# Ou avec uv
uv add django-lasuite-sources
```

### 1. Déclaration dans `settings.py`

```python
INSTALLED_APPS = [
    ...,
    "rest_framework",
    "lasuite_sources",
]

# Optionnel : Paramétrage des connecteurs actifs
LASUITE_SOURCES = {
    "ENABLED_PROVIDERS": [
        "law",          # Légifrance / DILA (PISTE)
        "company",      # Annuaire des Entreprises / RNE
        "parliament",   # Assemblée Nationale (claire.vite)
        "address",      # Base Adresse Nationale (BAN)
        "procurement",  # Marchés Publics & BOAMP
        "grant",        # Subventions & Aides-Territoires
        "insee",        # Statistiques Territoriales INSEE
        "agent",        # Annuaire du Service Public
        "cadastre",     # Cadastre & Parcelles DGFiP
        "demarche",     # Démarches-Simplifiées
        "opendata",     # data.gouv.fr Open Data
        "custom",       # Albert IA Souveraine RAG
    ],
    "CACHE_TTL": 86400,          # 24h par défaut
    "REDIS_CACHE_ALIAS": "default",
}
```

### 2. Inclusion des routes dans `urls.py`

```python
from django.urls import include, path

urlpatterns = [
    ...,
    path("api/v1.0/", include("lasuite_sources.urls")),
]
```

---

## 📡 Endpoints REST Disponibles

- `GET /api/v1.0/sources/search/?type=<type>&q=<query>&limit=10` : Recherche structurée avec mise en cache Redis 24h.
- `GET /api/v1.0/sources/suggest/?type=<type>&q=<query>&limit=5` : Autocomplétion ultra-rapide (< 100ms).
- `GET /api/v1.0/sources/<type>/<source_id>/` : Fiche détaillée vérifiée d'une entité officielle.

---

## 🛡️ Résilience Réseau & Mode Hors-Ligne

Si les clés d'API ministérielles (PISTE, Albert, BOAMP) ne sont pas configurées dans l'environnement local de développement, les connecteurs basculent automatiquement en mode **Mock certifié**, garantissant un développement fluide à 100% sans dépendance externe.
