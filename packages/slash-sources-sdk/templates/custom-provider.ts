/**
 * Template de référence pour créer un connecteur d'API souveraine ministérielle
 * en moins de 15 minutes avec @suitenumerique/slash-sources-sdk.
 */

import {
    defineSourceProvider,
    type SourceEntityProps,
    type SourceSuggestResult,
} from '../src';

export interface MyMinistryApiItem {
  id: string;
  code_reference: string;
  libelle: string;
  description_complete?: string;
  url_demarche?: string;
  statut: 'ACTIF' | 'ARCHIVE' | 'EN_COURS';
  date_publication?: string;
}

/**
 * Connecteur souverain pour l'API ministérielle.
 * Utiliser defineSourceProvider() garantit le typage strict et l'immuabilité (Object.freeze).
 */
export const myMinistryProvider = defineSourceProvider({
  name: "Mon Ministère / Référentiel Métier",
  slashCommand: "/mon-api",
  entityType: "custom",
  description: "Recherche et insertion certifiée des fiches et démarches ministérielles",
  aliases: ["ministere", "demarche-gouv", "referentiel"],

  /**
   * 1. Autocomplétion rapide pendant la frappe (< 100ms)
   */
  suggest: async (query: string, limit: number = 5): Promise<SourceSuggestResult[]> => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    // Exemple d'appel API ministérielle REST / JSON
    // const response = await fetch(`https://api.mon-ministere.gouv.fr/v1/suggest?q=${encodeURIComponent(query)}&limit=${limit}`);
    // const data: MyMinistryApiItem[] = await response.json();

    return [
      {
        sourceId: `MIN-2026-001`,
        title: `Fiche Métier : ${query.trim()}`,
        subtitle: `Référentiel officiel du Ministère`,
        badgeText: `Vérifié`,
        badgeVariant: `success`,
      },
    ];
  },

  /**
   * 2. Recherche textuelle structurée (validation par Entrée)
   */
  search: async (query: string, limit: number = 10): Promise<SourceEntityProps[]> => {
    return [
      {
        sourceId: `MIN-2026-001`,
        entityType: `custom`,
        title: `Procédure d'Habilitation Ministérielle - ${query}`,
        subtitle: `Direction des Systèmes d'Information`,
        url: `https://demarches.mon-ministere.gouv.fr/procedures/001`,
        badgeText: `En vigueur`,
        badgeVariant: `success`,
        excerpt: `Procédure réglementaire régissant les accès aux réseaux ministériels sécurisés pour l'année 2026.`,
        metadata: {
          reference: `CIRCULAIRE-2026-042`,
          ministere: `Ministère de l'Intérieur / DINUM`,
          date_effet: `2026-01-01`,
        },
      },
    ];
  },

  /**
   * 3. Récupération des détails certifiés par ID
   */
  getDetail: async (sourceId: string): Promise<SourceEntityProps | null> => {
    if (!sourceId) return null;
    return {
      sourceId,
      entityType: `custom`,
      title: `Dossier Ministériel Référence ${sourceId}`,
      subtitle: `Fiche certifiée par l'autorité de tutelle`,
      url: `https://demarches.mon-ministere.gouv.fr/details/${sourceId}`,
      badgeText: `Certifié`,
      badgeVariant: `success`,
      excerpt: `Contenu complet de la fiche ministérielle avec références juridiques.`,
      metadata: {
        source_id: sourceId,
        date_verification: `2026-09-17`,
      },
    };
  },
});
