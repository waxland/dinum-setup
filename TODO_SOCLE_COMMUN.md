# 📐 Spécification & Plan d'Harmonisation du Socle Commun (`TODO_SOCLE_COMMUN.md`)

Ce document constitue le **plan directeur de normalisation et d'harmonisation architecturale** pour l'ensemble des commandes slash (`/`) présentes et futures dans **La Suite Docs** (`docs/08-slash/`).

Il définit la structure cible standardisée, explicite les réflexions métier approfondies, détaille les benchmarks d'APIs souveraines (dont **Tricoteuse** pour l'Assemblée nationale, **Albert API** pour le droit, **API Entreprise** pour les sociétés et **Addok / BAN** pour les adresses), et fournit la feuille de route exhaustive fichier par fichier avec leurs métadonnées exactes.

---

## 🎯 1. Vision & Principes Fondamentaux du Socle Commun

Toutes les commandes de données externes dans La Suite Docs obéissent à **trois règles d'or architecturales** :

1. **Uniformité Structurelle Stricte (`1 Commande = 1 Dossier = Même Arborescence`) :**  
   Chaque commande slash est isolée dans son sous-dossier numéroté à la racine de `docs/08-slash/` et suit rigoureusement le même découpage en 3 pôles sous-jacents :
   - 📁 `01-metier-<nom>/` : Contexte métier administratif, doctrine, vocabulaire, règles d'usage et cas réels d'agents publics.
   - 📁 `02-api-<nom>/` : Veille technique, benchmark comparatif des sources (API officielles, open-data, IA souveraine), sécurité, authentification et contrats de données.
   - 📁 `03-implementation-<nom>/` : Raccordement technique direct au socle commun (Provider Django Python `BaseSourceProvider`, composant React universel `SourceBlockSpec` aux 3 modes DSFR, cache Redis et Feature Flagging).

2. **Unicité du Composant d'Affichage Frontend (`SourceBlockSpec`) :**  
   Aucune commande ne crée son propre composant visuel isolé. Toutes partagent le même composant BlockNote universel qui restitue l'entité sous **3 formats DSFR interchangeables** :
   - 📢 **Format `Callout`** : Mise en exergue officielle avec extrait textuel in extenso et badge de statut.
   - 🗂️ **Format `Carte`** : Synthèse multi-critères avec grille responsive de 3 métadonnées clés.
   - 🔗 **Format `Lien`** : Badge compact inline dans la phrase avec popover flottant au survol (modèle `/link-doc`).

3. **Gouvernance & Feature Flagging Piloté par l'Environnement :**  
   Si les variables d'environnement requises pour une API ne sont pas configurées, la commande correspondante est **masquée dynamiquement du menu slash**, sans erreur 500 ni dégradation de l'expérience utilisateur.

---

## 🧭 2. Matrice Normée d'Arborescence & de Nomenclature (`XX`)

Chaque dossier de commande `docs/08-slash/<num>-<nom>/` respectera scrupuleusement la structure suivante :

```text
docs/08-slash/<num>-<nom>/
├── index.mdx                                # Hub d'accueil de la commande & synthèse
│
├── 01-metier-<nom>/                         # 🏢 1. Pôle Métier & Cas d'Usage
│   ├── 01-fondations-et-cadre.mdx           #    - Compréhension du domaine, cadre légal ou administratif
│   └── 02-cas-usage-et-scenarios.mdx        #    - Situations de travail réelles d'agents publics
│
├── 02-api-<nom>/                            # 📡 2. Pôle API & Veille Technique
│   ├── 01-benchmark-des-apis.mdx            #    - Comparatif des sources (Officielle, Open Data, IA)
│   └── 02-specifications-techniques.mdx     #    - Endpoints, auth, DTOs, rate limits & quotas
│
└── 03-implementation-<nom>/                 # 💻 3. Pôle Implémentation Socle
    ├── 01-provider-django.mdx               #    - Classe Python héritant de BaseSourceProvider
    └── 02-rendu-et-settings.mdx             #    - Mapping vers SourceBlockSpec & Feature Flagging
```

---

## 🔍 3. État des Lieux & Diagnostic de l'Existant dans `docs/08-slash/`

| Dossier Actuel | État Actuel | Écarts par Rapport au Standard | Actions de Normalisation Requises |
| :--- | :--- | :--- | :--- |
| **`docs/08-slash/01-loi/`** | Structure hybride (`01-fondations-juridiques`, `02-api-legifrance-piste`, `03-cas-usage-metier.mdx`, `settings.mdx`) | Cas d'usage et settings sous forme de fichiers plats ; pas de sous-dossier `03-implementation-loi`. | Restructurer en `01-metier-loi/`, `02-api-loi/` (avec benchmark PISTE vs Albert API) et `03-implementation-loi/`. |
| **`docs/08-slash/02-assemblee/`** | Fichiers plats (`01-api-claire-vite-assemblee.mdx`, `02-cas-usage-veille-parlementaire.mdx`) | Absence de sous-dossiers normés et manque de benchmark avec l'écosystème Tricoteuse / Regards Citoyens. | Restructurer en `01-metier-assemblee/`, `02-api-assemblee/` (claire.vite vs Tricoteuse) et `03-implementation-assemblee/`. |
| **`docs/08-slash/03-entreprise/`** | Fichiers plats (`01-api-entreprises-pappers.mdx`, `02-cas-usage-marches-publics.mdx`) | Absence de sous-dossiers `01-metier-entreprise/`, `02-api-entreprise/` et `03-implementation-entreprise/`. | Créer l'arborescence à 3 pôles avec benchmark Pappers vs API Entreprise vs RNE/INPI. |
| **`docs/08-slash/04-adresse/`** | Fichiers plats (`01-api-base-adresse-nationale.mdx`, `02-cas-usage-territoriaux-et-courriers.mdx`, `settings.mdx`) | Absence de sous-dossiers `01-metier-adresse/`, `02-api-adresse/` et `03-implementation-adresse/`. | Restructurer en 3 sous-dossiers avec benchmark BAN vs Addok vs IGN Géoplateforme. |
| **Socle Transverse** | Fichiers d'architecture racine (`00-socle-technique.mdx`, `01-architecture-...`, etc.) | Sert de référence générique pour toutes les commandes. | Conserver comme référentiel technique transverse. |

---

## 💡 4. Réflexions Approfondies par Thématique & Commande

---

### A. Commande `/loi` — Droit Public, Législation & Jurisprudence

#### 🧠 1. Réflexion Métier & Enjeux Administratifs
- **Sécurité juridique des actes administratifs :** Les arrêtés préfectoraux, délibérations des collectivités territoriales et règlements de consultation des marchés publics doivent impérativement reposer sur le droit positif en vigueur sous peine de recours contentieux devant le tribunal administratif.
- **Problématique du temps juridique :** Un texte de loi évolue constamment (promulgation, décrets d'application, arrêtés, abrogation partielle). L'agent a besoin de connaître instantanément l'état de vigueur (`VIGUEUR`, `ABROGÉ`, `VIGUEUR DIFFÉRÉE`).
- **Typologie des utilisateurs cibles :** Juristes de ministères, secrétaires généraux de mairie, acheteurs publics, délégués à la protection des données (DPO), instructeurs d'urbanisme.

#### 📡 2. Réflexion & Benchmark des APIs Sources
Dans `02-api-loi/01-benchmark-des-apis.mdx`, comparer trois approches complémentaires :

<Mermaid chart={`flowchart TD
    subgraph Sources["Sources Juridiques Disponibles"]
        PISTE["1. API PISTE / DILA (Légifrance Engine)<br/>Base officielle brute (LEGI, JORF, KALI, CETAT, JURI)"]
        Albert["2. API Albert (IA Souveraine DINUM / Etalab)<br/>Moteur RAG juridique souverain & recherche sémantique"]
        JudiLibre["3. API Judilibre / Cour de Cassation<br/>Open Data des décisions de justice judiciaire"]
    end

    subgraph UsageDocs["Intégration dans La Suite Docs"]
        LoiExacte["Recherche par référence exacte (ex: 'Art. L. 111-1') ➔ PISTE"]
        LoiSemantique["Recherche par question en langage naturel ➔ Albert API"]
        LoiJuris["Recherche de jurisprudence ➔ PISTE / Judilibre"]
    end

    PISTE --> LoiExacte
    Albert --> LoiSemantique
    JudiLibre --> LoiJuris
`} />

1. **Option A : API PISTE / DILA (Légifrance Engine)**
   - *Forces :* Référentiel légal officiel opposable de l'État, authentification standardisée OAuth2 Client Credentials, exhaustivité des codes et lois.
   - *Limites :* Recherche textuelle stricte basée sur des mots-clés exacts, pas de compréhension sémantique des questions complexes.
2. **Option B : API Albert (IA Souveraine de l'État — DINUM / Etalab)**
   - *Forces :* Recherche sémantique en langage naturel (*« Quelle est la durée de conservation des données d'un agent public ? »*), génération de synthèses fiables sans hallucination et citation précise des articles sources.
   - *Limites :* Nécessite une clé d'accès au cluster Albert et une latence de traitement plus élevée (~800ms vs ~150ms).
3. **Option C : Judilibre & Légicarto (Open Data Justice)**
   - *Forces :* Accès ouvert et direct aux décisions de justice judiciaire anonymisées.

#### 📋 3. Plan de Fichiers Cible pour `docs/08-slash/01-loi/`

1. **`docs/08-slash/01-loi/index.mdx`**
   - *Title :* `Commande Slash /loi — Légifrance & Droit Français`
   - *Sidebar Label :* `Vue d'Ensemble`
   - *Description :* `Hub complet de la commande /loi : accès au droit officiel, hiérarchie des normes, benchmark API PISTE vs Albert et implémentation sur le socle commun.`
2. **`docs/08-slash/01-loi/01-metier-loi/01-fondations-et-cadre.mdx`**
   - *Title :* `Hiérarchie des Normes & Structure des Textes Juridiques`
   - *Sidebar Label :* `1. Hiérarchie & Structure`
   - *Description :* `Pyramide de Kelsen, structure des codes (parties législative et réglementaire), numérotation des articles et règles de citation administrative.`
3. **`docs/08-slash/01-loi/01-metier-loi/02-cas-usage-et-scenarios.mdx`**
   - *Title :* `Cas d'Usage Métier — Commande /loi`
   - *Sidebar Label :* `2. Cas d'Usage Métier`
   - *Description :* `Scénarios réels de travail : visas des arrêtés, rédaction des CCTP de marchés publics, instruction d'urbanisme et conformité RGPD.`
4. **`docs/08-slash/01-loi/02-api-loi/01-benchmark-des-apis.mdx`**
   - *Title :* `Benchmark des APIs Juridiques — PISTE vs Albert API vs Judilibre`
   - *Sidebar Label :* `1. Benchmark des APIs`
   - *Description :* `Étude comparative des sources de données juridiques souveraines : moteur officiel PISTE / DILA, IA juridique Albert et Open Data Judilibre.`
5. **`docs/08-slash/01-loi/02-api-loi/02-specifications-techniques.mdx`**
   - *Title :* `Spécifications Techniques — Endpoints PISTE & Contrats de Données`
   - *Sidebar Label :* `2. Spécifications & OAuth2`
   - *Description :* `Protocole OAuth2 Client Credentials PISTE, endpoints /suggest et /search, mapping des fonds (LODA, CODE, JORF) et payloads JSON.`
6. **`docs/08-slash/01-loi/03-implementation-loi/01-provider-django.mdx`**
   - *Title :* `Implémentation Backend — LawSourceProvider Django`
   - *Sidebar Label :* `1. Provider Django`
   - *Description :* `Code source complet du LawSourceProvider Python implémentant BaseSourceProvider, cache Redis 24h et mode Mock local.`
7. **`docs/08-slash/01-loi/03-implementation-loi/02-rendu-et-settings.mdx`**
   - *Title :* `Rendu DSFR & Activation Conditionnelle (/loi)`
   - *Sidebar Label :* `2. Rendu & Settings`
   - *Description :* `Déclinaison des 3 modes d'affichage DSFR (Callout, Carte, Lien), Feature Flagging piloté par l'environnement et rétrocompatibilité CRDT.`

---

### B. Commande `/assemblee` — Travail Parlementaire, Amendements & Débats

#### 🧠 1. Réflexion Métier & Enjeux Parlementaires
- **Le rythme parlementaire en cabinet ministériel :** Pendant la discussion d'un projet de loi dans l'hémicycle de l'Assemblée nationale ou du Sénat, les conseillers préparent les **fiches de banc**, suivent en temps réel le sort des amendements (*Adopté*, *Rejeté*, *Retiré*, *Tombé*, *Non soutenu*) et ajustent les argumentaires du ministre.
- **Traçabilité des débats et questions :** Préparation des réponses aux Questions au Gouvernement (QAG) et historique des votes des députés par groupe politique.
- **Typologie des utilisateurs cibles :** Conseillers parlementaires en cabinet, chargés de mission aux affaires législatives en administration centrale, assistants parlementaires, journalistes et observateurs du débat public.

#### 📡 2. Réflexion & Benchmark des APIs Sources
Dans `02-api-assemblee/01-benchmark-des-apis.mdx`, comparer trois architectures :

<Mermaid chart={`flowchart TD
    subgraph SourcesAN["Écosystème des Données Parlementaires"]
        Claire["1. API claire.vite<br/>API unifiée moderne, temps réel et légère pour les amendements"]
        Tricoteuse["2. API / Outils Tricoteuse (Regards Citoyens)<br/>Indexeur open-source complet des flux XML/JSON bruts de l'AN"]
        OpenDataAN["3. Open Data Direct Assemblée Nationale<br/>Flux officiels data.assemblee-nationale.fr (Dossiers, Acteurs, Scrutins)"]
    end

    subgraph ProxyAN["Raccordement Docs"]
        ProviderAN["ParliamentSourceProvider (Socle Commun Django)"]
    end

    Claire --> ProviderAN
    Tricoteuse --> ProviderAN
    OpenDataAN --> ProviderAN
`} />

1. **Option A : API `claire.vite`**
   - *Forces :* Interface JSON REST moderne, ultra-rapide, spécialement optimisée pour le filtrage par numéro d'amendement et dossier législatif.
   - *Limites :* Dépendance envers l'hébergement du service `claire.vite`.
2. **Option B : Écosystème `Tricoteuse` (Regards Citoyens)**
   - *Forces :* Logiciel libre de référence développé par l'association Regards Citoyens pour parser, normaliser et synchroniser en continu l'ensemble des dépôts open-data de l'Assemblée (comptes-rendus intégraux, amendements, votes, fiches des députés). Permet d'héberger son propre serveur de données parlementaires 100% souverain sans dépendance externe.
   - *Limites :* Nécessite un pipeline d'ingestion régulier des dumps de données.
3. **Option C : Open Data officiel direct (`data.assemblee-nationale.fr`)**
   - *Forces :* Source institutionnelle brute sans intermédiaire.
   - *Limites :* Fichiers XML volumineux nécessitant un temps de parsing et de structuration backend.

#### 📋 3. Plan de Fichiers Cible pour `docs/08-slash/02-assemblee/`

1. **`docs/08-slash/02-assemblee/index.mdx`**
   - *Title :* `Commande Slash /assemblee — Travail Parlementaire & Assemblée Nationale`
   - *Sidebar Label :* `Vue d'Ensemble`
   - *Description :* `Hub de la commande /assemblee : suivi des projets de loi, amendements en séance, fiches députés et benchmark claire.vite vs Tricoteuse.`
2. **`docs/08-slash/02-assemblee/01-metier-assemblee/01-fondations-et-cadre.mdx`**
   - *Title :* `Fonctionnement du Travail Parlementaire & Navette Législative`
   - *Sidebar Label :* `1. Navette & Procédure`
   - *Description :* `Cycle de vie d'un projet de loi (dépôt, commission, séance, CMP), typologie des amendements et organisation des groupes politiques.`
3. **`docs/08-slash/02-assemblee/01-metier-assemblee/02-cas-usage-et-scenarios.mdx`**
   - *Title :* `Cas d'Usage — Fiches de Banc en Cabinet & Veille Législative`
   - *Sidebar Label :* `2. Fiches de Banc & Débats`
   - *Description :* `Préparation collaborative des fiches de banc ministérielles, suivi des votes en direct et rédaction des argumentaires.`
4. **`docs/08-slash/02-assemblee/02-api-assemblee/01-benchmark-des-apis.mdx`**
   - *Title :* `Benchmark des APIs Parlementaires — claire.vite vs Tricoteuse vs Open Data AN`
   - *Sidebar Label :* `1. Benchmark des APIs`
   - *Description :* `Comparatif technique entre l'API claire.vite, l'ingesteur open-source Tricoteuse (Regards Citoyens) et l'Open Data officiel de l'Assemblée.`
5. **`docs/08-slash/02-assemblee/02-api-assemblee/02-specifications-techniques.mdx`**
   - *Title :* `Spécifications Techniques — Endpoints Parlementaires & DTOs`
   - *Sidebar Label :* `2. Spécifications Techniques`
   - *Description :* `Modèles JSON des dossiers législatifs, amendements (numéro, article visé, sort), députés et résultats de scrutins.`
6. **`docs/08-slash/02-assemblee/03-implementation-assemblee/01-provider-django.mdx`**
   - *Title :* `Implémentation Backend — ParliamentSourceProvider Django`
   - *Sidebar Label :* `1. Provider Django`
   - *Description :* `Implémentation Python du ParliamentSourceProvider, cache court (5 min en séance) et gestion du fallback local.`
7. **`docs/08-slash/02-assemblee/03-implementation-assemblee/02-rendu-et-settings.mdx`**
   - *Title :* `Rendu DSFR Parlementaire & Feature Flagging`
   - *Sidebar Label :* `2. Rendu & Settings`
   - *Description :* `Affichage des amendements en modes Callout, Carte et Lien, timeline de navette législative et configuration .env.`

---

### C. Commande `/entreprise` — Registre Légal, SIREN & Marchés Publics (ex `/pappers`)

#### 🧠 1. Réflexion Métier & Enjeux Économiques
- **Vérification de la régularité des entreprises :** Dans les marchés publics ou l'attribution de subventions, les acheteurs et instructeurs doivent s'assurer de l'existence juridique de l'entreprise, de son immatriculation au RCS, de ses représentants légaux habilités à signer, et de l'absence de procédure collective (redressement ou liquidation judiciaire au BODACC).
- **Principe « Dites-le-nous une fois » :** Éviter de demander aux entreprises des pièces justificatives que l'administration détient déjà.
- **Typologie des utilisateurs cibles :** Acheteurs publics de l'État et des collectivités, instructeurs de subventions aux entreprises, auditeurs financiers, juristes contrats.

#### 📡 2. Réflexion & Benchmark des APIs Sources
Dans `02-api-entreprise/01-benchmark-des-apis.mdx`, comparer trois sources d'informations légales :

<Mermaid chart={`flowchart TD
    subgraph SourcesEntreprises["Sources de Données Entreprises"]
        Pappers["1. API Pappers Entreprises (api.pappers.fr)<br/>Agrégation temps réel Sirene, INPI/RNE, BODACC & Bilans"]
        ApiEnt["2. API Entreprise (DINUM / data.gouv.fr)<br/>API d'État réservée aux administrations (Dites-le-nous une fois)"]
        RNE["3. Annuaire des Entreprises / RNE (INPI)<br/>Registre National des Entreprises souverain et Open Data"]
    end

    subgraph ProxyEnt["Raccordement Docs"]
        ProviderEnt["CompanySourceProvider (Socle Commun Django)"]
    end

    Pappers --> ProviderEnt
    ApiEnt --> ProviderEnt
    RNE --> ProviderEnt
`} />

1. **Option A : API Pappers Entreprises**
   - *Forces :* Recherche textuelle tolérante aux fautes, fiches financières complètes, données enrichies des dirigeants et bénéficiaires effectifs.
   - *Limites :* Modèle freemium avec quota d'appels mensuels gratuits, nécessite une clé API commerciale pour les gros volumes.
2. **Option B : API Entreprise (Opérée par la DINUM)**
   - *Forces :* Totalement gratuite et souveraine pour les administrations et collectivités éligibles, accès aux données fiscales (DGFiP) et sociales (Urssaf) certifiées.
   - *Limites :* Réservée aux personnes morales de droit public sur conventionnement.
3. **Option C : Annuaire des Entreprises & Registre National des Entreprises (INPI / data.gouv.fr)**
   - *Forces :* Base 100% publique et ouverte issue de la centralisation RNE.

#### 📋 3. Plan de Fichiers Cible pour `docs/08-slash/03-entreprise/`

1. **`docs/08-slash/03-entreprise/index.mdx`**
   - *Title :* `Commande Slash /entreprise — Fiches Entreprises & Registre Légal`
   - *Sidebar Label :* `Vue d'Ensemble`
   - *Description :* `Hub de la commande /entreprise (alias /pappers, /siren) : consultation de fiches d'entreprises, dirigeants, bilans et benchmark Pappers vs API Entreprise.`
2. **`docs/08-slash/03-entreprise/01-metier-entreprise/01-fondations-et-cadre.mdx`**
   - *Title :* `Immatriculation Légale des Entreprises & RNE`
   - *Sidebar Label :* `1. Registre & Immatriculation`
   - *Description :* `Comprendre le numéro SIREN, SIRET, code NAF/APE, formes juridiques, rôle de l'INPI et mentions obligatoires du Kbis.`
3. **`docs/08-slash/03-entreprise/01-metier-entreprise/02-cas-usage-et-scenarios.mdx`**
   - *Title :* `Cas d'Usage — Marchés Publics & Instruction de Subventions`
   - *Sidebar Label :* `2. Marchés & Subventions`
   - *Description :* `Rédaction des Rapports d'Analyse des Offres (RAO), contrôle de solvabilité, vérification des signatures et octroi de subventions.`
4. **`docs/08-slash/03-entreprise/02-api-entreprise/01-benchmark-des-apis.mdx`**
   - *Title :* `Benchmark des APIs Entreprises — Pappers vs API Entreprise vs RNE`
   - *Sidebar Label :* `1. Benchmark des APIs`
   - *Description :* `Comparatif technique entre le connecteur Pappers, l'API Entreprise d'État (DINUM) et l'Open Data du Registre National des Entreprises.`
5. **`docs/08-slash/03-entreprise/02-api-entreprise/02-specifications-techniques.mdx`**
   - *Title :* `Spécifications Techniques — API Pappers & Schémas JSON`
   - *Sidebar Label :* `2. Spécifications & Mode Mock`
   - *Description :* `Endpoints /recherche et /entreprise, structure des données retournées, mode Mock local sans clé payante et quotas.`
6. **`docs/08-slash/03-entreprise/03-implementation-entreprise/01-provider-django.mdx`**
   - *Title :* `Implémentation Backend — CompanySourceProvider Django`
   - *Sidebar Label :* `1. Provider Django`
   - *Description :* `Code source du CompanySourceProvider Python avec normalisation vers SourceSearchResult et cache Redis 24h.`
7. **`docs/08-slash/03-entreprise/03-implementation-entreprise/02-rendu-et-settings.mdx`**
   - *Title :* `Rendu DSFR Entreprise & Configuration`
   - *Sidebar Label :* `2. Rendu & Settings`
   - *Description :* `Affichage en modes Callout, Carte (grille SIREN/Activité/Dirigeant) et Lien, gestion du statut in bonis / procédure collective.`

---

### D. Commande `/adresse` — Base Adresse Nationale (BAN / IGN)

#### 🧠 1. Réflexion Métier & Enjeux Territoriaux
- **Standardisation et opposabilité des adresses :** La loi 3DS oblige chaque commune de France à certifier la dénomination de ses voies et numéros. Une adresse postale exacte et normalisée garantit la légalité des arrêtés de voirie, des courriers recommandés sans NPAI (*N'habite Pas à l'Adresse Indiquée*), des autorisations de travaux ERP et des permis de construire.
- **Secours et interventions d'urgence :** Rattachement direct des coordonnées géographiques GPS (WGS84) aux procès-verbaux de sécurité pour les interventions du SDIS, SAMU et forces de l'ordre.
- **Typologie des utilisateurs cibles :** Secrétaires de mairie, agents instructeurs d'urbanisme, services techniques de voirie, agents d'accueil et état civil.

#### 📡 2. Réflexion & Benchmark des APIs Sources
Dans `02-api-adresse/01-benchmark-des-apis.mdx`, comparer quatre solutions de géocodage :

<Mermaid chart={`flowchart TD
    subgraph SourcesGeo["Sources de Données Géographiques"]
        BAN["1. API Adresse Officielle (api-adresse.data.gouv.fr)<br/>Service public ouvert opéré par Etalab, IGN et ANCT (50M+ adresses)"]
        Addok["2. Moteur Addok Local (Docker addok)<br/>Instance locale hébergeable en intranet sur réseau souverain fermé"]
        IGN["3. Géoplateforme IGN (geoservices.ign.fr)<br/>Services géographiques avancés, parcelles cadastrales et altimétrie"]
        OSM["4. OpenStreetMap / Nominatim<br/>Base cartographique collaborative mondiale libre"]
    end

    subgraph ProxyGeo["Raccordement Docs"]
        ProviderGeo["AddressSourceProvider (Socle Commun Django)"]
    end

    BAN --> ProviderGeo
    Addok --> ProviderGeo
    IGN --> ProviderGeo
    OSM --> ProviderGeo
`} />

1. **Option A : API Adresse Officielle (`api-adresse.data.gouv.fr`)**
   - *Forces :* Base certifiée officielle de l'État, gratuité totale, aucune clé API requise, autocomplétion fuzzy tolérante aux fautes d'orthographe, temps de réponse < 50ms.
   - *Limites :* Dépendance réseau vers Internet public (rate limit de 50 req/s).
2. **Option B : Moteur Addok Auto-Hébergé en Local (`etalab/addok`)**
   - *Forces :* Permet le fonctionnement 100% hors-ligne dans des zones blanches ou des réseaux ministériels étanches.
   - *Limites :* Nécessite le téléchargement des dumps de données BAN départementaux (environ 2 Go de RAM).
3. **Option C : Géoplateforme IGN**
   - *Forces :* Enrichissement avec données cadastrales et géodésiques précises.

#### 📋 3. Plan de Fichiers Cible pour `docs/08-slash/04-adresse/`

1. **`docs/08-slash/04-adresse/index.mdx`**
   - *Title :* `Commande Slash /adresse — Base Adresse Nationale (BAN)`
   - *Sidebar Label :* `Vue d'Ensemble`
   - *Description :* `Hub de la commande /adresse : autocomplétion d'adresses certifiées par les mairies, géocodage direct/inverse et benchmark BAN vs Addok.`
2. **`docs/08-slash/04-adresse/01-metier-adresse/01-fondations-et-cadre.mdx`**
   - *Title :* `La Base Adresse Nationale & la Loi 3DS`
   - *Sidebar Label :* `1. Cadre Légal & BAN`
   - *Description :* `Obligation légale de certification par les communes, code INSEE vs code postal, coordonnées WGS84 et opposabilité juridique.`
3. **`docs/08-slash/04-adresse/01-metier-adresse/02-cas-usage-et-scenarios.mdx`**
   - *Title :* `Cas d'Usage Territoriaux & Courriers Administratifs (/adresse)`
   - *Sidebar Label :* `2. Arrêtés & Courriers`
   - *Description :* `Arrêtés municipaux de voirie et stationnement, courriers recommandés sans NPAI, fiches ERP et autorisations d'urbanisme.`
4. **`docs/08-slash/04-adresse/02-api-adresse/01-benchmark-des-apis.mdx`**
   - *Title :* `Benchmark des APIs Géographiques — BAN vs Addok Local vs IGN vs OSM`
   - *Sidebar Label :* `1. Benchmark des APIs`
   - *Description :* `Comparatif technique entre l'API Adresse publique d'Etalab, l'instance Addok auto-hébergée, la Géoplateforme IGN et OpenStreetMap.`
5. **`docs/08-slash/04-adresse/02-api-adresse/02-specifications-techniques.mdx`**
   - *Title :* `Spécifications de l'API Base Adresse Nationale (BAN)`
   - *Sidebar Label :* `2. Spécifications & GeoJSON`
   - *Description :* `Endpoints /search et /reverse, format GeoJSON RFC 7946, filtres par type housenumber/street et scores de pertinence.`
6. **`docs/08-slash/04-adresse/03-implementation-adresse/01-provider-django.mdx`**
   - *Title :* `Implémentation Backend — AddressSourceProvider Django`
   - *Sidebar Label :* `1. Provider Django`
   - *Description :* `Code source Python de l'AddressSourceProvider avec mapping des coordonnées et mise en cache Redis 24h.`
7. **`docs/08-slash/04-adresse/03-implementation-adresse/02-rendu-et-settings.mdx`**
   - *Title :* `Rendu DSFR d'Adresse & Configuration`
   - *Sidebar Label :* `2. Rendu & Settings`
   - *Description :* `Affichage en modes Callout (certifié BAN), Carte (grille INSEE/Type/GPS) et Lien, activation par défaut sans clé requise.`

---

## 💡 5. Matrice des 10 Propositions Futures (`proposition.md`)

Le fichier [`docs/08-slash/proposition.md`](docs/08-slash/proposition.md) formalise 10 extensions futures intégrables selon le même socle commun :

| Commande | Déclencheurs / Alias | Source de Données Souveraine | Public & Métier Cible | Format Privilégié | Priorité |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. `/marche`** | `marche`, `boamp`, `achat`, `dce` | API BOAMP (DILA) / data.gouv.fr | Acheteurs publics, juristes marchés | Carte & Callout | **P1** |
| **2. `/subvention`** | `subvention`, `aides`, `fonds-vert`, `detr` | API Aides-Territoires (ANCT / Fabrique) | Directeurs de projets, élus, secrétaires de mairie | Carte & Callout | **P1** |
| **3. `/cadastre`** | `cadastre`, `parcelle`, `foncier`, `geoportail` | API IGN / DGFiP (Géoplateforme) & Géorisques | Urbanisme, voirie, affaires foncières | Carte & Callout | **P1** |
| **4. `/agent`** | `agent`, `annuaire`, `service-public`, `contact` | API Annuaire DILA / Service-Public.fr & People | Tous agents, secrétariats, accueil | Lien & Carte | **P2** |
| **5. `/insee`** | `insee`, `stats`, `population`, `territoire` | API INSEE (Données locales & RP) | Chargés de mission, aménageurs, cabinets | Carte & Callout | **P2** |
| **6. `/tchap`** | `tchap`, `salon`, `chat`, `discussion` | API Matrix / Tchap (DINUM) | Équipes projets, relecteurs de notes | Lien & Callout | **P2** |
| **7. `/parapheur`** | `parapheur`, `visa`, `signature`, `validation` | API Parapheur Électronique (Pastell / i-Parapheur) | Directeurs de cabinet, secrétaires généraux | Callout & Carte | **P2** |
| **8. `/demarche`** | `demarche`, `formulaire`, `usager`, `dossier` | API Démarches-Simplifiées.fr (DINUM) | Agents instructeurs, guichets uniques | Carte & Lien | **P2** |
| **9. `/opendata`** | `opendata`, `dataset`, `datagouv`, `donnees` | API data.gouv.fr (Etalab / DINUM) | Chargés d'études, analystes de données | Carte & Callout | **P2** |
| **10. `/glossaire`** | `glossaire`, `terme`, `definition`, `acronyme` | Référentiel interne DINUM / Glossaire de l'État | Nouveaux arrivants, rédacteurs administratifs | Lien & Popover | **P2** |

---

## 📋 6. Tableau Récapitulatif Exhaustif des Métadonnées (Frontmatter)

| Fichier Cible | `title` | `sidebar_label` | `description` |
| :--- | :--- | :--- | :--- |
| `docs/08-slash/00-socle-technique.mdx` | `Socle Technique Unifié des Commandes Slash` | `Socle Technique` | Architecture standardisée, composant BlockNote universel à 3 modes d'affichage et proxy Django générique. |
| `docs/08-slash/01-architecture-standardisee.mdx` | `Architecture Standardisée & Inspiration /link-doc` | `1. Architecture Standardisée` | Conception du cycle de vie unifié des commandes slash, inspiré de l'architecture native de /link-doc. |
| `docs/08-slash/02-composant-customblock-unique.mdx` | `Composant CustomBlock Unique & 3 Formats DSFR` | `2. CustomBlock & 3 Formats` | Spécification et code du composant BlockNote universel décliné en 3 formats d'affichage DSFR. |
| `docs/08-slash/03-proxy-backend-et-cache.mdx` | `Proxy Backend Django 5 & Provider Registry` | `3. Backend & Provider Registry` | Architecture backend unifiée, classe abstraite BaseSourceProvider, cache Redis générique et quotas. |
| `docs/08-slash/04-tutoriel-ajouter-une-api.mdx` | `Tutoriel — Ajouter une Nouvelle API en 10 Minutes` | `4. Ajouter une API` | Guide pratique pas-à-pas pour brancher une nouvelle API souveraine sur le socle technique unifié. |
| `docs/08-slash/01-loi/index.mdx` | `Commande Slash /loi — Légifrance & Droit Français` | `Vue d'Ensemble` | Hub de la commande juridique /loi : accès au droit officiel, benchmark PISTE vs Albert et raccordement socle. |
| `docs/08-slash/01-loi/01-metier-loi/01-fondations-et-cadre.mdx` | `Hiérarchie des Normes & Structure des Textes Juridiques` | `1. Hiérarchie & Structure` | Pyramide de Kelsen, codes législatifs et réglementaires, numérotation et règles de citation. |
| `docs/08-slash/01-loi/01-metier-loi/02-cas-usage-et-scenarios.mdx` | `Cas d'Usage Métier — Commande /loi` | `2. Cas d'Usage Métier` | Situations réelles : visas des arrêtés, CCTP marchés publics, refus permis d'urbanisme et RGPD. |
| `docs/08-slash/01-loi/02-api-loi/01-benchmark-des-apis.mdx` | `Benchmark des APIs Juridiques — PISTE vs Albert API vs Judilibre` | `1. Benchmark des APIs` | Comparatif technique des sources de données juridiques souveraines de l'État. |
| `docs/08-slash/01-loi/02-api-loi/02-specifications-techniques.mdx` | `Spécifications Techniques — Endpoints PISTE & Contrats de Données` | `2. Spécifications & OAuth2` | Protocole OAuth2 Client Credentials PISTE, endpoints /suggest et /search, mapping des fonds. |
| `docs/08-slash/01-loi/03-implementation-loi/01-provider-django.mdx` | `Implémentation Backend — LawSourceProvider Django` | `1. Provider Django` | Code source Python du LawSourceProvider implémentant BaseSourceProvider et cache Redis 24h. |
| `docs/08-slash/01-loi/03-implementation-loi/02-rendu-et-settings.mdx` | `Rendu DSFR & Activation Conditionnelle (/loi)` | `2. Rendu & Settings` | Déclinaison des 3 modes d'affichage DSFR, Feature Flagging piloté par l'environnement. |
| `docs/08-slash/02-assemblee/index.mdx` | `Commande Slash /assemblee — Travail Parlementaire & Assemblée Nationale` | `Vue d'Ensemble` | Hub de la commande parlementaire /assemblee : suivi des projets de loi, amendements et députés. |
| `docs/08-slash/02-assemblee/01-metier-assemblee/01-fondations-et-cadre.mdx` | `Fonctionnement du Travail Parlementaire & Navette Législative` | `1. Navette & Procédure` | Cycle de vie législatif (dépôt, commission, séance, CMP), amendements et groupes politiques. |
| `docs/08-slash/02-assemblee/01-metier-assemblee/02-cas-usage-et-scenarios.mdx` | `Cas d'Usage — Fiches de Banc en Cabinet & Veille Législative` | `2. Fiches de Banc & Débats` | Préparation des fiches de banc ministérielles, suivi des votes en séance et argumentaires. |
| `docs/08-slash/02-assemblee/02-api-assemblee/01-benchmark-des-apis.mdx` | `Benchmark des APIs Parlementaires — claire.vite vs Tricoteuse vs Open Data AN` | `1. Benchmark des APIs` | Comparatif claire.vite, indexeur open-source Tricoteuse (Regards Citoyens) et Open Data direct. |
| `docs/08-slash/02-assemblee/02-api-assemblee/02-specifications-techniques.mdx` | `Spécifications Techniques — Endpoints Parlementaires & DTOs` | `2. Spécifications Techniques` | Modèles JSON des dossiers législatifs, amendements, députés et résultats de scrutins. |
| `docs/08-slash/02-assemblee/03-implementation-assemblee/01-provider-django.mdx` | `Implémentation Backend — ParliamentSourceProvider Django` | `1. Provider Django` | Code source Python du ParliamentSourceProvider, cache séance 5 min et mode dégradé. |
| `docs/08-slash/02-assemblee/03-implementation-assemblee/02-rendu-et-settings.mdx` | `Rendu DSFR Parlementaire & Feature Flagging` | `2. Rendu & Settings` | Affichage des amendements en 3 modes DSFR, timeline de navette et settings d'environnement. |
| `docs/08-slash/03-entreprise/index.mdx` | `Commande Slash /entreprise — Fiches Entreprises & Registre Légal` | `Vue d'Ensemble` | Hub de la commande /entreprise (alias /pappers, /siren) : fiches légales, bilans et dirigeants. |
| `docs/08-slash/03-entreprise/01-metier-entreprise/01-fondations-et-cadre.mdx` | `Immatriculation Légale des Entreprises & RNE` | `1. Registre & Immatriculation` | Comprendre SIREN, SIRET, code NAF/APE, formes juridiques, rôle de l'INPI et mentions du Kbis. |
| `docs/08-slash/03-entreprise/01-metier-entreprise/02-cas-usage-et-scenarios.mdx` | `Cas d'Usage — Marchés Publics & Instruction de Subventions` | `2. Marchés & Subventions` | Rapports d'Analyse des Offres (RAO), dispense de justificatifs et instruction de subventions. |
| `docs/08-slash/03-entreprise/02-api-entreprise/01-benchmark-des-apis.mdx` | `Benchmark des APIs Entreprises — Pappers vs API Entreprise vs RNE` | `1. Benchmark des APIs` | Comparatif technique connecteur Pappers, API Entreprise DINUM et Annuaire RNE INPI. |
| `docs/08-slash/03-entreprise/02-api-entreprise/02-specifications-techniques.mdx` | `Spécifications Techniques — API Pappers & Schémas JSON` | `2. Spécifications & Mode Mock` | Endpoints /recherche et /entreprise, structure des données retournées et mode Mock local. |
| `docs/08-slash/03-entreprise/03-implementation-entreprise/01-provider-django.mdx` | `Implémentation Backend — CompanySourceProvider Django` | `1. Provider Django` | Code source du CompanySourceProvider Python avec normalisation et cache Redis 24h. |
| `docs/08-slash/03-entreprise/03-implementation-entreprise/02-rendu-et-settings.mdx` | `Rendu DSFR Entreprise & Configuration` | `2. Rendu & Settings` | Affichage en 3 modes DSFR, alertes procédures collectives et configuration .env. |
| `docs/08-slash/04-adresse/index.mdx` | `Commande Slash /adresse — Base Adresse Nationale (BAN)` | `Vue d'Ensemble` | Hub de la commande /adresse : autocomplétion d'adresses certifiées, géocodage et benchmark BAN. |
| `docs/08-slash/04-adresse/01-metier-adresse/01-fondations-et-cadre.mdx` | `La Base Adresse Nationale & la Loi 3DS` | `1. Cadre Légal & BAN` | Obligation légale de certification par les communes, code INSEE vs code postal, coordonnées GPS. |
| `docs/08-slash/04-adresse/01-metier-adresse/02-cas-usage-et-scenarios.mdx` | `Cas d'Usage Territoriaux & Courriers Administratifs (/adresse)` | `2. Arrêtés & Courriers` | Arrêtés de voirie, courriers recommandés sans NPAI, fiches ERP et autorisations d'urbanisme. |
| `docs/08-slash/04-adresse/02-api-adresse/01-benchmark-des-apis.mdx` | `Benchmark des APIs Géographiques — BAN vs Addok Local vs IGN vs OSM` | `1. Benchmark des APIs` | Comparatif API Adresse publique Etalab, instance Addok auto-hébergée, Géoplateforme IGN et OSM. |
| `docs/08-slash/04-adresse/02-api-adresse/02-specifications-techniques.mdx` | `Spécifications de l'API Base Adresse Nationale (BAN)` | `2. Spécifications & GeoJSON` | Endpoints /search et /reverse, format GeoJSON RFC 7946 et filtres par type. |
| `docs/08-slash/04-adresse/03-implementation-adresse/01-provider-django.mdx` | `Implémentation Backend — AddressSourceProvider Django` | `1. Provider Django` | Code source Python de l'AddressSourceProvider avec mapping des coordonnées et cache Redis. |
| `docs/08-slash/04-adresse/03-implementation-adresse/02-rendu-et-settings.mdx` | `Rendu DSFR d'Adresse & Configuration` | `2. Rendu & Settings` | Affichage en modes Callout (certifié BAN), Carte (grille INSEE/GPS) et Lien, activation par défaut. |
| `docs/08-slash/proposition.md` | `Propositions de Nouvelles Commandes Slash` | `Propositions & Idées` | Document prospectif explorant 10 nouvelles commandes slash pour La Suite Docs. |
| `docs/08-slash/roadmap.mdx` | `Roadmap des Commandes Slash (/)` | `Roadmap & Jalons` | Feuille de route interactive, tableau Kanban des étapes clés et jalons de livraison. |

---

## 📝 7. Checklist d'Exécution Structurée par Commande

- [ ] **Phase 1 — Structuration `docs/08-slash/01-loi/` :**
  - [ ] Créer `01-metier-loi/01-fondations-et-cadre.mdx` et `01-metier-loi/02-cas-usage-et-scenarios.mdx`.
  - [ ] Créer `02-api-loi/01-benchmark-des-apis.mdx` (*PISTE vs Albert API vs Judilibre*) et `02-api-loi/02-specifications-techniques.mdx`.
  - [ ] Créer `03-implementation-loi/01-provider-django.mdx` et `03-implementation-loi/02-rendu-et-settings.mdx`.
- [ ] **Phase 2 — Structuration `docs/08-slash/02-assemblee/` :**
  - [ ] Créer `01-metier-assemblee/01-fondations-et-cadre.mdx` et `01-metier-assemblee/02-cas-usage-et-scenarios.mdx`.
  - [ ] Créer `02-api-assemblee/01-benchmark-des-apis.mdx` (*claire.vite vs Tricoteuse vs Open Data AN*) et `02-api-assemblee/02-specifications-techniques.mdx`.
  - [ ] Créer `03-implementation-assemblee/01-provider-django.mdx` et `03-implementation-assemblee/02-rendu-et-settings.mdx`.
- [ ] **Phase 3 — Structuration `docs/08-slash/03-entreprise/` :**
  - [ ] Créer `01-metier-entreprise/01-fondations-et-cadre.mdx` et `01-metier-entreprise/02-cas-usage-et-scenarios.mdx`.
  - [ ] Créer `02-api-entreprise/01-benchmark-des-apis.mdx` (*Pappers vs API Entreprise vs RNE*) et `02-api-entreprise/02-specifications-techniques.mdx`.
  - [ ] Créer `03-implementation-entreprise/01-provider-django.mdx` et `03-implementation-entreprise/02-rendu-et-settings.mdx`.
- [ ] **Phase 4 — Structuration `docs/08-slash/04-adresse/` :**
  - [ ] Créer `01-metier-adresse/01-fondations-et-cadre.mdx` et `01-metier-adresse/02-cas-usage-et-scenarios.mdx`.
  - [ ] Créer `02-api-adresse/01-benchmark-des-apis.mdx` (*BAN vs Addok vs IGN vs OSM*) et `02-api-adresse/02-specifications-techniques.mdx`.
  - [ ] Créer `03-implementation-adresse/01-provider-django.mdx` et `03-implementation-adresse/02-rendu-et-settings.mdx`.
- [ ] **Phase 5 — Navigation & Validation Globale :**
  - [ ] Adapter `scripts/generate-docs-navigation.mjs` pour formater automatiquement les libellés `metier-XX`, `api-XX` et `implementation-XX`.
  - [ ] Exécuter `npm run docs:nav` pour régénérer `zudoku.navigation.tsx`.
  - [ ] Auditer 100% des diagrammes pour s'assurer de l'utilisation uniforme du composant `<Mermaid />`.
  - [ ] Valider avec `npm run docs:build` (0 erreur tolérée).
