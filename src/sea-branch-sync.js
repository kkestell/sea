#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { syncBranch } from './lib/operations'

program
  .version('0.1.0')
  .action(syncBranch)
  .parse(process.argv)
