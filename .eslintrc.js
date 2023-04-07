module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    './packages/core/.eslintrc-auto-import.json'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  globals: {
    __DEV__: true,
    __PROD__: true
  },
  rules: {
    indent: ['error', 'tab'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    camelcase: ['warn'],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'semi-style': ['error', 'last'],
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/component-options-name-casing': ['error', 'kebab-case'],
    'vue/multi-word-component-names': [
      'error',
      { ignores: ['home', 'login', 'layout', 'menus', '404'] }
    ]
  }
};
