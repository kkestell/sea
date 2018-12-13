import git from 'nodegit';

function stashName(name) {
  return `Sea autostash for ${name}`;
}

export default class Repository {
  static async open(path = process.cwd()) {
    const repo = await git.Repository.open(path);
    return new Repository(repo);
  }

  static async init(path = process.cwd()) {
    let repo;

    try {
      repo = await Repository.open(path);
      console.log(`Reinitialized existing repository in ${path}`);
    } catch (err) {
      repo = await git.Repository.init(path, 0);
      console.log(`Initialized empty repository in ${path}`);
    }

    return new Repository(repo);
  }

  constructor(repo) {
    this.repo = repo;
  }

  async branchExists(name) {
    try {
      await git.Branch.lookup(this.repo, name, git.Branch.BRANCH.LOCAL);
      return true;
    } catch (err) {
      return false;
    }
  }

  async changedFiles() {
    const statusOptions = {
      flags:
        git.Status.OPT.INCLUDE_UNTRACKED + git.Status.OPT.RECURSE_UNTRACKED_DIRS
    };

    const changes = {
      new: [],
      modified: [],
      deleted: []
    };

    await git.Status.foreachExt(this.repo, statusOptions, (path, status) => {
      if (status === git.Status.STATUS.WT_NEW) changes.new.push(path);
      else if (status === git.Status.STATUS.WT_MODIFIED)
        changes.modified.push(path);
      else if (status === git.Status.STATUS.WT_DELETED)
        changes.deleted.push(path);
    });

    return changes;
  }

  async checkoutBranch(name) {
    const checkoutOptions = new git.CheckoutOptions();
    checkoutOptions.checkoutStrategy = git.Checkout.STRATEGY.SAFE;

    const treeish = await git.Revparse.single(this.repo, name);
    await git.Checkout.tree(this.repo, treeish, checkoutOptions);
    await this.repo.setHead(`refs/heads/${name}`);
  }

  async createBranch(name) {
    const masterCommit = await this.repo.getMasterCommit();
    await this.repo.createBranch(name, masterCommit);
  }

  async currentBranchName() {
    return (await this.repo.getCurrentBranch()).shorthand();
  }

  async onBranch(name) {
    return (await this.currentBranchName(this.repo)) === name;
  }

  async pullRemote(name) {
    await this.repo.fetch('origin', {
      callbacks: {
        credentials: (url, username) => git.Cred.sshKeyFromAgent(username),
        certificateCheck: () => 1
      }
    });

    const mergeOptions = new git.MergeOptions();
    mergeOptions.fileFavor = git.Merge.FILE_FAVOR.THEIRS;

    try {
      await this.repo.mergeBranches(
        name,
        `origin/${name}`,
        git.Merge.PREFERENCE.FASTFORWARD_ONLY,
        mergeOptions
      );
    } catch (err) {
      console.log(`Unable to fast-forward ${name}, branches have diverged`);
      console.log('You might consider:');
      console.log(
        `    sea branch switch ${name} && git reset --hard origin/${name}`
      );
      return false;
    }

    return true;
  }

  async stashChanges() {
    if (await this.workingDirectoryClean()) return;

    await git.Stash.save(
      this.repo,
      this.repo.defaultSignature(),
      stashName(await this.currentBranchName()),
      git.Stash.FLAGS.INCLUDE_UNTRACKED
    );
  }

  async unstashChanges(name) {
    const stashes = [];
    await git.Stash.foreach(this.repo, async (index, message, oid) => {
      stashes.push({ index, message, oid });
    });

    const stash = stashes.find(x => x.message.includes(stashName(name)));

    if (!stash) return;

    const checkoutOptions = new git.CheckoutOptions();
    checkoutOptions.checkoutStrategy = git.Checkout.STRATEGY.SAFE;

    const stashApplyOptions = new git.StashApplyOptions();
    stashApplyOptions.checkoutOptions = checkoutOptions;

    await git.Stash.apply(this.repo, stash.index, stashApplyOptions);
    await git.Stash.drop(this.repo, stash.index);
  }

  // Private

  async workingDirectoryClean() {
    const statusOptions = {
      flags:
        git.Status.OPT.INCLUDE_UNTRACKED + git.Status.OPT.RECURSE_UNTRACKED_DIRS
    };

    let cnt = 0;
    await git.Status.foreachExt(this.repo, statusOptions, () => {
      cnt += 1;
    });
    return cnt === 0;
  }
}
