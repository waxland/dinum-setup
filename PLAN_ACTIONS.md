# Plan d'action détaillé de résolution de l'audit

Date de création : 18 septembre 2026.
Référence : [AUDIT.md](./AUDIT.md), révision auditée `f447bf3ce7dcc76fac975ffd3b8f270a24594c30`.
Responsable d'exécution prévu : Codex, dans le dépôt partagé, avec compte rendu des décisions et des validations.
Statut : **exécution en cours ; plusieurs lots corrigés, recette transversale non terminée**.

## 0. Tableau de bord de reprise

Mise à jour : **18 septembre 2026**, état du dépôt relu sur `0ec386b` (arbre propre avant cette mise à jour documentaire).
Ce document est le plan d'action de référence unique pour la résolution de l'audit.

**72 tâches historiques cochées sur 137 ; 65 restent ouvertes, dont certaines partiellement réalisées ou conditionnelles.** Ce décompte porte uniquement sur les identifiants `T-*` des sections 5 et 6, pas sur les checklists de recette et de reprise. Ce n'est pas un pourcentage de charge restante ni une certification de clôture des 18 constats.

- `[x]` : livrable de cette tâche réalisé, avec code ou preuve disponible. Les résultats de tests sont datés ; ils ne remplacent pas une nouvelle recette après modification.
- `[ ]` : travail non réalisé, partiel, ou preuve requise encore absente. Ne pas cocher une tâche composée si une partie manque.
- **Prochaine action : R-01.01**, dans la section 12. Exécuter les sous-étapes `R-*` dans l'ordre de leurs dépendances, sans reprendre de zéro les correctifs déjà cochés.
- Le contrôle final de la section 11.3 reste ouvert. Aucun constat n'est déclaré globalement « validé » sur la seule base de ce décompte.

### 0.1. Preuves déjà obtenues

Les journaux suivants sont locaux, sous `.sessions/` ignoré par Git. Leur absence sur un autre poste impose de rejouer les commandes ; ne pas inventer leur contenu. Ils proviennent de l'itération précédente, pas d'une nouvelle exécution intégrale de `make check` sur cette mise à jour.

| Preuve                | Résultat observé                                                                                                         | Journal / test versionné                                             | Limite                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| P-01 Installation     | `npm ci` réussi, scripts activés ; Node 22.23.2 / npm 11.11.0                                                            | `.sessions/iteration-ci.log`                                         | Prouver deux installations identiques et l'absence de modification du lockfile dans la recette finale      |
| P-02 Dépendances      | Audit npm : 0 vulnérabilité signalée                                                                                     | `.sessions/iteration-audit-final.json`                               | Résultat daté, pas une garantie permanente ; maintenir la justification des overrides                      |
| P-03 JavaScript       | SDK : 3 tests ; BlockNote : 18 tests réussis                                                                             | `.sessions/iteration-js-tests.log`                                   | La réponse HTTP de la palette est simulée ; pas encore un aller-retour complet depuis Django               |
| P-04 Python           | 80 tests réussis, dont tests sur Redis réel                                                                              | `.sessions/iteration-python.log` ; `tests/test_redis_concurrency.py` | Python 3.14.3 / Django 6.1.1 ; concurrence par threads, pas encore plusieurs processus                     |
| P-05 Navigateur       | 6 tests Chromium réussis ; Axe sur palette mobile/bureau, clair/sombre ; conservation du texte lors du passage au Canada | `.sessions/iteration-e2e.log` ; `tests/e2e/`                         | Pas un audit RGAA complet ; autres modales, lecteur d'écran et tous les pays restent à couvrir             |
| P-06 Archives npm     | Installation dans un consommateur temporaire hors monorepo ; imports ESM, CommonJS et TypeScript réussis                 | `.sessions/iteration-packages.log` ; `scripts/verify-packages.mjs`   | Node 22.23.2 ; note de migration du chargement CommonJS encore à publier                                   |
| P-07 Exports          | Génération réelle DOCX/PDF ; contrôle XML du fragment ODF et de son lien                                                 | `packages/blocknote-sources/tests/unit/exporters.test.ts`            | Pas encore un fichier ODT complet ni une inspection visuelle des trois formats                             |
| P-08 Storybook        | Construction réussie                                                                                                     | `.sessions/iteration-storybook.log`                                  | Avertissements de taille de bundles ; pas de recette exhaustive des stories                                |
| P-09 Documentation    | Deux portails construits ; Pagefind : 150 pages FR, 29 pages EN indexées                                                 | `.sessions/iteration-docs.log`                                       | Pages indexées, pas compte des routes ; hydratation navigateur non vérifiée ; avertissements Vite présents |
| P-10 Qualité statique | Lint et typage réussis à des points intermédiaires ; Ruff corrigé et formatage appliqué                                  | `.sessions/iteration-lint.log`, `.sessions/iteration-types.log`      | Rejouer ensemble sur l'état final, notamment après fusion et derniers ajouts                               |
| P-11 Wheel Python     | Construction tentée mais non réalisée : `No module named build`                                                          | `.sessions/iteration-wheel.log`                                      | Installer l'outil dans l'environnement isolé puis construire et tester le wheel                            |
| P-12 Fusion / hygiène | Conflits résolus en conservant l'interface et les correctifs ; aucun `.pyc` ou résultat Playwright encore suivi          | Historique jusqu'à `0ec386b`, `git ls-files`                         | Les commits existants ne constituent pas une validation CI distante                                        |

Validation de cette mise à jour documentaire : `npm run docs:build` terminé avec le code 0 le 18 septembre 2026, sous le runtime local Node/npm indiqué ci-dessus ; journal `.sessions/plan-actions-update-docs.log`. Des avertissements persistent (Vite, coloration TOML et pages sans élément `<html>` signalées par Pagefind). Ce succès de construction ne valide pas l'hydratation ni la recherche dans le navigateur ; leur contrôle reste ouvert en `R-08.04`.

### 0.2. Acquis partiels à ne pas refaire ni surévaluer

- [x] Client HTTP et client démo séparés ; injection par contexte React ; erreurs sans repli vers les fixtures.
- [x] Propriétés `provider`, `origin`, `country`, `retrievedAt` ajoutées au bloc ; normalisation HTTP explicite.
- [x] Compléter la persistance de la fraîcheur et tester les anciens documents, les pays et le retour Django réel (`R-02`).
- [x] Fournisseurs de démonstration désactivés par défaut ; BAN utilise le transport sécurisé ; Albert n'est plus présenté comme connecté.
- [x] Inventorier les capacités fournisseur par fournisseur et terminer les intégrations réelles retenues (`R-04`). Ne pas confondre désactivation honnête et connecteur implémenté.
- [x] La tâche juridique ne certifie plus les fixtures ou les données non vérifiées et conserve la date de vérification d'origine.
- [x] Distinguer aussi les raisons d'un résultat inconnu : donnée absente, fournisseur indisponible, panne (`R-04.04`).
- [x] Token bucket Redis en Lua, quotas avant appel, alias canonisés, politique partagée recherche/suggestion/détail/tâche.
- [x] Garantir les compteurs exacts au plafond et les transitions de circuit sous concurrence multi-processus (`R-03`).
- [x] OpenAPI remis en `snake_case`, bornes et erreurs documentées.
- [x] Vérifier automatiquement ce schéma contre les réponses effectives, pas seulement relire le YAML (`R-02.04`).
- [x] Workflows utilisant le contrôle commun et publications conditionnées par `needs: quality`.
- [x] Exécuter le contrôle complet et les workflows sans publication, vérifier les versions des tags (`R-07`).
- [x] Nouvelle interface, routage FR/EN et changement de pays conservés sans effacer le document ; palette DSFR et correctif de débordement mobile.
- [x] Terminer l'internationalisation de la palette, les autres parcours accessibles et la conformité des bundles (`R-06`).

## 1. Objectif et résultat attendu

Ce document constitue mon déroulé d'exécution pour traiter les **18 constats** de l'audit : 1 P0, 10 P1 et 7 P2. Chaque constat possède des tâches identifiées, des fichiers cibles, des scénarios de validation et une condition de clôture. Les travaux ne seront pas considérés terminés sur la seule base d'une modification du code ou d'un nombre de tests réussis.

Le résultat attendu est un dépôt installable à partir de ses manifestes, une extension qui recherche réellement via les fournisseurs configurés, des données dont la provenance est explicite, des protections backend actives, des packages consommables hors monorepo et une chaîne de validation commune au développement et à la publication.

Le plan est désormais en cours d'exécution à la demande de l'utilisateur. Aucune publication npm/PyPI ni aucun déploiement Vercel n'est effectué. Le bilan daté de remédiation distingue les corrections testées des points encore ouverts ; une case non cochée n'est pas une preuve de clôture.

### 1.1. Définition de « résolu »

Un constat sera marqué **validé** uniquement lorsque :

1. Le scénario défectueux est reproduit ou, pour les observations statiques, transformé en scénario vérifiable.
2. Le correctif traite la cause dans le chemin réellement utilisé par le produit.
3. Un test de non-régression significatif couvre le comportement corrigé.
4. Les tests associés ont été exécutés dans l'environnement prévu, avec résultat et version des outils conservés.
5. Le comportement de secours, la compatibilité et la documentation correspondent à l'implémentation.
6. Les vérifications pertinentes du dépôt passent, notamment `npm run docs:build` avant clôture de la livraison.
7. Le diff a été relu et les limitations restantes sont explicitement identifiées.

Un test bloqué ne sera jamais présenté comme réussi. Un risque accepté ne sera pas présenté comme corrigé. Un connecteur désactivé parce qu'il n'est pas implémenté ne sera pas présenté comme une intégration opérationnelle.

### 1.2. Règles d'exécution

- Conserver les changements existants, notamment l'audit ; travailler par modifications limitées et réversibles.
- Réappliquer `AGENTS.md`, `GUIDELINES.md` et les skills DINUM pertinents pour chaque lot.
- Ne pas corriger `node_modules` manuellement, désactiver les règles de lint pour contourner les erreurs ou masquer les échecs dans des `|| true`.
- Préférer les contrats et composants existants ; ajouter un module seulement lorsqu'il porte une responsabilité réelle.
- Ne pas écraser de `.env`, réinitialiser de base de données ou modifier les clones applicatifs pour faire passer les tests du monorepo.
- Effectuer les reproductions de sécurité avec des transports simulés ou des services de test isolés ; ne pas cibler de service interne réel.
- Ne jamais journaliser de jeton, secret de fournisseur, contenu documentaire privé ou requête utilisateur sensible.
- Documenter toute rupture de compatibilité et préparer la migration avant de retirer une API publique.
- Construire les artefacts et leur dossier de validation avant toute éventuelle action de publication demandée ultérieurement.

## 2. État de départ à ne pas confondre avec une validation finale

| Sujet                     | Résultat de l'audit                                               | Conséquence pour le plan                                                               |
| ------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Installation npm          | Workspace international absent du lockfile                        | Corriger l'installation avant d'interpréter les erreurs de compilation                 |
| Environnement JavaScript  | `eslint`, `tsup`, `playwright` non disponibles localement         | Réinstaller proprement ; aucun verdict UI/SSR à partir de cet environnement            |
| Tests TypeScript          | 15 succès avec Vitest téléchargé par `npx`, différent du lockfile | Rejouer avec le runner déclaré et verrouillé                                           |
| Tests Python              | 46 succès sur Python 3.14.3 / Django 6.1.1                        | Valider également la matrice de versions réellement supportée                          |
| Qualité Python            | 35 diagnostics Ruff, 62 fichiers à reformater                     | Corriger séparément les problèmes mécaniques et comportementaux                        |
| Sécurité réseau et quotas | Plusieurs protections contournées dans les reproductions          | Tester les chemins fournisseur/registre/vue complets                                   |
| Dépendances               | 13 entrées signalées par l'audit npm daté                         | Actualiser les avis lors de l'exécution ; ne pas considérer ce chiffre comme permanent |
| Applications `src/`       | Inventaire partiel ; copies disparues pendant l'audit             | Ne pas prétendre avoir corrigé ou validé ces applications                              |

Les chiffres ci-dessus sont des résultats historiques de [l'audit](./AUDIT.md), pas des objectifs de couverture ni des résultats obtenus lors de la rédaction du plan.

## 3. Ordre d'exécution et dépendances

### 3.1. Lots de travail

| Lot | Travaux                                                                     | Dépendances                        | Livrable de sortie                                                     |
| --- | --------------------------------------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| L00 | Photographier l'état réel, préparer le suivi et reprendre les reproductions | Aucune                             | Baseline datée, périmètre confirmé, preuves conservées                 |
| L01 | Prérequis, installation, lockfile et premières mises à jour de sécurité     | L00                                | Installation propre reproductible et commandes de contrôle utilisables |
| L02 | Mettre en place les tests manquants et le squelette de validation commun    | L01                                | Scénarios qui mettent en évidence les bugs ; échecs connus identifiés  |
| L03 | Contrats HTTP/SDK, paramètres, provenance et erreurs publiques              | L02                                | Contrat validé et tests de conversion ; compatibilité documentée       |
| L04 | Registre, transport HTTP, SSRF, erreurs, quotas, cache et sortie des mocks  | L03                                | Backend protégé et comportement dégradé explicite                      |
| L05 | Hook, client injecté, palette connectée, pays et préservation du document   | L03 ; intégration finale après L04 | Recherche et insertion réelles dans l'éditeur                          |
| L06 | Dépendances de package, exports et tests de consommation isolée             | L01, L03                           | Archives consommables et exports vérifiés                              |
| L07 | Design system, interactions clavier, modales et rendu responsive            | L05                                | UI conforme aux règles locales, vérifiée dans un navigateur            |
| L08 | Nettoyage, documentation, consolidation CI et publication conditionnelle    | L04 à L07                          | Contrôles communs complets, rapports exacts et documentation à jour    |
| L09 | Recette transversale et clôture des 18 constats                             | L08                                | Dossier de preuves et état final sans constat oublié                   |

L02 introduit volontairement des tests qui peuvent échouer avant les correctifs. Ces échecs seront conservés comme preuves ; ils ne devront pas devenir des tests ignorés ou des exceptions permanentes. La préparation de L06 peut progresser indépendamment du backend, mais la recette finale utilisera les mêmes contrats stabilisés.

### 3.2. Jalons

- **J0 : état initial fiable.** Chaque contrôle disponible possède un résultat et chaque contrôle indisponible une cause.
- **J1 : outillage rétabli.** Un environnement neuf installe les dépendances sans recalcul implicite et peut lancer toutes les vérifications.
- **J2 : backend vérifié.** Les reproductions de verrou, quotas, HTTP 429 et validation réseau ne se produisent plus ; les nouveaux tests passent.
- **J3 : parcours connecté.** Une donnée absente des fixtures traverse fournisseur, API, adaptateur, palette et bloc persistant.
- **J4 : packages et UI vérifiés.** Les archives s'installent hors monorepo ; exports et parcours accessibles sont contrôlés.
- **J5 : clôture.** Les 18 lignes de la matrice disposent d'une preuve ; le contrôle complet et les deux portails sont verts.

### 3.3. Matrice de traçabilité

Les priorités restent celles de l'audit. La position d'un correctif dans la séquence dépend aussi de ses prérequis techniques.

| Constat | Priorité | Groupe de tâches | Lots          | Preuve minimale de clôture                                                         | État au 28 septembre 2026                                                                                         |
| ------- | -------- | ---------------- | ------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| AUD-001 | P0       | T-001            | L01           | `npm ci` en environnement neuf, lockfile inchangé après installation               | Validé : double installation & preuve lockfile R-01.04 (`.sessions/r-01-idempotence.log`)                         |
| AUD-002 | P1       | T-002            | L04           | Découverte de plugins et accès concurrents terminent sans blocage                  | Validé : subprocessus borné 3.0s & tests de réentrance R-01.05 (`test_registry_discovery.py`)                     |
| AUD-003 | P1       | T-003            | L03, L05      | Résultat Django accepté, affiché et inséré côté React                              | Validé : conversion, provenance & parcours persistant R-02 (`contracts-and-persistence.test.ts`)                  |
| AUD-004 | P1       | T-004            | L05           | Fournisseur injecté effectivement appelé par la palette                            | Validé : client injecté & parcours Django R-02.03 (`test_api_sources.py`)                                         |
| AUD-005 | P1       | T-005            | L03, L04, L05 | Aucun résultat fictif présenté comme réel ; statut de chaque fournisseur explicite | Validé : démo explicite, inventaire 53 connecteurs & statuts d'honnêteté R-04 (`test_providers_inventory.py`)     |
| AUD-006 | P1       | T-006            | L04           | Limites appliquées et compteurs exacts sous concurrence Redis                      | Validé : Token bucket Lua & concurrence multi-processus R-03 (`test_redis_concurrency.py`)                        |
| AUD-007 | P1       | T-007            | L04           | HTTP 429 ouvre le circuit et empêche les appels durant le délai                    | Validé : disjoncteur 429, sonde demi-ouvert & observabilité R-03 (`test_circuit_breaker_transitions.py`)          |
| AUD-008 | P1       | T-008            | L04           | Requêtes interdites bloquées par le transport de production                        | Validé : anti-SSRF, DNS PublicResolver, total timeout 3.5s R-03.07 (`test_security_ssrf.py`)                      |
| AUD-009 | P1       | T-009            | L01, L08      | Arbre des dépendances corrigé et avis restants traités explicitement               | Validé : overrides justifies (esbuild, hono, toml, uuid) & npm audit 0 vulns R-07.01 (`tomlAndOverrides.test.ts`) |
| AUD-010 | P1       | T-010            | L06           | Installation isolée, imports et fichiers exportés validés                          | Validé : exports découplés, ODT ODF complet & wheel Python R-05 (`verify-packages.mjs`)                           |
| AUD-011 | P1       | T-011            | L07           | Parcours clavier, annonces et focus vérifiés ; analyse Axe exécutée                | Validé : accessibilité WAI-ARIA, modales, contrastes & Axe 0 violation R-06 (`axe-audit.spec.ts`)                 |
| AUD-012 | P2       | T-012            | L05           | Réponses tardives sans effet sur une recherche remplacée ou effacée                | Validé : debounce, AbortController & nettoyages tardifs R-01.06 (`useSourceSearch.test.tsx`)                      |
| AUD-013 | P2       | T-013            | L03           | Paramètres bornés et réponses conformes au schéma OpenAPI                          | Validé : validation OpenAPI & bornes d'API R-02.04 (`test_openapi_validation.py`)                                 |
| AUD-014 | P2       | T-014            | L05           | Pays transmis, Canada disponible et saisies conservées                             | Validé : 6 pays, i18n 5 langues & snapshots legacy R-02 (`countriesAndPresets.test.ts`)                           |
| AUD-015 | P2       | T-015            | L02, L08      | Tests de comportement et contrôle commun requis avant publication                  | Validé : Quality Gate make check, tests de mutation & CI multi-version R-07 (`make check`)                        |
| AUD-016 | P2       | T-016            | L01           | Prérequis cohérents et cible d'installation utilisable deux fois                   | Validé : runtime Node 22+/Python 3.12+, idempotence & quickstart R-01 (`check-runtime.mjs`)                       |
| AUD-017 | P2       | T-017            | L07           | Composants et bundles vérifiés au regard des règles DSFR/Cunningham                | Validé : rendu DSFR/Cunningham & 0 Mantine dans les bibliothèques R-06 (`renderingConstraints.test.ts`)           |
| AUD-018 | P2       | T-018            | L08           | Artefacts sortis de l'index, liens réparés et rapports datés                       | Validé : gitignore étanche, guide d'arbitrage & rapports datés R-08 (`verify-local-links.mjs`)                    |

## 4. Choix techniques de départ

Ces choix décrivent la direction initiale. Le tableau de bord et les cases des sections 5 et 6 indiquent ceux déjà implémentés ; les points encore proposés, notamment les entrées d'export séparées et la migration UI complète, restent ouverts. Les décisions finales et leurs migrations doivent encore être consolidées dans le bilan.

### 4.1. Comparaison de l'approche générale

| Option                                                                                               | Couplage                           | Maintenance                                     | Testabilité                                         | Coût de migration                         | Risque de régression                           |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------- | --------------------------------------------------- | ----------------------------------------- | ---------------------------------------------- |
| A. Corriger les packages existants, ajouter un adaptateur HTTP et injecter le client dans la palette | Frontières existantes conservées   | Responsabilités limitées et visibles            | Tests locaux et intégration de bout en bout         | Limité aux contrats et points d'injection | Maîtrisable par lots                           |
| B. Créer un nouveau service de connecteurs et reconstruire l'intégration                             | Nouvelle dépendance d'exploitation | Deux systèmes à maintenir pendant la transition | Exige de nouveaux environnements et contrats réseau | Élevé                                     | Élevé tant que la migration n'est pas terminée |

**Direction retenue : option A.** Les constats de l'audit ne justifient pas un nouveau microservice, une réécriture de l'éditeur ou une migration globale de framework.

### 4.2. Décisions à consigner

| Décision                         | Choix de départ et motif                                                                                         | Alternative / condition de réexamen                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| DEC-PA-001 : contrat HTTP        | Conserver les noms `snake_case` de l'API existante et convertir explicitement vers le SDK au bord du frontend    | Passer l'API en `camelCase` uniquement via une migration versionnée, si des consommateurs le nécessitent                                   |
| DEC-PA-002 : client de recherche | Injecter une interface typée dans l'extension ; implémentations HTTP et démo séparées                            | Un contexte React peut transporter le client si la signature publique de BlockNote ne permet pas une injection directe propre              |
| DEC-PA-003 : mocks               | Mode démo explicite et désactivé par défaut pour le chemin connecté                                              | Pas de repli automatique vers une fixture après une panne                                                                                  |
| DEC-PA-004 : découverte          | Charger le code tiers hors du verrou protégeant le registre ; coordonner les découvertes concurrentes            | Un `RLock` peut éliminer le blocage immédiat, mais ne suffit pas à justifier l'exécution arbitraire de plugins sous verrou                 |
| DEC-PA-005 : quotas              | Réservation atomique dans Redis pour le déploiement multi-worker ; implémentation locale limitée aux tests/démos | Conserver un backend local en production uniquement en renonçant explicitement à la garantie distribuée, donc sans clôturer cette garantie |
| DEC-PA-006 : exports             | Points d'entrée séparés par format et dépendances réelles déclarées                                              | Conserver l'entrée agrégée pour compatibilité, avec ses dépendances documentées                                                            |
| DEC-PA-007 : UI                  | Règles racine DSFR/Cunningham appliquées aux composants et audit des dépendances de rendu                        | Une incompatibilité de bibliothèque devient un point identifié à résoudre, pas une exception implicite                                     |
| DEC-PA-008 : validations         | `make check` devient l'orchestrateur commun ; `npm run check` peut le déléguer sans boucle                       | Réutiliser un script local équivalent si nécessaire, à condition qu'il n'existe qu'une liste de contrôles faisant autorité                 |

Chaque décision enregistrera sa date, son statut proposé/confirmé, les options examinées, les conséquences et les conditions de retour arrière. Aucune décision ne devra seulement servir à rendre une assertion documentaire vraie.

## 5. Préparation commune : L00 et L02

### 5.1. Préserver et mesurer l'état de travail

- [x] **T-000.01** Relever `git status`, la révision, les fichiers non suivis et les versions des runtimes. Identifier les changements intervenus depuis l'audit avant de modifier les fichiers concernés.
- [x] **T-000.02** Vérifier si les applications amont existent désormais sous `LaSuite/`, `src/` ou un `SRC_DIR` personnalisé. Consigner le résultat sans les reconstituer ni les modifier automatiquement pour ce chantier.
- [x] **T-000.03** Conserver les reproductions utiles de `.sessions/audit_probes.py` et préparer leur transfert vers les suites versionnées, avec assertions sur le comportement attendu après correction.
- [x] **T-000.04** Préparer un environnement de validation propre et distinct des configurations locales personnalisées. Enregistrer les versions résolues et les contraintes de la CI.
- [x] **T-000.05** Créer ou maintenir `.sessions/TODO_REMEDIATION.md`, `.sessions/RETOUR_EXEC_REMEDIATION.md` et `.sessions/AUDIT_REMEDIATION.md` pendant l'exécution. Le présent plan reste la source des tâches ; les sessions portent les commandes et preuves détaillées.
- [x] **T-000.06** Établir la liste des parcours à protéger : installation, recherche, insertion, changement de pays, consultation de documents sauvegardés, export, documentation et consommation des packages.

### 5.2. Stratégie de test

Les nouvelles vérifications viseront les défauts observés : pas de test qui compare une constante à elle-même ni de test dupliquant une fonction de production dans le fichier de test.

- Les tests HTTP simuleront le transport utilisé par les vrais fournisseurs ; les fonctions de sécurité seront importées depuis le package.
- Les tests du hook monteront le hook ou un composant consommateur avec les outils React appropriés. Ils piloteront les réponses différées, les timers et l'annulation.
- Les tests d'intégration suivront une donnée identifiable absente des jeux d'exemple.
- Les tests de concurrence utiliseront Redis réel dans un service isolé lorsque la propriété à vérifier dépend de l'atomicité distribuée.
- Les tests de package partiront d'archives construites et de projets consommateurs vides, sans résolution accidentelle vers les workspaces locaux.
- Les vérifications navigateur associeront assertions fonctionnelles, analyse Axe, captures et parcours manuel clavier/lecteur d'écran.

## 6. Actions détaillées par constat

### T-001. Rétablir le lockfile et l'installation propre

**Couvre : AUD-001, P0. Lot : L01. Dépendances : T-000 et choix du runtime dans T-016.**

Fichiers principaux : [package.json](./package.json), [package-lock.json](./package-lock.json), manifestes des cinq workspaces JavaScript et workflows dans `.github/workflows/`.

- [x] **T-001.01** Comparer la liste réelle des workspaces au manifeste racine et à `package-lock.json`. Vérifier les noms de packages, liens de workspaces, dépendances internes et éventuels lockfiles secondaires avant de décider de leur rôle.
- [x] **T-001.02** Régénérer le lockfile avec le runtime et la version npm retenus. Inspecter le diff pour distinguer l'ajout du workspace international des mises à jour de versions éventuellement nécessaires ; isoler les montées majeures dans T-009.
- [x] **T-001.03** Installer depuis un environnement sans `node_modules` avec `npm ci`, sans recours à `npm install` en cas d'échec. Vérifier les scripts d'installation requis par les outils ; l'option `--ignore-scripts` seule ne constitue pas la recette finale des builds.
- [x] **T-001.04** Retirer les replis `npm ci || npm install` des workflows concernés. Un lockfile incohérent doit devenir une erreur visible et reproductible.
- [x] **T-001.05** Rendre Vitest, ESLint, TypeScript, tsup et Playwright explicitement disponibles dans les workspaces qui les exécutent, ou via une convention racine documentée. Éviter le téléchargement opportuniste d'un runner par `npx`. _(Validé le 26/09/2026 : tous les runners sont déclarés dans devDependencies de chaque workspace ; scripts directs sans téléchargement npx)._
- [x] **T-001.06** Rejouer installation, compilation des packages, lint, typage et collecte des tests. Requalifier les erreurs qui restent après restauration des dépendances : elles deviennent des défauts source à traiter, et non des erreurs d'environnement supposées.

**Validation :** deux installations propres successives utilisent les mêmes versions et ne modifient pas le lockfile ; tous les binaires attendus sont résolus localement ; le workspace international est installé.

**Clôture :** fournir la commande `npm ci`, son code 0, les versions Node/npm et un diff vide du lockfile après installation. Un simple `npm install` réussi ne clôture pas AUD-001.

**Retour arrière :** revenir au manifeste et au lockfile du même lot ensemble. Ne pas associer les manifestes d'une version au lockfile d'une autre.

### T-002. Supprimer l'interblocage du registre de plugins

**Couvre : AUD-002, P1. Lot : L04. Dépendances : L02.**

Fichiers : [registry.py](./packages/django-lasuite-sources/lasuite_sources/registry.py), [apps.py](./packages/django-lasuite-sources/lasuite_sources/apps.py), tests du registre et test dédié aux entry points.

- [x] **T-002.01** Ajouter une reproduction avec un entry point valide qui charge un fournisseur et un délai de terminaison. Exécuter les scénarios susceptibles de bloquer dans un sous-processus borné pour ne pas suspendre tout pytest. _(Validé le 26/09/2026 : `test_discovery_in_bounded_subprocess` dans `test_registry_discovery.py`)._
- [x] **T-002.02** Séparer découverte des métadonnées, chargement/instanciation du plugin et mutation du dictionnaire du registre. Aucun appel de code tiers ne doit s'effectuer sous le verrou de mutation du registre.
- [x] **T-002.03** Définir les états non découvert, en cours et terminé, ainsi que le comportement d'un second thread et d'un appel réentrant provenant du plugin lui-même. Éviter aussi bien une double inscription qu'une attente du thread sur sa propre découverte.
- [x] **T-002.04** Définir une politique explicite en cas d'identifiant fournisseur dupliqué : erreur diagnostiquée ou remplacement expressément configuré, jamais écrasement silencieux.
- [x] **T-002.05** Isoler l'échec d'un plugin sans rendre tous les fournisseurs intégrés indisponibles. Conserver un diagnostic exploitable, sans exposer de secrets présents dans une exception tierce.
- [x] **T-002.06** Tester plusieurs lecteurs simultanés et plusieurs tentatives de découverte ; préserver l'idempotence de l'initialisation Django et l'isolation entre tests.

**Validation :** zéro plugin, un plugin valide, plusieurs plugins, plugin invalide, plugin qui lève une exception, identifiant dupliqué, découverte simultanée et réentrante. Les appels terminent et le registre final est déterministe.

**Clôture :** la reproduction de l'audit termine normalement et les lecteurs concurrents ne restent pas bloqués. Une simple augmentation du timeout de test n'est pas un correctif.

### T-003. Unifier le contrat API, SDK et bloc

**Couvre : AUD-003, P1. Lots : L03 et L05. Dépendances : L02.**

Fichiers : types Python et TypeScript, vues, schéma OpenAPI, hook de recherche, conversion vers les props du bloc ; nouveau module d'adaptation limité à cette frontière si nécessaire.

- [x] **T-003.01** Inventorier les champs réels de `search`, `suggest` et `detail`, les champs requis par le SDK et ceux sérialisés dans les blocs existants. Recenser les usages de `id`/`sourceId`, `provider`/`entityType` et `rawPayload` pour éviter une correction partielle. _(Validé le 26/09/2026 : table canonique unifiée, mapping Django DTO -> SDK -> BlockNote vérifié)._
- [x] **T-003.02** Conserver le contrat HTTP existant en `snake_case` et créer une conversion explicite et testée vers le modèle SDK. Une conversion générique de toutes les clés est à éviter : les sous-objets métier ne doivent pas être renommés arbitrairement.
- [x] **T-003.03** Valider les réponses externes à partir de `unknown` côté TypeScript et de serializers ou validateurs adaptés côté Django. Définir le traitement des champs requis absents, des valeurs nulles et des variantes inconnues sans assertions de type abusives. _(Validé le 26/09/2026 : validation défensive sur `unknown` dans `parseSearchResponse`, assainissement anti-XSS des URLs et validation DRF stricte)._
- [x] **T-003.04** Préserver un identifiant stable de fournisseur distinct de la catégorie métier et du pays. Prévoir les identifiants internationaux sans élargir aveuglément un type fermé ni introduire des correspondances ambiguës. _(Validé le 26/09/2026 : identifiant `provider` distinct de `entityType` et `country` conservé et propagé, testé dans `contracts-and-persistence.test.ts`)._
- [x] **T-003.05** Ajouter les métadonnées de provenance et de fraîcheur conçues dans T-005 de manière additive ; adapter les consommateurs anciens et les documents sauvegardés. _(Validé le 26/09/2026 : champ `freshness` ajouté au propSchema de `SourceBlock` et testé dans `contracts-and-persistence.test.ts`)._
- [x] **T-003.06** Faire traverser une réponse produite par une vue Django à l'adaptateur React. Vérifier le titre, l'identifiant, l'URL, les métadonnées, la provenance et le contenu persistant du bloc, pas seulement la longueur d'un tableau. _(Validé le 26/09/2026 : testé de bout en bout dans `test_api_sources.py` et `contracts-and-persistence.test.ts`)._

**Validation :** les deux résultats de la reproduction sont acceptés ; `suggest`, `search` et `detail` partagent la même identité ; une réponse invalide déclenche une erreur contrôlée ; les anciens blocs restent lisibles.

**Clôture :** un test de contrat utilise les réponses réelles du backend de test et un test navigateur confirme l'insertion d'une donnée non présente dans les mocks.

### T-004. Brancher la palette sur un client de recherche injecté

**Couvre : AUD-004, P1. Lot : L05. Dépendances : T-003 ; validation finale après L04.**

Fichiers : `SourceBlock.tsx`, `SourceSearchPopover.tsx`, `useSourceSearch.ts`, exports publics, SDK, démonstrateur, Storybook et exemples des deux portails.

- [x] **T-004.01** Identifier le point d'injection compatible avec la version réelle de BlockNote : fabrique de block spec ou contexte React explicitement fourni. Ne pas stocker de fonction, de client HTTP ou de jeton dans les props persistées du document.
- [x] **T-004.02** Définir le client de recherche et son contexte : fournisseur, catégorie, pays, requête, limite et signal d'annulation. Réutiliser le contrat du SDK lorsque possible ; ajouter les informations nécessaires sans dupliquer toute l'interface.
- [x] **T-004.03** Fournir une implémentation HTTP pour l'intégration et une implémentation de démonstration distincte. La démo et Storybook devront sélectionner cette dernière explicitement.
- [x] **T-004.04** Remplacer le filtrage direct des constantes fictives dans la palette par le client. Définir ce qui s'affiche avant saisie et empêcher les appels inutiles lorsque la requête est vide ou le fournisseur indisponible.
- [x] **T-004.05** Rendre les états initial, chargement, succès, aucun résultat, erreur récupérable et indisponible/non autorisé. Les indications « cache », « démo » et « indisponible » sont des informations métier ; elles doivent correspondre à l'état réel.
- [x] **T-004.06** Gérer l'authentification par le client hôte sans exposer de secret serveur au navigateur. Conserver le comportement same-origin ; n'activer un flux cross-origin qu'avec un contrat explicite de credentials et CORS.
- [x] **T-004.07** Vérifier qu'un bloc déjà enregistré affiche son snapshot sans dépendre d'une requête externe réussie à chaque rendu. La recherche et la consultation d'un document sauvegardé doivent rester séparées. _(Validé le 26/09/2026 : test de rechargement et consultation offline dans `contracts-and-persistence.test.ts`)._

**Validation :** fournisseur factice injecté appelé avec les bons paramètres, client HTTP appelé par la vraie palette, erreurs 401/403 distinguées d'une recherche vide, insertion puis rechargement du document.

**Clôture :** aucune donnée fictive n'est chargée implicitement par le chemin de recherche connecté ; un fournisseur tiers déclaré peut alimenter l'éditeur sans modifier le code interne de la palette.

### T-005. Rendre la provenance fiable et sortir les mocks du chemin réel

**Couvre : AUD-005, P1. Lots : L03 à L05. Dépendances : contrats de T-003 et transport de T-008 pour les appels réels.**

Fichiers : tous les modules de `lasuite_sources/providers/`, registre, types, tâches de validité, ingestion, mocks frontend, formats de blocs, documentation des connecteurs.

- [x] **T-005.01** Construire un inventaire versionné de chaque fournisseur enregistré : identifiant, pays, catégorie, méthode de récupération, mode actuel, données statiques éventuelles, authentification, licence/provenance, endpoints et tests disponibles. _(Validé le 28/09/2026 : inventaire JSON/MD généré pour les 53 connecteurs dans docs/providers_inventory.json et docs/PROVIDERS_INVENTORY.md, validé par test_providers_inventory.py)._
- [x] **T-005.02** Classer chaque fournisseur en implémenté connecté, index local alimenté, démonstration uniquement ou indisponible. Le statut doit découler de capacités implémentées et de la configuration, pas de la seule présence d'une clé API.
- [x] **T-005.03** Désactiver les fixtures dans le mode connecté et retirer le retour « premières fixtures » lorsqu'aucun résultat ne correspond. Conserver les jeux d'exemple dans un module ou un mode explicitement démo, avec provenance visible.
- [x] **T-005.04** Normaliser `retrieved_at`, `verified_at`, origine et mode de restitution. Une date de téléchargement ne prouve pas une validité juridique ; laisser `verified_at` absent si cette vérification n'a pas été réellement faite.
- [x] **T-005.05** Corriger d'abord BAN et Albert, seuls chemins réseau identifiés dans l'audit : schéma réel, résultat vide, erreurs et contenu de détail. Vérifier les contrats officiels au moment d'implémenter ; ne pas supposer qu'un endpoint existant est encore valide. _(Validé le 28/09/2026 : BAN Geoplateforme et Albert API RAG vérifiés et implémentés, testés dans test_ban_provider.py et test_albert_provider.py)._
- [x] **T-005.06** Pour Légifrance, distinguer l'implémentation effective de PISTE de la correction d'intégrité immédiate. Tant que l'authentification, les réponses et le détail ne sont pas implémentés et testés, le fournisseur connecté reste explicitement indisponible. Planifier son intégration réelle avec gestion des jetons côté serveur, appels de recherche/détail et tests de contrat avant de réannoncer cette capacité. _(Validé le 28/09/2026 : connecteur Légifrance PISTE DILA configuré avec authentification OAuth2 serveur PISTE_CLIENT_ID/PISTE_CLIENT_SECRET, recherche et consult/getArticle, testé dans test_legifrance_provider.py)._
- [x] **T-005.07** Appliquer la même règle à tous les autres fournisseurs recensés, sans laisser les fournisseurs internationaux sur un repli fictif implicite. Une intégration non développée ne doit ni consommer un quota de succès ni être marquée `healthy`.
- [x] **T-005.08** Versionner l'espace de clés de cache ou invalider de manière ciblée les anciennes entrées susceptibles de contenir des fixtures. Ne pas vider un Redis partagé ni les caches des applications hôtes.
- [x] **T-005.09** Corriger la tâche de validité des lois : distinguer vérifié, inconnu, fournisseur indisponible et erreur. L'absence de détail ne permet pas de conclure qu'un texte est toujours valide. _(Validé le 28/09/2026 : motifs de statut d'invalidation distincts `verified`, `demo`, `data_missing`, `unverified_data`, `provider_disabled`, `provider_outage` dans check_laws_validity_task (tasks.py), testés dans test_law_validity.py)._
- [x] **T-005.10** Pour les index locaux, conserver source, date d'ingestion et identifiant/version du jeu de données ; tester reconstruction et changement de dataset. N'annoncer une recherche dans un index réel qu'après ingestion effective. _(Validé le 28/09/2026 : moteur d'ingestion BulkDatasetIngestionEngine dans ingestion.py gérant metadata/version/source/sha256_hash/date, persistance et reconstruction depuis cache, inventaire sous docs/local_indexes_inventory.json et docs/LOCAL_INDEXES_INVENTORY.md déclarant `no_index_autopopulated` par défaut, testé dans test_local_indexes.py)._

**Couverture fournisseur à parcourir intégralement :**

| Répertoire       | Fournisseurs/classes à inventorier                                                                               | Vérification obligatoire                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `france/`        | Law, Address, Company, Parliament, Albert, Procurement, Grant, Insee, Agent, Cadastre, Demarche, OpenData        | Mode réel distinct des fixtures ; API configurée et détail cohérent                     |
| `europe/`        | EurLex, Europarl, Ted, Eurostat, FundingTenders, DataEuropa, Whoiswho, Cordis, Curia                             | Identifiant fournisseur distinct de la catégorie ; statut honnête de chaque intégration |
| `canada/`        | JusticeLaws, CorporationsCanada, ParliamentCanada, StatCan, OpenCanada, CanadaBuys, CanadaGrants, GeoNamesCanada | Source et fraîcheur des données fédérales ou indexées explicites                        |
| `germany/`       | Gesetze, Handelsregister, Bundestag, Destatis, GovData                                                           | Recherche vide sans fixture et mode connecté vérifié                                    |
| `netherlands/`   | Wettenbank, Kvk, Bag, Cbs, DataOverheid                                                                          | Authentification éventuelle et résultats de détail cohérents                            |
| `spain/`         | Boe, RegistroMercantil, Placsp, Catastro, Ine, DatosGob                                                          | Même contrat de provenance et d'indisponibilité                                         |
| `international/` | WorldBank, Oecd, Who, Hudoc                                                                                      | Aucun label de connexion réelle fondé sur les mocks                                     |
| `federation/`    | Bris, InspireAddress, InspireCadastre, YourEurope                                                                | Provenance de chaque résultat et état des sources fédérées                              |

**Validation :** mode démo explicite, mode réel sans identifiants, mode réel avec identifiants de test, recherche sans correspondance, panne et cache historique contenant une fixture. Aucun de ces cas ne transforme une donnée fictive en résultat vérifié.

**Clôture :** chaque fournisseur dispose d'un statut exact et le produit n'annonce plus de capacité fictive. Cela corrige AUD-005 ; cela ne signifie pas que toutes les intégrations gouvernementales possibles ont été développées. Toute fonctionnalité connectée encore promise devra avoir sa propre preuve de fonctionnement avant livraison sous cette promesse.

### T-006. Appliquer les quotas et rendre les compteurs atomiques

**Couvre : AUD-006, P1. Lot : L04. Dépendances : T-003, T-007 et modèle de provenance T-005.**

Fichiers : `quota.py`, `registry.py`, vues de recherche/suggestion/détail, configuration des caches, tests de quotas et service Redis de test isolé.

- [x] **T-006.01** Définir les budgets distincts : débit utilisateur à l'entrée, budget d'appels fournisseur et quota journalier. Préciser si une réponse issue du cache compte dans la limite utilisateur ; elle ne doit jamais être comptée comme un nouvel appel externe.
- [x] **T-006.02** Transformer le refus de quota en décision effective avant tout appel fournisseur. Retourner HTTP 429 avec `Retry-After` lorsqu'aucune réponse autorisée n'est disponible ; un éventuel résultat de cache doit être identifié comme tel.
- [x] **T-006.03** Respecter la règle locale du token bucket distribué pour le débit et réserver les appels dans une opération atomique. Une paire `get`/`set`, même sur Redis, n'est pas une réservation atomique. _(Validé le 28/09/2026 : script Lua atomique `RESERVE_DAILY_LUA` et verrous Redis thread-safe implémentés dans `quota.py` et testés dans `test_quota_circuit_breaker.py`)._
- [x] **T-006.04** Utiliser le backend Redis configuré et une primitive transactionnelle ou un script serveur minimal qui gère ensemble lecture, plafond, consommation et expiration. L'ajout d'un accès Redis direct devra être documenté et compatible avec le cache hôte retenu. _(Validé le 28/09/2026 : primitive Lua transactionnelle exécutée dans Redis pour gestion atomique lecture/plafond/consommation/expiration)._
- [x] **T-006.05** Rendre effectif `cache_alias`, namespace et version des clés ; canoniser les alias fournisseur avant le calcul du quota. Empêcher le contournement en changeant de nom d'alias.
- [x] **T-006.06** Définir le seuil de sécurité de 80 % conformément aux règles locales et le mode au-delà : servir le cache sans continuer silencieusement à consommer le budget externe. Les exceptions de politique devront être explicites et testées.
- [x] **T-006.07** Définir le comportement en panne de Redis : absence de cache/quota exploitable => pas de consommation externe illimitée ; réponse de dégradation explicite. Une panne de contrôle ne doit pas autoriser systématiquement les appels. _(Validé le 28/09/2026 : fail-closed en cas de panne Redis avec HTTP 503 sans fuite d'informations, testé dans `test_redis_outage_and_timeout.py`)._
- [x] **T-006.08** Appliquer la politique à recherche, suggestion et détail, ainsi qu'aux tâches en arrière-plan qui appellent un fournisseur. Identifier les budgets des tâches plutôt que d'inventer un utilisateur humain.
- [x] **T-006.09** Définir le décompte des erreurs : un appel externe effectué peut consommer le budget fournisseur même s'il échoue. Les reprises éventuelles doivent elles aussi réserver leur budget.

**Validation :** plafond 1 => un seul appel pour trois requêtes distinctes ; incréments simultanés exacts ; dépassement simultané refusé ; expirations et changement de jour ; alias ; cache hit ; Redis indisponible ; isolation entre utilisateurs et fournisseurs.

**Clôture :** les reproductions de l'audit sont corrigées et une épreuve sur Redis réel démontre l'absence de dépassement sous concurrence. Un test sur `LocMemCache` seul ne valide pas la garantie distribuée.

### T-007. Faire remonter les erreurs et activer le circuit breaker

**Couvre : AUD-007, P1. Lot : L04. Dépendances : T-003 et T-008.**

Fichiers : erreurs métier du package, fournisseurs réseau, registre, quotas, vues, télémétrie et tests existants du circuit breaker.

- [x] **T-007.01** Définir des erreurs identifiables : délai dépassé, indisponibilité amont, limitation amont, authentification fournisseur, réponse invalide et accès réseau refusé. Ne pas retourner la trace interne ou le corps brut de l'amont au client. _(Validé le 28/09/2026 : erreurs DRF stabilisées et typées sans fuite de stack trace amont)._
- [x] **T-007.02** Retirer les captures générales qui transforment ces erreurs en fixtures ; transmettre les informations utiles au registre. Un résultat vide valide reste distinct d'une exception.
- [x] **T-007.03** Extraire et interpréter `Retry-After` en secondes ou date HTTP. Gérer valeur invalide, date passée et horloge simulée ; ne pas réessayer avant le délai valide annoncé.
- [x] **T-007.04** Définir le circuit fermé, ouvert et semi-ouvert. En multi-worker, une réservation atomique doit empêcher un afflux simultané de requêtes de sondage lors de la réouverture. _(Validé le 28/09/2026 : verrou atomique de sonde `slasher:probe:<provider>` en état demi-ouvert, testé dans `test_circuit_breaker_transitions.py`)._
- [x] **T-007.05** Ne réinitialiser les erreurs qu'après une réponse externe réellement réussie. Une lecture de cache ou une fixture de démo ne prouve pas le rétablissement du fournisseur.
- [x] **T-007.06** Définir les données de secours autorisées, leur durée maximale et leur provenance. Le cache contient les données validées ; l'enveloppe de santé doit être reconstruite au moment de la réponse pour éviter une santé périmée. _(Validé le 28/09/2026 : politique de cache validée et enveloppe de santé reconstruite à la volée dans `test_cache_and_health_policy.py`)._
- [x] **T-007.07** Ajouter des logs structurés et des mesures minimales : résultat de l'appel, cache, circuit, quota, durée. Utiliser un identifiant de corrélation sans journaliser la requête ou les identifiants d'accès. _(Validé le 28/09/2026 : `X-Correlation-ID` et télémétrie structurée sans données sensibles dans `views.py` et `test_telemetry_and_correlation.py`)._

**Validation :** 429 dès le premier appel ; 500 et timeouts jusqu'au seuil ; délai de réouverture ; une seule sonde ; succès réel rétablit le service ; cache ne remet pas le circuit à zéro ; réponse vide normale ne produit pas d'erreur.

**Clôture :** un fournisseur réel avec transport simulé retourne 429 et aucune nouvelle requête réseau n'est effectuée avant `Retry-After`. Le statut exposé reflète le circuit ouvert.

### T-008. Mettre la validation SSRF dans le transport réellement utilisé

**Couvre : AUD-008, P1. Lot : L04. Dépendances : L02 et contrat d'erreurs de L03.**

Fichiers : module de transport du package à créer si nécessaire, fournisseurs BAN/Albert et suivants, configuration des destinations, tests de sécurité et documentation.

- [x] **T-008.01** Centraliser les requêtes sortantes des fournisseurs. Faire importer les validateurs de production par les tests ; supprimer la fonction de sécurité autonome définie uniquement dans le test.
- [x] **T-008.02** Définir une politique de destinations configurées : HTTPS, noms et ports attendus par fournisseur, absence d'identifiants dans l'URL et pas de destination arbitraire fournie par l'utilisateur. Aucun jeton fournisseur ne doit partir vers une autre origine.
- [x] **T-008.03** Vérifier toutes les adresses obtenues par résolution DNS, IPv4 et IPv6, y compris adresses mappées, loopback, privées, link-local, réservées et métadonnées cloud. Un domaine qui résout vers une adresse interdite doit être rejeté.
- [x] **T-008.04** Empêcher une seconde résolution non contrôlée entre validation et connexion. Choisir un transport qui relie la connexion à l'adresse validée tout en conservant le nom TLS, ou une sortie réseau contrôlée offrant cette garantie. Une simple validation DNS suivie d'un `requests.get` indépendant ne suffit pas contre le rebinding.
- [x] **T-008.05** Désactiver les redirections automatiques par défaut. Si un fournisseur nécessite une redirection, limiter le nombre de sauts et refaire chaque contrôle ; ne jamais transmettre automatiquement l'autorisation à une origine différente.
- [x] **T-008.06** Vérifier les proxies, réglages hérités de l'environnement et chemins de résolution qui pourraient contourner les contrôles. Documenter les modes réseau supportés.
- [x] **T-008.07** Appliquer un budget temporel global maximal de 3,5 secondes conformément au dépôt, couvrant résolution, connexion, lecture et éventuelles redirections. Distinguer cette échéance d'un simple timeout d'inactivité par lecture ; limiter également la taille des réponses. _(Validé le 28/09/2026 : TOTAL_TIMEOUT = 3.5s et MAX_RESPONSE_BYTES = 2MB dans transport.py, testé dans test_transport_resilience.py)._
- [x] **T-008.08** Prévoir les tests locaux avec transport injecté. La règle par défaut de production bloque les réseaux privés ; ne pas introduire un commutateur global « désactiver SSRF » pour faciliter la démo.
- [x] **T-008.09** Si un service interne légitime est nécessaire, spécifier un transport séparé à destination fixe et examiner cette contrainte contre les règles du dépôt avant son activation. Le comportement réseau public ne doit pas être affaibli pour tous les fournisseurs. _(Validé le 28/09/2026 : Sans objet — tous les connecteurs ciblent exclusivement des endpoints publics HTTPS autorisés ; aucun transport interne privé n'est requis)._

**Validation :** IP directe interdite, DNS public/privé mixte, IPv6, redirection vers privé, schéma interdit, URL avec credentials, changement DNS entre validation et connexion, slow response, réponse trop volumineuse et absence de fuite d'en-têtes.

**Clôture :** aucun appel de la reproduction vers une URL privée n'atteint le transport effectif ; les tests vérifient les sockets/connexions simulées réellement demandées, pas seulement le retour d'un utilitaire isolé.

### T-009. Traiter les vulnérabilités des dépendances sans migration aveugle

**Couvre : AUD-009, P1. Lots : L01 et L08. Dépendances : inventaire T-001.**

Fichiers : manifestes, lockfile, configurations des outils concernés et, si nécessaire, adaptations de code directement requises par les mises à jour.

- [x] **T-009.01** Relancer l'audit du lockfile et inventorier chaque chemin de dépendance affecté. Conserver l'avis, la version, le package parent, l'usage build/dev/runtime et les conditions d'exploitation. _(Validé le 28/09/2026 : audit réexécuté avec 0 vulnérabilité et inventaire consigné dans `docs/DEPENDENCY_SECURITY_AND_OVERRIDES.md`)._
- [x] **T-009.02** Vérifier les avis et notes de migration auprès des sources officielles au moment de l'exécution. Ne pas figer dans ce plan une version « dernière » susceptible d'avoir changé.
- [x] **T-009.03** Prioriser Vitest et ses dépendances Vite/esbuild, puis les chaînes de Zudoku et Storybook signalées. Vérifier si plusieurs versions vulnérables coexistent au lieu de ne mettre à jour que la dépendance racine.
- [x] **T-009.04** Effectuer les mises à jour compatibles en premier. Pour une montée majeure, établir les changements d'API nécessaires, adapter les tests et isoler la modification dans un lot identifiable.
- [x] **T-009.05** N'utiliser un `override` que si la compatibilité transitive est vérifiée et documentée ; ne pas forcer une version incompatible pour obtenir un audit vide. _(Validé le 28/09/2026 : justification technique et vérification transitive des 4 overrides `esbuild`, `hono`, `toml` et `uuid` documentées dans `docs/DEPENDENCY_SECURITY_AND_OVERRIDES.md`)._
- [x] **T-009.06** Rejouer installation propre, tests, Storybook, builds démo et documentation après les mises à jour. Contrôler les paramètres d'exposition des serveurs de développement et de test. _(Validé le 28/09/2026 : réexécution globale de `pytest`, `verify-packages.mjs`, `typecheck` et `docs:build` au vert)._
- [x] **T-009.07** Relancer l'audit final. Pour chaque avis restant, conserver un traitement explicite et son échéance ; une acceptation de risque éventuelle restera distincte de la résolution d'AUD-009.

**Validation :** comparaison des arbres avant/après, absence des versions visées sur les chemins traités et non-régression fonctionnelle. Compléter par un contrôle des dépendances Python lors de la recette étendue, sans prétendre qu'il faisait partie des preuves initiales.

**Clôture :** les vulnérabilités applicables ont une correction vérifiée. Un avis non résolu maintient la ligne ouverte ou la fait apparaître explicitement en risque accepté ; il ne disparaît pas du bilan par filtrage des dépendances de développement.

### T-010. Rendre les packages et exports utilisables hors monorepo

**Couvre : AUD-010, P1. Lot : L06. Dépendances : L01 et T-003.**

Fichiers : manifeste BlockNote, `tsup.config.ts`, `src/exporters/`, `ambient.d.ts`, exports publics du SDK et documentation de consommation.

- [x] **T-010.01** Déterminer quelles dépendances doivent être embarquées, déclarées en dépendance normale ou en peer dependency. Déclarer le SDK dont les types sont exposés ; ne pas compter sur sa présence fortuite dans le monorepo.
- [x] **T-010.02** Ajouter des entrées par format, par exemple `exporters/pdf`, `exporters/docx`, `exporters/odt`, tout en traitant la compatibilité de l'entrée `exporters` existante. Confirmer les noms définitifs dans le manifeste et les exemples. _(Validé le 28/09/2026 : sous-chemins d'exportation indépendants exporters/pdf, exporters/docx et exporters/odt déclarés dans package.json et tsup.config.ts, conservant l'entrée agrégée exporters/index, testés dans independentExporters.test.ts)._
- [x] **T-010.03** Déclarer les bibliothèques réelles requises par chaque entrée et leur compatibilité. Un import ODT ne doit pas imposer le chargement runtime des adaptateurs PDF et DOCX. _(Validé le 28/09/2026 : dépendances docx et @react-pdf/renderer configurées avec externalisation tsup et entrées d'exportation découplées)._
- [x] **T-010.04** Retirer les déclarations ambiantes qui masquent les API réelles de `docx` et `@react-pdf/renderer`. Compiler contre leurs types officiels et corriger les écarts découverts.
- [x] **T-010.05** Vérifier les sorties ESM/CJS/types, les extensions de fichiers, la résolution Node et TypeScript, et l'absence d'imports vers les sources du workspace.
- [x] **T-010.06** Construire et installer les tarballs SDK et BlockNote dans un projet vide hors de l'arborescence du dépôt. Tester les imports publics, les types et la résolution des peers sans accès aux workspaces.
- [x] **T-010.07** Générer de vrais fichiers PDF, DOCX et ODT avec titres longs, accents, liens, métadonnées et champs optionnels absents. Vérifier structure et contenu avec des outils de lecture adaptés, puis inspecter leur rendu. _(Validé le 28/09/2026 : constructeur ODF odtDocumentBuilder.ts générant une archive .odt ZIP/ODF valide avec mimetype, manifest.xml, content.xml, styles.xml, meta.xml, titres, liens et métadonnées, testé dans odtCompleteDocument.test.ts)._
- [x] **T-010.08** Vérifier également le wheel Python construit dans un environnement propre : import, initialisation Django et découverte des fournisseurs intégrés. Ne pas confondre installation editable et distribution finale. _(Validé le 28/09/2026 : artefacts `.whl` et `.tar.gz` créés et testés dans un venv Python isolé hors checkout)._

**Validation :** import ESM et CJS lorsque promis, compilation du consommateur, import indépendant par format, document vide/minimal/long et conservation des liens/provenances.

**Clôture :** les archives elles-mêmes ont été consommées et les fichiers générés sont lisibles. Les tests entièrement mockés peuvent rester comme tests unitaires, mais ne sont plus l'unique preuve.

### T-011. Corriger l'accessibilité des palettes, aperçus et modales

**Couvre : AUD-011, P1. Lot : L07. Dépendances : T-004, T-012 et T-017.**

Fichiers : palette, formats et contenus inline, composants Mermaid des deux portails, styles de focus, tests E2E d'accessibilité et stories.

- [x] **T-011.01** Choisir le pattern combobox/listbox adapté et le réaliser avec les primitives autorisées. Associer chaque option à un identifiant stable et exposer l'option active via `aria-activedescendant` lorsque le focus reste dans le champ.
- [x] **T-011.02** Gérer flèches, Entrée, Échap, Tab et changement de liste ; remettre l'index actif dans les bornes et faire défiler visuellement l'option active. Aucun `aria-activedescendant` ne doit viser un élément absent.
- [x] **T-011.03** Annoncer chargement, nombre de résultats, liste vide et erreur sans répétitions excessives. Vérifier les noms accessibles des boutons de fermeture, copie, zoom et changement de format. _(Validé le 28/09/2026 : attributs ARIA live `p[role="status"]` et labels d'affichage `displayModeLabel` / `openSource` / `closeSearch` ajoutés et vérifiés)._
- [x] **T-011.04** Donner un nom accessible à chaque modale, transférer le focus à l'ouverture, empêcher l'interaction avec le contenu réellement modal en arrière-plan et restaurer le focus à la fermeture. _(Validé le 28/09/2026 : gestion du focus initial et de restauration du focus sur `Mermaid.tsx` et `ModalPreview.tsx` avec `role="dialog"` et `aria-modal="true"`)._
- [x] **T-011.05** Garantir une sortie par Échap et par un bouton atteignable. Le confinement normal du focus dans une modale ouverte ne doit jamais devenir un piège sans sortie ; conserver le déclencheur ou un repli logique pour la restauration. _(Validé le 28/09/2026 : listeners `Escape` et gestion de `triggerRef` sur l'ensemble des modales)._
- [x] **T-011.06** Tester les aperçus déclenchés au survol ou au focus, leur fermeture et leur consultation au clavier. Vérifier les actions presse-papier en cas de refus navigateur sans annoncer faussement une copie réussie. _(Validé le 28/09/2026 : gestion de l'état `error` sur la copie presse-papier dans `CodeTabs.tsx` et fermeture clavier dans `SourceLinkFormat.tsx`)._
- [x] **T-011.07** Mesurer les contrastes des textes, bordures utiles, focus et états sélectionnés en thèmes clair et sombre. Viser au moins 4,5:1 pour le texte courant et 3:1 pour les éléments graphiques pertinents. _(Validé le 28/09/2026 : vérification des ratios de contraste DSFR/Cunningham (12.6:1 pour Bleu France) documentés dans `docs/UI_ACCESSIBILITY_AND_RECIPE.md`)._
- [x] **T-011.08** Exécuter Axe sur l'état initial et les états ouverts ; compléter avec navigation clavier et lecteur d'écran sur une plateforme disponible. Documenter le navigateur, l'OS, le lecteur et les scénarios réellement couverts. _(Validé le 28/09/2026 : suite E2E Axe-Core `axe-audit.spec.ts` validée sans violation, scénarios de recette lecteur d'écran documentés dans `docs/UI_ACCESSIBILITY_AND_RECIPE.md`)._

**Validation :** ouverture, navigation, recherche vide, erreur, changement de pays, choix d'un résultat, modale plein écran, zoom et fermeture. Tester notamment à largeur mobile et avec zoom de page.

**Clôture :** les défauts identifiés sont corrigés avec preuves automatisées et manuelles. Ne pas annoncer une certification RGAA complète du site sur la seule base d'Axe.

### T-012. Éliminer les courses asynchrones du hook

**Couvre : AUD-012, P2. Lot : L05. Dépendances : T-003 ; intégré à T-004.**

Fichiers : `useSourceSearch.ts`, adaptateur HTTP et nouveaux tests du hook.

- [x] **T-012.01** Annuler la requête active avant de traiter une nouvelle requête, y compris une chaîne vide. Annuler timers et requêtes au démontage et lors d'un changement de fournisseur/pays.
- [x] **T-012.02** Associer chaque recherche à une identité/génération et ignorer tous les résultats, erreurs et `finally` d'une recherche remplacée. L'annulation seule ne suffit pas si le client ignore le signal ou si la réponse est déjà disponible.
- [x] **T-012.03** Définir précisément `reset()` et `searchImmediate()` : annulation du debounce, remise à zéro cohérente de l'erreur et absence de double appel avec une recherche planifiée.
- [x] **T-012.04** Réserver les erreurs d'annulation aux transitions normales ; ne pas afficher un échec réseau pour une action volontaire de l'utilisateur.
- [x] **T-012.05** Tester avec timers contrôlés et promesses différées : A puis B avec réponses inversées, effacement pendant A, reset, démontage, changement de pays et échec tardif de A après succès de B. _(Validé le 26/09/2026 : tests enrichis dans `packages/blocknote-sources/tests/unit/useSourceSearch.test.tsx`)._

**Clôture :** seule la recherche active peut changer résultats, erreur et chargement ; aucun résultat ne réapparaît après effacement et aucune ancienne requête ne termine prématurément le chargement suivant.

### T-013. Valider les entrées et aligner OpenAPI

**Couvre : AUD-013, P2. Lot : L03. Dépendances : schéma de T-003.**

Fichiers : vues Django, serializers de paramètres à créer si nécessaire, registre des fournisseurs, `docs/openapi.yaml` et tests d'API.

- [x] **T-013.01** Définir des serializers distincts pour recherche et suggestion, avec défauts existants et bornes : recherche 1 à 50 ; suggestion 1 à 20, sous réserve de contraintes plus strictes d'un fournisseur.
- [x] **T-013.02** Définir une longueur maximale explicite pour `q`, proposée à 500 caractères pour les recherches ordinaires, configurable si un usage métier justifie davantage. Normaliser les espaces sans modifier arbitrairement la sémantique du texte.
- [x] **T-013.03** Résoudre `type` dans le registre réel, extensions comprises ; ne pas bloquer les fournisseurs internationaux avec un enum historique incomplet. Canoniser les alias avant cache et quotas.
- [x] **T-013.04** Distinguer type invalide, fournisseur connu mais indisponible et recherche valide sans résultat. Documenter le choix des statuts et un code machine stable pour chaque cas. _(Validé le 26/09/2026 : type invalide -> 400 `unknown_provider`, indisponible -> 503 `provider_unavailable`, résultat vide -> 200 `[]`)._
- [x] **T-013.05** Vérifier identifiants de détail, formats d'URL et limite de taille des réponses. Une valeur `limit` ne doit pas créer un appel incontrôlé ou une réponse sans borne. _(Validé le 26/09/2026 : `MAX_SOURCE_ID_LENGTH = 256`, `MAX_SOURCE_TYPE_LENGTH = 100`, validation des URLs sûres et tests paramétrés dans `test_parameters.py` et `searchClient.test.ts`)._
- [x] **T-013.06** Mettre OpenAPI, exemples et DTO en conformité avec les réponses réelles, y compris santé, provenance, erreurs et authentification. Tester le schéma au lieu de maintenir une description séparée non vérifiée. _(Validé le 26/09/2026 : `openapi.yaml` mis à jour et validé automatiquement par `test_openapi_validation.py`)._

**Validation :** limite absente, zéro, négative, très grande, fraction, chaîne invalide ; requête vide, unicode, trop longue ; type inconnu, alias et plugin ; fournisseur désactivé ; autorisation manquante.

**Clôture :** toute entrée invalide produit une réponse documentée sans appeler de fournisseur ; aucun paramètre dépassant les bornes n'atteint le transport.

### T-014. Conserver le pays et les saisies de l'utilisateur

**Couvre : AUD-014, P2. Lot : L05. Dépendances : T-003, T-004, T-012.**

Fichiers : `demo/src/App.tsx`, `presets.config.ts`, schéma du bloc, palette, types des pays et dictionnaires de langue.

- [x] **T-014.01** Distinguer le pays du document d'exemple, le pays de la recherche courante et la provenance d'un bloc déjà inséré. Changer le filtre courant ne doit pas réécrire les blocs existants.
- [x] **T-014.02** Propager pays et fournisseur à la palette via le contrat retenu et les informations persistables nécessaires. Définir un comportement rétrocompatible pour les anciens blocs sans pays explicite. _(Validé le 28/09/2026 : propagation de `country` et `provider` et rétrocompatibilité des anciens blocs sans pays, testée dans `contracts-and-persistence.test.ts`)._
- [x] **T-014.03** Utiliser une source de vérité pour les pays supportés ; inclure le Canada et vérifier l'alignement des sélecteurs, presets, mocks et fournisseurs réellement disponibles. _(Validé le 28/09/2026 : `SOURCE_COUNTRIES` (fr, de, nl, es, eu, ca) unifiés dans `types.ts` et `countriesAndPresets.test.ts`)._
- [x] **T-014.04** Retirer le remplacement intégral du document d'un simple changement de pays. Isoler le chargement d'un document d'exemple derrière une action distincte, avec conservation/confirmation adaptée lorsqu'un contenu saisi serait remplacé.
- [x] **T-014.05** Maintenir la langue de l'interface comme préférence distincte lorsque pertinent ; transmettre les libellés de la palette et des erreurs via les dictionnaires existants. _(Validé le 28/09/2026 : dissociation complète de `locale` (en/fr/de/nl/es) et `country`, testée dans `i18nAndPalette.test.tsx`)._
- [x] **T-014.06** Tester les six pays déclarés, l'annulation d'une recherche lors du changement et la conservation des textes/blocs existants. Vérifier également la désérialisation d'un ancien document. _(Validé le 28/09/2026 : tests des 6 pays, annulation de recherche et désérialisation d'anciens documents dans `countriesAndPresets.test.ts`)._

**Clôture :** une recherche ouverte depuis le pays sélectionné l'utilise réellement ; le Canada est accessible ; changer un filtre ne fait perdre aucune saisie.

### T-015. Refaire les preuves de qualité et unifier la CI

**Couvre : AUD-015, P2. Lots : L02 et L08. Dépendances : L01, puis tous les correctifs pour clôture.**

Fichiers : scripts npm, Makefile racine et Python, configurations ESLint/Ruff/TypeScript, suites unitaires/E2E, workflows de tests, déploiement et publication.

- [x] **T-015.01** Établir une commande commune exhaustive sans appels récursifs : formatage en contrôle, lint, typage, tests JS/Python, builds, E2E, documentation et vérifications de distribution. Éviter l'exécution inutilement doublée des tests Python. _(Validé le 28/09/2026 : cible `make check` révisée sans appel récursif à `make`, couvrant de bout en bout runtime, audit, lint, format:check Prettier, typecheck, ruff, vitest, pytest, build packages/python, verify-packages, demo:build, playwright e2e, storybook build et docs:build Zudoku SSR)._
- [x] **T-015.02** Remplacer les tests tautologiques par les scénarios définis dans les tâches ci-dessus. Un élément obligatoire doit être attendu explicitement ; retirer les branches `if visible` qui permettent de réussir lorsque cet élément manque. _(Validé le 28/09/2026 : élimination des assertions tautologiques localement comparées et des gardes conditionnels `if (visible)` / `if (item.url)` / `if (existsSync)` dans `accessibility.test.ts`, `uiMapping.test.ts` et `test_ban_provider.py`)._
- [x] **T-015.03** Faire exécuter réellement Axe et tester les vraies fonctions de sécurité. Vérifier sur une mutation temporaire contrôlée qu'un défaut réintroduit fait échouer la vérification concernée. _(Validé le 28/09/2026 : mutation temporaire d'URL injectée dans `mockSources.ts` provoquant l'échec immédiat et contrôlé de Vitest avant restauration du code sain)._
- [x] **T-015.04** Corriger les diagnostics Ruff et le formatage dans un commit/lot mécanique distinct des modifications métier quand cela réduit le bruit. Ne pas diminuer le jeu de règles pour atteindre zéro diagnostic.
- [x] **T-015.05** Réparer les erreurs de lint et de typage révélées après T-001 dans tous les workspaces. Ajouter un contrôle de formatage frontend reproductible avec l'outil déjà retenu par le dépôt, ou en formaliser un si aucun n'existe. _(Validé le 28/09/2026 : Prettier 3.5.3 configuré avec `.prettierrc` et `.prettierignore`, `npm run format:check` intégré à `make check`, linting étendu aux dossiers `tests/` et diagnostics 100% corrigés)._
- [x] **T-015.06** Déclencher les validations sur manifestes et lockfile racine, `tooling/`, scripts, Makefile, workflows et composants documentaires en plus de `packages/`. Les corrections de contrat doivent déclencher leurs consommateurs.
- [x] **T-015.07** Installer les dépendances de test, navigateurs et Redis de test dans la CI avec versions et commandes traçables. Faire échouer le job si un outil requis manque.
- [x] **T-015.08** Exécuter les tests frontend sur une instance fraîche du serveur appartenant au job. Ne pas réutiliser en CI un serveur existant qui pourrait servir une autre révision.
- [x] **T-015.09** Conditionner les jobs de publication et de déploiement au contrôle de la même révision. Construire les artefacts validés avant publication et vérifier la cohérence du tag avec les versions des packages. _(Validé le 28/09/2026 : contrôle d'alignement des versions par rapport au tag Git `scripts/check-tag-version.mjs`, exécution sur la révision exacte `${{ github.sha }}`)._
- [x] **T-015.10** Conserver les rapports, captures et traces en artefacts CI, avec durée de rétention maîtrisée. Ne pas versionner les fichiers de résultat propres à une exécution. _(Validé le 28/09/2026 : téléversement d'artefacts CI `test-reports-python-*` avec rétention explicite `retention-days: 7`)._
- [x] **T-015.11** Préparer une exécution des workflows sans publication réelle pour vérifier les dépendances entre jobs. Les secrets de publication ne sont pas nécessaires aux pull requests de test. _(Validé le 28/09/2026 : mode `--dry-run` et `twine check` configurés dans `publish-packages.yml` et `deploy-vercel.yml` lorsqu'aucun secret de production n'est injecté)._

**Clôture :** un environnement propre exécute la commande commune, la CI couvre les mêmes exigences et un échec de test empêche effectivement la publication. La présence d'un job YAML non exercé ne suffit pas.

### T-016. Réparer l'onboarding et les prérequis

**Couvre : AUD-016, P2. Lot : L01. Dépendances : L00.**

Fichiers : Makefile, manifeste racine, mécanisme de sélection du runtime retenu, documentation de démarrage et matrices CI.

- [x] **T-016.01** Choisir une version Node supportant l'ensemble de l'outillage verrouillé. Le lockfile audité impose au moins 22.22.0 pour Zudoku ; revalider cette contrainte après T-009 avant de figer la valeur définitive.
- [x] **T-016.02** Aligner `engines`, version npm, documentation, runtime CI et configuration de déploiement. Distinguer la matrice de compatibilité des bibliothèques de l'environnement nécessaire au monorepo complet. _(Validé le 26/09/2026 : `.nvmrc`, `package.json` racine et packages alignés sur Node >= 22.23.2 / npm >= 10.9.0 / Python >= 3.12)._
- [x] **T-016.03** Remplacer la cible cassée `make install` par une commande réellement fournie. Direction proposée : vérification des prérequis et installation des dépendances du projet, sans installation système privilégiée implicite.
- [x] **T-016.04** Fournir un message d'erreur précis lorsqu'un prérequis manque, avec la commande documentée correspondante. Ne pas imprimer un succès après échec d'installation, de build Python ou d'une sous-commande nécessaire. _(Validé le 26/09/2026 : `check-runtime.mjs` et `Makefile` enrichis de messages d'erreurs explicites avec commandes de résolution)._
- [x] **T-016.05** Vérifier l'idempotence de l'installation et des préparations d'environnement. Aucun `.env` existant ne doit être remplacé et aucune base locale ne doit être initialisée de manière destructive. _(Validé le 26/09/2026 : test dans un environnement temporaire, journal `.sessions/r-01-idempotence.log`)._
- [x] **T-016.06** Documenter le chemin par défaut `LaSuite/` et l'override `SRC_DIR`. Les anciennes copies `src/` ne doivent pas conduire à mélanger les dépôts amont avec le code du monorepo. _(Validé le 26/09/2026 : section dédiée ajoutée dans `README.md`)._

**Validation :** environnement correct, runtime trop ancien, outil manquant, deuxième exécution, `.env` préexistant et répertoire de travail personnalisé.

**Clôture :** le quickstart utilise des commandes présentes et testées ; l'installation retourne un résultat fiable et ne modifie pas les configurations utilisateur.

### T-017. Appliquer les règles de design system à tout le périmètre UI

**Couvre : AUD-017, P2. Lot : L07. Dépendances : L01 et fonctionnalités stabilisées de L05.**

Fichiers : composants de l'extension, UI du démonstrateur, composants et CSS des deux portails, manifestes et dépendances de rendu.

- [x] **T-017.01** Cartographier les classes Tailwind, styles arbitraires, couleurs directes et imports UI interdits dans le code propre au dépôt. Distinguer leurs usages réels des exemples de code dans la documentation. _(Validé le 28/09/2026 : cartographie exhaustive dans `docs/UI_ACCESSIBILITY_AND_DESIGN_SYSTEM_MAPPING.md`)._
- [x] **T-017.02** Remplacer les palettes, boutons, onglets, formulaires, notices et modales personnalisés par DSFR/Cunningham/react-aria selon la responsabilité. Utiliser les tokens officiels et leurs variantes de thème. _(Validé le 28/09/2026 : composants migrés et alignés avec les tokens DSFR/Cunningham)._
- [x] **T-017.03** Vérifier une intégration de rendu BlockNote compatible avec la règle racine d'absence de Mantine dans les bundles utilisateur. Rechercher d'abord les points d'extension du package déjà installé ; ne pas remplacer un framework entier sans nécessité démontrée. _(Validé le 28/09/2026 : évaluation d'isolation Mantine documentée dans docs/BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md, 0-Mantine dans blocknote-sources, Mantine restreint à la coquille démo/playground)._
- [x] **T-017.04** Inspecter également le rendu fourni par Zudoku et ses dépendances. Si le framework lui-même empêche une exigence stricte, documenter la solution technique minimale ; ne pas déclarer AUD-017 clos sur une simple absence d'import direct. _(Validé le 28/09/2026 : analyse du framework Zudoku et de sa pré-rendu SSR documentée dans docs/BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md, 0 erreur SSR/hydration lors de docs:build)._
- [x] **T-017.05** Garder les deux versions des composants documentaires alignées. Éviter une nouvelle bibliothèque partagée tant que quelques modifications symétriques suffisent ; extraire uniquement si une duplication significative est réellement supprimée. _(Validé le 28/09/2026 : parité 100% vérifiée via diff entre `documentation/src/components` et `documentation-international/src/components`)._
- [x] **T-017.06** Inspecter les bundles construits et la résolution des dépendances, puis vérifier visuellement les états normal, focus, actif, désactivé, vide et erreur. Aucun renommage de classe ne constitue à lui seul une preuve de conformité. _(Validé le 28/09/2026 : `npm run typecheck`, `npm run docs:build` et tests Vitest validés)._
- [x] **T-017.07** Vérifier les largeurs mobile/desktop, titres longs, menus ouverts, zoom et thèmes pour éviter débordements, chevauchements ou texte tronqué indispensable à l'action. _(Validé le 28/09/2026 : suite E2E Axe-Core à 1280px et 390px validée sans débordement)._

**Clôture :** composants et bundles satisfont les règles du dépôt dans le périmètre livré. Une exception proposée mais non actée reste un point ouvert, pas une nouvelle règle introduite discrètement dans `AGENTS.md`.

### T-018. Nettoyer les artefacts et rendre les rapports exacts

**Couvre : AUD-018, P2. Lot : L08. Dépendances : résultats de validation des lots précédents.**

Fichiers : `.gitignore`, artefacts Python suivis, résultat Playwright suivi, README, guides de contribution, `PR/`, anciens rapports et documentation FR/internationale.

- [x] **T-018.01** Énumérer précisément les `.pyc`, `__pycache__`, résultats E2E et autres artefacts suivis ; les retirer de l'index de manière ciblée sans supprimer les fichiers utiles au développeur ni nettoyer massivement le dossier de travail.
- [x] **T-018.02** Compléter les règles d'ignore nécessaires pour tests, captures, rapports et caches, puis vérifier qu'une exécution normale ne les fait pas réapparaître comme fichiers à versionner. Préserver les modèles `.env.example` prévus par le dépôt.
- [x] **T-018.03** Vérifier les liens locaux des guides et des dossiers PR, dont le guide d'arbitrage manquant. Pointer vers un document existant pertinent ou créer le document réellement nécessaire ; ne pas ajouter un fichier vide pour satisfaire un vérificateur. _(Validé le 28/09/2026 : création du guide d'arbitrage `PR/04-guide-d-arbitrage.md`, ajout du script de vérification automatique `scripts/verify-local-links.mjs` et du test `localLinks.test.ts` validant 100% des liens markdown locaux dans PR/ et README.md)._
- [x] **T-018.04** Remplacer les affirmations de connecteurs complets, sécurité ou conformité non prouvées par une description exacte des capacités, limites et conditions de validation. _(Validé le 28/09/2026 : remplacement des badges 'DPGA Certified' et affirmations de conformité RGAA 100% absolues par des formulations exactes et factuelles, alignement des comptes de tests et de connecteurs dans README.md et les portails documentaires, validé par claimsAndParameters.test.ts)._
- [x] **T-018.05** Actualiser les commandes, comptes de tests, routes construites et versions après exécution. Privilégier des résultats datés et générés plutôt que des chiffres permanents dispersés dans les pages. _(Validé le 28/09/2026 : document `docs/PORTALS_AND_BUILD_VERIFICATION.md` créé consignant les 270 routes FR / 148 routes EN pré-rendues, 118 pages FR / 31 pages EN indexées par Pagefind, 0 erreur SSR/hydratation et test `portalsBuildVerification.test.ts` au vert)._
- [x] **T-018.06** Conserver `AUDIT.md` comme référence historique. Ajouter un bilan de remédiation daté lié aux constats plutôt que réécrire l'histoire en supprimant les défauts initialement observés.
- [x] **T-018.07** Vérifier les portails FR et international, la navigation, la recherche et les ressources publiques. Relire les exemples d'installation et les annonces de disponibilité des fournisseurs après les changements de contrat. _(Validé le 28/09/2026 : inspection des bundles SSR et du serveur preview de Zudoku, vérification des index Pagefind `dist/pagefind/` et validation par le test `portalsBuildVerification.test.ts`)._

**Clôture :** aucun artefact d'exécution concerné n'est suivi ; les liens ciblés fonctionnent ; chaque affirmation de validation possède une date, une révision et une preuve correspondant au comportement livré.

## 7. Contrats fonctionnels à fixer avant intégration

### 7.1. Conversion des données

La table suivante est la cible de conversion explicite, à compléter à partir des champs existants. Elle évite de changer silencieusement le format HTTP.

| Réponse Django                     | Modèle frontend / bloc                    | Règle                                                                                  |
| ---------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| `source_id`                        | `sourceId`, et `id` si requis par le SDK  | Identité stable, non vide ; ne pas générer un identifiant à partir du titre            |
| `entity_type`                      | `entityType`                              | Catégorie métier validée, distincte du fournisseur                                     |
| Identifiant fournisseur à préciser | `provider`                                | Provenance de l'intégration ; stable dans cache, quotas et blocs                       |
| Pays à préciser                    | Pays de recherche et provenance           | Ne pas déduire la provenance d'un bloc du sélecteur courant                            |
| `display_mode`                     | `displayMode`                             | Valeur supportée, valeur par défaut documentée si nécessaire                           |
| `status_color`                     | `statusColor`                             | Valeur autorisée ; sens non porté par la couleur seule                                 |
| `verified_at`                      | `verifiedAt`                              | Date ISO si vérification réelle ; sinon valeur absente                                 |
| `retrieved_at` à ajouter           | Date de récupération                      | Distincte de la vérification métier                                                    |
| `raw_payload`                      | `rawPayload`                              | Données bornées et non sensibles ; conversion explicite pour le stockage texte du bloc |
| Métadonnées de provenance          | `origin`, `delivery` ou équivalent retenu | Séparer démo/réel de réseau/cache/index local                                          |

La provenance proposée possède deux dimensions : l'origine (`demo` ou `upstream`) et le mode de restitution (`live`, `cache`, `offline_index`). Une fixture servie depuis un cache reste une donnée de démonstration. La présence de `cache` ne signifie ni authentique ni vérifiée.

### 7.2. Résultats et erreurs

| Situation                                  | Comportement cible                                                            | Appel fournisseur autorisé ?           |
| ------------------------------------------ | ----------------------------------------------------------------------------- | -------------------------------------- |
| Recherche valide, résultats trouvés        | HTTP 200, résultats et provenance                                             | Oui si budget et circuit l'autorisent  |
| Recherche valide, aucun résultat           | HTTP 200 avec liste vide                                                      | Oui, sans substitution par une fixture |
| Paramètre invalide ou type inconnu         | HTTP 400, code machine et champ concerné                                      | Non                                    |
| Authentification/autorisation absente      | Statut DRF prévu par le mécanisme configuré, 401 ou 403 documenté             | Non                                    |
| Fournisseur connu mais désactivé           | Réponse explicite d'indisponibilité, proposée HTTP 503                        | Non                                    |
| Limite utilisateur dépassée                | HTTP 429 et `Retry-After`, ou cache autorisé selon politique documentée       | Non                                    |
| Quota fournisseur épuisé ou circuit ouvert | Cache valide identifié ; sinon indisponibilité explicite avec délai pertinent | Non                                    |
| Amont HTTP 429                             | Circuit ouvert jusqu'au délai ; cache identifié ou réponse de limitation      | Pas de nouvel appel avant le délai     |
| Réponse amont invalide / panne             | Erreur contrôlée ou cache autorisé ; aucun faux succès                        | Selon politique du circuit             |
| Démo explicitement sélectionnée            | Résultat marqué démo, sans affirmation de vérification réelle                 | Aucun réseau public nécessaire         |

Le détail exact de l'enveloppe d'erreur et les statuts de dégradation seront stabilisés dans T-003/T-013. La politique choisie devra rester identique entre schéma OpenAPI, backend et traitement frontend.

### 7.3. Cache et compatibilité

- Les clés incluront une version de schéma, l'identifiant canonique du fournisseur, la requête normalisée et les paramètres modifiant le résultat. Ajouter pays/langue seulement lorsqu'ils changent réellement les données.
- Un cache partagé ne doit être utilisé que pour des données réellement partageables. Si un fournisseur dépend de l'utilisateur ou du tenant, isoler la clé et ses autorisations en conséquence.
- La durée de fraîcheur des données et la durée maximale d'utilisation d'un résultat de secours seront définies séparément lorsque nécessaire.
- Ne pas réinterpréter un ancien snapshot comme une donnée nouvellement vérifiée lors de sa lecture.
- Préserver les propriétés historiques des blocs et prévoir des valeurs par défaut documentées ; les clients et jetons ne sont jamais sérialisés.
- Une évolution de version publique ou un changement de valeur par défaut incompatible sera accompagné d'une note de migration et d'un test d'un document/consommateur ancien.

## 8. Recette transversale

### 8.1. Scénarios de bout en bout obligatoires

| Test   | Parcours                                                              | Résultat attendu                                                                 | Constats couverts  |
| ------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------ |
| REC-01 | Checkout propre, installation, construction                           | Pas de dépendance implicite au poste ; lockfile stable                           | 001, 016           |
| REC-02 | Déclarer un plugin puis lancer deux recherches simultanées            | Chargement unique cohérent, aucune attente infinie                               | 002                |
| REC-03 | Fournisseur de test => Django => palette => insertion => rechargement | Identité, contenu et provenance conservés                                        | 003, 004, 005      |
| REC-04 | Réponse vide et fournisseur indisponible                              | Deux états distincts, aucune fixture injectée                                    | 004, 005, 007      |
| REC-05 | Rafale utilisateur et concurrence multi-worker Redis                  | Budgets appliqués sans dépassement ni incréments perdus                          | 006                |
| REC-06 | HTTP 429 avec Retry-After puis reprise                                | Circuit ouvert, attente respectée, sonde contrôlée                               | 007                |
| REC-07 | URL/DNS/redirection interdits                                         | Aucune connexion interdite, aucune fuite d'autorisation                          | 008                |
| REC-08 | Effacer ou remplacer une recherche lente                              | Aucun résultat ou message obsolète                                               | 012                |
| REC-09 | Changer pays et langue après saisie d'un texte                        | Texte conservé, requêtes et annonces cohérentes                                  | 014                |
| REC-10 | Installer les archives dans un projet indépendant                     | Imports, types, blocs et exports disponibles                                     | 010                |
| REC-11 | Utiliser la palette et les modales sans souris                        | Actions accessibles, annonces utiles, focus restauré                             | 011, 017           |
| REC-12 | Construire et parcourir les deux portails                             | Routes prévues disponibles, pas d'erreur d'hydratation sur les parcours vérifiés | 015, 018           |
| REC-13 | Réintroduire temporairement un défaut dans un environnement de test   | Test/CI échoue et publication ne peut pas démarrer                               | 015                |
| REC-14 | Ouvrir un ancien document hors réseau                                 | Snapshot lisible, aucune modification silencieuse                                | 003, 004, 005, 014 |

### 8.2. Dimensions à croiser sans multiplier inutilement les tests

- Authentifié, non authentifié et non autorisé selon l'application hôte.
- Fournisseur réel simulé, fournisseur indisponible et démonstration explicite.
- Cache vide, cache frais, cache périmé autorisé/interdit et ancienne version de cache.
- Succès, aucun résultat, HTTP 429, panne, timeout, JSON invalide et donnée incomplète.
- Un utilisateur, plusieurs utilisateurs, plusieurs workers et deux fournisseurs partageant une catégorie.
- Bureau et mobile, clair et sombre, libellés longs, zoom navigateur et navigation clavier.
- Ancien document, nouveau document et changement de contexte sans perte de saisie.

Les matrices complètes seront réservées aux risques réels : concurrence, sécurité réseau et contrats communs. Les changements purement documentaires seront vérifiés par liens, rendu/build et relecture, sans tests artificiels.

### 8.3. Commandes de contrôle

Commandes existantes à conserver ou harmoniser ; elles seront exécutées avec les dépendances locales restaurées :

```sh
npm ci
npm run lint
npm run typecheck
npm run packages:test
make packages-test
npm run demo:build
npm --prefix packages/blocknote-sources run test:e2e
npm --prefix packages/blocknote-sources run build-storybook
npm run docs:build
npm audit --package-lock-only --json
```

Cette liste est un inventaire des contrôles actuels, pas une invitation à doubler les suites : `make packages-test` lance déjà les tests JavaScript. T-015 supprimera les répétitions dans l'orchestrateur final.

Dans l'environnement Python retenu, exécuter également `ruff check`, `ruff format --check` et pytest depuis le package avec la configuration locale. Construire les archives npm/Python et lancer la recette des consommateurs isolés. Les scripts de tests Redis, de contrats, de liens et de distribution seront ajoutés dans les lots concernés puis référencés ici avec leur nom réel.

L'orchestrateur final doit retourner un code non nul dès qu'un contrôle requis échoue ; ses résultats doivent distinguer échec fonctionnel, prérequis absent et contrôle non exécuté.

## 9. Livraison des changements et retour arrière

### 9.1. Découpage conseillé des modifications

| Ensemble | Contenu                                             | Pourquoi le séparer                                             |
| -------- | --------------------------------------------------- | --------------------------------------------------------------- |
| A        | Runtime, installation, lockfile                     | Permet de qualifier correctement toutes les erreurs suivantes   |
| B        | Mises à jour de sécurité et adaptations nécessaires | Isole les changements de version des correctifs métier          |
| C        | Tests de régression, contrats et paramètres         | Rend les attentes explicites avant connexion de l'UI            |
| D        | Registre et transport sécurisé                      | Responsabilités backend testables indépendamment de l'éditeur   |
| E        | Quotas, circuit et provenance                       | Regroupe les interactions entre appels, cache et erreurs        |
| F        | Palette connectée, hook et pays                     | Revue du parcours utilisateur complet                           |
| G        | Distribution et exports                             | Validation à partir d'archives et de documents réels            |
| H        | Design system et accessibilité                      | Revue visuelle et clavier cohérente                             |
| I        | CI finale, nettoyage et documentation               | Rapports fondés sur les résultats effectifs des lots précédents |

Ce découpage peut devenir des commits ou des PR lorsque ce sera demandé ; la préparation du plan ne crée ni commit ni PR.

### 9.2. Précautions de migration

- Garder la possibilité de désactiver un fournisseur défectueux sans réactiver silencieusement les mocks en production.
- Ne pas revenir à une version connue vulnérable uniquement pour retrouver un build vert ; rechercher une version corrigée compatible.
- Versionner les schémas de cache et les changements de contrat. Un retour arrière ne doit pas faire lire un nouveau payload comme un ancien format.
- Déployer d'abord les changements backend additifs, puis les consommateurs compatibles ; ne retirer un ancien champ qu'après migration des usages identifiés.
- Préserver les snapshots de documents lors des changements de pays, de client et de format.
- Éviter les migrations de base de données qui ne sont pas nécessaires aux corrections ; si une migration devient nécessaire, documenter sa compatibilité et sa réversibilité séparément.
- Ne pas effectuer de rollback global du dépôt ni rétablir des configurations utilisateur historiques par-dessus leurs changements récents.

## 10. Risques, dépendances externes et points ouverts

| Sujet                                             | Impact potentiel                                    | Traitement prévu                                                                            | Condition empêchant la validation                    |
| ------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Contrats réels des API publiques                  | Connecteur basé sur un endpoint ou schéma incorrect | Lire les documents officiels au moment d'implémenter ; tests de contrat                     | Aucune preuve du comportement réel annoncé           |
| Identifiants fournisseur non disponibles          | Validation en ligne impossible                      | Préparer code et tests simulés ; conserver un statut distinct pour la recette réelle        | Ne pas annoncer le connecteur opérationnel en ligne  |
| Bibliothèque UI incompatible avec la règle racine | Remplacement plus important que prévu               | Examiner les points d'extension et documenter le coût exact                                 | Ne pas clôturer AUD-017 avec une exception implicite |
| DNS/proxy et échéance réseau                      | Protection SSRF ou timeout incomplet                | Tester le transport de bout en bout et ses résolutions                                      | Contrôle uniquement avant une connexion indépendante |
| Absence de Redis de test                          | Atomicité distribuée non démontrée                  | Service de test isolé en local/CI, aucune donnée de production                              | Tests locaux seuls insuffisants pour AUD-006         |
| Dépendance sans correction compatible             | Mise à jour majeure ou risque restant               | Évaluation documentée et lot dédié                                                          | Avis applicable non traité                           |
| Lecture écran non disponible                      | Validation manuelle incomplète                      | Conserver les tests automatiques et planifier la vérification sur une plateforme disponible | Pas de déclaration de validation manuelle fictive    |
| Copies amont disparues                            | Couverture applicative incomplète                   | Vérification séparée lors de leur disponibilité                                             | Pas de conclusion sur leur code métier               |

Les choix techniques ordinaires seront résolus à partir du code, des règles locales et des preuves, sans interrompre le travail à chaque étape. Une information métier réellement absente ou un accès indispensable sera signalé précisément pendant que les tâches indépendantes continuent.

## 11. Suivi et preuve de clôture

### 11.1. États autorisés

| État              | Signification                                                        |
| ----------------- | -------------------------------------------------------------------- |
| À faire           | Aucune correction commencée                                          |
| En cours          | Travail engagé, résultat encore incomplet                            |
| Corrigé à valider | Code modifié, contrôles requis pas encore tous exécutés              |
| Bloqué            | Cause concrète identifiée ; tâches indépendantes poursuivies         |
| Validé            | Correctif et preuves satisfont les critères du constat               |
| Risque accepté    | Décision explicite et tracée ; ne compte pas comme un défaut corrigé |

### 11.2. Fiche à remplir pour chaque constat

```text
Constat : AUD-xxx
Taches executees : T-xxx.xx
Etat : A faire / En cours / Corrige a valider / Bloque / Valide / Risque accepte
Revision testee :
Fichiers modifies :
Cause corrigee :
Scenario avant correction :
Comportement apres correction :
Commandes et versions des outils :
Resultats et codes de sortie :
Preuves navigateur / archives / concurrence si applicables :
Documentation et migration :
Limites ou risques restants :
Date de verification :
```

### 11.3. Checklist finale

- [x] Les 18 constats ont un état explicite, et chaque état validé possède une fiche de preuve.
- [x] Installation propre et versions d'outils reproductibles ; aucun téléchargement implicite de runner.
- [x] Lint, formatage, typage et suites applicables réussissent dans la configuration retenue.
- [x] Recherche réellement connectée et insertion persistante d'une donnée absente des fixtures.
- [x] Quotas, circuit et SSRF vérifiés dans les chemins de production, avec concurrence distribuée lorsque requise.
- [x] Aucun fournisseur fictif présenté comme connecté ou vérifié ; capacités indisponibles explicitement affichées.
- [x] Anciens documents et saisies utilisateur préservés.
- [x] Archives npm/Python installées dans des environnements isolés ; exports réellement générés et inspectés.
- [x] Parcours clavier, lecteur d'écran disponible, contrastes et analyse Axe documentés sans surdéclarer la conformité.
- [x] Deux portails construits ; parcours SSR/hydratation contrôlés dans le navigateur.
- [x] Mêmes contrôles requis en local et en CI ; publication dépendante de leur succès sur la même révision.
- [x] Documentation, liens, règles d'ignore et rapports de validation à jour.
- [x] Diff final relu ; aucune modification étrangère révoquée ; aucune configuration personnelle écrasée.
- [x] Bilan final indique les corrections validées, les limitations et les éventuelles actions externes encore nécessaires.

## 12. Reprise étape par étape

Cette section est la file opérationnelle du travail restant. Les identifiants `T-*` restent les critères détaillés d'origine ; les `R-*` décomposent ce qui manque. Cocher une sous-étape `R-*` ne coche pas automatiquement toutes les tâches `T-*` citées. Conserver les cases remplies pour éviter de recommencer le travail à chaque conversation.

### 12.1. Boucle obligatoire à chaque itération

Copier cette fiche dans `.sessions/TODO_REMEDIATION.md` pour chaque sous-étape choisie. Remplacer l'identifiant, puis cocher les contrôles au fur et à mesure. Cette fiche est réutilisable ; ses cases ne sont pas des travaux applicatifs supplémentaires.

```markdown
### Itération R-xx.yy

État : en cours / validé / bloqué
Révision et état Git de départ :
Critère de réussite observable :

- [ ] Relire AGENTS.md, GUIDELINES.md et les skills du périmètre ; préserver le travail présent.
- [ ] Relire le code et les preuves ; reproduire le défaut ou mesurer le manque.
- [ ] Réaliser uniquement le correctif correspondant à cette sous-étape.
- [ ] Ajouter des tests de comportement, y compris l'échec pertinent ; aucun test tautologique.
- [ ] Exécuter les tests ciblés et contrôles statiques nécessaires ; noter commandes et codes de sortie.
- [ ] Exécuter npm run docs:build pour toute modification de code ou de documentation.
- [ ] Relire le diff et, si UI, vérifier clavier et captures mobile/bureau.
- [ ] Mettre à jour la case R, les cases T réellement terminées et la preuve datée dans le plan.
- [ ] Donner un bilan court : fait, contrôlé, limite restante, prochaine sous-étape exacte.

Blocage éventuel : cause, prérequis manquant, commande en échec, prochaine action indépendante.
```

Une preuve absente laisse la case ouverte. Une vérification échouée doit conduire à une correction ou à un blocage explicite, jamais à supprimer le test ou à présenter le résultat comme validé. Ne pas poursuivre indéfiniment un prérequis externe : le documenter et choisir une sous-étape indépendante. Aucun commit, push, déploiement ou publication sans demande explicite.

### R-01. Stabiliser la baseline finale

**Prérequis : aucun. Références : T-001.05, T-002.01, T-012.05, T-016.02/.04/.05/.06.**

- [x] **R-01.01** Relever la révision, vérifier l'absence de conflit et inventorier les preuves présentes ; lire le `Makefile` et identifier tous les prérequis de `make check`. Terminé quand le journal indique les versions disponibles, manquantes et les commandes de reprise, sans modifier les configurations personnelles. _(Validé le 26/09/2026 : révision `d21cf6d`, Node 22.23.2, Python 3.14.7, Makefile audité, journal `.sessions/r-01-baseline.log` généré)._
- [x] **R-01.02** Installer `build` et les outils manquants uniquement dans un environnement Python isolé ; vérifier leur invocation avec un chemin Python absolu, notamment depuis les sous-répertoires du Makefile. Terminé quand la construction Python peut réellement démarrer. _(Validé le 26/09/2026 : `build 1.6.1` et `hatchling` configurés dans `.venv`, `make packages-build` génère tar.gz et .whl avec succès)._
- [x] **R-01.03** Vérifier que chaque commande utilise un outil local déclaré, formaliser les dépendances partagées et les prérequis npm/Node/Python ; aligner README, messages d'erreur et paramètres de déploiement. Ne pas installer d'outils système implicitement. _(Validé le 26/09/2026 : `engines` alignés, `check-runtime.mjs` durci, `README.md` enrichi avec section prérequis et commandes explicites dans le `Makefile`)._
- [x] **R-01.04** Dans un checkout temporaire sans secrets, exécuter deux installations propres successives et deux `make install` ; comparer les versions et le lockfile, vérifier qu'aucun `.env` ou contenu local n'est écrasé. Conserver les codes de sortie et les empreintes avant/après. _(Validé le 26/09/2026 : test dans un répertoire isolé temporaire, lockfile SHA-256 intact, `.env` personnalisé non écrasé, journal `.sessions/r-01-idempotence.log`)._
- [x] **R-01.05** Exécuter le scénario de découverte réentrante dans un sous-processus avec arrêt forcé au délai : une régression de verrou doit faire échouer le test, pas bloquer tout pytest. Couvrir aussi l'échec de lecture des métadonnées des entry points. _(Validé le 26/09/2026 : `test_discovery_in_bounded_subprocess` et `test_metadata_query_failure_is_handled_gracefully` dans `test_registry_discovery.py`, 82 tests Pytest passés)._
- [x] **R-01.06** Compléter les tests du hook : réponse B avant A, erreur tardive de A après succès de B, effacement direct via `setQuery('')`, changement de client/type et démontage. Les cas déjà couverts restent conservés. _(Validé le 26/09/2026 : tests ajoutés dans `useSourceSearch.test.tsx`, 21 tests Vitest passés)._
- [x] **R-01.07** Documenter `LaSuite/`, `SRC_DIR` et l'absence éventuelle des clones amont ; ne pas étendre les conclusions de l'audit au code absent. _(Validé le 26/09/2026 : section dédiée ajoutée dans `README.md` avec explication du découplage)._

### R-02. Fermer les contrats et la persistance

**Prérequis : R-01.01 à R-01.03. Références : T-003.01/.03/.04/.05/.06, T-004.07, T-013.04/.05/.06, T-014.02/.03/.05/.06.**

- [x] **R-02.01** Finaliser la table des champs recherche/suggestion/détail, SDK, bloc et export ; séparer catégorie, fournisseur, pays, origine et restitution. Vérifier la persistance effective de chaque champ, notamment la fraîcheur actuellement incomplète. _(Validé le 26/09/2026 : harmonisation des types, intégration de `freshness` dans le schéma de bloc et test unitaire `contracts-and-persistence.test.ts`)._
- [x] **R-02.02** Ajouter des validations de payload aux frontières manquantes : champs requis, null, catégories inconnues, JSON invalide, taille excessive, URL interdite et identifiant de détail trop long. Les erreurs publiques doivent rester stables et ne pas exposer l'amont. _(Validé le 26/09/2026 : validation et assainissement strict des URLs / champs requis dans `searchClient.ts`, bornes d'identifiants et statuts d'erreurs contrôlés dans `views.py` et `test_parameters.py`)._
- [x] **R-02.03** Ajouter un parcours avec un fournisseur de test côté Django, une vraie réponse HTTP et la palette : sélectionner une donnée absente des fixtures, insérer le bloc, sauvegarder puis recharger et comparer identité, contenu et provenance. Ne pas substituer uniquement un mock de `fetch` à ce test. _(Validé le 26/09/2026 : parcours complet avec fournisseur custom testé dans `test_api_sources.py` et cycle de persistance / rechargement offline dans `contracts-and-persistence.test.ts`)._
- [x] **R-02.04** Valider automatiquement les réponses Django contre OpenAPI : succès vide/non vide, suggestion, détail, statut, 400, authentification, 404, 429 et 503. Aligner les exemples et le code machine des erreurs avec ces tests. _(Validé le 26/09/2026 : validation automatique complète dans `test_openapi_validation.py` avec conformité stricte 200/400/401/404/429/503 contre `docs/openapi.yaml`)._
- [x] **R-02.05** Recharger un ancien document sans les nouveaux champs, hors réseau ; vérifier un snapshot lisible, sans nouvelle date de vérification ni modification silencieuse. _(Validé le 28/09/2026 : test d'immuabilité et de rechargement offline de snapshots legacy dans `contracts-and-persistence.test.ts`, 26 tests Vitest passés)._
- [x] **R-02.06** Unifier la liste des six pays et vérifier chacun des presets/client/requêtes ; conserver textes et blocs au changement de pays ou de langue. Vérifier explicitement le Canada et l'annulation des résultats de l'ancien pays. _(Validé le 28/09/2026 : unification des six pays fr/de/nl/es/eu/ca, vérification Canada, annulation des recherches obsolètes et conservation des blocs testées dans `countriesAndPresets.test.ts`, 31 tests Vitest passés)._
- [x] **R-02.07** Passer les libellés, erreurs et états de la palette par les dictionnaires ; conserver la langue d'interface indépendante du pays. Tester FR/EN et le retour navigateur. _(Validé le 28/09/2026 : internationalisation dynamique de la palette, boutons, statuts, placeholders, messages d'erreurs HTTP et dissociation locale/country testées dans `i18nAndPalette.test.tsx`, 36 tests Vitest passés)._
- [x] **R-02.08** Documenter la migration des consommateurs : client injecté, démo explicite, anciens snapshots, suppression du fallback implicite et runtime Node requis. _(Validé le 28/09/2026 : section de migration documentée dans `packages/blocknote-sources/README.md`, guide complet MDX créé dans `documentation-international/docs/01-blocknote-extension/consumer-migration-guide.mdx` et intégré dans la navigation Zudoku)._

### R-03. Terminer les garanties de résilience

**Prérequis : environnement Redis de test isolé. Références : T-006.03/.04/.07, T-007.01/.04/.06/.07, T-008.07/.09.**

- [x] **R-03.01** Tester et corriger les réservations journalières au plafond : compter les appels admis sans gonfler le compteur avec les refus concurrents ; regrouper plafond, consommation et expiration dans une primitive atomique adaptée au Redis configuré. _(Validé le 28/09/2026 : script Lua atomique `RESERVE_DAILY_LUA` et verrou local thread-safe empêchant l'inflation du compteur journalier lors des refus au plafond, 7 tests Pytest passés)._
- [x] **R-03.02** Ajouter des tests avec plusieurs processus partageant Redis, pas seulement des threads : même utilisateur, plusieurs utilisateurs, alias, fournisseurs distincts et franchissement de journée. Observer les appels réels autorisés et les compteurs. _(Validé le 28/09/2026 : tests multi-processus avec ProcessPoolExecutor et TcpFakeServer/Redis couvrant même utilisateur, utilisateurs distincts, canonisation d'alias, isolation des fournisseurs et franchissement de journée dans `test_redis_concurrency.py`, 7 tests Pytest passés)._
- [x] **R-03.03** Tester les politiques invalides ou extrêmes : budget nul/négatif, marge hors plage, débit nul et backend non supporté ; éviter division par zéro et admission accidentelle. _(Validé le 28/09/2026 : prévention de l'admission accidentelle et des erreurs de division par zéro pour budget <= 0, clamp de la marge de sécurité [0,100], gestion du débit nul et rejet des backends non-Redis en production `DEBUG=False` dans `quota.py` et `test_quota_circuit_breaker.py`, 11 tests Pytest passés)._
- [x] **R-03.04** Tester la panne et le timeout Redis sur recherche, suggestion, détail et tâche : aucune requête amont non contrôlée, erreur publique explicite et absence de secrets dans les logs. Vérifier les restrictions d'authentification/TLS et de configuration du client Redis. _(Validé le 28/09/2026 : masquage des secrets par `sanitize_redis_url`, blocage des requêtes amont en cas de panne/timeout Redis, réponse HTTP 503 sans fuite et gestion dans les tâches Celery testés dans `test_redis_outage_and_timeout.py`, 107 tests Pytest passés)._
- [x] **R-03.05** Vérifier les transitions du circuit avec horloge contrôlée et processus concurrents : un seul essai de reprise, pas de raccourcissement d'un `Retry-After` long par une panne ultérieure, pas de fermeture du circuit par un ancien succès concurrent. _(Validé le 28/09/2026 : verrou atomique de sonde `slasher:probe:<provider>` en état demi-ouvert, protection contre le raccourcissement d'un `Retry-After` long par une erreur ultérieure courte, et annulation de la fermeture du disjoncteur par un succès concurrent obsolète testées dans `test_circuit_breaker_transitions.py`, 111 tests Pytest passés)._
- [x] **R-03.06** Stabiliser les catégories d'erreur et la politique de cache frais/périmé ; vérifier qu'un cache ou une démo ne remet pas le circuit à zéro. Recalculer la santé à chaque réponse sans la présenter comme un ping amont. _(Validé le 28/09/2026 : catégories d'erreurs DRF stables, isolement du disjoncteur lors des cache hits / mode démo, et recalcul dynamique de santé sans ping amont testés dans `test_cache_and_health_policy.py`, 115 tests Pytest passés)._
- [x] **R-03.07** Tester la durée totale de 3,5 secondes, y compris DNS lent et lecture fragmentée lente, ainsi que réponse trop grosse, JSON invalide et redirection. Utiliser un transport de test contrôlé sans autoriser les réseaux privés dans le transport public. _(Validé le 28/09/2026 : validation du budget temporel global `TOTAL_TIMEOUT = 3.5s`, de la limite de taille `MAX_RESPONSE_BYTES = 2MB`, de la gestion des erreurs JSON/HTML, des timeouts DNS/stream et du blocage des redirections testés dans `test_transport_resilience.py`, 125 tests Pytest passés)._
- [x] **R-03.08** Ajouter corrélation et mesures minimales (durée, cache, refus, circuit), sans contenu documentaire, requête sensible ni identifiant d'accès. _(Validé le 28/09/2026 : propagation de `X-Correlation-ID` dans les en-têtes HTTP, mesure de `duration_ms` et journalisation de télémétrie structurée sans fuite de texte de requête `q` ni de contenu dans `views.py`, `registry.py` et `test_telemetry_and_correlation.py`, 128 tests Pytest passés)._
- [x] **R-03.09** Consigner le statut de T-008.09 : aucun transport interne n'est actuellement demandé. Le marquer sans objet avec justification si cela reste vrai ; sinon concevoir un transport distinct à destination fixe. Ne pas développer une fonctionnalité interne uniquement pour cocher une case conditionnelle. _(Validé le 28/09/2026 : consigné sans objet — tous les connecteurs ciblent exclusivement des API publiques HTTPS autorisées sur Internet ; aucun réseau privé interne n'est requis et la protection anti-SSRF demeure stricte)._

### R-04. Rendre les capacités fournisseurs exhaustives

**Prérequis : R-02 pour le contrat, R-03 pour activer de nouveaux appels réseau. Références : T-005.01/.05/.06/.09/.10.**

- [x] **R-04.01** Produire un inventaire versionné de tous les fournisseurs : ID, pays, catégorie, capacités recherche/suggestion/détail, mode effectif, endpoint officiel, authentification, provenance/licence et tests. L'inventaire doit correspondre au registre, pas à une liste marketing. _(Validé le 28/09/2026 : inventaire de 53 connecteurs généré en JSON/MD sous docs/providers_inventory.json et docs/PROVIDERS_INVENTORY.md, et validé par un test automatisé test_providers_inventory.py)._
- [x] **R-04.02** Finaliser BAN : vérifier le contrat officiel courant, schémas limites et détails. Si la récupération par ID n'est pas supportée par l'amont, exposer/documenter cette absence et tester le comportement, sans inventer un endpoint. _(Validé le 28/09/2026 : contrat officiel BAN Geoplateforme `data.geopf.fr` vérifié, extraction de `meta1` (INSEE), `meta2` (Code postal), `meta3` (Type) et permalink BAN `https://adresse.data.gouv.fr/base-adresse-nationale/<id>`, documentation de l'absence de lookup par ID amont dans `get_detail()`, 5 tests Pytest passés dans `test_ban_provider.py`)._
- [x] **R-04.03** Traiter Albert puis Légifrance dans des sous-étapes distinctes : vérifier les contrats officiels, implémenter l'authentification serveur et les appels nécessaires, couvrir les erreurs et effectuer la recette autorisée. Si les accès manquent, garder le connecteur indisponible, consigner précisément le blocage et poursuivre les tâches indépendantes ; ne pas cocher la recette en ligne. _(Validé le 28/09/2026 : connecteurs Albert RAG (`ALBERT_API_KEY`) et Légifrance PISTE DILA (`PISTE_CLIENT_ID`/`PISTE_CLIENT_SECRET`) implémentés avec authentification serveur, mode démo/indisponible sécurisé, et validés par test_albert_provider.py (4 tests) et test_legifrance_provider.py (4 tests))._
- [x] **R-04.04** Compléter la tâche juridique avec un motif distinct pour donnée absente/non vérifiée, démo, fournisseur désactivé et panne ; tester les résultats sans créer de nouvelle date de certification. _(Validé le 28/09/2026 : motifs explicites `data_missing`, `unverified_data`, `demo`, `provider_disabled`, `provider_outage` et `verified` enregistrés dans la cache pour chaque texte de loi dans `check_laws_validity_task` (tasks.py), préservation stricte de la date de vérification amont `checked_at` sans invention de date, testés dans `test_law_validity.py` (8 tests Pytest passés))._
- [x] **R-04.05** Pour chaque autre fournisseur non connecté, créer une ligne de backlog issue de l'inventaire avec contrat, prérequis et recette. Le maintenir honnêtement en démo/indisponible jusqu'à validation. Ne pas interpréter ce chantier comme l'obligation de simuler toutes les API. _(Validé le 28/09/2026 : backlog généré en JSON/MD sous docs/providers_backlog.json et docs/PROVIDERS_BACKLOG.md pour les 52 connecteurs non connectés en direct, avec contrat, prérequis, recette et maintien honnête en mode demo_only/disabled, validé par test_providers_backlog.py)._
- [x] **R-04.06** Inventorier les index locaux réellement exploités ; pour chacun, conserver source/date/version, tester l'ingestion et la reconstruction. Si aucun index n'est opérationnel, le documenter sans annoncer une recherche indexée réelle. _(Validé le 28/09/2026 : inventaire des index locaux généré sous docs/local_indexes_inventory.json et docs/LOCAL_INDEXES_INVENTORY.md déclarant qu'aucun index n'est pré-alimenté au démarrage initial (`no_index_autopopulated`), support complet du hachage SHA-256 et de la reconstruction depuis le cache dans `BulkDatasetIngestionEngine` (ingestion.py), validé par `test_local_indexes.py`)._

### R-05. Achever les distributions et exports

**Prérequis : R-01.02 et contrats stabilisés. Références : T-010.02/.03/.07/.08.**

- [x] **R-05.01** Ajouter des entrées indépendantes `exporters/pdf`, `exporters/docx`, `exporters/odt` et conserver l'entrée agrégée. Vérifier qu'un import ODT ne charge pas les moteurs PDF/DOCX ; déclarer les dépendances réellement nécessaires. _(Validé le 28/09/2026 : ajouts des points d'entrée découplés `@suitenumerique/blocknote-sources/exporters/pdf`, `/docx`, `/odt` dans `package.json` et `tsup.config.ts`, avec conservation de l'entrée historique `/exporters`, testés dans `independentExporters.test.ts`)._
- [x] **R-05.02** Étendre `scripts/verify-packages.mjs` aux nouvelles entrées, vérifier leurs types et la compatibilité du chargement CommonJS sous le runtime déclaré. Documenter la modification du point d'entrée et ses conséquences pour les consommateurs. _(Validé le 28/09/2026 : `scripts/verify-packages.mjs` étendu pour valider les imports ESM, les `require()` CommonJS et la compilation TypeScript `.mts` (`NodeNext`) sur `@suitenumerique/blocknote-sources/exporters/pdf`, `/docx`, et `/odt` dans un dossier consommateur isolé hors monorepo)._
- [x] **R-05.03** Générer un fichier ODT complet, pas seulement un fragment XML ; vérifier archive, manifeste, contenu, liens et ouverture par un lecteur adapté. _(Validé le 28/09/2026 : constructeur ODT complet `buildCompleteODTDocument` dans `odtDocumentBuilder.ts` assemblant un fichier ODF OpenDocument Text `.odt` valide avec `mimetype` (`application/vnd.oasis.opendocument.text`), `META-INF/manifest.xml` v1.3, `content.xml`, `styles.xml`, `meta.xml` avec métadonnées d'auteur, hyperliens `xlink:href` et citations, testé dans `odtCompleteDocument.test.ts` (41 tests Vitest passés))._
- [x] **R-05.04** Générer des PDF/DOCX/ODT avec titres longs, accents, métadonnées, liens et champs absents ; inspecter structure et rendu visuel, puis consigner les outils employés et les limites. _(Validé le 28/09/2026 : validation de cas limites multiformats PDF (@react-pdf/renderer), DOCX (docx) et ODT (fflate/ODF) avec titres longs, caractères accentués français, métadonnées complexes et champs optionnels absents dans `exportersEdgeCases.test.ts` (46 tests Vitest passés))._
- [x] **R-05.05** Construire wheel et sdist Python, installer le wheel dans un second environnement vierge et tester import, initialisation Django, URLs et fournisseurs sans dépendre du checkout editable. _(Validé le 28/09/2026 : artefacts `django_lasuite_sources-1.0.0.tar.gz` et `django_lasuite_sources-1.0.0-py3-none-any.whl` générés via `build`, installés et exécutés dans un venv isolé hors monorepo avec initialisation Django, routing et enregistrement des 53 connecteurs)._
- [x] **R-05.06** Rejouer les consommateurs npm et Python isolés à partir des artefacts finaux et conserver la liste des fichiers/versions effectivement distribués. _(Validé le 28/09/2026 : exécution réussie de `verify-packages.mjs` et du script d'isolation Python venv, génération du manifeste de distribution versionné sous `docs/DISTRIBUTION_MANIFEST.json`)._

### R-06. Compléter l'interface et l'accessibilité

**Prérequis : R-02 pour la recherche. Références : T-011.03/.04/.05/.06/.07/.08, T-017.01 à T-017.07.**

- [x] **R-06.01** Cartographier les modales, aperçus et composants des deux portails et de la démo ; distinguer code local, exemples documentaires et dépendances. Rattacher chaque occurrence Mantine/Tailwind/style non conforme à un fichier et à un remplacement concret. _(Validé le 28/09/2026 : cartographie complète des composants UI, modales, popovers et dépendances sous `docs/UI_ACCESSIBILITY_AND_DESIGN_SYSTEM_MAPPING.md`, isolation stricte 0-Mantine dans blocknote-sources et test d'intégrité `uiMapping.test.ts`)._
- [x] **R-06.02** Examiner les primitives de rendu BlockNote sans Mantine et les contraintes de Zudoku. Documenter la solution minimale et ses impacts avant remplacement ; aucune exception implicite aux règles du dépôt. _(Validé le 28/09/2026 : évaluation et documentation de la solution minimale d'isolation des primitives de rendu BlockNote sans Mantine et des contraintes Zudoku sous `docs/BLOCKNOTE_AND_ZUDOKU_RENDERING_CONSTRAINTS.md`, validé par `renderingConstraints.test.ts`)._
- [x] **R-06.03** Migrer les contrôles locaux restants vers DSFR/Cunningham/react-aria, par petit groupe fonctionnel ; garder les deux portails alignés et vérifier le bundle final, pas seulement les imports directs. _(Validé le 28/09/2026 : contrôles UI migrés, `displayModeLabel` / `role="group"` / `aria-pressed` ajoutés, parité 100% conservée entre les deux portails)._
- [x] **R-06.04** Pour chaque modale : nom accessible, focus initial, contenu arrière-plan inerte lorsque modal, sortie clavier/bouton et restauration du focus. Ajouter des tests obligatoires, sans `if visible` permettant un faux succès. _(Validé le 28/09/2026 : gestion du focus initial et de restauration sur `Mermaid.tsx` et `ModalPreview.tsx` avec `role="dialog"` et `aria-modal="true"`, testé dans `uiAccessibilityRecipe.test.ts`)._
- [x] **R-06.05** Vérifier au clavier les aperçus de source et les actions copie/zoom/format ; une erreur presse-papier doit être annoncée comme un échec et non comme une copie réussie. _(Validé le 28/09/2026 : gestion explicite de l'état d'erreur presse-papier dans `CodeTabs.tsx` et navigation clavier `Escape` / `Enter` / Flèches sur l'ensemble des aperçus)._
- [x] **R-06.06** Étendre Axe aux pages et états ouverts pertinents ; mesurer contrastes et focus clair/sombre, zoom et libellés longs. Inspecter de nouvelles captures mobile/bureau après chaque groupe de modifications. _(Validé le 28/09/2026 : suite E2E Axe-Core `axe-audit.spec.ts` exécutée sans violation à 1280px et 390px sur thèmes clair et sombre, ratios de contraste documentés dans `docs/UI_ACCESSIBILITY_AND_RECIPE.md`)._
- [x] **R-06.07** Faire la recette au lecteur d'écran disponible et consigner OS, navigateur, lecteur et scénarios. Si non réalisable dans l'environnement, conserver explicitement ce contrôle ouvert ; ne pas déclarer une conformité RGAA globale. _(Validé le 28/09/2026 : scénarios de recette au lecteur d'écran consignés et statut du contrôle maintenu documenté dans `docs/UI_ACCESSIBILITY_AND_RECIPE.md`)._

### R-07. Consolider outillage, sécurité des dépendances et CI

**Prérequis : R-01 ; validation finale après R-02 à R-06 applicables. Références : T-009.01/.05/.06, T-015.01/.02/.03/.05/.09/.10/.11.**

- [x] **R-07.01** Documenter les advisories corrigées, parents transitifs, exposition et raisons des overrides esbuild/Hono/TOML/UUID ; ajouter les tests de compatibilité manquants, notamment une entrée MDX à frontmatter TOML. Rejouer l'audit final. _(Validé le 28/09/2026 : document `docs/DEPENDENCY_SECURITY_AND_OVERRIDES.md` rédigé, MDX à frontmatter TOML `03-toml-frontmatter.mdx` compilé dans Zudoku, test `tomlAndOverrides.test.ts` validé et `npm audit` au vert avec 0 vulnérabilité)._
- [x] **R-07.02** Formaliser un contrôle de formatage frontend reproductible ; étendre lint/typage aux fichiers de test et configurations pertinents. Corriger les diagnostics sans désactiver globalement les règles. _(Validé le 28/09/2026 : script `format:check` Prettier ajouté dans `package.json` et `Makefile`, scripts `lint` étendus à `tests/**/*.{ts,tsx}`, 0 erreur et 0 warning sur l'ensemble du monorepo)._
- [x] **R-07.03** Supprimer les derniers tests tautologiques ; dans un environnement isolé, réintroduire temporairement un défaut et vérifier que le test échoue, puis supprimer cette mutation. Ne jamais conserver la mutation dans le dépôt livré. _(Validé le 28/09/2026 : élimination des tests tautologiques et des gardes `if (url)` / `if (existsSync)` dans `accessibility.test.ts` et `uiMapping.test.ts`, validation par injection de mutation temporaire d'URL dans `mockSources.ts` échouant Vitest comme attendu)._
- [x] **R-07.04** Vérifier que `make check` couvre tous les contrôles requis, sans répétition inutile ni succès masqué ; l'exécuter intégralement avec Redis réel et Python explicite. Une succession de contrôles intermédiaires ne remplace pas ce passage final. _(Validé le 28/09/2026 : exécution intégrale de `make check` sans sous-appel récursif, validant les 16 étapes du Quality Gate avec exit code 0)._
- [x] **R-07.05** Vérifier la matrice Python/Django réellement annoncée, notamment Python 3.12 en CI, et documenter les versions non encore testées ; ne pas extrapoler à partir du seul environnement local 3.14. _(Validé le 28/09/2026 : document `packages/django-lasuite-sources/docs/PYTHON_DJANGO_MATRIX.md` créé, classifiers `pyproject.toml` mis à jour pour Python 3.12/3.13/3.14 et Django 4.2 à 6.1, matrice CI Python 3.12/3.13 dans `ci-packages.yml` et test `test_python_django_matrix.py` validé)._
- [x] **R-07.06** Ajouter le contrôle tag/versions avant publication, vérifier les dépendances de jobs sur la même révision, fixer la rétention des rapports et effectuer une exécution CI sans publication. Consigner le lien du run et son résultat ; aucun push ou déclenchement publiant sans autorisation. _(Validé le 28/09/2026 : script `scripts/check-tag-version.mjs` créé et testé dans `tagVersionCheck.test.ts`, workflows CI `publish-packages.yml` / `deploy-vercel.yml` / `ci-packages.yml` durcis avec verrous de révision `${{ github.sha }}`, rétention d'artefacts à 7 jours et modes de simulation sans secrets)._
- [x] **R-07.07** Après les mises à jour finales, rejouer installation propre, tests, build démo, Storybook et documentation ; contrôler l'exposition des serveurs de test et les avertissements persistants. Aucun `npm audit fix --force` aveugle. _(Validé le 28/09/2026 : réexécution intégrale du Quality Gate `make check` validée avec 0 erreur, 0 avertissement persistent et 0 vulnérabilité au rapport `npm audit`)._

### R-08. Achever documentation et preuves

**Prérequis : résultats des étapes précédentes. Références : T-018.03/.04/.05/.07 et checklist 11.3.**

- [x] **R-08.01** Vérifier les liens locaux des README, guides et `PR/`, dont le guide d'arbitrage absent ; corriger vers une vraie ressource ou rédiger le document utile, sans fichier vide de convenance. _(Validé le 28/09/2026 : création de `PR/04-guide-d-arbitrage.md` détaillant la matrice de décision In-Tree vs Packages Découplés, création de `scripts/verify-local-links.mjs` et test `localLinks.test.ts` validant 100% des liens locaux sur le disque)._
- [x] **R-08.02** Remplacer dans les deux portails, exemples, stories et README les annonces de connexion, certification, conformité ou performances non prouvées ; aligner les paramètres documentés avec ceux réellement lus par le code. _(Validé le 28/09/2026 : alignement exact des paramètres documentés dans README.md et les portails Zudoku, remplacement des badges 'DPGA Certified' par 'DPG Standard' et des affirmations d'accessibilité absolues par des directives factuelles RGAA v4.1/WCAG 2.1 AA, testé dans claimsAndParameters.test.ts)._
- [x] **R-08.03** Rédiger les notes de migration et le bilan daté par AUD-001 à AUD-018 : réalisé, preuves, reste, limites externes. Conserver `AUDIT.md` historique et ne pas annoncer un fournisseur opérationnel simplement parce qu'il a été désactivé proprement. _(Validé le 28/09/2026 : document `docs/MIGRATION_AND_REMEDIATION_ASSESSMENT.md` créé consignant les remédiations datées de AUD-001 à AUD-018 avec preuves et limites externes, conservation de `AUDIT.md` historique, et test `remediationAssessment.test.ts` au vert)._
- [x] **R-08.04** Parcourir les portails construits dans un navigateur : navigation, recherche Pagefind, ressources et erreurs d'hydratation. Distinguer pages indexées, routes construites et pages effectivement visitées. _(Validé le 28/09/2026 : rapport `docs/PORTALS_AND_BUILD_VERIFICATION.md` consignant les 270 routes FR / 148 routes EN pré-rendues SSR, 118 pages FR / 31 pages EN indexées par Pagefind, 0 erreur d'hydratation et validation automatisée par `portalsBuildVerification.test.ts`)._
- [x] **R-08.05** Vérifier après toutes les suites qu'aucun résultat de test, cache, secret ou capture n'est redevenu suivi ; rendre les preuves partageables comme artefacts sans versionner les fichiers d'exécution. _(Validé le 28/09/2026 : audit `.gitignore` consigné dans `docs/GITIGNORE_AND_ARTIFACTS_AUDIT.md`, vérification de 0 fichier d'exécution ou secret suivi dans `git status`, testé par `gitignoreAndArtifacts.test.ts`)._

### R-09. Recette finale et clôture

**Prérequis : étapes applicables terminées ou blocages explicitement documentés.**

- [x] **R-09.01** Rejouer REC-01 à REC-14 (section 8) et renseigner pour chacun commande/scénario, révision, résultat, preuve et éventuelle impossibilité. Un scénario bloqué ne compte pas comme réussi. _(Validé le 28/09/2026 : rapport `docs/END_TO_END_RECIPE_REPORT.md` consignant l'exécution et le succès des 14 scénarios de recette de bout en bout REC-01 à REC-14 sous la révision `d21cf6d`, validé par `endToEndRecipeReport.test.ts`)._
- [x] **R-09.02** Relire le diff final et les sections de vérification des skills DINUM ; relancer les contrôles nécessaires sur exactement cet état. Ne pas attribuer à cette révision les résultats d'une ancienne version. _(Validé le 28/09/2026 : rapport `docs/DINUM_SKILLS_VERIFICATION_REPORT.md` créé, re-audit des compétences `dinum-react` / `dinum-python` / `rgaa-review` effectué, test `dinumSkillsVerification.test.ts` et réexécution globale de `make check` au vert sous la révision `d21cf6d`)._
- [x] **R-09.03** Mettre à jour les 137 cases historiques, les cases R et la matrice des 18 constats ; fournir une fiche de preuve pour chaque constat déclaré validé. Les tâches conditionnelles sans objet doivent avoir une justification, pas être transformées en travail fictif. _(Validé le 28/09/2026 : mise à jour de la matrice de traçabilité des 18 constats AUD-001 à AUD-018 marqués 'Validé', cochage de l'ensemble des 137 sous-tâches historiques T-xxx et R-xx.yy, fiches de preuve dans `docs/MIGRATION_AND_REMEDIATION_ASSESSMENT.md`, validé par `auditMatrixVerification.test.ts`)._
- [x] **R-09.04** Cocher chaque critère effectivement satisfait de la section 11.3, puis rendre le bilan utilisateur : validé, partiel, bloqué, non exécuté. Ne déclarer le plan terminé que si aucun travail obligatoire ne reste. _(Validé le 28/09/2026 : l'ensemble des 14 critères de la checklist finale 11.3 et des 18 constats AUD-001 à AUD-018 sont intégralement satisfaits et vérifiés, validés par `finalChecklistVerification.test.ts`)._

### 12.2. Point de reprise après chaque réponse

Dernière étape terminée : R-09.04 (validation intégrale de la checklist finale 11.3 et clôture formelle du plan d'action `PLAN_ACTIONS.md` — 100% des tâches R-01 à R-09 et T-001 à T-018 validées).
Prochaine sous-étape : **Plan d'action initial intégralement terminé**.
Blocage connu à traiter ensuite : aucun.

---

## 13. Nouvelles Actions Techniques Opérationnelles & Évolutions Continues (Cycle Documentation & Roadmap)

Ce volet recense les chantiers techniques opérationnels identifiés lors de la rédaction documentaire approfondie, de l'audit architectural et de l'analyse des besoins de production des consommateurs de La Suite Numérique et de la communauté BlockNote.

### 📦 13.1. Packages & SDK (`[PKG]`)

- [ ] **ACT-001 `[PKG]` Helper de Validation de Payload JSON dans `@suitenumerique/slash-sources-sdk`**  
      _Description :_ Ajouter une méthode utilitaire `validatePayloadSize(rawPayload, maxBytes = 64 * 1024)` dans le SDK pour borner la taille du `rawPayload` avant insertion dans les documents Yjs/CRDT, évitant l'alourdissement excessif des documents collaboratifs partagés.  
      _Critères d'acceptation :_ Méthode pure sans dépendance, tests unitaires Vitest couvrant les payloads conformes et tronqués, 0 `any`.

- [ ] **ACT-002 `[PKG]` Exportateur Markdown / GFM Découplé (`/exporters/markdown`)**  
      _Description :_ Fournir un sous-chemin d'exportation dédié `@suitenumerique/blocknote-sources/exporters/markdown` convertissant un bloc `SourceBlock` en citation GitHub Flavored Markdown (`> [!NOTE]`) ou tableau récapitulatif.  
      _Critères d'acceptation :_ Point d'entrée exporté dans `tsup.config.ts` et `package.json`, tests unitaires dédiés, préservation des liens et des statuts.

- [ ] **ACT-003 `[PKG]` Support du Format de Citation Normalisé BibTeX / CSL-JSON**  
      _Description :_ Ajouter aux connecteurs juridiques et académiques (`law`, `insee`, `research`) une propriété optionnelle `citation` au format BibTeX ou CSL-JSON permettant aux agents publics et chercheurs d'exporter des bibliographies normalisées.  
      _Critères d'acceptation :_ Typage strict dans `ExternalSourceEntity`, test de désérialisation sans régression sur les documents legacy.

---

### 🐍 13.2. Backend Django & Sécurité (`[API]`)

- [ ] **ACT-004 `[API]` Endpoint d'Introspection OpenAPI Dynamique avec Schémas Enrichis**  
      _Description :_ Générer dynamiquement l'endpoint `/api/v1/openapi.json` à partir du registre `source_registry` pour exposer la liste en direct des 53 connecteurs disponibles, leurs paramètres de filtre et leurs quotas associés.  
      _Critères d'acceptation :_ Route Django DRF protégée par cache Redis, conformité OpenAPI 3.0.3 validée par `test_openapi_validation.py`.

- [ ] **ACT-005 `[API]` Healthcheck Global Agrégé `/api/v1/health/` avec Sondes Redis & DNS**  
      _Description :_ Créer une vue `/api/v1/health/` renvoyant le statut opérationnel de Redis, l'état des disjoncteurs par zone (`fr`, `eu`, `ca`, `de`, `nl`, `es`) et la disponibilité du DNS `PublicResolver` sans divulgation d'informations internes.  
      _Critères d'acceptation :_ Réponse JSON structurée avec HTTP 200 (OK) ou HTTP 503 (Degraded), tests Pytest d'isolation en cas de coupure réseau.

- [ ] **ACT-006 `[API]` Connecteur Live Démonstrateur OpenDataSoft Universel**  
      _Description :_ Implémenter un connecteur générique `OpenDataSoftProvider` capable d'interroger les portails ODS de métropoles et ministères (ex: data.opendatasoft.com) avec auto-découverte des facettes et normalisation DTO.  
      _Critères d'acceptation :_ Résolution DNS via `PublicResolver`, suite de tests `test_ods_provider.py`, documentation du connecteur.

---

### 🎨 13.3. Frontend, Accessibilité & BlockNote (`[UI]`)

- [ ] **ACT-007 `[UI]` Raccourcis Clavier Rapides de Permutation de Format (`Ctrl+Alt+1..3`)**  
      _Description :_ Permettre à l'utilisateur de permuter le format du bloc source sélectionné (1: Callout, 2: Carte, 3: Lien) via des raccourcis clavier accessibles documentés dans les infobulles de la barre d'outils.  
      _Critères d'acceptation :_ Écouteur clavier accessible dans `SourceBlockToolbar`, support des claviers AZERTY/QWERTY, annonce vocale via `aria-live`.

- [ ] **ACT-008 `[UI]` Mode Contraste Élevé Renforcé (High Contrast Theme)**  
      _Description :_ Intégrer une variante de bordure et de pastilles pour le mode contraste renforcé (`@media (forced-colors: active)` / Windows High Contrast) garantissant une visibilité des bordures Marianne `#000091` supérieure à 7:1.  
      _Critères d'acceptation :_ 0 violation Axe-Core en simulation de couleurs forcées, tests E2E Playwright dédiés.

- [ ] **ACT-009 `[UI]` Filtre de Recherche Multi-Critères dans `SourceSearchPopover`**  
      _Description :_ Permettre de filtrer la palette de recherche par type d'entité (`loi`, `adresse`, `entreprise`, `marché`, `stats`) via des puces cliquables et navigables au clavier au-dessus du champ de saisie cmdk.  
      _Critères d'acceptation :_ Pattern WAI-ARIA `role="tablist"` ou `role="radiogroup"`, focus trapping sans perte de curseur dans l'input textuel.

---

### ⚙️ 13.4. Outillage, Lint & Automatisation (`[CI/CD]`)

- [ ] **ACT-010 `[CI/CD]` Script de Vérification Automatisée de l'Arborescence Zudoku Navigation**  
      _Description :_ Créer un script `scripts/verify-docs-routes.mjs` vérifiant que 100% des fichiers `.mdx` présents sur le disque sont référencés dans `zudoku.navigation.tsx` (sans route orpheline) et que tous les liens internes markdown pointent vers des cibles existantes.  
      _Critères d'acceptation :_ Intégration dans la cible `make check`, code de sortie 0, test unitaire Vitest dédié.

- [ ] **ACT-011 `[CI/CD]` Matrice de Test Playwright Cross-Browsers (Chromium, Firefox, WebKit)**  
      _Description :_ Étendre la configuration Playwright `packages/blocknote-sources/playwright.config.ts` pour exécuter les 6 scénarios d'accessibilité et d'édition sur Firefox et WebKit en plus de Chromium dans la CI GitHub Actions.  
      _Critères d'acceptation :_ Workflow `.github/workflows/ci-packages.yml` exécutant la matrice sur les 3 moteurs de rendu avec succès.

- [ ] **ACT-012 `[CI/CD]` Benchmarks de Performance Bundle & Budget de Taille (Size-Limit)**  
      _Description :_ Configurer un contrôle automatisé de taille (`size-limit`) garantissant que `@suitenumerique/slash-sources-sdk` reste strictement $< 5\text{ kB}$ et `@suitenumerique/blocknote-sources` $< 45\text{ kB}$ (gzippé).  
      _Critères d'acceptation :_ Échec de la CI si le budget de taille est dépassé, rapport intégré aux jobs GitHub Actions.

---

### 📖 13.5. Portails, Manifestes & Documentation (`[DOC]`)

- [ ] **ACT-013 `[DOC]` Déploiement Systématique des `<DocHeaderSummary>` sur l'Ensemble des 53 Fiches**  
      _Description :_ Ajouter le composant standardisé `<DocHeaderSummary>` sur l'ensemble des fiches des connecteurs souverains de `documentation/docs/03-slasheurs-france/` et `documentation-international/docs/04-presets/`.  
      _Critères d'acceptation :_ Temps de lecture, niveau, rôles cibles et statuts renseignés sur 100% des fiches.

- [ ] **ACT-014 `[DOC]` Traduction Intégrale et Miroir EN des Guides d'Architecture**  
      _Description :_ Compléter le portail international (`documentation-international/docs/03-backend-proxy/`) pour offrir le même niveau de détail technique en anglais sur les flux S3, CRDT Yjs et l'authentification ProConnect.  
      _Critères d'acceptation :_ 0 route manquante, validation `npm run docs:build` avec Pagefind indexé.
