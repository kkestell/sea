#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { initRepository } from './lib/operations'

program
  .version('0.1.0')
  .arguments('[path]')
  .action(initRepository)
  .parse(process.argv)
