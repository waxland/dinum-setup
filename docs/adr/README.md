# 🏛️ Architecture Decision Records (ADRs)

Ce dossier rassemble l'ensemble des **Dossiers de Décisions d'Architecture (ADRs)** régissant le monorepo `dinum-setup` et les packages souverains de **La Suite Numérique**.

---

## 🧭 Format Standard d'un ADR

Chaque document de décision respecte la structure suivante :

```markdown
# ADR-XXXX — Titre de la Décision

## Statut
Proposé / Accepté / Obsolète / Remplacé par ADR-YYYY

## Contexte & Problématique
Description des besoins métier, contraintes techniques et forces en présence.

## Décision Prise
Choix architectural retenu et justifications objectives.

## Conséquences
- **Positives :** Bénéfices observés, découplage, maintenabilité, performance.
- **Négatives / Compromis :** Charge de maintenance, dépendances ou contraintes imposées.

## Alternatives Envisagées & Rejetées
Options étudiées et raisons objectives de leur rejet.

## Références
Liens vers les standards DINUM, beta.gouv.fr et pull requests associées.
```

---

## 📋 Index des Décisions d'Architecture

| Référence | Titre de la Décision | Statut | Date | Domaine |
| :--- | :--- | :--- | :--- | :--- |
| **[ADR-0001](0001-architecture-monorepo-4-piliers.md)** | Découplage du Monorepo en 4 Piliers Autonomes | ✅ Accepté | 18/09/2026 | Architecture Système |
| **[ADR-0002](0002-rendu-tri-format-dsfr-cunningham.md)** | Rendu Tri-Format Unifié (Callout, Card, Link) | ✅ Accepté | 18/09/2026 | Frontend & Design System |
| **[ADR-0003](0003-proxy-django-anti-ssrf-circuit-breaker.md)** | Proxy Backend Django avec Anti-SSRF & Circuit Breaker | ✅ Accepté | 18/09/2026 | Sécurité & Réseau |
| **[ADR-0004](0004-dual-trigger-slash-et-mention.md)** | Dual Trigger d'Interlinking (`/` pour Blocs, `@` pour Inline) | ✅ Accepté | 18/09/2026 | UX & BlockNote |
