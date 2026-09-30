Prends en charge la prochaine tâche prioritaire non cochée [ ] dans PLAN_ACTIONS.md (commence par l'identifiant le plus prioritaire ouvert, ex: R-01.01 ou T-xxx).

Applique la méthode rigoureuse définie dans AGENTS.md et GUIDELINES.md :

🔍 Analyse : Inspecte le code source et identifie la cause racine avant toute modification.
🛠️ Implémentation : Applique le correctif minimal et propre (0 any, 0 cast abusif, DSFR/Cunningham, conformité DINUM).
🧪 Validation : Lance et prouve le succès des tests automatisés (pytest, vitest, typecheck, lint ou docs:build).
📝 Traçabilité & Documentation à la racine :
Coche [x] la tâche traitée dans PLAN_ACTIONS.md avec la mention de la preuve datée.
Mets à jour ITERATION.md pour consigner le jalon réalisé, la métrique/statut d'avancement et la prochaine priorité.
📊 Compte-rendu concis :
Identifiant de la tâche clôturée
Fichiers modifiés
Résultat exact des commandes de tests exécutées
Prochaine tâche recommandée dans l'ordre logique du plan
