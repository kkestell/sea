#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'

program
  .version('0.0.1')
  .command('changes', 'display changes')
  .command('commit <message>', 'commit changes')
  .command('branch <name>', 'new branch')
  .command('checkout <name>', 'switch to a branch')
  .command('rebase', 'rebase branch')
  .parse(process.argv)
