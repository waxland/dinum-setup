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
  SourceSearchProvider,
  demoSearchClient,
  SourceIcon,
  SourceInlineContent,
  getLocaleDictionary,
  type ExternalSourceDisplayMode,
  type ExternalSourceEntity,
  type SourceEntityType,
  type SupportedCountry,
  type SupportedLocale
} from "@suitenumerique/blocknote-sources";

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
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>("fr");

  const i18n = useMemo(() => getLocaleDictionary(currentLocale), [currentLocale]);
  const activePreset = COUNTRY_PRESETS[currentCountry];

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
            text: "Démonstrateur Officiel — ",
            styles: {},
          },
          {
            type: "text",
            text: "La Suite Docs / Connecteurs Souverains",
            styles: { bold: true },
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Tapez ",
            styles: {},
          },
          {
            type: "text",
            text: "/",
            styles: { code: true, bold: true },
          },
          {
            type: "text",
            text: " pour insérer un bloc riche ou ",
            styles: {},
          },
          {
            type: "text",
            text: "@",
            styles: { code: true, bold: true },
          },
          {
            type: "text",
            text: " pour lier une source inline au fil du texte :",
            styles: {},
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Exemple d'interlinking certifié dans la phrase : ",
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
            text: " puis consultation de ",
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
    setCurrentLocale(COUNTRY_PRESETS[country].defaultLocale);
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
        group: "Sovereign & Official Sources",
        icon: <SourceIcon type="law" size={16} color="var(--blue-france-sun-113, #000091)" />,
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
        group: "Sovereign & Official Sources",
        icon: <SourceIcon type="company" size={16} color="var(--blue-france-sun-113, #000091)" />,
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
        group: "Sovereign & Official Sources",
        icon: <SourceIcon type="parliament" size={16} color="var(--blue-france-sun-113, #000091)" />,
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
        group: "Sovereign & Official Sources",
        icon: <SourceIcon type="address" size={16} color="var(--blue-france-sun-113, #000091)" />,
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
        group: "Sovereign & Official Sources",
        icon: <SourceIcon type="procurement" size={16} color="var(--blue-france-sun-113, #000091)" />,
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
        group: "Sovereign & Official Sources",
        icon: <SourceIcon type="grant" size={16} color="var(--blue-france-sun-113, #000091)" />,
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
        group: "Sovereign & Official Sources",
        icon: <SourceIcon type="insee" size={16} color="var(--blue-france-sun-113, #000091)" />,
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
        group: "Sovereign & Official Sources",
        icon: <SourceIcon type="opendata" size={16} color="var(--blue-france-sun-113, #000091)" />,
        subtext: "Insert a certified open dataset record",
      },
    ];

    return [...customItems, ...getDefaultReactSlashMenuItems(editor)];
  }, [editor]);

  // Menu de suggestions @mention (Interlinking direct au fil du texte)
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
      icon: <SourceIcon type={item.entityType || "law"} size={15} color="var(--blue-france-sun-113, #000091)" />,
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: "sourceLink" as const,
            props: {
              sourceId: item.sourceId || item.id || "",
              title: item.title || "",
              subtitle: item.subtitle || "",
              entityType: (item.entityType as SourceEntityType) || "law",
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
            text: i18n.actions.searchPlaceholder,
            styles: {},
          },
        ],
      },
    ]);
  };

  return (
    <div className="clean-app">
      {/* Navbar Minimaliste épurée */}
      <nav className="clean-nav" aria-label="Navigation principale">
        <div className="clean-nav-inner">
          <a href="/" className="clean-brand">
            <img
              src={isDark ? "/lasuite-dark.svg" : "/lasuite.svg"}
              alt="La Suite"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="clean-brand-name">Docs</span>
          </a>

          <div className="clean-nav-actions">
            <a
              href="https://dinum-docs-waxlands-projects.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="clean-link-btn"
            >
              Documentation ↗
            </a>
            <a
              href="https://github.com/waxland/dinum-setup"
              target="_blank"
              rel="noopener noreferrer"
              className="clean-link-btn"
            >
              GitHub ↗
            </a>
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className="clean-link-btn"
              title="Changer de thème"
            >
              {isDark ? "☀️ Clair" : "🌙 Sombre"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="clean-link-btn"
              style={{ color: "#c9191e" }}
              title="Vider l'éditeur"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </nav>

      {/* Contenu Principal Fluide */}
      <main className="clean-main">
        {/* Section Titre & Contexte Sobre */}
        <div className="clean-hero">
          <span className="clean-hero-tag">Démonstrateur Interactif</span>
          <h1>Connecteurs Souverains & BlockNote</h1>
          <p>
            Données de démonstration uniquement. Aucun résultat présenté ici ne constitue une vérification auprès d'un service public.
          </p>

          {/* Filtres discrets par pays */}
          <div className="clean-pills-bar">
            {(Object.keys(COUNTRY_PRESETS) as SupportedCountry[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleCountryChange(c)}
                className={`clean-pill ${currentCountry === c ? "active" : ""}`}
              >
                <span>{COUNTRY_PRESETS[c].flag}</span>
                <span>{COUNTRY_PRESETS[c].name}</span>
              </button>
            ))}
          </div>

          {/* Connecteurs rapides pour insertion directe */}
          <div className="clean-pills-bar" style={{ marginTop: "12px" }}>
            {activePreset.buttons.map((btn) => (
              <button
                key={btn.type + btn.label}
                type="button"
                onClick={() => handleInsert(btn.type)}
                className="clean-pill"
                title={btn.desc}
                style={{ fontSize: "0.78rem", padding: "4px 10px" }}
              >
                <SourceIcon type={btn.type} size={13} color="currentColor" />
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Éditeur BlockNote Fluide */}
        <div className="clean-editor-wrap">
          <SourceSearchProvider value={{ client: demoSearchClient, country: currentCountry }}>
          <BlockNoteView
            editor={editor}
            theme={isDark ? "dark" : "light"}
            slashMenu={false}
          >
            {/* Slash Menu (/) -> Insertion de blocs riches */}
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

            {/* Mention Menu (@) -> Insertion d'interlinking inline */}
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

        {/* Footer Minimaliste */}
        <footer className="clean-footer">
          <div>
            La Suite Numérique • Direction Interministérielle du Numérique (DINUM)
          </div>
          <div>
            Licence MIT • Accessibilité en cours de validation
          </div>
        </footer>
      </main>
    </div>
  );
};
