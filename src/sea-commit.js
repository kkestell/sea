#!/usr/bin/env node

import '@babel/polyfill';
import program from 'commander';
import { commitChanges } from './lib/operations';

program
  .version('0.1.0')
  .option('-m, --message <message>', 'specify commit message')
  .action(commitChanges)
  .parse(process.argv);
