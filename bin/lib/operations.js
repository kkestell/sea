"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.branch = branch;
exports.checkout = checkout;
exports.rebase = rebase;

var _git = require("./git");

function branch(name) {
  (0, _git.updateDefaultBranch)();
  (0, _git.checkoutNewBranch)(name);
  (0, _git.checkoutBranch)(name);
}

function checkout(name) {
  (0, _git.stashChanges)();
  (0, _git.checkoutBranch)(name);
  (0, _git.unstashChanges)(name);
}

function rebase(cmd) {
  (0, _git.updateDefaultBranch)();
  var stash = !(0, _git.workingDirectoryClean)();
  if (stash) (0, _git.pushStash)();
  (0, _git.rebaseCurrentBranch)(cmd.interactive);
  if (stash) (0, _git.popStash)();
}