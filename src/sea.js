#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'

program
  .version('0.0.1')
  .command('branch <cmd>', 'branching')
  .command('changes', 'display changes')
  .command('commit <message>', 'commit changes')
  .command('checkout <name>', 'switch to a branch')
  .command('diff', 'diff changes')
  .command('rebase', 'rebase branch')
  .parse(process.argv)
