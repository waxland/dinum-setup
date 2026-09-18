import type { DemoTranslations } from "./types";

export const enTranslations: DemoTranslations = {
  nav: {
    title: "Docs",
    documentation: "Documentation",
    github: "GitHub",
    themeLight: "Light theme",
    themeDark: "Dark theme",
    reset: "Reset editor",
    selectLanguage: "Interface language",
  },
  hero: {
    tag: "Official Playground",
    title: "Sovereign Connectors & BlockNote",
    description:
      "Direct integration of certified European and national public data registries (Légifrance, Handelsregister, EUR-Lex, Open Data) inside the editor.",
    countryLabel: "Select a sovereign dataset:",
    quickInsertLabel: "Quick insert:",
  },
  editor: {
    initialTitlePrefix: "Official Demo — ",
    initialTitleSuffix: "La Suite Docs / Sovereign Connectors",
    instructionBlock: " to insert a sovereign rich block or ",
    instructionInline: " to link a verified inline citation inside text:",
    interlinkExample: "Example of verified inline interlinking: ",
    consultation: " and referencing ",
    slashGroupTitle: "Official & Sovereign Sources",
    emptySearchPlaceholder: "Type / to insert a block or @ to cite a source...",
    datasetLoaded: "Sovereign dataset loaded:",
  },
  footer: {
    entity: "La Suite Numérique • French Interministerial Digital Directorate (DINUM)",
    compliance: "MIT License • RGAA v4.1 / WCAG 2.1 AA Compliant",
  },
};
