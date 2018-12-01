import shell from 'shelljs';
import conf from './conf';

export function currentBranchName() {
  return sh('git rev-parse --abbrev-ref HEAD');
}

export function checkoutBranch(name) {
  sh(`git checkout ${name}`);
}

export function checkoutNewBranch(name) {
  sh(`git checkout -b ${name} ${conf.branch}`);
}

export function fetchDefaultBranch() {
  sh(`git fetch origin ${conf.branch}:${conf.branch}`);
}

export function findStash(name) {
  const r = new RegExp(`(stash@\{\\d+\\}): On ${name}`);

  return sh('git stash list')
    .split(/\r?\n/)
    .filter(x => x !== '')
    .map(x => x.match(r))
    .filter(x => x !== null)
    .find(x => x.length === 2);
}

export function popStash() {
  sh('git stash pop');
}

export function pushStash() {
  sh('git stash push');
}

export function rebaseCurrentBranch(interactive) {
    // FIXME: Fix interactive rebase
    sh(`git rebase ${interactive ? '-i' : ''} ${conf.branch}`);
}

export function stashChanges() {
  if (workingDirectoryClean()) return;
  sh('git stash save "autostash"');
}

export function unstashChanges(name) {
  const stash = findStash(name);
  if (stash !== undefined) {
    sh(`git stash pop "${stash[1]}"`);
  }
}

export function workingDirectoryClean() {
  const status = sh('git status');
  return status.includes('working tree clean');
}

function sh(cmd) {
  return shell.exec(cmd);
}
