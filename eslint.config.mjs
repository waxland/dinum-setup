import { baseConfig, typescriptConfig } from "./tooling/eslint/index.mjs";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/storybook-static/**",
      "**/coverage/**",
      "**/.venv/**",
      "**/__pycache__/**",
      "**/.zudoku/**",
      "**/.next/**",
      "LaSuite/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    rules: {
      ...baseConfig.rules,
      ...typescriptConfig.rules,
    },
  },
];
