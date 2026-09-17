import { defineSourceProvider } from '../src';

/**
 * Démonstration autonome du SDK : création d'un connecteur d'API souveraine
 */
export const demoOpendataProvider = defineSourceProvider({
  name: "data.gouv.fr / Jeux de Données",
  slashCommand: "/opendata",
  entityType: "opendata",
  description: "Recherche de jeux de données ouverts de la République Française",
  aliases: ["data", "datagouv", "open-data"],

  suggest: async (query: string) => {
    if (!query) return [];
    return [
      {
        sourceId: "dataset-budget-2026",
        title: `Jeu de données : ${query}`,
        subtitle: "data.gouv.fr • Direction du Budget",
        badgeText: "Open Data",
        badgeVariant: "info",
      },
    ];
  },

  search: async (query: string) => {
    return [
      {
        sourceId: "dataset-budget-2026",
        entityType: "opendata",
        title: `Données Budgétaires Nationales 2026 - ${query}`,
        subtitle: "Ministère de l'Économie et des Finances",
        url: `https://www.data.gouv.fr/fr/datasets/budget-2026/`,
        badgeText: "Licence Ouverte v2.0",
        badgeVariant: "success",
        excerpt: "Données consolidées des dépenses et recettes publiques pour l'exercice 2026.",
        metadata: {
          format: "CSV / Parquet",
          frequence: "Annuelle",
          producteur: "DGFiP",
        },
      },
    ];
  },

  getDetail: async (sourceId: string) => {
    return {
      sourceId,
      entityType: "opendata",
      title: "Jeu de données certifié data.gouv.fr",
      url: `https://www.data.gouv.fr/fr/datasets/${sourceId}/`,
      badgeText: "Certifié DINUM",
      badgeVariant: "success",
      excerpt: "Fiche détaillée du jeu de données avec documentation des schémas.",
    };
  },
});

console.log("✅ Provider créé avec succès via defineSourceProvider() :");
console.log(demoOpendataProvider);
