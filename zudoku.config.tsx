import { defaultLanguages, type ZudokuConfig } from "zudoku";
import {
    AlertPreview,
    BadgePreview,
    BlockNoteSlashPlayground,
    ButtonPreview,
    CardContainerPreview,
    ColorPalettePreview,
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
    PaginationStepperPreview,
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
    title: "%s | La Suite Numérique — Documentation & Onboarding",
    description:
      "Portail d'accueil, guides pratiques, tutoriels, glossaire et documentation pour découvrir, lancer et contribuer à l'écosystème de La Suite numérique.",
    favicon: "/favicon.ico",
  },
  site: {
    title: "La Suite dev setup",
    banner: {
      message:
        "📖 Portail d'ingénierie & Socle des Sources Souveraines pour La Suite Numérique (DINUM)",
      color: "info",
      dismissible: true,
    },
    logo: {
      src: {
        light: "/lasuite.svg",
        dark: "/lasuite-dark.svg",
      },
      alt: "La Suite numérique - Non officiel",
      width: 145,
      href: "/",
    },
    showPoweredBy: false,
  },
  header: {
    navigation: [
      {
        label: "⚡ Socle /slash",
        to: "/08-slash",
        icon: "zap",
      },
      {
        label: "🚀 PRs Officielles",
        to: "/09-PR",
        icon: "git-pull-request",
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
    ],
  },
  mdx: {
    components: {
      Mermaid,
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
