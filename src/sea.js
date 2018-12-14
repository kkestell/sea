#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'

program
  .version('0.0.1')
  .command('init [path]', 'initialize repository')
  .command('branch <cmd>', 'branching')
  .command('changes', 'display changes')
  .command('commit', 'commit changes')
  .parse(process.argv)
