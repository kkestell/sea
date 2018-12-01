#!/usr/bin/env node

import "@babel/polyfill";
import program from 'commander';
import { rebase } from './lib/operations';

program
  .version('0.1.0')
  .option('-i, --interactive', 'interactive rebase')
  .action(rebase)
  .parse(process.argv);
