module.exports = {
  extends: 'zyehex/react',
  rules: {
    'import/no-unresolved': ['error', {ignore: ['rudget']}],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/unbound-method': 'off'
  },
  overrides: [
    {
      files: 'test/**/*',
      extends: 'zyehex/cypress'
    }
  ]
};
