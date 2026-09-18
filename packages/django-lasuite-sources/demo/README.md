# 🎮 Autonomous Django Sandbox (`demo/`)

This directory provides a **minimal ready-to-run Django application** to test and explore the sovereign connectors in `django-lasuite-sources` without requiring Impress or external infrastructure.

---

## ⚡ 1-Command Quickstart

```bash
# 1. Navigate to demo directory
cd packages/django-lasuite-sources/demo

# 2. Run SQLite migrations
python manage.py migrate

# 3. Launch local development server
python manage.py runserver 8000
```

---

## 🔍 Testable Endpoints

- **Légifrance Law Search:** [http://localhost:8000/api/v1.0/sources/search/?type=law&q=commande+publique](http://localhost:8000/api/v1.0/sources/search/?type=law&q=commande+publique)
- **BAN / Address Autocomplete:** [http://localhost:8000/api/v1.0/sources/suggest/?type=address&q=20+avenue+segur](http://localhost:8000/api/v1.0/sources/suggest/?type=address&q=20+avenue+segur)
- **Company / SIREN Lookup:** [http://localhost:8000/api/v1.0/sources/search/?type=company&q=dinum](http://localhost:8000/api/v1.0/sources/search/?type=company&q=dinum)
- **BOAMP Public Procurement:** [http://localhost:8000/api/v1.0/sources/search/?type=procurement&q=cloud](http://localhost:8000/api/v1.0/sources/search/?type=procurement&q=cloud)
