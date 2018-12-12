import Repository from './repository';
import conf from './conf';

export async function newBranch(name) {
  const repo = await Repository.open();

  if (await repo.branchExists(name)) {
    console.log(`Branch exists '${name}'`);
    return;
  }

  if (!(await repo.pullRemote(conf.branch))) {
    return;
  }

  await repo.stashChanges();
  await repo.checkoutBranch(conf.branch);
  await repo.createBranch(name);
  await repo.checkoutBranch(name);

  console.log(`Switched to new branch '${name}'`);
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
