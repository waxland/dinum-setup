import "@gouvfr/dsfr/dist/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/utility.min.css";
import type { ZudokuConfig } from "zudoku";
import "./zudoku.theme.css";

const config: ZudokuConfig = {
  metadata: {
    title: "%s | DINUM La Suite Dev Setup",
    description:
      "Documentation locale pour cloner, configurer et lancer les projets de La Suite numerique en developpement.",
  },
  site: {
    title: "La Suite dev setup",
    banner: {
      message:
        "Documentation locale pour preparer, lancer et comprendre les projets La Suite en developpement.",
      color: "info",
      dismissible: true,
    },
    showPoweredBy: true,
  },
  docs: {
    files: "./docs/**/*.{md,mdx}",
    publishMarkdown: true,
    defaultOptions: {
      showLastModified: true,
    },
  },
  navigation: [
    {
      type: "category",
      label: "Guide",
      icon: "book-open",
      link: {
        type: "doc",
        file: "docs/index.md",
        path: "/",
        label: "Accueil",
      },
      items: [
        { type: "doc", file: "docs/index.md", path: "/", label: "Accueil" },
        { type: "doc", file: "docs/workflow.md", label: "Workflow Makefile" },
        { type: "doc", file: "docs/env.md", label: "Variables et .env" },
        { type: "doc", file: "docs/auth.md", label: "Authentification" },
        { type: "doc", file: "docs/hot-reload.md", label: "Hot reload" },
        {
          type: "doc",
          file: "docs/projects-status.md",
          label: "Etat des projets",
        },
        { type: "doc", file: "docs/dsfr.md", label: "DSFR officiel" },
      ],
    },
    {
      type: "category",
      label: "Projets",
      icon: "boxes",
      items: [
        { type: "doc", file: "docs/docs.md", label: "Docs" },
        { type: "doc", file: "docs/projects.md", label: "Projects" },
        { type: "doc", file: "docs/meet.md", label: "Meet / Visio" },
        { type: "doc", file: "docs/transfers.md", label: "Transfers" },
        { type: "doc", file: "docs/people.md", label: "People" },
        { type: "doc", file: "docs/accounts.md", label: "Accounts" },
      ],
    },
    {
      type: "category",
      label: "Liens",
      icon: "external-link",
      items: [
        {
          type: "link",
          label: "GitHub La Suite",
          to: "https://github.com/suitenumerique",
          target: "_blank",
        },
        {
          type: "link",
          label: "Site La Suite",
          to: "https://lasuite.numerique.gouv.fr/",
          target: "_blank",
        },
      ],
    },
  ],
};

export default config;
