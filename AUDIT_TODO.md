# 📋 Audit & Plan d'Amélioration : CustomBlock "Link a Doc" & Sovereign Sources (`AUDIT_TODO.md`)

Ce document dresse l'état des lieux des réalisations actuelles, l'analyse comparative avec le composant officiel **`/link-doc` (`Interlinking`)** de **La Suite Docs (Impress)**, et la feuille de route d'implémentation pour unifier le comportement dans BlockNote (Tabs, menu `/`, déclenchement par `@mention`, rendu inline et popover de prévisualisation).

---

## 🔎 1. Revue des Réalisations Récentes

### 1.1. Déploiement Vercel & CI/CD Multi-Projets
- [x] **Architecture 3 Projets Dédiés sur Vercel** :
  - `dinum-docs` : Portail documentaire SSR Zudoku (283 routes pré-rendues, redirection racine `/` $\rightarrow$ `/fr`).
  - `dinum-demo` : Démonstrateur interactif Web standalone sous Vite.
  - `dinum-storybook` : Storybook isolé pour la documentation visuelle des composants BlockNote.
- [x] **Orchestration Makefile** : Cibles `make vercel-login`, `make vercel-init`, `make vercel-status` avec script dédié `scripts/vercel-status.mjs` (affiche les badges temps réel `READY`, `QUEUED`, `BUILDING`, l'âge, la durée et l'URL de déploiement).
- [x] **Hygiène Monorepo & Dépendances** : Storybook v8 installé et testé dans `packages/blocknote-sources`, règles `.gitignore` et `.vercelignore` calibrées.

### 1.2. Refonte Visuelle du Démonstrateur Web (`demo/`)
- [x] **Header Institutionnel** : Intégration du bloc marque officiel **République Française (Marianne)** et du logo **La Suite Docs**.
- [x] **Design System Cunningham & DSFR** : Remplacement des styles génériques par les tokens institutionnels (`--blue-france-sun-113: #000091`, `--blue-france-975: #f5f5fe`, `--red-marianne-425: #e1000f`).
- [x] **Canvas "Feuille de Document"** : Mise en page inspirée de La Suite Docs (titre de document éditable, fil d'Ariane, badges d'état, pied de page).

---

## 🏛️ 2. Analyse Comparative : Modèle `/link-doc` (Impress) vs `SourceBlock`

| Critère d'Expérience Utilisateur | Modèle Officiel `/link-doc` (Impress / Docs) | Implémentation Actuelle (`SourceBlock`) | Écart Identifié & Cible Souhaitée |
| :--- | :--- | :--- | :--- |
| **Type de nœud ProseMirror** | `createReactInlineContentSpec` (Contenu inline au fil du texte) | `createReactBlockSpec` (Bloc complet occupant toute la ligne) | Créer une variante Inline (`SourceInlineContent` / `createReactInlineContentSpec`) pour s'insérer au cœur d'une phrase. |
| **Déclencheurs d'autocomplétion** | Slash menu (`/link-doc`, `/doc`) ET `@` mention (`@titre-du-doc`) | Uniquement le menu Slash (`/loi`, `/entreprise`, `/adresse`...) | Ajouter un **`SuggestionMenuController` sur `@`** en parallèle de `/` pour déclencher la recherche souveraine. |
| **Palette de Recherche (UI/UX)** | Composant Tabs par catégorie + Recherche avec filtre dynamique | Menu d'onglets horizontaux avec barre de recherche | Aligner l'ergonomie sur les **Tabs DSFR** avec filtrage instantané par source/pays. |
| **États du Cycle de Vie** | 1. Recherche (popover) $\rightarrow$ 2. Sélectionné (badge) $\rightarrow$ 3. Annulé | 1. Recherche (popover) $\rightarrow$ 2. Sélectionné (Callout/Card/Link) | Conserver les 3 formats actuels tout en autorisant l'affichage compact badge au fil du texte avec popover au survol. |
| **Interaction au Survol / Clic** | Mini-popover flottant avec aperçu du doc et actions rapides | Toolbar fixe au-dessus du bloc avec boutons de permutation | Ajouter un Popover de détail accessible au survol/focus du badge inline. |

---

## 🚀 3. Checklist des Évolutions à Implémenter (`TODO`)

### 📋 Phase 1 : Système d'Onglets (Tabs) dans la Palette de Recherche
- [x] **Tabs DSFR de Catégories** :
  - [x] Intégrer une navigation par onglets conformes DSFR (`role="tablist"`, `role="tab"`, `aria-selected`).
  - [x] Organiser les catégories en groupes thématiques :
    - 🇫🇷 **Juridique & Institutionnel** : Légifrance (`/loi`), Assemblée nationale (`/assemblee`), Journal Officiel, Albert RAG.
    - 🏢 **Économie & Marchés** : Annuaire Entreprises/RNE (`/entreprise`), BOAMP (`/marche`), Aides & Subventions (`/subvention`).
    - 📍 **Territoires & Données** : Base Adresse (`/adresse`), Cadastre (`/cadastre`), INSEE (`/stats`), data.gouv.fr (`/opendata`), Annuaire (`/agent`), Démarches (`/demarche`).
    - 🤖 **IA Souveraine** : Albert RAG (`/albert`).
- [x] **Filtre par Pays / Presets** : Permettre de basculer d'un onglet national à l'autre (France 🇫🇷, Allemagne 🇩🇪, Pays-Bas 🇳🇱, Espagne 🇪🇸, Union Européenne 🇪🇺).

### 💬 Phase 2 : Déclencheur `@mention` pour les Sources Souveraines
- [x] **Dual Controller BlockNote** :
  - [x] Configurer un `SuggestionMenuController` dédié avec `triggerCharacter="@"`.
  - [x] Permettre la recherche multi-sources directe dès la frappe de `@mot-clé` (ex: `@article L111-1`, `@DINUM`, `@20 avenue de Segur`).
  - [x] Insérer directement l'entité sous forme de **Badge Inline Souverain** dans la phrase courante.

### 🔗 Phase 3 : Composant Inline Content (`SourceInlineContentSpec`)
- [x] **Création du nœud Inline** (`createReactInlineContentSpec`) :
  - [x] Spécification ProseMirror pour un badge inline persistant : `type: "sourceLink"`.
  - [x] Props sérialisées : `entityType`, `sourceId`, `title`, `status`, `url`, `subtitle`, `excerpt`, `verifiedAt`.
- [x] **Rendu Visuel du Badge Inline** :
  - [x] Style DSFR Badge compact : `fr-badge fr-badge--sm fr-badge--info` avec icône officielle de la source (`#000091` / `#f5f5fe`).
  - [x] Rendu accessible au clavier (focus ring visible, rôle `button` accessible).
- [x] **Popover Flottant de Prévisualisation (Hover & Focus)** :
  - [x] Affichage d'une carte d'aperçu au survol ou au focus clavier (Titre, statut de vigueur, extrait, date de synchronisation).
  - [x] Actions rapides intégrées : *Ouvrir la source officielle ↗*, *Copier le lien pérenne 📋*.

### 🧪 Phase 4 : Tests E2E, RGAA & Documentation
- [x] **Tests E2E Playwright** :
  - [x] Test d'insertion via `@mention` au clavier.
  - [x] Test de navigation dans les Tabs de la palette de recherche.
  - [x] Test du popover au survol du badge inline (4/4 tests passés).
- [x] **Vérification RGAA v4.1 (AA)** :
  - [x] 100% navigable au clavier sans blocage.
  - [x] Contrastes de texte conformes ($\ge 4.5:1$).
- [x] **Mise à jour de la documentation Zudoku & Démo** :
  - [x] Intégration du composant `@mention` et des Tabs dans le démonstrateur et le portail documentaire.
