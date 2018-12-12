#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { newBranch } from './lib/operations'

program
  .version('0.1.0')
  .arguments('<name>')
  .action(newBranch)
  .parse(process.argv)
