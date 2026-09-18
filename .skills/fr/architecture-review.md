---
title: Audit d'Architecture
sidebar_label: Architecture Review
description: Analyser, cartographier et évaluer l'architecture distribuée, les flux de données, le couplage et la conformité SecNumCloud.
---

Ce skill fournit la méthodologie pour analyser la robustesse, la cohérence des responsabilités et les flux de communication d'un système distribué dans l'écosystème de La Suite.

---

## 1. Quand l'utiliser

- Audit de la structure globale du dépôt ou d'un projet de La Suite.
- Détection des points de friction, couplages forts ou goulots d'étranglement de performance.
- Analyse des flux d'authentification OIDC/ProConnect, synchronisation CRDT Yjs ou stockage S3.
- _Ne pas utiliser pour :_ concevoir une nouvelle fonctionnalité (utiliser [Skill Design Change](design-change.md)).

---

## 2. Informations à lire

- Vue d'ensemble de l'architecture : [Architecture Globale](/02-architecture/index).
- Schémas et flux : `docs/02-architecture/01-securite-et-identite/`, `02-donnees-et-temps-reel/`, `03-devops-et-deploiement/`.
- Fichiers d'orchestration (`Makefile`, `docker-compose*.yml`) et configurations réseau.

---

## 3. Procédure Pas à Pas

### Étape 1 : Cartographier les responsabilités et les frontières

- Identifier clairement les rôles de chaque brique :
  - **Couche Frontend :** Next.js / React (UI, composants DSFR, gestion d'état client).
  - **Couche Backend / API :** Django / Node.js (logique métier, permissions, validation).
  - **Couche Temps Réel :** Serveurs WebSocket / Yjs CRDT / LiveKit SFU.
  - **Couche Données :** PostgreSQL 16 isolées, Redis pub/sub, buckets S3 souverains.
  - **Couche Identité :** Keycloak SSO / ProConnect OIDC.

### Étape 2 : Évaluer les flux de communication et la résilience

- [ ] **Flux S3 :** Les fichiers lourds transitent-ils par téléversement direct présigné (_Direct Presigned Upload_) ou surchargent-ils les serveurs d'API ?
- [ ] **Temps réel :** Les structures CRDT convergent-elles de manière déterministe sans verrouillage pessimiste ?
- [ ] **Isolation des pannes :** L'indisponibilité d'un microservice (ex: Meet ou Transfers) bloque-t-elle l'accès aux autres applications ?
- [ ] **Sessions OIDC :** Les jetons JWT sont-ils vérifiés correctement et la déconnexion globale (_Backchannel Logout_) est-elle gérée ?

### Étape 3 : Identifier les opportunités d'amélioration minimale

- Rechercher la solution la plus simple et la plus robuste qui élimine la friction sans introduire de complexité superflue.
- Mesurer le rapport coût/bénéfice et la compatibilité ascendante avec les dépôts upstream.

---

## 4. Livrable & Vérification

Rédiger un rapport d'audit d'architecture (dans `.sessions/AUDIT_<SUJET>.md` si pertinent) comportant :

1. **Périmètre & Schéma Mermaid de l'état actuel.**
2. **Tableau des constats d'architecture :**
   | Brique concernée | Friction / Risque observé | Impact opérationnel | Recommandation minimale |
   |---|---|---|---|
3. **Plan de transition par étapes réversibles.**

---

## 5. Sources & Références

- **Architecture de La Suite :** [Architecture Globale](/02-architecture/index)
- **Fédération ProConnect :** [ProConnect](/02-architecture/01-securite-et-identite/federation-identite-proconnect)
- **Temps Réel Yjs :** [CRDT Yjs](/02-architecture/02-donnees-et-temps-reel/temps-reel-et-crdt)
- **Doctrine Cloud au Centre (ANSSI) :** [https://www.numerique.gouv.fr/services/cloud/doctrine/](https://www.numerique.gouv.fr/services/cloud/doctrine/)
