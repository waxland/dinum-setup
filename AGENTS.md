# 🤖 Instructions Générales pour les Agents (`AGENTS.md`)

Ce document définit les règles d'intervention, les normes de sécurité et la table d'orientation vers les **skills spécialisés** pour le dépôt d'orchestration `dinum-setup`.

---

## 🏛️ 1. Périmètre du Dépôt

Le dépôt est composé de trois couches distinctes à ne pas confondre :

1. **Orchestration Racine :** Le `Makefile`, les configurations Docker (`docker-compose*.yml`) et les scripts d'environnement qui coordonnent les services locaux.
2. **Portail Documentaire Zudoku (`documentation/`) :** L'application de documentation (`documentation/docs/`, `documentation/zudoku.config.tsx`, `documentation/zudoku.navigation.tsx`, `documentation/src/components/`, `documentation/public/`).
3. **Dépôts Clones (`src/*`) :** Les applications indépendantes de La Suite (`docs`, `projects`, `meet`, `transfers`, `people`, `accounts`). Chaque application possède sa propre stack (Django, Next.js, Sails, etc.) et ses propres commandes.

---

## 🛡️ 2. Règles Fondamentales & Bonnes Pratiques

- 🔒 **Hygiène des Secrets :** Ne jamais commiter de mot de passe, clé privée SSH/PGP ou jeton en clair. Utiliser systématiquement `.env.example` ou le chiffrement SOPS/age.
- 🛑 **Typage Strict & Pureté UI :** Zéro `any`, zéro type assertion/cast abusif (`as ...`), zéro Tailwind CSS, et zéro `@mantine/core` dans les composants d'interface utilisateur. Utiliser exclusivement le Design System Cunningham (`@openfun/cunningham-tokens`, `<Box>`), le DSFR (`@codegouvfr/react-dsfr`), et `react-aria-components`.
- ♿ **Accessibilité Universelle :** Tout composant ou page web doit respecter les critères **RGAA v4.1 (Niveau AA)** et être utilisable à 100% au clavier sans modale bloquante.
- 🎨 **Design System de l'État :** Utiliser exclusivement les composants officiels `@codegouvfr/react-dsfr`, les tokens Cunningham, et les classes `fr-*` du DSFR.
- 🔄 **Idempotence :** Les scripts et cibles `Makefile` doivent pouvoir être réexécutés sans écraser silencieusement des configurations existantes ni détruire de données locales.
- ✅ **Validation Obligatoire :** Toute modification de la documentation doit être validée par `npm run docs:build` (0 erreur d'hydratation ou de build tolérée).

---

## 🧭 3. Table de Routage des Skills Spécialisés

Avant d'effectuer une tâche, chargez et lisez la procédure détaillée dans le fichier correspondant du dossier `documentation/docs/07-skills/` :

| Intention / Type de Tâche                                                 | Skill à charger       | Fichier                                                                                                                    |
| ------------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Normes TypeScript, Cunningham & Zéro any/cast**                         | `code-standards`      | [`documentation/docs/07-skills/code-standards.mdx`](documentation/docs/07-skills/code-standards.mdx)                       |
| **Composant ou vue DSFR** (Bouton, alerte, formulaire, tokens, thème)     | `dsfr`                | [`documentation/docs/07-skills/dsfr.mdx`](documentation/docs/07-skills/dsfr.mdx)                                           |
| **Audit ou correction d'accessibilité** (Clavier, ARIA, contrastes, RGAA) | `rgaa-review`         | [`documentation/docs/07-skills/rgaa-review.mdx`](documentation/docs/07-skills/rgaa-review.mdx)                             |
| **Orchestration & Démarrage local** (Makefile, Docker, PostgreSQL, ports) | `lasuite-dev`         | [`documentation/docs/07-skills/lasuite-dev.mdx`](documentation/docs/07-skills/lasuite-dev.mdx)                             |
| **Rédaction documentaire MDX** (Zudoku, navigation, composants React)     | `docs-mdx`            | [`documentation/docs/07-skills/docs-mdx.mdx`](documentation/docs/07-skills/docs-mdx.mdx)                                   |
| **Revue de code / PR** (Bugs, régressions, conventions, secrets)          | `code-review`         | [`documentation/docs/07-skills/code-review.mdx`](documentation/docs/07-skills/code-review.mdx)                             |
| **Audit d'architecture** (Couplage, responsabilités, flux temps réel/S3)  | `architecture-review` | [`documentation/docs/07-skills/architecture-review.mdx`](documentation/docs/07-skills/architecture-review.mdx)             |
| **Conception d'évolution** (Nouvelle feature, comparaison d'options, ADR) | `design-change`       | [`documentation/docs/07-skills/design-change.mdx`](documentation/docs/07-skills/design-change.mdx)                         |

---

## 📋 4. Mémoire de Session & Suivi Structuré

Pour toute mission multi-étapes ou complexe, créer ou mettre à jour les fichiers de suivi dans le dossier **`.sessions/`** (inclus dans le `.gitignore`) :

- **`.sessions/RETOUR_EXEC_<SUJET>.md`** : Journal des commandes exécutées, résultats observés, décisions d'arbitrage (`DEC-001`) et point de reprise.
- **`.sessions/AUDIT_<SUJET>.md`** : Relevé des constats (`AUD-001`), sévérités, scénarios de test et preuves de validation.
- **`.sessions/TODO_<SUJET>.md`** : Découpage unitaire des tâches (`T-001`), dépendances et critères d'acceptation observables.
