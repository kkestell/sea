import shell from 'shelljs';
import conf from './conf';

export function branch(name) {
  shell.exec(`
    git fetch origin ${conf.branch}:${conf.branch}
    git checkout -b ${name} ${conf.branch}
  `);
}

export function checkout(name) {
  // Current branch name
  const branch = shell.exec('git rev-parse --abbrev-ref HEAD');

  // Stash
  shell.exec(`git stash save "${branch}"`);

  // Checkout
  shell.exec(`git checkout ${name}`);

  // Unstash
  const r = new RegExp(`^(stash@{\d+}).+?(?=${name}: autostash)`);
  const branches = shell.exec('git stash list').split(/\r?\n/);
  const stash = branches.find(x => r.test(x));

  if (stash === undefined) return;

  shell.exec(`git stash pop "${stash}"`);
}

export function rebase(cmd) {
  shell.exec(`
    git fetch origin ${conf.branch}:${conf.branch}
    git stash push
    git rebase ${cmd.interactive ? '-i' : ''} ${conf.branch}
    git stash pop
  `);
}
