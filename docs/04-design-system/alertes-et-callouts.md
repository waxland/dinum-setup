---
title: Alertes & Callouts
description: Bannières d'alerte, messages contextuels, callouts informatifs et notifications temporaires pour La Suite numérique.
---

Les **Alertes** et **Callouts** permettent de transmettre des messages cruciaux à l'utilisateur : confirmation d'action, avertissement de sécurité, erreur de traitement ou information légale.

---

## 📢 1. Variantes d'Alertes

| Variante                        | Rôle                                                          | Icône Recommandée | Bordure / Fond                                           |
| ------------------------------- | ------------------------------------------------------------- | ----------------- | -------------------------------------------------------- |
| **Information (`info`)**        | Conseils d'utilisation, prérequis, contexte neutre.           | `Info`            | Bordure Bleu France (`#000091`), fond bleuté très clair. |
| **Succès (`success`)**          | Confirmation de création, validation, sauvegarde réussie.     | `CheckCircle`     | Bordure Verte (`#18753C`), fond vert clair.              |
| **Avertissement (`warning`)**   | Attention requise, action critique imminente, session courte. | `AlertTriangle`   | Bordure Ambre (`#B34000`), fond ambre clair.             |
| **Erreur (`error` / `danger`)** | Blocage, échec de requête, rejet de validation.               | `AlertOctagon`    | Bordure Rouge (`#CE0500`), fond rouge clair.             |

---

## 🏗️ 2. Structure d'une Alerte Conforme DSFR

Une alerte complète comprend :

1. Une **icône** illustrative (décorative avec `aria-hidden="true"`).
2. Un **titre en gras** résumant l'information.
3. Un **corps de texte** explicatif.
4. Une **action contextuelle** optionnelle (bouton ou lien).
5. Un **bouton de fermeture** optionnel (si l'alerte est fermable).

```html
<!-- Exemple d'Alerte Information -->
<div
  class="border-l-4 border-[#000091] bg-blue-50 dark:bg-blue-950/40 p-4 rounded-r-md flex items-start gap-3 my-4"
  role="status"
>
  <svg
    class="w-5 h-5 text-[#000091] dark:text-[#8585f6] shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
  <div class="space-y-1">
    <h4 class="text-sm font-bold text-[#000091] dark:text-[#8585f6]">
      Authentification requise
    </h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">
      Votre session locale a expiré. Veuillez vous reconnecter via Keycloak pour
      continuer à modifier ce document.
    </p>
  </div>
</div>
```

---

## 💡 3. Callouts dans la Documentation (Zudoku / MDX)

Dans vos fichiers de documentation Markdown (`.md` / `.mdx`), vous pouvez utiliser les balises callouts intégrées pour mettre en valeur les remarques :

```markdown
:::info
Ce dépôt orchestre les services de La Suite en local.
:::

:::tip
Utilisez `make docs-dev` pour tester vos modifications en direct.
:::

:::caution
Ne supprimez jamais la couche d'authentification Keycloak dans le code source.
:::
```

---

## ♿ 4. Règles d'Accessibilité (ARIA)

- **Rôle ARIA selon l'urgence :**
  - Utilisez `role="status"` ou `aria-live="polite"` pour les messages d'information et de succès (lus par le lecteur d'écran dès que la synthèse vocale est libre).
  - Utilisez `role="alert"` ou `aria-live="assertive"` pour les erreurs bloquantes ou les alertes de sécurité (interrompt immédiatement la lecture en cours).
- **Titres de niveau approprié :** Si l'alerte est insérée dans le flux du document, assurez-vous que son titre s'intègre harmonieusement dans l'arbre d'accessibilité.
