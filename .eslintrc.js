module.exports = {
  extends: 'zyehex/react',
  overrides: [
    {
      files: 'test/**/*',
      extends: 'zyehex/cypress'
    }
  ]
};
