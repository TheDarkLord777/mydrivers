const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();

module.exports = [
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('prettier'),
  ...compat.extends('plugin:prettier/recommended'),
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      globals: {
        node: true,
        browser: true,
        es2020: true,
      },
    },
    rules: {
      // Custom rules can be added here
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: ['*.ts', '*.tsx'],
  },
];