---
title: Conception d'Évolutions & ADR
sidebar_label: Design Change
description: Concevoir une nouvelle fonctionnalité, modéliser des contrats d'interface, comparer des alternatives techniques et formaliser des ADR.
---

Ce skill fournit la méthodologie pour concevoir une évolution technique, comparer des approches et formaliser les décisions d'architecture durables (_Architectural Decision Records_).

---

## 1. Quand l'utiliser

- Conception d'un nouveau module, connecteur ou extension (ex: commande slash `/law` dans BlockNote, intégration LiveKit).
- Choix structurant entre plusieurs approches techniques nécessitant une comparaison argumentée.
- Formalisation d'un arbitrage technique d'équipe (_Architectural Decision Record_).
- _Ne pas utiliser pour :_ une revue de code sur un diff existant (utiliser [Skill Code Review](code-review.md)).

---

## 2. Informations à lire

- Expression du besoin utilisateur et contraintes réglementaires/techniques.
- Code et schémas existants dans `docs/02-architecture/` et `docs/03-projets/`.
- Décisions antérieures consignées dans `.sessions/RETOUR_EXEC_<SUJET>.md` s'il existe.

---

## 3. Procédure Pas à Pas

### Étape 1 : Cadrer le problème et les invariants

- Définir le scénario d'usage cible : _Qui utilise la fonctionnalité ? Quel est le flux attendu ?_
- Fixer les contraintes non négociables (ex: 0 modification de `node_modules`, conformité RGAA v4.1, chiffrement E2EE).

### Étape 2 : Comparer au moins 2 options d'implémentation

Comparer systématiquement :

- **Option A (Évolution minimale / Sans dépendance) :** Extension via points d'accroche existants, adaptateurs locaux.
- **Option B (Architecture dédiée / Nouveaux modules) :** Microservice ou librairie spécialisée.
- Évaluer selon une grille homogène : _Couplage, Facilité de maintenance, Testabilité, Coût de migration, Risque de régression_.

### Étape 3 : Spécifier les contrats d'interface

- Rédiger les signatures de types TypeScript ou endpoints d'API :
  ```typescript
  export interface CommandExtension {
    trigger: string;
    execute: (context: EditorContext) => Promise<BlockResult>;
  }
  ```
- Définir les cas d'erreurs nominaux et dégradés (timeout, service tiers indisponible).

### Étape 4 : Formaliser l'arbitrage (ADR)

Enregistrer la décision dans `.sessions/RETOUR_EXEC_<SUJET>.md` avec la structure standard :

- **`DEC-001` — Titre de la décision**
- **Date & Statut :** Proposé / Accepté / Appliqué / Remplacé
- **Contexte & Options évaluées**
- **Choix retenu & Justification**
- **Conséquences & Condition de réexamen**

---

## 4. Livrable & Vérification

Produire une note de conception claire comprenant :

1. **Recommandation motivée** et synthèse de la solution choisie.
2. **Contrats d'interface (TypeScript / OpenAPI)**.
3. **Plan d'implémentation par tranches de tâches autonomes** (transposables dans `.sessions/TODO_<SUJET>.md`).
4. **Section Décisions mise à jour dans `.sessions/RETOUR_EXEC_<SUJET>.md`**.

---

## 5. Sources & Références

- **Guide d'extension de commande Slash :** [Ajouter une API Souveraine en < 15 min](/08-slash/04-tutoriel-ajouter-une-api)
- **Architecture de Référence :** [Architecture Globale](/02-architecture/index)
- **Méthodologie ADR :** [https://adr.github.io/](https://adr.github.io/)
