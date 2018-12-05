#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { diff } from './lib/operations'

program
  .version('0.1.0')
  .action(diff)
  .parse(process.argv)
