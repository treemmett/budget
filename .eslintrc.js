module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  root: true,
  env: {
    browser: true,
    es6: true
  },
  rules: {
    'no-param-reassign': 0,
    'prettier/prettier': [2, { singleQuote: true }],
    'react/button-has-type': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.jsx'] }],
    'react/require-default-props': 0,
    '@typescript-eslint/explicit-function-return-type': [
      2,
      { allowExpressions: true, allowTypedFunctionExpressions: true }
    ]
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
