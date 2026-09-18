import { defaultLanguages, type ZudokuConfig } from "zudoku";
import {
    AlertPreview,
    BadgePreview,
    BlockNoteSlashPlayground,
    ButtonPreview,
    CardContainerPreview,
    CodeTabs,
    ColorPalettePreview,
    DocHeaderSummary,
    DualLanguageTabs,
    FeatureCard,
    FeatureGrid,
    FormPreview,
    HeaderBreadcrumbPreview,
    IconsCatalog,
    Kanban,
    LawSlashPreview,
    Mermaid,
    ModalPreview,
    NoticePreview,
    OnboardingTracks,
    PackageInstallTabs,
    PaginationStepperPreview,
    PythonInstallTabs,
    ScheduleDay,
    ScheduleItem,
    TablePreview,
    TrackCard,
    TutorialCard,
    TypographySpecimen,
} from "./src/components";
import { docsNavigation, docsRedirects } from "./zudoku.navigation";
import "./zudoku.theme.css";

const config: ZudokuConfig = {
  metadata: {
    title: "%s | Slasher — Universal BlockNote Standard & Sovereign Connectors",
    description:
      "Universal BlockNote standard, TypeScript SDK, 3-tier architecture, and multi-country sovereign presets (EU, Canada, Germany, Netherlands, Spain, UN/World Bank).",
    favicon: "/favicon.ico",
  },
  site: {
    title: "Slasher — Universal BlockNote Standard",
    banner: {
      message:
        "🌍 Slasher: Universal BlockNote Standard & Multi-Country Sovereign Connectors",
      color: "info",
      dismissible: true,
    },
    logo: {
      src: {
        light: "/lasuite.svg",
        dark: "/lasuite-dark.svg",
      },
      alt: "Slasher — Universal BlockNote Standard",
      width: 145,
      href: "/",
    },
    showPoweredBy: false,
  },
  header: {
    navigation: [
      {
        label: "GitHub dinum-setup",
        to: "https://github.com/waxland/dinum-setup",
        target: "_blank",
        icon: "folder-git-2",
      },
    ],
  },
  syntaxHighlighting: {
    languages: [
      ...defaultLanguages,
      "mermaid",
      "make",
      "docker",
      "dockerfile",
      "nginx",
      "http",
      "dotenv",
      "ssh-config",
      "ini",
    ],
  },
  mdx: {
    components: {
      Mermaid,
      CodeTabs,
      PackageInstallTabs,
      PythonInstallTabs,
      DualLanguageTabs,
      DocHeaderSummary,
      OnboardingTracks,
      FeatureCard,
      FeatureGrid,
      TrackCard,
      TutorialCard,
      ScheduleDay,
      ScheduleItem,
      ColorPalettePreview,
      TypographySpecimen,
      IconsCatalog,
      Kanban,
      LawSlashPreview,
      BlockNoteSlashPlayground,
      ButtonPreview,
      BadgePreview,
      AlertPreview,
      ModalPreview,
      NoticePreview,
      TablePreview,
      FormPreview,
      CardContainerPreview,
      PaginationStepperPreview,
      HeaderBreadcrumbPreview,
    },
  },
  docs: {
    files: "./docs/**/*.{md,mdx}",
    publishMarkdown: true,
    defaultOptions: {
      showLastModified: true,
    },
  },
  navigation: docsNavigation,
  redirects: docsRedirects,
};

export default config;
