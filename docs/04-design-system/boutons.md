---
title: Boutons & Actions
description: Guide des boutons, variantes (primaire, secondaire, tertiaire, destructif), états interactifs et règles d'accessibilité pour La Suite numérique.
---

Le bouton permet à l'utilisateur de déclencher une action immédiate (soumettre un formulaire, ouvrir une modale, créer un document). Dans **La Suite numérique**, les boutons respectent strictement la hiérarchie visuelle et l'accessibilité du **DSFR**.

---

## 🔘 1. Variantes de Boutons

| Variante                             | Rôle & Usage                                                 | Style Visuel                                                                    | Exemple d'Action                         |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------- | ---------------------------------------- |
| **Primaire (`primary`)**             | Action principale de la page (maximum 1 par vue principale). | Fond Bleu France plein (`#000091`), texte blanc.                                | "Créer un document", "Enregistrer"       |
| **Secondaire (`secondary`)**         | Action importante mais non prédominante.                     | Fond transparent, bordure Bleu France (`1px solid #000091`), texte Bleu France. | "Filtrer", "Télécharger l'export"        |
| **Tertiaire (`tertiary` / `ghost`)** | Action contextuelle ou secondaire discrète.                  | Fond transparent, pas de bordure, texte gris ou bleu.                           | "Annuler", "En savoir plus"              |
| **Destructif (`danger`)**            | Action irréversible ou à fort impact.                        | Fond Rouge Erreur (`#CE0500`), texte blanc ou bordure rouge.                    | "Supprimer le projet", "Révoquer la clé" |

---

## 📏 2. Tailles Disponibles

- **Petit (`sm`) :** Hauteur 32px (`h-8`), padding horizontal `px-3`, texte `14px` (`text-sm`). Utile dans les en-têtes de tableaux ou les barres d'outils denses.
- **Moyen (`md` - Défaut) :** Hauteur 40px (`h-10`), padding horizontal `px-4`, texte `16px` (`text-base`).
- **Grand (`lg`) :** Hauteur 48px (`h-12`), padding horizontal `px-6`, texte `18px` (`text-lg`). Recommandé pour les boutons d'appel à l'action (_Call-to-Action_) sur les pages d'accueil.

---

## 🎯 3. États Interactifs & Focus Accessible

Chaque bouton doit obligatoirement définir des styles distincts pour les états suivants :

1. **Survol (_Hover_) :** Assombrissement ou éclaircissement subtil de la couleur de fond (`bg-blue-800`).
2. **Clic (_Active_) :** Légère diminution d'opacité ou accentuation de la teinte.
3. **Focus Clavier (_Focus-Visible_) :** Anneau de contour visible et contrasté (`outline: 2px solid #000091`, `outline-offset: 2px`).
4. **Désactivé (_Disabled_) :** Opacité réduite (`opacity-50`), curseur non autorisé (`cursor-not-allowed`) et attribut `disabled` ou `aria-disabled="true"`.

---

## 💻 4. Exemples de Code React / Tailwind

### Composant React Réutilisable :

```tsx
import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000091] disabled:opacity-50 disabled:cursor-not-allowed rounded-md";

  const sizeStyles = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#000091] text-white hover:bg-[#1212ff] active:bg-[#2323ff] dark:bg-[#8585f6] dark:text-[#161616] dark:hover:bg-[#a2a2f8]",
    secondary:
      "border border-[#000091] text-[#000091] bg-transparent hover:bg-blue-50 dark:border-[#8585f6] dark:text-[#8585f6] dark:hover:bg-blue-950/30",
    tertiary:
      "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
    danger: "bg-[#CE0500] text-white hover:bg-[#b00400] active:bg-[#900300]",
  };

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
    </button>
  );
};
```

---

## ♿ 5. Bonnes Pratiques d'Accessibilité (RGAA)

- **Bouton vs Lien :** Utilisez `<button>` pour déclencher une action dans la page et `<a>` (avec `href`) pour une navigation vers une autre URL.
- **Bouton d'icône sans texte :** Si le bouton ne contient qu'une icône (ex: croix pour fermer), vous devez obligatoirement lui fournir un label accessible :
  ```html
  <button aria-label="Fermer la boîte de dialogue" class="...">
    <XIcon aria-hidden="true" />
  </button>
  ```
