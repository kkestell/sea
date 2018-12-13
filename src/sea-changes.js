#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { showChanges } from './lib/operations'

program
  .version('0.1.0')
  .action(showChanges)
  .parse(process.argv)
