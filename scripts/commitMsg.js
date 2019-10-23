const chalk = require('chalk');
const fs = require('fs');

function fail(message) {
  console.error(chalk.red(message));
  process.exit(1);
}

if (!process.env.HUSKY_GIT_PARAMS) {
  throw fail('Commit message not found.');
}

// retrieve commit message
const msg = fs.readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf-8');

if (!msg) {
  throw fail('No commit message.');
}

// split message lines, filtering out comments
const lines = msg.split('\n').filter(line => !line.trim().startsWith('#'));

// list of acceptable types
const types = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'style',
  'test'
];

// check if commit is an approved type
if (!types.some(type => lines[0].toLowerCase().startsWith(type))) {
  throw fail(
    `Message head must start with one of these types:\n\n${chalk.yellow(
      types.join(', ')
    )}`
  );
}

// check if head has any uppercase characters
if (/[A-Z]/.test(lines[0])) {
  throw fail('Message head must be in all lowercase.');
}

// check if head is in the correct format
if (!new RegExp(`(${types.join('|')})(\\(\\S+\\))?!?: (.+)`).test(lines[0])) {
  throw fail(
    `Message head must be in the following format.\n\n${chalk.yellow(
      '<type>(<optional scope>)[!]: <decsription>\n\n[optional body]\n\n[optional footer(s)]'
    )}\n\nwhere <type> is one of the following:\n\n${chalk.yellow(
      types.join(', ')
    )}`
  );
}

// check if second line contains text. there should be an empty line between the description and body
if (lines[1].trim() !== '') {
  throw fail('An empty line is required between description and body.');
}

process.exit(0);
