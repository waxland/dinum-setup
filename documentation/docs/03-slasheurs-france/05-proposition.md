---
title: Propositions de Nouvelles Commandes Slash
sidebar_label: Propositions & Idées
description: "Document prospectif explorant 10 nouvelles commandes slash pour La Suite Docs (marchés publics, subventions, annuaire, cadastre, INSEE, Tchap, parapheur, démarches)."
---


# 💡 Exploration & Propositions de Nouvelles Commandes Slash (`proposition.md`)

Ce document prospectif recense et détaille **10 propositions concrètes de futures commandes slash (`/`)** pour enrichir l'éditeur collaboratif **La Suite Docs**.

Chaque proposition est conçue selon le **Socle Technique Unifié** (Architecture Provider Django + CustomBlock `SourceBlockSpec` aux 3 modes DSFR **Callout**, **Carte**, **Lien**) et s'appuie exclusivement sur des **sources de données publiques souveraines**.

---

## 🗺️ Synthèse des 10 Propositions de Commandes

| Commande | Déclencheurs / Alias | Source de Données Souveraine | Public & Métier Cible | Format Privilégié |
| :--- | :--- | :--- | :--- | :--- |
| **1. `/marche`** | `marche`, `boamp`, `achat`, `dce` | API BOAMP (DILA) / data.gouv.fr | Acheteurs publics, juristes marchés | Carte & Callout |
| **2. `/subvention`** | `subvention`, `aides`, `fonds-vert`, `detr` | API Aides-Territoires (ANCT / Fabrique) | Directeurs de projets, élus, secrétaires de mairie | Carte & Callout |
| **3. `/agent`** | `agent`, `annuaire`, `service-public`, `contact` | API Annuaire DILA / Service-Public.fr & People | Tous agents, secrétariats, accueil | Lien & Carte |
| **4. `/cadastre`** | `cadastre`, `parcelle`, `foncier`, `geoportail` | API IGN / DGFiP (Géoplateforme) & Géorisques | Urbanisme, voirie, affaires foncières | Carte & Callout |
| **5. `/insee`** | `insee`, `stats`, `population`, `territoire` | API INSEE (Données locales & RP) | Chargés de mission, aménageurs, cabinets | Carte & Callout |
| **6. `/tchap`** | `tchap`, `salon`, `chat`, `discussion` | API Matrix / Tchap (DINUM) | Équipes projets, relecteurs de notes | Lien & Callout |
| **7. `/parapheur`** | `parapheur`, `visa`, `signature`, `validation` | API Parapheur Électronique (i-Parapheur / Pastell) | Directeurs de cabinet, secrétaires généraux | Callout & Carte |
| **8. `/demarche`** | `demarche`, `formulaire`, `usager`, `dossier` | API Démarches-Simplifiées.fr (DINUM) | Agents instructeurs, guichets uniques | Carte & Lien |
| **9. `/opendata`** | `opendata`, `dataset`, `datagouv`, `donnees` | API data.gouv.fr (Etalab / DINUM) | Chargés d'études, analystes de données | Carte & Callout |
| **10. `/glossaire`** | `glossaire`, `terme`, `definition`, `acronyme` | Référentiel interne DINUM / Glossaire de l'État | Nouveaux arrivants, rédacteurs administratifs | Lien & Popover |

---

## 📋 Commande `/marche` — Avis de Marchés Publics & BOAMP

### 🎯 Problématique Métier
Lors de la passation ou du suivi d'un marché public, les acheteurs doivent consigner les références de l'avis de publicité, les critères d'attribution pondérés et le montant estimé dans leurs rapports de présentation.

### 📡 Source de Données
- **API :** API BOAMP (DILA) & API Marchés Publics sur PISTE / data.gouv.fr.
- **Données clés :** Numéro d'avis d'appel public à la concurrence (AAPC), objet du marché, pouvoir adjudicateur, date limite de remise des offres, critères d'attribution (RSE / Prix / Technique).

### 🧩 Rendu dans les 3 Modes DSFR
- **Callout :** Synthèse officielle de l'avis de marché avec rappel de la date limite et lien direct vers le profil d'acheteur.
- **Carte :** Grille 3 métadonnées : Montant estimé • Procédure (Ouverte/Adaptée) • Code CPV principal.
- **Lien :** Pastille compacte `📋 Marché n° 2026-DINUM-04 (Cloud Souverain)`.

---

## 💰 Commande `/subvention` — Dispositifs d'Aides Financières aux Territoires

### 🎯 Problématique Métier
Les collectivités territoriales rédigent des dossiers de demande de subventions (Fonds Vert, DETR, DSIL, France 2030, FEDER) et doivent justifier de l'éligibilité de leur projet en citant le bon dispositif.

### 📡 Source de Données
- **API :** API Aides-Territoires (ANCT / Fabrique Numérique).
- **Données clés :** Nom du programme d'aide, financeur (État, ADEME, Région), taux de subvention maximal, dépenses éligibles, date limite de dépôt.

### 🧩 Rendu dans les 3 Modes DSFR
- **Callout :** Fiche descriptive du dispositif avec conditions d'éligibilité et lien vers le portail de télédéclaration.
- **Carte :** Grille : Financeur (ex: *ADEME*) • Taux max (ex: *80%*) • Clôture (ex: *31/12/2026*).
- **Lien :** `💶 Fonds Vert — Rénovation Énergétique des Bâtiments Publics`.

---

## 👤 Commande `/agent` — Annuaire du Service Public & Contacts Certifiés

### 🎯 Problématique Métier
Indiquer précisément dans les notes administratives, arrêtés et comptes-rendus les coordonnées, le service compétent et la fonction des agents interlocuteurs, sans erreurs de frappe.

### 📡 Source de Données
- **API :** API Annuaire DILA (`api-lannuaire.service-public.fr`) & module d'annuaire souverain *People*.
- **Données clés :** Nom du service, adresse postale, téléphone institutionnel, courriel officiel `@gouv.fr`, nom du responsable.

### 🧩 Rendu dans les 3 Modes DSFR
- **Carte :** Fiche contact officielle du service administratif avec badge Marianne.
- **Lien :** Mention inline cliquable `👤 Bureau 3B — Direction du Budget`.

---

## 🗺️ Commande `/cadastre` — Référentiel Foncier & Parcelles

### 🎯 Problématique Métier
Dans les permis de construire, déclarations préalables, cessions foncières et arrêtés d'alignement, le numéro de section et de parcelle cadastrale est indispensable.

### 📡 Source de Données
- **API :** API Géoplateforme IGN / Cadastre DGFiP & API Géorisques.
- **Données clés :** Identifiant de parcelle (ex: `75107000AB0142`), surface en m², commune, zonage PLU et servitudes de risques inondation/argiles.

### 🧩 Rendu dans les 3 Modes DSFR
- **Callout :** Fiche parcelle détaillée avec surface officielle, zonage et avertissements Géorisques.
- **Carte :** Grille : Section & N° • Surface (m²) • Exposition Risques (Faible/Moyen/Fort).
- **Lien :** `🗺️ Parcelle 75107-AB-142 (450 m²)`.

---

## 📊 Commande `/insee` — Données Démographiques & Économiques Locales

### 🎯 Problématique Métier
Les diagnostics territoriaux, bilans de mandat et rapports d'orientation budgétaire nécessitent de citer les chiffres officiels de population légale et de tissu économique.

### 📡 Source de Données
- **API :** API Données Locales de l'INSEE (`api.insee.fr`).
- **Données clés :** Population municipale légale en vigueur (millésime certifié), densité d'habitants au km², nombre d'entreprises, taux de chômage communal.

### 🧩 Rendu dans les 3 Modes DSFR
- **Carte :** Grille : Population Légale • Évolution 5 ans (%) • Nombre de Logements.
- **Lien :** `📊 Commune de Nantes — 323 204 hab. (INSEE 2026)`.

---

## 💬 Commande `/tchap` — Salon de Discussion Sécurisé Associé

### 🎯 Problématique Métier
Permettre aux coauteurs d'un document Docs d'ouvrir ou de relier un salon de messagerie instantanée souverain **Tchap** pour échanger rapidement en marge du document.

### 📡 Source de Données
- **API :** Protocole Matrix & API Tchap.
- **Données clés :** Identifiant de salon Matrix (`!roomid:agent.interieur.tchap.gouv.fr`), lien d'invitation sécurisé.

### 🧩 Rendu dans les 3 Modes DSFR
- **Callout :** Encart invitant les collaborateurs à rejoindre le salon de discussion Tchap du projet.
- **Lien :** Pastille compacte `💬 Salon Tchap #projet-docs-loi`.

---

## ✍️ Commande `/parapheur` — Circuit de Visa & Signature Électronique

### 🎯 Problématique Métier
Tracer directement dans le document l'état d'avancement des visas hiérarchiques (Chef de bureau -> Sous-directeur -> Directeur) avant transmission au parapheur électronique pour signature qualifiée eIDAS.

### 📡 Source de Données
- **API :** Connecteurs Parapheur (Pastell, i-Parapheur, Lex Persona).
- **Données clés :** Identifiant de dossier, étapes de visa validées, horodatage certifié, statut de signature.

### 🧩 Rendu dans les 3 Modes DSFR
- **Callout :** Bordereau de visa horodaté avec indicateur visuel d'étape (Stepper DSFR).

---

## 📂 Commande `/demarche` — Dossier Démarches-Simplifiées

### 🎯 Problématique Métier
Dans les comptes-rendus d'instruction ou notes de synthèse, relier un document interne à la demande initiale déposée en ligne par le citoyen ou l'entreprise.

### 📡 Source de Données
- **API :** API GraphQL Démarches-Simplifiées.fr (DINUM).
- **Données clés :** Numéro de dossier (`dossier_id`), statut (*En construction*, *En instruction*, *Accepté*, *Refusé*), date de dépôt, nom du demandeur.

### 🧩 Rendu dans les 3 Modes DSFR
- **Carte :** Fiche de dossier usager avec statut d'instruction en temps réel.
- **Lien :** `📂 Dossier DS n° 8492019 — En instruction`.

---

## 🌐 Commande `/opendata` — Jeux de Données data.gouv.fr

### 🎯 Problématique Métier
Citer et sourcer un jeu de données public ouvert déposé sur data.gouv.fr (fréquentation touristique, subventions attribuées, inventaire du patrimoine).

### 📡 Source de Données
- **API :** API data.gouv.fr (`https://www.data.gouv.fr/api/1/datasets/`).
- **Données clés :** Titre du dataset, organisation productrice, date de dernière mise à jour, licence (Licence Ouverte / ODbL), format des fichiers (CSV, GeoJSON, Parquet).

---

## 📖 10. Commande `/glossaire` — Acronymes & Définitions de l'État

### 🎯 Problématique Métier
L'administration utilise des centaines d'acronymes (DCE, CCAG, CCTP, DUME, EPCI, RNE, CPV, NOR, DILA). Permettre d'insérer une définition officielle au survol pour fluidifier la lecture.

### 📡 Source de Données
- **Source :** Référentiel terminologique officiel DINUM / Glossaire de La Suite.
- **Rendu :** Infobulle / Popover flottant au survol du terme dans le document.

---

## 🚀 Matrice de Priorité d'Implémentation Recommandée

<Mermaid chart={`flowchart TD
    subgraph P0["Priorité 1 (En Cours / Socle Prêt)"]
        Loi["/loi (Légifrance / PISTE)"]
        Entreprise["/entreprise (Pappers / API Entreprise)"]
        Assemblee["/assemblee (claire.vite / Tricoteuse)"]
        Adresse["/adresse (Base Adresse Nationale)"]
    end

    subgraph P1["Priorité 2 (Prochain Sprint)"]
        Marche["/marche (BOAMP / DAE)"]
        Cadastre["/cadastre (IGN / Géoportail)"]
        Subvention["/subvention (Aides-Territoires)"]
    end

    subgraph P2["Priorité 3 (Écosystème Avancé)"]
        Tchap["/tchap (Matrix / Salons)"]
        Demarche["/demarche (Démarches-Simplifiées)"]
        Insee["/insee (Données Locales)"]
    end

    P0 --> P1 --> P2
`} />
