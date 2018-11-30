#!/usr/bin/env node

import program from 'commander';
 
program
  .command('rebase', 'rebase branch')
  .parse(process.argv);