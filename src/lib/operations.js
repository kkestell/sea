import chalk from 'chalk';
import * as sea from './sea';
import conf from './conf';

export async function initRepository(path = process.cwd()) {
  await sea.init(path);
}

export async function newBranch(name) {
  const repo = await sea.open();

  if (await sea.branchExists(repo, name)) {
    console.log(`Branch exists '${name}'`);
    return;
  }

  if (!(await sea.pullRemote(repo, conf.branch))) return;

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
