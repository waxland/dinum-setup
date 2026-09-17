import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "exporters/index": "src/exporters/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@blocknote/core",
    "@blocknote/react",
    "@react-pdf/renderer",
    "docx",
    "styled-components",
  ],
  sourcemap: true,
});
