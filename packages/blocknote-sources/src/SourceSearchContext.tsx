import { createContext, useContext } from "react";
import type { SupportedLocale } from "./i18n";
import type { SupportedCountry } from "./mockData";
import { createHttpSourceClient, SourceSearchClient } from "./searchClient";

export interface SourceSearchConfiguration {
  client: SourceSearchClient;
  country: SupportedCountry;
  locale?: SupportedLocale;
}

const context = createContext<SourceSearchConfiguration>({
  client: createHttpSourceClient(),
  country: "fr",
  locale: "fr",
});

/** Host-owned clients and credentials never enter the persisted BlockNote document. */
export const SourceSearchProvider = context.Provider;
export const useSourceSearchConfiguration = () => useContext(context);
