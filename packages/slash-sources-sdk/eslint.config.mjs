import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { baseConfig, typescriptConfig } from "../../tooling/eslint/index.mjs";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "*.d.ts"],
  },
  {
    files: ["src/**/*.{ts,tsx}", "demo/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...baseConfig.rules,
      ...typescriptConfig.rules,
    },
  },
];
