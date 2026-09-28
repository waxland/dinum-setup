import type { SupportedCountry } from "../mockData";
import type { SourceEntityType } from "../types";

export type SupportedLocale = "en" | "fr" | "de" | "nl" | "es";

export interface ExternalSourceI18nStrings {
  searchPlaceholder: string;
  searchTitle: string;
  backButton: string;
  allFilter: string;
  codesFilter: string;
  lawsFilter: string;
  keyboardTip: string;
  openSource: string;
  copyLink: string;
  removeReference: string;
  categoryLabel: string;
  countryLabel: string;
  searchLabel: string;
  displayModeLabel: string;
  closeSearch: string;
  clearSearch: string;
  loading: string;
  resultsCount: (count: number) => string;
  resultsLabel: string;
  noResults: string;
  countryNames: Record<SupportedCountry, string>;
  placeholders: Partial<Record<SourceEntityType, string>>;
  modes: {
    callout: string;
    calloutDesc: string;
    card: string;
    cardDesc: string;
    link: string;
    linkDesc: string;
  };
  status: {
    valid: string;
    repealed: string;
    pending: string;
    archived: string;
  };
  verification: {
    verifiedOn: (date: string) => string;
    notProvided: string;
    cachedMode: string;
  };
  errors: {
    unavailableProvider: string;
    authRequired: string;
    rateLimited: string;
    genericError: string;
  };
}

export const LOCALES: Record<SupportedLocale, ExternalSourceI18nStrings> = {
  en: {
    searchPlaceholder: "Search topic, article or reference name...",
    searchTitle: "Search external reference",
    backButton: "Back",
    allFilter: "All",
    codesFilter: "Codes",
    lawsFilter: "Acts & Laws",
    keyboardTip: "↑ ↓ Navigate · ↵ Insert · Esc Close",
    openSource: "Open original source",
    copyLink: "Copy source link",
    removeReference: "Remove reference",
    categoryLabel: "Category",
    countryLabel: "Country",
    searchLabel: "Search a source",
    displayModeLabel: "Display format",
    closeSearch: "Close search",
    clearSearch: "Clear search",
    loading: "Searching...",
    resultsCount: (c: number) => `${c} result(s)`,
    resultsLabel: "Search results",
    noResults: "No results found.",
    countryNames: {
      fr: "France",
      de: "Germany",
      nl: "Netherlands",
      es: "Spain",
      eu: "European Union",
      ca: "Canada",
    },
    placeholders: {
      law: "Search a law, act or legal code...",
      company: "Search a company, registration or name...",
      parliament: "Search a parliamentary amendment or debate...",
      address: "Search a postal address...",
      procurement: "Search a public contract or tender notice...",
      grant: "Search a grant or regional subsidy...",
      insee: "Search statistical data or indicators...",
      statistics: "Search statistical datasets...",
      agent: "Search a public officer or directory service...",
      cadastre: "Search a cadastral parcel...",
      demarche: "Search an administrative procedure...",
      opendata: "Search an open dataset...",
      custom: "Search a custom source...",
    },
    modes: {
      callout: "Callout",
      calloutDesc: "Full text quote and source",
      card: "Card",
      cardDesc: "3-column metadata grid",
      link: "Inline Link",
      linkDesc: "Compact badge in paragraph",
    },
    status: {
      valid: "In force",
      repealed: "Repealed",
      pending: "Pending",
      archived: "Archived",
    },
    verification: {
      verifiedOn: (d: string) => `Verified on ${d}`,
      notProvided: "Verification not provided",
      cachedMode: "Cached Mode",
    },
    errors: {
      unavailableProvider: "Provider unavailable for this country.",
      authRequired: "Authentication or authorization required.",
      rateLimited: "Rate limit exceeded. Try again later.",
      genericError: "Search failed.",
    },
  },
  fr: {
    searchPlaceholder: "Sujet, article ou nom d'un texte...",
    searchTitle: "Rechercher une référence",
    backButton: "Retour",
    allFilter: "Tout",
    codesFilter: "Codes",
    lawsFilter: "Lois",
    keyboardTip: "↑ ↓ Naviguer · ↵ Insérer · Échap Fermer",
    openSource: "Consulter la source officielle",
    copyLink: "Copier le lien source",
    removeReference: "Supprimer la référence",
    categoryLabel: "Catégorie",
    countryLabel: "Pays",
    searchLabel: "Rechercher une source",
    displayModeLabel: "Format d'affichage",
    closeSearch: "Fermer la recherche",
    clearSearch: "Effacer la recherche",
    loading: "Recherche en cours...",
    resultsCount: (c: number) => `${c} résultat(s)`,
    resultsLabel: "Résultats de recherche",
    noResults: "Aucun résultat trouvé.",
    countryNames: {
      fr: "France",
      de: "Allemagne",
      nl: "Pays-Bas",
      es: "Espagne",
      eu: "Union européenne",
      ca: "Canada",
    },
    placeholders: {
      law: "Rechercher une loi, un article ou un code juridique...",
      company: "Rechercher une entreprise, SIREN, dénomination...",
      parliament: "Rechercher un amendement ou débat parlementaire...",
      address: "Rechercher une adresse postale...",
      procurement: "Rechercher un marché public ou avis BOAMP...",
      grant: "Rechercher une subvention ou aide territoriale...",
      insee: "Rechercher des statistiques ou indicateurs INSEE...",
      statistics: "Rechercher des données statistiques...",
      agent: "Rechercher un agent ou service public...",
      cadastre: "Rechercher une parcelle cadastrale...",
      demarche: "Rechercher une démarche administrative...",
      opendata: "Rechercher un jeu de données ouvertes...",
      custom: "Rechercher une source sur mesure...",
    },
    modes: {
      callout: "Extrait",
      calloutDesc: "Texte officiel et source",
      card: "Carte",
      cardDesc: "Grille de métadonnées",
      link: "Lien",
      linkDesc: "Pastille dans le texte",
    },
    status: {
      valid: "En vigueur",
      repealed: "Abrogé",
      pending: "En cours",
      archived: "Archivé",
    },
    verification: {
      verifiedOn: (d: string) => `Vérifié le ${d}`,
      notProvided: "Vérification non fournie",
      cachedMode: "Mode Cache",
    },
    errors: {
      unavailableProvider: "Fournisseur indisponible pour ce pays.",
      authRequired: "Authentification ou autorisation requise.",
      rateLimited: "Limite de requêtes atteinte. Réessayez plus tard.",
      genericError: "Recherche impossible.",
    },
  },
  de: {
    searchPlaceholder: "Thema, Paragraf oder Gesetz suchen...",
    searchTitle: "Referenz suchen",
    backButton: "Zurück",
    allFilter: "Alle",
    codesFilter: "Gesetzbücher",
    lawsFilter: "Gesetze",
    keyboardTip: "↑ ↓ Navigieren · ↵ Einfügen · Esc Schließen",
    openSource: "Originalquelle öffnen",
    copyLink: "Link kopieren",
    removeReference: "Referenz löschen",
    categoryLabel: "Kategorie",
    countryLabel: "Land",
    searchLabel: "Quelle suchen",
    displayModeLabel: "Anzeigeformat",
    closeSearch: "Suche schließen",
    clearSearch: "Suche löschen",
    loading: "Suche läuft...",
    resultsCount: (c: number) => `${c} Ergebnis(se)`,
    resultsLabel: "Suchergebnisse",
    noResults: "Keine Ergebnisse gefunden.",
    countryNames: {
      fr: "Frankreich",
      de: "Deutschland",
      nl: "Niederlande",
      es: "Spanien",
      eu: "Europäische Union",
      ca: "Kanada",
    },
    placeholders: {
      law: "Gesetz oder Paragraf suchen...",
      company: "Unternehmen oder Register suchen...",
      parliament: "Bundestagsdebatte suchen...",
      address: "Adresse suchen...",
      procurement: "Ausschreibung suchen...",
      grant: "Förderung suchen...",
      insee: "Statistiken suchen...",
      statistics: "Statistische Daten suchen...",
      agent: "Behörde suchen...",
      cadastre: "Flurstück suchen...",
      demarche: "Verwaltungsvorgang suchen...",
      opendata: "Offenen Datensatz suchen...",
      custom: "Benutzerdefinierte Quelle suchen...",
    },
    modes: {
      callout: "Hervorhebung",
      calloutDesc: "Volltext und Quelle",
      card: "Karte",
      cardDesc: "Strukturierte Metadaten",
      link: "Inline-Link",
      linkDesc: "Kompakte Verlinkung",
    },
    status: {
      valid: "In Kraft",
      repealed: "Außer Kraft",
      pending: "In Beratung",
      archived: "Archiviert",
    },
    verification: {
      verifiedOn: (d: string) => `Geprüft am ${d}`,
      notProvided: "Keine Prüfung angegeben",
      cachedMode: "Zwischenspeicher-Modus",
    },
    errors: {
      unavailableProvider: "Anbieter für dieses Land nicht verfügbar.",
      authRequired: "Authentifizierung erforderlich.",
      rateLimited: "Anfragelimit erreicht. Später erneut versuchen.",
      genericError: "Suche fehlgeschlagen.",
    },
  },
  nl: {
    searchPlaceholder: "Zoek onderwerp, artikel of wet...",
    searchTitle: "Externe bron zoeken",
    backButton: "Terug",
    allFilter: "Alles",
    codesFilter: "Wetboeken",
    lawsFilter: "Wetten",
    keyboardTip: "↑ ↓ Navigeren · ↵ Invoegen · Esc Sluiten",
    openSource: "Officiële bron openen",
    copyLink: "Kopieer link",
    removeReference: "Verwijder referentie",
    categoryLabel: "Categorie",
    countryLabel: "Land",
    searchLabel: "Bron zoeken",
    displayModeLabel: "Weergave-indeling",
    closeSearch: "Zoeken sluiten",
    clearSearch: "Zoeken wissen",
    loading: "Zoeken bezig...",
    resultsCount: (c: number) => `${c} resultaat/resultaten`,
    resultsLabel: "Zoekresultaten",
    noResults: "Geen resultaten gevonden.",
    countryNames: {
      fr: "Frankrijk",
      de: "Duitsland",
      nl: "Nederland",
      es: "Spanje",
      eu: "Europese Unie",
      ca: "Canada",
    },
    placeholders: {
      law: "Zoek wet of artikel...",
      company: "Zoek bedrijf of KVK...",
      parliament: "Zoek parlementair debat...",
      address: "Zoek adres...",
      procurement: "Zoek aanbesteding...",
      grant: "Zoek subsidie...",
      insee: "Zoek statistieken...",
      statistics: "Zoek statistische data...",
      agent: "Zoek overheidsdienst...",
      cadastre: "Zoek perceel...",
      demarche: "Zoek procedure...",
      opendata: "Zoek open dataset...",
      custom: "Zoek aangepaste bron...",
    },
    modes: {
      callout: "Citaat",
      calloutDesc: "Volledige wettekst",
      card: "Kaart",
      cardDesc: "Metadata raster",
      link: "Inline link",
      linkDesc: "Compacte vermelding",
    },
    status: {
      valid: "Geldend",
      repealed: "Vervallen",
      pending: "In behandeling",
      archived: "Gearchiveerd",
    },
    verification: {
      verifiedOn: (d: string) => `Geverifieerd op ${d}`,
      notProvided: "Geen verificatie opgegeven",
      cachedMode: "Buffer-modus",
    },
    errors: {
      unavailableProvider: "Provider niet beschikbaar voor dit land.",
      authRequired: "Authenticatie vereist.",
      rateLimited: "Limiet bereikt. Probeer het later opnieuw.",
      genericError: "Zoeken mislukt.",
    },
  },
  es: {
    searchPlaceholder: "Buscar tema, artículo o nombre de ley...",
    searchTitle: "Buscar referencia externa",
    backButton: "Volver",
    allFilter: "Todo",
    codesFilter: "Códigos",
    lawsFilter: "Leyes",
    keyboardTip: "↑ ↓ Navegar · ↵ Insertar · Esc Cerrar",
    openSource: "Abrir fuente oficial",
    copyLink: "Copiar enlace",
    removeReference: "Eliminar referencia",
    categoryLabel: "Categoría",
    countryLabel: "País",
    searchLabel: "Buscar una fuente",
    displayModeLabel: "Formato de visualización",
    closeSearch: "Cerrar búsqueda",
    clearSearch: "Limpiar búsqueda",
    loading: "Buscando...",
    resultsCount: (c: number) => `${c} resultado(s)`,
    resultsLabel: "Resultados de búsqueda",
    noResults: "No se encontraron resultados.",
    countryNames: {
      fr: "Francia",
      de: "Alemania",
      nl: "Países Bajos",
      es: "España",
      eu: "Unión Europea",
      ca: "Canadá",
    },
    placeholders: {
      law: "Buscar una ley o artículo...",
      company: "Buscar una empresa o registro...",
      parliament: "Buscar un debate parlamentario...",
      address: "Buscar una dirección postal...",
      procurement: "Buscar una licitación pública...",
      grant: "Buscar una subvención...",
      insee: "Buscar estadísticas...",
      statistics: "Buscar datos estadísticos...",
      agent: "Buscar un servicio público...",
      cadastre: "Buscar una parcela catastral...",
      demarche: "Buscar un trámite administrativo...",
      opendata: "Buscar un conjunto de datos abiertos...",
      custom: "Buscar una fuente personalizada...",
    },
    modes: {
      callout: "Destacado",
      calloutDesc: "Texto oficial y fuente",
      card: "Tarjeta",
      cardDesc: "Cuadrícula de metadatos",
      link: "Enlace en línea",
      linkDesc: "Incrustado en el párrafo",
    },
    status: {
      valid: "En vigor",
      repealed: "Derogado",
      pending: "En trámite",
      archived: "Archivado",
    },
    verification: {
      verifiedOn: (d: string) => `Verificado el ${d}`,
      notProvided: "Verificación no proporcionada",
      cachedMode: "Modo Caché",
    },
    errors: {
      unavailableProvider: "Proveedor no disponible para este país.",
      authRequired: "Autenticación requerida.",
      rateLimited: "Límite alcanzado. Inténtelo de nuevo más tarde.",
      genericError: "Búsqueda no disponible.",
    },
  },
};

export function getI18nStrings(locale: SupportedLocale = "en"): ExternalSourceI18nStrings {
  return LOCALES[locale] || LOCALES.en;
}

export function getLocaleDictionary(locale: SupportedLocale = "en") {
  const strings = getI18nStrings(locale);
  return {
    ...strings,
    actions: {
      searchPlaceholder: strings.searchPlaceholder,
      searchTitle: strings.searchTitle,
      back: strings.backButton,
      open: strings.openSource,
      copy: strings.copyLink,
      remove: strings.removeReference,
    },
  };
}
