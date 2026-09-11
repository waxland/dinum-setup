---
title: DSFR officiel
description: Intégration du Système de Design de l'État (DSFR) dans la documentation.
---

# Système de Design de l'État (DSFR)

La documentation de ce dépôt intègre le paquet officiel `@gouvfr/dsfr` afin de respecter la charte graphique de l'État français.

## Paquets installés

- `@gouvfr/dsfr` (v1.15.3) : Contient l'ensemble des styles CSS officiels (typographie, couleurs, boutons, navigation, tableaux).

## Intégration dans Zudoku

L'intégration est configurée dans `zudoku.config.tsx` :

```tsx
import "@gouvfr/dsfr/dist/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/utility.min.css";
import "./zudoku.theme.css";
```

Le fichier `zudoku.theme.css` adapte la coquille de navigation Zudoku pour utiliser les variables CSS officielles du DSFR (comme `--background-action-low-blue-france`, `--text-action-high-blue-france`, `--text-title-grey`).

## Références utiles

- [Documentation officielle du DSFR](https://www.systeme-de-design.gouv.fr/)
- [Dépôt GitHub du DSFR](https://github.com/GouvernementFR/dsfr)
