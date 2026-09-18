---
title: Vue d'ensemble des Skills / Skills Overview
sidebar_label: Vue d'ensemble
description: Catalogue des compétences opérationnelles, bonnes pratiques et procédures spécialisées pour assister les développeurs et les agents IA sur dinum-setup (FR & EN).
---

Ce dossier regroupe les procédures opérationnelles, référentiels et règles d'ingénierie permettant aux développeurs et aux agents d'assistance IA d'intervenir efficacement sur l'écosystème **`dinum-setup`**.

> 🇬🇧 **English documentation available:** All skills are also available in English in [`.skills/en/`](./en/README.md).

Chaque fiche de skill est **100% autonome** et structurée en 5 parties :

1. **Quand l'utiliser / When to use :** Déclencheurs précis et frontières avec les autres compétences.
2. **Informations à lire / Context & Inputs :** Fichiers et contextes requis avant d'agir.
3. **Procédure / Step-by-Step Procedure :** Étapes pas à pas garantissant les bonnes pratiques.
4. **Livrable & Vérification / Deliverables & Verification :** Format du résultat et critères d'acceptation.
5. **Sources :** Références officielles et documentation technique.

---

## 📋 Catalogue des Compétences Disponibles (P0)

| Skill | Rôle & Déclencheur | Fiche FR | English Version | Exemple d'appel / Example prompt |
|---|---|---|---|---|
| **`code-standards`** | Appliquer les règles strictes d'ingénierie (Zéro any, Zéro cast, Zéro Tailwind, Zéro Mantine dans l'UI). | [`code-standards.md`](./code-standards.md) | [`en/code-standards.md`](./en/code-standards.md) | _"Applique le skill Code Standards et nettoie les types de ce composant."_ |
| **`dsfr`** | Créer, styliser ou corriger des composants UI avec le Système de Design de l'État (DSFR & React-DSFR). | [`dsfr.md`](./dsfr.md) | [`en/dsfr.md`](./en/dsfr.md) | _"Applique le skill DSFR et crée un composant de confirmation avec une modale."_ |
| **`rgaa-review`** | Auditer et garantir l'accessibilité numérique selon les 13 thématiques du RGAA v4.1 (AA). | [`rgaa-review.md`](./rgaa-review.md) | [`en/rgaa-review.md`](./en/rgaa-review.md) | _"Applique le skill RGAA et vérifie l'accessibilité clavier de ce formulaire."_ |
| **`lasuite-dev`** | Cloner, préparer les `.env`, gérer les bases PostgreSQL et démarrer les conteneurs locaux. | [`lasuite-dev.md`](./lasuite-dev.md) | [`en/lasuite-dev.md`](./en/lasuite-dev.md) | _"Applique le skill La Suite Dev et aide-moi à lancer Docs et Projects en local."_ |
| **`docs-mdx`** | Rédiger des fiches documentaires MDX, injecter des composants React et régénérer la navigation. | [`docs-mdx.md`](./docs-mdx.md) | [`en/docs-mdx.md`](./en/docs-mdx.md) | _"Applique le skill Docs MDX et ajoute une nouvelle page dans 03-projets."_ |
| **`code-review`** | Auditer un diff Git ou une PR sur 3 axes : régressions, conformité au besoin et sécurité des secrets. | [`code-review.md`](./code-review.md) | [`en/code-review.md`](./en/code-review.md) | _"Applique le skill Code Review et fais la revue de mes modifications en cours."_ |
| **`architecture-review`** | Analyser le couplage, la cohérence des responsabilités et les flux distribués (OIDC, CRDT, S3). | [`architecture-review.md`](./architecture-review.md) | [`en/architecture-review.md`](./en/architecture-review.md) | _"Applique le skill Architecture Review et évalue l'architecture de partage de fichiers."_ |
| **`design-change`** | Concevoir une nouvelle fonctionnalité ou connecteur, comparer des options et formaliser un ADR. | [`design-change.md`](./design-change.md) | [`en/design-change.md`](./en/design-change.md) | _"Applique le skill Design Change et conçois l'ajout de la commande /law dans BlockNote."_ |

---

## 🚀 Comment Invoquer un Skill dans votre Prompt / How to Invoke a Skill

- **Français :** `Lis la fiche .skills/fr/<nom>.md et applique cette procédure à <ma tâche>.`
- **English:** `Read .skills/en/<name>.md and apply this procedure to <my task>.`

