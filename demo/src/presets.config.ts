import type {
  SourceEntityType,
  SupportedCountry,
  SupportedLocale,
} from "@suitenumerique/blocknote-sources";

export interface CountryPresetConfig {
  country: SupportedCountry;
  name: string;
  flag: string;
  defaultLocale: SupportedLocale;
  description: string;
  buttons: { type: SourceEntityType; label: string; icon: string; desc: string }[];
}

export const COUNTRY_PRESETS: Record<SupportedCountry, CountryPresetConfig> = {
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
