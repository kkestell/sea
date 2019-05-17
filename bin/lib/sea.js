"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.open = open;
exports.init = init;
exports.isRepo = isRepo;
exports.branchExists = branchExists;
exports.changedFiles = changedFiles;
exports.checkoutBranch = checkoutBranch;
exports.commitChanges = commitChanges;
exports.createBranch = createBranch;
exports.currentBranchName = currentBranchName;
exports.onBranch = onBranch;
exports.pullRemote = pullRemote;
exports.pushRemote = pushRemote;
exports.remoteExists = remoteExists;
exports.remoteBranchExists = remoteBranchExists;
exports.workingDirectoryClean = workingDirectoryClean;
exports.stashChanges = stashChanges;
exports.unstashChanges = unstashChanges;

require("source-map-support/register");

var _nodegit = _interopRequireDefault(require("nodegit"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function open() {
  return _open.apply(this, arguments);
}

function _open() {
  _open = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var path,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = _args.length > 0 && _args[0] !== undefined ? _args[0] : process.cwd();
            return _context.abrupt("return", _nodegit["default"].Repository.open(path));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _open.apply(this, arguments);
}

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var path,
        repo,
        index,
        signature,
        tree,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            path = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : process.cwd();
            _context2.next = 3;
            return _nodegit["default"].Repository.init(path, 0);

          case 3:
            repo = _context2.sent;
            _context2.next = 6;
            return repo.refreshIndex();

          case 6:
            index = _context2.sent;
            signature = _nodegit["default"].Signature["default"](repo);
            _context2.next = 10;
            return index.writeTree();

          case 10:
            tree = _context2.sent;
            return _context2.abrupt("return", repo.createCommit('HEAD', signature, signature, 'Initial commit', tree, []));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _init.apply(this, arguments);
}

function isRepo() {
  return _isRepo.apply(this, arguments);
}

function _isRepo() {
  _isRepo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var path,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            path = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : process.cwd();
            _context3.prev = 1;
            _context3.next = 4;
            return open(path);

          case 4:
            return _context3.abrupt("return", true);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", false);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));
  return _isRepo.apply(this, arguments);
}

function branchExists(_x, _x2) {
  return _branchExists.apply(this, arguments);
}

function _branchExists() {
  _branchExists = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(repo, name) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _nodegit["default"].Branch.lookup(repo, name, _nodegit["default"].Branch.BRANCH.LOCAL);

          case 3:
            return _context4.abrupt("return", true);

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", false);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));
  return _branchExists.apply(this, arguments);
}

function changedFiles(_x3) {
  return _changedFiles.apply(this, arguments);
}

function _changedFiles() {
  _changedFiles = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(repo) {
    var statusOptions, changes;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            statusOptions = {
              flags: _nodegit["default"].Status.OPT.INCLUDE_UNTRACKED + _nodegit["default"].Status.OPT.RECURSE_UNTRACKED_DIRS
            };
            changes = {
              "new": [],
              modified: [],
              deleted: []
            };
            _context5.next = 4;
            return _nodegit["default"].Status.foreachExt(repo, statusOptions, function (path, status) {
              if (status === _nodegit["default"].Status.STATUS.WT_NEW) changes["new"].push(path);else if (status === _nodegit["default"].Status.STATUS.WT_MODIFIED) changes.modified.push(path);else if (status === _nodegit["default"].Status.STATUS.WT_DELETED) changes.deleted.push(path);
            });

          case 4:
            return _context5.abrupt("return", changes);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _changedFiles.apply(this, arguments);
}

function checkoutBranch(_x4, _x5) {
  return _checkoutBranch.apply(this, arguments);
}

function _checkoutBranch() {
  _checkoutBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(repo, name) {
    var checkoutOptions, treeish;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            checkoutOptions = new _nodegit["default"].CheckoutOptions();
            checkoutOptions.checkoutStrategy = _nodegit["default"].Checkout.STRATEGY.SAFE;
            _context6.next = 4;
            return _nodegit["default"].Revparse.single(repo, name);

          case 4:
            treeish = _context6.sent;
            _context6.next = 7;
            return _nodegit["default"].Checkout.tree(repo, treeish, checkoutOptions);

          case 7:
            _context6.next = 9;
            return repo.setHead("refs/heads/".concat(name));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _checkoutBranch.apply(this, arguments);
}

function commitChanges(_x6, _x7) {
  return _commitChanges.apply(this, arguments);
}

function _commitChanges() {
  _commitChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(repo, msg) {
    var index, tree, head, parent, signature;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return repo.refreshIndex();

          case 2:
            index = _context7.sent;
            _context7.next = 5;
            return index.addAll();

          case 5:
            _context7.next = 7;
            return index.write();

          case 7:
            _context7.next = 9;
            return index.writeTree();

          case 9:
            tree = _context7.sent;
            _context7.next = 12;
            return _nodegit["default"].Reference.nameToId(repo, 'HEAD');

          case 12:
            head = _context7.sent;
            _context7.next = 15;
            return repo.getCommit(head);

          case 15:
            parent = _context7.sent;
            //const signature = git.Signature.default(repo);
            signature = _nodegit["default"].Signature.now('Kyle Kestell', 'kyle@kestell.org');
            return _context7.abrupt("return", repo.createCommit('HEAD', signature, signature, msg, tree, [parent]));

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _commitChanges.apply(this, arguments);
}

function createBranch(_x8, _x9) {
  return _createBranch.apply(this, arguments);
}

function _createBranch() {
  _createBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(repo, name) {
    var masterCommit;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return repo.getMasterCommit();

          case 2:
            masterCommit = _context8.sent;
            _context8.next = 5;
            return repo.createBranch(name, masterCommit);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _createBranch.apply(this, arguments);
}

function currentBranchName(_x10) {
  return _currentBranchName.apply(this, arguments);
}

function _currentBranchName() {
  _currentBranchName = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(repo) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return repo.getCurrentBranch();

          case 2:
            return _context9.abrupt("return", _context9.sent.shorthand());

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _currentBranchName.apply(this, arguments);
}

function onBranch(_x11, _x12) {
  return _onBranch.apply(this, arguments);
}

function _onBranch() {
  _onBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(repo, name) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return currentBranchName(repo);

          case 2:
            _context10.t0 = _context10.sent;
            _context10.t1 = name;
            return _context10.abrupt("return", _context10.t0 === _context10.t1);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _onBranch.apply(this, arguments);
}

function pullRemote(_x13, _x14) {
  return _pullRemote.apply(this, arguments);
}

function _pullRemote() {
  _pullRemote = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(repo, name) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return repo.fetch('origin', {
              callbacks: {
                credentials: function credentials(url, username) {
                  return _nodegit["default"].Cred.sshKeyFromAgent(username);
                },
                certificateCheck: function certificateCheck() {
                  return 1;
                }
              }
            });

          case 2:
            _context11.prev = 2;
            _context11.next = 5;
            return repo.mergeBranches(name, "origin/".concat(name), _nodegit["default"].Merge.PREFERENCE.FASTFORWARD_ONLY, {
              fileFavor: _nodegit["default"].Merge.FILE_FAVOR.THEIRS
            });

          case 5:
            _context11.next = 14;
            break;

          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](2);
            console.log(_context11.t0);
            console.log("Unable to fast-forward ".concat(name, ", branches have diverged"));
            console.log('You might consider:');
            console.log("    sea branch switch ".concat(name, " && git reset --hard origin/").concat(name));
            return _context11.abrupt("return", false);

          case 14:
            return _context11.abrupt("return", true);

          case 15:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[2, 7]]);
  }));
  return _pullRemote.apply(this, arguments);
}

function pushRemote(_x15, _x16) {
  return _pushRemote.apply(this, arguments);
}

function _pushRemote() {
  _pushRemote = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(repo, name) {
    var ref, refs, remote;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            ref = "refs/heads/".concat(name);
            refs = ["".concat(ref, ":").concat(ref)];
            _context12.next = 4;
            return _nodegit["default"].Remote.lookup(repo, 'origin');

          case 4:
            remote = _context12.sent;
            _context12.next = 7;
            return remote.push(refs, {
              callbacks: {
                credentials: function credentials(url, username) {
                  return _nodegit["default"].Cred.sshKeyFromAgent(username);
                },
                certificateCheck: function certificateCheck() {
                  return 1;
                }
              }
            });

          case 7:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _pushRemote.apply(this, arguments);
}

function remoteExists(_x17) {
  return _remoteExists.apply(this, arguments);
}

function _remoteExists() {
  _remoteExists = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(repo) {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _nodegit["default"].Remote.lookup(repo, 'origin');

          case 3:
            return _context13.abrupt("return", true);

          case 6:
            _context13.prev = 6;
            _context13.t0 = _context13["catch"](0);
            return _context13.abrupt("return", false);

          case 9:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 6]]);
  }));
  return _remoteExists.apply(this, arguments);
}

function remoteBranchExists(_x18, _x19) {
  return _remoteBranchExists.apply(this, arguments);
}

function _remoteBranchExists() {
  _remoteBranchExists = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(repo, name) {
    var remote, references;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _nodegit["default"].Remote.lookup(repo, 'origin');

          case 2:
            remote = _context14.sent;
            _context14.next = 5;
            return remote.connect(_nodegit["default"].Enums.DIRECTION.FETCH, {
              credentials: function credentials(url, username) {
                return _nodegit["default"].Cred.sshKeyFromAgent(username);
              },
              certificateCheck: function certificateCheck() {
                return 1;
              }
            });

          case 5:
            _context14.next = 7;
            return remote.referenceList();

          case 7:
            references = _context14.sent;
            _context14.next = 10;
            return remote.disconnect();

          case 10:
            return _context14.abrupt("return", _lodash["default"].some(references, function (reference) {
              return reference.name() === "refs/heads/".concat(name);
            }));

          case 11:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _remoteBranchExists.apply(this, arguments);
}

function workingDirectoryClean(_x20) {
  return _workingDirectoryClean.apply(this, arguments);
}

function _workingDirectoryClean() {
  _workingDirectoryClean = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15(repo) {
    var statusOptions, cnt;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            statusOptions = {
              flags: _nodegit["default"].Status.OPT.INCLUDE_UNTRACKED + _nodegit["default"].Status.OPT.RECURSE_UNTRACKED_DIRS
            };
            cnt = 0;
            _context15.next = 4;
            return _nodegit["default"].Status.foreachExt(repo, statusOptions, function () {
              cnt += 1;
            });

          case 4:
            return _context15.abrupt("return", cnt === 0);

          case 5:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _workingDirectoryClean.apply(this, arguments);
}

function stashName(name) {
  return "Sea autostash for ".concat(name);
}

function stashChanges(_x21) {
  return _stashChanges.apply(this, arguments);
}

function _stashChanges() {
  _stashChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16(repo) {
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return workingDirectoryClean(repo);

          case 2:
            if (!_context16.sent) {
              _context16.next = 4;
              break;
            }

            return _context16.abrupt("return");

          case 4:
            _context16.t0 = _nodegit["default"].Stash;
            _context16.t1 = repo;
            _context16.t2 = repo.defaultSignature();
            _context16.t3 = stashName;
            _context16.next = 10;
            return currentBranchName(repo);

          case 10:
            _context16.t4 = _context16.sent;
            _context16.t5 = (0, _context16.t3)(_context16.t4);
            _context16.t6 = _nodegit["default"].Stash.FLAGS.INCLUDE_UNTRACKED;
            _context16.next = 15;
            return _context16.t0.save.call(_context16.t0, _context16.t1, _context16.t2, _context16.t5, _context16.t6);

          case 15:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _stashChanges.apply(this, arguments);
}

function unstashChanges(_x22, _x23) {
  return _unstashChanges.apply(this, arguments);
}

function _unstashChanges() {
  _unstashChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18(repo, name) {
    var stashes, stash, checkoutOptions, stashApplyOptions;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            stashes = [];
            _context18.next = 3;
            return _nodegit["default"].Stash.foreach(repo,
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee17(index, message, oid) {
                return regeneratorRuntime.wrap(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        stashes.push({
                          index: index,
                          message: message,
                          oid: oid
                        });

                      case 1:
                      case "end":
                        return _context17.stop();
                    }
                  }
                }, _callee17);
              }));

              return function (_x24, _x25, _x26) {
                return _ref.apply(this, arguments);
              };
            }());

          case 3:
            stash = stashes.find(function (s) {
              return s.message.includes(stashName(name));
            });

            if (stash) {
              _context18.next = 6;
              break;
            }

            return _context18.abrupt("return");

          case 6:
            checkoutOptions = new _nodegit["default"].CheckoutOptions();
            checkoutOptions.checkoutStrategy = _nodegit["default"].Checkout.STRATEGY.SAFE;
            stashApplyOptions = new _nodegit["default"].StashApplyOptions();
            stashApplyOptions.checkoutOptions = checkoutOptions;
            _context18.next = 12;
            return _nodegit["default"].Stash.apply(repo, stash.index, stashApplyOptions);

          case 12:
            _context18.next = 14;
            return _nodegit["default"].Stash.drop(repo, stash.index);

          case 14:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _unstashChanges.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VhLmpzIl0sIm5hbWVzIjpbIm9wZW4iLCJwYXRoIiwicHJvY2VzcyIsImN3ZCIsImdpdCIsIlJlcG9zaXRvcnkiLCJpbml0IiwicmVwbyIsInJlZnJlc2hJbmRleCIsImluZGV4Iiwic2lnbmF0dXJlIiwiU2lnbmF0dXJlIiwid3JpdGVUcmVlIiwidHJlZSIsImNyZWF0ZUNvbW1pdCIsImlzUmVwbyIsImJyYW5jaEV4aXN0cyIsIm5hbWUiLCJCcmFuY2giLCJsb29rdXAiLCJCUkFOQ0giLCJMT0NBTCIsImNoYW5nZWRGaWxlcyIsInN0YXR1c09wdGlvbnMiLCJmbGFncyIsIlN0YXR1cyIsIk9QVCIsIklOQ0xVREVfVU5UUkFDS0VEIiwiUkVDVVJTRV9VTlRSQUNLRURfRElSUyIsImNoYW5nZXMiLCJtb2RpZmllZCIsImRlbGV0ZWQiLCJmb3JlYWNoRXh0Iiwic3RhdHVzIiwiU1RBVFVTIiwiV1RfTkVXIiwicHVzaCIsIldUX01PRElGSUVEIiwiV1RfREVMRVRFRCIsImNoZWNrb3V0QnJhbmNoIiwiY2hlY2tvdXRPcHRpb25zIiwiQ2hlY2tvdXRPcHRpb25zIiwiY2hlY2tvdXRTdHJhdGVneSIsIkNoZWNrb3V0IiwiU1RSQVRFR1kiLCJTQUZFIiwiUmV2cGFyc2UiLCJzaW5nbGUiLCJ0cmVlaXNoIiwic2V0SGVhZCIsImNvbW1pdENoYW5nZXMiLCJtc2ciLCJhZGRBbGwiLCJ3cml0ZSIsIlJlZmVyZW5jZSIsIm5hbWVUb0lkIiwiaGVhZCIsImdldENvbW1pdCIsInBhcmVudCIsIm5vdyIsImNyZWF0ZUJyYW5jaCIsImdldE1hc3RlckNvbW1pdCIsIm1hc3RlckNvbW1pdCIsImN1cnJlbnRCcmFuY2hOYW1lIiwiZ2V0Q3VycmVudEJyYW5jaCIsInNob3J0aGFuZCIsIm9uQnJhbmNoIiwicHVsbFJlbW90ZSIsImZldGNoIiwiY2FsbGJhY2tzIiwiY3JlZGVudGlhbHMiLCJ1cmwiLCJ1c2VybmFtZSIsIkNyZWQiLCJzc2hLZXlGcm9tQWdlbnQiLCJjZXJ0aWZpY2F0ZUNoZWNrIiwibWVyZ2VCcmFuY2hlcyIsIk1lcmdlIiwiUFJFRkVSRU5DRSIsIkZBU1RGT1JXQVJEX09OTFkiLCJmaWxlRmF2b3IiLCJGSUxFX0ZBVk9SIiwiVEhFSVJTIiwiY29uc29sZSIsImxvZyIsInB1c2hSZW1vdGUiLCJyZWYiLCJyZWZzIiwiUmVtb3RlIiwicmVtb3RlIiwicmVtb3RlRXhpc3RzIiwicmVtb3RlQnJhbmNoRXhpc3RzIiwiY29ubmVjdCIsIkVudW1zIiwiRElSRUNUSU9OIiwiRkVUQ0giLCJyZWZlcmVuY2VMaXN0IiwicmVmZXJlbmNlcyIsImRpc2Nvbm5lY3QiLCJfIiwic29tZSIsInJlZmVyZW5jZSIsIndvcmtpbmdEaXJlY3RvcnlDbGVhbiIsImNudCIsInN0YXNoTmFtZSIsInN0YXNoQ2hhbmdlcyIsIlN0YXNoIiwiZGVmYXVsdFNpZ25hdHVyZSIsIkZMQUdTIiwic2F2ZSIsInVuc3Rhc2hDaGFuZ2VzIiwic3Rhc2hlcyIsImZvcmVhY2giLCJtZXNzYWdlIiwib2lkIiwic3Rhc2giLCJmaW5kIiwicyIsImluY2x1ZGVzIiwic3Rhc2hBcHBseU9wdGlvbnMiLCJTdGFzaEFwcGx5T3B0aW9ucyIsImFwcGx5IiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7U0FFc0JBLEk7Ozs7Ozs7MEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0JDLFlBQUFBLElBQXBCLDJEQUEyQkMsT0FBTyxDQUFDQyxHQUFSLEVBQTNCO0FBQUEsNkNBQ0VDLG9CQUFJQyxVQUFKLENBQWVMLElBQWYsQ0FBb0JDLElBQXBCLENBREY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUllSyxJOzs7Ozs7OzBCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0JMLFlBQUFBLElBQXBCLDhEQUEy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S0FORCxHQU1TSixPQUFPLENBQUNLLElBQVIsQ0FBYSxVQUFBQyxDQUFDO0FBQUEscUJBQUlBLENBQUMsQ0FBQ0osT0FBRixDQUFVSyxRQUFWLENBQW1CZCxTQUFTLENBQUN2RixJQUFELENBQTVCLENBQUo7QUFBQSxhQUFkLENBTlQ7O0FBQUEsZ0JBUUFrRyxLQVJBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBVUMzRSxZQUFBQSxlQVZELEdBVW1CLElBQUlwQyxvQkFBSXFDLGVBQVIsRUFWbkI7QUFXTEQsWUFBQUEsZUFBZSxDQUFDRSxnQkFBaEIsR0FBbUN0QyxvQkFBSXVDLFFBQUosQ0FBYUMsUUFBYixDQUFzQkMsSUFBekQ7QUFFTTBFLFlBQUFBLGlCQWJELEdBYXFCLElBQUluSCxvQkFBSW9ILGlCQUFSLEVBYnJCO0FBY0xELFlBQUFBLGlCQUFpQixDQUFDL0UsZUFBbEIsR0FBb0NBLGVBQXBDO0FBZEs7QUFBQSxtQkFnQkNwQyxvQkFBSXNHLEtBQUosQ0FBVWUsS0FBVixDQUFnQmxILElBQWhCLEVBQXNCNEcsS0FBSyxDQUFDMUcsS0FBNUIsRUFBbUM4RyxpQkFBbkMsQ0FoQkQ7O0FBQUE7QUFBQTtBQUFBLG1CQWlCQ25ILG9CQUFJc0csS0FBSixDQUFVZ0IsSUFBVixDQUFlbkgsSUFBZixFQUFxQjRHLEtBQUssQ0FBQzFHLEtBQTNCLENBakJEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgZ2l0IGZyb20gJ25vZGVnaXQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW4ocGF0aCA9IHByb2Nlc3MuY3dkKCkpIHtcbiAgcmV0dXJuIGdpdC5SZXBvc2l0b3J5Lm9wZW4ocGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KHBhdGggPSBwcm9jZXNzLmN3ZCgpKSB7XG4gIGNvbnN0IHJlcG8gPSBhd2FpdCBnaXQuUmVwb3NpdG9yeS5pbml0KHBhdGgsIDApO1xuXG4gIGNvbnN0IGluZGV4ID0gYXdhaXQgcmVwby5yZWZyZXNoSW5kZXgoKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gZ2l0LlNpZ25hdHVyZS5kZWZhdWx0KHJlcG8pO1xuICBjb25zdCB0cmVlID0gYXdhaXQgaW5kZXgud3JpdGVUcmVlKCk7XG4gIHJldHVybiByZXBvLmNyZWF0ZUNvbW1pdChcbiAgICAnSEVBRCcsXG4gICAgc2lnbmF0dXJlLFxuICAgIHNpZ25hdHVyZSxcbiAgICAnSW5pdGlhbCBjb21taXQnLFxuICAgIHRyZWUsXG4gICAgW11cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzUmVwbyhwYXRoID0gcHJvY2Vzcy5jd2QoKSkge1xuICB0cnkge1xuICAgIGF3YWl0IG9wZW4ocGF0aCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYnJhbmNoRXhpc3RzKHJlcG8sIG5hbWUpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBnaXQuQnJhbmNoLmxvb2t1cChyZXBvLCBuYW1lLCBnaXQuQnJhbmNoLkJSQU5DSC5MT0NBTCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hhbmdlZEZpbGVzKHJlcG8pIHtcbiAgY29uc3Qgc3RhdHVzT3B0aW9ucyA9IHtcbiAgICBmbGFnczpcbiAgICAgIGdpdC5TdGF0dXMuT1BULklOQ0xVREVfVU5UUkFDS0VEICsgZ2l0LlN0YXR1cy5PUFQuUkVDVVJTRV9VTlRSQUNLRURfRElSU1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZXMgPSB7XG4gICAgbmV3OiBbXSxcbiAgICBtb2RpZmllZDogW10sXG4gICAgZGVsZXRlZDogW11cbiAgfTtcblxuICBhd2FpdCBnaXQuU3RhdHVzLmZvcmVhY2hFeHQocmVwbywgc3RhdHVzT3B0aW9ucywgKHBhdGgsIHN0YXR1cykgPT4ge1xuICAgIGlmIChzdGF0dXMgPT09IGdpdC5TdGF0dXMuU1RBVFVTLldUX05FVykgY2hhbmdlcy5uZXcucHVzaChwYXRoKTtcbiAgICBlbHNlIGlmIChzdGF0dXMgPT09IGdpdC5TdGF0dXMuU1RBVFVTLldUX01PRElGSUVEKVxuICAgICAgY2hhbmdlcy5tb2RpZmllZC5wdXNoKHBhdGgpO1xuICAgIGVsc2UgaWYgKHN0YXR1cyA9PT0gZ2l0LlN0YXR1cy5TVEFUVVMuV1RfREVMRVRFRClcbiAgICAgIGNoYW5nZXMuZGVsZXRlZC5wdXNoKHBhdGgpO1xuICB9KTtcblxuICByZXR1cm4gY2hhbmdlcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrb3V0QnJhbmNoKHJlcG8sIG5hbWUpIHtcbiAgY29uc3QgY2hlY2tvdXRPcHRpb25zID0gbmV3IGdpdC5DaGVja291dE9wdGlvbnMoKTtcbiAgY2hlY2tvdXRPcHRpb25zLmNoZWNrb3V0U3RyYXRlZ3kgPSBnaXQuQ2hlY2tvdXQuU1RSQVRFR1kuU0FGRTtcblxuICBjb25zdCB0cmVlaXNoID0gYXdhaXQgZ2l0LlJldnBhcnNlLnNpbmdsZShyZXBvLCBuYW1lKTtcbiAgYXdhaXQgZ2l0LkNoZWNrb3V0LnRyZWUocmVwbywgdHJlZWlzaCwgY2hlY2tvdXRPcHRpb25zKTtcbiAgYXdhaXQgcmVwby5zZXRIZWFkKGByZWZzL2hlYWRzLyR7bmFtZX1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbW1pdENoYW5nZXMocmVwbywgbXNnKSB7XG4gIGNvbnN0IGluZGV4ID0gYXdhaXQgcmVwby5yZWZyZXNoSW5kZXgoKTtcbiAgYXdhaXQgaW5kZXguYWRkQWxsKCk7XG4gIGF3YWl0IGluZGV4LndyaXRlKCk7XG4gIGNvbnN0IHRyZWUgPSBhd2FpdCBpbmRleC53cml0ZVRyZWUoKTtcbiAgY29uc3QgaGVhZCA9IGF3YWl0IGdpdC5SZWZlcmVuY2UubmFtZVRvSWQocmVwbywgJ0hFQUQnKTtcbiAgY29uc3QgcGFyZW50ID0gYXdhaXQgcmVwby5nZXRDb21taXQoaGVhZCk7XG4gIC8vY29uc3Qgc2lnbmF0dXJlID0gZ2l0LlNpZ25hdHVyZS5kZWZhdWx0KHJlcG8pO1xuICBjb25zdCBzaWduYXR1cmUgPSBnaXQuU2lnbmF0dXJlLm5vdygnS3lsZSBLZXN0ZWxsJywgJ2t5bGVAa2VzdGVsbC5vcmcnKTtcbiAgcmV0dXJuIHJlcG8uY3JlYXRlQ29tbWl0KCdIRUFEJywgc2lnbmF0dXJlLCBzaWduYXR1cmUsIG1zZywgdHJlZSwgW3BhcmVudF0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQnJhbmNoKHJlcG8sIG5hbWUpIHtcbiAgY29uc3QgbWFzdGVyQ29tbWl0ID0gYXdhaXQgcmVwby5nZXRNYXN0ZXJDb21taXQoKTtcbiAgYXdhaXQgcmVwby5jcmVhdGVCcmFuY2gobmFtZSwgbWFzdGVyQ29tbWl0KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGN1cnJlbnRCcmFuY2hOYW1lKHJlcG8pIHtcbiAgcmV0dXJuIChhd2FpdCByZXBvLmdldEN1cnJlbnRCcmFuY2goKSkuc2hvcnRoYW5kKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvbkJyYW5jaChyZXBvLCBuYW1lKSB7XG4gIHJldHVybiAoYXdhaXQgY3VycmVudEJyYW5jaE5hbWUocmVwbykpID09PSBuYW1lO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHVsbFJlbW90ZShyZXBvLCBuYW1lKSB7XG4gIGF3YWl0IHJlcG8uZmV0Y2goJ29yaWdpbicsIHtcbiAgICBjYWxsYmFja3M6IHtcbiAgICAgIGNyZWRlbnRpYWxzOiAodXJsLCB1c2VybmFtZSkgPT4gZ2l0LkNyZWQuc3NoS2V5RnJvbUFnZW50KHVzZXJuYW1lKSxcbiAgICAgIGNlcnRpZmljYXRlQ2hlY2s6ICgpID0+IDFcbiAgICB9XG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgcmVwby5tZXJnZUJyYW5jaGVzKFxuICAgICAgbmFtZSxcbiAgICAgIGBvcmlnaW4vJHtuYW1lfWAsXG4gICAgICBnaXQuTWVyZ2UuUFJFRkVSRU5DRS5GQVNURk9SV0FSRF9PTkxZLFxuICAgICAge1xuICAgICAgICBmaWxlRmF2b3I6IGdpdC5NZXJnZS5GSUxFX0ZBVk9SLlRIRUlSU1xuICAgICAgfVxuICAgICk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgY29uc29sZS5sb2coYFVuYWJsZSB0byBmYXN0LWZvcndhcmQgJHtuYW1lfSwgYnJhbmNoZXMgaGF2ZSBkaXZlcmdlZGApO1xuICAgIGNvbnNvbGUubG9nKCdZb3UgbWlnaHQgY29uc2lkZXI6Jyk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgICAgIHNlYSBicmFuY2ggc3dpdGNoICR7bmFtZX0gJiYgZ2l0IHJlc2V0IC0taGFyZCBvcmlnaW4vJHtuYW1lfWBcbiAgICApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHVzaFJlbW90ZShyZXBvLCBuYW1lKSB7XG4gIGNvbnN0IHJlZiA9IGByZWZzL2hlYWRzLyR7bmFtZX1gO1xuICBjb25zdCByZWZzID0gW2Ake3JlZn06JHtyZWZ9YF07XG5cbiAgY29uc3QgcmVtb3RlID0gYXdhaXQgZ2l0LlJlbW90ZS5sb29rdXAocmVwbywgJ29yaWdpbicpO1xuXG4gIGF3YWl0IHJlbW90ZS5wdXNoKHJlZnMsIHtcbiAgICBjYWxsYmFja3M6IHtcbiAgICAgIGNyZWRlbnRpYWxzOiAodXJsLCB1c2VybmFtZSkgPT4gZ2l0LkNyZWQuc3NoS2V5RnJvbUFnZW50KHVzZXJuYW1lKSxcbiAgICAgIGNlcnRpZmljYXRlQ2hlY2s6ICgpID0+IDFcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3RlRXhpc3RzKHJlcG8pIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBnaXQuUmVtb3RlLmxvb2t1cChyZXBvLCAnb3JpZ2luJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3RlQnJhbmNoRXhpc3RzKHJlcG8sIG5hbWUpIHtcbiAgY29uc3QgcmVtb3RlID0gYXdhaXQgZ2l0LlJlbW90ZS5sb29rdXAocmVwbywgJ29yaWdpbicpO1xuXG4gIGF3YWl0IHJlbW90ZS5jb25uZWN0KGdpdC5FbnVtcy5ESVJFQ1RJT04uRkVUQ0gsIHtcbiAgICBjcmVkZW50aWFsczogKHVybCwgdXNlcm5hbWUpID0+IGdpdC5DcmVkLnNzaEtleUZyb21BZ2VudCh1c2VybmFtZSksXG4gICAgY2VydGlmaWNhdGVDaGVjazogKCkgPT4gMVxuICB9KTtcblxuICBjb25zdCByZWZlcmVuY2VzID0gYXdhaXQgcmVtb3RlLnJlZmVyZW5jZUxpc3QoKTtcblxuICBhd2FpdCByZW1vdGUuZGlzY29ubmVjdCgpO1xuXG4gIHJldHVybiBfLnNvbWUoXG4gICAgcmVmZXJlbmNlcyxcbiAgICByZWZlcmVuY2UgPT4gcmVmZXJlbmNlLm5hbWUoKSA9PT0gYHJlZnMvaGVhZHMvJHtuYW1lfWBcbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdvcmtpbmdEaXJlY3RvcnlDbGVhbihyZXBvKSB7XG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB7XG4gICAgZmxhZ3M6XG4gICAgICBnaXQuU3RhdHVzLk9QVC5JTkNMVURFX1VOVFJBQ0tFRCArIGdpdC5TdGF0dXMuT1BULlJFQ1VSU0VfVU5UUkFDS0VEX0RJUlNcbiAgfTtcblxuICBsZXQgY250ID0gMDtcbiAgYXdhaXQgZ2l0LlN0YXR1cy5mb3JlYWNoRXh0KHJlcG8sIHN0YXR1c09wdGlvbnMsICgpID0+IHtcbiAgICBjbnQgKz0gMTtcbiAgfSk7XG4gIHJldHVybiBjbnQgPT09IDA7XG59XG5cbmZ1bmN0aW9uIHN0YXNoTmFtZShuYW1lKSB7XG4gIHJldHVybiBgU2VhIGF1dG9zdGFzaCBmb3IgJHtuYW1lfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFzaENoYW5nZXMocmVwbykge1xuICBpZiAoYXdhaXQgd29ya2luZ0RpcmVjdG9yeUNsZWFuKHJlcG8pKSByZXR1cm47XG5cbiAgYXdhaXQgZ2l0LlN0YXNoLnNhdmUoXG4gICAgcmVwbyxcbiAgICByZXBvLmRlZmF1bHRTaWduYXR1cmUoKSxcbiAgICBzdGFzaE5hbWUoYXdhaXQgY3VycmVudEJyYW5jaE5hbWUocmVwbykpLFxuICAgIGdpdC5TdGFzaC5GTEFHUy5JTkNMVURFX1VOVFJBQ0tFRFxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdW5zdGFzaENoYW5nZXMocmVwbywgbmFtZSkge1xuICBjb25zdCBzdGFzaGVzID0gW107XG4gIGF3YWl0IGdpdC5TdGFzaC5mb3JlYWNoKHJlcG8sIGFzeW5jIChpbmRleCwgbWVzc2FnZSwgb2lkKSA9PiB7XG4gICAgc3Rhc2hlcy5wdXNoKHsgaW5kZXgsIG1lc3NhZ2UsIG9pZCB9KTtcbiAgfSk7XG5cbiAgY29uc3Qgc3Rhc2ggPSBzdGFzaGVzLmZpbmQocyA9PiBzLm1lc3NhZ2UuaW5jbHVkZXMoc3Rhc2hOYW1lKG5hbWUpKSk7XG5cbiAgaWYgKCFzdGFzaCkgcmV0dXJuO1xuXG4gIGNvbnN0IGNoZWNrb3V0T3B0aW9ucyA9IG5ldyBnaXQuQ2hlY2tvdXRPcHRpb25zKCk7XG4gIGNoZWNrb3V0T3B0aW9ucy5jaGVja291dFN0cmF0ZWd5ID0gZ2l0LkNoZWNrb3V0LlNUUkFURUdZLlNBRkU7XG5cbiAgY29uc3Qgc3Rhc2hBcHBseU9wdGlvbnMgPSBuZXcgZ2l0LlN0YXNoQXBwbHlPcHRpb25zKCk7XG4gIHN0YXNoQXBwbHlPcHRpb25zLmNoZWNrb3V0T3B0aW9ucyA9IGNoZWNrb3V0T3B0aW9ucztcblxuICBhd2FpdCBnaXQuU3Rhc2guYXBwbHkocmVwbywgc3Rhc2guaW5kZXgsIHN0YXNoQXBwbHlPcHRpb25zKTtcbiAgYXdhaXQgZ2l0LlN0YXNoLmRyb3AocmVwbywgc3Rhc2guaW5kZXgpO1xufVxuIl19