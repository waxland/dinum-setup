import { defineSourceProvider } from '../src';

/**
 * Standalone SDK demonstration: creating an open data source connector
 */
export const demoOpendataProvider = defineSourceProvider({
  name: "data.gouv.fr / Open Datasets",
  slashCommand: "/opendata",
  entityType: "opendata",
  description: "Search open data datasets from official public portals",
  aliases: ["data", "datagouv", "open-data"],

  suggest: async (query: string) => {
    if (!query) return [];
    return [
      {
        sourceId: "dataset-budget-2026",
        title: `Dataset: ${query}`,
        subtitle: "data.gouv.fr • Budget Directorate",
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
        title: `National Budget Data 2026 - ${query}`,
        subtitle: "Ministry of Economy and Finance",
        url: `https://www.data.gouv.fr/en/datasets/budget-2026/`,
        badgeText: "Open License v2.0",
        badgeVariant: "success",
        excerpt: "Consolidated public expenditure and revenue data for fiscal year 2026.",
        metadata: {
          format: "CSV / Parquet",
          frequency: "Annual",
          producer: "DGFiP",
        },
      },
    ];
  },

  getDetail: async (sourceId: string) => {
    return {
      sourceId,
      entityType: "opendata",
      title: "Certified Open Dataset data.gouv.fr",
      url: `https://www.data.gouv.fr/en/datasets/${sourceId}/`,
      badgeText: "Certified DINUM",
      badgeVariant: "success",
      excerpt: "Detailed dataset record with schema documentation.",
    };
  },
});

console.log("✅ Provider created successfully via defineSourceProvider():");
console.log(demoOpendataProvider);
