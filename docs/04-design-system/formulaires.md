---
title: Formulaires & Saisie
description: Conception de formulaires accessibles, champs de texte, sélecteurs, cases à cocher, boutons radio et validation d'erreurs dans La Suite numérique.
---

Les formulaires constituent le point d'interaction principal entre les utilisateurs et les applications (création de projet, téléversement de fichiers, paramétrage de profil). Leur accessibilité est une exigence absolue du **RGAA**.

---

## 📝 1. Anatomie d'un Champ de Formulaire Accessible

Un champ de saisie ne doit **jamais** reposer uniquement sur un `placeholder`. Il doit comporter :

1. Un **`<label>` explicite** lié au champ via l'attribut `for="id_du_champ"` (ou `htmlFor` en React).
2. Un **texte d'aide (_hint text_)** optionnel pour guider la saisie (associé via `aria-describedby`).
3. Le **champ de saisie (`<input>`, `<select>`, `<textarea>`)**.
4. Un **message d'erreur contextuel** en cas d'échec de validation (lié via `aria-describedby` et `aria-invalid="true"`).

```html
<!-- Exemple de Champ Texte Conforme DSFR -->
<div class="space-y-1.5 font-marianne">
  <label
    for="doc-title"
    class="block text-sm font-medium text-gray-900 dark:text-gray-100"
  >
    Titre du document <span class="text-red-600" aria-hidden="true">*</span>
  </label>
  <span id="doc-title-hint" class="block text-xs text-gray-500">
    Indiquez un titre clair pour faciliter la recherche par vos collaborateurs.
  </span>
  <input
    id="doc-title"
    type="text"
    required
    aria-required="true"
    aria-describedby="doc-title-hint"
    placeholder="Ex: Compte-rendu de réunion DINUM"
    class="w-full h-10 px-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#000091] focus:border-transparent text-sm"
  />
</div>
```

---

## 🔘 2. Contrôles de Choix (Checkbox, Radio & Switch)

### Cases à cocher (_Checkboxes_) & Boutons Radio

- Chaque case à cocher ou bouton radio doit être englobé dans un conteneur `<fieldset>` avec une légende `<legend>` lorsque plusieurs choix sont regroupés.

```html
<fieldset class="space-y-3">
  <legend class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
    Visibilité du document
  </legend>

  <label
    class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
  >
    <input
      type="radio"
      name="visibility"
      value="private"
      class="text-[#000091] focus:ring-[#000091]"
      checked
    />
    <span>Privé (visible uniquement par vous)</span>
  </label>

  <label
    class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
  >
    <input
      type="radio"
      name="visibility"
      value="team"
      class="text-[#000091] focus:ring-[#000091]"
    />
    <span>Équipe (visible par tous les membres du projet)</span>
  </label>
</fieldset>
```

---

## 🛑 3. Gestion des Erreurs de Validation

Lorsqu'un champ est invalide :

- Ajoutez `aria-invalid="true"` sur l'élément input.
- Affichez le message d'erreur en rouge avec une icône explicite.
- Liez l'ID du message d'erreur dans l'attribut `aria-describedby` du champ.

```html
<div class="space-y-1.5">
  <label
    for="email-input"
    class="block text-sm font-medium text-red-700 dark:text-red-400"
  >
    Adresse email professionnelle
  </label>
  <input
    id="email-input"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error-msg"
    value="mauvais-format"
    class="w-full h-10 px-3 border-2 border-[#CE0500] rounded-md bg-red-50/20 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CE0500] text-sm"
  />
  <p
    id="email-error-msg"
    class="text-xs font-medium text-[#CE0500] flex items-center gap-1"
  >
    <span
      >⚠️ L'adresse email saisie n'est pas valide (format attendu :
      nom@domaine.gouv.fr).</span
    >
  </p>
</div>
```

---

## ♿ 4. Checklist RGAA pour les Formulaires

- [x] **Aucun champ sans `<label>` :** Tout contrôle possède une étiquette visible et liée par `for`.
- [x] **Indication des champs obligatoires :** Les champs obligatoires sont signalés visuellement (ex: `*`) et programmés avec `required` et `aria-required="true"`.
- [x] **Groupement sémantique :** Les boutons radios ou cases à cocher associées utilisent `<fieldset>` et `<legend>`.
- [x] **Contour de focus visible :** Le focus clavier ne doit jamais être supprimé (`outline: none` sans remplacement par un anneau visible est interdit).
- [x] **Autocomplétion :** Renseignez l'attribut standard `autocomplete` (ex: `autocomplete="email"`, `autocomplete="username"`).
