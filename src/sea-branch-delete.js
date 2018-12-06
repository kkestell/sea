#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { branchDelete } from './lib/operations'

program
  .version('0.1.0')
  .arguments('[name]')
  .action(branchDelete)
  .parse(process.argv)
