import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: { globals: globals.browser },
    plugins:{
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'arrow-body-style': 0,
      'arrow-parens': ['error', 'as-needed'],
      'no-underscore-dangle': 0,
      'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],
      'prefer-destructuring': 0,
      'react/forbid-prop-types': ['error', { forbid: ['any', 'array', 'object', 'instanceOf'] }],
      'react/jsx-filename-extension': 0,
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/prop-types': ['error', { ignore: ['children', 'className'] }],
      'react/require-default-props': 0,
      'react/no-multi-comp': 0,
      'react/boolean-prop-naming': 2,
      'function-paren-newline': 0,
      'quote-props': 0,
      'object-curly-newline': ['error', { consistent: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-props-no-spreading': 0,
      'react/function-component-definition': 0,
      'react/destructuring-assignment': 0,
      'no-restricted-exports': 0,
      'react/no-unstable-nested-components': 0,
      'import/no-cycle': 0,
      'react/button-has-type': 1,
      'react/no-unused-prop-types': 0,
      'react/no-unknown-property': 0,
      'no-promise-executor-return': 0,
      'react/jsx-no-constructed-context-values': 1,
    }},
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
