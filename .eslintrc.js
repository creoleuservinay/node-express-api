module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    "tslint:recommended",
    "tslint-config-prettier",
    "tslint-config-airbnb"
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
  },
};
