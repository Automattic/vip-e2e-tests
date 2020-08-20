module.exports = {
  env: {
    browser: true,
    es2020: true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'cypress',
  ],
};
