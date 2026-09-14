import { defaultLanguages, type ZudokuConfig } from "zudoku";
import {
  AlertPreview,
  BadgePreview,
  ButtonPreview,
  CardContainerPreview,
  ColorPalettePreview,
  FeatureCard,
  FeatureGrid,
  FormPreview,
  HeaderBreadcrumbPreview,
  IconsCatalog,
  Mermaid,
  ModalPreview,
  NoticePreview,
  PaginationStepperPreview,
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
        "📖 Onboarding, tutoriels, glossaire & documentation pour découvrir et contribuer à La Suite numérique (Non officiel)",
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
        label: "GitHub dinum-setup",
        to: "https://github.com/suitenumerique/dinum-setup",
        target: "_blank",
        icon: "folder-git-2",
      },
      {
        label: "GitHub La Suite",
        to: "https://github.com/suitenumerique",
        target: "_blank",
        icon: "git-fork",
      },
      {
        label: "Figma UI Kit",
        to: "https://www.figma.com/community/file/1562860630562131728/lasuite-ui-kit",
        target: "_blank",
        icon: "palette",
      },
      {
        label: "Storybook UI Kit",
        to: "https://suitenumerique.github.io/ui-kit/?path=/docs/components-button--docs",
        target: "_blank",
        icon: "sparkles",
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
    ],
  },
  mdx: {
    components: {
      Mermaid,
      FeatureCard,
      FeatureGrid,
      TrackCard,
      TutorialCard,
      ColorPalettePreview,
      TypographySpecimen,
      IconsCatalog,
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
