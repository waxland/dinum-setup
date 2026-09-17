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
        "packages/blocknote-sources/src/exporters/index.ts",
      ),
      "@suitenumerique/blocknote-sources": path.resolve(
        __dirname,
        "packages/blocknote-sources/src/index.ts",
      ),
      "@suitenumerique/slash-sources-sdk": path.resolve(
        __dirname,
        "packages/slash-sources-sdk/src/index.ts",
      ),
    },
  },
  server: {
    watch: {
      ignored: [
        "**/src/docs/**",
        "**/src/meet/**",
        "**/src/transfers/**",
        "**/src/people/**",
        "**/src/accounts/**",
        "**/src/projects/**",
        "**/.next/**",
        "**/.venv/**",
        "**/coverage/**",
        "**/dist/**",
      ],
    },
  },
  optimizeDeps: {
    include: ["style-to-js", "style-to-object"],
    esbuildOptions: {
      plugins: [
        {
          name: "ignore-virtual-zudoku-modules",
          setup(build) {
            build.onResolve({ filter: /^virtual:zudoku/ }, (args) => {
              return { path: args.path, external: true };
            });
          },
        },
      ],
    },
  },
});
