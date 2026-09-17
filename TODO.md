# 📋 Feuille de Route & Plan d'Action Opérationnel (`TODO.md`)

Ce document constitue le **plan de travail exhaustif et actionnable** issu de l'audit approfondi de **La Suite Docs** (`AUDIT.md`). Il détaille l'ensemble des tâches unitaires, des fichiers à créer/modifier, des contrats d'interface et des critères d'acceptation pour industrialiser le **Socle Universel des Commandes Slash** dans le produit officiel [`suitenumerique/docs`](https://github.com/suitenumerique/docs).

---

## 🧭 1. Vue d'Ensemble des Épics & Jalons

```mermaid
flowchart TD
    subgraph Epic1["ÉPIC 1 (P0) : Frontend Impress (Cunningham & BlockNote)"]
        F1["T-01 : Module SourceBlock (CustomBlock)"]
        F2["T-02 : SourceSearchPopover (QuickSearch / cmdk)"]
        F3["T-03 : 3 Formats DSFR (Callout, Card, Link)"]
        F4["T-04 : Enregistrement dans BlockNoteSuggestionMenu"]
    end

    subgraph Epic2["ÉPIC 2 (P0) : Backend Django 5 & Provider Registry"]
        B1["T-05 : Classe abstraite BaseSourceProvider"]
        B2["T-06 : SourceProviderRegistry & Cache Redis 24h"]
        B3["T-07 : Connecteurs PISTE (Loi) & BAN (Adresse)"]
        B4["T-08 : Connecteurs Entreprise & Assemblée"]
        B5["T-09 : Endpoint Feature Flagging /api/v1.0/config/"]
    end

    subgraph Epic3["ÉPIC 3 (P0) : Recette E2E, RGAA & Sécurité"]
        Q1["T-10 : Tests E2E Playwright (Autocomplétion & Yjs)"]
        Q2["T-11 : Audit Accessibilité RGAA v4.1 (@axe-core)"]
    end

    subgraph Epic4["ÉPIC 4 (P1) : Export Documentaire & Veille Asynchrone"]
        E1["T-12 : Convertisseurs @blocknote/xl-exporters (PDF/ODT/DOCX)"]
        E2["T-13 : Tâche Celery de veille d'abrogation juridique"]
    end

    subgraph Epic5["ÉPIC 5 (P2) : IA Souveraine & SDK Développeur"]
        S1["T-14 : Connecteur RAG Albert API (DINUM)"]
        S2["T-15 : SDK Développeur pour les ministères partenaires"]
    end

    Epic1 --> Epic3
    Epic2 --> Epic3
    Epic3 --> Epic4
    Epic4 --> Epic5
```

---

## 🎯 ÉPIC 1 (Priorité P0) : Implémentation Frontend Impress (100% Cunningham + BlockNote)

*Cible : `src/docs/src/frontend/apps/impress/src/`*  
*Références Design : [Figma Docs Officiel](https://www.figma.com/design/qdCWR4tTUr7vQSecEjCyqO/Docs?node-id=9722-19469&p=f&t=r1O6Np4JgTbRWrCR-0) • [Storybook Cunningham](https://suitenumerique.github.io/cunningham/storybook/?path=/story/components-loader-wip--medium) • [Figma UI Kit](https://www.figma.com/community/file/1562860630562131728/lasuite-ui-kit)*

### [x] T-01 — Création des types et interfaces TypeScript
- **Fichier créé :** `src/features/docs/doc-editor/components/custom-blocks/SourceBlock/types.ts`
- **Spécifications :**
  - Définit `SourceEntityType` (`'law' | 'company' | 'parliament' | 'address' | 'custom'`).
  - Définit `DisplayMode` (`'callout' | 'card' | 'link'`).
  - Définit l'interface complète `SourceEntityProps` (titre, sous-titre, statut, métadonnées 1-3, extrait HTML, résumé, URL).
- **Critère d'acceptation :** 100% typé sous TypeScript strict sans `any`.

---

### [x] T-02 — Composant de Recherche Popover (`SourceSearchPopover.tsx`)
- **Fichier créé :** `src/features/docs/doc-editor/components/custom-blocks/SourceBlock/SourceSearchPopover.tsx`
- **Spécifications :**
  - Intègre les composants standardisés basés sur **`cmdk`** et la palette Cunningham.
  - Encapsule la recherche dans un `<Popover opened={isOpen}>` flottant sous le curseur.
  - Onglets de sélection de source avec composants Cunningham (`⚖️ Loi`, `🏢 Entreprise`, `🏛️ Assemblée`, `📍 Adresse`).
  - Gestion du focus automatique au montage (`inputRef.current.focus()`).
  - Navigation complète au clavier : `↑` `↓` pour naviguer, `Entrée` pour insérer, `Échap` pour annuler sans laisser de bloc vide.
- **Critère d'acceptation :** Zéro modale intrusive ; expérience fluide 100% Cunningham calquée sur `Interlinking/SearchPage.tsx`.

---

### [x] T-03 — Composants de Rendu des 3 Formats Cunningham (`Callout`, `Card`, `Link`)
- **Dossier créé :** `src/features/docs/doc-editor/components/custom-blocks/SourceBlock/formats/`
- **Fichiers :**
  1. `SourceCalloutFormat.tsx` : Encadré officiel stylé avec `<Box>` et bordure gauche Marianne (`var(--c--globals--colors--brand-primary)`), extrait textuel in extenso, badge de statut et lien externe.
  2. `SourceCardFormat.tsx` : Carte horizontale Cunningham (`<Card>`) avec grille à 3 colonnes de métadonnées construite avec `<Box $direction="row" $gap="sm">`.
  3. `SourceLinkFormat.tsx` : Badge compact inline cliquable dans la phrase avec mini-popover de détail au survol (modèle `LinkSelected.tsx`).
  4. `SourceBlockToolbar.tsx` : Barre d'outils flottante au survol construite avec `<Box>` et `<BoxButton>` permettant de basculer en direct entre les formats Callout, Carte et Lien.
- **Conventions de style obligatoires :** Utiliser exclusivement le conteneur polymorphique `<Box>` (`src/components/Box.tsx`) et les tokens CSS Cunningham (`var(--c--globals--...)`).
- **Critère d'acceptation :** Support parfait du mode sombre via le store Zustand `useCunninghamTheme()`.

---

### [x] T-04 — Factory `SourceBlock` & Enregistrement dans le Menu Slash
- **Fichiers modifiés / créés :**
  1. `src/features/docs/doc-editor/components/custom-blocks/SourceBlock/SourceBlock.tsx` : Implémentation de la factory function `SourceBlock()` via `createReactBlockSpec`.
  2. `src/features/docs/doc-editor/components/custom-blocks/index.ts` : Export de `SourceBlock`.
  3. `src/features/docs/doc-editor/components/BlockNoteEditor.tsx` : Ajout de `sourceBlock: SourceBlock()` dans `baseBlockNoteSchema`.
  4. `src/features/docs/doc-editor/components/BlockNoteSuggestionMenu.tsx` : Déclaration des items du menu slash (`/loi`, `/entreprise`, `/assemblee`, `/adresse`) avec leurs icônes et alias dans le groupe *« Sources Souveraines »*.
- **Critère d'acceptation :** La saisie de `/loi` ou `/adresse` ouvre instantanément la palette d'autocomplétion.

---

## 🐍 ÉPIC 2 (Priorité P0) : Backend Django 5 & Provider Registry

*Cible : `src/docs/src/backend/core/`*

### [x] T-05 — Contrat d'Interface `BaseSourceProvider`
- **Fichier créé :** `src/backend/core/sources/base.py`
- **Spécifications :**
  - Définition de la classe abstraite `BaseSourceProvider(ABC)` avec les méthodes obligatoires :
    - `is_enabled() -> bool` (contrôle des clés d'environnement).
    - `suggest(query: str, limit: int = 5) -> list[dict]` (autocomplétion rapide < 100ms).
    - `search(query: str, limit: int = 10) -> list[SourceSearchResult]` (recherche structurée).
    - `get_detail(source_id: str) -> Optional[SourceSearchResult]` (fiche complète).
  - Définition du `TypedDict` normalisé `SourceSearchResult` et `SourceSuggestResult` dans `types.py`.
- **Critère d'acceptation :** Typage Python 3.12+ strict.

---

### [x] T-06 — Singleton `SourceProviderRegistry` & Mise en Cache Redis
- **Fichier créé :** `src/backend/core/sources/registry.py`
- **Spécifications :**
  - Mise en place du registre central des providers (`register(provider)`, `get_provider(source_type)`).
  - Implémentation de la mise en cache Redis automatique sur les clés `source:search:{type}:{hash}` avec TTL de 24h (86400 secondes).
  - Tolérance aux pannes réseau (Circuit Breaker et fallback mock).
- **Critère d'acceptation :** Temps de réponse en cache < 5ms.

---

### [x] T-07 — Connecteurs `LawSourceProvider` (Légifrance) & `AddressSourceProvider` (BAN)
- **Fichiers créés :**
  1. `src/backend/core/sources/providers/law.py` : Authentification PISTE, recherche et suggest, mapping `LODA`, `CODE` et `JORF`.
  2. `src/backend/core/sources/providers/address.py` : Interrogation de `https://api-adresse.data.gouv.fr/search`, extraction GeoJSON des coordonnées GPS et code INSEE.
- **Critère d'acceptation :** Mode Mock activable via `PISTE_MOCK_ENABLED=true` pour le développement local.

---

### [x] T-08 — Connecteurs `CompanySourceProvider` & `ParliamentSourceProvider`
- **Fichiers créés :**
  1. `src/backend/core/sources/providers/company.py` : Interrogation Pappers / API Entreprise, détection des procédures collectives (*In Bonis*).
  2. `src/backend/core/sources/providers/parliament.py` : Interrogation de l'API `claire.vite` / Tricoteuse, suivi des amendements et sorts (*Adopté*, *Rejeté*).
- **Critère d'acceptation :** Fixtures de test réalistes incluses pour le mode hors-ligne.

---

### [x] T-09 — Vues DRF & Feature Flagging d'Environnement
- **Fichiers créés / modifiés :**
  1. `src/backend/core/sources/views.py` : `SourceSearchView`, `SourceSuggestView`, `SourceDetailView`.
  2. `src/backend/core/sources/urls.py` : Enregistrement des routes d'API.
  3. `src/backend/core/urls.py` : Inclusion des routes sources.
  4. `src/backend/core/api/viewsets.py` : `ConfigView` enrichi avec `SOURCES_ENABLED_TYPES`.
- **Critère d'acceptation :** Expose la liste des providers actifs dans la réponse `/config/`.

---

## 🧪 ÉPIC 3 (Priorité P0) : Recette E2E, Accessibilité RGAA & CI/CD

*Cible : `src/docs/src/frontend/apps/e2e/__tests__/app-impress/`*

### [x] T-10 — Scénarios de Test E2E Playwright (`doc-slash-sources.spec.ts`)
- **Fichier créé :** `src/docs/src/frontend/apps/e2e/__tests__/app-impress/doc-slash-sources.spec.ts`
- **Scénarios automatisés couverts :**
  1. *Scénario 1 :* Frappe de `/loi` $\rightarrow$ ouverture du popover $\rightarrow$ saisie de « commande publique » $\rightarrow$ sélection du 1er résultat avec `Entrée` $\rightarrow$ vérification de la présence de l'encadré Callout avec le texte de l'article L. 111-1.
  2. *Scénario 2 :* Clic sur le bouton « Format Carte » dans la barre d'outils flottante $\rightarrow$ vérification du passage au format Card 3 colonnes.
  3. *Scénario 3 :* Clic sur « Format Lien » $\rightarrow$ vérification de la présence de la pastille inline dans le paragraphe.
  4. *Scénario 4 :* Annulation avec `Échap` sans laisser de bloc corrompu.
- **Critère d'acceptation :** Scénarios Playwright rédigés conformément à l'infrastructure existante.

---

### [x] T-11 — Audit d'Accessibilité RGAA v4.1 & Tests Backend
- **Fichier créé :** `src/docs/src/backend/core/tests/test_api_sources.py`
- **Vérifications :**
  - Rôles ARIA (`role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`).
  - Navigation au clavier complète (`↑`, `↓`, `Entrée`, `Échap`).
  - Tests unitaires et d'intégration DRF validés.
- **Critère d'acceptation :** 100% de couverture sur les endpoints de recherche et le registre.

---

## 📦 ÉPIC 4 (Priorité P1) : Export Documentaire & Veille Asynchrone

### [x] T-12 — Intégration des Exportateurs de Documents (PDF / ODT / DOCX)
- **Fichiers créés / modifiés :**
  - `src/features/docs/doc-export/blocks-mapping/sourceBlockPDF.tsx`
  - `src/features/docs/doc-export/blocks-mapping/sourceBlockDocx.tsx`
  - `src/features/docs/doc-export/blocks-mapping/sourceBlockODT.tsx`
  - `src/features/docs/doc-export/blocks-mapping/index.ts`
  - `src/features/docs/doc-export/mappingPDF.tsx`, `mappingDocx.tsx`, `mappingODT.ts`
- **Spécifications :**
  - Mappe le `sourceBlock` vers une table ou un encadré stylé dans le document PDF généré (bordure bleue Marianne `#000091`, métadonnées, extrait).
  - Conserve les hyperliens officiels et les mentions d'état de vigueur dans les exports LibreOffice (`.odt`) et Microsoft Word (`.docx`).
- **Critère d'acceptation :** L'export d'une note contenant un bloc `/loi` ou `/entreprise` produit un PDF paginé fidèle sans débordement.

---

### [x] T-13 — Tâche Celery de Veille d'Abrogation Juridique
- **Fichier créé :** `src/backend/core/sources/tasks.py`
- **Spécifications :**
  - Tâche nocturne `check_laws_validity_task()` analysant les documents modifiés dans les 30 derniers jours.
  - Interrogation batch du registre et de l'API Légifrance pour détecter si les `sourceId` (`LEGIARTI...`) sont passés à l'état `ABROGE`.
  - Enregistrement des synthèses d'exécution dans le cache Redis (`sources:law_validity_last_run`).
- **Critère d'acceptation :** Exécution asynchrone sans impact sur les performances de l'API web.

---

## 🌐 ÉPIC 5 (Priorité P2) : IA Souveraine Albert & Écosystème Partenaires

### [x] T-14 — Connecteur RAG Albert API (IA Souveraine DINUM / Etalab)
- **Fichier créé :** `src/backend/core/sources/providers/albert.py`
- **Spécifications :**
  - Branchement sur le cluster souverain Albert API (`https://albert.api.etalab.gouv.fr/v1`).
  - Permet aux agents de poser une question administrative (*« Quel est le préavis de démission d'un contractuel ? »*) et de recevoir une synthèse sourcée avec les articles applicables.
  - Auto-enregistrement dans `core/sources/providers/__init__.py`.
- **Critère d'acceptation :** Citations précises des articles avec mode hors-ligne mock.

---

### [x] T-15 — SDK Développeur & Documentation d'Extension Ministérielle
- **Livrables :**
  - Package `@suitenumerique/slash-sources-sdk` dans `src/docs/src/frontend/packages/slash-sources-sdk/`.
  - Helper `defineSourceProvider()` pour garantir un typage TypeScript strict.
  - Documentation pas-à-pas pour brancher une nouvelle source souveraine ministérielle en < 15 minutes.
- **Critère d'acceptation :** Un développeur externe peut brancher une nouvelle source en moins de 15 minutes.

---

## �️ ÉPIC 6 (Priorité P1) : Commande `/marche` (Marchés Publics & BOAMP)

### [x] T-16 — Connecteur `ProcurementSourceProvider` (API BOAMP / DILA)
- **Fichier créé :** `src/backend/core/sources/providers/procurement.py`
- **Spécifications :** Connecteur aux avis d'appels publics à la concurrence (AAPC), critères d'attribution, montants estimés et procédures (MAPA/Appels d'offres).

---

## 💶 ÉPIC 7 (Priorité P1) : Commande `/subvention` (Aides-Territoires & Fonds Vert)

### [x] T-17 — Connecteur `GrantSourceProvider` (API Aides-Territoires / ANCT)
- **Fichier créé :** `src/backend/core/sources/providers/grant.py`
- **Spécifications :** Connecteur aux aides publiques d'État (Fonds Vert, DETR, DSIL) avec calcul des taux de subvention maximaux et dates de clôture.

---

## 📊 ÉPIC 8 (Priorité P1) : Commande `/stats` (Données Territoriales INSEE)

### [x] T-18 — Connecteur `InseeSourceProvider` (API Données Locales INSEE)
- **Fichier créé :** `src/backend/core/sources/providers/insee.py`
- **Spécifications :** Indicateurs officiels de population municipale, densité d'habitants et emploi par commune ou code INSEE.

---

## 📊 Matrice d'Avancement des Tâches

| ID | Intitulé de la Tâche | Épic | Priorité | Responsable | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **T-01** | Typage TypeScript `SourceEntityProps` & `DisplayMode` | Épic 1 (Front) | **P0** | Dev Front | ✅ Terminé |
| **T-02** | Composant `SourceSearchPopover` (QuickSearch/cmdk) | Épic 1 (Front) | **P0** | Dev Front | ✅ Terminé |
| **T-03** | Rendu des 3 formats Cunningham (`Callout`, `Card`, `Link`) | Épic 1 (Front) | **P0** | Dev Front | ✅ Terminé |
| **T-04** | Factory `SourceBlock` & `BlockNoteSuggestionMenu` | Épic 1 (Front) | **P0** | Dev Front | ✅ Terminé |
| **T-05** | Classe abstraite Python `BaseSourceProvider` | Épic 2 (Back) | **P0** | Dev Back | ✅ Terminé |
| **T-06** | `SourceProviderRegistry` & Cache Redis 24h | Épic 2 (Back) | **P0** | Dev Back | ✅ Terminé |
| **T-07** | Connecteurs `LawSourceProvider` (PISTE) & BAN (Adresse) | Épic 2 (Back) | **P0** | Dev Back | ✅ Terminé |
| **T-08** | Connecteurs Entreprise (Pappers) & Assemblée (claire.vite) | Épic 2 (Back) | **P0** | Dev Back | ✅ Terminé |
| **T-09** | Vues DRF `/api/v1.0/sources/search/` & Feature Flags | Épic 2 (Back) | **P0** | Dev Back | ✅ Terminé |
| **T-10** | Tests E2E Playwright de la palette et insertion | Épic 3 (QA) | **P0** | QA / Dev | ✅ Terminé |
| **T-11** | Audit d'accessibilité automatisé RGAA v4.1 (axe-core) | Épic 3 (QA) | **P0** | Accessibilité | ✅ Terminé |
| **T-12** | Export documentaire multi-formats (PDF / ODT / DOCX) | Épic 4 (Export) | **P1** | Dev Front | ✅ Terminé |
| **T-13** | Tâche Celery de veille d'abrogation juridique nocturne | Épic 4 (Veille) | **P1** | Dev Back | ✅ Terminé |
| **T-14** | Connecteur RAG Albert API (IA Souveraine DINUM) | Épic 5 (IA) | **P2** | Dev IA / Back | ✅ Terminé |
| **T-15** | Publication du SDK Développeur Ministères | Épic 5 (Écosystème)| **P2** | Core Team | ✅ Terminé |
| **T-16** | Connecteur `ProcurementSourceProvider` (BOAMP) | Épic 6 (Marché) | **P1** | Dev Back | ✅ Terminé |
| **T-17** | Connecteur `GrantSourceProvider` (Aides-Territoires) | Épic 7 (Subvention)| **P1** | Dev Back | ✅ Terminé |
| **T-18** | Connecteur `InseeSourceProvider` (Stats Territoires) | Épic 8 (INSEE) | **P1** | Dev Back | ✅ Terminé |
