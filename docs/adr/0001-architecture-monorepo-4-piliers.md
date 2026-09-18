# ADR-0001 — Découplage du Monorepo en 4 Piliers Autonomes

## Statut
✅ **Accepté**

## Contexte & Problématique
Le projet nécessite de coordonner à la fois des packages TypeScript réutilisables, un backend Django pour les connecteurs d'APIs publiques, une documentation bilingue enrichie (Zudoku SSR) et une démo interactive, tout en permettant des contributions légères vers les dépôts amont (`suitenumerique/docs` et `TypeCellOS/BlockNote`).
Intégrer tout le code en dur dans l'application Docs upstream créerait un couplage fort et ralentirait l'adoption par d'autres applications de l'État (Projects, Meet, etc.).

## Décision Prise
Découper le dépôt en **4 piliers modulaires et autonomes** :
1. **Packages souverains distribuables (`packages/`)** : `@suitenumerique/slash-sources-sdk`, `@suitenumerique/blocknote-sources` et `django-lasuite-sources`.
2. **Portail de Documentation (`documentation/`)** : Application Zudoku SSR bilingue (FR pour La Suite / EN pour le standard Slasher).
3. **Démonstrateur Web Standalone (`demo/`)** : Application Vite / React 19 épurée permettant de tester les connecteurs multi-pays en isolation.
4. **Orchestration locale (`Makefile`, Docker Compose)** : Cibles idempotentes pour piloter l'ensemble sans friction.

## Conséquences
- **Positives :**
  - Publication indépendante sur npm et PyPI.
  - Diff d'intégration minimal (< 10 lignes) pour les applications clientes (Docs, Projects).
  - Tests unitaires et E2E isolés et reproductibles en CI.
- **Compromis :**
  - Nécessité d'une orchestration de build via npm workspaces et de scripts de coordination.

## Alternatives Envisagées & Rejetées
- *Intégration directe dans l'arbre Docs (In-Tree)* : Rejetée car elle empêcherait la réutilisation par d'autres ministères ou dans un éditeur tiers.

## Références
- `ARCHITECTURE.md`
- Standards beta.gouv.fr : [Documentation technique](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/les-aspects-techniques-du-produit-sont-documentes.md)
