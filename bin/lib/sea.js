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

var _ora = _interopRequireDefault(require("ora"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            return _context.abrupt("return", _nodegit.default.Repository.open(path));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
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
            return _nodegit.default.Repository.init(path, 0);

          case 3:
            repo = _context2.sent;
            _context2.next = 6;
            return repo.refreshIndex();

          case 6:
            index = _context2.sent;
            signature = _nodegit.default.Signature.default(repo);
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
    }, _callee2, this);
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
    }, _callee3, this, [[1, 7]]);
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
            return _nodegit.default.Branch.lookup(repo, name, _nodegit.default.Branch.BRANCH.LOCAL);

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
    }, _callee4, this, [[0, 6]]);
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
              flags: _nodegit.default.Status.OPT.INCLUDE_UNTRACKED + _nodegit.default.Status.OPT.RECURSE_UNTRACKED_DIRS
            };
            changes = {
              new: [],
              modified: [],
              deleted: []
            };
            _context5.next = 4;
            return _nodegit.default.Status.foreachExt(repo, statusOptions, function (path, status) {
              if (status === _nodegit.default.Status.STATUS.WT_NEW) changes.new.push(path);else if (status === _nodegit.default.Status.STATUS.WT_MODIFIED) changes.modified.push(path);else if (status === _nodegit.default.Status.STATUS.WT_DELETED) changes.deleted.push(path);
            });

          case 4:
            return _context5.abrupt("return", changes);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
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
            checkoutOptions = new _nodegit.default.CheckoutOptions();
            checkoutOptions.checkoutStrategy = _nodegit.default.Checkout.STRATEGY.SAFE;
            _context6.next = 4;
            return _nodegit.default.Revparse.single(repo, name);

          case 4:
            treeish = _context6.sent;
            _context6.next = 7;
            return _nodegit.default.Checkout.tree(repo, treeish, checkoutOptions);

          case 7:
            _context6.next = 9;
            return repo.setHead("refs/heads/".concat(name));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
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
            return _nodegit.default.Reference.nameToId(repo, 'HEAD');

          case 12:
            head = _context7.sent;
            _context7.next = 15;
            return repo.getCommit(head);

          case 15:
            parent = _context7.sent;
            signature = _nodegit.default.Signature.default(repo);
            return _context7.abrupt("return", repo.createCommit('HEAD', signature, signature, msg, tree, [parent]));

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
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
    }, _callee8, this);
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
    }, _callee9, this);
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
    }, _callee10, this);
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
                  return _nodegit.default.Cred.sshKeyFromAgent(username);
                },
                certificateCheck: function certificateCheck() {
                  return 1;
                } //,
                //transferProgress: () => console.log('.')

              }
            });

          case 2:
            _context11.prev = 2;
            _context11.next = 5;
            return repo.mergeBranches(name, "origin/".concat(name), _nodegit.default.Merge.PREFERENCE.FASTFORWARD_ONLY, {
              fileFavor: _nodegit.default.Merge.FILE_FAVOR.THEIRS
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
    }, _callee11, this, [[2, 7]]);
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
            return _nodegit.default.Remote.lookup(repo, 'origin');

          case 4:
            remote = _context12.sent;
            _context12.next = 7;
            return remote.push(refs, {
              callbacks: {
                credentials: function credentials(url, username) {
                  return _nodegit.default.Cred.sshKeyFromAgent(username);
                },
                certificateCheck: function certificateCheck() {
                  return 1;
                } //,
                //pushTransferProgress: () => console.log('.')

              }
            });

          case 7:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
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
            return _nodegit.default.Remote.lookup(repo, 'origin');

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
    }, _callee13, this, [[0, 6]]);
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
            return _nodegit.default.Remote.lookup(repo, 'origin');

          case 2:
            remote = _context14.sent;
            _context14.next = 5;
            return remote.connect(_nodegit.default.Enums.DIRECTION.FETCH, {
              credentials: function credentials(url, username) {
                return _nodegit.default.Cred.sshKeyFromAgent(username);
              },
              certificateCheck: function certificateCheck() {
                return 1;
              },
              pushTransferProgress: function pushTransferProgress() {
                return console.log('.');
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
            return _context14.abrupt("return", _lodash.default.some(references, function (reference) {
              return reference.name() === "refs/heads/".concat(name);
            }));

          case 11:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
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
              flags: _nodegit.default.Status.OPT.INCLUDE_UNTRACKED + _nodegit.default.Status.OPT.RECURSE_UNTRACKED_DIRS
            };
            cnt = 0;
            _context15.next = 4;
            return _nodegit.default.Status.foreachExt(repo, statusOptions, function () {
              cnt += 1;
            });

          case 4:
            return _context15.abrupt("return", cnt === 0);

          case 5:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
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
            _context16.t0 = _nodegit.default.Stash;
            _context16.t1 = repo;
            _context16.t2 = repo.defaultSignature();
            _context16.t3 = stashName;
            _context16.next = 10;
            return currentBranchName(repo);

          case 10:
            _context16.t4 = _context16.sent;
            _context16.t5 = (0, _context16.t3)(_context16.t4);
            _context16.t6 = _nodegit.default.Stash.FLAGS.INCLUDE_UNTRACKED;
            _context16.next = 15;
            return _context16.t0.save.call(_context16.t0, _context16.t1, _context16.t2, _context16.t5, _context16.t6);

          case 15:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
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
            return _nodegit.default.Stash.foreach(repo,
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
                }, _callee17, this);
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
            checkoutOptions = new _nodegit.default.CheckoutOptions();
            checkoutOptions.checkoutStrategy = _nodegit.default.Checkout.STRATEGY.SAFE;
            stashApplyOptions = new _nodegit.default.StashApplyOptions();
            stashApplyOptions.checkoutOptions = checkoutOptions;
            _context18.next = 12;
            return _nodegit.default.Stash.apply(repo, stash.index, stashApplyOptions);

          case 12:
            _context18.next = 14;
            return _nodegit.default.Stash.drop(repo, stash.index);

          case 14:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));
  return _unstashChanges.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VhLmpzIl0sIm5hbWVzIjpbIm9wZW4iLCJwYXRoIiwicHJvY2VzcyIsImN3ZCIsImdpdCIsIlJlcG9zaXRvcnkiLCJpbml0IiwicmVwbyIsInJlZnJlc2hJbmRleCIsImluZGV4Iiwic2lnbmF0dXJlIiwiU2lnbmF0dXJlIiwiZGVmYXVsdCIsIndyaXRlVHJlZSIsInRyZWUiLCJjcmVhdGVDb21taXQiLCJpc1JlcG8iLCJicmFuY2hFeGlzdHMiLCJuYW1lIiwiQnJhbmNoIiwibG9va3VwIiwiQlJBTkNIIiwiTE9DQUwiLCJjaGFuZ2VkRmlsZXMiLCJzdGF0dXNPcHRpb25zIiwiZmxhZ3MiLCJTdGF0dXMiLCJPUFQiLCJJTkNMVURFX1VOVFJBQ0tFRCIsIlJFQ1VSU0VfVU5UUkFDS0VEX0RJUlMiLCJjaGFuZ2VzIiwibmV3IiwibW9kaWZpZWQiLCJkZWxldGVkIiwiZm9yZWFjaEV4dCIsInN0YXR1cyIsIlNUQVRVUyIsIldUX05FVyIsInB1c2giLCJXVF9NT0RJRklFRCIsIldUX0RFTEVURUQiLCJjaGVja291dEJyYW5jaCIsImNoZWNrb3V0T3B0aW9ucyIsIkNoZWNrb3V0T3B0aW9ucyIsImNoZWNrb3V0U3RyYXRlZ3kiLCJDaGVja291dCIsIlNUUkFURUdZIiwiU0FGRSIsIlJldnBhcnNlIiwic2luZ2xlIiwidHJlZWlzaCIsInNldEhlYWQiLCJjb21taXRDaGFuZ2VzIiwibXNnIiwiYWRkQWxsIiwid3JpdGUiLCJSZWZlcmVuY2UiLCJuYW1lVG9JZCIsImhlYWQiLCJnZXRDb21taXQiLCJwYXJlbnQiLCJjcmVhdGVCcmFuY2giLCJnZXRNYXN0ZXJDb21taXQiLCJtYXN0ZXJDb21taXQiLCJjdXJyZW50QnJhbmNoTmFtZSIsImdldEN1cnJlbnRCcmFuY2giLCJzaG9ydGhhbmQiLCJvbkJyYW5jaCIsInB1bGxSZW1vdGUiLCJmZXRjaCIsImNhbGxiYWNrcyIsImNyZWRlbnRpYWxzIiwidXJsIiwidXNlcm5hbWUiLCJDcmVkIiwic3NoS2V5RnJvbUFnZW50IiwiY2VydGlmaWNhdGVDaGVjayIsIm1lcmdlQnJhbmNoZXMiLCJNZXJnZSIsIlBSRUZFUkVOQ0UiLCJGQVNURk9SV0FSRF9PTkxZIiwiZmlsZUZhdm9yIiwiRklMRV9GQVZPUiIsIlRIRUlSUyIsImNvbnNvbGUiLCJsb2ciLCJwdXNoUmVtb3RlIiwicmVmIiwicmVmcyIsIlJlbW90ZSIsInJlbW90ZSIsInJlbW90ZUV4aXN0cyIsInJlbW90ZUJyYW5jaEV4aXN0cyIsImNvbm5lY3QiLCJFbnVtcyIsIkRJUkVDVElPTiIsIkZFVENIIiwicHVzaFRyYW5zZmVyUHJvZ3Jlc3MiLCJyZWZlcmVuY2VMaXN0IiwicmVmZXJlbmNlcyIsImRpc2Nvbm5lY3QiLCJfIiwic29tZSIsInJlZmVyZW5jZSIsIndvcmtpbmdEaXJlY3RvcnlDbGVhbiIsImNudCIsInN0YXNoTmFtZSIsInN0YXNoQ2hhbmdlcyIsIlN0YXNoIiwiZGVmYXVsdFNpZ25hdHVyZSIsIkZMQUdTIiwic2F2ZSIsInVuc3Rhc2hDaGFuZ2VzIiwic3Rhc2hlcyIsImZvcmVhY2giLCJtZXNzYWdlIiwib2lkIiwic3Rhc2giLCJmaW5kIiwicyIsImluY2x1ZGVzIiwic3Rhc2hBcHBseU9wdGlvbnMiLCJTdGFzaEFwcGx5T3B0aW9ucyIsImFwcGx5IiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7U0FFc0JBLEk7Ozs7Ozs7MEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0JDLFlBQUFBLElBQXBCLDJEQUEyQkMsT0FBTyxDQUFDQyxHQUFSLEVBQTNCO0FBQUEsNkNBQ0VDLGlCQUFJQyxVQUFKLENBQWVMLElBQWYsQ0FBb0JDLElBQXBCLENBREY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUllSyxJOzs7Ozs7OzBCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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QUxBLEtBQUY7QUFBUzBHLDBCQUFBQSxPQUFPLEVBQVBBLE9BQVQ7QUFBa0JDLDBCQUFBQSxHQUFHLEVBQUhBO0FBQWxCLHlCQUFiOztBQUQ0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFGRDs7QUFBQTtBQU1DQyxZQUFBQSxLQU5ELEdBTVNKLE9BQU8sQ0FBQ0ssSUFBUixDQUFhLFVBQUFDLENBQUM7QUFBQSxxQkFBSUEsQ0FBQyxDQUFDSixPQUFGLENBQVVLLFFBQVYsQ0FBbUJkLFNBQVMsQ0FBQ3hGLElBQUQsQ0FBNUIsQ0FBSjtBQUFBLGFBQWQsQ0FOVDs7QUFBQSxnQkFRQW1HLEtBUkE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFVQzNFLFlBQUFBLGVBVkQsR0FVbUIsSUFBSXRDLGlCQUFJdUMsZUFBUixFQVZuQjtBQVdMRCxZQUFBQSxlQUFlLENBQUNFLGdCQUFoQixHQUFtQ3hDLGlCQUFJeUMsUUFBSixDQUFhQyxRQUFiLENBQXNCQyxJQUF6RDtBQUVNMEUsWUFBQUEsaUJBYkQsR0FhcUIsSUFBSXJILGlCQUFJc0gsaUJBQVIsRUFickI7QUFjTEQsWUFBQUEsaUJBQWlCLENBQUMvRSxlQUFsQixHQUFvQ0EsZUFBcEM7QUFkSztBQUFBLG1CQWdCQ3RDLGlCQUFJd0csS0FBSixDQUFVZSxLQUFWLENBQWdCcEgsSUFBaEIsRUFBc0I4RyxLQUFLLENBQUM1RyxLQUE1QixFQUFtQ2dILGlCQUFuQyxDQWhCRDs7QUFBQTtBQUFBO0FBQUEsbUJBaUJDckgsaUJBQUl3RyxLQUFKLENBQVVnQixJQUFWLENBQWVySCxJQUFmLEVBQXFCOEcsS0FBSyxDQUFDNUcsS0FBM0IsQ0FqQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCBnaXQgZnJvbSAnbm9kZWdpdCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG9yYSBmcm9tICdvcmEnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3BlbihwYXRoID0gcHJvY2Vzcy5jd2QoKSkge1xuICByZXR1cm4gZ2l0LlJlcG9zaXRvcnkub3BlbihwYXRoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQocGF0aCA9IHByb2Nlc3MuY3dkKCkpIHtcbiAgY29uc3QgcmVwbyA9IGF3YWl0IGdpdC5SZXBvc2l0b3J5LmluaXQocGF0aCwgMCk7XG5cbiAgY29uc3QgaW5kZXggPSBhd2FpdCByZXBvLnJlZnJlc2hJbmRleCgpO1xuICBjb25zdCBzaWduYXR1cmUgPSBnaXQuU2lnbmF0dXJlLmRlZmF1bHQocmVwbyk7XG4gIGNvbnN0IHRyZWUgPSBhd2FpdCBpbmRleC53cml0ZVRyZWUoKTtcbiAgcmV0dXJuIHJlcG8uY3JlYXRlQ29tbWl0KFxuICAgICdIRUFEJyxcbiAgICBzaWduYXR1cmUsXG4gICAgc2lnbmF0dXJlLFxuICAgICdJbml0aWFsIGNvbW1pdCcsXG4gICAgdHJlZSxcbiAgICBbXVxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaXNSZXBvKHBhdGggPSBwcm9jZXNzLmN3ZCgpKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgb3BlbihwYXRoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBicmFuY2hFeGlzdHMocmVwbywgbmFtZSkge1xuICB0cnkge1xuICAgIGF3YWl0IGdpdC5CcmFuY2gubG9va3VwKHJlcG8sIG5hbWUsIGdpdC5CcmFuY2guQlJBTkNILkxPQ0FMKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGFuZ2VkRmlsZXMocmVwbykge1xuICBjb25zdCBzdGF0dXNPcHRpb25zID0ge1xuICAgIGZsYWdzOlxuICAgICAgZ2l0LlN0YXR1cy5PUFQuSU5DTFVERV9VTlRSQUNLRUQgKyBnaXQuU3RhdHVzLk9QVC5SRUNVUlNFX1VOVFJBQ0tFRF9ESVJTXG4gIH07XG5cbiAgY29uc3QgY2hhbmdlcyA9IHtcbiAgICBuZXc6IFtdLFxuICAgIG1vZGlmaWVkOiBbXSxcbiAgICBkZWxldGVkOiBbXVxuICB9O1xuXG4gIGF3YWl0IGdpdC5TdGF0dXMuZm9yZWFjaEV4dChyZXBvLCBzdGF0dXNPcHRpb25zLCAocGF0aCwgc3RhdHVzKSA9PiB7XG4gICAgaWYgKHN0YXR1cyA9PT0gZ2l0LlN0YXR1cy5TVEFUVVMuV1RfTkVXKSBjaGFuZ2VzLm5ldy5wdXNoKHBhdGgpO1xuICAgIGVsc2UgaWYgKHN0YXR1cyA9PT0gZ2l0LlN0YXR1cy5TVEFUVVMuV1RfTU9ESUZJRUQpXG4gICAgICBjaGFuZ2VzLm1vZGlmaWVkLnB1c2gocGF0aCk7XG4gICAgZWxzZSBpZiAoc3RhdHVzID09PSBnaXQuU3RhdHVzLlNUQVRVUy5XVF9ERUxFVEVEKVxuICAgICAgY2hhbmdlcy5kZWxldGVkLnB1c2gocGF0aCk7XG4gIH0pO1xuXG4gIHJldHVybiBjaGFuZ2VzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tvdXRCcmFuY2gocmVwbywgbmFtZSkge1xuICBjb25zdCBjaGVja291dE9wdGlvbnMgPSBuZXcgZ2l0LkNoZWNrb3V0T3B0aW9ucygpO1xuICBjaGVja291dE9wdGlvbnMuY2hlY2tvdXRTdHJhdGVneSA9IGdpdC5DaGVja291dC5TVFJBVEVHWS5TQUZFO1xuXG4gIGNvbnN0IHRyZWVpc2ggPSBhd2FpdCBnaXQuUmV2cGFyc2Uuc2luZ2xlKHJlcG8sIG5hbWUpO1xuICBhd2FpdCBnaXQuQ2hlY2tvdXQudHJlZShyZXBvLCB0cmVlaXNoLCBjaGVja291dE9wdGlvbnMpO1xuICBhd2FpdCByZXBvLnNldEhlYWQoYHJlZnMvaGVhZHMvJHtuYW1lfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tbWl0Q2hhbmdlcyhyZXBvLCBtc2cpIHtcbiAgY29uc3QgaW5kZXggPSBhd2FpdCByZXBvLnJlZnJlc2hJbmRleCgpO1xuICBhd2FpdCBpbmRleC5hZGRBbGwoKTtcbiAgYXdhaXQgaW5kZXgud3JpdGUoKTtcbiAgY29uc3QgdHJlZSA9IGF3YWl0IGluZGV4LndyaXRlVHJlZSgpO1xuICBjb25zdCBoZWFkID0gYXdhaXQgZ2l0LlJlZmVyZW5jZS5uYW1lVG9JZChyZXBvLCAnSEVBRCcpO1xuICBjb25zdCBwYXJlbnQgPSBhd2FpdCByZXBvLmdldENvbW1pdChoZWFkKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gZ2l0LlNpZ25hdHVyZS5kZWZhdWx0KHJlcG8pO1xuICByZXR1cm4gcmVwby5jcmVhdGVDb21taXQoJ0hFQUQnLCBzaWduYXR1cmUsIHNpZ25hdHVyZSwgbXNnLCB0cmVlLCBbcGFyZW50XSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVCcmFuY2gocmVwbywgbmFtZSkge1xuICBjb25zdCBtYXN0ZXJDb21taXQgPSBhd2FpdCByZXBvLmdldE1hc3RlckNvbW1pdCgpO1xuICBhd2FpdCByZXBvLmNyZWF0ZUJyYW5jaChuYW1lLCBtYXN0ZXJDb21taXQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3VycmVudEJyYW5jaE5hbWUocmVwbykge1xuICByZXR1cm4gKGF3YWl0IHJlcG8uZ2V0Q3VycmVudEJyYW5jaCgpKS5zaG9ydGhhbmQoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9uQnJhbmNoKHJlcG8sIG5hbWUpIHtcbiAgcmV0dXJuIChhd2FpdCBjdXJyZW50QnJhbmNoTmFtZShyZXBvKSkgPT09IG5hbWU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwdWxsUmVtb3RlKHJlcG8sIG5hbWUpIHtcbiAgYXdhaXQgcmVwby5mZXRjaCgnb3JpZ2luJywge1xuICAgIGNhbGxiYWNrczoge1xuICAgICAgY3JlZGVudGlhbHM6ICh1cmwsIHVzZXJuYW1lKSA9PiBnaXQuQ3JlZC5zc2hLZXlGcm9tQWdlbnQodXNlcm5hbWUpLFxuICAgICAgY2VydGlmaWNhdGVDaGVjazogKCkgPT4gMS8vLFxuICAgICAgLy90cmFuc2ZlclByb2dyZXNzOiAoKSA9PiBjb25zb2xlLmxvZygnLicpXG4gICAgfVxuICB9KTtcblxuICB0cnkge1xuICAgIGF3YWl0IHJlcG8ubWVyZ2VCcmFuY2hlcyhcbiAgICAgIG5hbWUsXG4gICAgICBgb3JpZ2luLyR7bmFtZX1gLFxuICAgICAgZ2l0Lk1lcmdlLlBSRUZFUkVOQ0UuRkFTVEZPUldBUkRfT05MWSxcbiAgICAgIHtcbiAgICAgICAgZmlsZUZhdm9yOiBnaXQuTWVyZ2UuRklMRV9GQVZPUi5USEVJUlNcbiAgICAgIH1cbiAgICApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIGNvbnNvbGUubG9nKGBVbmFibGUgdG8gZmFzdC1mb3J3YXJkICR7bmFtZX0sIGJyYW5jaGVzIGhhdmUgZGl2ZXJnZWRgKTtcbiAgICBjb25zb2xlLmxvZygnWW91IG1pZ2h0IGNvbnNpZGVyOicpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCAgICBzZWEgYnJhbmNoIHN3aXRjaCAke25hbWV9ICYmIGdpdCByZXNldCAtLWhhcmQgb3JpZ2luLyR7bmFtZX1gXG4gICAgKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHB1c2hSZW1vdGUocmVwbywgbmFtZSkge1xuICBjb25zdCByZWYgPSBgcmVmcy9oZWFkcy8ke25hbWV9YDtcbiAgY29uc3QgcmVmcyA9IFtgJHtyZWZ9OiR7cmVmfWBdO1xuXG4gIGNvbnN0IHJlbW90ZSA9IGF3YWl0IGdpdC5SZW1vdGUubG9va3VwKHJlcG8sICdvcmlnaW4nKTtcblxuICBhd2FpdCByZW1vdGUucHVzaChyZWZzLCB7XG4gICAgY2FsbGJhY2tzOiB7XG4gICAgICBjcmVkZW50aWFsczogKHVybCwgdXNlcm5hbWUpID0+IGdpdC5DcmVkLnNzaEtleUZyb21BZ2VudCh1c2VybmFtZSksXG4gICAgICBjZXJ0aWZpY2F0ZUNoZWNrOiAoKSA9PiAxLy8sXG4gICAgICAvL3B1c2hUcmFuc2ZlclByb2dyZXNzOiAoKSA9PiBjb25zb2xlLmxvZygnLicpXG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW90ZUV4aXN0cyhyZXBvKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgZ2l0LlJlbW90ZS5sb29rdXAocmVwbywgJ29yaWdpbicpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW90ZUJyYW5jaEV4aXN0cyhyZXBvLCBuYW1lKSB7XG4gIGNvbnN0IHJlbW90ZSA9IGF3YWl0IGdpdC5SZW1vdGUubG9va3VwKHJlcG8sICdvcmlnaW4nKTtcblxuICBhd2FpdCByZW1vdGUuY29ubmVjdChcbiAgICBnaXQuRW51bXMuRElSRUNUSU9OLkZFVENILFxuICAgIHtcbiAgICAgIGNyZWRlbnRpYWxzOiAodXJsLCB1c2VybmFtZSkgPT4gZ2l0LkNyZWQuc3NoS2V5RnJvbUFnZW50KHVzZXJuYW1lKSxcbiAgICAgIGNlcnRpZmljYXRlQ2hlY2s6ICgpID0+IDEsXG4gICAgICBwdXNoVHJhbnNmZXJQcm9ncmVzczogKCkgPT4gY29uc29sZS5sb2coJy4nKVxuICAgIH1cbiAgKTtcblxuICBjb25zdCByZWZlcmVuY2VzID0gYXdhaXQgcmVtb3RlLnJlZmVyZW5jZUxpc3QoKTtcblxuICBhd2FpdCByZW1vdGUuZGlzY29ubmVjdCgpO1xuXG4gIHJldHVybiBfLnNvbWUoXG4gICAgcmVmZXJlbmNlcyxcbiAgICByZWZlcmVuY2UgPT4gcmVmZXJlbmNlLm5hbWUoKSA9PT0gYHJlZnMvaGVhZHMvJHtuYW1lfWBcbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdvcmtpbmdEaXJlY3RvcnlDbGVhbihyZXBvKSB7XG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB7XG4gICAgZmxhZ3M6XG4gICAgICBnaXQuU3RhdHVzLk9QVC5JTkNMVURFX1VOVFJBQ0tFRCArIGdpdC5TdGF0dXMuT1BULlJFQ1VSU0VfVU5UUkFDS0VEX0RJUlNcbiAgfTtcblxuICBsZXQgY250ID0gMDtcbiAgYXdhaXQgZ2l0LlN0YXR1cy5mb3JlYWNoRXh0KHJlcG8sIHN0YXR1c09wdGlvbnMsICgpID0+IHtcbiAgICBjbnQgKz0gMTtcbiAgfSk7XG4gIHJldHVybiBjbnQgPT09IDA7XG59XG5cbmZ1bmN0aW9uIHN0YXNoTmFtZShuYW1lKSB7XG4gIHJldHVybiBgU2VhIGF1dG9zdGFzaCBmb3IgJHtuYW1lfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFzaENoYW5nZXMocmVwbykge1xuICBpZiAoYXdhaXQgd29ya2luZ0RpcmVjdG9yeUNsZWFuKHJlcG8pKSByZXR1cm47XG5cbiAgYXdhaXQgZ2l0LlN0YXNoLnNhdmUoXG4gICAgcmVwbyxcbiAgICByZXBvLmRlZmF1bHRTaWduYXR1cmUoKSxcbiAgICBzdGFzaE5hbWUoYXdhaXQgY3VycmVudEJyYW5jaE5hbWUocmVwbykpLFxuICAgIGdpdC5TdGFzaC5GTEFHUy5JTkNMVURFX1VOVFJBQ0tFRFxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdW5zdGFzaENoYW5nZXMocmVwbywgbmFtZSkge1xuICBjb25zdCBzdGFzaGVzID0gW107XG4gIGF3YWl0IGdpdC5TdGFzaC5mb3JlYWNoKHJlcG8sIGFzeW5jIChpbmRleCwgbWVzc2FnZSwgb2lkKSA9PiB7XG4gICAgc3Rhc2hlcy5wdXNoKHsgaW5kZXgsIG1lc3NhZ2UsIG9pZCB9KTtcbiAgfSk7XG5cbiAgY29uc3Qgc3Rhc2ggPSBzdGFzaGVzLmZpbmQocyA9PiBzLm1lc3NhZ2UuaW5jbHVkZXMoc3Rhc2hOYW1lKG5hbWUpKSk7XG5cbiAgaWYgKCFzdGFzaCkgcmV0dXJuO1xuXG4gIGNvbnN0IGNoZWNrb3V0T3B0aW9ucyA9IG5ldyBnaXQuQ2hlY2tvdXRPcHRpb25zKCk7XG4gIGNoZWNrb3V0T3B0aW9ucy5jaGVja291dFN0cmF0ZWd5ID0gZ2l0LkNoZWNrb3V0LlNUUkFURUdZLlNBRkU7XG5cbiAgY29uc3Qgc3Rhc2hBcHBseU9wdGlvbnMgPSBuZXcgZ2l0LlN0YXNoQXBwbHlPcHRpb25zKCk7XG4gIHN0YXNoQXBwbHlPcHRpb25zLmNoZWNrb3V0T3B0aW9ucyA9IGNoZWNrb3V0T3B0aW9ucztcblxuICBhd2FpdCBnaXQuU3Rhc2guYXBwbHkocmVwbywgc3Rhc2guaW5kZXgsIHN0YXNoQXBwbHlPcHRpb25zKTtcbiAgYXdhaXQgZ2l0LlN0YXNoLmRyb3AocmVwbywgc3Rhc2guaW5kZXgpO1xufVxuIl19