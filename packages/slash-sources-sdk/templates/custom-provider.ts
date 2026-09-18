/**
 * Reference template for building a sovereign/public API connector
 * in under 15 minutes with @suitenumerique/slash-sources-sdk.
 */

import {
    defineSourceProvider,
    type SourceEntityProps,
    type SourceSuggestResult,
} from '../src';

export interface MyMinistryApiItem {
  id: string;
  code_reference: string;
  label: string;
  full_description?: string;
  procedure_url?: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'PENDING';
  published_at?: string;
}

/**
 * Sovereign connector for ministry / public agency API.
 * defineSourceProvider() ensures strict typing and immutability (Object.freeze).
 */
export const myMinistryProvider = defineSourceProvider({
  name: "Ministry Public Records API",
  slashCommand: "/my-api",
  entityType: "custom",
  description: "Search and insert certified public records and official administrative procedures",
  aliases: ["records", "agency", "registry"],

  /**
   * 1. Fast as-you-type autocomplete (< 100ms)
   */
  suggest: async (query: string, limit: number = 5): Promise<SourceSuggestResult[]> => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    // Example REST/JSON API call
    // const response = await fetch(`https://api.example.gov/v1/suggest?q=${encodeURIComponent(query)}&limit=${limit}`);
    // const data: MyMinistryApiItem[] = await response.json();

    return [
      {
        sourceId: `REC-2026-001`,
        title: `Public Record: ${query.trim()}`,
        subtitle: `Official Agency Registry`,
        badgeText: `Verified`,
        badgeVariant: `success`,
      },
    ];
  },

  /**
   * 2. Structured text search (on Enter / Search submission)
   */
  search: async (query: string, limit: number = 10): Promise<SourceEntityProps[]> => {
    return [
      {
        sourceId: `REC-2026-001`,
        entityType: `custom`,
        title: `Official Administrative Procedure - ${query}`,
        subtitle: `Information Systems Directorate`,
        url: `https://procedures.example.gov/001`,
        badgeText: `In effect`,
        badgeVariant: `success`,
        excerpt: `Regulatory procedure governing secure network access authorization for year 2026.`,
        metadata: {
          reference: `CIRCULAR-2026-042`,
          agency: `Ministry / Public Digital Authority`,
          effective_date: `2026-01-01`,
        },
      },
    ];
  },

  /**
   * 3. Fetch certified detail by ID
   */
  getDetail: async (sourceId: string): Promise<SourceEntityProps | null> => {
    return {
      sourceId,
      entityType: `custom`,
      title: `Certified Record ${sourceId}`,
      subtitle: `Official Authority Registry`,
      url: `https://procedures.example.gov/${encodeURIComponent(sourceId)}`,
      badgeText: `Official`,
      badgeVariant: `success`,
      excerpt: `Detailed record specification and legal grounds.`,
    };
  },
});
