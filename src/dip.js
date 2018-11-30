#!/usr/bin/env node

import "@babel/polyfill";
import program from 'commander';
 
program
  .version('0.0.1') 
  .command('rebase', 'rebase branch')
  .command('branch <name>', 'new branch')
  .parse(process.argv);