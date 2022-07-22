#! /usr/bin/env node

const {
  program,
  InvalidArgumentError,
} = require('commander')

const { config } = require('./src/config');
const { search } = require('./src/search');

const validateSearchNumber = (value) => { 
  if (value > 250) throw new InvalidArgumentError(`Value cannot be greater than 250.`); 
  return value;
}

program.showHelpAfterError({ error: true });

program
  .name(`defaultinator`)
  .description(`Look up default credentials for devices by CPE.`)
  .version(`1.0.0`)

program
  .command(`search`)
  .description(`Search for default credentials by CPE.`)
  .option(`-v --vendor <string>`, `The vendor to search.`)
  .option(`-p --product <string>`, `The product to search.`)
  .option(`-n --number <number>`, `The maximum number of results. Default: 10. Max: 250.`, validateSearchNumber)
  .action((options) => {
    const { vendor, product } = options;
    if (!vendor && !product) throw new InvalidArgumentError(`You must specify a vendor or product.`);
    search(options);
  });

program
  .command(`config`)
  .description(`Save your API key.`)
  .option(`-k --key <string>`, `The API key to use in your queries. (required)`)
  .option(`-u --uri <string>`, `The API URI to use if connecting to a hosted instance. Default: https://api.defaultinator.com`)
  .action(config);


program.parseAsync()
  .catch((e) => {
    if (e instanceof InvalidArgumentError) {
      program.error(`error: ${e.message}`);
    } else {
      program.error(`error: ${e.message}`);
    }
  });