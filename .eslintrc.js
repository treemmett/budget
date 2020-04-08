module.exports = {
  extends: 'zyehex/react',
  rules: {
    'import/no-unresolved': ['error', {ignore: ['rudget']}]
  },
  overrides: [
    {
      files: 'test/**/*',
      extends: 'zyehex/cypress'
    }
  ]
};
