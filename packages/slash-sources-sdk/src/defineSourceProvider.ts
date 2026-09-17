import { ExternalSourceProviderDefinition } from './types';

/**
 * Helper function to declare a type-safe external source provider for BlockNote.
 * Allows ministries, public operators and developers worldwide to implement a compliant connector in < 15 min.
 *
 * @example
 * ```typescript
 * import { defineSourceProvider } from '@blocknote/source-provider-sdk';
 *
 * export const justiceProvider = defineSourceProvider({
 *   name: 'Casier Judiciaire National',
 *   slashCommand: 'casier',
 *   slashAliases: ['cjn', 'justice', 'bulletin'],
 *   description: 'Consulter et référencer les textes du Casier Judiciaire',
 *   suggest: async (query) => [...],
 *   search: async (query) => [...],
 *   getDetail: async (id) => ({ ... }),
 * });
 * ```
 */
export function defineSourceProvider(
  definition: ExternalSourceProviderDefinition,
): ExternalSourceProviderDefinition {
  if (!definition.name || definition.name.trim().length === 0) {
    throw new Error('[SlashSourcesSDK] Provider definition must declare a non-empty `name`.');
  }
  if (!definition.slashCommand || definition.slashCommand.trim().length === 0) {
    throw new Error('[SlashSourcesSDK] Provider definition must declare a non-empty `slashCommand`.');
  }
  if (typeof definition.suggest !== 'function') {
    throw new Error('[SlashSourcesSDK] Provider definition must provide a `suggest` async method.');
  }
  if (typeof definition.search !== 'function') {
    throw new Error('[SlashSourcesSDK] Provider definition must provide a `search` async method.');
  }
  if (typeof definition.getDetail !== 'function') {
    throw new Error('[SlashSourcesSDK] Provider definition must provide a `getDetail` async method.');
  }

  const normalized = {
    ...definition,
    type: definition.type || 'custom',
    iconName: definition.iconName || 'database',
  };

  return Object.freeze(normalized);
}
