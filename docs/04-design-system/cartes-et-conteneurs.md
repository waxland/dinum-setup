---
title: Cartes & Conteneurs
description: Structure des cartes, panneaux d'information, conteneurs de blocs et listes de tâches pour les applications de La Suite numérique.
---

Les **Cartes** et **Conteneurs** permettent de regrouper visuellement des informations et des actions connexes (carte de document dans _Docs_, carte de tâche dans le tableau Kanban de _Projects_, encadré récapitulatif dans _Transfers_).

---

## 🃏 1. Anatomie d'une Carte Standard

Une carte respecte les principes suivants :

- **Surface délimitée :** Fond blanc ou gris très clair avec bordure subtile (`border border-gray-200 dark:border-gray-800`).
- **Zone cliquable unique :** Si la carte est interactive, c'est le lien du titre qui porte l'interaction principale.
- **Hiérarchie interne :**
  1. En-tête : Badge de statut, catégorie ou icône de service.
  2. Titre (`<h3>` ou `<h4>`) et description courte.
  3. Pied de carte : Auteur, avatar, date de modification, compteurs d'activité.

```html
<!-- Exemple de Carte Document / Projet -->
<div
  class="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-[#000091] dark:hover:border-[#8585f6] hover:shadow-md transition-all"
>
  <div class="flex items-center justify-between gap-2 mb-3">
    <span
      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-[#000091] dark:bg-blue-950 dark:text-blue-200"
    >
      Docs
    </span>
    <span class="text-xs text-gray-500">Modifié il y a 2h</span>
  </div>

  <h3
    class="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#000091] dark:group-hover:text-[#8585f6] transition-colors"
  >
    <a href="#" class="focus:outline-none focus:underline">
      <span class="absolute inset-0" aria-hidden="true"></span>
      Cahier des charges DINUM v2
    </a>
  </h3>

  <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
    Spécifications techniques pour le déploiement du SSO ProConnect et
    l'intégration des flux de travail collaboratifs.
  </p>

  <div
    class="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500"
  >
    <div class="flex items-center gap-1.5">
      <div
        class="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]"
      >
        VG
      </div>
      <span>Vincent G.</span>
    </div>
    <span class="flex items-center gap-1">💬 4 commentaires</span>
  </div>
</div>
```

---

## 📋 2. Carte Kanban (_Projects_)

Dans _Projects_, les cartes de tâches supportent le glisser-déposer (_drag and drop_), l'affichage des étiquettes colorées et les échéances :

- **Zone de préhension :** Accessible au clavier (déplacement via raccourcis flèches et `Space`/`Enter`).
- **Indicateur d'échéance :** Code couleur dynamique (vert si dans les temps, rouge si en retard).

---

## 🗂️ 3. Panneaux Rétractables (Accordéons)

Les accordéons permettent de masquer des détails secondaires afin d'alléger la lecture des pages denses.

```html
<details
  class="group border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden my-3"
>
  <summary
    class="flex items-center justify-between p-4 cursor-pointer font-semibold text-sm bg-gray-50 dark:bg-gray-850 hover:bg-gray-100 dark:hover:bg-gray-800 select-none"
  >
    <span>Détails de la configuration réseau Docker</span>
    <span class="transition-transform group-open:rotate-180">▼</span>
  </summary>
  <div
    class="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-sm space-y-2"
  >
    <p>
      Les conteneurs communiquent via le bridge réseau
      <code>dinum_default</code>.
    </p>
  </div>
</details>
```

---

## ♿ 4. Accessibilité des Cartes

1. **Pas de liens imbriqués :** Ne placez jamais un lien `<a>` à l'intérieur d'un autre lien `<a>` ou bouton `<button>`.
2. **Zone cliquable étendue (_Stretched Link_) :** Utilisez la classe `absolute inset-0` sur le lien du titre pour rendre l'ensemble de la carte cliquable sans casser l'arbre d'accessibilité.
