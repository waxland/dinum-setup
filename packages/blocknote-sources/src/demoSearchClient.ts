import { ALL_INTERNATIONAL_MOCK_SOURCES } from './mockData';
import { MOCK_SOURCES } from './mockSources';
import { SourceSearchClient } from './searchClient';
import { isSourceEntityType, SourceEntityProps } from './types';

/** Explicit demonstration data, never a fallback for a failed HTTP request. */
export const demoSearchClient: SourceSearchClient = async ({ country, entityType, query, limit }) => {
  const pool: SourceEntityProps[] = country === 'fr' ? MOCK_SOURCES[entityType] || []
    : ALL_INTERNATIONAL_MOCK_SOURCES.filter((item) => item.country === country)
      .filter((item) => item.entityType === entityType || (entityType === 'insee' && item.entityType === 'statistics'))
      .map((item) => ({
        entityType: isSourceEntityType(item.entityType) ? item.entityType : entityType,
        displayMode: item.displayMode,
        sourceId: item.sourceId || item.id || '',
        title: item.title,
        subtitle: item.subtitle,
        excerpt: item.excerpt || item.snippet,
        summary: item.summary,
        url: item.url,
      }));
  const normalized = query.trim().toLocaleLowerCase();
  return pool.filter((item) => [item.title, item.subtitle, item.excerpt, item.summary, item.meta1]
    .some((text) => text?.toLocaleLowerCase().includes(normalized)))
    .slice(0, limit).map((item) => ({ ...item, country, provider: `demo-${country}-${entityType}`, status: 'Demonstration', statusColor: 'gray', origin: 'demo', verifiedAt: undefined }));
};
