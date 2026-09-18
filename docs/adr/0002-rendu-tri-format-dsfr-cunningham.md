# ADR-0002 — Rendu Tri-Format Unifié (Callout, Card, Link)

## Statut
✅ **Accepté**

## Contexte & Problématique
Les sources de données souveraines (Légifrance, BAN, BOAMP, INSEE, RNE, Albert) nécessitent des présentations visuelles variées selon le contexte documentaire : un texte de loi demande un encadré complet avec texte in extenso, une entreprise demande une grille structurée de métadonnées, tandis qu'une citation dans un paragraphe requiert une pastille compacte inline.

## Décision Prise
Implémenter un composant universel BlockNote supportant **3 modes de rendu permutables** :
1. **📢 Encadré (Callout)** : Bordure Marianne gauche 4px (`#000091`), texte intégral et badge de vigueur.
2. **🗂️ Carte (Card)** : Grille 3 colonnes de métadonnées clés.
3. **🔗 Pastille Lien (Link / Inline)** : Badge compact cliquable avec popover flottant au survol/focus.

## Conséquences
- **Positives :**
  - Respect strict des tokens Cunningham et des classes officielles DSFR.
  - Zéro composant tiers lourd (zéro `@mantine/core` dans l'UI finale).
  - Permutation instantanée à chaud via la toolbar du bloc.
- **Compromis :**
  - Nécessité de normaliser les DTOs (`SourceEntityProps`) pour alimenter les 3 formats de façon cohérente.

## Références
- `.skills/dsfr.md`
- `.skills/code-standards.md`
