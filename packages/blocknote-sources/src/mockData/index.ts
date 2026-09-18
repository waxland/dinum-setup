import { ExternalSourceEntity } from '../types';
import { MOCK_EUROPE } from './europe';
import { MOCK_FRANCE } from './france';
import { MOCK_GERMANY } from './germany';
import { MOCK_NETHERLANDS } from './netherlands';
import { MOCK_SPAIN } from './spain';

export * from './europe';
export * from './france';
export * from './germany';
export * from './netherlands';
export * from './spain';

export type SupportedCountry = 'fr' | 'de' | 'nl' | 'es' | 'eu';

export interface InternationalSourceItem extends ExternalSourceEntity {
  country: SupportedCountry;
}

export const MOCK_FRANCE_SOURCES: InternationalSourceItem[] = Object.values(MOCK_FRANCE)
  .flat()
  .map((s) => ({ ...s, country: 'fr' as SupportedCountry }));

export const MOCK_GERMANY_SOURCES: InternationalSourceItem[] = Object.values(MOCK_GERMANY)
  .flat()
  .map((s) => ({ ...s, country: 'de' as SupportedCountry }));

export const MOCK_NETHERLANDS_SOURCES: InternationalSourceItem[] = Object.values(MOCK_NETHERLANDS)
  .flat()
  .map((s) => ({ ...s, country: 'nl' as SupportedCountry }));

export const MOCK_SPAIN_SOURCES: InternationalSourceItem[] = Object.values(MOCK_SPAIN)
  .flat()
  .map((s) => ({ ...s, country: 'es' as SupportedCountry }));

export const MOCK_EUROPE_SOURCES: InternationalSourceItem[] = Object.values(MOCK_EUROPE)
  .flat()
  .map((s) => ({ ...s, country: 'eu' as SupportedCountry }));

export const ALL_INTERNATIONAL_MOCK_SOURCES: InternationalSourceItem[] = [
  ...MOCK_FRANCE_SOURCES,
  ...MOCK_GERMANY_SOURCES,
  ...MOCK_NETHERLANDS_SOURCES,
  ...MOCK_SPAIN_SOURCES,
  ...MOCK_EUROPE_SOURCES,
];

export function getSourcesByCountry(country: SupportedCountry): InternationalSourceItem[] {
  switch (country) {
    case 'fr':
      return MOCK_FRANCE_SOURCES;
    case 'de':
      return MOCK_GERMANY_SOURCES;
    case 'nl':
      return MOCK_NETHERLANDS_SOURCES;
    case 'es':
      return MOCK_SPAIN_SOURCES;
    case 'eu':
      return MOCK_EUROPE_SOURCES;
    default:
      return MOCK_FRANCE_SOURCES;
  }
}



