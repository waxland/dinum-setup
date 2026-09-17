import { describe, expect, it } from 'vitest';
import { defineSourceProvider } from '../src/defineSourceProvider';
import { SourceProviderDefinition } from '../src/types';

describe('defineSourceProvider', () => {
  it('creates and freezes a valid provider definition', () => {
    const validDef: SourceProviderDefinition = {
      type: 'custom',
      name: 'Test Source',
      iconName: 'database',
      slashCommand: 'test',
      slashAliases: ['t', 'testing'],
      description: 'Test provider description',
      suggest: async () => [],
      search: async () => [],
      getDetail: async () => null,
    };

    const provider = defineSourceProvider(validDef);
    expect(provider.name).toBe('Test Source');
    expect(provider.slashCommand).toBe('test');
    expect(Object.isFrozen(provider)).toBe(true);
  });

  it('throws an error if name is empty', () => {
    const invalidDef = {
      type: 'custom' as const,
      name: '',
      iconName: 'database',
      slashCommand: 'test',
      slashAliases: [],
      description: 'Test',
      suggest: async () => [],
      search: async () => [],
      getDetail: async () => null,
    };

    expect(() => defineSourceProvider(invalidDef)).toThrowError(
      '[SlashSourcesSDK] Provider definition must declare a non-empty `name`.',
    );
  });

  it('throws an error if slashCommand is empty', () => {
    const invalidDef = {
      type: 'custom' as const,
      name: 'Valid Name',
      iconName: 'database',
      slashCommand: '',
      slashAliases: [],
      description: 'Test',
      suggest: async () => [],
      search: async () => [],
      getDetail: async () => null,
    };

    expect(() => defineSourceProvider(invalidDef)).toThrowError(
      '[SlashSourcesSDK] Provider definition must declare a non-empty `slashCommand`.',
    );
  });
});
