const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['turbo', 'prettier', 'eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:@typescript-eslint/recommended', 'plugin:@next/next/recommended'],

  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    // Disable prop-types as we use TypeScript for type checking
    'react/prop-types': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ], //should add ".ts" if typescript project
    'react/display-name': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    //"prettier/prettier": "error",
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    // needed for NextJS's jsx without react import
    'react/react-in-jsx-scope': 'off',
    'import/no-unused-modules': [1, { unusedExports: true }],
    'react/no-unknown-property': [2, { ignore: ['jsx', 'global'] }],
  },
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  ignorePatterns: ['!.*', 'dist', 'node_modules', '.next', '*.config.ts', '*.test.ts?(x)'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};