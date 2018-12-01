import shell from 'shelljs';
import conf from './conf';
import {
  findStash,
  checkoutBranch,
  workingDirectoryClean,
  unstashChanges,
  stashChanges,
  fetchDefaultBranch,
  checkoutNewBranch,
  pushStash,
  popStash,
  rebaseCurrentBranch
} from './git';

export function branch(name) {
  fetchDefaultBranch();
  checkoutNewBranch();
  console.log(`Switched to a new branch '${name}'`);
}

export function checkout(name) {
  stashChanges();
  checkoutBranch(name);
  unstashChanges(name);
  console.log(`Switched to branch '${name}'`);
}

export function rebase(cmd) {
  fetchDefaultBranch();
  const stash = !workingDirectoryClean();
  if (stash) pushStash();
  rebaseCurrentBranch(cmd.interactive);
  if (stash) popStash();
}
