module.exports = {
  extends: 'zyehex/react',
  overrides: [
    {
      files: '**/*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 0
      }
    },
    {
      files: '!src/**/*',
      env: {
        node: true
      }
    }
  ]
};
