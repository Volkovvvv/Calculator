import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import js from '@eslint/js';

export default [
  {
    ignores: ['node_modules'],
  },
  js.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': ['warn'],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];
