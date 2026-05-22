// Flat ESLint 9 config. Kept intentionally light: we lint for real bugs and
// dead code, not stylistic nits (Prettier handles those). We don't pull in
// eslint-plugin-react to keep the dep tree small — Docusaurus build itself
// catches JSX/import errors via webpack + MDX, so most React-specific
// linting would be redundant.

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'build/**',
      '.docusaurus/**',
      'static/**',
      'docs/**',
      'plugins/**/*.json',
    ],
  },

  js.configs.recommended,

  // Default config for plain JS / JSX (ESM).
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // Allow empty catch — we intentionally swallow errors in places like
      // localStorage probes or feature-detection fallbacks.
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-console': 'off',
      'no-undef': 'off',
      'prefer-const': 'warn',
    },
  },

  // JSX files: turn off `no-unused-vars` because without eslint-plugin-react,
  // JSX usage (<Foo />) doesn't count as referencing the `Foo` binding, so
  // every component import looks unused. Don't trade real warnings for noise.
  // Includes .js theme swizzles since Docusaurus convention puts JSX in .js.
  {
    files: ['**/*.jsx', 'src/theme/**/*.js', 'src/pages/**/*.js'],
    rules: {
      'no-unused-vars': 'off',
    },
  },

  // CommonJS files — config, plugins, sidebars.
  {
    files: ['*.config.js', 'sidebars.js', 'plugins/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },
];
