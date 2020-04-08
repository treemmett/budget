module.exports = {
  extends: 'zyehex/react',
  rules: {
    'import/no-unresolved': ['error', {ignore: ['rudget']}],
    'react/jsx-one-expression-per-line': 'off'
  },
  overrides: [
    {
      files: 'test/**/*',
      extends: 'zyehex/cypress'
    }
  ]
};
