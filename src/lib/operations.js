import chalk from 'chalk';
import Repository from './repository';
import conf from './conf';

export async function newBranch(name) {
  const repo = await Repository.open();

  if (await repo.branchExists(name)) {
    console.log(`Branch exists '${name}'`);
    return;
  }

  if (!(await repo.pullRemote(conf.branch))) return;

  await repo.stashChanges();
  await repo.checkoutBranch(conf.branch);
  await repo.createBranch(name);
  await repo.checkoutBranch(name);

  console.log(`Switched to new branch '${name}'`);
}

export async function showChanges() {
  const repo = await Repository.open();

  const changes = await repo.changedFiles();

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
  const repo = await Repository.open();

  if (await repo.onBranch(name)) return;

  if (!(await repo.branchExists(name))) {
    console.log(`No such branch '${name}'`);
    return;
  }

  await repo.stashChanges();
  await repo.checkoutBranch(name);
  await repo.unstashChanges(name);
}
