const config = {
  '*': ['prettier -l', 'cspell --gitignore'],
  '*.(css|scss)': 'stylelint',
  '*.(ts|tsx|js|jsx)': 'eslint',
};

export default config;
