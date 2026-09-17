import { describe, expect, it } from 'vitest';
import { MOCK_SOURCES } from '../../src/mockSources';

describe('useSourceSearch Logic & Mocks', () => {
  it('has valid mock data for law provider', () => {
    const lawResults = MOCK_SOURCES['law'];
    expect(lawResults).toBeDefined();
    expect(lawResults.length).toBeGreaterThan(0);
    expect(lawResults[0]?.title).toContain('L. 111-1');
  });

  it('filters mock data by query correctly', () => {
    const query = 'commande';
    const filtered = (MOCK_SOURCES['law'] || []).filter((item) => {
      const q = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
        (item.summary && item.summary.toLowerCase().includes(q))
      );
    });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0]?.title).toContain('L. 111-1');
  });

  it('filters all 12 sovereign providers mock data without errors', () => {
    const allProviders = [
      'law',
      'company',
      'parliament',
      'address',
      'procurement',
      'grant',
      'insee',
      'agent',
      'cadastre',
      'demarche',
      'opendata',
      'custom',
    ] as const;

    for (const provider of allProviders) {
      const items = MOCK_SOURCES[provider];
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
      expect(items[0]?.sourceId).toBeDefined();
      expect(items[0]?.title).toBeDefined();
      expect(items[0]?.entityType).toBe(provider);
    }
  });
});
