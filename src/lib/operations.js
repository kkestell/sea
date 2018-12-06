import chalk from 'chalk'
import {
  checkoutBranch,
  checkoutNewBranch,
  commitChanges,
  deleteBranch,
  deletedFiles,
  displayDiff,
  modifiedFiles,
  popStash,
  pushStash,
  rebaseCurrentBranch,
  stashChanges,
  unstashChanges,
  untrackedFiles,
  stageUntrackedFiles,
  unstageUntrackedFiles,
  updateDefaultBranch,
  workingDirectoryClean
} from './git'

export function branchNew (name) {
  stageUntrackedFiles()
  stashChanges()
  updateDefaultBranch()
  checkoutNewBranch(name)
  checkoutBranch(name)
}

export function branchDelete (name) {
  deleteBranch(name)
}

export function diff () {
  if (workingDirectoryClean()) return
  stageUntrackedFiles()
  displayDiff()
  unstageUntrackedFiles()
}

export function changes () {
  const u = untrackedFiles()
  const m = modifiedFiles()
  const d = deletedFiles()

  console.log()

  if (u.length > 0) {
    for (let f of u) {
      console.log(chalk`{green     ${f}}`)
    }
    console.log()
  }

  if (m.length > 0) {
    for (let f of m) {
      // Ignore files which have been deleted
      if (!d.includes(f)) console.log(`    ${f}`)
    }
    console.log()
  }

  if (d.length > 0) {
    for (let f of d) {
      console.log(chalk`{red     ${f}}`)
    }
    console.log()
  }
}

export function checkout (name) {
  stageUntrackedFiles()
  stashChanges()
  checkoutBranch(name)
  unstashChanges(name)
  unstageUntrackedFiles()
}

export function commit (message) {
  stageUntrackedFiles()
  commitChanges(message)
}

export function rebase (cmd) {
  updateDefaultBranch()
  const stash = !workingDirectoryClean()
  if (stash) pushStash()
  rebaseCurrentBranch(cmd.interactive)
  if (stash) popStash()
}
