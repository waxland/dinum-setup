---
title: Revue de Code & Audit de Diff
sidebar_label: Code Review
description: Auditer un diff Git, une Pull Request ou un ensemble de modifications locales sur 3 axes rigoureux (Bugs, Spécifications, Sécurité des secrets).
---

Ce skill définit la procédure standardisée pour auditer un diff Git, identifier des régressions potentielles et s'assurer de la conformité aux standards de La Suite.

---

## 1. Quand l'utiliser

- Revue demandée par l'utilisateur : _"Revois mes changements"_, _"Audite cette PR"_, _"Cherche les régressions"_.
- Vérification avant de soumettre ou de merger une Pull Request sur les dépôts de La Suite.
- Contrôle de non-régression après un refactoring.
- _Ne pas utiliser pour :_ auditer l'architecture générale d'un système sans diff de code (utiliser [Skill Architecture](architecture-review.md)).

---

## 2. Informations à lire

- Le diff Git complet (`git diff`, `git diff --cached` et fichiers non suivis).
- Les conventions du projet ciblé (ESLint, Prettier, Ruff, DSFR).
- Les tickets ou critères d'acceptation dans `TODO_<SUJET>.md` s'ils existent.

---

## 3. Procédure Pas à Pas

### Axe 1 : Bugs & Régressions Potentielles

- [ ] **Gestion des erreurs :** Les exceptions et rejets de promesses sont-ils interceptés proprement ?
- [ ] **Effets de bord :** Une modification dans un composant commun casse-t-elle les autres pages ?
- [ ] **États limites :** Les cas `null`, `undefined`, listes vides ou erreurs réseau sont-ils gérés ?
- [ ] **Hydratation & Rendu :** Pas de tags HTML mal fermés ou de balises `<p>` imbriquées en MDX/React.

### Axe 2 : Respect du Besoin & Spécifications

- [ ] Les fonctionnalités demandées sont-elles intégralement implémentées ?
- [ ] Pas de sur-ingénierie (_YAGNI_) : le code résout-il le problème sans ajouter de complexité inutile ?
- [ ] Les comportements utilisateur attendus sont-ils respectés ?

### Axe 3 : Sécurité des Secrets & Conventions de Code

- [ ] 🔒 **Aucun secret en clair :** Vérifier l'absence de tokens, clés API ou mots de passe privés dans le diff.
- [ ] 🛑 **Zéro `any` & Zéro cast abusif (`as ...`) :** Tout le code TypeScript doit être typé rigoureusement avec des types/interfaces explicites (voir [Skill Code Standards](code-standards.md)).
- [ ] 🎨 **Zéro Tailwind CSS & Zéro `@mantine/core` dans l'UI :** Utilisation exclusive de Cunningham (`<Box>`, `<Card>`, tokens CSS) et du DSFR (`@codegouvfr/react-dsfr`).
- [ ] **Conventions de nommage :** Conventional Commits (`feat:`, `fix:`, `docs:`), exports d'index clairs.
- [ ] **Conformité DSFR & RGAA AA :** Classes `fr-*` officielles, rôles ARIA (`combobox`, `listbox`), navigation clavier.

---

## 4. Livrable & Vérification

Rédiger le compte rendu d'audit (inséré dans `.sessions/AUDIT_<SUJET>.md` si pertinent) ordonné par niveau de gravité :

1. 🔴 **Bloquant (P0) :** Bug critique, fuite de secret, crash de build ou régression majeure.
2. 🟡 **Majeur (P1) :** Problème d'accessibilité RGAA, mauvaise gestion d'erreur ou dette technique.
3. 🟢 **Mineur / Suggestion (P2) :** Amélioration cosmétique, simplification de syntaxe ou commentaire.

**Format d'un constat :**

```text
[Sévérité] Emplacement (fichier:ligne)
- Problème : Explication du comportement inattendu ou du risque.
- Preuve / Scénario : Comment reproduire le problème.
- Solution recommandée : Extrait de code correctif.
```

Si aucun défaut n'est trouvé, l'indiquer explicitement avec la liste des vérifications effectuées.

---

## 5. Sources & Références

- **Guide Conventional Commits :** [Premier Commit](/01-onboarding/02-workflow-et-contribution/guide-du-premier-commit)
- **Sécurité du Poste & Secrets :** [Sécurité Développeur](/01-onboarding/02-workflow-et-contribution/securite-du-poste-developpeur)
