import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import storybook from "eslint-plugin-storybook";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "site-dist/**",
      ".tmp-metrics/**",
      ".tmp-treeshake/**",
      "dev-dist/**",
      "storybook-static/**",
      "node_modules/**",
      "coverage/**",
      "*.config.js",
      "scripts/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    files: ["**/*.stories.tsx", "**/*.stories.ts"],
    extends: [...storybook.configs["flat/recommended"]],
  },
  {
    files: [".storybook/**"],
    rules: {
      "storybook/story-exports": "off",
      "storybook/default-exports": "off",
      "storybook/no-uninstalled-addons": "off",
    },
  },
  prettier,
);
