#!/usr/bin/env node

import '@babel/polyfill'
import program from 'commander'
import { branch } from './lib/operations'

program
  .version('0.1.0')
  .arguments('<name>')
  .action(branch)
  .parse(process.argv)
