#!/usr/bin/env node

import "@babel/polyfill";
import program from 'commander';
import shell from 'shelljs';
import conf from './conf.js';

program
  .version('0.1.0')
  .arguments('<name>')
  .action(async (name) => {
    await branch(name);
  })
  .parse(process.argv);

async function branch(name) {
  shell.exec(`
    git fetch origin ${conf.branch}:${conf.branch}
    git checkout -b ${name} ${conf.branch}
  `);
}
