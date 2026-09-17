import { describe, expect, it } from 'vitest';
import { MOCK_SOURCES } from '../../src/mockSources';
import { SourceEntityType } from '../../src/types';

describe('MOCK_SOURCES dataset validation', () => {
  const expectedEntityTypes: SourceEntityType[] = [
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
  ];

  it('should contain all 12 sovereign entity categories', () => {
    expectedEntityTypes.forEach((type) => {
      expect(MOCK_SOURCES[type]).toBeDefined();
      expect(MOCK_SOURCES[type].length).toBeGreaterThan(0);
    });
  });

  it('each mock source should have mandatory fields', () => {
    Object.entries(MOCK_SOURCES).forEach(([type, items]) => {
      items.forEach((item) => {
        expect(item.entityType).toBe(type);
        expect(item.sourceId).toBeTruthy();
        expect(item.title).toBeTruthy();
        expect(['callout', 'card', 'link']).toContain(item.displayMode);
      });
    });
  });
});
