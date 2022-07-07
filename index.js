#! /usr/bin/env node

const {
  program,
  InvalidArgumentError,
} = require('commander')

const { login } = require('./src/login');
const { search } = require('./src/search');

program
  .name(`defaultinator`)
  .description(`Look up default credentials for devices by CPE.`)
  .version(`1.0.0`)

program
  .command(`search`)
  .description(`Search for default credentials by CPE.`)
  .option(`-v --vendor <string>`, `The vendor to search.`)
  .option(`-p --product <string>`, `The product to search.`)
  .option(`-n --number <number>`, `The maximum number of results. Default: 10. Max: 250.`, (value) => { if (value > 250) throw new InvalidArgumentError(`Value cannot be greater than 250.`) })
  .action(search);

program
  .command(`login`)
  .description(`Log in with your API key.`)
  .requiredOption(`-k --key <string>`, `The API key to use in your queries. (required)`)
  .action(login);

try {
  program.parseAsync();
} catch (e) {
  console.error(e.message);
}
