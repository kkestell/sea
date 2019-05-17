import chalk from 'chalk';
import tmp from 'tmp-promise';
import ora from 'ora';

import * as sea from './sea';
import * as system from './system';
import conf from './conf';

export async function initRepository(path = process.cwd()) {
  if (await sea.isRepo(path)) return;
  await sea.init(path);
  console.log(`Initialized empty repository in ${path}`);
}

export async function commitChanges() {
  const tmpfile = await tmp.file();

  system.edit(tmpfile.path);
  const msg = await system.readFile(tmpfile.path);

  tmpfile.cleanup();

  const repo = await sea.open();
  const commitId = await sea.commitChanges(repo, msg);

  console.log(`Committed ${commitId}`);
}

export async function newBranch(name) {
  const repo = await sea.open();

  if (await sea.branchExists(repo, name)) {
    console.log(`Branch exists '${name}'`);
    return;
  }

  if (await sea.remoteExists(repo)) {
    const spinner = ora('Enumerating remote branches').start();

    if (await sea.remoteBranchExists(repo, name)) {
      spinner.stop();
      console.log(`Branch exists '${name}'`);
      return;
    }

    spinner.text = `Pulling from origin/${conf.branch}`;
    if (!(await sea.pullRemote(repo, conf.branch))) {
      spinner.stop();
      return;
    }
    spinner.stop();
  }

  await sea.stashChanges(repo);
  await sea.checkoutBranch(repo, conf.branch);
  await sea.createBranch(repo, name);
  await sea.checkoutBranch(repo, name);

  console.log(`Switched to new branch '${name}'`);
}

export async function showChanges() {
  const repo = await sea.open();

  const changes = await sea.changedFiles(repo);

  if (
    changes.new.length === 0 &&
    changes.modified.length === 0 &&
    changes.deleted.length === 0
  )
    return;

  console.log();

  if (changes.new.length > 0) {
    changes.new.forEach(f => console.log(chalk`{green     ${f}}`));
    console.log();
  }

  if (changes.modified.length > 0) {
    changes.modified.forEach(f => console.log(`    ${f}`));
    console.log();
  }

  if (changes.deleted.length > 0) {
    changes.deleted.forEach(f => console.log(chalk`{red     ${f}}`));
    console.log();
  }
}

export async function switchBranch(name) {
  const repo = await sea.open();

  if (await sea.onBranch(repo, name)) return;

  if (!(await sea.branchExists(repo, name))) {
    console.log(`No such branch '${name}'`);
    return;
  }

  await sea.stashChanges(repo);
  await sea.checkoutBranch(repo, name);
  await sea.unstashChanges(repo, name);
}

export async function syncBranch() {
  const repo = await sea.open();

  const branch = await sea.currentBranchName(repo);
  await sea.stashChanges(repo);

  const spinner = ora(`Enumeratig remote branches`).start();
  if (await sea.remoteBranchExists(repo, branch)) {
    spinner.text = `Pulling origin/${branch}`;
    if (!(await sea.pullRemote(repo, branch))) {
      spinner.stop();
      return;
    }
  }

  spinner.text = `Pushing origin/${branch}`;
  await sea.pushRemote(repo, branch);
  spinner.stop();

  await sea.unstashChanges(repo, branch);
}
