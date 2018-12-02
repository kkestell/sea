"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentBranchName = currentBranchName;
exports.checkoutBranch = checkoutBranch;
exports.checkoutNewBranch = checkoutNewBranch;
exports.updateDefaultBranch = updateDefaultBranch;
exports.findStash = findStash;
exports.popStash = popStash;
exports.pushStash = pushStash;
exports.rebaseCurrentBranch = rebaseCurrentBranch;
exports.stashChanges = stashChanges;
exports.unstashChanges = unstashChanges;
exports.workingDirectoryClean = workingDirectoryClean;

var _chalk = _interopRequireDefault(require("chalk"));

var _child_process = _interopRequireDefault(require("child_process"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _conf = _interopRequireDefault(require("./conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function currentBranchName() {
  return sh('git rev-parse --abbrev-ref HEAD');
}

function checkoutBranch(name) {
  sh("git checkout ".concat(name));
}

function checkoutNewBranch(name) {
  sh("git checkout -b ".concat(name, " ").concat(_conf.default.branch));
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

function stashChanges() {
  if (workingDirectoryClean()) return;
  sh('git stash save "autostash"');
}

function unstashChanges(name) {
  var stash = findStash(name);

  if (stash !== undefined) {
    sh("git stash pop \"".concat(stash[1], "\""));
  }
}

function workingDirectoryClean() {
  var status = sh('git status');
  return status.includes('working tree clean') || status.includes('nothing added to commit but untracked files present');
}

function sh(cmd) {
  console.log(cmd);

  var _shell$exec = _shelljs.default.exec(cmd, {
    silent: true
  }),
      stdout = _shell$exec.stdout;

  console.log(_chalk.default.gray(stdout));
  return stdout.trim();
}

function shi(cmd) {
  console.log(cmd);

  _child_process.default.execSync(cmd, {
    stdio: 'inherit'
  });
}