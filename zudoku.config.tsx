import type { ZudokuConfig } from "zudoku";
import { docsNavigation, docsRedirects } from "./zudoku.navigation";
import "./zudoku.theme.css";

const config: ZudokuConfig = {
  metadata: {
    title: "%s | DINUM La Suite Dev Setup",
    description:
      "Documentation locale pour cloner, configurer et lancer les projets de La Suite numerique en developpement.",
  },
  site: {
    title: "La Suite dev setup",
    // banner: {
    //   message:
    //     "Documentation locale pour preparer, lancer et comprendre les projets La Suite en developpement.",
    //   color: "info",
    //   dismissible: true,
    // },
    showPoweredBy: false,
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
