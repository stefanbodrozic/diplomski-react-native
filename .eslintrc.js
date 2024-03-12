module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // 'standard',
    // 'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all'
  ],
  overrides: [
    {
      env: {
        // node: true
        'react-native/react-native': true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    // ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', 'react-native'],
  rules: {
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/no-color-literals': 'off',
    'react-native/no-inline-styles': 'warn',

    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  }
}
