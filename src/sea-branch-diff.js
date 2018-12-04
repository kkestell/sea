#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { branchDiff } from './lib/operations'

program
  .version('0.1.0')
  .action(branchDiff)
  .parse(process.argv)
