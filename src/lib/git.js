import chalk from 'chalk'
import childProcess from 'child_process'
import fs from 'fs'
import shell from 'shelljs'
import style from 'ansi-styles'
import tmp from 'tmp'
import conf from './conf'

export function abortRebase () {
  sh('git rebase --abort')
}

export function addFiles (files) {
  sh(`git add ${files.join(' ')}`)
}

export function currentBranchName () {
  return sh('git rev-parse --abbrev-ref HEAD')
}

export function checkoutBranch (name) {
  sh(`git checkout ${name}`)
}

export function checkoutNewBranch (name) {
  sh(`git checkout -b ${name} ${conf.branch}`)
}

export function commitChanges (message) {
  sh(`git commit -m "${message}"`)
}

export function deleteBranch (name) {
  const currentBranch = currentBranchName()
  const targetBranch = name || currentBranch

  if (targetBranch === conf.branch) {
    console.log("Can't delete the default branch")
    return
  }

  if (currentBranch === targetBranch) {
    checkoutBranch(conf.branch)
  }

  sh(`git branch -D ${targetBranch}`)
}

export function deletedFiles () {
  return sh(`git ls-files -d --exclude-standard`)
    .split(/\r?\n/)
    .filter(x => x !== '')
}

export function displayDiff () {
  const diff = sh(`git diff --cached`)

  tmp.file({ keep: true }, (err, path, fd, cleanupCallback) => {
    if (err) throw err

    fs.writeFile(path, diff, (err) => {
      if (err) throw err
      sh(`open -W -a Sea\\ Diff.app --args --diff=${path}`)
      cleanupCallback()
    })
  })
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

export function modifiedFiles () {
  return sh(`git ls-files -m --exclude-standard`)
    .split(/\r?\n/)
    .filter(x => x !== '')
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

export function untrackedFiles () {
  return sh(`git ls-files -o --exclude-standard`)
    .split(/\r?\n/)
    .filter(x => x !== '')
}

export function popStash () {
  sh('git stash pop')
}

export function pushStash () {
  sh('git stash push')
}

export function rebaseCurrentBranch (interactive) {
  if (!shi(`git rebase ${conf.branch} ${interactive ? '-i' : ''}`)) {
    console.log('Rebase encountered merge conflicts. Aborting!')
    abortRebase()
  }
}

export function stageUntrackedFiles () {
  sh('git add .')
}

export function stashChanges () {
  if (workingDirectoryClean()) return
  sh('git stash save "autostash"')
}

export function unstageUntrackedFiles () {
  sh('git reset HEAD .')
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
  console.log(chalk.gray.bold(cmd))
  const { stdout } = shell.exec(cmd, { silent: true })
  if (stdout !== '') console.log(chalk.gray(stdout.trim()))
  // if (stderr !== '') console.log(chalk.gray.italic(stderr.trim()))
  // console.log(chalk.red(`=> ${code}`))
  return stdout.trim()
}

function shi (cmd) {
  console.log(chalk.gray.bold(cmd))
  process.stdout.write(style.gray.open)
  try {
    childProcess.execSync(cmd, { stdio: 'inherit' })
  } catch (error) {
    // console.log(chalk.red(`=> ${error.status}`))
    return false
  } finally {
    process.stdout.write(style.gray.close)
  }
  return true
}
