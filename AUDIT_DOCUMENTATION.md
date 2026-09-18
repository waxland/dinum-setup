# 📚 Audit Exhaustif de la Documentation (`documentation/`) & Tableau de Suivi

**Date de l'audit :** 18 Septembre 2026  
**Périmètre :** Portail Zudoku SSR, `documentation/docs/` (FR & EN), composants interactifs (`src/components/`), configuration et scripts de navigation.  
**Référentiels :** Standards DINUM, Accessibilité RGAA v4.1 AA, Design System DSFR / Cunningham, Standard Digital Public Goods (DPGA).

---

## 🏛️ 1. Architecture Globale du Portail Documentaire

Le portail de documentation est propulsé par **Zudoku (Vite SSR)** et dessert deux publics distincts via une organisation modulaire :

```mermaid
flowchart TD
    subgraph Engine["⚙️ Moteur Zudoku (Vite SSR & MDX)"]
        ZConfig["zudoku.config.tsx<br/>(Thèmes, Plugins, Meta)"]
        NavScript["generate-docs-navigation.mjs<br/>(Scan dynamique & Lucide Icons)"]
        Components["src/components/<br/>(BlockNote Playground, Mermaid, DSFR Previews)"]
    end

    subgraph ContentFR["🇫🇷 Documentation Française (147 fiches)"]
        FR_Onboarding["01-onboarding/<br/>• Démarrage & IDE<br/>• Workflow Git & PR<br/>• Décisions ADR (0001 à 0004)<br/>• Support & Dépannage"]
        FR_LaSuite["02-la-suite/<br/>• 6 Applications (Docs, Meet...)<br/>• Architecture (CRDT, S3, OIDC)<br/>• Design System & Tokens"]
        FR_Slasheurs["03-slasheurs-france/<br/>• 10 Connecteurs Souverains<br/>• Triptyque : Métier / API / Code"]
    end

    subgraph ContentEN["🇬🇧 Documentation Internationale (27 fiches)"]
        EN_Overview["00-overview/<br/>Vision & 3-Tier Architecture"]
        EN_SDK["01-02-SDK & Extension/<br/>BlockNote Contracts & Guidelines"]
        EN_Backend["03-backend-proxy/<br/>Security, Quotas & Resilience"]
        EN_Presets["04-presets/<br/>EU, Canada, DE, NL, ES"]
        EN_RFC["05-rfc-upstream/<br/>Formal Upstream RFC"]
    end

    ZConfig --> FR_Onboarding & FR_LaSuite & FR_Slasheurs
    ZConfig --> EN_Overview & EN_SDK & EN_Backend & EN_Presets & EN_RFC
    Components -.-> ContentFR & ContentEN
```

---

## 📊 2. Tableau de Suivi de la Documentation : Fait, En Cours & À Améliorer

```mermaid
gantt
    title État d'Avancement du Portail Documentaire
    dateFormat  YYYY-MM-DD
    section Socle & FR
    Socle SSR Zudoku (288 routes)      :done, 2026-09-01, 2026-09-18
    10 Slasheurs France (30 fiches)     :done, 2026-09-05, 2026-09-18
    Onboarding & ADRs intégrés          :done, 2026-09-10, 2026-09-18
    section Composants MDX
    Bac à sable BlockNote interactif   :done, 2026-09-08, 2026-09-18
    Diagrammes Mermaid Plein Écran      :done, 2026-09-12, 2026-09-18
    Démos DSFR Marianne                :done, 2026-09-15, 2026-09-18
    section Internationalisation (EN)
    Architecture & RFC Upstream (EN)   :done, 2026-09-16, 2026-09-18
    Traduction des 10 guides dév (EN)  :active, 2026-09-18, 2026-09-25
    section Accessibilité & Finitions
    Audit contrastes badges & thèmes   :active, 2026-09-18, 2026-09-22
    Ajout syntaxe ini dans Shiki        :crit, 2026-09-18, 2026-09-19
```

### 📋 Matrice Détaillée d'Audit

| Section / Composant | Statut | Taux d'Achèvement | Ce qui a été Réalisé (Fait) | Ce qui reste à Faire | Recommandations d'Amélioration (Lisibilité & DX) |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **01-onboarding (FR)** | 🟢 Terminé | **100%** | • Guide de démarrage pas-à-pas.<br>• Environnements VS Code, Cursor, SSH/VM.<br>• **Intégration complète des ADR-0001 à 0004**.<br>• Matrice de contribution Git & PR. | — | Ajouter une infographie interactive de parcours pour orienter les nouveaux arrivants (Profil Frontend vs Backend). |
| **02-la-suite (FR)** | 🟢 Terminé | **98%** | • Fiches techniques des 6 applications souveraines.<br>• Schémas d'architecture temps réel (Yjs/CRDT), stockage S3 et authentification ProConnect.<br>• Guide des tokens Cunningham. | • Enrichir les exemples de flux de permissions multi-tenants. | Intégrer un sélecteur d'architecture interactif par brique logicielle. |
| **03-slasheurs-france (FR)** | 🟢 Terminé | **100%** | • **10 connecteurs complets** (`/loi`, `/assemblee`, `/entreprise`, `/adresse`, `/albert`, `/marche`, `/subvention`, `/stats`, `/agent`, `/cadastre`).<br>• Structure normalisée en 3 pôles : *Métier* / *API* / *Code*. | — | Ajouter des onglets de test d'exemples de requêtes avec rendu live dans `LawSlashPreview`. |
| **Section Anglaise (`docs/en/`)** | 🟡 En cours | **65%** | • Vision globale et architecture 3-tiers.<br>• Contrats TypeScript du SDK.<br>• Documentation de sécurité anti-SSRF, quotas et résilience.<br>• RFC upstream formelle pour BlockNote. | • Traduire les tutoriels pas-à-pas d'intégration pour les développeurs internationaux.<br>• Ajouter les fiches détaillées des connecteurs EU/CA/DE/NL/ES. | Unifier la barre latérale pour basculer facilement d'une langue à l'autre sur la même page. |
| **Composants Interactifs (`src/components/`)** | 🟢 Terminé | **95%** | • **`BlockNoteSlashPlayground`** : Éditeur temps réel dans la doc.<br>• **`Mermaid`** : Rendu dynamique clair/sombre avec mode plein écran, pan & zoom.<br>• **`LawSlashPreview`** : Aperçu interactif des 4 formats DSFR.<br>• **`DSFRPreviews`** : Showcase exhaustif des composants d'État. | • Connecter le bac à sable à d'autres mocks (BAN, BOAMP, INSEE). | Ajouter un bouton "Copier le composant" sur chaque démo DSFR. |
| **Accessibilité & RGAA (v4.1 AA)** | 🟢 Conforme | **90%** | • Navigation 100% clavier sur les composants interactifs.<br>• Contrastes $\ge 4.5:1$ sur les thèmes clairs/sombres.<br>• Pièges au focus évités avec gestion de la touche <kbd>Échap</kbd>. | • Compléter certains micro-attributs `aria-expanded` sur les modales simulées dans la doc. | Passer un audit automatisé Axe-core dédié sur les pages de composants Zudoku. |
| **Moteur Zudoku & Build SSR** | 🟢 Excellent | **100%** | • 288 routes pré-rendues statiquement sans erreur.<br>• Zéro erreur d'hydratation React.<br>• Génération dynamique des menus avec icônes Lucide contextuelles. | • Déclarer la langue `ini` dans `syntaxHighlighting.languages` pour éliminer le warning Shiki. | Optimiser le bundle des librairies de diagrammes lourdes (cytoscape/mermaid). |

---

## 🎯 3. Plan d'Action pour Rendre la Documentation encore Plus Lisible

Pour maximiser la clarté et la vitesse d'apprentissage des développeurs et décideurs :

1. **Tableaux de Synthèse & Badges "À retenir" en Début de Page :**
   - Placer en haut de chaque page un encadré récapitulatif DSFR (`fr-callout`) avec : *Temps de lecture estimé*, *Public cible (Front / Back / DevOps)*, et *Prérequis techniques*.

2. **Générateur d'Extraits de Code Dynamique (CodeTabs) :**
   - Systématiser l'usage des `CodeTabs` pour présenter simultanément les commandes en **`pnpm`**, **`npm`**, **`yarn`** et **`bun`**, ainsi qu'en **TypeScript** et **Python (Django)**.

3. **Complétion de la Documentation Internationale (`docs/en/`) :**
   - Ajouter un guide pas-à-pas *"Build a sovereign connector in 15 minutes"* pour les développeurs européens et internationaux souhaitant brancher les registres de leur pays.

4. **Amélioration du Thème & Navigation :**
   - Ajouter la prise en charge explicite du langage de configuration `.ini` / `dotenv` dans `zudoku.config.tsx`.
