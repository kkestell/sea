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

function commitChanges(_x6, _x7, _x8, _x9) {
  return _commitChanges.apply(this, arguments);
}

function _commitChanges() {
  _commitChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(repo, msg, name, email) {
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
            signature = _nodegit["default"].Signature.now(name, email);
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

function createBranch(_x10, _x11) {
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

function currentBranchName(_x12) {
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

function onBranch(_x13, _x14) {
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

function pullRemote(_x15, _x16) {
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

function pushRemote(_x17, _x18) {
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

function remoteExists(_x19) {
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

function remoteBranchExists(_x20, _x21) {
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

function workingDirectoryClean(_x22) {
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

function stashChanges(_x23) {
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

function unstashChanges(_x24, _x25) {
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

              return function (_x26, _x27, _x28) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VhLmpzIl0sIm5hbWVzIjpbIm9wZW4iLCJwYXRoIiwicHJvY2VzcyIsImN3ZCIsImdpdCIsIlJlcG9zaXRvcnkiLCJpbml0IiwicmVwbyIsInJlZnJlc2hJbmRleCIsImluZGV4Iiwic2lnbmF0dXJlIiwiU2lnbmF0dXJlIiwid3JpdGVUcmVlIiwidHJlZSIsImNyZWF0ZUNvbW1pdCIsImlzUmVwbyIsImJyYW5jaEV4aXN0cyIsIm5hbWUiLCJCcmFuY2giLCJsb29rdXAiLCJCUkFOQ0giLCJMT0NBTCIsImNoYW5nZWRGaWxlcyIsInN0YXR1c09wdGlvbnMiLCJmbGFncyIsIlN0YXR1cyIsIk9QVCIsIklOQ0xVREVfVU5UUkFDS0VEIiwiUkVDVVJTRV9VTlRSQUNLRURfRElSUyIsImNoYW5nZXMiLCJtb2RpZmllZCIsImRlbGV0ZWQiLCJmb3JlYWNoRXh0Iiwic3RhdHVzIiwiU1RBVFVTIiwiV1RfTkVXIiwicHVzaCIsIldUX01PRElGSUVEIiwiV1RfREVMRVRFRCIsImNoZWNrb3V0QnJhbmNoIiwiY2hlY2tvdXRPcHRpb25zIiwiQ2hlY2tvdXRPcHRpb25zIiwiY2hlY2tvdXRTdHJhdGVneSIsIkNoZWNrb3V0IiwiU1RSQVRFR1kiLCJTQUZFIiwiUmV2cGFyc2UiLCJzaW5nbGUiLCJ0cmVlaXNoIiwic2V0SGVhZCIsImNvbW1pdENoYW5nZXMiLCJtc2ciLCJlbWFpbCIsImFkZEFsbCIsIndyaXRlIiwiUmVmZXJlbmNlIiwibmFtZVRvSWQiLCJoZWFkIiwiZ2V0Q29tbWl0IiwicGFyZW50Iiwibm93IiwiY3JlYXRlQnJhbmNoIiwiZ2V0TWFzdGVyQ29tbWl0IiwibWFzdGVyQ29tbWl0IiwiY3VycmVudEJyYW5jaE5hbWUiLCJnZXRDdXJyZW50QnJhbmNoIiwic2hvcnRoYW5kIiwib25CcmFuY2giLCJwdWxsUmVtb3RlIiwiZmV0Y2giLCJjYWxsYmFja3MiLCJjcmVkZW50aWFscyIsInVybCIsInVzZXJuYW1lIiwiQ3JlZCIsInNzaEtleUZyb21BZ2VudCIsImNlcnRpZmljYXRlQ2hlY2siLCJtZXJnZUJyYW5jaGVzIiwiTWVyZ2UiLCJQUkVGRVJFTkNFIiwiRkFTVEZPUldBUkRfT05MWSIsImZpbGVGYXZvciIsIkZJTEVfRkFWT1IiLCJUSEVJUlMiLCJjb25zb2xlIiwibG9nIiwicHVzaFJlbW90ZSIsInJlZiIsInJlZnMiLCJSZW1vdGUiLCJyZW1vdGUiLCJyZW1vdGVFeGlzdHMiLCJyZW1vdGVCcmFuY2hFeGlzdHMiLCJjb25uZWN0IiwiRW51bXMiLCJESVJFQ1RJT04iLCJGRVRDSCIsInJlZmVyZW5jZUxpc3QiLCJyZWZlcmVuY2VzIiwiZGlzY29ubmVjdCIsIl8iLCJzb21lIiwicmVmZXJlbmNlIiwid29ya2luZ0RpcmVjdG9yeUNsZWFuIiwiY250Iiwic3Rhc2hOYW1lIiwic3Rhc2hDaGFuZ2VzIiwiU3Rhc2giLCJkZWZhdWx0U2lnbmF0dXJlIiwiRkxBR1MiLCJzYXZlIiwidW5zdGFzaENoYW5nZXMiLCJzdGFzaGVzIiwiZm9yZWFjaCIsIm1lc3NhZ2UiLCJvaWQiLCJzdGFzaCIsImZpbmQiLCJzIiwiaW5jbHVkZXMiLCJzdGFzaEFwcGx5T3B0aW9ucyIsIlN0YXNoQXBwbHlPcHRpb25zIiwiYXBwbHkiLCJkcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7OztTQUVzQkEsSTs7Ozs7OzswQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQkMsWUFBQUEsSUFBcEIsMkRBQTJCQyxPQUFPLENBQUNDLEdBQVIsRUFBM0I7QUFBQSw2Q0FDRUMsb0JBQUlDLFVBQUosQ0FBZUwsSUFBZixDQUFvQkMsSUFBcEIsQ0FERjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBSWVLLEk7Ozs7Ozs7MEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQkwsWUFBQUEsSUFB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QUFBQTtBQUFBLGdCQUZEOztBQUFBO0FBTUNDLFlBQUFBLEtBTkQsR0FNU0osT0FBTyxDQUFDSyxJQUFSLENBQWEsVUFBQUMsQ0FBQztBQUFBLHFCQUFJQSxDQUFDLENBQUNKLE9BQUYsQ0FBVUssUUFBVixDQUFtQmQsU0FBUyxDQUFDeEYsSUFBRCxDQUE1QixDQUFKO0FBQUEsYUFBZCxDQU5UOztBQUFBLGdCQVFBbUcsS0FSQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQVVDNUUsWUFBQUEsZUFWRCxHQVVtQixJQUFJcEMsb0JBQUlxQyxlQUFSLEVBVm5CO0FBV0xELFlBQUFBLGVBQWUsQ0FBQ0UsZ0JBQWhCLEdBQW1DdEMsb0JBQUl1QyxRQUFKLENBQWFDLFFBQWIsQ0FBc0JDLElBQXpEO0FBRU0yRSxZQUFBQSxpQkFiRCxHQWFxQixJQUFJcEgsb0JBQUlxSCxpQkFBUixFQWJyQjtBQWNMRCxZQUFBQSxpQkFBaUIsQ0FBQ2hGLGVBQWxCLEdBQW9DQSxlQUFwQztBQWRLO0FBQUEsbUJBZ0JDcEMsb0JBQUl1RyxLQUFKLENBQVVlLEtBQVYsQ0FBZ0JuSCxJQUFoQixFQUFzQjZHLEtBQUssQ0FBQzNHLEtBQTVCLEVBQW1DK0csaUJBQW5DLENBaEJEOztBQUFBO0FBQUE7QUFBQSxtQkFpQkNwSCxvQkFBSXVHLEtBQUosQ0FBVWdCLElBQVYsQ0FBZXBILElBQWYsRUFBcUI2RyxLQUFLLENBQUMzRyxLQUEzQixDQWpCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0IGdpdCBmcm9tICdub2RlZ2l0JztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuKHBhdGggPSBwcm9jZXNzLmN3ZCgpKSB7XG4gIHJldHVybiBnaXQuUmVwb3NpdG9yeS5vcGVuKHBhdGgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdChwYXRoID0gcHJvY2Vzcy5jd2QoKSkge1xuICBjb25zdCByZXBvID0gYXdhaXQgZ2l0LlJlcG9zaXRvcnkuaW5pdChwYXRoLCAwKTtcblxuICBjb25zdCBpbmRleCA9IGF3YWl0IHJlcG8ucmVmcmVzaEluZGV4KCk7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGdpdC5TaWduYXR1cmUuZGVmYXVsdChyZXBvKTtcbiAgY29uc3QgdHJlZSA9IGF3YWl0IGluZGV4LndyaXRlVHJlZSgpO1xuICByZXR1cm4gcmVwby5jcmVhdGVDb21taXQoXG4gICAgJ0hFQUQnLFxuICAgIHNpZ25hdHVyZSxcbiAgICBzaWduYXR1cmUsXG4gICAgJ0luaXRpYWwgY29tbWl0JyxcbiAgICB0cmVlLFxuICAgIFtdXG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc1JlcG8ocGF0aCA9IHByb2Nlc3MuY3dkKCkpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBvcGVuKHBhdGgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJyYW5jaEV4aXN0cyhyZXBvLCBuYW1lKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgZ2l0LkJyYW5jaC5sb29rdXAocmVwbywgbmFtZSwgZ2l0LkJyYW5jaC5CUkFOQ0guTE9DQUwpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoYW5nZWRGaWxlcyhyZXBvKSB7XG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB7XG4gICAgZmxhZ3M6XG4gICAgICBnaXQuU3RhdHVzLk9QVC5JTkNMVURFX1VOVFJBQ0tFRCArIGdpdC5TdGF0dXMuT1BULlJFQ1VSU0VfVU5UUkFDS0VEX0RJUlNcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VzID0ge1xuICAgIG5ldzogW10sXG4gICAgbW9kaWZpZWQ6IFtdLFxuICAgIGRlbGV0ZWQ6IFtdXG4gIH07XG5cbiAgYXdhaXQgZ2l0LlN0YXR1cy5mb3JlYWNoRXh0KHJlcG8sIHN0YXR1c09wdGlvbnMsIChwYXRoLCBzdGF0dXMpID0+IHtcbiAgICBpZiAoc3RhdHVzID09PSBnaXQuU3RhdHVzLlNUQVRVUy5XVF9ORVcpIGNoYW5nZXMubmV3LnB1c2gocGF0aCk7XG4gICAgZWxzZSBpZiAoc3RhdHVzID09PSBnaXQuU3RhdHVzLlNUQVRVUy5XVF9NT0RJRklFRClcbiAgICAgIGNoYW5nZXMubW9kaWZpZWQucHVzaChwYXRoKTtcbiAgICBlbHNlIGlmIChzdGF0dXMgPT09IGdpdC5TdGF0dXMuU1RBVFVTLldUX0RFTEVURUQpXG4gICAgICBjaGFuZ2VzLmRlbGV0ZWQucHVzaChwYXRoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoYW5nZXM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja291dEJyYW5jaChyZXBvLCBuYW1lKSB7XG4gIGNvbnN0IGNoZWNrb3V0T3B0aW9ucyA9IG5ldyBnaXQuQ2hlY2tvdXRPcHRpb25zKCk7XG4gIGNoZWNrb3V0T3B0aW9ucy5jaGVja291dFN0cmF0ZWd5ID0gZ2l0LkNoZWNrb3V0LlNUUkFURUdZLlNBRkU7XG5cbiAgY29uc3QgdHJlZWlzaCA9IGF3YWl0IGdpdC5SZXZwYXJzZS5zaW5nbGUocmVwbywgbmFtZSk7XG4gIGF3YWl0IGdpdC5DaGVja291dC50cmVlKHJlcG8sIHRyZWVpc2gsIGNoZWNrb3V0T3B0aW9ucyk7XG4gIGF3YWl0IHJlcG8uc2V0SGVhZChgcmVmcy9oZWFkcy8ke25hbWV9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21taXRDaGFuZ2VzKHJlcG8sIG1zZywgbmFtZSwgZW1haWwpIHtcbiAgY29uc3QgaW5kZXggPSBhd2FpdCByZXBvLnJlZnJlc2hJbmRleCgpO1xuICBhd2FpdCBpbmRleC5hZGRBbGwoKTtcbiAgYXdhaXQgaW5kZXgud3JpdGUoKTtcbiAgY29uc3QgdHJlZSA9IGF3YWl0IGluZGV4LndyaXRlVHJlZSgpO1xuICBjb25zdCBoZWFkID0gYXdhaXQgZ2l0LlJlZmVyZW5jZS5uYW1lVG9JZChyZXBvLCAnSEVBRCcpO1xuICBjb25zdCBwYXJlbnQgPSBhd2FpdCByZXBvLmdldENvbW1pdChoZWFkKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gZ2l0LlNpZ25hdHVyZS5ub3cobmFtZSwgZW1haWwpO1xuICByZXR1cm4gcmVwby5jcmVhdGVDb21taXQoJ0hFQUQnLCBzaWduYXR1cmUsIHNpZ25hdHVyZSwgbXNnLCB0cmVlLCBbcGFyZW50XSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVCcmFuY2gocmVwbywgbmFtZSkge1xuICBjb25zdCBtYXN0ZXJDb21taXQgPSBhd2FpdCByZXBvLmdldE1hc3RlckNvbW1pdCgpO1xuICBhd2FpdCByZXBvLmNyZWF0ZUJyYW5jaChuYW1lLCBtYXN0ZXJDb21taXQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3VycmVudEJyYW5jaE5hbWUocmVwbykge1xuICByZXR1cm4gKGF3YWl0IHJlcG8uZ2V0Q3VycmVudEJyYW5jaCgpKS5zaG9ydGhhbmQoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9uQnJhbmNoKHJlcG8sIG5hbWUpIHtcbiAgcmV0dXJuIChhd2FpdCBjdXJyZW50QnJhbmNoTmFtZShyZXBvKSkgPT09IG5hbWU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwdWxsUmVtb3RlKHJlcG8sIG5hbWUpIHtcbiAgYXdhaXQgcmVwby5mZXRjaCgnb3JpZ2luJywge1xuICAgIGNhbGxiYWNrczoge1xuICAgICAgY3JlZGVudGlhbHM6ICh1cmwsIHVzZXJuYW1lKSA9PiBnaXQuQ3JlZC5zc2hLZXlGcm9tQWdlbnQodXNlcm5hbWUpLFxuICAgICAgY2VydGlmaWNhdGVDaGVjazogKCkgPT4gMVxuICAgIH1cbiAgfSk7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCByZXBvLm1lcmdlQnJhbmNoZXMoXG4gICAgICBuYW1lLFxuICAgICAgYG9yaWdpbi8ke25hbWV9YCxcbiAgICAgIGdpdC5NZXJnZS5QUkVGRVJFTkNFLkZBU1RGT1JXQVJEX09OTFksXG4gICAgICB7XG4gICAgICAgIGZpbGVGYXZvcjogZ2l0Lk1lcmdlLkZJTEVfRkFWT1IuVEhFSVJTXG4gICAgICB9XG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgICBjb25zb2xlLmxvZyhgVW5hYmxlIHRvIGZhc3QtZm9yd2FyZCAke25hbWV9LCBicmFuY2hlcyBoYXZlIGRpdmVyZ2VkYCk7XG4gICAgY29uc29sZS5sb2coJ1lvdSBtaWdodCBjb25zaWRlcjonKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGAgICAgc2VhIGJyYW5jaCBzd2l0Y2ggJHtuYW1lfSAmJiBnaXQgcmVzZXQgLS1oYXJkIG9yaWdpbi8ke25hbWV9YFxuICAgICk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwdXNoUmVtb3RlKHJlcG8sIG5hbWUpIHtcbiAgY29uc3QgcmVmID0gYHJlZnMvaGVhZHMvJHtuYW1lfWA7XG4gIGNvbnN0IHJlZnMgPSBbYCR7cmVmfToke3JlZn1gXTtcblxuICBjb25zdCByZW1vdGUgPSBhd2FpdCBnaXQuUmVtb3RlLmxvb2t1cChyZXBvLCAnb3JpZ2luJyk7XG5cbiAgYXdhaXQgcmVtb3RlLnB1c2gocmVmcywge1xuICAgIGNhbGxiYWNrczoge1xuICAgICAgY3JlZGVudGlhbHM6ICh1cmwsIHVzZXJuYW1lKSA9PiBnaXQuQ3JlZC5zc2hLZXlGcm9tQWdlbnQodXNlcm5hbWUpLFxuICAgICAgY2VydGlmaWNhdGVDaGVjazogKCkgPT4gMVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdGVFeGlzdHMocmVwbykge1xuICB0cnkge1xuICAgIGF3YWl0IGdpdC5SZW1vdGUubG9va3VwKHJlcG8sICdvcmlnaW4nKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdGVCcmFuY2hFeGlzdHMocmVwbywgbmFtZSkge1xuICBjb25zdCByZW1vdGUgPSBhd2FpdCBnaXQuUmVtb3RlLmxvb2t1cChyZXBvLCAnb3JpZ2luJyk7XG5cbiAgYXdhaXQgcmVtb3RlLmNvbm5lY3QoZ2l0LkVudW1zLkRJUkVDVElPTi5GRVRDSCwge1xuICAgIGNyZWRlbnRpYWxzOiAodXJsLCB1c2VybmFtZSkgPT4gZ2l0LkNyZWQuc3NoS2V5RnJvbUFnZW50KHVzZXJuYW1lKSxcbiAgICBjZXJ0aWZpY2F0ZUNoZWNrOiAoKSA9PiAxXG4gIH0pO1xuXG4gIGNvbnN0IHJlZmVyZW5jZXMgPSBhd2FpdCByZW1vdGUucmVmZXJlbmNlTGlzdCgpO1xuXG4gIGF3YWl0IHJlbW90ZS5kaXNjb25uZWN0KCk7XG5cbiAgcmV0dXJuIF8uc29tZShcbiAgICByZWZlcmVuY2VzLFxuICAgIHJlZmVyZW5jZSA9PiByZWZlcmVuY2UubmFtZSgpID09PSBgcmVmcy9oZWFkcy8ke25hbWV9YFxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd29ya2luZ0RpcmVjdG9yeUNsZWFuKHJlcG8pIHtcbiAgY29uc3Qgc3RhdHVzT3B0aW9ucyA9IHtcbiAgICBmbGFnczpcbiAgICAgIGdpdC5TdGF0dXMuT1BULklOQ0xVREVfVU5UUkFDS0VEICsgZ2l0LlN0YXR1cy5PUFQuUkVDVVJTRV9VTlRSQUNLRURfRElSU1xuICB9O1xuXG4gIGxldCBjbnQgPSAwO1xuICBhd2FpdCBnaXQuU3RhdHVzLmZvcmVhY2hFeHQocmVwbywgc3RhdHVzT3B0aW9ucywgKCkgPT4ge1xuICAgIGNudCArPSAxO1xuICB9KTtcbiAgcmV0dXJuIGNudCA9PT0gMDtcbn1cblxuZnVuY3Rpb24gc3Rhc2hOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIGBTZWEgYXV0b3N0YXNoIGZvciAke25hbWV9YDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN0YXNoQ2hhbmdlcyhyZXBvKSB7XG4gIGlmIChhd2FpdCB3b3JraW5nRGlyZWN0b3J5Q2xlYW4ocmVwbykpIHJldHVybjtcblxuICBhd2FpdCBnaXQuU3Rhc2guc2F2ZShcbiAgICByZXBvLFxuICAgIHJlcG8uZGVmYXVsdFNpZ25hdHVyZSgpLFxuICAgIHN0YXNoTmFtZShhd2FpdCBjdXJyZW50QnJhbmNoTmFtZShyZXBvKSksXG4gICAgZ2l0LlN0YXNoLkZMQUdTLklOQ0xVREVfVU5UUkFDS0VEXG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1bnN0YXNoQ2hhbmdlcyhyZXBvLCBuYW1lKSB7XG4gIGNvbnN0IHN0YXNoZXMgPSBbXTtcbiAgYXdhaXQgZ2l0LlN0YXNoLmZvcmVhY2gocmVwbywgYXN5bmMgKGluZGV4LCBtZXNzYWdlLCBvaWQpID0+IHtcbiAgICBzdGFzaGVzLnB1c2goeyBpbmRleCwgbWVzc2FnZSwgb2lkIH0pO1xuICB9KTtcblxuICBjb25zdCBzdGFzaCA9IHN0YXNoZXMuZmluZChzID0+IHMubWVzc2FnZS5pbmNsdWRlcyhzdGFzaE5hbWUobmFtZSkpKTtcblxuICBpZiAoIXN0YXNoKSByZXR1cm47XG5cbiAgY29uc3QgY2hlY2tvdXRPcHRpb25zID0gbmV3IGdpdC5DaGVja291dE9wdGlvbnMoKTtcbiAgY2hlY2tvdXRPcHRpb25zLmNoZWNrb3V0U3RyYXRlZ3kgPSBnaXQuQ2hlY2tvdXQuU1RSQVRFR1kuU0FGRTtcblxuICBjb25zdCBzdGFzaEFwcGx5T3B0aW9ucyA9IG5ldyBnaXQuU3Rhc2hBcHBseU9wdGlvbnMoKTtcbiAgc3Rhc2hBcHBseU9wdGlvbnMuY2hlY2tvdXRPcHRpb25zID0gY2hlY2tvdXRPcHRpb25zO1xuXG4gIGF3YWl0IGdpdC5TdGFzaC5hcHBseShyZXBvLCBzdGFzaC5pbmRleCwgc3Rhc2hBcHBseU9wdGlvbnMpO1xuICBhd2FpdCBnaXQuU3Rhc2guZHJvcChyZXBvLCBzdGFzaC5pbmRleCk7XG59XG4iXX0=