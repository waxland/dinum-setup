import { SourceProviderDefinition } from './types';

/**
 * Helper function to declare a type-safe sovereign source provider for La Suite Docs.
 *
 * @example
 * ```typescript
 * export const justiceProvider = defineSourceProvider({
 *   type: 'custom',
 *   name: 'Casier Judiciaire National',
 *   iconName: 'gavel',
 *   slashCommand: 'casier',
 *   slashAliases: ['cjn', 'justice', 'bulletin'],
 *   description: 'Consulter et référencer les textes du Casier Judiciaire',
 *   suggest: async (query) => [...],
 *   search: async (query) => [...],
 *   getDetail: async (id) => {...},
 * });
 * ```
 */
export function defineSourceProvider(
  definition: SourceProviderDefinition,
): SourceProviderDefinition {
  if (!definition.type) {
    throw new Error('[SlashSourcesSDK] Provider definition must have a valid `type`.');
  }
  if (!definition.name) {
    throw new Error('[SlashSourcesSDK] Provider definition must have a `name`.');
  }
  if (!definition.slashCommand) {
    throw new Error('[SlashSourcesSDK] Provider definition must declare a `slashCommand`.');
  }
  return definition;
}
