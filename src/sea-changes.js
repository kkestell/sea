#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { changes } from './lib/operations'

program
  .version('0.1.0')
  .action(changes)
  .parse(process.argv)
