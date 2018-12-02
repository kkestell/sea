import chalk from 'chalk'
import childProcess from 'child_process'
import shell from 'shelljs'
import conf from './conf'

export function currentBranchName () {
  return sh('git rev-parse --abbrev-ref HEAD')
}

export function checkoutBranch (name) {
  sh(`git checkout ${name}`)
}

export function checkoutNewBranch (name) {
  sh(`git checkout -b ${name} ${conf.branch}`)
}

export function updateDefaultBranch () {
  const b = currentBranchName()
  const s = conf.branch !== b && !workingDirectoryClean()

  if (s) {
    pushStash()
    checkoutBranch(conf.branch)
  }

  sh(`git pull origin ${conf.branch}`)

  if (s) {
    checkoutBranch(b)
    popStash()
  }
}

export function findStash (name) {
  const r = new RegExp(`(stash@{\\d+\\}): On ${name}`)

  return sh('git stash list')
    .split(/\r?\n/)
    .filter(x => x !== '')
    .map(x => x.match(r))
    .filter(x => x !== null)
    .find(x => x.length === 2)
}

export function popStash () {
  sh('git stash pop')
}

export function pushStash () {
  sh('git stash push')
}

export function rebaseCurrentBranch (interactive) {
  shi(`git rebase ${interactive ? '-i' : ''} ${conf.branch}`)
}

export function stashChanges () {
  if (workingDirectoryClean()) return
  sh('git stash save "autostash"')
}

export function unstashChanges (name) {
  const s = findStash(name)
  if (s !== undefined) {
    sh(`git stash pop "${s[1]}"`)
  }
}

export function workingDirectoryClean () {
  const s = sh('git status')
  return (
    s.includes('working tree clean') ||
    s.includes('nothing added to commit but untracked files present')
  )
}

function sh (cmd) {
  console.log(cmd)
  const { stdout } = shell.exec(cmd, { silent: true })
  console.log(chalk.gray(stdout))
  return stdout.trim()
}

function shi (cmd) {
  console.log(cmd)
  childProcess.execSync(cmd, { stdio: 'inherit' })
}
