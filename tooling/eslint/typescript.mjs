/**
 * Shared Strict TypeScript ESLint Configuration
 * Adapted from La Suite Docs (suitenumerique/docs)
 * Reference: https://github.com/suitenumerique/docs/blob/main/src/frontend/packages/eslint-plugin-docs/typescript.js
 */

export const typescriptConfig = {
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "warn",
  },
};
