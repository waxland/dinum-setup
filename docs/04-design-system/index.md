---
title: Vue d'Ensemble & Principes DSFR
description: Présentation du Design System de l'État (DSFR), de son intégration dans La Suite numérique et des principes fondamentaux d'ergonomie et d'accessibilité.
---

Le **Design System de La Suite numérique** harmonise l'expérience utilisateur et l'identité visuelle de l'ensemble des applications collaboratives souveraines (Docs, Projects, Meet, Transfers, People, Accounts).

Il s'appuie sur le **Système de Design de l'État (DSFR)** développé par la Direction Interministérielle du Numérique (**DINUM**), garantissant conformité réglementaire, accessibilité universelle et cohérence graphique pour les agents publics et les citoyens.

---

## 🏛️ Les Piliers Fondamentaux

### 1. ♿ Accessibilité Universelle (RGAA 4.1 / WCAG 2.1 AA)

L'accessibilité n'est pas une option : tous les composants sont conçus dès le départ pour être pleinement utilisables au clavier, compatibles avec les lecteurs d'écran (NVDA, VoiceOver, JAWS) et dotés de ratios de contraste supérieurs à 4.5:1.

### 2. 🇫🇷 Identité Républicaine & Confiance

Utilisation des codes visuels officiels de l'État : typographie **Marianne**, palette institutionnelle (**Bleu France**, **Rouge Marianne**), bloc marque officiel et composants normalisés.

### 3. ⚡ Modularité & Performance

Les composants sont construits en TypeScript / React et stylisés via **Tailwind CSS** et des **tokens de design (CSS Custom Properties)**. Ils sont légers, sans dépendance superflue et optimisés pour le rendu côté serveur (SSR) et le temps réel.

### 4. 🌙 Support Natif du Mode Sombre

Chaque couleur, bordure, ombre et surface dispose de son équivalent sémantique sombre, assurant un confort visuel optimal dans tous les contextes d'utilisation.

---

## 🧭 Sommaire des Éléments du Design System

Explorez les guides détaillés de chaque élément du Design System :

| Composant / Thématique      | Description                                                            | Documentation                                 |
| --------------------------- | ---------------------------------------------------------------------- | --------------------------------------------- |
| **🎨 Couleurs & Thèmes**    | Palette Bleu France, couleurs sémantiques, surfaces et mode sombre.    | [Consulter le guide](couleurs-et-themes.md)   |
| **🔤 Typographie**          | Police officielle Marianne, échelle typographique et lisibilité.       | [Consulter le guide](typographie.md)          |
| **🔘 Boutons & Actions**    | Variantes primaire, secondaire, tertiaire, tailles et états focus.     | [Consulter le guide](boutons.md)              |
| **🏷️ Badges & Statuts**     | Puces, tags de filtrage et indicateurs d'état sémantique.              | [Consulter le guide](badges-et-statuts.md)    |
| **📢 Alertes & Callouts**   | Bannières d'information, messages d'erreur, succès et toasts.          | [Consulter le guide](alertes-et-callouts.md)  |
| **📝 Formulaires & Saisie** | Champs texte, sélecteurs, checkboxes, radios et validation accessible. | [Consulter le guide](formulaires.md)          |
| **🃏 Cartes & Conteneurs**  | Cartes Kanban, blocs de documents et panneaux rétractables.            | [Consulter le guide](cartes-et-conteneurs.md) |
| **🧭 Navigation & Layout**  | En-tête Marianne, menus latéraux, fils d'Ariane, onglets et footer.    | [Consulter le guide](navigation-et-layout.md) |
| **✨ Icônes & Visuels**     | Intégration des bibliothèques Remix Icon et Lucide Icons.              | [Consulter le guide](icones.md)               |
| **♿ Accessibilité RGAA**   | Les 13 thématiques du RGAA v4.1 et bonnes pratiques de dev.            | [Consulter le guide](accessibilite-rgaa.md)   |

---

## 📦 Intégration Technique dans les Projets

### 1. Variables CSS Globales (`tokens.css`)

```css
:root {
  /* Couleurs primaires État */
  --blue-france-sun-113: #000091;
  --blue-france-main-525: #6a6af4;
  --red-marianne-425: #e1000f;

  /* Surfaces & Fonds */
  --background-default-grey: #ffffff;
  --background-alt-grey: #f6f6f6;
  --text-default-grey: #161616;
  --border-default-grey: #e5e5e5;
}

[data-theme="dark"] {
  --background-default-grey: #161616;
  --background-alt-grey: #242424;
  --text-default-grey: #f6f6f6;
  --border-default-grey: #3a3a3a;
}
```

### 2. Configuration Tailwind CSS (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        dsfr: {
          blue: {
            france: "#000091",
            hover: "#1212ff",
            active: "#2323ff",
          },
          red: {
            marianne: "#E1000F",
          },
          success: "#18753c",
          error: "#ce0500",
          warning: "#b34000",
          info: "#0063cb",
        },
      },
      fontFamily: {
        marianne: ["Marianne", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;
```
