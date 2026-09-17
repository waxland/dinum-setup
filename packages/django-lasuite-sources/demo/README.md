# 🎮 Bac à Sable Autonome Django (`demo/`)

Ce dossier fournit une **application Django minimale prête à l'emploi** pour tester et explorer les 12 connecteurs souverains de `django-lasuite-sources` sans dépendre d'Impress ni d'infrastructure externe.

---

## ⚡ Démarrage en 1 Commande

```bash
# 1. Se positionner dans le dossier demo
cd packages/django-lasuite-sources/demo

# 2. Migrer la base SQLite locale
python manage.py migrate

# 3. Lancer le serveur de développement
python manage.py runserver 8000
```

---

## 🔍 Endpoints Testables Immédiatement

- **Recherche Légifrance :** [http://localhost:8000/api/v1.0/sources/search/?type=law&q=commande+publique](http://localhost:8000/api/v1.0/sources/search/?type=law&q=commande+publique)
- **Autocomplétion BAN / Adresse :** [http://localhost:8000/api/v1.0/sources/suggest/?type=address&q=20+avenue+segur](http://localhost:8000/api/v1.0/sources/suggest/?type=address&q=20+avenue+segur)
- **Fiche Entreprise / SIREN :** [http://localhost:8000/api/v1.0/sources/search/?type=company&q=dinum](http://localhost:8000/api/v1.0/sources/search/?type=company&q=dinum)
- **Marchés Publics BOAMP :** [http://localhost:8000/api/v1.0/sources/search/?type=procurement&q=cloud](http://localhost:8000/api/v1.0/sources/search/?type=procurement&q=cloud)
