Voici la version complète en français, directement réutilisable comme documentation.

```md
# API Légifrance — `/suggest`, `/search` et collections juridiques

## Vue d’ensemble

L’API officielle Légifrance est exposée via la plateforme gouvernementale PISTE.

### URL de base — Production

```text
https://api.piste.gouv.fr/dila/legifrance/lf-engine-app
```

# Sources officielles

Documentation Légifrance — Open Data et API :

https://www.legifrance.gouv.fr/contenu/pied-de-page/open-data-et-api

FAQ API Légifrance :

https://www.legifrance.gouv.fr/contenu/pied-de-page/foire-aux-questions-api

Plateforme PISTE :

https://piste.gouv.fr/

### URL de base — Sandbox

```text
https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app
```

Les deux endpoints principaux pour construire un moteur de recherche sont :

```text
POST /suggest
POST /search
```

Ils ont des rôles différents :

| Endpoint | Usage |
|---|---|
| `/suggest` | Autocomplétion / suggestions rapides |
| `/search` | Recherche juridique complète |
| `/consult/...` | Récupération du contenu détaillé d’un document connu |

---

# 1. `/suggest`

## Endpoint

```http
POST https://api.piste.gouv.fr/dila/legifrance/lf-engine-app/suggest
```

Authentification :

```http
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json
Accept: application/json
```

## Exemple minimal

```json
{
  "searchText": "pouvoir des préfets",
  "supplies": [
    "ALL"
  ]
}
```

- `searchText` : texte saisi par l’utilisateur.
- `supplies` : collections dans lesquelles Légifrance doit chercher des suggestions.

---

# 2. Valeurs possibles pour `supplies`

Le Swagger expose notamment les valeurs suivantes :

```text
ALL
ALL_SUGGEST

LODA_LIST
LODA_RELEASE_DATE
LODA_RELEASE_DATE_SUGGEST
LODA_LEGAL_STATUS

CODE_LIST
CODE_RELEASE_DATE
CODE_RELEASE_DATE_SUGGEST
CODE_LEGAL_STATUS

KALI
KALI_TEXT

CONSTIT
CETAT
JURI
JUFI
JORF
JORF_SUGGEST
CNIL
ARTICLE
CIRC
ACCO
PDF
```

---

# 3. Collections globales

## `ALL`

Recherche sur l’ensemble des collections supportées.

Exemple :

```json
{
  "searchText": "décret pouvoir préfet",
  "supplies": ["ALL"]
}
```

À utiliser lorsque le type de document recherché n’est pas connu.

---

## `ALL_SUGGEST`

Index global spécifiquement orienté autocomplétion.

Il correspond davantage à une logique de barre de recherche avec suggestions.

Exemple :

```json
{
  "searchText": "décret relatif au pouvoir",
  "supplies": ["ALL_SUGGEST"]
}
```

---

# 4. Collections LODA

`LODA` correspond principalement aux textes législatifs et réglementaires consolidés :

- lois ;
- ordonnances ;
- décrets ;
- arrêtés ;
- autres textes réglementaires.

---

## `LODA_LIST`

Liste / suggestion de textes LODA.

Exemple :

```json
{
  "searchText": "décret préfet",
  "supplies": ["LODA_LIST"]
}
```

---

## `LODA_RELEASE_DATE`

Index LODA organisé autour de la version d’un texte à une date donnée.

Correspond conceptuellement à :

```text
/search → LODA_DATE
```

---

## `LODA_RELEASE_DATE_SUGGEST`

Version orientée suggestion/autocomplétion de l’index LODA par date/version.

---

## `LODA_LEGAL_STATUS`

Index LODA organisé selon l’état juridique du texte.

Correspond conceptuellement à :

```text
/search → LODA_ETAT
```

Exemples d’états :

```text
VIGUEUR
ABROGE
VIGUEUR_DIFF
```

---

# 5. Collections CODE

Ces collections concernent les codes juridiques français.

Exemples :

- Code civil ;
- Code pénal ;
- Code du travail ;
- Code de l’environnement ;
- Code général des collectivités territoriales ;
- etc.

---

## `CODE_LIST`

Liste et suggestions de codes.

Exemple :

```json
{
  "searchText": "code général collectivités",
  "supplies": ["CODE_LIST"]
}
```

---

## `CODE_RELEASE_DATE`

Recherche par version d’un code à une date donnée.

Correspond conceptuellement à :

```text
/search → CODE_DATE
```

---

## `CODE_RELEASE_DATE_SUGGEST`

Version orientée autocomplétion de `CODE_RELEASE_DATE`.

---

## `CODE_LEGAL_STATUS`

Recherche par état juridique des articles ou dispositions d’un code.

Correspond conceptuellement à :

```text
/search → CODE_ETAT
```

---

# 6. Journal officiel

## `JORF`

Journal officiel de la République française.

Il contient notamment les publications originales de :

- lois ;
- décrets ;
- arrêtés ;
- nominations ;
- décisions ;
- autres actes officiels.

Exemple :

```json
{
  "searchText": "pouvoir des préfets",
  "supplies": ["JORF"]
}
```

---

## `JORF_SUGGEST`

Index d’autocomplétion dédié au Journal officiel.

Exemple :

```json
{
  "searchText": "décret relatif au pouvoir",
  "supplies": ["JORF_SUGGEST"]
}
```

---

# 7. Jurisprudence

## `JURI`

Jurisprudence judiciaire.

Principalement :

- Cour de cassation ;
- cours d’appel ;
- juridictions judiciaires présentes dans le corpus.

Correspondance `/search` :

```text
JURI
```

---

## `CETAT`

Jurisprudence administrative.

Notamment :

- Conseil d’État ;
- cours administratives d’appel ;
- tribunaux administratifs selon le corpus disponible.

Correspondance `/search` :

```text
CETAT
```

---

## `CONSTIT`

Décisions du Conseil constitutionnel.

Correspondance `/search` :

```text
CONSTIT
```

---

## `JUFI`

Jurisprudence financière.

Cette collection peut notamment concerner des décisions provenant des juridictions financières selon le corpus disponible.

Il n’existe pas nécessairement de correspondance directe avec un `fond` `/search` générique exposé de la même manière.

---

# 8. CNIL

## `CNIL`

Délibérations et décisions de la CNIL.

Correspondance `/search` :

```text
CNIL
```

Exemple :

```json
{
  "searchText": "données biométriques",
  "supplies": ["CNIL"]
}
```

---

# 9. Conventions collectives

## `KALI`

Conventions collectives.

Correspondance `/search` :

```text
KALI
```

Exemple :

```json
{
  "searchText": "syntec",
  "supplies": ["KALI"]
}
```

---

## `KALI_TEXT`

Textes internes ou contenus détaillés appartenant aux conventions collectives.

Plus granulaire que `KALI`.

---

# 10. Circulaires

## `CIRC`

Circulaires et instructions administratives.

Correspondance `/search` :

```text
CIRC
```

Exemple :

```json
{
  "searchText": "organisation services préfectoraux",
  "supplies": ["CIRC"]
}
```

---

# 11. Accords d’entreprise

## `ACCO`

Accords d’entreprise.

Correspondance `/search` :

```text
ACCO
```

---

# 12. Articles

## `ARTICLE`

Index de suggestions au niveau des articles.

Utile lorsqu’un utilisateur saisit directement une référence d’article.

Exemple :

```json
{
  "searchText": "L2122-21",
  "supplies": ["ARTICLE"]
}
```

---

# 13. PDF

## `PDF`

Index associé à des documents PDF référencés ou indexés par Légifrance.

À ne pas confondre avec un fonds juridique principal de `/search`.

---

# 14. `/search`

Contrairement à `/suggest`, `/search` effectue une vraie recherche structurée et retourne des résultats juridiques.

Endpoint :

```http
POST https://api.piste.gouv.fr/dila/legifrance/lf-engine-app/search
```

Structure générale :

```json
{
  "fond": "LODA_DATE",
  "recherche": {
    "champs": [],
    "filtres": [],
    "pageNumber": 1,
    "pageSize": 10,
    "operateur": "ET",
    "sort": "PERTINENCE",
    "typePagination": "DEFAUT"
  }
}
```

---

# 15. Principaux `fond` possibles dans `/search`

```text
JORF
CNIL
CETAT
JURI
CONSTIT
KALI
CODE_DATE
CODE_ETAT
LODA_DATE
LODA_ETAT
ALL
CIRC
ACCO
```

Les valeurs de `/search` ne sont donc pas strictement identiques aux valeurs de `supplies` de `/suggest`.

---

# 16. Mapping `/suggest` → `/search`

Il n’existe pas toujours de correspondance stricte 1:1.

Le mapping pratique peut être résumé ainsi :

| `/suggest` supply | `/search` fond | Signification |
|---|---|---|
| `ALL` | `ALL` | Tous les fonds |
| `ALL_SUGGEST` | `ALL` | Suggestions globales → recherche globale |
| `JORF` | `JORF` | Journal officiel |
| `JORF_SUGGEST` | `JORF` | Autocomplétion JORF |
| `LODA_LIST` | `LODA_DATE` ou `LODA_ETAT` | Lois, décrets, arrêtés |
| `LODA_RELEASE_DATE` | `LODA_DATE` | LODA par version/date |
| `LODA_RELEASE_DATE_SUGGEST` | `LODA_DATE` | Suggestions LODA par version |
| `LODA_LEGAL_STATUS` | `LODA_ETAT` | LODA par état juridique |
| `CODE_LIST` | `CODE_DATE` ou `CODE_ETAT` | Codes juridiques |
| `CODE_RELEASE_DATE` | `CODE_DATE` | Codes par version/date |
| `CODE_RELEASE_DATE_SUGGEST` | `CODE_DATE` | Suggestions codes par version |
| `CODE_LEGAL_STATUS` | `CODE_ETAT` | Codes par état juridique |
| `KALI` | `KALI` | Conventions collectives |
| `KALI_TEXT` | `KALI` | Contenu des conventions |
| `CONSTIT` | `CONSTIT` | Conseil constitutionnel |
| `CETAT` | `CETAT` | Jurisprudence administrative |
| `JURI` | `JURI` | Jurisprudence judiciaire |
| `CNIL` | `CNIL` | CNIL |
| `CIRC` | `CIRC` | Circulaires |
| `ACCO` | `ACCO` | Accords d’entreprise |
| `ARTICLE` | Selon le corpus | Recherche/suggestion d’articles |
| `PDF` | Pas d’équivalent générique direct | Documents PDF |
| `JUFI` | Pas de mapping générique direct évident | Jurisprudence financière |

---

# 17. Différence entre `_DATE` et `_ETAT`

Cette différence est importante pour `CODE` et `LODA`.

## `_DATE`

Permet de rechercher le droit applicable à une date donnée.

Exemples :

```text
CODE_DATE
LODA_DATE
```

Cas d’usage :

> Quelle était la version de cet article au 1er janvier 2020 ?

ou :

> Quel texte était applicable à cette date ?

---

## `_ETAT`

Permet de rechercher selon l’état juridique actuel ou enregistré du texte.

Exemples :

```text
CODE_ETAT
LODA_ETAT
```

États possibles :

```text
VIGUEUR
ABROGE
VIGUEUR_DIFF
```

En simplifiant :

```text
_DATE = droit à une date donnée
_ETAT = droit selon son état juridique
```

---

# 18. Champs de recherche utiles dans `/search`

L’API expose notamment des champs comme :

```text
ALL
TITLE
TABLE
NOR
NUM
NUM_DELIB
NUM_DEC
NUM_ARTICLE
ARTICLE
MINISTERE
VISA
NOTICE
VISA_NOTICE
TRAVAUX_PREP
SIGNATURE
NOTA
NUM_AFFAIRE
ABSTRATS
RESUMES
TEXTE
ECLI
NUM_LOI_DEF
TYPE_DECISION
NUMERO_INTERNE
REF_PUBLI
RESUME_CIRC
TEXTE_REF
TITRE_LOI_DEF
RAISON_SOCIALE
MOTS_CLES
IDCC
```

Tous les champs ne sont pas forcément pertinents pour tous les fonds.

---

# 19. Types de recherche

L’API permet notamment :

```text
UN_DES_MOTS
EXACTE
TOUS_LES_MOTS_DANS_UN_CHAMP
AUCUN_DES_MOTS
AUCUNE_CORRESPONDANCE_A_CETTE_EXPRESSION
```

## `UN_DES_MOTS`

Cherche un ou plusieurs mots.

```json
{
  "typeRecherche": "UN_DES_MOTS",
  "valeur": "pouvoir préfet"
}
```

---

## `EXACTE`

Recherche exacte.

```json
{
  "typeRecherche": "EXACTE",
  "valeur": "2026-123"
}
```

Particulièrement utile pour :

- numéro de texte ;
- numéro d’article ;
- NOR ;
- numéro d’affaire ;
- référence précise.

---

## `TOUS_LES_MOTS_DANS_UN_CHAMP`

Tous les mots doivent être présents.

```json
{
  "typeRecherche": "TOUS_LES_MOTS_DANS_UN_CHAMP",
  "valeur": "pouvoir des préfets"
}
```

---

# 20. Proximité entre les mots

Certaines recherches textuelles permettent également une notion de `proximite`.

Exemple :

```json
{
  "typeRecherche": "UN_DES_MOTS",
  "valeur": "pouvoir préfet",
  "proximite": 3,
  "operateur": "ET"
}
```

Cela permet de rechercher des mots proches les uns des autres dans un texte.

C’est intéressant pour obtenir une recherche plus pertinente sans utiliser de recherche vectorielle ou d’embeddings.

---

# 21. Exemple : rechercher un décret relatif aux pouvoirs des préfets

Pour :

```text
décret relatif au pouvoir des préfets
```

Une requête `/suggest` pertinente serait :

```json
{
  "searchText": "décret relatif au pouvoir des préfets",
  "supplies": [
    "JORF_SUGGEST",
    "LODA_RELEASE_DATE_SUGGEST"
  ]
}
```

Ou, pour couvrir l’ensemble des corpus :

```json
{
  "searchText": "décret relatif au pouvoir des préfets",
  "supplies": [
    "ALL_SUGGEST"
  ]
}
```

---

# 22. Puis lancer la vraie recherche

Une fois la requête validée par l’utilisateur, passer sur `/search`.

Exemple :

```json
{
  "fond": "LODA_DATE",
  "recherche": {
    "champs": [
      {
        "typeChamp": "ALL",
        "criteres": [
          {
            "typeRecherche": "TOUS_LES_MOTS_DANS_UN_CHAMP",
            "valeur": "pouvoir des préfets",
            "operateur": "ET"
          }
        ],
        "operateur": "ET"
      }
    ],
    "filtres": [],
    "pageNumber": 1,
    "pageSize": 20,
    "operateur": "ET",
    "sort": "PERTINENCE",
    "typePagination": "DEFAUT"
  }
}
```

---

# 23. Architecture recommandée

Pour construire une vraie interface de recherche :

```text
Utilisateur saisit du texte
        ↓
POST /suggest
        ↓
Affichage de 5 à 10 suggestions
        ↓
L’utilisateur sélectionne une suggestion
ou appuie sur Entrée
        ↓
POST /search
        ↓
Résultats juridiques structurés
        ↓
Récupération de l’identifiant du document
        ↓
/consult/...
        ↓
Contenu complet du document
```

Il ne faut donc pas considérer `/suggest` comme le moteur de recherche principal.

`/suggest` sert principalement à :

- autocompléter ;
- détecter une référence ;
- proposer un texte ;
- orienter l’utilisateur vers le bon corpus.

---

# 24. Stratégie recommandée pour une barre de recherche Légifrance

## Pendant la saisie

```json
{
  "searchText": "<requête utilisateur>",
  "supplies": ["ALL_SUGGEST"]
}
```

## Quand l’utilisateur valide

Commencer avec :

```text
fond = ALL
```

Puis permettre de restreindre le corpus.

Filtres UI possibles :

```text
Tous
Textes législatifs et réglementaires
Codes
Journal officiel
Jurisprudence administrative
Jurisprudence judiciaire
Conseil constitutionnel
CNIL
Conventions collectives
Circulaires
Accords d’entreprise
```

Mapping interne :

```text
Tous                          → ALL
Textes réglementaires        → LODA_DATE / LODA_ETAT
Codes                         → CODE_DATE / CODE_ETAT
Journal officiel              → JORF
Jurisprudence administrative → CETAT
Jurisprudence judiciaire     → JURI
Conseil constitutionnel      → CONSTIT
CNIL                         → CNIL
Conventions collectives      → KALI
Circulaires                  → CIRC
Accords d’entreprise         → ACCO
```

---

# 25. Modèle simplifié recommandé pour un MCP ou SDK

Pour éviter d’exposer directement à un LLM les noms internes de Légifrance :

```ts
type LegifranceCorpus =
  | "all"
  | "legislation"
  | "codes"
  | "official_journal"
  | "administrative_case_law"
  | "judicial_case_law"
  | "constitutional_case_law"
  | "cnil"
  | "collective_agreements"
  | "circulars"
  | "company_agreements";
```

Puis effectuer le mapping en interne :

```ts
const corpusMap = {
  all: "ALL",
  legislation: "LODA_DATE",
  codes: "CODE_DATE",
  official_journal: "JORF",
  administrative_case_law: "CETAT",
  judicial_case_law: "JURI",
  constitutional_case_law: "CONSTIT",
  cnil: "CNIL",
  collective_agreements: "KALI",
  circulars: "CIRC",
  company_agreements: "ACCO",
};
```

Pour une recherche historique, utiliser :

```text
LODA_DATE
CODE_DATE
```

Pour une recherche orientée état juridique :

```text
LODA_ETAT
CODE_ETAT
```

---

# 26. Exemple cURL — `/suggest`

```bash
curl \
  --request POST \
  --url 'https://api.piste.gouv.fr/dila/legifrance/lf-engine-app/suggest' \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "searchText": "décret relatif au pouvoir des préfets",
    "supplies": [
      "ALL_SUGGEST"
    ]
  }'
```

---

# 27. Exemple cURL — `/search`

```bash
curl \
  --request POST \
  --url 'https://api.piste.gouv.fr/dila/legifrance/lf-engine-app/search' \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "fond": "LODA_DATE",
    "recherche": {
      "champs": [
        {
          "typeChamp": "ALL",
          "criteres": [
            {
              "typeRecherche": "TOUS_LES_MOTS_DANS_UN_CHAMP",
              "valeur": "pouvoir des préfets",
              "operateur": "ET"
            }
          ],
          "operateur": "ET"
        }
      ],
      "filtres": [],
      "pageNumber": 1,
      "pageSize": 20,
      "operateur": "ET",
      "sort": "PERTINENCE",
      "typePagination": "DEFAUT"
    }
  }'
```

---

# 28. Différence avec `www.legifrance.gouv.fr/suggest/search`

Le site Légifrance utilise également un endpoint frontend :

```text
https://www.legifrance.gouv.fr/suggest/search
```

avec par exemple :

```text
query
fonds
searchField
page
init
```

Exemple :

```text
https://www.legifrance.gouv.fr/suggest/search?query=décret&fonds=ALL
```

Cet endpoint n’est pas équivalent à l’API officielle PISTE.

Il dépend potentiellement de :

- cookies de session ;
- `JSESSIONID` ;
- load balancer ;
- Cloudflare ;
- headers navigateur ;
- état de session du site.

Pour une application, un backend, un MCP ou un SDK, il vaut mieux utiliser :

```text
https://api.piste.gouv.fr/dila/legifrance/lf-engine-app
```

---

# 29. Résumé des `supplies` de `/suggest`

```text
ALL
ALL_SUGGEST

LODA_LIST
LODA_RELEASE_DATE
LODA_RELEASE_DATE_SUGGEST
LODA_LEGAL_STATUS

CODE_LIST
CODE_RELEASE_DATE
CODE_RELEASE_DATE_SUGGEST
CODE_LEGAL_STATUS

KALI
KALI_TEXT

CONSTIT
CETAT
JURI
JUFI

JORF
JORF_SUGGEST

CNIL
ARTICLE
CIRC
ACCO
PDF
```

---

# 30. Résumé des `fond` de `/search`

```text
ALL

JORF

LODA_DATE
LODA_ETAT

CODE_DATE
CODE_ETAT

CETAT
JURI
CONSTIT

CNIL
KALI
CIRC
ACCO
```

---

# 31. Mapping essentiel à retenir

```text
ALL_SUGGEST
    ↓
ALL

JORF_SUGGEST
    ↓
JORF

LODA_RELEASE_DATE_SUGGEST
    ↓
LODA_DATE

LODA_LEGAL_STATUS
    ↓
LODA_ETAT

CODE_RELEASE_DATE_SUGGEST
    ↓
CODE_DATE

CODE_LEGAL_STATUS
    ↓
CODE_ETAT

CETAT
    ↓
CETAT

JURI
    ↓
JURI

CONSTIT
    ↓
CONSTIT

CNIL
    ↓
CNIL

KALI
    ↓
KALI

CIRC
    ↓
CIRC

ACCO
    ↓
ACCO
```

---

# 32. Recommandation pratique

Pour un moteur de recherche généraliste :

### Autocomplétion

```json
{
  "searchText": "<texte>",
  "supplies": ["ALL_SUGGEST"]
}
```

### Recherche complète

```text
/search
fond = ALL
```

Puis détecter automatiquement la nature de la requête.

Exemples :

```text
"L2121-1"
→ ARTICLE / CODE

"Code du travail"
→ CODE_LIST puis CODE_DATE

"Décret du 12 mai 2024"
→ JORF + LODA_DATE

"Conseil d'État 12 mars 2022"
→ CETAT

"Cour de cassation 2024"
→ JURI

"CNIL biométrie"
→ CNIL

"Convention Syntec"
→ KALI
```

Cette stratégie permet d’utiliser `/suggest` comme couche d’orientation, puis `/search` comme véritable moteur de recherche juridique.

---

```