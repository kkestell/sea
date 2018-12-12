import Repository from './repository';

export async function newBranch(name) {
  const repo = await Repository.open();

  if (await repo.branchExists(name)) {
    console.log(`Branch exists '${name}'`);
    return;
  }

  if (!(await repo.pullRemote('master'))) {
    return;
  }

  await repo.stashChanges();
  await repo.checkoutBranch('master');
  await repo.createBranch(name);
  await repo.checkoutBranch(name);

  console.log(`Switched to new branch '${name}'`);
}

export async function switchBranch(name) {
  const repo = await Repository.open();

  if (await repo.onBranch(name)) return;

  if (!(await repo.branchExists(name))) {
    console.log('No such branch');
    return;
  }

  await repo.stashChanges();
  await repo.checkoutBranch(name);
  await repo.unstashChanges(name);
}
