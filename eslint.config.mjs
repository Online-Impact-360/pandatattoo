// eslint.config.mjs
import next from "@next/eslint-plugin-next";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // ignore build artifacts
  { ignores: ["node_modules", ".next", "out"] },

  {
    files: ["**/*.{js,jsx}"],

    // ⬇️ This is the key bit that fixes "Unexpected token <"
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      "@next/next": next,
    },

    rules: {
      ...next.configs["core-web-vitals"].rules,
    },
  },
];
