import { SourceProviderDefinition } from './types';

/**
 * Helper function to declare a type-safe sovereign source provider for La Suite Numérique.
 * Allows ministries, public operators and developers to implement a compliant connector in < 15 min.
 *
 * @example
 * ```typescript
 * import { defineSourceProvider } from '@suitenumerique/slash-sources-sdk';
 *
 * export const justiceProvider = defineSourceProvider({
 *   type: 'custom',
 *   name: 'Casier Judiciaire National',
 *   iconName: 'gavel',
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
  definition: SourceProviderDefinition,
): SourceProviderDefinition {
  if (!definition.type) {
    throw new Error('[SlashSourcesSDK] Provider definition must declare a valid `type`.');
  }
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

  return Object.freeze({ ...definition });
}
