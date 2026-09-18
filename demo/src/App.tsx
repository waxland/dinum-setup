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
    description: "Pan-European Sovereign Connectors (EUR-Lex, Europarl, TED, Eurostat, Funding & Tenders, data.europa.eu...)",
    buttons: [
      { type: "law", label: "/eurlex", icon: "⚖️", desc: "EUR-Lex (EU Law & Treaties)" },
      { type: "parliament", label: "/europarl", icon: "🏛️", desc: "European Parliament Open Data" },
      { type: "procurement", label: "/ted", icon: "🛍️", desc: "TED (Tenders Electronic Daily)" },
      { type: "statistics", label: "/eurostat", icon: "📊", desc: "Eurostat Statistics API" },
      { type: "grant", label: "/funding", icon: "💶", desc: "EU Funding & Tenders Portal" },
      { type: "opendata", label: "/dataeuropa", icon: "🌐", desc: "data.europa.eu Catalog" },
      { type: "agent", label: "/whoiswho", icon: "👤", desc: "EU Whoiswho Directory" },
      { type: "research", label: "/cordis", icon: "🔬", desc: "CORDIS Horizon Europe Research" },
      { type: "case-law", label: "/curia", icon: "⚖️", desc: "CURIA & ECLI (CJEU Case Law)" },
    ],
  },
  ca: {
    country: "ca",
    name: "Canada",
    flag: "🇨🇦",
    defaultLocale: "en",
    description: "Canadian Federal Sovereign Connectors (Justice Laws, Corporations Canada, LEGISinfo, StatCan, GeoNames...)",
    buttons: [
      { type: "law", label: "/canlaw", icon: "⚖️", desc: "Justice Laws Canada (Statutes & Regulations)" },
      { type: "company", label: "/corporation-ca", icon: "🏢", desc: "Corporations Canada Federal Registry" },
      { type: "parliament", label: "/parliament-ca", icon: "🏛️", desc: "House of Commons & LEGISinfo" },
      { type: "statistics", label: "/statcan", icon: "📊", desc: "Statistics Canada (StatCan WDS)" },
      { type: "opendata", label: "/opencanada", icon: "🌐", desc: "Open Government Canada (CKAN)" },
      { type: "procurement", label: "/canadabuys", icon: "🛍️", desc: "CanadaBuys Federal Procurement" },
      { type: "place", label: "/geonames-ca", icon: "📍", desc: "GeoNames Canada (RNCan)" },
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
              status: "En vigueur",
              url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037812976",
              excerpt: "Un marché est un contrat conclu par un ou plusieurs acheteurs...",
              verifiedAt: "17/09/2026",
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
    if (!editor) return [];

    const currentPool = [
      ...MOCK_FRANCE_SOURCES,
      ...ALL_INTERNATIONAL_MOCK_SOURCES.filter(
        (s) => s.country === currentCountry && s.country !== "fr"
      ),
    ];

    return currentPool.map((item) => ({
      title: item.title,
      subtext: `${item.subtitle || ""} (${item.entityType})`,
      icon: <SourceIcon type={item.entityType} size={15} color="var(--blue-france-sun-113, #000091)" />,
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
    <div className="lasuite-app">
      {/* Header Officiel — République Française / La Suite Numérique */}
      <header className="lasuite-header" role="banner">
        <div className="lasuite-header-container">
          <div className="lasuite-brand-group">
            {/* Bloc Marque État Français (Marianne) */}
            <div className="lasuite-marianne-badge">
              <img
                src="/gouv.svg"
                alt="Gouvernement de la République Française"
                className="lasuite-marianne-logo"
                onError={(e) => {
                  // Fallback si SVG manquant
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
              <div>
                <div className="lasuite-marianne-text">
                  République<br />Française
                </div>
                <div className="lasuite-marianne-subtext">
                  Liberté • Égalité • Fraternité
                </div>
              </div>
            </div>

            {/* Logo & Titre Produit La Suite Docs */}
            <div className="lasuite-title-wrap">
              <img
                src={isDark ? "/lasuite-dark.svg" : "/lasuite.svg"}
                alt="La Suite Numérique"
                className="lasuite-product-logo"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
              <h1 className="lasuite-product-title">
                Docs
                <span className="lasuite-product-badge">
                  {activePreset.flag} {activePreset.name}
                </span>
              </h1>
            </div>
          </div>

          {/* Contrôles d'en-tête (Presets pays, Langue, Thème, Reset) */}
          <div className="lasuite-header-actions">
            {/* Sélecteur de Preset Pays (Segmented Control DSFR) */}
            <div
              className="lasuite-country-segmented"
              role="tablist"
              aria-label="Sélectionner un jeu de données souverain"
            >
              {(Object.keys(COUNTRY_PRESETS) as SupportedCountry[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={currentCountry === c}
                  onClick={() => handleCountryChange(c)}
                  className={`lasuite-country-tab ${currentCountry === c ? "active" : ""}`}
                  title={COUNTRY_PRESETS[c].description}
                >
                  <span>{COUNTRY_PRESETS[c].flag}</span>
                  <span>{COUNTRY_PRESETS[c].name}</span>
                </button>
              ))}
            </div>

            {/* Sélecteur de Langue (Group de boutons DSFR) */}
            <div
              className="lasuite-locale-group"
              role="group"
              aria-label="Choisir la langue de l'interface"
            >
              {(["fr", "en", "de", "nl", "es"] as SupportedLocale[]).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setCurrentLocale(loc)}
                  className={`lasuite-locale-btn ${currentLocale === loc ? "active" : ""}`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Toggle Mode Sombre */}
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className="lasuite-btn"
              title={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
              aria-label={isDark ? "Mode clair" : "Mode sombre"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {/* Lien Portail de Documentation */}
            <a
              href="https://dinum-docs-waxlands-projects.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="lasuite-btn lasuite-btn-primary"
              title="Consulter la documentation officielle Zudoku"
            >
              📖 Docs
            </a>

            {/* Bouton Réinitialiser l'Éditeur */}
            <button
              type="button"
              onClick={handleReset}
              className="lasuite-btn lasuite-btn-danger"
              title="Vider le document"
            >
              🗑️ {i18n.actions.remove}
            </button>
          </div>
        </div>
      </header>

      {/* Espace de travail Document ("La Suite Docs" Canvas) */}
      <div className="demo-workspace">
        {/* Fil d'Ariane & Badges de Certification */}
        <div className="lasuite-context-bar">
          <nav className="lasuite-breadcrumb" aria-label="Fil d'Ariane">
            <a href="#accueil">La Suite</a>
            <span className="lasuite-breadcrumb-separator">/</span>
            <a href="#docs">Docs</a>
            <span className="lasuite-breadcrumb-separator">/</span>
            <span className="lasuite-breadcrumb-current">
              Démonstrateur Connecteurs Souverains
            </span>
          </nav>

          <div className="lasuite-meta-badges">
            <span className="lasuite-chip lasuite-chip-success">
              🔒 Conforme RGAA v4.1 AA
            </span>
            <span className="lasuite-chip">
              🛡️ Anti-SSRF & Cache Déterministe
            </span>
            <span className="lasuite-chip">
              ⚡ BlockNote.js Extension
            </span>
          </div>
        </div>

        {/* Barre d'outils / Accès Rapide aux Commandes Slash */}
        <section className="lasuite-toolbar" aria-label="Connecteurs rapides">
          <div className="lasuite-toolbar-header">
            <span className="lasuite-toolbar-title">
              <span>{activePreset.flag}</span>
              <span>Connecteurs Disponibles ({activePreset.name})</span>
            </span>
            <span className="lasuite-toolbar-hint">
              💡 Tapez <code>/</code> dans l'éditeur ou cliquez sur un connecteur ci-dessous :
            </span>
          </div>
          <div className="lasuite-connector-pills">
            {activePreset.buttons.map((btn) => (
              <button
                key={btn.type + btn.label}
                type="button"
                onClick={() => handleInsert(btn.type)}
                className="demo-btn"
                title={btn.desc}
              >
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  <SourceIcon type={btn.type} size={15} color="currentColor" />
                </span>
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Feuille de Document Officielle (La Suite Docs Sheet) */}
        <main className="demo-editor-card" role="main">
          {/* En-tête de Document */}
          <div className="docs-sheet-header">
            <input
              type="text"
              defaultValue="Document de Référence — Sources Souveraines & Données Publiques"
              className="docs-sheet-title-input"
              aria-label="Titre du document"
              placeholder="Sans titre"
            />
            <div className="docs-sheet-meta">
              <span>👤 Auteur : Équipe La Suite Numérique (DINUM)</span>
              <span>•</span>
              <span>🕒 Synchronisation : Temps réel Yjs / REST</span>
              <span>•</span>
              <span>📋 Format : 100% Cunningham DSFR</span>
            </div>
          </div>

          {/* Éditeur BlockNote */}
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
        </main>

        {/* Pied de Page Institutionnel */}
        <footer className="lasuite-footer">
          <div>
            <strong>La Suite Numérique</strong> — Direction Interministérielle du Numérique (DINUM) • Licence MIT
          </div>
          <div className="lasuite-footer-links">
            <a
              href="https://github.com/waxland/dinum-setup"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Monorepo
            </a>
            <a
              href="https://dinum-docs-waxlands-projects.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portail Documentaire
            </a>
            <a
              href="https://dinum-storybook-waxlands-projects.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Storybook
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

