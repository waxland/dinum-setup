export type DemoLocale = "fr" | "en";

export interface DemoTranslations {
  nav: {
    title: string;
    documentation: string;
    github: string;
    themeLight: string;
    themeDark: string;
    reset: string;
    selectLanguage: string;
  };
  hero: {
    tag: string;
    title: string;
    description: string;
    countryLabel: string;
    quickInsertLabel: string;
  };
  editor: {
    initialTitlePrefix: string;
    initialTitleSuffix: string;
    instructionBlock: string;
    instructionInline: string;
    interlinkExample: string;
    consultation: string;
    slashGroupTitle: string;
    emptySearchPlaceholder: string;
    datasetLoaded: string;
  };
  footer: {
    entity: string;
    compliance: string;
  };
}
