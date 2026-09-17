import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
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
    port: 5173,
    host: "0.0.0.0",
  },
});
