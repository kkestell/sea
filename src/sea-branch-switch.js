#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { switchBranch } from './lib/operations'

program
  .version('0.1.0')
  .arguments('<name>')
  .action(switchBranch)
  .parse(process.argv)
