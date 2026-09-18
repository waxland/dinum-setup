/**
 * Shared Base ESLint Configuration
 * Adapted from La Suite Docs (suitenumerique/docs)
 * Reference: https://github.com/suitenumerique/docs/blob/main/src/frontend/packages/eslint-plugin-docs/base.js
 */

export const baseConfig = {
  rules: {
    "no-var": "error",
    "prefer-const": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "curly": ["error", "all"],
    "eqeqeq": ["error", "always"],
  },
};
