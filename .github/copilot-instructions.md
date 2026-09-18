# Instructions GitHub Copilot — Monorepo DINUM / La Suite

> ⚠️ **Consigne Impérative :** Avant toute modification ou analyse dans ce dépôt, **consulter systématiquement le fichier [`AGENTS.md`](./AGENTS.md)** situé à la racine du workspace et appliquer la table de routage des compétences spécialisées (`.skills/`).

---

## 🎯 Ordre de Préséance des Règles

1. **Instruction explicite de l'utilisateur**
2. **Consignes et règles d'ingénierie définies dans [`AGENTS.md`](./AGENTS.md)**
3. **Configuration du dépôt (`package.json`, `tsconfig.json`, `pyproject.toml`, `pytest.ini`)**
4. **Conventions architecturales du projet existant**
5. **Standards DINUM / beta.gouv.fr / La Suite numérique** ([`.skills/dinum-react.md`](../.skills/dinum-react.md) et [`.skills/dinum-python.md`](../.skills/dinum-python.md))
6. **Bonnes pratiques générales de l'écosystème logiciel**

---

## 🏛️ Règles Fondamentales d'Ingénierie

- 🔒 **Secrets & Hygiène :** Ne jamais commiter de mot de passe, clé privée SSH/PGP ou jeton d'API en clair.
- 🛑 **Typage Strict :** Zéro `any`, zéro cast abusif (`as ...`) sans justification documentée.
- 🎨 **Design System :** Utiliser exclusivement `@codegouvfr/react-dsfr` et les tokens Cunningham (`#000091`, `#f5f5fe`, `#e1000f`).
- ♿ **Accessibilité (RGAA v4.1 AA) :** Navigation 100% au clavier sans piège au focus, balises sémantiques HTML, contraste $\ge 4.5:1$.
- 🛡️ **Sécurité Défensive :** Validation anti-SSRF obligatoire sur tous les appels réseau sortants et Circuit Breakers avec timeout strict (3.5s).
- ✅ **Validation Obligatoire :** `npm run docs:build` (0 erreur SSR) et suites de tests automatisés vertes avant toute finalisation.
