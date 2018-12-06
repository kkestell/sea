"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abortRebase = abortRebase;
exports.addFiles = addFiles;
exports.currentBranchName = currentBranchName;
exports.checkoutBranch = checkoutBranch;
exports.checkoutNewBranch = checkoutNewBranch;
exports.commitChanges = commitChanges;
exports.deleteBranch = deleteBranch;
exports.deletedFiles = deletedFiles;
exports.displayDiff = displayDiff;
exports.findStash = findStash;
exports.modifiedFiles = modifiedFiles;
exports.updateDefaultBranch = updateDefaultBranch;
exports.untrackedFiles = untrackedFiles;
exports.popStash = popStash;
exports.pushStash = pushStash;
exports.rebaseCurrentBranch = rebaseCurrentBranch;
exports.stageUntrackedFiles = stageUntrackedFiles;
exports.stashChanges = stashChanges;
exports.unstageUntrackedFiles = unstageUntrackedFiles;
exports.unstashChanges = unstashChanges;
exports.workingDirectoryClean = workingDirectoryClean;

var _chalk = _interopRequireDefault(require("chalk"));

var _child_process = _interopRequireDefault(require("child_process"));

var _fs = _interopRequireDefault(require("fs"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _ansiStyles = _interopRequireDefault(require("ansi-styles"));

var _tmp = _interopRequireDefault(require("tmp"));

var _conf = _interopRequireDefault(require("./conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function abortRebase() {
  sh('git rebase --abort');
}

function addFiles(files) {
  sh("git add ".concat(files.join(' ')));
}

function currentBranchName() {
  return sh('git rev-parse --abbrev-ref HEAD');
}

function checkoutBranch(name) {
  sh("git checkout ".concat(name));
}

function checkoutNewBranch(name) {
  sh("git checkout -b ".concat(name, " ").concat(_conf.default.branch));
}

function commitChanges(message) {
  sh("git commit -m \"".concat(message, "\""));
}

function deleteBranch(name) {
  var currentBranch = currentBranchName();
  var targetBranch = name || currentBranch;

  if (targetBranch === _conf.default.branch) {
    console.log("Can't delete the default branch");
    return;
  }

  if (currentBranch === targetBranch) {
    checkoutBranch(_conf.default.branch);
  }

  sh("git branch -D ".concat(targetBranch));
}

function deletedFiles() {
  return sh("git ls-files -d --exclude-standard").split(/\r?\n/).filter(function (x) {
    return x !== '';
  });
}

function displayDiff() {
  var diff = sh("git diff --cached");

  _tmp.default.file({
    keep: true
  }, function (err, path, fd, cleanupCallback) {
    if (err) throw err;

    _fs.default.writeFile(path, diff, function (err) {
      if (err) throw err;
      sh("open -W -a Sea\\ Diff.app --args --diff=".concat(path));
      cleanupCallback();
    });
  });
}

function findStash(name) {
  var r = new RegExp("(stash@{\\d+\\}): On ".concat(name));
  return sh('git stash list').split(/\r?\n/).filter(function (x) {
    return x !== '';
  }).map(function (x) {
    return x.match(r);
  }).filter(function (x) {
    return x !== null;
  }).find(function (x) {
    return x.length === 2;
  });
}

function modifiedFiles() {
  return sh("git ls-files -m --exclude-standard").split(/\r?\n/).filter(function (x) {
    return x !== '';
  });
}

function updateDefaultBranch() {
  var b = currentBranchName();
  var s = _conf.default.branch !== b && !workingDirectoryClean();

  if (s) {
    pushStash();
    checkoutBranch(_conf.default.branch);
  }

  sh("git pull origin ".concat(_conf.default.branch));

  if (s) {
    checkoutBranch(b);
    popStash();
  }
}

function untrackedFiles() {
  return sh("git ls-files -o --exclude-standard").split(/\r?\n/).filter(function (x) {
    return x !== '';
  });
}

function popStash() {
  sh('git stash pop');
}

function pushStash() {
  sh('git stash push');
}

function rebaseCurrentBranch(interactive) {
  if (!shi("git rebase ".concat(_conf.default.branch, " ").concat(interactive ? '-i' : ''))) {
    console.log('Rebase encountered merge conflicts. Aborting!');
    abortRebase();
  }
}

function stageUntrackedFiles() {
  sh('git add .');
}

function stashChanges() {
  if (workingDirectoryClean()) return;
  sh('git stash save "autostash"');
}

function unstageUntrackedFiles() {
  sh('git reset HEAD .');
}

function unstashChanges(name) {
  var s = findStash(name);

  if (s !== undefined) {
    sh("git stash pop \"".concat(s[1], "\""));
  }
}

function workingDirectoryClean() {
  var s = sh('git status');
  return s.includes('working tree clean') || s.includes('nothing added to commit but untracked files present');
}

function sh(cmd) {
  console.log(_chalk.default.gray.bold(cmd));

  var _shell$exec = _shelljs.default.exec(cmd, {
    silent: true
  }),
      code = _shell$exec.code,
      stdout = _shell$exec.stdout,
      stderr = _shell$exec.stderr;

  if (stdout !== '') console.log(_chalk.default.gray(stdout.trim())); //if (stderr !== '') console.log(chalk.gray.italic(stderr.trim()))
  //console.log(chalk.red(`=> ${code}`))

  return stdout.trim();
}

function shi(cmd) {
  console.log(_chalk.default.gray.bold(cmd));
  process.stdout.write(_ansiStyles.default.gray.open);

  try {
    _child_process.default.execSync(cmd, {
      stdio: 'inherit'
    });
  } catch (error) {
    //console.log(chalk.red(`=> ${error.status}`))
    return false;
  } finally {
    process.stdout.write(_ansiStyles.default.gray.close);
  }

  return true;
}