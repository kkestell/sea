import shell from 'shelljs';
import conf from './conf';

export function branch(name) {
  shell.exec(`
    git fetch origin ${conf.branch}:${conf.branch}
    git checkout -b ${name} ${conf.branch}
  `);
}

export function checkout(name) {
  const branches = shell.exec('git stash list').split(/\r?\n/);
  console.log(branches);
  shell.exec(`
    git checkout ${name}
  `);
}

export function rebase(cmd) {
  shell.exec(`
    git fetch origin ${conf.branch}:${conf.branch}
    git stash push
    git rebase ${cmd.interactive ? '-i' : ''} ${conf.branch}
    git stash pop
  `);
}
