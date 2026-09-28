import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "exporters/index": "src/exporters/index.ts",
    "exporters/pdf": "src/exporters/pdf.ts",
    "exporters/docx": "src/exporters/docx.ts",
    "exporters/odt": "src/exporters/odt.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  // react-dsfr ships extensionless ESM imports that Node cannot load directly during SSR.
  noExternal: ["@codegouvfr/react-dsfr"],
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
