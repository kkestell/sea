#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'

program
  .version('0.0.1')
  .command('new <name>', 'new branch')
  .command('switch <name>', 'switch branch')
  .command('sync', 'sync branch')
  .parse(process.argv)
