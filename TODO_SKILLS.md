# TODO — Skills et instructions d’agent pour dinum-setup

Recherche effectuée le **13 septembre 2026** à partir du dépôt local, des liens de sa documentation et des sources publiques ci-dessous.

**Objectif :** préparer un dossier `SKILLS/` et un fichier `AGENT.md` qui permettent à un agent de travailler correctement sur l’orchestration de La Suite numérique et son portail documentaire. Ce document est le plan de réalisation ; les skills et les instructions d’agent restent à créer.

## 1. Résultat de la recherche

Dans le volet gouvernemental, deux skills existants ont été identifiés : un skill DSFR publié sous `numerique-gouv`, directement pertinent ici, et un skill API publié par `datagouv`, intéressant seulement si le dépôt accueille des usages de données publiques. Les référentiels gouvernementaux et les dépôts applicatifs constituent aussi des sources pour rédiger nos propres skills ; ils ne sont pas tous des skills installables.

Ne pas déduire une certification officielle du seul nom d’une organisation GitHub. Distinguer le DSFR maintenu par le SIG, son intégration React sous `codegouvfr`, et les instructions proposées dans un dépôt de skills.

### Skills existants à évaluer

| Source consultée | Contenu trouvé | Décision pour ce dépôt |
| --- | --- | --- |
| [numerique-gouv/dsfr-skill — README](https://github.com/numerique-gouv/dsfr-skill/blob/main/README.md) et [SKILL.md réel](https://github.com/numerique-gouv/dsfr-skill/blob/77b387db99c0cf4f68e77029b66d01eeaed536c7/skills/dsfr-skill/SKILL.md) | Documentation HTML/CSS/JS, règles d’usage et d’accessibilité par composant, exemples et scripts de synchronisation. Le skill annonce 23 composants. | **P0 : adapter après vérification.** Compléter avec les API React-DSFR du projet. Le README mélange plusieurs nombres de composants et cite `skills/dsfr/`, alors que l’arbre actuel contient `skills/dsfr-skill/`. |
| [datagouv/datagouv-skill — README](https://github.com/datagouv/datagouv-skill/blob/main/README.md) et [SKILL.md](https://github.com/datagouv/datagouv-skill/blob/main/SKILL.md) | Skill `datagouv-apis` : catalogue, métadonnées, métriques, interrogation tabulaire et découverte de services de données ; privilégie le MCP lorsqu’il est disponible. | **P2, optionnel :** réutiliser si un besoin de données publiques apparaît. Aucun besoin actuel dans le Makefile ou le portail ne justifie son installation immédiate. |

- [ ] Adapter le contenu DSFR dans `SKILLS/dsfr-skill.md`, avec un titre et un rôle explicites, sans dépendre des métadonnées de découverte du fichier upstream.
- [ ] Vérifier les références upstream utilisées puis adapter la procédure dans le fichier local ; conserver les attributions et les liens nécessaires sans importer toute l’arborescence.
- [ ] Consulter et conserver les licences et attributions des fichiers repris : le README DSFR annonce Etalab-2.0, celui de data.gouv.fr MIT.
- [ ] Figer chaque import sur un commit et enregistrer les adaptations locales. Ne pas lancer les scripts de synchronisation upstream sans en lire le contenu.

### Référentiels déjà liés dans le dépôt

| Source | Point d’entrée local | Contenu exploitable et futur usage |
| --- | --- | --- |
| [Site DSFR, redirigé vers la version courante](https://www.systeme-de-design.gouv.fr/version-courante/fr) et [code officiel](https://github.com/GouvernementFR/dsfr) | `docs/04-design-system/installation.mdx`, `index.mdx` et fiches composants | Composants HTML/CSS/JS, exemples et documentation ; référence du skill DSFR. Rechercher la page courante de chaque composant au lieu de reconstruire les anciennes URL. |
| [React-DSFR](https://github.com/codegouvfr/react-dsfr) | `package.json`, fiches `docs/04-design-system/` | Intégration React du DSFR : contrôler imports, types et props contre la version verrouillée dans le dépôt. Le catalogue du skill HTML ne suffit pas à valider les exemples React. |
| [Critères et tests RGAA](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/) | `docs/04-design-system/accessibilite-rgaa.mdx` | Méthode structurée par thématiques et critères ; base d’une revue documentée des formulaires, contenus, scripts et navigation. |
| [Organisation ProConnect](https://github.com/proconnect-gouv) | `docs/02-architecture/auth.mdx` référence `proconnect.gouv.fr` | Point de découverte des sources d’authentification. Les ouvertures de `proconnect.gouv.fr` et `docs.proconnect.gouv.fr` ont échoué pendant cette recherche : vérifier les guides d’intégration avant de rédiger des paramètres précis. |
| [code.gouv.fr sur GitHub](https://github.com/codegouvfr) | Liens React-DSFR des fiches design | Organisation DINUM présentant notamment le catalogue de code public et le SILL ; utile pour identifier des sources publiques, pas une preuve d’existence d’un catalogue universel de skills. |

Les liens vers Keycloak, Docker, GNU Make, SOPS, age, LiveKit, Yjs et les frameworks complètent ces sources. Ce sont des références techniques tierces : les qualifier comme telles. Le lien générique `cyber.gouv.fr` dans `secrets-sops.mdx` ne suffit pas à sourcer un « guide GitOps et gestion des secrets ANSSI » précis.

### Dépôts La Suite parcourus

Les pages des six dépôts ont été consultées. Leurs arbres GitHub `main` ont aussi été interrogés récursivement : aucun fichier nommé `SKILL.md`, `AGENTS.md`, `AGENT.md` ou `CLAUDE.md` n’y a été trouvé aux révisions suivantes, avec des réponses non tronquées. Ce constat ne couvre pas les autres branches ni toutes les conventions possibles d’instructions d’IA.

| Dépôt lié par le Makefile | Contenu identifié | Révision inspectée | Exploitation prévue |
| --- | --- | --- | --- |
| [Docs](https://github.com/suitenumerique/docs) | Éditeur collaboratif Django/React | `2986cc6158a3a1c3f9c6c12efb87eed92f14ff0e` | Procédure de développement et services associés ; le Makefile local délègue `bootstrap` et `run` au projet. |
| [Projects](https://github.com/suitenumerique/projects) | Application de projets de La Suite territoriale | `7858be2a22ca87cacd6ff5d67a149aa06cb11b6b` | Configuration locale et lancement Compose ; vérifier l’environnement et les routes OIDC. |
| [Meet](https://github.com/suitenumerique/meet) | Visioconférence LiveKit, Django/React | `30b68052e1890b156c6168c887aa4532638dcc04` | Fiche de diagnostic LiveKit/OIDC/domaines ; lancement non automatisé à la racine. |
| [Transfers](https://github.com/suitenumerique/transfers) | Transfert de fichiers, compagnon de Drive | `1286dfa4c7f8d5165b0dff050da69af911562e76` | Lire les procédures upstream avant de proposer son orchestration locale. |
| [People](https://github.com/suitenumerique/people) | Gestion d’équipes Django/React | `5eafad1d7fb97efeb327b27ddcca0cf29c8182dc` | Documenter la configuration et les dépendances à partir du projet cloné. |
| [Accounts](https://github.com/suitenumerique/accounts) | Gestion des comptes La Suite | `850736b366d043d20bdedcf7a997d005b42088e4` | Vérifier le parcours de développement et la configuration d’identité. |

Les procédures détaillées, fichiers Compose et CI de ces six projets devront être lus à la révision effectivement clonée lors de l’écriture des skills. La consultation des pages et de leurs arbres ne constitue pas un test de démarrage.

## 2. Constats locaux à intégrer

Sources locales examinées : `README.md`, `Makefile`, `package.json`, `TODO_audit.md`, inventaire des fichiers et liens dans `docs/`, configuration Zudoku.

- Le dépôt racine orchestre des clones dans `src/` et publie une documentation Zudoku/React en MDX ; il ne faut pas lui appliquer indistinctement les conventions Django des applications.
- `make dev` lance réellement Docs et Projects. Les cibles Meet, Transfers, People et Accounts affichent des indications sans démarrer leurs services.
- `make bootstrap` inclut la préparation Docker puis Docs et Projects ; `bootstrap-docs` passe `FLUSH_ARGS='--no-input'`. Lire les effets de la cible upstream avant de l’employer sur des données existantes.
- `make install` appelle `./install.sh`, absent de la racine inspectée. Un skill ne doit pas présenter ce démarrage comme fonctionnel sans correction.
- Le README contient encore des liens anciens tels que `docs/auth.md`, `docs/hot-reload.md` et `TODO_ARCHITECTURE.md`. Les fichiers actuels sont notamment dans `docs/02-architecture/*.mdx`.
- La documentation et l’index des projets peuvent décrire des possibilités upstream plus larges que l’orchestration réellement câblée ici. Séparer explicitement les deux.
- `TODO_audit.md` décrit un audit à reprendre : ses anomalies ne sont pas automatiquement des constats encore valables sur les fichiers MDX actuels.
- De nombreuses modifications utilisateur existent déjà dans l’arbre de travail. Les futures opérations doivent rester ciblées et préserver ce travail.

## 3. Catalogue de skills proposé

P0 = socle initial ; P1 = deuxième lot ; P2 = extension conditionnée à un besoin réel. Les skills de ce tableau sont des **propositions locales**, pas des produits gouvernementaux déjà disponibles.

| Priorité / nom | Déclencheur | Procédure et livrable attendus | Critère de validation |
| --- | --- | --- | --- |
| **P0 — `dsfr`** | Créer ou corriger un composant ou exemple DSFR | Adapter le skill découvert ; lire les références du composant ; utiliser les classes officielles ou les imports React-DSFR selon le contexte ; vérifier les props contre la dépendance installée. | Une fiche bouton et une fiche formulaire rendues correctement, sans classes ni props inventées, avec références sourcées. |
| **P0 — `rgaa-review`** | Revoir l’accessibilité d’une page ou d’un composant | Associer les constats aux critères officiels ; contrôler notamment libellés, clavier, focus, erreurs et structure ; produire constats, corrections et vérifications restantes. | Essai clavier sur un formulaire et une navigation ; distinguer tests automatiques, contrôles manuels et critères non évalués. Ne pas déduire une conformité complète du seul usage du DSFR. |
| **P0 — `lasuite-dev`** | Cloner, configurer, démarrer ou dépanner La Suite en local | Lire le Makefile racine puis celui du projet concerné ; identifier services, variables, ports et volumes ; distinguer procédures disponibles et cibles indicatives. | Sur un cas Docs ou Projects, proposer des commandes présentes dans les fichiers ; sur Meet, expliquer les prérequis encore nécessaires au lieu d’annoncer un démarrage automatique. |
| **P0 — `docs-mdx`** | Ajouter ou corriger la documentation de ce dépôt | Respecter frontmatter et MDX ; relier sources et pages existantes ; passer par `scripts/generate-docs-navigation.mjs` pour la navigation ; maintenir des exemples exécutables. | Construction documentaire réussie, nouvelle page navigable, liens internes corrects, aperçu visuel des exemples modifiés. |
| **P1 — `oidc-local`** | Diagnostiquer un login local ou configurer une application | Comparer issuer, client, redirections et noms d’hôtes avec la configuration réelle ; séparer Keycloak de développement et intégration ProConnect. | Diagnostic documenté d’une redirection incorrecte sans désactiver l’authentification ; paramètres issus du projet ciblé. |
| **P1 — `env-secrets`** | Préparer des variables locales ou documenter SOPS/age | Copier uniquement les exemples nécessaires, préserver les fichiers existants, repérer les conventions propres au projet, expurger les secrets des extraits. | Une préparation répétée ne remplace pas les valeurs locales ; les exemples et le diff ne contiennent pas de secrets réels. |
| **P1 — `upstream-sync`** | Actualiser une fiche projet ou vérifier une instruction d’installation | Comparer README, Makefile, Compose et CI upstream à une révision identifiée ; produire un relevé des écarts et mettre à jour uniquement les références concernées. | Chaque commande proposée a une source ; distinguer lecture du code et exécution réellement vérifiée. |
| **P2 — `datagouv-apis`** | Explorer ou intégrer des données publiques | Réutiliser le skill publié par datagouv en conservant sa provenance et en limitant son activation aux tâches de données. | Une recherche restitue des identifiants et sources de jeux de données, sans publication implicite. |

### Audit du catalogue initial : compléter les méthodes d’ingénierie

Le premier catalogue décrit surtout les technologies et opérations du dépôt. Il explique comment utiliser DSFR ou démarrer Docs, mais insuffisamment comment cadrer un changement, choisir une conception, examiner un diff ou démontrer une correction. `rgaa-review` couvre l’accessibilité ; il ne remplace pas une revue de code. `upstream-sync` vérifie une cohérence documentaire ; il ne juge pas l’architecture. Ces manques justifient un deuxième volet transversal, combinable avec les skills métier.

### Réflexion à partir des skills de Matt Pocock

Source primaire : [mattpocock/skills](https://github.com/mattpocock/skills), arbre et fichiers `SKILL.md` consultés à la révision **`3cca18b368ae95cdbdebbff572ccafa662551015`**. Ce sont des méthodes tierces, sans statut gouvernemental. Les noms et chemins ci-dessous correspondent à cette révision ; certains anciens articles emploient d’autres noms.

| Skill source lu | Apport retenu | Adaptation proposée |
| --- | --- | --- |
| [`code-review`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/code-review/SKILL.md) | Examiner séparément les conventions du dépôt et la correspondance au besoin, depuis une base Git identifiée. | Ajouter un axe explicite bugs/régressions et couvrir aussi les modifications non commitées. Une spec ou un outil de tickets absent ne bloque pas les autres axes. |
| [`codebase-design`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/codebase-design/SKILL.md) | Concevoir des modules qui masquent une complexité utile derrière une interface simple et testable. | Examiner les contrats et les responsabilités avant d’ajouter des couches ; conserver le vocabulaire du dépôt. |
| [`improve-codebase-architecture`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/improve-codebase-architecture/SKILL.md) | Rechercher les zones de friction et les changements fréquents, tenir compte des décisions existantes, comparer avant/après. | Produire un audit ciblé avec preuves et effort estimé ; diagramme seulement s’il aide. Aucune refonte automatique à l’issue de l’audit. |
| [`grill-with-docs`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/grill-with-docs/SKILL.md) et [`grilling`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/productivity/grilling/SKILL.md) | Expliciter les décisions, leurs dépendances et les hypothèses ; rechercher les faits dans l’environnement. | Réserver l’entretien approfondi aux demandes de challenge. Pour le travail courant, résoudre les choix ordinaires par lecture du code et ne demander que les décisions manquantes qui changent la solution. |
| [`domain-modeling`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/domain-modeling/SKILL.md) | Stabiliser le vocabulaire et consigner les arbitrages durables dans des ADR. | Clarifier notamment « projet cloné », « service Compose », « compte » et « fournisseur OIDC ». Conserver le vocabulaire et les arbitrages dans `RETOUR_EXEC_<SUJET>.md`, selon la convention locale ; aucun dossier ADR séparé. |
| [`to-spec`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/to-spec/SKILL.md) | Synthétiser le besoin, les décisions et les comportements à vérifier. | Produire une spec locale proportionnée. La publication dans un gestionnaire de tickets est une action distincte, selon la demande. |
| [`tdd`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/tdd/SKILL.md) | Tester le comportement observable, vérifier l’échec avant la correction et avancer par petites tranches. | Utiliser les tests pour les comportements et régressions significatifs ; une correction de texte ne justifie pas une suite de tests dédiée. |
| [`diagnosing-bugs`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/diagnosing-bugs/SKILL.md) | Construire une reproduction, éprouver les hypothèses, vérifier la correction et nettoyer l’instrumentation. | Adapter la reproduction aux moyens disponibles ; une impossibilité de lancer un service reste une limite documentée et permet tout de même une analyse statique. |
| [`writing-for-agents`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/productivity/writing-for-agents/SKILL.md) | Déclencheurs précis, références chargées au besoin, critères de fin et source de vérité unique. | Utiliser ces principes pour auditer tous nos skills et alléger `AGENT.md`, en renvoyant vers les configurations au lieu de les recopier. |

**Choix de conception du catalogue :** adopter ces méthodes par adaptation ciblée. Certains fichiers sources dépendent d’autres skills, d’un outil de tickets configuré, de confirmations systématiques ou de sous-agents. L’import d’un fichier isolé serait donc parfois incomplet. Nos skills doivent fonctionner avec les outils disponibles et respecter l’autonomie demandée ; la délégation reste optionnelle, lorsqu’elle est autorisée. Les contenus upstream sont des sources à examiner, pas des instructions à exécuter pendant cet audit.

### Nouveaux skills : contrats précis

Les trois premiers rejoignent le **P0**, qui passe ainsi à sept skills. Les compétences complémentaires sont en P1, y compris les six ajouts détaillés ci-dessous. Chaque skill a un résultat distinct ; on ne lance pas toute la chaîne pour chaque changement.

#### P0 — `code-review` : revoir un diff

- **Déclencheur :** « revois ce code », « audite cette PR », « cherche les régressions de mes changements ».
- **Entrées :** diff demandé, base Git si pertinente, contexte des appelants, besoin/spec disponible, conventions locales. Préciser si l’examen couvre commits, index, modifications non indexées et fichiers non suivis ; éviter qu’un simple diff de branche ignore le travail local.
- **Méthode :** lire les chemins modifiés et leurs usages ; examiner séparément (1) bugs et régressions, (2) respect du besoin, (3) conventions documentées et maintenabilité. Vérifier les hypothèses avant de signaler un défaut ; distinguer constat et préférence de conception.
- **Livrable :** constats classés par gravité avec axe, `fichier:ligne`, scénario déclencheur, impact, preuve et correction suggérée. Ajouter les tests effectués, limites et exigences non vérifiables. Si aucun défaut n’est trouvé, le dire explicitement.
- **Limite :** une demande de revue seule produit un rapport ; elle ne déclenche ni refactorisation ni publication de commentaire externe.
- **Validation :** une fixture contenant une régression réelle est signalée avec un scénario reproductible ; un diff correct ne reçoit pas de défaut inventé. Une modification non commitée demandée dans le périmètre est bien examinée.

#### P0 — `architecture-review` : auditer l’existant

- **Déclencheur :** « audite l’architecture », « où est le couplage ? », « quelles responsabilités faut-il revoir ? ».
- **Entrées :** périmètre explicite, code et configuration actuels, historique utile, décisions existantes.
- **Méthode :** cartographier responsabilités, dépendances, flux de données et contraintes d’exécution ; chercher des difficultés concrètes de modification ou de test. Ici, séparer le portail Zudoku, l’orchestration racine et les six dépôts autonomes.
- **Livrable :** carte de l’existant et liste priorisée des problèmes avec fichiers concernés, preuve, conséquence, option minimale, coût/risque et bénéfice attendu ; distinguer dette observée et hypothèse. Montrer avant/après pour les propositions structurelles.
- **Limite :** le rapport évalue l’existant ; il ne transforme pas automatiquement les clones La Suite en un monorepo ni ne réécrit leurs architectures.
- **Validation :** chaque recommandation répond à une friction observable ; conserver l’existant est une conclusion acceptable lorsque le coût d’une abstraction dépasse son intérêt.

#### P0 — `design-change` : concevoir une évolution

- **Déclencheur :** « conçois l’ajout de ce service », « propose l’architecture de cette fonctionnalité », « définis cette interface ».
- **Entrées :** résultat utilisateur attendu, contraintes, code existant et décisions déjà prises.
- **Méthode :** décrire scénarios et invariants ; définir responsabilités, contrats, erreurs et dépendances ; comparer des alternatives réellement distinctes lorsqu’un arbitrage le mérite, dont une évolution minimale. Évaluer compatibilité, testabilité, migration et retour arrière lorsque pertinents.
- **Livrable :** note de conception avec recommandation motivée, alternatives écartées, contrat proposé, points encore ouverts et plan d’implémentation par étapes vérifiables. Arbitrages durables consignés dans `RETOUR_EXEC_<SUJET>.md`, avec alternatives et motifs.
- **Limite :** « interface » désigne ici le contrat d’un module ou service ; les composants visuels relèvent aussi de `dsfr` et `rgaa-review`. Une demande de conception seule n’autorise pas une implémentation implicite.
- **Validation :** sur l’ajout de Meet à l’orchestration, la proposition traite configuration, LiveKit/OIDC, états d’échec, vérification de démarrage et arrêt ; elle distingue hypothèses et faits inspectés.

#### P1 — Compétences complémentaires

| Skill local | Déclencheur et sortie | Test d’acceptation |
| --- | --- | --- |
| `challenge-plan` | Challenger un plan : lire les faits disponibles, identifier ambiguïtés et décisions structurantes, proposer des réponses et poser les seules questions restantes ; rendre un relevé des décisions et hypothèses. | Une question résoluble dans le Makefile n’est pas renvoyée à l’utilisateur ; une contrainte métier réellement inconnue reste explicite. |
| `write-spec` | Transformer un besoin discuté en spec locale : problème, périmètre, comportements attendus, critères d’acceptation et points ouverts. | Les critères sont observables ; aucune fonctionnalité ni publication de ticket n’est ajoutée implicitement. |
| `refactor-plan` | Planifier une restructuration choisie après revue : étapes réversibles, contrats à préserver, risques et vérifications par étape. | Le plan sépare changement structurel et ajout fonctionnel, et explique comment détecter une régression. |
| `behavior-tests` | Ajouter des tests sur une fonctionnalité ou régression : choisir une interface observable, constater l’échec pertinent puis vérifier le comportement corrigé. | Le test échoue sur le défaut ciblé, passe après correction et survit à une réorganisation interne sans changement de comportement. |
| `debug-repro` | Diagnostiquer un bug : reproduction minimale, hypothèses vérifiables, cause démontrée, correction ciblée et nouvelle exécution du scénario initial. | Le symptôme original est vérifié ; les logs temporaires sont retirés et toute limite de reproduction est signalée. |

Le vocabulaire métier et les décisions des `RETOUR_EXEC_*.md` existants sont lus par `design-change` lorsqu’ils sont utiles ; les règles communes de maintenance restent dans `AGENT.md`. Éviter de créer un skill supplémentaire pour chaque technique si cela multiplie les déclencheurs sans apporter de résultat distinct.

### Compléments demandés : décisions, comparaison, prototype, tickets, triage et passation

Ces **six skills P1** complètent les huit P1 précédents. Le catalogue cible comporte donc **7 P0, 14 P1 et 1 P2**. Les procédures ci-dessous sont des adaptations locales ; les conventions de fichiers demandées par l’utilisateur priment sur les formats ADR, gestionnaires de tickets ou documents de passation des sources tierces.

| Fichier à créer dans `SKILLS/` | Déclencheur et entrées | Fonctionnement précis | Sortie et validation |
| --- | --- | --- | --- |
| `decision-memory-skill.md` | Consigner un arbitrage, expliquer un choix, reprendre l’historique ; besoin, code, décisions et retours existants. | Lire le retour du sujet ; préciser les termes ambigus ; enregistrer contexte, options, décision, justification, conséquences et condition de réexamen ; séparer proposé, accepté, appliqué et remplacé. Si un choix évolue, conserver l’ancien et lier la décision qui le remplace. | `RETOUR_EXEC_<SUJET>.md` : sections Vocabulaire et Décisions, identifiants `DEC-001`, etc. Une autre session peut retrouver pourquoi le choix a été fait, son statut et ses preuves sans la conversation initiale. |
| `compare-designs-skill.md` | Comparer plusieurs architectures ou contrats avant de choisir ; scénarios, contraintes et points d’incertitude. | Fixer les critères avant la comparaison ; produire au moins deux options matériellement différentes, dont une évolution minimale si applicable ; exposer pour chacune responsabilités, contrats, flux, erreurs et migration ; évaluer les mêmes scénarios ; recommander avec compromis et incertitudes. | Matrice et choix dans `RETOUR_EXEC_<SUJET>.md`, section Comparaison de conceptions, reliés à une `DEC-*`. Deux simples renommages de la même solution ne constituent pas deux options. |
| `prototype-skill.md` | Vérifier une hypothèse technique avant implémentation ; question précise, alternatives, moyen de mesure et limite d’exploration. | Formuler une hypothèse réfutable et le signal attendu ; construire le plus petit essai dans un répertoire temporaire isolé ; exécuter et mesurer ; comparer attendu/observé ; conclure confirmé, réfuté ou indéterminé ; nettoyer les fichiers temporaires sauf conservation utile explicitement motivée. | `RETOUR_EXEC_<SUJET>.md`, section Expériences : hypothèse, protocole, commandes expurgées, versions, mesures, conclusion et limites. Un prototype ne vaut ni fonctionnalité livrée ni validation de production ; sa conclusion reste compréhensible après nettoyage. |
| `ticket-breakdown-skill.md` | Découper une spec ou une conception en tâches réalisables ; besoin accepté, critères et décisions connues. | Créer des tranches apportant un résultat vérifiable ; attribuer identifiant, résultat, périmètre, dépendances, priorité et critères d’acceptation ; ordonner sans cycle ; séparer exploration, implémentation et vérification quand cela aide ; relier les exigences à leurs tickets. | `TODO_<SUJET>.md`, tickets `T-001`, etc. Chaque ticket a une fin observable et les critères du besoin sont couverts ; aucune création de ticket sur un service externe. |
| `triage-skill.md` | Classer anomalies, demandes et retours d’audit ; `AUDIT_*`, tickets existants et éléments de reproduction. | Dédupliquer ; distinguer bug, évolution, dette ou information manquante ; estimer impact, urgence, preuve et dépendances ; attribuer priorité motivée ; rattacher à un ticket existant ou créer une tâche ; ne pas déclarer une anomalie corrigée à la seule création du ticket. | Mise à jour de `TODO_<SUJET>.md`, liens vers les constats `AUD-*` de `AUDIT_<SUJET>.md`. Un doublon renvoie à un ticket unique et un signalement incertain garde son niveau de preuve. |
| `handoff-skill.md` | Préparer une reprise de session ou transmettre un travail ; état du dépôt, retours, TODO et dernier audit. | Relever l’objectif, les contraintes, la révision/branche, les fichiers modifiés non commités, les tâches achevées ou en cours, les vérifications, les blocages et la prochaine action ; distinguer intention et action réellement exécutée ; relire la cohérence des liens. | Section Reprise de `RETOUR_EXEC_<SUJET>.md`, avec liens vers `TODO_<SUJET>.md` et `AUDIT_<SUJET>.md` existants. La passation prépare un document ; elle ne lance ni n’envoie de message à un autre agent. |

#### Comparer réellement plusieurs conceptions

Le fichier `compare-designs-skill.md` détaillera cette procédure :

1. **Poser le problème commun** : scénario utilisateur, contraintes imposées, interfaces existantes, critères de réussite et coût de changement acceptable.
2. **Décrire les options séparément** : par exemple une délégation directe aux Makefiles upstream et un adaptateur d’orchestration commun. Illustrations à évaluer, pas choix prédéterminés. Si conserver l’existant répond au besoin, l’inclure.
3. **Démontrer leurs différences** : qui possède la configuration, qui démarre/arrête les services, quel contrat est exposé, comment les erreurs remontent et quelles dépendances sont introduites.
4. **Construire la matrice commune** : couverture du besoin, complexité pour l’appelant, couplage, testabilité, exploitation, compatibilité upstream, coût de migration et réversibilité. Pour chaque case : argument ou preuve, puis incertitude ; éviter une note numérique sans justification.
5. **Éprouver les mêmes cas** : démarrage nominal, dépendance absente, échec partiel, exécution répétée et arrêt. Utiliser `prototype-skill.md` seulement si une incertitude technique décisive nécessite un essai.
6. **Conclure** : option recommandée, raison du rejet des alternatives, compromis, éléments restant à confirmer et événement qui ferait changer le choix. Enregistrer dans `RETOUR_EXEC_<SUJET>.md` ; ne pas présenter une recommandation comme une décision déjà acceptée.

`design-change-skill.md` utilise cette méthode quand la conception présente un véritable arbitrage. Pour une modification simple à solution évidente, une justification courte suffit ; la comparaison détaillée reste disponible sur demande.

## 4. Architecture simplifiée retenue

**Un fichier Markdown autonome par compétence, nommé `<nom>-skill.md`, directement dans `SKILLS/`.** Le nom décrit sa fonction : `design-change-skill.md` contient la conception d’une évolution, `code-review-skill.md` la revue de code. Chaque fichier réunit sa procédure, ses références et le format du résultat.

### 4.1. Arborescence à créer pour le premier lot

```text
dinum-setup/
├── AGENTS.md                       # Renvoi outil vers AGENT.md
├── AGENT.md                        # Contexte commun et liens vers les skills
└── SKILLS/
    ├── README.md                   # Catalogue et exemples d’utilisation
    ├── dsfr-skill.md
    ├── rgaa-review-skill.md
    ├── lasuite-dev-skill.md
    ├── docs-mdx-skill.md
    ├── code-review-skill.md
    ├── architecture-review-skill.md
    └── design-change-skill.md
```

Compléments P1 à ajouter au même niveau, sans sous-dossiers :

```text
SKILLS/
├── decision-memory-skill.md
├── compare-designs-skill.md
├── prototype-skill.md
├── ticket-breakdown-skill.md
├── triage-skill.md
└── handoff-skill.md

# Livrables à la racine, au fil du travail :
RETOUR_EXEC_<SUJET>.md
AUDIT_<SUJET>.md
TODO_<SUJET>.md
```

`AGENT.md` choisit le fichier adapté à la tâche et demande sa lecture. L’utilisateur peut aussi donner son chemin explicitement. Ces procédures locales n’utilisent pas la découverte native reposant sur le nom `SKILL.md` : aucun dossier `.agents/skills/`, lien symbolique ou fichier `SKILL.md` intermédiaire n’est prévu. Les noms des fichiers sources externes cités dans la recherche restent inchangés.

`AGENTS.md` reste un court renvoi pour les outils qui lisent ce nom au démarrage ; les instructions communes restent dans `AGENT.md`. Référence : [instructions de projet Codex](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Aucun sous-dossier de références, modèle de rapport séparé ou registre supplémentaire n’est prévu. Les sources restent dans le fichier concerné, les règles communes dans `AGENT.md`, les exemples d’utilisation dans le README et les validations dans ce TODO. Les décisions et retours sont conservés dans `RETOUR_EXEC_<SUJET>.md`, les revues après exécution dans `AUDIT_<SUJET>.md` et les tickets dans `TODO_<SUJET>.md`, selon §4.8.

### 4.2. Contenu exact des fichiers communs

**`AGENTS.md` — uniquement le renvoi suivant :**

```markdown
# Instructions du dépôt

Lire [AGENT.md](AGENT.md) avant de travailler dans ce dépôt.
Il contient les instructions communes et les liens vers les skills locaux.
```

**`AGENT.md` — le contexte commun :** périmètre racine/portail/clones, fichiers à consulter, choix du skill, préservation des modifications et données locales, vérifications appropriées et format bref du compte rendu. Le détail est donné en §5. Aucune procédure de revue ou de conception n’y est dupliquée.

**`SKILLS/README.md` — le catalogue :** une phrase sur le rôle des skills, un tableau `nom / fonction / lien / exemple d’appel`, puis une courte explication du routage par `AGENT.md` et de la lecture explicite par chemin. Seuls les skills réellement créés y figurent. Les sources techniques détaillées restent dans chaque skill.

### 4.3. Contenu autonome de chaque fichier `<nom>-skill.md`

Chaque fichier commence par un titre explicite et une phrase décrivant son rôle. Un frontmatter n’est pas nécessaire pour ce chargement par lecture directe. Son corps contient cinq parties :

1. **Quand l’utiliser** : ce qu’il traite et sa différence avec les compétences voisines.
2. **Informations à lire** : fichiers existants ou informations nécessaires, avec conduite à tenir si une entrée manque.
3. **Procédure** : les étapes concrètes propres à la compétence.
4. **Résultat et vérification** : contenu du compte rendu et preuve permettant de dire que le travail est fini.
5. **Sources** : liens précis, version ou commit pour les éléments repris, attribution et adaptations utiles.

Le format du rapport est décrit directement dans la quatrième partie, sans fichier modèle séparé. Les sources sont consultées au besoin ; elles ne sont pas recopiées intégralement. Les liens vers les fichiers du dépôt sont relatifs au dossier `SKILLS/`.

### 4.4. Ce que contiendra chacun des sept fichiers P0

| Fichier | Fonctionnement à écrire dans le fichier | Résultat et vérification |
| --- | --- | --- |
| `SKILLS/dsfr-skill.md` | Identifier React ou HTML ; lire les dépendances et les types réellement installés ; sélectionner un composant officiel ; vérifier props, variantes, tokens et interactions ; modifier l’exemple. Inclure les liens DSFR/React-DSFR et la provenance de l’adaptation. | Exemple fonctionnel, fichier modifié, source exacte, rendu et interactions vérifiés. Les règles HTML et React sont deux sections du même fichier. |
| `SKILLS/rgaa-review-skill.md` | Définir page/parcours ; lire les critères applicables ; contrôler titres, libellés, erreurs, clavier, focus, contrastes et annonces selon le périmètre ; séparer constats, non-applicabilité et non-évaluation. | Rapport : périmètre et environnement, puis critère/statut/preuve/impact/correction ; liste des contrôles non effectués. Les tests automatiques seuls ne prouvent pas la conformité complète. |
| `SKILLS/lasuite-dev-skill.md` | Choisir le projet ; inspecter le clone et ses instructions ; lire Makefile/Compose/env ; vérifier prérequis et effets sur les données ; préparer sans écraser ; démarrer si demandé ; contrôler disponibilité et arrêt. Ajouter un tableau compact des six projets, avec chemins à lire et limites du câblage racine. | Commandes réellement utilisées, services vérifiés, erreurs ou limites restantes. Les détails variables sont lus dans les projets plutôt que recopiés dans six fiches supplémentaires. |
| `SKILLS/docs-mdx-skill.md` | Lire une page existante et le générateur ; respecter frontmatter, JSX/MDX et liens ; rédiger ; générer navigation ; construire ; contrôler le rendu s’il change. Pour une fiche composant, donner dans le fichier l’ordre des sections : résumé, sources, aperçu, variantes, React, HTML, accessibilité. | Page navigable, exemples valides, build vérifié et diff de navigation examiné. Le skill renvoie à `dsfr` seulement pour les exemples DSFR concernés. |
| `SKILLS/code-review-skill.md` | Définir le diff : branche/base, index, modifications non indexées ou fichiers non suivis selon la demande ; lire les appelants, conventions et besoin disponible ; examiner bugs/régressions, correspondance au besoin et conventions ; confirmer les constats. | Rapport ordonné par gravité : axe, fichier:ligne, scénario, impact, preuve, correction suggérée ; vérifications et limites. Sans spec, poursuivre les autres axes. Une revue seule ne modifie pas le code. |
| `SKILLS/architecture-review-skill.md` | Définir le périmètre ; cartographier responsabilités, dépendances et flux ; distinguer portail, orchestration et clones ; lire les décisions existantes ; relever les frictions réelles ; comparer améliorations minimales et coût de changement. Les principes de cohésion, couplage et testabilité sont expliqués brièvement dans le fichier. | Rapport : périmètre/révision, structure actuelle, problèmes sourcés, options, coût/risque/bénéfice, recommandation. Schéma seulement s’il aide. Une absence de refonte justifiée est un résultat valable. |
| `SKILLS/design-change-skill.md` | Partir du besoin ; lire l’existant ; expliciter scénarios, invariants et contraintes ; définir responsabilités, contrats et erreurs ; comparer les alternatives utiles ; proposer réalisation, migration et retour arrière si nécessaires. | Note : problème, contraintes, options, recommandation, contrats, étapes vérifiables, questions ouvertes. Arbitrages durables consignés dans `RETOUR_EXEC_<SUJET>.md`. Aucune implémentation implicite si la demande porte sur la conception seule. |

Exemple : **tout le fonctionnement d’`architecture-review` est dans `SKILLS/architecture-review-skill.md`**. Il ne dépend pas de fichiers `repo-boundaries.md` ou `report.md` supplémentaires. Il lit directement le `Makefile`, la documentation existante et le code concerné.

### 4.5. Exemple concret d’un fichier autonome

Contenu de départ proposé pour `SKILLS/architecture-review-skill.md`, à compléter avec les sources retenues lors de sa création :

```markdown
# Audit d’architecture

Auditer la structure existante, les responsabilités et les dépendances
pour proposer des améliorations justifiées par le code.

## Quand l’utiliser
Utiliser pour examiner une architecture existante.
Pour concevoir une fonctionnalité nouvelle, utiliser design-change.

## Informations à lire
Lire les instructions du dépôt, les fichiers du périmètre demandé et les
décisions déjà documentées. Ici, distinguer le portail Zudoku,
l’orchestration du Makefile et les dépôts indépendants de src/.
Consulter ../Makefile et ../docs/02-architecture/index.mdx
si l’audit concerne l’orchestration.

## Procédure
1. Délimiter la zone examinée et identifier la révision ou l’état local.
2. Décrire les responsabilités et les dépendances réellement observées.
3. Rechercher les difficultés concrètes de modification, de diagnostic ou
   de test. Associer chaque difficulté aux fichiers et usages concernés.
4. Comparer une amélioration minimale avec le maintien de l’existant.
   Examiner le coût, les risques et le bénéfice attendu.
5. Recommander les changements justifiés par les preuves disponibles.

## Résultat et vérification
Rendre un rapport avec : périmètre, structure actuelle, constats sourcés,
options, recommandation et limites de l’examen.
Pour chaque constat, donner les fichiers, la conséquence observable et
la justification de la proposition. Distinguer hypothèse et défaut établi.
Écrire le rapport dans AUDIT_<SUJET>.md à la racine.
Une demande d’audit seule ne modifie pas l’architecture.

## Sources
- Architecture locale : ../docs/02-architecture/index.mdx
- Méthode à adapter : https://github.com/mattpocock/skills
  La création du skill devra préciser la révision et les fichiers utilisés.
```

### 4.6. Extensions P1/P2 : même format, sans annexes par défaut

Chaque extension sera un fichier `SKILLS/<nom>-skill.md`, sans sous-dossier. Les contrats du §3 restent applicables. Les six fichiers supplémentaires de mémoire, comparaison, prototype, tickets, triage et passation sont décrits intégralement dans le tableau « Compléments demandés » du §3.

| Fichier dans `SKILLS/` | Contenu spécifique du fichier |
| --- | --- |
| `oidc-local-skill.md` | Paramètres issuer/client/redirection/hôte, lecture des configurations, distinction Keycloak local/ProConnect, diagnostic et vérification du parcours. |
| `env-secrets-skill.md` | Repérage des exemples et destinations, préservation des valeurs, préparation idempotente, contrôle Git et expurgation des sorties. |
| `upstream-sync-skill.md` | Choix de la révision source, comparaison local/upstream, tableau des écarts et mise à jour ciblée avec preuves. |
| `challenge-plan-skill.md` | Faits vérifiés, hypothèses, questions structurantes avec recommandation, relevé des décisions acquises et ouvertes. |
| `write-spec-skill.md` | Synthèse du besoin, périmètre, scénarios, critères d’acceptation identifiables, contraintes et points ouverts ; modèle décrit dans le fichier. |
| `refactor-plan-skill.md` | Objectif, invariants à préserver, étapes réversibles, dépendances, contrôles et retour arrière. |
| `behavior-tests-skill.md` | Choix du comportement et de l’interface observable, outillage existant, échec pertinent avant correction, succès après correction, limites des mocks. |
| `debug-repro-skill.md` | Symptôme, reproduction minimale, hypothèses vérifiables, cause étayée, correction ciblée, vérification finale et nettoyage. |
| `datagouv-apis-skill.md` | Adaptation du skill upstream pour catalogue, métriques, données tabulaires et usages MCP ; sources des résultats et limites des opérations. Ajouter la notice de licence si la reprise de contenu l’exige. |

### 4.7. Comment les appeler et comment ils sont reliés

Après création, demander à l’agent de lire le fichier, puis préciser la tâche. Les noms seuls servent de raccourcis dans le routage d’`AGENT.md`, pas de commandes natives garanties. Exemple : « Lis `SKILLS/code-review-skill.md` et applique cette procédure à mes changements locaux. »

| Exemple d’appel | Fichier utilisé |
| --- | --- |
| `Lis SKILLS/code-review-skill.md puis : Revois mes changements non commités sans les modifier.` | `SKILLS/code-review-skill.md` |
| `Lis SKILLS/architecture-review-skill.md puis : Audite le couplage entre Makefile et les clones de src/.` | `SKILLS/architecture-review-skill.md` |
| `Lis SKILLS/design-change-skill.md puis : Conçois le lancement de Meet depuis le Makefile.` | `SKILLS/design-change-skill.md` |
| `Lis SKILLS/dsfr-skill.md puis : Corrige l’exemple Input de la fiche formulaires.` | `SKILLS/dsfr-skill.md` |
| `Lis SKILLS/rgaa-review-skill.md puis : Examine le clavier et les erreurs de ce formulaire.` | `SKILLS/rgaa-review-skill.md` |
| `Lis SKILLS/lasuite-dev-skill.md puis : Prépare et lance Docs localement.` | `SKILLS/lasuite-dev-skill.md` |
| `Lis SKILLS/docs-mdx-skill.md puis : Ajoute une fiche sur les modales DSFR.` | `SKILLS/docs-mdx-skill.md` |

Pour les extensions : « Lis `SKILLS/debug-repro-skill.md` puis reproduis cette erreur », « Lis `SKILLS/write-spec-skill.md` puis formalise notre besoin ». Le catalogue ne référence que les fichiers déjà créés ; aucune syntaxe `$nom` ou `/nom` n’est requise.

```text
AGENTS.md → AGENT.md → choix d’un SKILLS/<nom>-skill.md
                           ↓
                 fichiers existants du dépôt
                           ↓
                 résultat demandé par l’utilisateur
```

Liens Markdown concrets :

- Dans `AGENT.md` : `[Revue de code](SKILLS/code-review-skill.md)`.
- Dans `SKILLS/README.md` : `[Revue de code](code-review-skill.md)`.
- Dans `SKILLS/code-review-skill.md`, si une lecture complémentaire est utile : `[Audit d’architecture](architecture-review-skill.md)`.
- Dans `SKILLS/docs-mdx-skill.md` : `[Composants DSFR](dsfr-skill.md)` pour le cas d’une fiche DSFR.
- Dans un fichier situé dans `SKILLS/` : `../Makefile` désigne le Makefile racine.

**Pas de chaîne obligatoire :** revoir un diff ne lance pas automatiquement un audit d’architecture. Créer une fiche MDX peut nécessiter de consulter `dsfr`, mais les autres skills restent inutilisés. Un skill doit pouvoir produire son résultat sans dépendre d’un skill P1 non installé.

Les chemins se résolvent depuis `SKILLS/` : `../Makefile` désigne la racine et `dsfr-skill.md` un fichier voisin. Dans une session ouverte directement dans un clone Git imbriqué, fournir le chemin de la procédure du dépôt parent si nécessaire, sans modifier les instructions du clone.

### 4.8. Convention obligatoire des livrables et mémoire entre sessions

Les trois familles de fichiers sont placées **à la racine du dépôt**. `XXX` et `XX` désignent le sujet ; employer le même suffixe stable en majuscules avec underscores, par exemple : `RETOUR_EXEC_MEET_STARTUP.md`, `AUDIT_MEET_STARTUP.md`, `TODO_MEET_STARTUP.md`. Reprendre un fichier existant du sujet plutôt que créer des variantes concurrentes. Préserver les anciens fichiers et leur nommage, notamment `TODO_audit.md`, tant qu’une migration n’est pas demandée.

| Fichier | Contenu exact à maintenir | Producteur et lecteurs |
| --- | --- | --- |
| `RETOUR_EXEC_<SUJET>.md` | Objectif et périmètre ; liens TODO/audit ; vocabulaire utile ; décisions avec historique ; comparaison d’options si nécessaire ; expériences de prototype ; journal des actions réellement exécutées ; preuves et limites ; état de reprise. | `decision-memory`, `compare-designs`, `prototype`, `handoff` et tout skill exécutant une tâche du sujet. Lu avant conception, réalisation ou reprise. |
| `AUDIT_<SUJET>.md` | Date et état exact examiné ; critères du TODO ; fichiers et comportements revus ; contrôles réellement effectués ; constats avec gravité et preuve ; critères non évalués ; conclusion ; suivi des corrections et nouvelles vérifications. | `code-review`, `architecture-review` ou `rgaa-review` selon la portée. Le triage lit les constats pour alimenter le TODO. |
| `TODO_<SUJET>.md` | Objectif et périmètre ; besoin/spec si nécessaire ; liens décisions/audit ; tickets identifiés ; priorités et dépendances ; critères d’acceptation ; statut et preuves de fin. | `ticket-breakdown`, `triage`, `write-spec`, `refactor-plan` selon la demande ; lu et actualisé pendant l’implémentation. |

Les retours conservent les arbitrages de type ADR **dans la section Décisions**, sans créer de fichiers ADR séparés ni de glossaire autonome. Une décision prise avant exécution peut y figurer avec le statut « proposé » ou « accepté » : le journal d’exécution reste vide tant qu’aucune action n’a été réalisée.

#### Structure à inscrire dans RETOUR_EXEC_<SUJET>.md

```markdown
# Retour d’exécution — <sujet>

## Objectif et liens
Périmètre, date de mise à jour, branche/révision ou état local.
Liens vers TODO et AUDIT du sujet lorsqu’ils existent.

## Vocabulaire
Terme | Définition retenue | Distinction utile | Source ou décision

## Décisions
### DEC-001 — <titre>
Date ; statut : proposé / accepté / appliqué / remplacé.
Contexte et contraintes ; options ; choix et raison ; conséquences.
Preuves ; condition de réexamen ; décision remplacée ou remplaçante.

## Comparaison de conceptions
Options, contrats et différences ; matrice commune ; recommandation.
Liens vers DEC-* ; incertitudes et expériences requises.

## Expériences
EXP-001 : hypothèse, protocole, versions, attendu, observé,
conclusion, limites et sort des fichiers temporaires.

## Exécution
Entrées datées : ticket, action, fichiers, commande si utile,
résultat observé, vérification, limite ou erreur.

## Reprise
Objectif courant ; terminé ; en cours ; état Git et changements locaux ;
blocages ; prochaine action concrète ; fichiers à lire en premier.
```

Ne remplir que les sections pertinentes. Conserver les décisions remplacées, dater les nouvelles informations et distinguer une mesure d’une hypothèse. Ne jamais enregistrer de secrets ni présenter l’état ancien du dépôt comme l’état actuel.

#### Structure à inscrire dans AUDIT_<SUJET>.md

```markdown
# Audit — <sujet>

## Périmètre examiné
Date, révision/base, fichiers locaux inclus, critères TODO concernés.
Liens vers TODO_<SUJET>.md et RETOUR_EXEC_<SUJET>.md existants.

## Vérifications
Contrôle | Commande ou méthode | Résultat observé | Limite

## Constats
### AUD-001 — <titre>
Gravité ; axe : bug / besoin / convention / architecture / accessibilité.
Fichier:ligne ou parcours ; scénario ; attendu/observé ; preuve ; impact.
Correction proposée ; ticket associé ; statut ouvert/corrigé/revérifié.

## Couverture et conclusion
Critères satisfaits, en échec ou non évalués ; risques restants.
Aucun défaut trouvé si applicable, sans prétendre à une couverture totale.

## Revérifications
Date, nouvel état examiné, AUD-* concerné, contrôle et résultat.
```

Après une exécution de ticket, effectuer une revue proportionnée au changement et enregistrer le résultat dans `AUDIT_<SUJET>.md`. Le retour d’exécution décrit ce qui a été fait ; l’audit examine si cela répond aux critères et introduit des régressions. Ne pas convertir le résumé de l’implémentation en preuve de réussite. Une relecture par le même agent est possible ; signaler son périmètre, sans la qualifier d’indépendante. Une revue demandée seule produit aussi son `AUDIT_<SUJET>.md` sans modifier le code.

#### Structure d’un ticket dans TODO_<SUJET>.md

```markdown
# TODO — <sujet>

## Objectif et périmètre
Besoin, exclusions et liens vers retour/audit existants.

## Tickets
### T-001 — <résultat attendu>
- [ ] Terminé et vérifié
- Type : exploration / fonctionnalité / correction / refactoring / vérification
- Priorité : P0 / P1 / P2, avec justification
- Statut : à faire / en cours / bloqué / à vérifier / terminé
- Dépendances : aucun ou T-xxx
- Besoin ou constat source : critère, DEC-* ou AUD-* avec lien
- Périmètre : fichiers ou composant concernés
- Travail attendu : actions bornées
- Critères d’acceptation : comportements vérifiables
- Vérification : commande ou méthode adaptée
- Preuves de fin : entrée du RETOUR_EXEC et résultat de l’AUDIT
- Blocage éventuel et prochaine action
```

Un ticket ne passe à « terminé » et sa case n’est cochée que lorsque ses critères sont vérifiés. Un contrôle impossible reste « non évalué » dans l’audit et le ticket « à vérifier » ou « bloqué » selon la situation. Conserver les identifiants ; ne pas renuméroter après suppression ou regroupement. Le triage explique les priorités et relie les doublons au ticket conservé.

#### Liens et cycle de travail

```text
Besoin / conception / comparaison / prototype
                ↓
RETOUR_EXEC_<SUJET>.md : décisions et preuves de l’exploration
                ↓
TODO_<SUJET>.md : tickets, dépendances et critères
                ↓
Exécution → RETOUR_EXEC_<SUJET>.md : actions et résultats
                ↓
AUDIT_<SUJET>.md : vérification après exécution
                ↓
Triage → TODO_<SUJET>.md : corrections ou clôture vérifiée
                ↓
Passation → RETOUR_EXEC_<SUJET>.md : prochaine action de reprise
```

Liens concrets pour `MEET_STARTUP` :

- Depuis `TODO_MEET_STARTUP.md` : `[Décision DEC-001](RETOUR_EXEC_MEET_STARTUP.md#dec-001--titre)` ; utiliser l’ancre réelle du titre au moment de la rédaction.
- Depuis `AUDIT_MEET_STARTUP.md` : `[Tickets](TODO_MEET_STARTUP.md)` et `[Exécution](RETOUR_EXEC_MEET_STARTUP.md#exécution)`.
- Depuis `RETOUR_EXEC_MEET_STARTUP.md` : `[Audit](AUDIT_MEET_STARTUP.md)` et `[Travail restant](TODO_MEET_STARTUP.md)`.
- Depuis un fichier de `SKILLS/` vers un livrable : `../RETOUR_EXEC_MEET_STARTUP.md` ; rechercher le sujet réel au lieu de figer cet exemple dans toutes les procédures.

Les fichiers sont créés au premier contenu utile, jamais remplis avec des événements imaginaires. Ils n’exigent aucun outil de tickets externe. La passation ne crée pas de quatrième famille de documents : elle met à jour la section Reprise et fournit les trois liens utiles dans le compte rendu.

### 4.9. Appels des nouvelles compétences

- « Lis `SKILLS/decision-memory-skill.md` et consigne notre choix dans `RETOUR_EXEC_MEET_STARTUP.md`. »
- « Lis `SKILLS/compare-designs-skill.md` et compare deux solutions de lancement de Meet avec les mêmes critères. »
- « Lis `SKILLS/prototype-skill.md` et vérifie cette hypothèse de réseau dans un essai isolé. »
- « Lis `SKILLS/ticket-breakdown-skill.md` et découpe la solution retenue dans `TODO_MEET_STARTUP.md`. »
- « Lis `SKILLS/code-review-skill.md` et audite l’exécution du ticket T-001 dans `AUDIT_MEET_STARTUP.md`. »
- « Lis `SKILLS/triage-skill.md` et transforme les constats de l’audit en tickets priorisés. »
- « Lis `SKILLS/handoff-skill.md` et prépare la reprise dans `RETOUR_EXEC_MEET_STARTUP.md`. »

## 5. Contenu de AGENT.md : court et partagé

Le fichier contiendra ces cinq sections, sans recopier les procédures des skills :

1. **Périmètre** : racine d’orchestration, portail MDX, clones indépendants ; différence entre capacité upstream et commande câblée localement.
2. **Avant de modifier** : lire instructions, état Git, `RETOUR_EXEC_*`, `TODO_*` et `AUDIT_*` du sujet ainsi que les fichiers concernés ; préserver les changements en cours ; consulter les instructions propres à un clone avant d’y travailler.
3. **Choix du skill** : tableau intention/lien vers les skills effectivement créés, incluant les nouvelles compétences au lot P1 ; revue de diff, audit d’architecture et conception explicitement distincts ; chargement des seules compétences utiles.
4. **Exécution et vérification** : préserver données et variables locales, lire les effets du bootstrap, utiliser les commandes présentes dans le projet, vérifier le build/rendu ou le comportement selon la modification ; ne pas présenter une vérification non exécutée comme réussie.
5. **Compte rendu et maintenance** : rendre changements ou constats, preuves et limites ; mémoire dans `RETOUR_EXEC_<SUJET>.md`, revues après exécution dans `AUDIT_<SUJET>.md`, tickets dans `TODO_<SUJET>.md` ; maintenir le catalogue et les sources du skill modifié.

Pour ajouter une compétence : créer `SKILLS/<nom>-skill.md`, ajouter son lien dans `AGENT.md` et son entrée au catalogue, puis vérifier un cas nominal et un cas hors périmètre. Extraire une annexe seulement lorsque le fichier devient difficile à utiliser ou qu’une ressource est réellement réutilisée.

## 6. Plan de réalisation et définition de terminé

### Lot 1 — Sources et socle

- [x] Relever les familles de liens gouvernementaux et techniques du dépôt.
- [x] Consulter les six dépôts La Suite et rechercher les fichiers de skills et d’instructions usuels dans leurs arbres `main`.
- [x] Identifier et examiner les skills DSFR et data.gouv.fr existants.
- [ ] Inscrire dans chaque fichier `<nom>-skill.md` les sources utilisées, leur version/révision, l’attribution et les adaptations locales.
- [x] Auditer le catalogue initial à partir des skills de Matt Pocock et définir les contrats de revue, d’architecture et de conception.
- [ ] Vérifier la licence à la révision Matt Pocock retenue, les dépendances entre skills et les ressources associées avant toute réutilisation de contenu ; consigner chaque adaptation.
- [ ] Lire les ressources et scripts DSFR retenus ; relever les écarts avec la version verrouillée localement.
- [ ] Rédiger le court `AGENT.md` selon §5 et le point d’entrée `AGENTS.md` selon §4.2.
- [ ] Créer `SKILLS/README.md` et les sept fichiers P0 `<nom>-skill.md`, chacun autonome, selon §4.4.
- [ ] Vérifier les liens directs entre instructions, skills et fichiers existants du dépôt selon §4.7.
- [ ] Résoudre les liens locaux obsolètes et l’instruction `make install` avant de les présenter comme un parcours utilisable.

### Lot 2 — Vérifications concrètes

- [ ] Chaque fichier `<nom>-skill.md` commence par un titre clair et une description de son rôle ; son nom correspond à sa fonction.
- [ ] Vérifier tous les chemins relatifs, attributions et références reprises ; ne pas conserver de mentions de fichiers « toujours présents » sans contrôle.
- [ ] Tester le routage : une tâche MDX active `docs-mdx`, une demande d’accessibilité active `rgaa-review`, une question sans rapport n’active aucun de ces skills.
- [ ] Vérifier la lecture d’`AGENT.md` et le suivi de ses liens vers les fichiers de procédure, à la racine et dans `docs/` ; vérifier aussi un appel explicite par chemin depuis un clone imbriqué.
- [ ] Vérifier chaque fichier de l’arborescence du lot réalisé, ses sections attendues et ses liens.
- [ ] Tester le format de résultat décrit dans chaque skill sur un exemple représentatif ; consigner ici les résultats et les limites.
- [ ] Vérifier que les P0 fonctionnent sans les P1 et que les références sont résolues depuis leur emplacement canonique.
- [ ] Tester `code-review` sur un diff correct et un diff avec régression, incluant du travail non commité et un cas sans spec.
- [ ] Tester `architecture-review` sur un problème local documenté et un périmètre sans refonte justifiée ; vérifier que les recommandations citent des preuves.
- [ ] Tester `design-change` sur une évolution de l’orchestration ; vérifier contrats, alternatives, erreurs et étapes de validation.
- [ ] Auditer chaque skill avec la grille : déclencheur distinct, entrées disponibles, sortie vérifiable, limites claires, références accessibles et absence de dépendance imposée à un outil externe.
- [ ] Vérifier qu’une simple correction MDX n’active ni entretien exhaustif, ni audit global, ni tests sans rapport.
- [ ] Pour une modification documentaire, exécuter `npm run docs:build` et inspecter le diff de navigation générée ; faire une vérification visuelle si l’affichage est modifié.
- [ ] Pour l’orchestration, commencer par la lecture des fichiers ; effectuer le test de lancement dans un environnement de développement adapté et noter les services réellement démarrés.
- [ ] Vérifier que les instructions n’affirment ni audit RGAA complet ni intégration ProConnect opérationnelle sans preuves correspondantes.

### Lot 3 — Extension et maintenance

- [ ] Créer `decision-memory-skill.md`, `compare-designs-skill.md`, `prototype-skill.md`, `ticket-breakdown-skill.md`, `triage-skill.md` et `handoff-skill.md` selon les contrats du §3.
- [ ] Intégrer les conventions `RETOUR_EXEC_*`, `AUDIT_*` et `TODO_*` à tous les skills concernés et au routage d’`AGENT.md` ; remplacer tout ancien emplacement de mémoire ou de rapport.
- [ ] Tester une décision remplacée : historique préservé et nouveau choix identifiable dans le retour.
- [ ] Tester deux conceptions distinctes contre les mêmes scénarios ; justifier le choix et les incertitudes.
- [ ] Tester un prototype réfutant une hypothèse ; conserver la preuve sans annoncer une implémentation terminée.
- [ ] Tester le découpage en tickets : critères couverts, dépendances sans cycle, aucune case cochée sans preuve.
- [ ] Tester le cycle exécution → audit → triage : un défaut AUD-* produit ou rejoint un ticket T-* et ne disparaît pas avant revérification.
- [ ] Tester une passation en ne lisant que les fichiers du sujet et l’état du dépôt : prochaine action trouvable sans la conversation précédente.

- [ ] Ajouter les skills P1 sur la base des procédures réellement vérifiées.
- [ ] Ajouter `datagouv-apis` seulement à l’apparition d’un cas d’usage concret.
- [ ] Mettre à jour les références lors des changements de DSFR, React-DSFR, RGAA ou des fichiers upstream utilisés ; conserver une révision reproductible.
- [ ] À chaque évolution, tester un scénario représentatif du skill modifié et actualiser le catalogue, sans recopier des manuels complets.

**Socle P0 terminé lorsque :** les sept skills P0 sont utilisables, leurs sources traçables, `AGENT.md` est chargé par le client choisi, et les scénarios de validation ont un résultat consigné. **Extension demandée terminée lorsque :** les six compétences ajoutées et leur cycle `RETOUR_EXEC` / `AUDIT` / `TODO` sont également implémentés et vérifiés. La création de ce TODO ne coche pas ces étapes d’implémentation.

## 7. Limites de cette recherche

L’extension Matt Pocock porte sur les fichiers sources cités à une révision figée. Les scripts et toutes les références secondaires n’ont pas été audités ; aucun skill tiers n’a été installé ou exécuté. Les adaptations proposées restent à implémenter et à tester.

La recherche couvre les principales familles de liens utiles aux futurs skills, pas une vérification HTTP exhaustive de toutes les URL du dépôt. Les liens de salons Matrix, contacts, roadmaps, labels et pages marketing ne sont pas des instructions opérationnelles. Les guides ProConnect restent à vérifier. Aucun service applicatif n’a été démarré et aucun script upstream exécuté dans cette phase de recherche.
