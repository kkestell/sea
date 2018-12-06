#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'

program
  .version('0.0.1')
  .command('delete [name]', 'delete branch')
  .command('new <name>', 'new branch')
  .parse(process.argv)
