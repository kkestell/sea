#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'

program
  .version('0.0.1')
  .command('branch <cmd>', 'branching')
  .parse(process.argv)
