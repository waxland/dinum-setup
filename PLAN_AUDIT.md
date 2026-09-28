# 📋 Plan d'Audit Approfondi & Rétrospective du Dépôt (`PLAN_AUDIT.md`)

**Date :** 28 Septembre 2026  
**Auteur :** GitHub Copilot (Standards DINUM / La Suite Numérique / beta.gouv.fr)  
**Périmètre :** Socle Slasher (`packages/`), Démonstrateur (`demo/`), Portails Zudoku (`documentation/` & `documentation-international/`), CI/CD, Qualité, Sécurité et Intégration Upstream.

---

## 🧭 Tableau de Suivi des Phases d'Audit

| Phase       | Domaine d'Audit                                          |  Statut   | Synthèse & Preuves                                                                                                                              |
| :---------- | :------------------------------------------------------- | :-------: | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Phase 1** | **Socle Architectural, Contrats & Typage**               | 🟢 Validé | SDK `@suitenumerique/slash-sources-sdk`, interfaces TypeScript, DTOs Django, sérialisation et immuabilité des documents legacy.                 |
| **Phase 2** | **Backend Django, Résilience & Sécurité Défensive**      | 🟢 Validé | `django-lasuite-sources`, disjoncteur HTTP 429, quotas distribués Redis Lua, protection anti-SSRF `PublicResolver`, transport 3.5s, télémétrie. |
| **Phase 3** | **Extension BlockNote, UI & Accessibilité RGAA v4.1 AA** | 🟢 Validé | `@suitenumerique/blocknote-sources`, 3 formats DSFR/Cunningham, isolation 0-Mantine, WAI-ARIA, modales, clavier, Axe-Core.                      |
| **Phase 4** | **Chaîne de Build, Distribution & Découplage**           | 🟢 Validé | Sous-chemins `/exporters/*`, constructeur ODF ODT, wheels/tarballs isolés, `verify-packages.mjs`, Zudoku SSR, Pagefind, Prettier, Ruff, ESLint. |
| **Phase 5** | **Introspection Critique & Reste à Faire**               | 🟢 Validé | Capacités réelles vs mode démo, clés API souveraines requises, limites externes, couverture de tests, intégration amont.                        |

---

## 📑 1. Journal d'Exécution Détaillé par Phase

### Phase 1 : Socle Architectural, Contrats & Typage

- **Statut :** 🟢 **Validé le 28/09/2026**
- **Points Forts & Acquis Consolidés :**
  1. **Découplage strict des 4 piliers** : L'architecture monorepo isole nettement les packages distribuables (`packages/`), le démonstrateur web interactif (`demo/`), les portails documentaires (`documentation/` & `documentation-international/`) et l'espace de clone amont (`LaSuite/`).
  2. **SDK Immuable & Zéro Dépendance** : `@suitenumerique/slash-sources-sdk` (< 5 kB) fige les définitions de connecteurs via `Object.freeze`, garantissant une intégrité d'exécution sans mutations accidentelles.
  3. **Contrat DTO Transparent & Résilient** : Normalisation explicite du `snake_case` backend Django (`source_id`, `entity_type`, `verified_at`, `status_color`) vers le `camelCase` TypeScript (`sourceId`, `entityType`, `verifiedAt`, `statusColor`) dans `searchClient.ts`.
  4. **Immuabilité des Documents Legacy** : Les blocs créés sans les champs modernes (`freshness`, `verifiedAt`, `provider`) se chargent hors réseau sans plantage et sans injection artificielle de dates actuelles `now()`.
  5. **Typage Strict (0 any / 0 cast)** : Validation `npm run typecheck` réussie à 100% sur l'ensemble des 5 workspaces.
- **Points d'Attention & Reste à Faire Identifié :**
  - La sérialisation `rawPayload` est stockée sous forme de chaîne JSON dans le bloc BlockNote ; veiller à borner la taille des réponses amont pour éviter d'alourdir inutilement les documents CRDT Yjs volumineux.
- **Commandes & Preuves Exécutées :**
  - `npm --prefix packages/slash-sources-sdk test` (3 tests passés)
  - `npm --prefix packages/blocknote-sources run test tests/unit/contracts-and-persistence.test.ts` (5 tests passés)
  - `npm run typecheck` (0 erreur TypeScript sur 5 workspaces)

---

### Phase 2 : Backend Django, Résilience & Sécurité Défensive

- **Statut :** 🟢 **Validé le 28/09/2026**
- **Points Forts & Acquis Consolidés :**
  1. **Protection Anti-SSRF Étanche (`PublicResolver`)** : Résolution DNS pré-connexion bloquant toutes les plages privées (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), loopback (`127.0.0.1`, `::1`) et link-local (`169.254.169.254`). Blocage des redirections HTTP (`allow_redirects=False`).
  2. **Budget Temporel & Limite de Taille** : Timeout strict `TOTAL_TIMEOUT = 3.5s` et limitation de charge utile `MAX_RESPONSE_BYTES = 2MB`.
  3. **Disjoncteur (Circuit Breaker) & Sonde Unique** : Ouverture immédiate sur HTTP 429 avec respect du header `Retry-After` (secondes ou date HTTP) et verrou atomique `slasher:probe:<provider>` en état demi-ouvert évitant les surcharges lors du rétablissement.
  4. **Quotas Distribués Redis & Script Lua Transactionnel** : Script atomique `RESERVE_DAILY_LUA` évitant l'inflation des compteurs et les pertes d'incrémentation en multi-processus. Mode fail-closed en cas de panne Redis (HTTP 503 sans fuite de secrets).
  5. **Télémétrie Structurée & Masquage des Secrets** : `X-Correlation-ID` propagé dans les en-têtes HTTP, journalisation de télémétrie anonymisée (zéro texte de requête, zéro contenu documentaire, masquage des identifiants dans les URLs Redis).
  6. **Contrôle Qualité Ruff** : 0 diagnostic sur 113 fichiers Python (`ruff check` & `ruff format --check`).
- **Points d'Attention & Reste à Faire Identifié :**
  - En production (`DEBUG=False`), un serveur Redis est requis ; les caches locaux de processus sont volontairement rejetés pour éviter les dépassements de quotas non synchronisés.
  - Les connecteurs Albert et Légifrance restent en mode sécurisé désactivé/démonstration tant que les clés d'API `ALBERT_API_KEY` ou `PISTE_CLIENT_ID` ne sont pas configurées.
- **Commandes & Preuves Exécutées :**
  - `packages/django-lasuite-sources/.venv/bin/pytest packages/django-lasuite-sources/tests/test_security_ssrf.py packages/django-lasuite-sources/tests/test_transport_resilience.py packages/django-lasuite-sources/tests/test_quota_circuit_breaker.py packages/django-lasuite-sources/tests/test_redis_concurrency.py packages/django-lasuite-sources/tests/test_circuit_breaker_transitions.py packages/django-lasuite-sources/tests/test_telemetry_and_correlation.py` (47 tests passés)
  - `ruff check packages/django-lasuite-sources` (0 diagnostic)
  - `ruff format --check packages/django-lasuite-sources` (0 modification requise)

---

### Phase 3 : Extension BlockNote, UI & Accessibilité RGAA v4.1 AA

- **Statut :** 🟢 **Validé le 28/09/2026**
- **Points Forts & Acquis Consolidés :**
  1. **Isolation 0-Mantine dans la bibliothèque** : L'extension `@suitenumerique/blocknote-sources` n'embarque aucun composant Mantine ni Tailwind, utilisant exclusivement `@codegouvfr/react-dsfr`, les tokens CSS Cunningham et des balises HTML sémantiques. Mantine est strictement isolé au canevas éditeur de la démo et des playgrounds Zudoku.
  2. **Rendu Tri-Format Homogène** : Implémentation complète et testée des 3 modes : Callout (citation avec bordure Marianne `#000091`), Carte (grille 3-colonnes) et Lien (pastille inline avec aperçu dialog accessible).
  3. **Accessibilité WAI-ARIA (Niveau AA)** : Palette de recherche implémentant le pattern Combobox/Listbox avec `aria-activedescendant`, navigation intégrale au clavier (`Tab`, `Flèches`, `Entrée`, `Échap`) et annonce vocale des états de chargement/résultats via `p[role="status"]` (`aria-live="polite"`).
  4. **Gestion Accessible des Modales & Focus** : Composants `Mermaid.tsx` et `ModalPreview.tsx` avec `role="dialog"`, `aria-modal="true"`, focus initial, sortie par `Escape` et restauration automatique du focus sur le déclencheur.
  5. **Audits E2E Axe-Core Automatisés** : 4 scénarios Playwright `@axe-core/playwright` exécutés avec **0 violation WCAG 2.1 AA / RGAA v4.1** à 1280px (bureau) et 390px (mobile) en thèmes clair et sombre.
- **Points d'Attention & Reste à Faire Identifié :**
  - La recette physique audio au lecteur d'écran (VoiceOver / NVDA) reste à effectuer lors d'un audit humain officiel avec synthèse vocale ; les scénarios de test complets sont consignés dans `docs/UI_ACCESSIBILITY_AND_RECIPE.md`.
- **Commandes & Preuves Exécutées :**
  - `npm --prefix packages/blocknote-sources run test tests/unit/uiMapping.test.ts tests/unit/renderingConstraints.test.ts tests/unit/uiAccessibilityRecipe.test.ts tests/unit/controlsAccessibility.test.ts tests/unit/i18nAndPalette.test.tsx tests/unit/dinumSkillsVerification.test.ts` (21 tests passés)
  - `npm --prefix packages/blocknote-sources run test:e2e` (4 tests E2E passés, 0 violation Axe)

---

### Phase 4 : Chaîne de Build, Distribution & Découplage

- **Statut :** 🟢 **Validé le 28/09/2026**
- **Points Forts & Acquis Consolidés :**
  1. **Sous-chemins d'exportation indépendants & Tree-Shaking** : Points d'entrée découplés (`/exporters/pdf`, `/docx`, `/odt`) permettant aux consommateurs (ex: La Suite Docs) de n'importer que les moteurs d'export requis sans surcharger le bundle applicatif.
  2. **Génération ODF/ODT Complète & Conforme** : `odtDocumentBuilder.ts` produit des archives OpenDocument `.odt` conformes v1.3 avec `mimetype` non compressé, `manifest.xml`, `content.xml`, `styles.xml` et `meta.xml`.
  3. **Vérification d'Isolation des Packages Hors Monorepo** : Script `scripts/verify-packages.mjs` testant dans des répertoires temporaires isolés la consommation ESM, CommonJS (`require()`) et TypeScript (`NodeNext` `.mts`) à partir des artefacts `.tgz` et `.whl`.
  4. **Pré-rendu Zudoku SSR & Recherche Pagefind** : 270 routes FR et 148 routes EN pré-rendues sans erreur d'hydratation, avec indexation multilingue Pagefind (3 822 termes FR / 1 564 termes EN).
  5. **Outillage de Formatage & Linting Unifié** : Prettier (`npm run format:check`), ESLint 9 et Ruff 0.16 configurés sans conflits et intégrés de bout en bout dans `make check`.
- **Points d'Attention & Reste à Faire Identifié :**
  - Maintenir `@react-pdf/renderer` et `docx` en dépendances externalisées dans le bundler `tsup` pour éviter toute inclusion implicite dans le bundle principal.
- **Commandes & Preuves Exécutées :**
  - `npm run packages:build` (Bundles ESM, CJS, DTS générés)
  - `node scripts/verify-packages.mjs` (Vérification des consommateurs isolés au vert)
  - `npm --prefix packages/blocknote-sources run test tests/unit/independentExporters.test.ts tests/unit/odtCompleteDocument.test.ts tests/unit/exportersEdgeCases.test.ts tests/unit/portalsBuildVerification.test.ts` (17 tests passés)
  - `npm run format:check` (100% conforme Prettier)
  - `npm run lint` (0 erreur, 0 warning)

---

### Phase 5 : Introspection Critique & Reste à Faire

- **Statut :** 🟢 **Validé le 28/09/2026**
- **Points Forts & Acquis Consolidés :**
  1. **Transparence Absolue sur l'État des Connecteurs** :
     - Connecteur en direct : Base Adresse Nationale (BAN / Addok Geoplateforme) 100% opérationnel en mode live (`data.geopf.fr`).
     - Connecteurs prêts pour production : Albert RAG (`ALBERT_API_KEY`) et Légifrance PISTE DILA (`PISTE_CLIENT_ID` / `PISTE_CLIENT_SECRET`).
     - Connecteurs de démonstration : Les 50 autres connecteurs sont explicitement documentés avec le statut `status: Demonstration` et `origin: demo`, répertoriés dans `packages/django-lasuite-sources/docs/PROVIDERS_BACKLOG.md`.
  2. **Zéro Illusion de Mocks Cachés** : Les mécanismes de fallback implicites ont été totalement supprimés ; une panne réseau renvoie une erreur contrôlée HTTP 503 sans injecter de faux résultat.
  3. **Préparation des Contributions Upstream** :
     - `PR 1` (Support des serveurs distants & VMs) : Déjà soumise sur `suitenumerique/docs#2703`.
     - `PR 2` (Intégration modulaire dans La Suite Docs) : Dossier de PR complet prêt pour revue avec plan d'activation progressif en 4 jalons.
     - `PR 3` (RFC Extension Communautaire BlockNote) : Dossier d'extension `@blocknote/xl-external-sources` prêt pour soumission à `TypeCellOS/BlockNote`.
     - `Guide d'Arbitrage` : `PR/04-guide-d-arbitrage.md` consignant la matrice de décision comparative In-Tree vs Packages Découplés.
- **Points d'Attention & Reste à Faire Identifié pour la Production :**
  - **Déploiement en Production Réelle :** Provisionner les secrets ministériels `PISTE_CLIENT_ID`, `PISTE_CLIENT_SECRET`, `ALBERT_API_KEY` et l'URL de connexion Redis `SOURCES_REDIS_URL`.
  - **Validation Humaine d'Accessibilité :** Réaliser le parcours audio final avec synthèse vocale (VoiceOver / NVDA) selon les scénarios consignés dans `docs/UI_ACCESSIBILITY_AND_RECIPE.md`.
- **Commandes & Preuves Exécutées :**
  - `pytest packages/django-lasuite-sources/tests/test_providers_backlog.py packages/django-lasuite-sources/tests/test_providers_inventory.py` (2 tests passés)
  - `npm --prefix packages/blocknote-sources run test tests/unit/claimsAndParameters.test.ts` (3 tests passés)
  - `make check` (Quality gate global 16 étapes avec exit code 0)
