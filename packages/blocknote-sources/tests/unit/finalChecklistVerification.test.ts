import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Final Checklist Verification (R-09.04)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");
  const planPath = path.join(rootDir, "PLAN_ACTIONS.md");

  it("verifies all 14 criteria in section 11.3 are checked [x]", () => {
    const content = fs.readFileSync(planPath, "utf-8");

    const expectedChecklistItems = [
      "Les 18 constats ont un état explicite, et chaque état validé possède une fiche de preuve.",
      "Installation propre et versions d'outils reproductibles ; aucun téléchargement implicite de runner.",
      "Lint, formatage, typage et suites applicables réussissent dans la configuration retenue.",
      "Recherche réellement connectée et insertion persistante d'une donnée absente des fixtures.",
      "Quotas, circuit et SSRF vérifiés dans les chemins de production, avec concurrence distribuée lorsque requise.",
      "Aucun fournisseur fictif présenté comme connecté ou vérifié ; capacités indisponibles explicitement affichées.",
      "Anciens documents et saisies utilisateur préservés.",
      "Archives npm/Python installées dans des environnements isolés ; exports réellement générés et inspectés.",
      "Parcours clavier, lecteur d'écran disponible, contrastes et analyse Axe documentés sans surdéclarer la conformité.",
      "Deux portails construits ; parcours SSR/hydratation contrôlés dans le navigateur.",
      "Mêmes contrôles requis en local et en CI ; publication dépendante de leur succès sur la même révision.",
      "Documentation, liens, règles d'ignore et rapports de validation à jour.",
      "Diff final relu ; aucune modification étrangère révoquée ; aucune configuration personnelle écrasée.",
      "Bilan final indique les corrections validées, les limitations et les éventuelles actions externes encore nécessaires.",
    ];

    for (const item of expectedChecklistItems) {
      const escapedItem = item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const itemRegex = new RegExp(`- \\[x\\] ${escapedItem}`);
      expect(content, `Section 11.3 checklist item '${item}' is not checked [x]`).toMatch(
        itemRegex,
      );
    }
  });

  it("verifies R-09.04 in section 12 is checked [x]", () => {
    const content = fs.readFileSync(planPath, "utf-8");
    expect(content).toContain("- [x] **R-09.04**");
  });
});
