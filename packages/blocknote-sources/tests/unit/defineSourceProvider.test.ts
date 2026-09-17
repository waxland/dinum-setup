import { describe, expect, it } from 'vitest';
import { defineSourceProvider } from '../../src/defineSourceProvider';
import { SourceProviderDefinition } from '../../src/types';

describe('defineSourceProvider helper', () => {
  it('should validate and return a compliant source provider definition', () => {
    const customDef: SourceProviderDefinition = {
      type: 'custom',
      name: 'Casier Judiciaire National',
      iconName: 'gavel',
      slashCommand: 'casier',
      slashAliases: ['cjn', 'justice'],
      description: 'Extrait de casier judiciaire',
      suggest: async (q) => [{ id: '1', title: q, type: 'custom' }],
      search: async (q) => [
        {
          entityType: 'custom',
          displayMode: 'card',
          sourceId: '1',
          title: `Résultat ${q}`,
          status: 'Certifié',
        },
      ],
      getDetail: async (id) => ({
        entityType: 'custom',
        displayMode: 'card',
        sourceId: id,
        title: `Fiche ${id}`,
      }),
    };

    const registered = defineSourceProvider(customDef);
    expect(registered.type).toBe('custom');
    expect(registered.slashCommand).toBe('casier');
    expect(registered.name).toBe('Casier Judiciaire National');
  });

  it('should throw an error if required fields are missing', () => {
    // @ts-expect-error - intentional missing fields
    expect(() => defineSourceProvider({ name: 'Test' })).toThrowError();
    // @ts-expect-error - intentional missing fields
    expect(() => defineSourceProvider({ type: 'custom' })).toThrowError();
  });
});
