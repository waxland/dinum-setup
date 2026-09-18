import { BlockNoteSchema, defaultBlockSpecs, defaultInlineContentSpecs } from "@blocknote/core";
import { insertOrUpdateBlockForSlashMenu } from "@blocknote/core/extensions";
import { BlockNoteView } from "@blocknote/mantine";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import React, { useEffect, useMemo, useState } from "react";

import {
  ALL_INTERNATIONAL_MOCK_SOURCES,
  MOCK_EUROPE_SOURCES,
  MOCK_FRANCE_SOURCES,
  MOCK_GERMANY_SOURCES,
  SourceBlock,
  SourceSearchProvider,
  demoSearchClient,
  SourceIcon,
  SourceInlineContent,
  isSourceEntityType,
  type ExternalSourceDisplayMode,
  type ExternalSourceEntity,
  type SourceEntityType,
  type SupportedCountry,
} from "@suitenumerique/blocknote-sources";

import { Footer, Header, Hero } from "./components";
import { useLocaleRouter } from "./hooks/useLocaleRouter";
import { getDemoTranslations } from "./i18n";

const convertEntityToBlockProps = (
  item: Partial<ExternalSourceEntity> & { country?: string },
  mode: ExternalSourceDisplayMode = "callout"
) => ({
  entityType: isSourceEntityType(item.entityType) ? item.entityType : "law",
  displayMode: mode,
  sourceId: item.sourceId || item.id || "",
  title: item.title || "",
  subtitle: item.subtitle || "",
  status: "Demonstration",
  origin: "demo",
  country: item.country || "",
  statusColor: item.statusColor || "blue",
  meta1: item.meta1 || (item.metadataFields?.[0]?.value ? String(item.metadataFields[0].value) : ""),
  meta2: item.meta2 || (item.metadataFields?.[1]?.value ? String(item.metadataFields[1].value) : ""),
  meta3: item.meta3 || (item.metadataFields?.[2]?.value ? String(item.metadataFields[2].value) : ""),
  excerpt: item.excerpt || item.snippet || "",
  summary: item.summary || "",
  url: item.url || "",
  verifiedAt: "",
  rawPayload: typeof item.rawPayload === "string" ? item.rawPayload : JSON.stringify(item.rawPayload || {}),
});

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<SupportedCountry>("fr");
  const [currentLocale, setCurrentLocale] = useLocaleRouter();

  const t = useMemo(() => getDemoTranslations(currentLocale), [currentLocale]);

  useEffect(() => {
    document.documentElement.dataset.frTheme = isDark ? 'dark' : 'light';
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  const schema = useMemo(() => {
    return BlockNoteSchema.create({
      blockSpecs: {
        ...defaultBlockSpecs,
        sourceBlock: SourceBlock(),
      },
      inlineContentSpecs: {
        ...defaultInlineContentSpecs,
        sourceLink: SourceInlineContent,
      },
    });
  }, []);

  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: t.editor.initialTitlePrefix,
            styles: {},
          },
          {
            type: "text",
            text: t.editor.initialTitleSuffix,
            styles: { bold: true },
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: currentLocale === "fr" ? "Tapez " : "Type ",
            styles: {},
          },
          {
            type: "text",
            text: "/",
            styles: { code: true, bold: true },
          },
          {
            type: "text",
            text: t.editor.instructionBlock,
            styles: {},
          },
          {
            type: "text",
            text: "@",
            styles: { code: true, bold: true },
          },
          {
            type: "text",
            text: t.editor.instructionInline,
            styles: {},
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: t.editor.interlinkExample,
            styles: {},
          },
          {
            type: "sourceLink",
            props: {
              sourceId: "LEGIARTI000037812976",
              title: "Article L. 111-1 (Commande publique)",
              subtitle: "Code de la commande publique",
              entityType: "law",
              status: "Demonstration",
              url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976",
              excerpt: "Un marché est un contrat conclu par un ou plusieurs acheteurs...",
              verifiedAt: "",
            },
          },
          {
            type: "text",
            text: t.editor.consultation,
            styles: {},
          },
          {
            type: "sourceLink",
            props: {
              sourceId: "13002526500013",
              title: "DINUM (SIREN 130 025 265)",
              subtitle: "Services du Premier ministre",
              entityType: "company",
              status: "Demonstration",
              url: "https://annuaire-entreprises.data.gouv.fr/entreprise/direction-interministerielle-du-numerique-dinum-130025265",
              excerpt: "Conçoit et met en œuvre la stratégie numérique de l’État...",
              verifiedAt: "",
            },
          },
          {
            type: "text",
            text: ".",
            styles: {},
          },
        ],
      },
      {
        type: "sourceBlock",
        props: convertEntityToBlockProps(MOCK_FRANCE_SOURCES[0], "callout"),
      },
      {
        type: "sourceBlock",
        props: convertEntityToBlockProps(MOCK_GERMANY_SOURCES[0], "card"),
      },
      {
        type: "sourceBlock",
        props: convertEntityToBlockProps(MOCK_EUROPE_SOURCES[0], "link"),
      },
    ],
  });

  const handleCountryChange = (country: SupportedCountry) => {
    setCurrentCountry(country);
  };

  const customSlashMenuItems = useMemo(() => {
    if (!editor) {
      return [];
    }

    const customItems = [
      {
        title: "Legal Text (Légifrance / Gesetze / EUR-Lex)",
        onItemClick: () => {
          insertOrUpdateBlockForSlashMenu(editor, {
            type: "sourceBlock",
            props: { entityType: "law", displayMode: "callout" },
          });
        },
        aliases: ["loi", "law", "legifrance", "code", "article", "decret", "gesetz", "wet", "eurlex"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="law" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert a certified official legal text",
      },
      {
        title: "Company Record (RNE / Handelsregister / KVK)",
        onItemClick: () => {
          insertOrUpdateBlockForSlashMenu(editor, {
            type: "sourceBlock",
            props: { entityType: "company", displayMode: "callout" },
          });
        },
        aliases: ["entreprise", "company", "pappers", "siren", "siret", "societe", "kbis", "register", "kvk"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="company" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert certified commercial registry data",
      },
      {
        title: "Parliamentary Amendment & Debate",
        onItemClick: () => {
          insertOrUpdateBlockForSlashMenu(editor, {
            type: "sourceBlock",
            props: { entityType: "parliament", displayMode: "callout" },
          });
        },
        aliases: ["assemblee", "parliament", "assemble", "an", "amendement", "depute", "bundestag", "dip"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="parliament" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Track a parliamentary amendment or bill in session",
      },
      {
        title: "Postal Address (BAN / BAG)",
        onItemClick: () => {
          insertOrUpdateBlockForSlashMenu(editor, {
            type: "sourceBlock",
            props: { entityType: "address", displayMode: "callout" },
          });
        },
        aliases: ["adresse", "address", "ban", "geo", "rue", "bag"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="address" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Certified autocomplete from national address registries",
      },
      {
        title: "Public Procurement Notice (BOAMP / TED)",
        onItemClick: () => {
          insertOrUpdateBlockForSlashMenu(editor, {
            type: "sourceBlock",
            props: { entityType: "procurement", displayMode: "callout" },
          });
        },
        aliases: ["marche", "boamp", "achat", "dce", "dae", "ted", "procurement"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="procurement" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert an official public procurement notice",
      },
      {
        title: "Public Grant & Subsidy Program",
        onItemClick: () => {
          insertOrUpdateBlockForSlashMenu(editor, {
            type: "sourceBlock",
            props: { entityType: "grant", displayMode: "callout" },
          });
        },
        aliases: ["subvention", "grant", "aides", "fonds-vert", "detr", "dsil", "anct", "subsidies"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="grant" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert a public funding or territorial grant program",
      },
      {
        title: "Official Statistics & Demographics",
        onItemClick: () => {
          insertOrUpdateBlockForSlashMenu(editor, {
            type: "sourceBlock",
            props: { entityType: "insee", displayMode: "callout" },
          });
        },
        aliases: ["insee", "stats", "population", "territoire", "destatis", "cbs", "eurostat"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="insee" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert official demographic indicators",
      },
      {
        title: "Open Data Portal (data.gouv.fr / GovData / EU Data)",
        onItemClick: () => {
          insertOrUpdateBlockForSlashMenu(editor, {
            type: "sourceBlock",
            props: { entityType: "opendata", displayMode: "callout" },
          });
        },
        aliases: ["opendata", "dataset", "datagouv", "donnees", "govdata", "dataeuropa"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="opendata" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert a certified open dataset record",
      },
    ];

    return [...customItems, ...getDefaultReactSlashMenuItems(editor)];
  }, [editor, t.editor.slashGroupTitle]);

  const customMentionMenuItems = useMemo(() => {
    if (!editor) {
      return [];
    }

    const currentPool = [
      ...MOCK_FRANCE_SOURCES,
      ...ALL_INTERNATIONAL_MOCK_SOURCES.filter(
        (s) => s.country === currentCountry && s.country !== "fr"
      ),
    ];

    return currentPool.map((item) => ({
      title: item.title,
      subtext: `${item.subtitle || ""} (${item.entityType || "law"})`,
      icon: <SourceIcon type={item.entityType || "law"} size={15} color="var(--blue-france, #000091)" />,
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: "sourceLink" as const,
            props: {
              sourceId: item.sourceId || item.id || "",
              title: item.title || "",
              subtitle: item.subtitle || "",
              entityType: isSourceEntityType(item.entityType) ? item.entityType : "law",
              status: "Demonstration",
              url: item.url || "",
              excerpt: item.excerpt || item.snippet || "",
              verifiedAt: "",
            },
          },
          " ",
        ]);
      },
    }));
  }, [editor, currentCountry]);

  const handleInsert = (type: SourceEntityType) => {
    if (!editor) {
      return;
    }
    insertOrUpdateBlockForSlashMenu(editor, {
      type: "sourceBlock",
      props: { entityType: type, displayMode: "callout" },
    });
  };

  const handleReset = () => {
    if (!editor) {
      return;
    }
    editor.replaceBlocks(editor.document, [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: t.editor.emptySearchPlaceholder,
            styles: {},
          },
        ],
      },
    ]);
  };

  return (
    <div className="sober-app">
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onReset={handleReset}
        currentLocale={currentLocale}
        onLocaleChange={setCurrentLocale}
        t={t.nav}
      />

      <main className="sober-main">
        <Hero
          currentCountry={currentCountry}
          onCountryChange={handleCountryChange}
          onInsert={handleInsert}
          t={t.hero}
        />

        <div className="sober-editor-card">
          <SourceSearchProvider value={{ client: demoSearchClient, country: currentCountry }}>
          <BlockNoteView
            editor={editor}
            theme={isDark ? "dark" : "light"}
            slashMenu={false}
          >
            <SuggestionMenuController
              triggerCharacter={"/"}
              getItems={async (query) =>
                customSlashMenuItems.filter(
                  (item) =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.aliases?.some((a) =>
                      a.toLowerCase().includes(query.toLowerCase())
                    )
                )
              }
            />

            <SuggestionMenuController
              triggerCharacter={"@"}
              getItems={async (query) =>
                customMentionMenuItems.filter(
                  (item) =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.subtext?.toLowerCase().includes(query.toLowerCase())
                )
              }
            />
          </BlockNoteView>
          </SourceSearchProvider>
        </div>

        <Footer t={t.footer} />
      </main>
    </div>
  );
};
