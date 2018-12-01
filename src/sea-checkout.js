#!/usr/bin/env node

import "@babel/polyfill";
import program from 'commander';
import { checkout } from './lib/operations';

program
  .version('0.1.0')
  .arguments('<name>')
  .action(checkout)
  .parse(process.argv);
