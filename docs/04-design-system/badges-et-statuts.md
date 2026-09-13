---
title: Badges, Tags & Statuts
description: Composants d'état, badges sémantiques, puces indicatrices et tags de filtrage pour les applications de La Suite numérique.
---

Les **Badges** et **Tags** permettent d'afficher de manière synthétique un état, une catégorie, une version ou un statut d'activité dans les tableaux, cartes et listes.

---

## 🏷️ 1. Badges de Statut Sémantiques

Les badges sémantiques utilisent des teintes contrastées pour signaler l'état d'un élément (document, tâche Kanban, conteneur ou utilisateur).

| Statut                      | Rôle & Usage                                  | Style Clair                                                  | Style Sombre                        | Exemple d'Usage                |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------ | ----------------------------------- | ------------------------------ |
| **Succès (Success)**        | Validé, en ligne, terminé, actif.             | Fond vert clair (`#b8fec9`), texte vert foncé (`#18753C`).   | Fond vert sombre, texte vert vif.   | `Actif`, `Terminé`, `200 OK`   |
| **Erreur (Error)**          | Échec, arrêté, bloqué, rejeté.                | Fond rouge clair (`#ffe8e5`), texte rouge foncé (`#CE0500`). | Fond rouge sombre, texte rouge vif. | `Échec`, `Bloqué`, `500 Error` |
| **Avertissement (Warning)** | En attente, révision requise, bientôt expiré. | Fond ambre clair (`#ffe9e6`), texte ambre foncé (`#B34000`). | Fond ambre sombre, texte ambre vif. | `En attente`, `À réviser`      |
| **Information (Info)**      | Nouveauté, information neutre, version.       | Fond bleu clair (`#e8edff`), texte bleu France (`#000091`).  | Fond bleu sombre, texte bleu clair. | `Nouveau`, `v2.4.0`, `Beta`    |
| **Neutre (Default)**        | Brouillon, archivé, non assigné.              | Fond gris clair (`#eeeeee`), texte gris foncé (`#3a3a3a`).   | Fond gris sombre, texte gris clair. | `Brouillon`, `Archivé`         |

---

## 🔘 2. Puces Indicatrices (_Status Dots_)

Les puces d'état sont de petits cercles colorés (8px à 10px) placés à côté d'un texte ou d'un avatar pour indiquer la disponibilité ou la santé d'un service.

```html
<!-- Service en ligne -->
<span
  class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300"
>
  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
  PostgreSQL en ligne
</span>

<!-- Service arrêté -->
<span
  class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300"
>
  <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
  Arrêté
</span>
```

---

## 🏷️ 3. Tags Cliquables & Filtres

Les **Tags** sont interactifs et permettent à l'utilisateur d'activer ou de désactiver des filtres dans une vue (ex: filtrer les cartes par étiquette dans _Projects_).

```tsx
interface TagProps {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  label,
  selected = false,
  onToggle,
  onRemove,
}) => {
  return (
    <span
      onClick={onToggle}
      role="button"
      tabIndex={0}
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
        selected
          ? "bg-[#000091] text-white"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-75 focus:outline-none"
          aria-label={`Supprimer le tag ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
};
```

---

## ♿ 4. Accessibilité RGAA des Badges

1. **Ne pas dépendre uniquement de la couleur :** Un badge d'erreur doit afficher le mot "Erreur" ou "Échec", pas seulement une pastille rouge.
2. **Contraste de texte :** Veillez à ce que le ratio de contraste entre le texte du badge et son fond soit toujours supérieur à **4.5:1**.
