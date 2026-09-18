---
title: Standards d'Ingénierie React & Frontend (DINUM / La Suite / DesignGouv)
sidebar_label: DINUM React Standards
description: Règles de développement React, TypeScript, accessibilité RGAA, DSFR et tests pour les applications de La Suite Numérique et beta.gouv.fr.
---

Ce skill définit la procédure et les règles à appliquer pour toute création, modification ou revue de code frontend (**React**, **TypeScript**, **DSFR**, **Cunningham**, **HTML/CSS**, **Tests E2E/Playwright**).

---

## 🎯 1. Périmètre d'Activation

Activer ce skill lors d'interventions sur :
- Composants React (`.tsx`, `.jsx`)
- Modules TypeScript & JavaScript (`.ts`, `.js`)
- Feuilles de style CSS, tokens et thèmes
- Applications Next.js / Vite / Zudoku
- Formulaires, navigations et interactions clavier
- Tests frontend (Vitest, Testing Library, Playwright)

---

## 🧭 2. Ordre de Préséance des Règles

1. **Instruction explicite de l'utilisateur**
2. **Consignes `AGENTS.md` / `AGENT.md`**
3. **Configuration existante du dépôt (`package.json`, `tsconfig.json`, `eslint.config.js`, CI)**
4. **Conventions architecturales établies dans le projet**
5. **Recommandations DINUM / beta.gouv.fr / La Suite**
6. **Bonnes pratiques générales de l'écosystème React**

---

## 📋 3. Checklist Obligatoire d'Implémentation

### A. Inspection Préalable
- [ ] Inspecter `package.json` et les dépendances UI déjà installées.
- [ ] Inspecter la configuration TypeScript et les linters du projet.
- [ ] Réutiliser les primitives existantes (`@codegouvfr/react-dsfr`, Cunningham tokens).
- [ ] Ne jamais ajouter une librairie externe si le projet dispose déjà d'un équivalent.

### B. Qualité TypeScript & Typage
- [ ] **Zéro `any`** : définir des interfaces de domaine claires.
- [ ] **Zéro cast forcé (`as ...`)** sans justification technique documentée.
- [ ] Typer exhaustivement les `props` des composants et les contrats d'API.
- [ ] Modéliser explicitement les états nullables et optionnels.

### C. Architecture des Composants React
- [ ] Composants modulaires à responsabilité unique.
- [ ] État dérivé calculé au rendu plutôt que des `useEffect` synchronisateurs.
- [ ] Prise en compte systématique des états : *Chargement, Succès, Vide, Erreur, Désactivé*.
- [ ] Éviter la mémoïsation prématurée (`useMemo`/`useCallback` non justifiés).

### D. Accessibilité RGAA v4.1 (Niveau AA)
- [ ] Utiliser des balises sémantiques HTML avant d'ajouter des attributs ARIA.
- [ ] Navigation 100% au clavier avec focus visible (`Tab`, `Flèches`, `Échap`, `Entrée`).
- [ ] Présence d'un intitulé accessible explicite sur tous les éléments interactifs (`aria-label` ou texte visible).
- [ ] Les images/icônes décoratives sont masquées aux technologies d'assistance (`aria-hidden="true"`).
- [ ] Ratio de contraste des textes $\ge 4.5:1$.

### E. Tests et Vérification Finale
- [ ] Identifier et mettre à jour les tests existants (Vitest / Playwright).
- [ ] Tester les comportements observables plutôt que les détails d'implémentation.
- [ ] Exécuter `npm run packages:test` ou `npm run test:e2e` avant validation.
- [ ] Vérifier que `npm run docs:build` ou le build de l'application passe sans erreur.

---

## 🔗 4. Références Officielles

- [La Suite Developer Handbook](https://suitenumerique.gitbook.io/handbook)
- [DesignGouv — Mémo Dev RGAA](https://design.numerique.gouv.fr/outils/memo-dev/)
- [beta.gouv — Code source uniforme](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-source-est-uniforme.md)
- [beta.gouv — Tests unitaires et E2E](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-est-instrumente-par-des-tests-unitaires-et-des-tests-e2e.md)
