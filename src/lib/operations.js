import {
  checkoutBranch,
  checkoutNewBranch,
  popStash,
  pushStash,
  rebaseCurrentBranch,
  stashChanges,
  updateDefaultBranch,
  unstashChanges,
  workingDirectoryClean
} from './git'

export function branch (name) {
  updateDefaultBranch()
  checkoutNewBranch(name)
  checkoutBranch(name)
}

export function checkout (name) {
  stashChanges()
  checkoutBranch(name)
  unstashChanges(name)
}

export function rebase (cmd) {
  updateDefaultBranch()
  const stash = !workingDirectoryClean()
  if (stash) pushStash()
  rebaseCurrentBranch(cmd.interactive)
  if (stash) popStash()
}
