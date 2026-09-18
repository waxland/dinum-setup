import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
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
  getLocaleDictionary,
  type ExternalSourceDisplayMode,
  type ExternalSourceEntity,
  type SourceEntityType,
  type SupportedCountry,
  type SupportedLocale
} from "@suitenumerique/blocknote-sources";



interface CountryPresetConfig {
  country: SupportedCountry;
  name: string;
  flag: string;
  defaultLocale: SupportedLocale;
  description: string;
  buttons: { type: SourceEntityType; label: string; icon: string; desc: string }[];
}

const COUNTRY_PRESETS: Record<SupportedCountry, CountryPresetConfig> = {
  fr: {
    country: "fr",
    name: "France",
    flag: "🇫🇷",
    defaultLocale: "fr",
    description: "Connecteurs Souverains DINUM / République Française (Légifrance, Annuaire Entreprises, BAN, BOAMP...)",
    buttons: [
      { type: "law", label: "/loi", icon: "⚖️", desc: "Légifrance / DILA" },
      { type: "company", label: "/entreprise", icon: "🏢", desc: "Annuaire Entreprises / RNE" },
      { type: "parliament", label: "/assemblee", icon: "🏛️", desc: "Assemblée Nationale" },
      { type: "address", label: "/adresse", icon: "📍", desc: "Base Adresse Nationale" },
      { type: "procurement", label: "/marche", icon: "🛍️", desc: "BOAMP / Marchés Publics" },
      { type: "grant", label: "/subvention", icon: "💶", desc: "Aides-Territoires / Fonds Vert" },
      { type: "insee", label: "/stats", icon: "📊", desc: "Données Locales INSEE" },
      { type: "agent", label: "/agent", icon: "👤", desc: "Annuaire du Service Public" },
      { type: "cadastre", label: "/cadastre", icon: "🗺️", desc: "Géoplateforme Cadastre DGFiP" },
      { type: "demarche", label: "/demarche", icon: "📝", desc: "Démarches-Simplifiées.fr" },
      { type: "opendata", label: "/opendata", icon: "🌐", desc: "data.gouv.fr" },
      { type: "custom", label: "/albert", icon: "🧠", desc: "Albert IA Souveraine RAG" },
    ],
  },
  de: {
    country: "de",
    name: "Deutschland",
    flag: "🇩🇪",
    defaultLocale: "de",
    description: "Souveräne Konnektoren Bundesrepublik Deutschland (Gesetze im Internet, Handelsregister, OpenCoDE...)",
    buttons: [
      { type: "law", label: "/gesetz", icon: "⚖️", desc: "Gesetze im Internet (BMJ)" },
      { type: "company", label: "/register", icon: "🏢", desc: "Gemeinsames Registerportal" },
      { type: "parliament", label: "/bundestag", icon: "🏛️", desc: "Deutscher Bundestag (DIP)" },
      { type: "opendata", label: "/govdata", icon: "🌐", desc: "GovData Deutschland" },
    ],
  },
  nl: {
    country: "nl",
    name: "Nederland",
    flag: "🇳🇱",
    defaultLocale: "nl",
    description: "Overheidsconnectoren Koninkrijk der Nederlanden (Wetten.overheid.nl, KVK, BAG, Open Webconcept...)",
    buttons: [
      { type: "law", label: "/wet", icon: "⚖️", desc: "Wetten.overheid.nl (KOOP)" },
      { type: "company", label: "/kvk", icon: "🏢", desc: "Kamer van Koophandel Handelsregister" },
      { type: "address", label: "/bag", icon: "📍", desc: "Basisregistratie Adressen en Gebouwen" },
      { type: "opendata", label: "/dataoverheid", icon: "🌐", desc: "Data.overheid.nl" },
    ],
  },
  es: {
    country: "es",
    name: "España",
    flag: "🇪🇸",
    defaultLocale: "es",
    description: "Conectores Soberanos Reino de España (BOE, Registro Mercantil, Plataforma de Contratación, Catastro...)",
    buttons: [
      { type: "law", label: "/ley", icon: "⚖️", desc: "Boletín Oficial del Estado (BOE)" },
      { type: "company", label: "/empresa", icon: "🏢", desc: "Registro Mercantil de España" },
      { type: "procurement", label: "/licitacion", icon: "🛍️", desc: "Plataforma de Contratación del Estado" },
      { type: "cadastre", label: "/catastro", icon: "🗺️", desc: "Sede Electrónica del Catastro" },
    ],
  },
  eu: {
    country: "eu",
    name: "European Union",
    flag: "🇪🇺",
    defaultLocale: "en",
    description: "Pan-European Sovereign Connectors (EUR-Lex, TED eProcurement, EU Open Data, CORDIS...)",
    buttons: [
      { type: "law", label: "/eurlex", icon: "⚖️", desc: "EUR-Lex (EU Law & Directives)" },
      { type: "procurement", label: "/ted", icon: "🛍️", desc: "TED (Tenders Electronic Daily)" },
      { type: "opendata", label: "/dataeuropa", icon: "🌐", desc: "data.europa.eu" },
    ],
  },
};


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
            text: "Demo Hub — ",
            styles: {},
          },
          {
            type: "text",
            text: "@blocknote/xl-external-sources (Multi-Country Sovereign Connectors)",
            styles: { bold: true },
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Type ",
            styles: {},
          },
          {
            type: "text",
            text: "/",
            styles: { code: true, bold: true },
          },
          {
            type: "text",
            text: " to browse external sources or click on preset buttons below :",
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

    if (!editor) return;
    const countryData = ALL_INTERNATIONAL_MOCK_SOURCES.filter((s) => s.country === country);
    if (countryData.length > 0) {
      editor.replaceBlocks(editor.document, [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: `${COUNTRY_PRESETS[country].flag} Sovereign Dataset Loaded: ${COUNTRY_PRESETS[country].name}`,
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
    if (!editor) return [];

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
        icon: <span>⚖️</span>,
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
        icon: <span>🏢</span>,
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
        icon: <span>🏛️</span>,
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
        icon: <span>📍</span>,
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
        icon: <span>🛍️</span>,
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
        icon: <span>💶</span>,
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
        icon: <span>📊</span>,
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
        icon: <span>🌐</span>,
        subtext: "Insert a certified open dataset record",
      },
    ];

    return [...customItems, ...getDefaultReactSlashMenuItems(editor)];
  }, [editor]);

  const handleInsert = (type: SourceEntityType) => {
    if (!editor) return;
    const currentBlock =
      editor.getTextCursorPosition()?.block ||
      editor.document[editor.document.length - 1];
    editor.insertBlocks([createEmptySourceBlock(type)], currentBlock, "after");
  };

  const handleReset = () => {
    if (!editor) return;
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
    <div className="demo-container">
      {/* Header */}
      <header className="demo-header">
        <div className="demo-title-group">
          <h1>
            <span>{activePreset.flag}</span>
            <span>Slasher — Connected Data Blocks</span>
          </h1>
          <p>
            {activePreset.description}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Country Selector */}
          <div style={{ display: "flex", gap: "4px", background: "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "8px" }}>
            {(Object.keys(COUNTRY_PRESETS) as SupportedCountry[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleCountryChange(c)}
                className="demo-btn"
                style={{
                  fontWeight: currentCountry === c ? "bold" : "normal",
                  background: currentCountry === c ? "#2563eb" : "transparent",
                  color: currentCountry === c ? "#ffffff" : "inherit",
                  padding: "4px 8px",
                  fontSize: "0.85rem",
                }}
              >
                {COUNTRY_PRESETS[c].flag} {COUNTRY_PRESETS[c].name}
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <select
            value={currentLocale}
            onChange={(e) => setCurrentLocale(e.target.value as SupportedLocale)}
            className="demo-btn"
            style={{ padding: "6px 10px", fontSize: "0.85rem", cursor: "pointer" }}
          >
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="nl">🇳🇱 Nederlands</option>
            <option value="es">🇪🇸 Español</option>
          </select>


          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="demo-btn"
            title="Toggle theme"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="demo-btn"
            style={{ color: "#e1000f", borderColor: "#fca5a5" }}
            title="Reset editor"
          >
            🗑️ {i18n.actions.remove}
          </button>
        </div>
      </header>

      {/* Toolbar with country-specific fast buttons */}
      <div className="demo-toolbar">
        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>
          {activePreset.flag} {activePreset.name} Connectors:
        </div>
        <div className="demo-btn-group">
          {activePreset.buttons.map((btn) => (
            <button
              key={btn.type + btn.label}
              type="button"
              onClick={() => handleInsert(btn.type)}
              className="demo-btn"
              title={btn.desc}
            >
              <span>{btn.icon}</span>
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Card */}
      <main className="demo-editor-card">
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
        </BlockNoteView>
      </main>
    </div>
  );
};

