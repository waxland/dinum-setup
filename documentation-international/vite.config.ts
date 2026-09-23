import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      "@suitenumerique/blocknote-sources/exporters": path.resolve(
        __dirname,
        "../packages/blocknote-sources/src/exporters/index.ts",
      ),
      "@suitenumerique/blocknote-sources": path.resolve(
        __dirname,
        "../packages/blocknote-sources/src/index.ts",
      ),
      "@suitenumerique/slash-sources-sdk": path.resolve(
        __dirname,
        "../packages/slash-sources-sdk/src/index.ts",
      ),
    },
  },
  server: {
    watch: {
      ignored: [
        "**/.next/**",
        "**/.venv/**",
        "**/coverage/**",
        "**/dist/**",
      ],
    },
  },
  ssr: {
    noExternal: [
      "@codegouvfr/react-dsfr",
      "@suitenumerique/blocknote-sources",
      "@suitenumerique/slash-sources-sdk",
      "style-to-js",
      "style-to-object",
      "tsafe",
    ],
  },
  optimizeDeps: {
    include: ["style-to-js", "style-to-object"],
    exclude: [
      "virtual:zudoku-api-keys-plugin",
      "virtual:zudoku-api-plugins",
      "virtual:zudoku-auth",
      "virtual:zudoku-config",
      "virtual:zudoku-custom-pages-plugin",
      "virtual:zudoku-docs-plugin",
      "virtual:zudoku-markdown-files",
      "virtual:zudoku-navigation",
      "virtual:zudoku-search-plugin",
      "virtual:zudoku-shiki-register",
      "virtual:zudoku-theme.css",
    ],
  },
});
