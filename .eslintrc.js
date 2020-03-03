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
      },
      rules: {
        'import/no-extraneous-dependencies': [2, { devDependencies: true }]
      }
    }
  ]
};
