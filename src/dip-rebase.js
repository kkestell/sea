#!/usr/bin/env node

import shell from 'shelljs';
import fs from 'fs';
import conf from './conf.js';

shell.exec(`
    git fetch origin ${conf.branch}:${conf.branch}
    git rebase master
`);
