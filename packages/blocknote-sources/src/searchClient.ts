import { isDisplayMode, isObjectRecord, isSourceEntityType, isStatusColor, SourceEntityProps, SourceEntityType } from './types';
import type { SupportedCountry } from './mockData';

export interface SourceSearchRequest {
  entityType: SourceEntityType;
  country: SupportedCountry;
  query: string;
  limit: number;
  signal: AbortSignal;
}

export type SourceSearchClient = (request: SourceSearchRequest) => Promise<SourceEntityProps[]>;

const optionalText = (value: unknown): string | undefined => typeof value === 'string' ? value : undefined;

/** Convert the public Django contract explicitly, leaving nested payload keys intact. */
export function parseSearchResponse(payload: unknown): SourceEntityProps[] {
  if (!isObjectRecord(payload) || !Array.isArray(payload.results)) {
    throw new Error('Invalid search response');
  }
  return payload.results.map((item: unknown) => {
    if (!isObjectRecord(item) || typeof item.source_id !== 'string' || !item.source_id
      || typeof item.title !== 'string' || !item.title
      || !isSourceEntityType(item.entity_type) || !isDisplayMode(item.display_mode)) {
      throw new Error('Invalid source record');
    }
    return {
      sourceId: item.source_id,
      entityType: item.entity_type,
      displayMode: item.display_mode,
      title: item.title,
      subtitle: optionalText(item.subtitle),
      status: optionalText(item.status),
      statusColor: isStatusColor(item.status_color) ? item.status_color : undefined,
      meta1: optionalText(item.meta1),
      meta2: optionalText(item.meta2),
      meta3: optionalText(item.meta3),
      excerpt: optionalText(item.excerpt),
      summary: optionalText(item.summary),
      url: optionalText(item.url),
      verifiedAt: optionalText(item.verified_at),
      retrievedAt: optionalText(item.retrieved_at),
      country: optionalText(item.country),
      freshness: item.delivery === 'cache' ? 'cached' : item.delivery === 'live' ? 'live' : undefined,
      provider: optionalText(item.provider),
      origin: item.origin === 'demo' || item.origin === 'upstream' ? item.origin : undefined,
      rawPayload: isObjectRecord(item.raw_payload) ? JSON.stringify(item.raw_payload) : undefined,
    };
  });
}

export function createHttpSourceClient(
  baseUrl = '/api/v1.0/sources',
  resolveProvider: (request: SourceSearchRequest) => string | undefined = ({ entityType, country }) => country === 'fr' ? entityType : undefined,
): SourceSearchClient {
  return async (request) => {
    const provider = resolveProvider(request);
    if (!provider) {throw new Error('Fournisseur indisponible pour ce pays.');}
    const params = new URLSearchParams({ type: provider, q: request.query, limit: String(request.limit) });
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/search/?${params}`, {
      signal: request.signal,
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {throw new Error('Authentification ou autorisation requise.');}
      if (response.status === 503) {throw new Error('Fournisseur indisponible.');}
      if (response.status === 429) {throw new Error('Limite de requetes atteinte. Reessayez plus tard.');}
      throw new Error(`Recherche impossible (HTTP ${response.status}).`);
    }
    const payload: unknown = await response.json();
    return parseSearchResponse(payload);
  };
}
