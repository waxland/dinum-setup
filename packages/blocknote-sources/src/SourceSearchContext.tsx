import { createContext, useContext } from 'react';
import { createHttpSourceClient, SourceSearchClient } from './searchClient';
import type { SupportedCountry } from './mockData';

export interface SourceSearchConfiguration {
  client: SourceSearchClient;
  country: SupportedCountry;
}

const context = createContext<SourceSearchConfiguration>({ client: createHttpSourceClient(), country: 'fr' });

/** Host-owned clients and credentials never enter the persisted BlockNote document. */
export const SourceSearchProvider = context.Provider;
export const useSourceSearchConfiguration = () => useContext(context);
