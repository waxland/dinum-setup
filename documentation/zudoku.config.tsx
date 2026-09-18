import { defaultLanguages, type ZudokuConfig } from "zudoku";
import {
    AlertPreview,
    BadgePreview,
    BlockNoteSlashPlayground,
    ButtonPreview,
    CardContainerPreview,
    CodeTabs,
    ColorPalettePreview,
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
      "Documentation portal, technical guides, tutorials, and specifications for Slasher and La Suite sovereign connected sources.",
    favicon: "/favicon.ico",
  },
  site: {
    title: "Slasher — La Suite dev setup",
    banner: {
      message:
        "📖 Slasher: Universal BlockNote Standard & Sovereign Data Connectors (DINUM)",
      color: "info",
      dismissible: true,
    },
    logo: {
      src: {
        light: "/lasuite.svg",
        dark: "/lasuite-dark.svg",
      },
      alt: "Slasher — La Suite Numérique",
      width: 145,
      href: "/fr",
    },
    showPoweredBy: false,
  },
  header: {
    navigation: [
      {
        label: "🇫🇷 Français",
        to: "/fr",
        icon: "flag",
      },
      {
        label: "🇬🇧 English",
        to: "/en",
        icon: "globe",
      },
      {
        label: "⚡ Slasheurs France",
        to: "/fr/03-slasheurs-france",
        icon: "zap",
      },
      {
        label: "🏛️ La Suite",
        to: "/fr/02-la-suite",
        icon: "boxes",
      },
      {
        label: "🎨 Figma Docs",
        to: "https://www.figma.com/design/qdCWR4tTUr7vQSecEjCyqO/Docs?node-id=9722-19469&p=f&t=r1O6Np4JgTbRWrCR-0",
        target: "_blank",
        icon: "file-text",
      },
      {
        label: "🎨 Figma UI Kit",
        to: "https://www.figma.com/community/file/1562860630562131728/lasuite-ui-kit",
        target: "_blank",
        icon: "layout",
      },

      {
        label: "GitHub dinum-setup",
        to: "https://github.com/waxland/dinum-setup",
        target: "_blank",
        icon: "folder-git-2",
      },
      {
        label: "GitHub La Suite",
        to: "https://github.com/suitenumerique",
        target: "_blank",
        icon: "git-fork",
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
