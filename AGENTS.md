# 🤖 Instructions Générales pour les Agents (`AGENTS.md`)

Ce document définit les règles d'intervention, les normes de sécurité et la table d'orientation vers les **skills spécialisés** pour le dépôt d'orchestration `dinum-setup`.

---

## 🏛️ 1. Périmètre du Dépôt

Le dépôt est composé de trois couches distinctes à ne pas confondre :

1. **Orchestration Racine :** Le `Makefile`, les configurations Docker (`docker-compose*.yml`) et les scripts d'environnement qui coordonnent les services locaux.
2. **Portail Documentaire Zudoku :** L'application de documentation (`docs/`, `zudoku.config.tsx`, `zudoku.navigation.tsx`, `src/components/`).
3. **Dépôts Clones (`src/*`) :** Les applications indépendantes de La Suite (`docs`, `projects`, `meet`, `transfers`, `people`, `accounts`). Chaque application possède sa propre stack (Django, Next.js, Sails, etc.) et ses propres commandes.

---

## 🛡️ 2. Règles Fondamentales & Bonnes Pratiques

- 🔒 **Hygiène des Secrets :** Ne jamais commiter de mot de passe, clé privée SSH/PGP ou jeton en clair. Utiliser systématiquement `.env.example` ou le chiffrement SOPS/age.
- ♿ **Accessibilité Universelle :** Tout composant ou page web doit respecter les critères **RGAA v4.1 (Niveau AA)** et être utilisable au clavier.
- 🎨 **Design System de l'État :** Utiliser exclusivement les composants officiels `@codegouvfr/react-dsfr` et les classes `fr-*` du DSFR.
- 🔄 **Idempotence :** Les scripts et cibles `Makefile` doivent pouvoir être réexécutés sans écraser silencieusement des configurations existantes ni détruire de données locales.
- ✅ **Validation Obligatoire :** Toute modification de la documentation doit être validée par `npm run docs:build` (0 erreur d'hydratation ou de build tolérée).

---

## 🧭 3. Table de Routage des Skills Spécialisés

Avant d'effectuer une tâche, chargez et lisez la procédure détaillée dans le fichier correspondant du dossier `docs/07-skills/` :

| Intention / Type de Tâche                                                 | Skill à charger       | Fichier                                                                            |
| ------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| **Composant ou vue DSFR** (Bouton, alerte, formulaire, tokens, thème)     | `dsfr`                | [`docs/07-skills/dsfr.mdx`](docs/07-skills/dsfr.mdx)                               |
| **Audit ou correction d'accessibilité** (Clavier, ARIA, contrastes, RGAA) | `rgaa-review`         | [`docs/07-skills/rgaa-review.mdx`](docs/07-skills/rgaa-review.mdx)                 |
| **Orchestration & Démarrage local** (Makefile, Docker, PostgreSQL, ports) | `lasuite-dev`         | [`docs/07-skills/lasuite-dev.mdx`](docs/07-skills/lasuite-dev.mdx)                 |
| **Rédaction documentaire MDX** (Zudoku, navigation, composants React)     | `docs-mdx`            | [`docs/07-skills/docs-mdx.mdx`](docs/07-skills/docs-mdx.mdx)                       |
| **Revue de code / PR** (Bugs, régressions, conventions, secrets)          | `code-review`         | [`docs/07-skills/code-review.mdx`](docs/07-skills/code-review.mdx)                 |
| **Audit d'architecture** (Couplage, responsabilités, flux temps réel/S3)  | `architecture-review` | [`docs/07-skills/architecture-review.mdx`](docs/07-skills/architecture-review.mdx) |
| **Conception d'évolution** (Nouvelle feature, comparaison d'options, ADR) | `design-change`       | [`docs/07-skills/design-change.mdx`](docs/07-skills/design-change.mdx)             |

---

## 📋 4. Mémoire de Session & Suivi Structuré

Pour toute mission multi-étapes ou complexe, créer ou mettre à jour les fichiers de suivi dans le dossier **`.sessions/`** (inclus dans le `.gitignore`) :

- **`.sessions/RETOUR_EXEC_<SUJET>.md`** : Journal des commandes exécutées, résultats observés, décisions d'arbitrage (`DEC-001`) et point de reprise.
- **`.sessions/AUDIT_<SUJET>.md`** : Relevé des constats (`AUD-001`), sévérités, scénarios de test et preuves de validation.
- **`.sessions/TODO_<SUJET>.md`** : Découpage unitaire des tâches (`T-001`), dépendances et critères d'acceptation observables.
