---
title: Navigation & Layout
description: En-tête Marianne officiel (DSFR Header), navigation latérale, fil d'Ariane, onglets et pied de page républicain pour La Suite numérique.
---

La structure de navigation guide l'utilisateur à travers l'écosystème de **La Suite numérique**. Elle reprend fidèlement les éléments de structure prescrits par le **DSFR**.

---

## 🏛️ 1. L'En-tête Officiel (_Header DSFR_)

L'en-tête est composé de 4 zones normalisées :

1. **Le Bloc Marque officiel :** Logo "RÉPUBLIQUE FRANÇAISE" avec Marianne et devise.
2. **L'Intitulé du Service :** "La Suite numérique" + nom de l'application (Docs, Projects, etc.).
3. **La Barre d'Outils :** Recherche globale, sélecteur de thème sombre/clair, sélecteur d'applications La Suite (_App Switcher_).
4. **Le Menu Utilisateur / Profil :** Avatar, nom de l'agent connecté et lien de déconnexion OIDC.

```html
<!-- Exemple simplifié de Header Marianne -->
<header
  role="banner"
  class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-marianne"
>
  <div
    class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4"
  >
    <!-- Bloc Marque & Titre -->
    <div class="flex items-center gap-4">
      <div
        class="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-700 pr-4"
      >
        République<br />Française
      </div>
      <div class="flex items-center gap-2">
        <span class="font-bold text-lg text-gray-900 dark:text-gray-100"
          >La Suite</span
        >
        <span
          class="text-xs px-2 py-0.5 rounded bg-blue-100 text-[#000091] font-semibold dark:bg-blue-950 dark:text-blue-200"
        >
          Docs
        </span>
      </div>
    </div>

    <!-- Navigation & Profil -->
    <div class="flex items-center gap-3">
      <button
        class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
        aria-label="Changer d'application"
      >
        🔲
      </button>
      <div
        class="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700"
      >
        <span class="text-sm font-medium text-gray-800 dark:text-gray-200"
          >Vincent G.</span
        >
      </div>
    </div>
  </div>
</header>
```

---

## 🍞 2. Fil d'Ariane (_Breadcrumb_)

Le fil d'Ariane permet à l'utilisateur de se repérer dans l'arborescence des dossiers ou des sous-pages :

```html
<nav
  aria-label="Vous êtes ici :"
  class="py-3 text-xs text-gray-500 font-marianne"
>
  <ol class="flex items-center gap-2">
    <li>
      <a href="/" class="hover:underline hover:text-[#000091]">Accueil</a>
    </li>
    <li aria-hidden="true">/</li>
    <li>
      <a href="/04-design-system" class="hover:underline hover:text-[#000091]"
        >Design System</a
      >
    </li>
    <li aria-hidden="true">/</li>
    <li
      aria-current="page"
      class="font-semibold text-gray-900 dark:text-gray-100"
    >
      Navigation & Layout
    </li>
  </ol>
</nav>
```

---

## 📑 3. Onglets de Navigation (_Tabs_)

Les onglets permettent d'alterner entre plusieurs vues d'un même contexte sans recharger la page.

```html
<div class="border-b border-gray-200 dark:border-gray-800 font-marianne">
  <nav class="flex gap-6" aria-label="Onglets de section" role="tablist">
    <button
      role="tab"
      aria-selected="true"
      class="pb-3 border-b-2 border-[#000091] dark:border-[#8585f6] text-[#000091] dark:text-[#8585f6] font-semibold text-sm focus:outline-none"
    >
      Vue Tableau
    </button>
    <button
      role="tab"
      aria-selected="false"
      class="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm focus:outline-none"
    >
      Vue Liste
    </button>
    <button
      role="tab"
      aria-selected="false"
      class="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm focus:outline-none"
    >
      Paramètres
    </button>
  </nav>
</div>
```

---

## 🏛️ 4. Pied de Page Institutionnel (_Footer DSFR_)

Le pied de page comporte obligatoirement :

- La mention de la **DINUM / ANCT**.
- La déclaration de conformité d'accessibilité (**Accessibilité : totalement / partiellement conforme**).
- Le lien vers les mentions légales, la politique de confidentialité et le code source GitHub.
- La licence Open Source du projet (MIT / AGPL).
