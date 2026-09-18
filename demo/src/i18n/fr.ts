import type { DemoTranslations } from "./types";

export const frTranslations: DemoTranslations = {
  nav: {
    title: "Docs",
    documentation: "Documentation",
    github: "GitHub",
    themeLight: "Thème clair",
    themeDark: "Thème sombre",
    reset: "Réinitialiser",
    selectLanguage: "Langue de l'interface",
  },
  hero: {
    tag: "Démonstrateur Officiel",
    title: "Connecteurs Souverains & BlockNote",
    description:
      "Intégration directe des données certifiées de l'État et d'Europe (Légifrance, Annuaire Entreprises, BAN, BOAMP, EUR-Lex, Albert IA) au cœur de l'éditeur.",
    countryLabel: "Sélectionner un jeu de données souverain :",
    quickInsertLabel: "Insertion rapide :",
  },
  editor: {
    initialTitlePrefix: "Démonstrateur Officiel — ",
    initialTitleSuffix: "La Suite Docs / Connecteurs Souverains",
    instructionBlock: " pour insérer un bloc riche souverain ou ",
    instructionInline: " pour lier une référence certifiée dans le texte :",
    interlinkExample: "Exemple d'interlinking certifié dans la phrase : ",
    consultation: " puis consultation de ",
    slashGroupTitle: "Sources Officielles & Souveraines",
    emptySearchPlaceholder: "Tapez / pour insérer un bloc ou @ pour citer une source...",
    datasetLoaded: "Jeu de données souverain chargé :",
  },
  footer: {
    entity: "La Suite Numérique • Direction Interministérielle du Numérique (DINUM)",
    compliance: "Licence MIT • Conforme RGAA v4.1 AA",
  },
};
