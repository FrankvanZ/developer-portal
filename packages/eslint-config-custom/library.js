const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "turbo",
    "prettier", 
    "eslint-config-turbo", 
    "plugin:react/recommended",
    "plugin:import/recommended",
    'plugin:react/jsx-runtime', 
    'plugin:@typescript-eslint/recommended', 
    'plugin:@next/next/recommended',
  ],
  plugins: ["only-warn", "unused-imports"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  rules: {
    "import/no-unused-modules": [1, {"unusedExports": true}],
    "unused-imports/no-unused-imports": "error",
    '@next/next/no-html-link-for-pages': 'off',
    "import/no-unused-modules": [1, {"unusedExports": true}],
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
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    ".*.json",
    "node_modules/",
    "dist/",
    ".next",
    "!.*",
    "*.d.ts"
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
};