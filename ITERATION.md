# 🚀 Feuille de Route d'Itérations & Amélioration Continue de la Documentation (`ITERATION.md`)

**Date :** 18 Septembre 2026  
**Périmètre :** Portail Zudoku SSR, Composants interactifs MDX, Documentation Bilingue FR / EN, Expérience Développeur (DX), Accessibilité RGAA v4.1 AA.  
**Objectif :** Transformer le portail documentaire en une référence internationale d'Infrastructure Publique Numérique (DPI / DPG) alliant clarté pédagogique, interactivité et rigueur architecturale.

---

## 🧭 1. Vision Stratégique & Matrice d'Impact / Effort

```mermaid
quadrantChart
    title Matrice d'Impact vs Effort des Itérations Documentaires
    x-axis "Effort Faible" --> "Effort Élevé"
    y-axis "Impact Faible" --> "Impact Élevé"
    quadrant-1 "Chantiers Stratégiques Majeurs"
    quadrant-2 "Victoires Rapides (Quick Wins)"
    quadrant-3 "Tâches de Maintenance"
    quadrant-4 "Projets Spécialisés"
    "DocHeaderSummary sur 100% des fiches": [0.25, 0.85]
    "Sélecteur de langue instantané (FR <-> EN)": [0.20, 0.78]
    "Bouton 'Copier' sur toutes les démos DSFR": [0.15, 0.65]
    "Simulateur OpenAPI interactif (Swagger UI)": [0.65, 0.90]
    "Playground Multi-Sources (BAN, BOAMP, INSEE)": [0.45, 0.88]
    "Miroir FR -> EN des 10 guides souverains": [0.75, 0.85]
    "Audit RGAA & Axe-Core automatisé CI": [0.35, 0.72]
    "Optimisation Bundle SSR (Cytoscape/Mermaid)": [0.55, 0.60]
```

---

## 🎯 2. Les 4 Sprints d'Itérations

```mermaid
gantt
    title Planning des Itérations Documentaires
    dateFormat  YYYY-MM-DD
    section Sprint 1 : Lisibilité & DX
    DocHeaderSummary sur fiches phares      :done, 2026-09-18, 2026-09-21
    Généralisation CodeTabs multi-packages  :active, 2026-09-19, 2026-09-23
    Switch de langue par page (FR <-> EN)   :2026-09-21, 2026-09-24
    section Sprint 2 : Interactivité MDX
    Playground multi-sources étendu (BAN/BOAMP): 2026-09-24, 2026-09-28
    Simulateur de Requêtes & Quotas Live   : 2026-09-27, 2026-10-02
    section Sprint 3 : Internationalisation (EN)
    Traduction détaillée des 10 connecteurs: 2026-10-02, 2026-10-10
    Portage des fiches d'architecture en EN : 2026-10-08, 2026-10-15
    section Sprint 4 : Accessibilité & Perf
    Audit Axe-Core & correction ARIA modales: 2026-10-15, 2026-10-20
    Optimisation Bundle & Code-Splitting SSR: 2026-10-18, 2026-10-25
```

---

## 📋 3. Détail des Itérations par Axe

### ⚡ Axe 1 : Lisibilité Immédiate & Clarté Pédagogique (Quick Wins)

| Réf.      | Itération Proposée                                                     | Description & Bénéfice Développeur                                                                                                                                                                             |  Priorité  |
| :-------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: |
| **IT-01** | **Généralisation de `<DocHeaderSummary>`**                             | Déployer le composant d'en-tête sur les 30 fiches métiers des connecteurs (`/loi`, `/entreprise`, etc.) avec temps de lecture, niveau et prérequis.                                                            |  🔴 Haute  |
| **IT-02** | **Systématisation des `<PackageInstallTabs>` & `<PythonInstallTabs>`** | Remplacer les blocs de code shell statiques par des onglets interactifs pour les 4 gestionnaires JS (`pnpm`, `npm`, `yarn`, `bun`) et 4 Python (`uv`, `pip`, `poetry`, `pipenv`).                              |  🔴 Haute  |
| **IT-03** | **Bouton « Copier le code » sur les démos DSFR**                       | Ajouter dans `DSFRPreviews.tsx` un bouton permettant de copier en un clic le snippet JSX officiel d'un bouton, d'une modale ou d'un badge.                                                                     | 🟡 Moyenne |
| **IT-04** | **Basculement de Langue Contextuel**                                   | Dans le bandeau ou l'en-tête de page, permettre de basculer directement de la version française à son équivalent anglais (`/fr/03-slasheurs-france/01-loi` $\leftrightarrow$ `/en/04-presets/european-union`). |  🔴 Haute  |

---

### 🎮 Axe 2 : Interactivité & Immersion Développeur (Interactive MDX)

| Réf.      | Itération Proposée                                         | Description & Bénéfice Développeur                                                                                                                                                                  |  Priorité  |
| :-------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: |
| **IT-05** | **Bac à Sable Multi-Sources (`BlockNoteSlashPlayground`)** | Étendre le playground interactif pour simuler l'insertion de parcelles cadastrales, de marchés publics BOAMP et d'adresses BAN avec bascule des 3 formats (Callout, Carte, Lien).                   |  🔴 Haute  |
| **IT-06** | **Simulateur d'APIs & Testeur de Quotas**                  | Créer un composant interactif permettant de tester en direct le comportement du disjoncteur (Circuit Breaker) et l'algorithme Token Bucket en injectant des codes d'erreur simulés (HTTP 429, 503). | 🟡 Moyenne |
| **IT-07** | **Explorateur Graphique des 41 Connecteurs**               | Créer une carte interactive filtrable par pays (🇫🇷, 🇪🇺, 🇨🇦, 🇩🇪, 🇳🇱, 🇪🇸, 🌍) et par type d'entité (`law`, `company`, `stats`, `procurement`).                                                        | 🟡 Moyenne |

---

### 🌍 Axe 3 : Internationalisation Complète (`docs/en/`)

| Réf.      | Itération Proposée                                                 | Description & Bénéfice Développeur                                                                                                                                                          |  Priorité  |
| :-------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------: |
| **IT-08** | **Miroir Pédagogique FR $\rightarrow$ EN pour les 10 Connecteurs** | Compléter `docs/en/04-presets/` pour offrir le même niveau de détail (Pôle Métier / API / Code) pour les connecteurs européens et canadiens (EUR-Lex, Justice Laws Canada, Destatis, etc.). |  🔴 Haute  |
| **IT-09** | **Spécification OpenAPI 3.0 Intégrée (Zudoku API Plugin)**         | Connecter la spécification OpenAPI générée du backend Django directement dans Zudoku pour générer un explorateur d'API interactif type Swagger / Redoc.                                     | 🟡 Moyenne |
| **IT-10** | **Glossaire Terminologique Bilingue**                              | Créer une table de correspondance terminologique (`CRDT`, `Yjs`, `Anti-SSRF`, `Token Bucket`, `Hairpin NAT`, `DPGA Indicators`).                                                            |  🟢 Basse  |

---

### ♿ Axe 4 : Accessibilité (RGAA v4.1 AA) & Performance SSR

| Réf.      | Itération Proposée                                       | Description & Bénéfice Développeur                                                                                                                                |  Priorité  |
| :-------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------: |
| **IT-11** | **Audit Axe-Core Automatisé dans la CI**                 | Ajouter un script de test automatisé Playwright + `@axe-core/playwright` vérifiant 0 violation d'accessibilité sur les 288 pages pré-rendues.                     |  🔴 Haute  |
| **IT-12** | **Renforcement des Micro-Attributs ARIA**                | Vérifier et compléter systématiquement les attributs `aria-controls`, `aria-expanded` et `aria-haspopup` sur tous les accordéons et popovers de la documentation. | 🟡 Moyenne |
| **IT-13** | **Optimisation du Code-Splitting des Diagrammes Lourds** | Isoler le chargement de Cytoscape et Mermaid via du dynamic import (`React.lazy`) pour alléger le bundle initial du serveur SSR.                                  | 🟡 Moyenne |

---

## 🛠️ 4. Exemples Concrets d'Implémentation Prêts à l'Emploi

### Exemple d'En-tête Synthétique à Déployer sur `/loi` :

```mdx
<DocHeaderSummary
  readingTime="4 min"
  level="Intermédiaire"
  roles={["Juriste", "Frontend React", "Backend Django"]}
  prerequisites={["API Légifrance / PISTE", "OAuth2 Client Credentials"]}
  status="Production Ready"
  statusColor="success"
  takeaway="Recherche plein texte instantanée dans les codes et lois françaises avec extraction d'articles in extenso et cache SHA-256 (24h)."
/>
```

### Exemple de Comparateur d'API Réactif :

```mdx
<DualLanguageTabs
  tsTitle="SDK Client (TypeScript)"
  pyTitle="Connecteur Django (Python)"
  tsCode={`export const lawProvider = defineSourceProvider({
  type: "law",
  slashCommand: "loi",
  search: async (q) => fetch(\`/api/v1.0/sources/search/?type=law&q=\${q}\`).then(r => r.json()),
});`}
  pyCode={`class LawSourceProvider(BaseSourceProvider):
    source_type = "law"
    API_URL = "https://api.piste.gouv.fr/dila/legifrance/v1"
    def search(self, query: str, limit: int = 5) -> list[SourceSearchResult]:
        return self._fetch_piste_api(query, limit)`}
/>
```

---

## 🏁 5. Indicateurs Clés de Succès (KPIs)

- **Couverture Bilingue :** Parité 100% entre `docs/fr/` et `docs/en/`.
- **Score d'Accessibilité :** 0 erreur bloquante au validateur Axe-Core (Conformité RGAA v4.1 AA).
- **Temps de Chargement :** Prémontage SSR $< 25\text{s}$ pour 300+ routes et FCP $< 0.8\text{s}$ sur navigateur.
- **Engagement Développeur :** Possibilité de tester un connecteur dans le bac à sable sans installer d'environnement local.

---

## 📌 6. Journal de Bord & Étapes d'Exécution Validées

### 🗓️ Session du 26 Septembre 2026 — Jalon Clôture du Lot R-01 (Baseline Finale)

- **Tâche R-01.01 (Inventaire & Baseline) :**
  - Révision Git : `d21cf6d2`
  - Validation de l'environnement : Node.js `22.23.2`, npm `10.9.8`, Python `3.14.7` (venv isolé).
  - `make check` exécuté de bout en bout avec succès (Exit code 0).
  - Journal consigné dans `.sessions/r-01-baseline.log`.
- **Tâche R-01.02 (Packaging Python Isolé) :**
  - Vérification de `build 1.6.1` et `hatchling` dans `.venv`.
  - Construction réussie des artefacts `.whl` et `.tar.gz` via `make packages-build`.
- **Tâche R-01.03 (Formalisation des Outils Locaux & Prérequis) :**
  - Alignement des `engines` (`Node >= 22.23.2`, `npm >= 10.9.0`, `Python >= 3.12`) sur la racine et les packages (`slash-sources-sdk`, `blocknote-sources`).
  - Durcissement de `scripts/check-runtime.mjs` avec instructions de remédiation claires (`nvm use`).
  - Ajout de la section « 2. Environment Prerequisites » dans `README.md`.
  - Gestion des messages d'erreur et dépendances explicites dans `Makefile` (`check-tools`, `packages-test`, `packages-build`).
- **Tâche R-01.04 & T-016.05 (Idempotence & Non-Régression des .env) :**
  - Test d'installation propre successif dans un répertoire temporaire isolé.
  - Empreinte SHA-256 de `package-lock.json` strictement identique avant et après double installation.
  - Préservation des variables `.env` locales personnalisées sans écrasement destructif (`.sessions/r-01-idempotence.log`).
- **Tâche R-01.05 & T-002.01 (Découverte Réentrante en Sous-Processus Borné) :**
  - Ajout du test de sous-processus indépendant avec timeout strict (3.0s) dans `test_registry_discovery.py` pour garantir la non-régression de deadlock.
  - Résilience accrue sur l'échec de lecture des métadonnées `entry_points`.
- **Tâche R-01.06 & T-012.05 (Tests du Hook useSourceSearch) :**
  - Tests unitaires enrichis (gestion d'erreur tardive après succès, réinitialisation immédiate via `setQuery('')`, changement d'entité et démontage).
  - 21 tests Vitest validés.
- **Tâche R-01.07 & T-016.06 (Découplage et Documentation LaSuite/ / SRC_DIR) :**
  - Documentation claire dans `README.md` du dossier `LaSuite/` et de la variable d'override `SRC_DIR`.

### 🗓️ Session du 26 Septembre 2026 — Jalon Contrats & Persistance (R-02.01 / R-02.02 / R-02.03 / R-02.04 / T-003.01 / T-003.03 / T-003.05 / T-003.06 / T-004.07 / T-013.04 / T-013.05 / T-013.06)

- **Tâche R-02.01 & T-003.01 / T-003.05 (Table des Champs & Persistance de la Fraîcheur) :**
  - Harmonisation canonique des structures de données entre le backend Django (`SourceSearchResult`), le SDK TypeScript (`ExternalSourceEntity`) et l'extension BlockNote (`SourceEntityProps`).
  - Séparation explicite des concepts métier : Catégorie (`entityType`), Fournisseur (`provider`), Pays (`country`), Origine (`origin`), Mode de rendu (`displayMode`) et Fraîcheur (`freshness`: `live` / `cached` / `offline_index`).
  - Ajout de la propriété `freshness` dans `CreateSourceBlockConfig` pour assurer la persistance et l'affichage des badges de cache dans les formats de bloc (`SourceCalloutFormat`).
  - Validation par la suite de tests automatisée `contracts-and-persistence.test.ts` (23 tests Vitest au vert).
- **Tâche R-02.02 & T-003.03 / T-013.04 / T-013.05 (Validation Défensive aux Frontières & Sanity Checks) :**
  - Validation stricte des données issues de `unknown` côté TypeScript (`searchClient.ts`) avec vérification des champs requis non vides (`source_id`, `title`, `entity_type`, `display_mode`).
  - Assainissement défensif des URLs pour bloquer les schémas non sûrs (`javascript:`, etc.) et n'autoriser que `https://`, `http://` et les chemins relatifs.
  - Bornes strictes d'identifiants sur l'API Django (`MAX_SOURCE_ID_LENGTH = 256`, `MAX_SOURCE_TYPE_LENGTH = 100`) et gestion d'erreurs publiques stables (`invalid_source_id`, `unknown_provider`, `provider_unavailable`).
  - Tests automatisés au vert (24 tests Vitest + 84 tests Pytest).
- **Tâche R-02.03 & T-003.06 / T-004.07 (Parcours Réel Fournisseur Django & Snapshot Offline Découplé) :**
  - Ajout du test d'intégration `test_custom_provider_with_non_fixture_data_roundtrip` dans `test_api_sources.py` avec un fournisseur produisant des données non présentes dans les fixtures statiques.
  - Traversée complète de la réponse Django par le client TS (`parseSearchResponse`), insertion dans un bloc BlockNote, sérialisation en snapshot JSON du document et rechargement hors réseau.
  - Vérification de la conservation intégrale de l'identité (`sourceId`), contenu, métadonnées, provenance et fraîcheur, sans dépendance à une requête active lors de la consultation.
- **Tâche R-02.04 & T-013.06 (Validation Automatisée contre la Spécification OpenAPI 3.0) :**
  - Mise à jour de `packages/django-lasuite-sources/docs/openapi.yaml` avec le champ `country` et typage des schémas d'erreur.
  - Création de `packages/django-lasuite-sources/tests/test_openapi_validation.py` validant de manière automatisée chaque code de réponse (200 avec résultats, 200 vide, suggestion, détail, 400 bad request, 401 unauthenticated, 404 not found, 429 rate limited avec `Retry-After`, 503 unavailable) contre le schéma YAML.
  - 90 tests Pytest validés avec succès.

### 🗓️ Session du 28 Septembre 2026 — Jalon Immuabilité & Snapshots Legacy (R-02.05 / T-003.05 / T-004.07)

- **Tâche R-02.05 (Rechargement d'Anciens Documents Legacy Hors Réseau) :**
  - Ajout d'un test automatisé dans `packages/blocknote-sources/tests/unit/contracts-and-persistence.test.ts` simulant la désérialisation d'un document JSON contenant un snapshot de bloc legacy (créé avant l'ajout des champs `verifiedAt`, `retrievedAt`, `freshness`, `provider`, `origin`, `country`).
  - Vérification de la lisibilité parfaite de la structure du bloc et de son contenu sans crash ni comportement dégradé.
  - Validation qu'aucune nouvelle date (`verifiedAt`, `retrievedAt`) ni valeur par défaut (`freshness`, `provider`, `origin`, `country`) n'est injectée silencieusement.
  - Preuve que la ré-sérialisation produit une chaîne JSON strictement identique à la source d'origine (0 modification silencieuse, 0 appel réseau de rafraîchissement).
  - 26 tests Vitest validés dans `blocknote-sources`, `npm run typecheck` et `npm run docs:build` au vert (Exit code 0).

- **Tâche R-02.06 & T-014.02 / T-014.03 / T-014.05 / T-014.06 (Unification des 6 Pays, Canada & Annulation Asynchrone) :**
  - Unification de la liste des six pays souverains supportés (`fr`, `de`, `nl`, `es`, `eu`, `ca`) à travers le composant `SourceSearchPopover`, le sélecteur `COUNTRY_PRESETS` et `demoSearchClient`.
  - Validation explicite des jeux de données et connecteurs pour le Canada (`ca`), incluant la recherche de lois fédérales (`PIPEDA`) et d'organismes publics (`Shared Services Canada`).
  - Implémentation et test de l'annulation stricte des requêtes lors d'un changement de pays pendant une recherche en cours (signal `AbortController` interrompu, réinitialisation du tableau de résultats et rejet des réponses asynchrones obsolètes provenant de l'ancien pays).
  - Confirmation de la préservation intégrale du document (textes et blocs existants) lors des changements de pays ou de langue d'interface.
  - Validation par la suite `packages/blocknote-sources/tests/unit/countriesAndPresets.test.ts` (31 tests Vitest au vert, `typecheck` et `docs:build` validés).
- **Tâche R-02.07 & T-014.05 (Dictionnaires d'Internationalisation, Erreurs & Palette Dynamique FR/EN/DE/NL/ES) :**
  - Extension des dictionnaires `ExternalSourceI18nStrings` (`i18n/locales.ts`) pour couvrir l'ensemble des éléments d'interface : étiquettes de catégories et de pays, libellés de recherche, boutons de fermeture et effacement, messages de statut, placeholders par type d'entité, noms de pays traduits et messages d'erreurs HTTP.
  - Mise à jour de `SourceSearchPopover`, `SourceCalloutFormat`, `SourceBlockToolbar` et `createHttpSourceClient` pour recevoir dynamiquement `locale` via `SourceSearchContext` ou par prop.
  - Découplage strict entre la langue d'interface (`locale` : `fr` / `en` / `de` / `nl` / `es`) et le pays du jeu de données (`country` : `fr` / `de` / `nl` / `es` / `eu` / `ca`).
  - Validation par la suite `packages/blocknote-sources/tests/unit/i18nAndPalette.test.tsx` (36 tests Vitest au vert, `typecheck` et `docs:build` validés).
- **Tâche R-02.08 (Clôture du Lot R-02 — Documentation de Migration des Consommateurs) :**
  - Rédaction de la section « Consumer Migration Guide » dans `packages/blocknote-sources/README.md` et création du guide complet MDX dans `documentation-international/docs/01-blocknote-extension/consumer-migration-guide.mdx`.
  - Documentation exhaustive des 5 piliers de la migration : 1) Client de recherche injecté (`SourceSearchProvider`), 2) Mode démo explicite (`demoSearchClient`), 3) Suppression des fallbacks implicites vers les mocks sur erreur HTTP, 4) Rétrocompatibilité et immuabilité des anciens snapshots legacy, 5) Prérequis de runtime (`Node.js >= 22.23.2`, `npm >= 10.9.0`).
  - Déclaration et intégration de la page dans la navigation Zudoku (`zudoku.navigation.tsx`).
  - Clôture complète du lot **R-02 (Contrats, Persistance et Migration)**.

- **Tâche R-03.01 & T-006.03 / T-006.04 (Réservations Journalières au Plafond & Primitive Atomique Redis) :**
  - Implémentation du script Lua `RESERVE_DAILY_LUA` dans `DistributedQuotaManager` (`lasuite_sources/quota.py`) effectuant une vérification et un incrément atomiques de la clé de compteur journalière (`slasher:quota:<provider>:<YYYY-MM-DD>`).
  - Correction de l'inflation de compteur : si le compteur atteint ou dépasse le plafond (`ceiling`), la requête de réservation est refusée (`return False` / `0` Lua) **sans** incrémenter le compteur.
  - Implémentation du mode thread-safe local sous `LOCAL_BUCKET_LOCK` pour l'environnement de test/développement.
  - Ajout des tests unitaires `test_reserve_request_atomic_ceiling_and_no_counter_inflation` et `test_reserve_request_increments_until_ceiling_reached` dans `test_quota_circuit_breaker.py` (91 tests Pytest passés).

- **Tâche R-03.02 & T-006.03 / T-006.05 / T-006.06 / T-006.08 (Tests Multi-Processus Partageant Redis & Résilience Distribuable) :**
  - Canonization automatique des alias de fournisseurs (`statistics` -> `insee`, `place` -> `address`, `case-law` -> `law`) dans `DistributedQuotaManager` (`lasuite_sources/quota.py`) pour empêcher les contournements de quotas et de rate limits.
  - Extension de la suite `packages/django-lasuite-sources/tests/test_redis_concurrency.py` avec `ProcessPoolExecutor` et serveur TCP Redis (`TcpFakeServer` / Redis réel) :
    1. Multi-processus même utilisateur : vérification de l'absence de lost updates sur 80 requêtes concurrentes (exactement 10 acceptées, reste bloqué).
    2. Multi-processus utilisateurs distincts : validation que la limitation d'un utilisateur n'affecte pas l'autre.
    3. Multi-processus canonization d'alias : vérification que requêtes concurrentes sous alias partageant les mêmes clés Redis et plafonds.
    4. Multi-processus isolation des fournisseurs : validation que la saturation de `law` ne bloque pas `company`.
    5. Multi-processus franchissement de journée : simulation du passage du jour 1 (`2026-09-28`) au jour 2 (`2026-09-29`) avec bascule transparente de la clé de compteur Redis et rétablissement du quota quotidien.
  - Validation par la suite `test_redis_concurrency.py` (7 tests Pytest distribués au vert) et 97 tests Pytest totaux au vert.

- **Tâche R-03.03 & T-006.03 / T-006.07 / T-006.09 (Tests des Politiques Invalides, Extrêmes & Sécurité des Budgets) :**
  - Traitement défensif des budgets nuls ou négatifs (`max_daily_requests <= 0`) dans `DistributedQuotaManager` (`lasuite_sources/quota.py`) : suppression de l'admission accidentelle de 1 requête (`ceiling <= 0` refuse immédiatement) et élimination de l'erreur `ZeroDivisionError` dans `get_health_status` (renvoie `quota_exhausted` avec 0% restant).
  - Encadrement strict de la marge de sécurité (`safety_margin_percent`) bornée dynamiquement entre `0%` et `100%` (`max(0, min(100, ...))`).
  - Validation du refus immédiat des requêtes pour tout débit nul ou négatif (`burst_per_minute_user <= 0`).
  - Rejet systématique des backends de cache non-Redis en environnement de production (`DEBUG = False`) avec levée de l'exception `SourceUnavailable`.
  - Validation par la suite `packages/django-lasuite-sources/tests/test_quota_circuit_breaker.py` (11 tests Pytest au vert) et 101 tests Pytest totaux au vert.

- **Tâche R-03.04 & T-006.07 / T-007.01 / T-008.07 (Pannes & Timeouts Redis, Masquage des Secrets & Fail-Closed) :**
  - Implémentation du helper de masquage de secrets `sanitize_redis_url(url_or_msg)` filtrant les mots de passe et jetons d'accès présent dans les URL Redis (`redis://:***@host:port/db`) lors des journaux de logs.
  - Garantie du mode _fail-closed_ lors des pannes ou timeouts Redis (`RedisError`, `ConnectionError`, `TimeoutError`, `socket.timeout`) : blocage systématique des requêtes amont en ligne (`fetch()` non exécuté), éliminant tout appel non contrôlé vers les API externes.
  - Exposition de réponses publiques contrôlées HTTP 503 (`provider_unavailable` / `quota_service_unavailable`) dans `SourceAPIView.handle_exception` sans fuite de stack trace ou d'identifiants de base de données/Redis.
  - Résilience des tâches Celery (`check_laws_validity_task`) en cas d'indisponibilité de Redis.
  - Validation par la suite `packages/django-lasuite-sources/tests/test_redis_outage_and_timeout.py` (6 tests Pytest au vert) et 107 tests Pytest totaux au vert.

- **Tâche R-03.05 & T-007.03 / T-007.04 / T-007.05 (Transitions du Circuit Breaker & Concurrence Asynchrone) :**
  - Implémentation et test du verrou atomique de sonde unique (`slasher:probe:<provider>`) lors du passage du disjoncteur en état demi-ouvert (`circuit_open_until <= now`) : la première requête est admise comme sonde unique tandis que les requêtes concurrentes simultanées sont refusées.
  - Protection contre le raccourcissement des délais de disjonction : si un disjoncteur est déjà ouvert avec une expiration longue (ex. HTTP 429 avec `Retry-After: 3600`), une erreur secondaire ultérieure avec un délai plus court ne vient pas écraser ou raccourcir le délai d'ouverture existant (`if existing_until > open_until: return`).
  - Protection contre les fermetures intempestives par des requêtes lentes concurrentes : une requête démarrée avant l'ouverture du disjoncteur et se terminant par un succès ne peut pas réinitialiser la clé de disjoncteur si `until > time.time()`.
  - Validation par la suite `packages/django-lasuite-sources/tests/test_circuit_breaker_transitions.py` (4 tests Pytest au vert) et 111 tests Pytest totaux au vert.

- **Tâche R-03.06 & T-007.01 / T-007.06 / T-007.07 (Catégories d'Erreurs, Politique de Cache & Santé Dynamique) :**
  - Stabilisation et qualification stricte des codes d'erreurs publiques HTTP (`rate_limited` sur HTTP 429, `provider_unavailable` sur HTTP 503, `invalid_source_type` / `invalid_source_id` sur HTTP 400).
  - Preuve et validation que les réponses servies depuis le cache (`delivery: "cache"`) ou en mode démonstration (`LASUITE_SOURCES_DEMO = True`) ne réinitialisent pas le disjoncteur ni les compteurs d'erreurs en évitant d'invoquer `record_request_success`.
  - Confirmation du recalcul dynamique de l'état de santé du fournisseur (`health`) sur chaque réponse API sans déclencher de ping réseau amont non contrôlé (message explicite `"upstream availability is not verified"`).
  - Validation par la suite `packages/django-lasuite-sources/tests/test_cache_and_health_policy.py` (4 tests Pytest au vert) et 115 tests Pytest totaux au vert.

- **Tâche R-03.07 & T-008.07 (Resilience du Transport HTTP, Deadline 3.5s, Limites de Taille & Non-Suivi des Redirections) :**
  - Validation stricte du budget temporel global `TOTAL_TIMEOUT = 3.5s` couvrant résolution DNS, connexion, lecture des fragments et désérialisation.
  - Test du rejet des timeouts lors de la résolution DNS ou d'une lecture fragmentée lente (`TimeoutError`), levant l'exception contrôlée `SourceUnavailable`.
  - Test du rejet des réponses dépassant la taille maximale autorisée `MAX_RESPONSE_BYTES = 2MB` (`SourceUnavailable("Response exceeds size limit")`).
  - Test du traitement des réponses non-JSON ou HTML d'erreur tronquées (`SourceUnavailable("Invalid or unavailable upstream response")`).
  - Validation du blocage des redirections automatiques (`allow_redirects = False`) sur les codes HTTP `301`, `302`, `307`, `308`, levant une `UpstreamError`.
  - Validation par la suite `packages/django-lasuite-sources/tests/test_transport_resilience.py` (10 tests Pytest au vert) et 125 tests Pytest totaux au vert.

- **Tâche R-03.08 & T-007.07 (Correlation IDs, Mesure de Durée & Télémétrie Structurée Sécurisée) :**
  - Ajout de la gestion dynamique du header `X-Correlation-ID` / `X-Request-ID` dans `SourceAPIView` (`views.py`) avec propagation systématique dans les réponses HTTP.
  - Mesure précise de la durée d'exécution (`duration_ms = round((time.monotonic() - start_time) * 1000, 2)`) et journalisation de télémétrie structurée dans `_request` (`registry.py`) pour les issues `cache_hit`, `live_success`, `rate_limited`, `quota_refused` et `upstream_error`.
  - Respect absolu de la confidentialité : zéro contenu documentaire (titre, extrait, résumé), zéro texte de requête `q` et zéro secret/jeton dans les journaux de télémétrie.
  - Validation par la suite `packages/django-lasuite-sources/tests/test_telemetry_and_correlation.py` (3 tests Pytest au vert) et 128 tests Pytest totaux au vert.

- **Tâche R-03.09 & T-008.09 (Clôture du Lot R-03 — Statut des Transports Internes / Non Objet) :**
  - Consignation explicite du statut de `T-008.09` comme **sans objet** : l'ensemble des connecteurs souverains configurés (`france/`, `europe/`, `canada/`, `germany/`, `netherlands/`, `spain/`, `international/`, `federation/`) ciblent exclusivement des endpoints publics HTTPS autorisés sur Internet.
  - Aucun transport vers un réseau ou service privé interne n'est requis ; la protection défensive anti-SSRF (`validate_destination`, `PublicResolver`, blocage d'IPs privées/link-local/loopback) demeure 100% stricte sans affaiblissement.
  - Clôture complète du lot **R-03 (Garanties de Résilience & Quotas)**.

- **Tâche R-06.01 & T-011 / T-017 (Cartographie Complète UI, Accessibilité & Isolation Mantine) :**
  - Rédaction du document de référence `docs/UI_ACCESSIBILITY_AND_DESIGN_SYSTEM_MAPPING.md` cartographiant l'ensemble des composants UI, modales, popovers et aperçus du monorepo.
  - Audit d'isolation Mantine & Tailwind : confirmation qu'aucun import `@blocknote/mantine` ou `@mantine/core` n'existe dans `packages/blocknote-sources/` (0-Mantine), Mantine restant cantonné à la coquille d'éditeur BlockNote core.
  - Validation par la suite `packages/blocknote-sources/tests/unit/uiMapping.test.ts` (49 tests Vitest au vert).

- **Tâche R-06.02 & T-017.03 / T-017.04 (Évaluation & Documentation des Primitives de Rendu BlockNote & Zudoku) :**
  - Rédaction du document d'évaluation architecturale `docs/BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md` :
    1. **Primitives BlockNote v0.54** : Analyse de l'architecture découplée entre `@blocknote/core` (modèle headless), `@blocknote/react` (`createReactBlockSpec`) et `@blocknote/mantine` (`<BlockNoteView />`).
    2. **Isolation Garantie** : Confirmation que l'extension distribuée `@suitenumerique/blocknote-sources` utilise uniquement la primitive headless `createReactBlockSpec` de `@blocknote/react` sans aucune dépendance Mantine, garantissant zéro fuite dans les applications consommatrices (e.g. La Suite Docs).
    3. **Évaluation de Remplacement** : Option de reconstruction d'un canevas Prosemirror à partir de zéro écartée au profit d'une barrière d'isolation stricte où `@blocknote/mantine` est confiné aux coquilles d'édition démo/playgrounds.
    4. **Interopérabilité Zudoku SSR** : Isolation des composants DSFR/Cunningham dans les pages MDX avec zéro erreur de pré-rendu ou d'hydratation.
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/renderingConstraints.test.ts` (52 tests Vitest au vert).

- **Tâches R-06.03 à R-06.07 & T-011 / T-017 (Migration des Contrôles UI, Modales Accessibles, Contrastes & Recette Lecteur d'Écran) :**
  - **R-06.03** : Alignement de tous les contrôles UI vers `@codegouvfr/react-dsfr` et Cunningham tokens. Ajout de `displayModeLabel` dans 5 langues (`locales.ts`), `role="group"` et `aria-pressed={isActive}` sur `SourceBlockToolbar`.
  - **R-06.04** : Bilan et durcissement des modales et overlays (`Mermaid.tsx` et `ModalPreview.tsx`) avec `role="dialog"`, `aria-modal="true"`, capture de `triggerRef`, focus initial à l'ouverture, focus de fermeture et restauration du focus à la fermeture.
  - **R-06.05** : Gestion explicite de l'état d'erreur presse-papier (`setCopyState("error")`) dans `CodeTabs.tsx` avec message `⚠️ Échec de la copie` et navigation clavier `Escape` / `Enter` / Flèches.
  - **R-06.06** : Rédaction de `docs/UI_ACCESSIBILITY_AND_RECIPE.md` avec matrice des modales, ratios de contraste (ex: Bleu France `#000091` à 12.6:1), et exécution sans échec de la suite E2E Axe-Core (`axe-audit.spec.ts`) à 1280px et 390px (0 violation WCAG 2.1 AA / RGAA v4.1).
  - **R-06.07** : Scénarios de recette lecteur d'écran (VoiceOver / NVDA) formalisés dans `docs/UI_ACCESSIBILITY_AND_RECIPE.md` pour audit humain.
  - Validation par la suite `packages/blocknote-sources/tests/unit/uiAccessibilityRecipe.test.ts` (57 tests Vitest au vert, `typecheck` et `docs:build` validés).
- **Clôture du Lot R-06 (Interface et Accessibilité).**

- **Tâche R-07.01 & T-009 (Audit de Sécurité des Dépendances & Overrides de Configuration) :**
  - Rédaction du document de référence `docs/DEPENDENCY_SECURITY_AND_OVERRIDES.md` inventoriant l'état de l'audit de sécurité (`npm audit` avec **0 vulnérabilité**) et détaillant l'analyse technique des 4 `overrides` du `package.json` racine :
    1. `esbuild@>=0.27.0 <0.28.1`: "0.28.1" (Correction GHSA-67mh-4wv8-2f99 / CVE-2024-48911 dans la chaîne de build Vite / Vitest / tsup).
    2. `hono`: "4.13.5" (Correction GHSA-cf3x-v777-v437 / CVE-2024-45388 HTTP request smuggling dans le serveur Zudoku SSR).
    3. `toml`: "4.2.0" (Correction GHSA-2jhq-8534-4299 prototype pollution pour l'analyse des en-têtes frontmatter TOML `+++` MDX).
    4. `uuid@9.0.1`: "11.1.1" (Correction CVE-2024-21538 prototype pollution dans les dépendances transitives).
  - Ajout des pages de documentation MDX à en-tête TOML `+++` (`03-toml-frontmatter.mdx` et `05-toml-frontmatter.mdx`) compilées sans erreur lors du build Zudoku SSR.
  - Implémentation du test d'intégrité `packages/blocknote-sources/tests/unit/tomlAndOverrides.test.ts` (60 tests Vitest au vert).

- **Tâche R-07.02 & T-015.05 (Contrôle de Formatage Prettier Reproductible & Extension du Linting) :**
  - Formalisation d'un contrôle de formatage frontend reproductible via Prettier (`.prettierrc`, `.prettierignore`).
  - Ajout des scripts `format:check` (`prettier --check`) et `format` (`prettier --write`) dans le `package.json` racine et intégration de `@npm run format:check` dans la cible `check` du `Makefile`.
  - Extension des scripts `lint` ESLint dans `package.json` pour couvrir l'ensemble des fichiers de test (`tests/**/*.{ts,tsx}`).
  - Correction de 100% des diagnostics ESLint (résolution des variables inutilisées et suppression des assertions `!` dans les fichiers de test).
  - Validation complète : 0 erreur et 0 avertissement au linting (`npm run lint`), 100% conforme Prettier (`npm run format:check`), 0 erreur de typage (`npm run typecheck`), 147 tests Pytest au vert, 60 tests Vitest au vert, et 270 routes Zudoku compilées sans erreur (`npm run docs:build`).

- **Tâche R-07.03 & T-015.02 / T-015.03 (Élimination des Tests Tautologiques & Injection de Mutation) :**
  - Revue systématique des suites de tests unitaires et suppression des assertions tautologiques (comparaisons de constantes locales à elles-mêmes dans `accessibility.test.ts`) et des gardes conditionnels silencieux (`if (item.url)`, `if (existsSync)` dans `uiMapping.test.ts` et `test_ban_provider.py`).
  - Transformation en assertions explicites et obligatoires (`expect(url).toBeDefined()`, `expect(existsSync(fullPath)).toBe(true)`).
  - Validation de la sensibilité aux mutations (fault injection) dans un environnement isolé : injection d'une URL invalide dans `mockSources.ts` ayant immédiatement provoqué l'échec ciblé de Vitest avant restauration.
  - Validation globale : 147 tests Pytest au vert, 60 tests Vitest au vert, 0 erreur au linting / formatage / typage.

- **Tâche R-07.04 & T-015.01 (Optimisation & Exécution Intégrale de la Cible `make check`) :**
  - Révision de la cible `make check` dans le `Makefile` racine pour exécuter de manière séquentielle et non récursive l'ensemble des 16 étapes du Quality Gate : `check-runtime.mjs`, `npm audit`, `eslint`, `prettier --check`, `typecheck`, `ruff check`, `ruff format --check`, `vitest`, `pytest`, `packages:build` (TS + Python), `verify-packages.mjs`, `demo:build`, `playwright test:e2e`, `build-storybook`, et `docs:build` Zudoku SSR.
  - Suppression de l'appel récursif `@$(MAKE) packages-build` au profit d'exécutions directes.
  - Automatisation du formatage Prettier dans `generate-docs-navigation.mjs` garantissant zéro divergence de style post-génération.
  - Exécution complète et sans échec de `make check` avec code de sortie 0.

- **Tâche R-07.05 (Analyse & Documentation de la Matrice d'Interopérabilité Python/Django) :**
  - Rédaction du document d'évaluation `packages/django-lasuite-sources/docs/PYTHON_DJANGO_MATRIX.md` cartographiant la matrice de compatibilité Python/Django :
    1. **Spécification déclarée (`pyproject.toml`)** : `requires-python = ">=3.12"`, `django>=4.2`.
    2. **Classifiers PyPI mis à jour** : Ajout explicite des classifiers Python `3.12`, `3.13`, `3.14` et Django `4.2`, `5.0`, `5.1`, `5.2`, `6.0`.
    3. **Stratégie CI Multi-Version** : Mise à jour de `.github/workflows/ci-packages.yml` avec la matrice `python-version: ["3.12", "3.13"]`.
    4. **Validation Environnement Local** : Exécution des 149 tests Pytest sous CPython 3.14.7 avec Django 6.1.1.
  - Implémentation du test automatisé `packages/django-lasuite-sources/tests/test_python_django_matrix.py` (2 tests Pytest au vert).

- **Tâche R-07.06 & T-015.09 / T-015.10 / T-015.11 (Contrôle Tag/Versions, Dépendances de Jobs, Rétention & Modes Simulation CI) :**
  - Création du script de vérification de cohérence des versions `scripts/check-tag-version.mjs` vérifiant l'alignement strict entre le tag Git (ex: `v1.0.0`) et les trois manifestes de packages (`packages/slash-sources-sdk/package.json`, `packages/blocknote-sources/package.json` et `packages/django-lasuite-sources/pyproject.toml`).
  - Validation par la suite de tests `packages/blocknote-sources/tests/unit/tagVersionCheck.test.ts` (62 tests Vitest au vert).
  - Durcissement du workflow de publication `.github/workflows/publish-packages.yml` : ajout du job `verify-version`, conditionnement de `publish-npm` et `publish-pypi` à `needs: [quality, verify-version]`, et bascule automatique en mode simulation (`--dry-run` / `twine check`) en l'absence de secrets.
  - Durcissement de `.github/workflows/deploy-vercel.yml` et `.github/workflows/ci-packages.yml` : verrouillage de la révision exacte `${{ github.sha }}` et téléversement des artefacts de rapports de tests avec rétention maîtrisée à 7 jours (`retention-days: 7`).

- **Tâche R-07.07 (Validation Finale de Relecture & Clôture du Lot R-07 Outillage & CI) :**
  - Relecture globale et exécution intégrale de la cible `make check` : confirmation de 0 échec, 0 avertissement persistent et 0 vulnérabilité au rapport `npm audit`.
  - Contrôle de la configuration des serveurs de dev/preview (`demo/`, `documentation/`, `documentation-international/`) avec ports et liaisons réseau sûrs.
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/finalVerification.test.ts` (65 tests Vitest au vert).
- **Clôture du Lot R-07 (Consolidation de l'Outillage, Sécurité des Dépendances & CI).**

- **Tâche R-08.01 & T-018.03 (Rédaction du Guide d'Arbitrage Stratégique & Vérification des Liens Locaux) :**
  - Rédaction du guide d'arbitrage `PR/04-guide-d-arbitrage.md` détaillant la matrice de décision comparative multi-critères entre l'Option A (Intégration Monolithique En-Arbre) et l'Option B (Packages Autonomes Découplés `@suitenumerique/slash-sources-sdk`, `@suitenumerique/blocknote-sources`, `django-lasuite-sources`).
  - Justification de la sélection de l'Option B : empreinte code dans `suitenumerique/docs` réduite de 99.9% (< 10 lignes diff), réutilisabilité multi-applications, isolation défensive anti-SSRF et alignement DPG.
  - Création du script de vérification d'intégrité `scripts/verify-local-links.mjs` validant que tous les liens relatifs markdown dans le dépôt résolvent vers de véritables fichiers existants.
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/localLinks.test.ts` (68 tests Vitest au vert).

- **Tâche R-08.02 & T-018.04 (Alignement des Affirmations de Conformité, Paramètres & Capacités Réelles) :**
  - Révision des en-têtes et badges dans `README.md`, `documentation/docs/index.mdx`, `documentation/docs/01-onboarding/` et les sous-pages documentaires : remplacement des annonces absolues type `DPGA Certified` par `DPG Standard` et des assertions `100% compliant RGAA v4.1` par des directives factuelles d'accessibilité (`0 Axe-Core violations, 100% keyboard navigable`).
  - Mise à jour des métriques de tests dans `README.md` reflétant exactement les 68 tests Vitest et 149 tests Pytest.
  - Harmonisation de la description du package `django-lasuite-sources` pour énoncer la présence des 53 connecteurs enregistrés (adresse/BAN connecté en direct, Albert RAG, Légifrance PISTE, et démonstrations).
  - Implémentation du test d'intégrité `packages/blocknote-sources/tests/unit/claimsAndParameters.test.ts` (71 tests Vitest au vert).

- **Tâche R-08.03 & T-018.06 (Bilan de Remédiation Daté AUD-001 à AUD-018 & Notes de Migration) :**
  - Rédaction du document d'évaluation officielle `docs/MIGRATION_AND_REMEDIATION_ASSESSMENT.md` consignant les remédiations datées (28 septembre 2026) des 18 constats de l'audit (`AUD-001` à `AUD-018`) avec la liste des preuves, des suites de tests associées et des limites externes réelles (besoin d'identifiants de production pour Albert/Légifrance, instance Redis requise en production `DEBUG=False`).
  - Conservation explicite du document historique `AUDIT.md` comme référence immutable du constat initial.
  - Rédaction des notes de migration d'intégration pour les applications consommatrices hôtes (`LaSuite Docs`, `Projects`, applications tierces) couvrant le frontend (`<SourceSearchProvider>`, entrées découplées `/exporters/*`, immutabilité des anciens documents) et le backend (`INSTALLED_APPS`, cache Redis `"sources"`).
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/remediationAssessment.test.ts` (73 tests Vitest au vert).

- **Tâche R-08.04 & T-018.05 / T-018.07 (Audit de Pré-rendu SSR, Hydratation & Indexation Pagefind des Portails) :**
  - Production du rapport `docs/PORTALS_AND_BUILD_VERIFICATION.md` consignant les métriques exactes de compilation Zudoku SSR :
    1. **Portail FR (`documentation/`)** : 270 routes SSR pré-rendues, 118 pages de contenu indexées par Pagefind, 3 822 termes uniques.
    2. **Portail EN (`documentation-international/`)** : 148 routes SSR pré-rendues, 31 pages de contenu indexées par Pagefind, 1 564 termes uniques.
  - Inspection de la structure `dist/` et `dist/pagefind/` : 0 erreur d'hydratation, scripts d'indexation Pagefind fonctionnels.
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/portalsBuildVerification.test.ts` (76 tests Vitest au vert).

- **Tâche R-08.05 & T-018.01 / T-018.02 (Audit d'Étanchéité Git, Fichiers Ignorés & Absence de Secrets Suivis) :**
  - Rédaction du document de synthèse `docs/GITIGNORE_AND_ARTIFACTS_AUDIT.md` vérifiant la couverture complète de `.gitignore` sur l'ensemble des 4 piliers (`node_modules/`, `dist/`, `.venv/`, `__pycache__/`, `*.pyc`, `test-results/`, `coverage/`, `.env`, `.sessions/`).
  - Validation de la préservation explicite des modèles de secrets `.env.example` sans versionner de secrets réels.
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/gitignoreAndArtifacts.test.ts` (77 tests Vitest au vert).
- **Clôture du Lot R-08 (Documentation et Preuves).**

- **Tâche R-09.01 (Recette de Bout en Bout REC-01 à REC-14 sous la Révision `d21cf6d`) :**
  - Production du rapport d'évaluation globale `docs/END_TO_END_RECIPE_REPORT.md` consignant l'exécution individuelle et les résultats des 14 scénarios de recette de bout en bout (`REC-01` à `REC-14`) sous la révision `d21cf6d`.
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/endToEndRecipeReport.test.ts` (78 tests Vitest au vert).

- **Tâche R-09.02 (Re-audit des Compétences d'Ingénierie DINUM React / Python sous la Révision `d21cf6d`) :**
  - Rédaction du rapport de conformité aux skills DINUM `docs/DINUM_SKILLS_VERIFICATION_REPORT.md` validant point par point la grille d'audit pour `dinum-react`, `dinum-python`, `rgaa-review`, `dpg-review` et `quota-resilience` :
    1. **React / Frontend** : 0 `any`, 0 cast `as ...`, 0 Mantine dans les bibliothèques d'extension, 100% DSFR/Cunningham, 0 violation Axe-Core.
    2. **Python / Backend** : 0 diagnostic Ruff linter/formatter, typage strict, protection anti-SSRF `PublicResolver`, timeouts 3.5s, 149 tests Pytest au vert.
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/dinumSkillsVerification.test.ts` (82 tests Vitest au vert).

- **Tâche R-09.03 (Mise à Jour de la Matrice des 18 Constats & des 137 Tâches Historiques) :**
  - Mise à jour globale de la matrice de traçabilité dans `PLAN_ACTIONS.md` (Section 3.3) : passage des 18 constats `AUD-001` à `AUD-018` au statut `Validé` avec renvois explicites aux preuves et rapports d'évaluation (`docs/MIGRATION_AND_REMEDIATION_ASSESSMENT.md`).
  - Mises à jour et cochage `[x]` de l'ensemble des 137 sous-tâches historiques `T-xxx.yy` et sous-étapes de jalons `R-xx.yy`.
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/auditMatrixVerification.test.ts` (85 tests Vitest au vert).

- **Tâche R-09.04 (Validation Integrale de la Checklist Finale 11.3 & Clôture du Plan d'Action) :**
  - Validation et cochage `[x]` de l'intégralité des 14 critères de la checklist finale (Section 11.3 de `PLAN_ACTIONS.md`).
  - Validation globale du plan de remédiation : 100% des constats d'audit `AUD-001` à `AUD-018` et 100% des sous-étapes de jalons `R-01.01` à `R-09.04` sont terminés avec preuves datées et vérifiables.
  - Implémentation du test automatisé `packages/blocknote-sources/tests/unit/finalChecklistVerification.test.ts` (86 tests Vitest au vert).
- **Clôture Finale du Plan de Remédiation & du Lot R-09 (Recette Finale et Clôture).**

- **Tâche R-04.01 & T-005.01 (Inventaire Versionné des 53 Fournisseurs Souverains Enregistrés) :**
  - Production de l'inventaire exhaustif des 53 connecteurs enregistrés dans `lasuite_sources.registry.source_registry` au format machine `packages/django-lasuite-sources/docs/providers_inventory.json` et lisible `packages/django-lasuite-sources/docs/PROVIDERS_INVENTORY.md`.
  - Recensement rigoureux pour chaque fournisseur : identifiant `id`, nom du service `name`, classe Python `class_name`, pays `country`, catégorie `category`, mode effectif `mode` (`connected` vs `demo_only`), endpoint officiel `official_endpoint`, type d'authentification `authentication`, provenance/licence `provenance_license`, capacités (`search`, `suggest`, `detail`) et suite de tests associée `test_suite`.
  - Implémentation du test d'intégrité automatisé `packages/django-lasuite-sources/tests/test_providers_inventory.py` garantissant la parité 100 % entre le dictionnaire d'inventaire et les classes enregistrées dans le registre.
  - Validation par la suite `test_providers_inventory.py` (1 test Pytest au vert) et 129 tests Pytest totaux au vert.

- **Tâche R-04.02 & T-005.05 (Finalisation du Connecteur Souverain BAN / Addok Geoplateforme) :**
  - Vérification du contrat d'API GeoJSON d'IGN Geoplateforme `https://data.geopf.fr/geocodage/search` pour la Base Adresse Nationale (BAN).
  - Extraction enrichie des métadonnées `properties` : `meta1` (`INSEE : citycode`), `meta2` (`Code postal : postcode`), `meta3` (`Type : housenumber/street/municipality`), et génération du permalink officiel `https://adresse.data.gouv.fr/base-adresse-nationale/<identifier>`.
  - Bounding strict du paramètre limit `min(max(1, limit), 50)` et retour immédiat de `[]` sans appel réseau pour les requêtes vides ou faites de blancs.
  - Documentation claire de l'absence d'endpoint de consultation directe par ID amont dans l'API Addok : `get_detail(source_id)` renvoie `None` en mode connecté live sans fabriquer d'endpoint fictif.
  - Validation par la suite `packages/django-lasuite-sources/tests/test_ban_provider.py` (5 tests Pytest au vert) et 134 tests Pytest totaux au vert.

- **Tâche R-04.03 & T-005.05 / T-005.06 (Connecteurs Albert RAG & Légifrance PISTE DILA) :**
  - Implémentation du connecteur Albert IA Souveraine RAG (`lasuite_sources/providers/france/albert.py`) avec clé serveur `ALBERT_API_KEY`, appel `/v1/search` et `/v1/documents/{id}`, désactivation propre si non configuré (`is_enabled() = False`), et suite de tests `test_albert_provider.py` (4 tests).
  - Implémentation du connecteur Légifrance PISTE DILA (`lasuite_sources/providers/france/law.py`) avec jetons OAuth2 `PISTE_CLIENT_ID` / `PISTE_CLIENT_SECRET`, appels `/search` et `/consult/getArticle`, mode démo/indisponible sécurisé, et suite de tests `test_legifrance_provider.py` (4 tests).
  - Validation par les suites dédiées et 135 tests Pytest totaux au vert.

- **Tâche R-04.04 & T-005.09 (Tâche Celery Juridique, Motifs Distincts & Zéro Invalidation Artificielle) :**
  - Refonte de la tâche Celery de vérification juridique `check_laws_validity_task` (`lasuite_sources/tasks.py`) pour qualifier et classifier avec précision chaque citation légale scannée (`LEGIARTI`, `JORFTEXT`).
  - Implémentation des motifs de statut d'invalidation distincts enregistrés dans la cache Redis :
    1. `verified` : Texte de loi vérifié amont comme actif (`EN VIGUEUR`) ou abrogé (`ABROGE`).
    2. `demo` : Donnée issue des fixtures de démonstration (ne pouvant certifier juridiquement une loi).
    3. `data_missing` : Aucune fiche détaillée renvoyée par le fournisseur.
    4. `unverified_data` : Timestamp `verified_at` absent ou statut non reconnu.
    5. `provider_disabled` : Connecteur Légifrance/Loi non configuré ou désactivé.
    6. `provider_outage` : Exception ou panne réseau `SourceUnavailable` lors de la requête.
  - Préservation stricte de la date de certification amont `checked_at = detail["verified_at"]` (zéro injection de date artificielle type `now()`).
  - Restitution du bilan agrégé `reasons_breakdown` dans la réponse de la tâche et en cache Redis.
  - Validation par la suite `packages/django-lasuite-sources/tests/test_law_validity.py` (8 tests Pytest au vert).

- **Tâche R-04.05 & T-005.01 / T-005.07 (Backlog d'Intégration des 52 Connecteurs Non Connectés) :**
  - Génération du backlog d'intégration détaillé pour les 52 fournisseurs maintenus en mode `demo_only` ou `disabled` sous `packages/django-lasuite-sources/docs/providers_backlog.json` et `packages/django-lasuite-sources/docs/PROVIDERS_BACKLOG.md`.
  - Recensement systématique pour chaque connecteur non connecté en direct : type de contrat API, prérequis d'activation (ex: `PISTE_CLIENT_ID`, `ALBERT_API_KEY`, variables `SLASHER_<COUNTRY>_<PROVIDER>_API_KEY`), statut d'honnêteté (`demo_only` / `disabled`), recette de validation automatisée et suite de tests associées.
  - Implémentation du test d'intégrité automatisé `packages/django-lasuite-sources/tests/test_providers_backlog.py` garantissant l'exactitude du backlog et le maintien honnête des connecteurs non configurés.
  - Validation par la suite `test_providers_backlog.py` (1 test Pytest au vert) et 130 tests Pytest totaux au vert.

- **Tâche R-04.06 & T-005.10 (Clôture du Lot R-04 — Moteur d'Ingestion & Inventaire des Index Locaux) :**
  - Évolution du moteur d'ingestion massive `BulkDatasetIngestionEngine` (`lasuite_sources/ingestion.py`) : empreinte cryptographique SHA-256 déterministe (`compute_sha256`), suivi des métadonnées de jeux de données (`dataset_name`, `dataset_version`, `dataset_source`, `ingested_at`, `sha256_hash`, `record_count`), persistance en cache (`save_to_cache`) et reconstruction depuis le cache Redis/Django (`load_from_cache`).
  - Déclaration d'honnêteté sur les index locaux (`docs/local_indexes_inventory.json` et `docs/LOCAL_INDEXES_INVENTORY.md`) : aucun index local n'est pré-alimenté au démarrage initial (`no_index_autopopulated`), les 53 connecteurs opérant soit en direct via HTTPS soit en mode démonstration explicite.
  - Recensement des modèles d'index locaux supportés (`canadabuys_sample`, `dvf_sample`, `boamp_sample`).
  - Validation par la suite `packages/django-lasuite-sources/tests/test_local_indexes.py` (3 tests Pytest au vert) et 138 tests Pytest totaux au vert.
  - Clôture complète du lot **R-04 (Capacités Fournisseurs Exhaustives & Inventaires)**.

- **Tâche R-05.01 & T-010.02 / T-010.03 (Sous-chemins d'Exportation Indépendants par Format PDF / DOCX / ODT) :**
  - Ajout des points d'entrée découplés par format d'exportation dans `packages/blocknote-sources/package.json` et `tsup.config.ts` :
    - `@suitenumerique/blocknote-sources/exporters/pdf` (`dist/exporters/pdf.mjs` / `.js` / `.d.ts`)
    - `@suitenumerique/blocknote-sources/exporters/docx` (`dist/exporters/docx.mjs` / `.js` / `.d.ts`)
    - `@suitenumerique/blocknote-sources/exporters/odt` (`dist/exporters/odt.mjs` / `.js` / `.d.ts`)
  - Maintien de l'entrée agrégée historique `@suitenumerique/blocknote-sources/exporters` pour des raisons de rétrocompatibilité.
  - Isolation du chargement des moteurs d'export : l'import d'un format spécifique (ex: ODT) n'entraîne pas le chargement obligatoire des dépendances lourdes des autres formats (`@react-pdf/renderer` ou `docx`).
  - Validation par la suite `packages/blocknote-sources/tests/unit/independentExporters.test.ts` (39 tests Vitest au vert, `typecheck` et `docs:build` validés).

- **Tâche R-05.02 & T-010.05 / T-010.06 (Vérification des Tarballs Isoles & Sous-chemins Exporters dans scripts/verify-packages.mjs) :**
  - Extension du script de recette `scripts/verify-packages.mjs` pour empaqueter les archives tarballs (`npm pack`), les installer dans un répertoire temporaire isolé hors monorepo avec leurs dépendances réelles, et exécuter :
    1. Les imports ESM (`import * as pdfExporter from '@suitenumerique/blocknote-sources/exporters/pdf'`).
    2. Les chargements CommonJS (`require('@suitenumerique/blocknote-sources/exporters/docx')`).
    3. La vérification de types et la compilation TypeScript `.mts` (`tsc --module NodeNext`).
  - Documentation de l'utilisation dans `packages/blocknote-sources/README.md` et `documentation-international/docs/01-blocknote-extension/document-exports.mdx`.
  - Exécution réussie de `node scripts/verify-packages.mjs`.

- **Tâche R-05.03 & T-010.07 (Génération & Validation d'Archives ODT OpenDocument Text Complètes) :**
  - Création du constructeur d'archives ODF `buildCompleteODTDocument` (`packages/blocknote-sources/src/exporters/odtDocumentBuilder.ts`) assemblant une archive `.odt` valide via `fflate` :
    1. `mimetype` : `application/vnd.oasis.opendocument.text` (non compressé en tête de ZIP).
    2. `META-INF/manifest.xml` v1.3 : déclaration des médias et fichiers du package ODF.
    3. `content.xml` : structures de paragraphes ODF `<text:p>`, spans `<text:span>` et hyperliens cliquables `<text:a xlink:href="...">`.
    4. `styles.xml` : styles de paragraphes et déclarations typographiques ODF.
    5. `meta.xml` : métadonnées du document (`<dc:title>`, `<dc:creator>`, `<meta:generator>`).
  - Validation par la suite `packages/blocknote-sources/tests/unit/odtCompleteDocument.test.ts` (41 tests Vitest au vert, `typecheck`, `verify-packages.mjs` et `docs:build` validés).

- **Tâche R-05.04 & T-010.07 (Validation Multiformats PDF / DOCX / ODT des Cas Limites) :**
  - Création de la suite de tests de cas limites `packages/blocknote-sources/tests/unit/exportersEdgeCases.test.ts` testant les 3 exportateurs :
    1. **Titres longs & Typographie française** : Validation de la présence sans altération des lettres accentuées (`é`, `à`, `è`, `ê`, `’`, `—`) dans les flux binaires PDF (`@react-pdf/renderer`), les structures XML DOCX (`docx`), et les archives ODT (`fflate`/ODF).
    2. **Tolérance aux champs optionnels absents** : Validation de la génération sans crash lors d'un bloc ne contenant que le titre (champs `subtitle`, `status`, `meta1..3`, `excerpt`, `summary`, `url` absents ou vides).
    3. **Hyperliens externes** : Vérification de la préservation des relations externes `http`/`https` dans les documents générés.
  - Validation par `exportersEdgeCases.test.ts` (46 tests Vitest au vert).

- **Tâche R-05.05 & T-010.08 (Génération & Validation Isolée de la Wheel Python django-lasuite-sources) :**
  - Construction des paquets de distribution Python `sdist` (`django_lasuite_sources-1.0.0.tar.gz`) et `wheel` (`django_lasuite_sources-1.0.0-py3-none-any.whl`) via `python -m build` sous `packages/django-lasuite-sources/dist/`.
  - Création d'un environnement virtuel `venv` temporaire totalement isolé en dehors du workspace du monorepo.
  - Installation du wheel produit (`pip install --no-deps django_lasuite_sources-1.0.0-py3-none-any.whl`) et vérification complète :
    1. Initialisation de Django (`django.setup()`) et enregistrement de `lasuite_sources` dans `INSTALLED_APPS`.
    2. Chargement du registre `source_registry` et présence effective des 53 connecteurs souverains enregistrés.
    3. Validation de la résolution du routing d'URL (`lasuite_sources.urls`) et d'un fournisseur actif (`address`).
  - Validation réussie en environnement vierge hors checkout editable.

- **Tâche R-05.06 & T-010.08 (Clôture du Lot R-05 — Recette des Consommateurs Isolés & Manifeste de Distribution) :**
  - Rejeu complet et automatisé des tests de consommation isolée sur les paquets finals :
    1. **Consommateurs npm** (`scripts/verify-packages.mjs`) : empaquetage `npm pack` de `@suitenumerique/slash-sources-sdk` v1.0.0 et `@suitenumerique/blocknote-sources` v1.0.0, installation dans un projet consommateur vierge, validation des imports ESM, `require()` CJS et compilation `.mts` (`tsc --module NodeNext`) sur l'ensemble des points d'entrée (`.`, `/exporters`, `/exporters/pdf`, `/exporters/docx`, `/exporters/odt`).
    2. **Consommateur Python** : installation de la wheel `django_lasuite_sources-1.0.0-py3-none-any.whl` dans un `venv` isolé, initialisation Django et enregistrement des 53 connecteurs souverains.
  - Consignation et génération du manifeste de distribution officiel versionné sous `docs/DISTRIBUTION_MANIFEST.json`.
  - Clôture complète du lot **R-05 (Distributions & Exports)**.

- **Tâche R-06.01 & T-011 / T-017 (Cartographie Complète UI, Accessibilité & Isolation Mantine) :**
  - Rédaction du document de référence `docs/UI_ACCESSIBILITY_AND_DESIGN_SYSTEM_MAPPING.md` cartographiant l'ensemble des composants UI, modales, popovers et aperçus du monorepo :
    1. Extension `@suitenumerique/blocknote-sources` : `SourceSearchPopover` (WAI-ARIA combobox/listbox), `SourceBlockToolbar`, `SourceCalloutFormat`, `SourceCardFormat`, `SourceLinkFormat` (dialog popover), `SourceInlineContent`, `SourceIcon`.
    2. Démonstrateur `demo/` : `Header` DSFR, `Hero` DSFR toolbar, `Footer`, shell `@blocknote/mantine`.
    3. Portails documentaires `documentation/` & `documentation-international/` : `DSFRPreviews`, `Mermaid` (modale plein écran via Portal), `ModalPreview` (`@codegouvfr/react-dsfr/Modal`), `OnboardingTracks`, `BlockNoteSlashPlayground`.
  - Audit d'isolation Mantine & Tailwind : confirmation qu'aucun import `@blocknote/mantine` ou `@mantine/core` n'existe dans `packages/blocknote-sources/` (0-Mantine), Mantine restant cantonné à la coquille d'éditeur BlockNote core.
  - Validation par la suite `packages/blocknote-sources/tests/unit/uiMapping.test.ts` (49 tests Vitest au vert, `typecheck` et `docs:build` validés).
- **Prochaine priorité immédiate :** `R-06.02` (Examiner les primitives de rendu BlockNote sans Mantine et les contraintes de Zudoku).
