import { BlockNoteSchema, defaultBlockSpecs, defaultInlineContentSpecs } from "@blocknote/core";
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
  SourceIcon,
  SourceInlineContent,
  type ExternalSourceDisplayMode,
  type ExternalSourceEntity,
  type SourceEntityType,
  type SupportedCountry,
} from "@suitenumerique/blocknote-sources";

import { Header, Hero, Footer } from "./components";
import { useLocaleRouter } from "./hooks/useLocaleRouter";
import { getDemoTranslations } from "./i18n";
import { COUNTRY_PRESETS } from "./presets.config";

const createEmptySourceBlock = (entityType: SourceEntityType) => ({
  type: "sourceBlock" as const,
  props: {
    entityType,
    displayMode: "callout" as ExternalSourceDisplayMode,
    sourceId: "",
    title: "",
    subtitle: "",
    status: "",
    statusColor: "blue" as const,
    meta1: "",
    meta2: "",
    meta3: "",
    excerpt: "",
    summary: "",
    url: "",
    verifiedAt: "",
    rawPayload: "",
  },
});

const convertEntityToBlockProps = (
  item: Partial<ExternalSourceEntity>,
  mode: ExternalSourceDisplayMode = "callout"
) => ({
  entityType: (item.entityType as SourceEntityType) || ("law" as const),
  displayMode: mode,
  sourceId: item.sourceId || item.id || "",
  title: item.title || "",
  subtitle: item.subtitle || "",
  status: item.statusLabel || (typeof item.status === "string" ? item.status : "") || "",
  statusColor: item.statusColor || "blue",
  meta1: item.meta1 || (item.metadataFields?.[0]?.value ? String(item.metadataFields[0].value) : ""),
  meta2: item.meta2 || (item.metadataFields?.[1]?.value ? String(item.metadataFields[1].value) : ""),
  meta3: item.meta3 || (item.metadataFields?.[2]?.value ? String(item.metadataFields[2].value) : ""),
  excerpt: item.excerpt || item.snippet || "",
  summary: item.summary || "",
  url: item.url || "",
  verifiedAt: item.verifiedAt || item.updatedAt || "",
  rawPayload: typeof item.rawPayload === "string" ? item.rawPayload : JSON.stringify(item.rawPayload || {}),
});

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<SupportedCountry>("fr");
  const [currentLocale, setCurrentLocale] = useLocaleRouter();

  const t = useMemo(() => getDemoTranslations(currentLocale), [currentLocale]);

  useEffect(() => {
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
              status: "En vigueur",
              url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976",
              excerpt: "Un marché est un contrat conclu par un ou plusieurs acheteurs...",
              verifiedAt: "17/09/2026",
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
              status: "In bonis",
              url: "https://annuaire-entreprises.data.gouv.fr/entreprise/direction-interministerielle-du-numerique-dinum-130025265",
              excerpt: "Conçoit et met en œuvre la stratégie numérique de l’État...",
              verifiedAt: "17/09/2026",
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

    if (!editor) {
      return;
    }
    const countryData = ALL_INTERNATIONAL_MOCK_SOURCES.filter((s) => s.country === country);
    if (countryData.length > 0) {
      editor.replaceBlocks(editor.document, [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: `${COUNTRY_PRESETS[country].flag} ${t.editor.datasetLoaded} ${COUNTRY_PRESETS[country].name}`,
              styles: { bold: true },
            },
          ],
        },
        ...countryData.map((item, idx) => ({
          type: "sourceBlock" as const,
          props: convertEntityToBlockProps(
            item,
            (idx === 0 ? "callout" : idx === 1 ? "card" : "link") as ExternalSourceDisplayMode
          ),
        })),
      ]);
    }
  };

  const customSlashMenuItems = useMemo(() => {
    if (!editor) {
      return [];
    }

    const customItems = [
      {
        title: "Legal Text (Légifrance / Gesetze / EUR-Lex)",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("law")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["loi", "law", "legifrance", "code", "article", "decret", "gesetz", "wet", "eurlex"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="law" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert a certified official legal text",
      },
      {
        title: "Company Record (RNE / Handelsregister / KVK)",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("company")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["entreprise", "company", "pappers", "siren", "siret", "societe", "kbis", "register", "kvk"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="company" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert certified commercial registry data",
      },
      {
        title: "Parliamentary Amendment & Debate",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("parliament")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["assemblee", "parliament", "assemble", "an", "amendement", "depute", "bundestag", "dip"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="parliament" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Track a parliamentary amendment or bill in session",
      },
      {
        title: "Postal Address (BAN / BAG)",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("address")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["adresse", "address", "ban", "geo", "rue", "bag"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="address" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Certified autocomplete from national address registries",
      },
      {
        title: "Public Procurement Notice (BOAMP / TED)",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("procurement")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["marche", "boamp", "achat", "dce", "dae", "ted", "procurement"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="procurement" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert an official public procurement notice",
      },
      {
        title: "Public Grant & Subsidy Program",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("grant")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["subvention", "grant", "aides", "fonds-vert", "detr", "dsil", "anct", "subsidies"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="grant" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert a public funding or territorial grant program",
      },
      {
        title: "Official Statistics & Demographics",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("insee")],
            editor.getTextCursorPosition().block,
            "after"
          );
        },
        aliases: ["insee", "stats", "population", "territoire", "destatis", "cbs", "eurostat"],
        group: t.editor.slashGroupTitle,
        icon: <SourceIcon type="insee" size={16} color="var(--blue-france, #000091)" />,
        subtext: "Insert official demographic indicators",
      },
      {
        title: "Open Data Portal (data.gouv.fr / GovData / EU Data)",
        onItemClick: () => {
          editor.insertBlocks(
            [createEmptySourceBlock("opendata")],
            editor.getTextCursorPosition().block,
            "after"
          );
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
              entityType: (item.entityType as SourceEntityType) || "law",
              status:
                item.statusLabel ||
                (typeof item.status === "string" ? item.status : "") ||
                "",
              url: item.url || "",
              excerpt: item.excerpt || item.snippet || "",
              verifiedAt: item.verifiedAt || item.updatedAt || "",
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
    const currentBlock =
      editor.getTextCursorPosition()?.block ||
      editor.document[editor.document.length - 1];
    editor.insertBlocks([createEmptySourceBlock(type)], currentBlock, "after");
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

        <div className="sober-editor-wrap">
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
        </div>

        <Footer t={t.footer} />
      </main>
    </div>
  );
};
