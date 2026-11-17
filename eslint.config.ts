import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import regexp from 'eslint-plugin-regexp';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    'dist/**',
    '.astro/**',
    '.yarn/**',
    '.idea/**',
    'coverage/**',
  ]),
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
    rules: {
      'astro/no-set-html-directive': 'error',
    },
  },
  {
    files: ['**/*.{ts,astro}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      regexp,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^astro', '^@?\\w'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'regexp/no-useless-escape': 'error',
      'regexp/no-useless-non-capturing-group': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-invalid-void-type': [
        'error',
        { allowAsThisParameter: true, allowInGenericTypeArguments: true },
      ],
    },
  },
  prettier,
]);
