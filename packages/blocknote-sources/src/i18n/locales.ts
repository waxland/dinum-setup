export type SupportedLocale = 'en' | 'fr' | 'de' | 'nl';

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
}

export const LOCALES: Record<SupportedLocale, ExternalSourceI18nStrings> = {
  en: {
    searchPlaceholder: 'Search topic, article or reference name...',
    searchTitle: 'Search external reference',
    backButton: 'Back',
    allFilter: 'All',
    codesFilter: 'Codes',
    lawsFilter: 'Acts & Laws',
    keyboardTip: '↑ ↓ Navigate · ↵ Insert · Esc Close',
    openSource: 'Open original source',
    copyLink: 'Copy source link',
    removeReference: 'Remove reference',
    modes: {
      callout: 'Callout',
      calloutDesc: 'Full text quote and source',
      card: 'Card',
      cardDesc: '3-column metadata grid',
      link: 'Inline Link',
      linkDesc: 'Compact badge in paragraph',
    },
    status: {
      valid: 'In force',
      repealed: 'Repealed',
      pending: 'Pending',
      archived: 'Archived',
    },
  },
  fr: {
    searchPlaceholder: "Sujet, article ou nom d'un texte...",
    searchTitle: 'Rechercher une référence',
    backButton: 'Retour',
    allFilter: 'Tout',
    codesFilter: 'Codes',
    lawsFilter: 'Lois',
    keyboardTip: '↑ ↓ Naviguer · ↵ Insérer · Échap Fermer',
    openSource: 'Consulter la source officielle',
    copyLink: 'Copier le lien source',
    removeReference: 'Supprimer la référence',
    modes: {
      callout: 'Extrait',
      calloutDesc: 'Texte officiel et source',
      card: 'Carte',
      cardDesc: 'Grille de métadonnées',
      link: 'Lien',
      linkDesc: 'Pastille dans le texte',
    },
    status: {
      valid: 'En vigueur',
      repealed: 'Abrogé',
      pending: 'En cours',
      archived: 'Archivé',
    },
  },
  de: {
    searchPlaceholder: 'Thema, Paragraf oder Gesetz suchen...',
    searchTitle: 'Referenz suchen',
    backButton: 'Zurück',
    allFilter: 'Alle',
    codesFilter: 'Gesetzbücher',
    lawsFilter: 'Gesetze',
    keyboardTip: '↑ ↓ Navigieren · ↵ Einfügen · Esc Schließen',
    openSource: 'Originalquelle öffnen',
    copyLink: 'Link kopieren',
    removeReference: 'Referenz löschen',
    modes: {
      callout: 'Hervorhebung',
      calloutDesc: 'Volltext und Quelle',
      card: 'Karte',
      cardDesc: 'Strukturierte Metadaten',
      link: 'Inline-Link',
      linkDesc: 'Kompakte Verlinkung',
    },
    status: {
      valid: 'In Kraft',
      repealed: 'Außer Kraft',
      pending: 'In Beratung',
      archived: 'Archiviert',
    },
  },
  nl: {
    searchPlaceholder: 'Zoek onderwerp, artikel of wet...',
    searchTitle: 'Externe bron zoeken',
    backButton: 'Terug',
    allFilter: 'Alles',
    codesFilter: 'Wetboeken',
    lawsFilter: 'Wetten',
    keyboardTip: '↑ ↓ Navigeren · ↵ Invoegen · Esc Sluiten',
    openSource: 'Officiële bron openen',
    copyLink: 'Kopieer link',
    removeReference: 'Verwijder referentie',
    modes: {
      callout: 'Citaat',
      calloutDesc: 'Volledige wettekst',
      card: 'Kaart',
      cardDesc: 'Metadata raster',
      link: 'Inline link',
      linkDesc: 'Compacte vermelding',
    },
    status: {
      valid: 'Geldend',
      repealed: 'Vervallen',
      pending: 'In behandeling',
      archived: 'Gearchiveerd',
    },
  },
};

export function getI18nStrings(locale: SupportedLocale = 'en'): ExternalSourceI18nStrings {
  return LOCALES[locale] || LOCALES.en;
}
