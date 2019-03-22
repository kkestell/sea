import 'source-map-support/register';
import git from 'nodegit';
import _ from 'lodash';
import ora from 'ora';

export async function open(path = process.cwd()) {
  return git.Repository.open(path);
}

export async function init(path = process.cwd()) {
  const repo = await git.Repository.init(path, 0);

  const index = await repo.refreshIndex();
  const signature = git.Signature.default(repo);
  const tree = await index.writeTree();
  return repo.createCommit(
    'HEAD',
    signature,
    signature,
    'Initial commit',
    tree,
    []
  );
}

export async function isRepo(path = process.cwd()) {
  try {
    await open(path);
    return true;
  } catch (err) {
    return false;
  }
}

export async function branchExists(repo, name) {
  try {
    await git.Branch.lookup(repo, name, git.Branch.BRANCH.LOCAL);
    return true;
  } catch (err) {
    return false;
  }
}

export async function changedFiles(repo) {
  const statusOptions = {
    flags:
      git.Status.OPT.INCLUDE_UNTRACKED + git.Status.OPT.RECURSE_UNTRACKED_DIRS
  };

  const changes = {
    new: [],
    modified: [],
    deleted: []
  };

  await git.Status.foreachExt(repo, statusOptions, (path, status) => {
    if (status === git.Status.STATUS.WT_NEW) changes.new.push(path);
    else if (status === git.Status.STATUS.WT_MODIFIED)
      changes.modified.push(path);
    else if (status === git.Status.STATUS.WT_DELETED)
      changes.deleted.push(path);
  });

  return changes;
}

export async function checkoutBranch(repo, name) {
  const checkoutOptions = new git.CheckoutOptions();
  checkoutOptions.checkoutStrategy = git.Checkout.STRATEGY.SAFE;

  const treeish = await git.Revparse.single(repo, name);
  await git.Checkout.tree(repo, treeish, checkoutOptions);
  await repo.setHead(`refs/heads/${name}`);
}

export async function commitChanges(repo, msg) {
  const index = await repo.refreshIndex();
  await index.addAll();
  await index.write();
  const tree = await index.writeTree();
  const head = await git.Reference.nameToId(repo, 'HEAD');
  const parent = await repo.getCommit(head);
  const signature = git.Signature.default(repo);
  return repo.createCommit('HEAD', signature, signature, msg, tree, [parent]);
}

export async function createBranch(repo, name) {
  const masterCommit = await repo.getMasterCommit();
  await repo.createBranch(name, masterCommit);
}

export async function currentBranchName(repo) {
  return (await repo.getCurrentBranch()).shorthand();
}

export async function onBranch(repo, name) {
  return (await currentBranchName(repo)) === name;
}

export async function pullRemote(repo, name) {
  await repo.fetch('origin', {
    callbacks: {
      credentials: (url, username) => git.Cred.sshKeyFromAgent(username),
      certificateCheck: () => 1
    }
  });

  try {
    await repo.mergeBranches(
      name,
      `origin/${name}`,
      git.Merge.PREFERENCE.FASTFORWARD_ONLY,
      {
        fileFavor: git.Merge.FILE_FAVOR.THEIRS
      }
    );
  } catch (err) {
    console.log(err);
    console.log(`Unable to fast-forward ${name}, branches have diverged`);
    console.log('You might consider:');
    console.log(
      `    sea branch switch ${name} && git reset --hard origin/${name}`
    );
    return false;
  }

  return true;
}

export async function pushRemote(repo, name) {
  const ref = `refs/heads/${name}`;
  const refs = [`${ref}:${ref}`];

  const remote = await git.Remote.lookup(repo, 'origin');

  await remote.push(refs, {
    callbacks: {
      credentials: (url, username) => git.Cred.sshKeyFromAgent(username),
      certificateCheck: () => 1
    }
  });
}

export async function remoteExists(repo) {
  try {
    await git.Remote.lookup(repo, 'origin');
    return true;
  } catch (err) {
    return false;
  }
}

export async function remoteBranchExists(repo, name) {
  const remote = await git.Remote.lookup(repo, 'origin');

  await remote.connect(
    git.Enums.DIRECTION.FETCH,
    {
      credentials: (url, username) => git.Cred.sshKeyFromAgent(username),
      certificateCheck: () => 1
    }
  );

  const references = await remote.referenceList();

  await remote.disconnect();

  return _.some(
    references,
    reference => reference.name() === `refs/heads/${name}`
  );
}

export async function workingDirectoryClean(repo) {
  const statusOptions = {
    flags:
      git.Status.OPT.INCLUDE_UNTRACKED + git.Status.OPT.RECURSE_UNTRACKED_DIRS
  };

  let cnt = 0;
  await git.Status.foreachExt(repo, statusOptions, () => {
    cnt += 1;
  });
  return cnt === 0;
}

function stashName(name) {
  return `Sea autostash for ${name}`;
}

export async function stashChanges(repo) {
  if (await workingDirectoryClean(repo)) return;

  await git.Stash.save(
    repo,
    repo.defaultSignature(),
    stashName(await currentBranchName(repo)),
    git.Stash.FLAGS.INCLUDE_UNTRACKED
  );
}

export async function unstashChanges(repo, name) {
  const stashes = [];
  await git.Stash.foreach(repo, async (index, message, oid) => {
    stashes.push({ index, message, oid });
  });

  const stash = stashes.find(s => s.message.includes(stashName(name)));

  if (!stash) return;

  const checkoutOptions = new git.CheckoutOptions();
  checkoutOptions.checkoutStrategy = git.Checkout.STRATEGY.SAFE;

  const stashApplyOptions = new git.StashApplyOptions();
  stashApplyOptions.checkoutOptions = checkoutOptions;

  await git.Stash.apply(repo, stash.index, stashApplyOptions);
  await git.Stash.drop(repo, stash.index);
}
