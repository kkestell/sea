#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { commit } from './lib/operations'

program
  .version('0.1.0')
  .arguments('<message>')
  .action(commit)
  .parse(process.argv)
