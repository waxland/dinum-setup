Reprends l’exécution de PLAN_ACTIONS.md au prochain point

Lis AGENTS.md, GUIDELINES.md et les skills applicables. Vérifie
l’état Git et les preuves existantes, puis exécute une seule
sous-étape R-* éligible de bout en bout.

Préserve les changements existants et les travaux déjà validés.
Implémente les corrections nécessaires, ajoute les tests pertinents,
exécute les contrôles adaptés et npm run docs:build, puis relis le diff.
Ne masque aucun échec et n’affaiblis aucun test pour obtenir un succès.

Mets à jour PLAN_ACTIONS.md et le suivi .sessions/ :
- coche uniquement ce qui est réellement terminé et vérifié ;
- précise les commandes exécutées, résultats et preuves ;
- laisse ouverts les éléments partiels, bloqués ou non vérifiés ;
- indique exactement la prochaine sous-étape.

Si un blocage externe empêche d’avancer, documente sa cause et la
prochaine action indépendante possible, sans déclarer le point résolu.
Ne fais aucun commit, push, déploiement ou publication.

Termine par un bilan bref : réalisé, vérifications, reste, prochain ID.
Attends ensuite mon message « continue » pour l’étape suivante