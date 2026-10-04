import type { ZudokuConfig } from "zudoku";

export const docsNavigation: ZudokuConfig["navigation"] = [
  {
    type: "doc",
    file: "index.mdx",
    path: "/",
    label: "Home",
    icon: "home",
  },
  {
    type: "category",
    label: "Overview",
    icon: "folder",
    collapsed: false,
    items: [
      {
        type: "doc",
        file: "00-overview/index.mdx",
        path: "/00-overview",
      },
      "/00-overview/05-toml-frontmatter",
      "/00-overview/architecture-3-tier",
      "/00-overview/engineering-standards",
      "/00-overview/international-vision",
    ],
  },
  {
    type: "category",
    label: "BlockNote Extension",
    icon: "monitor",
    collapsed: false,
    items: [
      {
        type: "doc",
        file: "01-blocknote-extension/index.mdx",
        path: "/01-blocknote-extension",
      },
      "/01-blocknote-extension/3-display-formats",
      "/01-blocknote-extension/consumer-migration-guide",
      "/01-blocknote-extension/document-exports",
      "/01-blocknote-extension/floating-search-popover",
      "/01-blocknote-extension/styling-and-themes",
    ],
  },
  {
    type: "category",
    label: "Provider SDK",
    icon: "code",
    collapsed: false,
    items: [
      {
        type: "doc",
        file: "02-provider-sdk/index.mdx",
        path: "/02-provider-sdk",
      },
      "/02-provider-sdk/build-provider-in-15-min",
      "/02-provider-sdk/define-source-provider",
      "/02-provider-sdk/typescript-contracts",
    ],
  },
  {
    type: "category",
    label: "Backend Proxy",
    icon: "server",
    collapsed: false,
    items: [
      {
        type: "doc",
        file: "03-backend-proxy/index.mdx",
        path: "/03-backend-proxy",
      },
      "/03-backend-proxy/defensive-security-ssrf",
      "/03-backend-proxy/deterministic-cache",
      "/03-backend-proxy/quota-and-rate-limiting",
    ],
  },
  {
    type: "category",
    label: "Presets",
    icon: "folder",
    collapsed: false,
    items: [
      {
        type: "doc",
        file: "04-presets/index.mdx",
        path: "/04-presets",
      },
      "/04-presets/canada",
      "/04-presets/european-union",
      "/04-presets/germany-bund",
      "/04-presets/international",
      "/04-presets/netherlands-gov",
      "/04-presets/spain-boe",
    ],
  },
  {
    type: "category",
    label: "RFC & Specification",
    icon: "folder",
    collapsed: false,
    items: [
      {
        type: "doc",
        file: "05-rfc-upstream/index.mdx",
        path: "/05-rfc-upstream",
      },
      "/05-rfc-upstream/blocknote-rfc-specification",
    ],
  },
];

export const docsRedirects: ZudokuConfig["redirects"] = [
  {
    from: "/index",
    to: "/",
  },
  {
    from: "/overview",
    to: "/00-overview",
  },
  {
    from: "/blocknote",
    to: "/01-blocknote-extension",
  },
  {
    from: "/sdk",
    to: "/02-provider-sdk",
  },
  {
    from: "/proxy",
    to: "/03-backend-proxy",
  },
  {
    from: "/presets",
    to: "/04-presets",
  },
  {
    from: "/rfc",
    to: "/05-rfc-upstream",
  },
];
