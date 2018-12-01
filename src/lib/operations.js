import shell from 'shelljs';
import conf from './conf';

export function branch(name) {
  shell.exec(`
    git fetch origin ${conf.branch}:${conf.branch}
    git checkout -b ${name} ${conf.branch}
  `);
}

export function rebase(cmd) {
  shell.exec(`
    git fetch origin ${conf.branch}:${conf.branch}
    git rebase ${cmd.interactive ? '-i' : ''} ${conf.branch}
  `);
}
