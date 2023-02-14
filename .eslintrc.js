
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    '@nuxt/eslint-config',
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: ['vue'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    quotes: [2, 'single', { avoidEscape: true }],
  },
  globals: {
    $nuxt: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
