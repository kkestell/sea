"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayDiff = displayDiff;
exports.addFiles = addFiles;
exports.currentBranchName = currentBranchName;
exports.checkoutBranch = checkoutBranch;
exports.checkoutNewBranch = checkoutNewBranch;
exports.commitChanges = commitChanges;
exports.untrackedFiles = untrackedFiles;
exports.modifiedFiles = modifiedFiles;
exports.deletedFiles = deletedFiles;
exports.updateDefaultBranch = updateDefaultBranch;
exports.findStash = findStash;
exports.popStash = popStash;
exports.pushStash = pushStash;
exports.rebaseCurrentBranch = rebaseCurrentBranch;
exports.stageUntrackedFiles = stageUntrackedFiles;
exports.unstageUntrackedFiles = unstageUntrackedFiles;
exports.stashChanges = stashChanges;
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

function displayDiff() {
  var diff = shs("git diff");

  _tmp.default.file({
    keep: true
  }, function (err, path, fd, cleanupCallback) {
    if (err) throw err;

    _fs.default.writeFile(path, diff, function (err) {
      if (err) throw err;
      sh("open -a Sea\\ Diff.app --args --diff=".concat(path));
    });
  });
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

function untrackedFiles() {
  return shs("git ls-files -o --exclude-standard").split(/\r?\n/).filter(function (x) {
    return x !== '';
  });
}

function modifiedFiles() {
  return shs("git ls-files -m --exclude-standard").split(/\r?\n/).filter(function (x) {
    return x !== '';
  });
}

function deletedFiles() {
  return shs("git ls-files -d --exclude-standard").split(/\r?\n/).filter(function (x) {
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

function popStash() {
  sh('git stash pop');
}

function pushStash() {
  sh('git stash push');
}

function rebaseCurrentBranch(interactive) {
  shi("git rebase ".concat(interactive ? '-i' : '', " ").concat(_conf.default.branch));
}

function stageUntrackedFiles() {
  sh('git add .');
}

function unstageUntrackedFiles() {
  sh('git reset HEAD .');
}

function stashChanges() {
  if (workingDirectoryClean()) return;
  sh('git stash save "autostash"');
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
      stdout = _shell$exec.stdout,
      stderr = _shell$exec.stderr;

  if (stdout !== '') console.log(_chalk.default.gray(stdout));
  if (stderr !== '') console.log(_chalk.default.gray(stderr));
  return stdout.trim();
}

function shs(cmd) {
  var _shell$exec2 = _shelljs.default.exec(cmd, {
    silent: true
  }),
      stdout = _shell$exec2.stdout,
      stderr = _shell$exec2.stderr;

  if (stderr !== '') console.log(_chalk.default.gray(stderr));
  return stdout.trim();
}

function shi(cmd) {
  console.log(_chalk.default.gray.bold(cmd));
  process.stdout.write(_ansiStyles.default.gray.open);

  _child_process.default.execSync(cmd, {
    stdio: 'inherit'
  });

  process.stdout.write(_ansiStyles.default.gray.close);
}