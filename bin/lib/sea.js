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
                },
                transferProgress: function transferProgress() {
                  return console.log('.');
                }
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
                },
                pushTransferProgress: function pushTransferProgress() {
                  return console.log('.');
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VhLmpzIl0sIm5hbWVzIjpbIm9wZW4iLCJwYXRoIiwicHJvY2VzcyIsImN3ZCIsImdpdCIsIlJlcG9zaXRvcnkiLCJpbml0IiwicmVwbyIsInJlZnJlc2hJbmRleCIsImluZGV4Iiwic2lnbmF0dXJlIiwiU2lnbmF0dXJlIiwiZGVmYXVsdCIsIndyaXRlVHJlZSIsInRyZWUiLCJjcmVhdGVDb21taXQiLCJpc1JlcG8iLCJicmFuY2hFeGlzdHMiLCJuYW1lIiwiQnJhbmNoIiwibG9va3VwIiwiQlJBTkNIIiwiTE9DQUwiLCJjaGFuZ2VkRmlsZXMiLCJzdGF0dXNPcHRpb25zIiwiZmxhZ3MiLCJTdGF0dXMiLCJPUFQiLCJJTkNMVURFX1VOVFJBQ0tFRCIsIlJFQ1VSU0VfVU5UUkFDS0VEX0RJUlMiLCJjaGFuZ2VzIiwibmV3IiwibW9kaWZpZWQiLCJkZWxldGVkIiwiZm9yZWFjaEV4dCIsInN0YXR1cyIsIlNUQVRVUyIsIldUX05FVyIsInB1c2giLCJXVF9NT0RJRklFRCIsIldUX0RFTEVURUQiLCJjaGVja291dEJyYW5jaCIsImNoZWNrb3V0T3B0aW9ucyIsIkNoZWNrb3V0T3B0aW9ucyIsImNoZWNrb3V0U3RyYXRlZ3kiLCJDaGVja291dCIsIlNUUkFURUdZIiwiU0FGRSIsIlJldnBhcnNlIiwic2luZ2xlIiwidHJlZWlzaCIsInNldEhlYWQiLCJjb21taXRDaGFuZ2VzIiwibXNnIiwiYWRkQWxsIiwid3JpdGUiLCJSZWZlcmVuY2UiLCJuYW1lVG9JZCIsImhlYWQiLCJnZXRDb21taXQiLCJwYXJlbnQiLCJjcmVhdGVCcmFuY2giLCJnZXRNYXN0ZXJDb21taXQiLCJtYXN0ZXJDb21taXQiLCJjdXJyZW50QnJhbmNoTmFtZSIsImdldEN1cnJlbnRCcmFuY2giLCJzaG9ydGhhbmQiLCJvbkJyYW5jaCIsInB1bGxSZW1vdGUiLCJmZXRjaCIsImNhbGxiYWNrcyIsImNyZWRlbnRpYWxzIiwidXJsIiwidXNlcm5hbWUiLCJDcmVkIiwic3NoS2V5RnJvbUFnZW50IiwiY2VydGlmaWNhdGVDaGVjayIsInRyYW5zZmVyUHJvZ3Jlc3MiLCJjb25zb2xlIiwibG9nIiwibWVyZ2VCcmFuY2hlcyIsIk1lcmdlIiwiUFJFRkVSRU5DRSIsIkZBU1RGT1JXQVJEX09OTFkiLCJmaWxlRmF2b3IiLCJGSUxFX0ZBVk9SIiwiVEhFSVJTIiwicHVzaFJlbW90ZSIsInJlZiIsInJlZnMiLCJSZW1vdGUiLCJyZW1vdGUiLCJwdXNoVHJhbnNmZXJQcm9ncmVzcyIsInJlbW90ZUV4aXN0cyIsInJlbW90ZUJyYW5jaEV4aXN0cyIsImNvbm5lY3QiLCJFbnVtcyIsIkRJUkVDVElPTiIsIkZFVENIIiwicmVmZXJlbmNlTGlzdCIsInJlZmVyZW5jZXMiLCJkaXNjb25uZWN0IiwiXyIsInNvbWUiLCJyZWZlcmVuY2UiLCJ3b3JraW5nRGlyZWN0b3J5Q2xlYW4iLCJjbnQiLCJzdGFzaE5hbWUiLCJzdGFzaENoYW5nZXMiLCJTdGFzaCIsImRlZmF1bHRTaWduYXR1cmUiLCJGTEFHUyIsInNhdmUiLCJ1bnN0YXNoQ2hhbmdlcyIsInN0YXNoZXMiLCJmb3JlYWNoIiwibWVzc2FnZSIsIm9pZCIsInN0YXNoIiwiZmluZCIsInMiLCJpbmNsdWRlcyIsInN0YXNoQXBwbHlPcHRpb25zIiwiU3Rhc2hBcHBseU9wdGlvbnMiLCJhcHBseSIsImRyb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O1NBRXNCQSxJOzs7Ozs7OzBCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW9CQyxZQUFBQSxJQUFwQiwyREFBMkJDLE9BQU8sQ0FBQ0MsR0FBUixFQUEzQjtBQUFBLDZDQUNFQyxpQkFBSUMsVUFBSixDQUFlTCxJQUFmLENBQW9CQyxJQUFwQixDQURGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FJZUssSTs7Ozs7OzswQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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QTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0IGdpdCBmcm9tICdub2RlZ2l0JztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuKHBhdGggPSBwcm9jZXNzLmN3ZCgpKSB7XG4gIHJldHVybiBnaXQuUmVwb3NpdG9yeS5vcGVuKHBhdGgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdChwYXRoID0gcHJvY2Vzcy5jd2QoKSkge1xuICBjb25zdCByZXBvID0gYXdhaXQgZ2l0LlJlcG9zaXRvcnkuaW5pdChwYXRoLCAwKTtcblxuICBjb25zdCBpbmRleCA9IGF3YWl0IHJlcG8ucmVmcmVzaEluZGV4KCk7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGdpdC5TaWduYXR1cmUuZGVmYXVsdChyZXBvKTtcbiAgY29uc3QgdHJlZSA9IGF3YWl0IGluZGV4LndyaXRlVHJlZSgpO1xuICByZXR1cm4gcmVwby5jcmVhdGVDb21taXQoXG4gICAgJ0hFQUQnLFxuICAgIHNpZ25hdHVyZSxcbiAgICBzaWduYXR1cmUsXG4gICAgJ0luaXRpYWwgY29tbWl0JyxcbiAgICB0cmVlLFxuICAgIFtdXG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc1JlcG8ocGF0aCA9IHByb2Nlc3MuY3dkKCkpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBvcGVuKHBhdGgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJyYW5jaEV4aXN0cyhyZXBvLCBuYW1lKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgZ2l0LkJyYW5jaC5sb29rdXAocmVwbywgbmFtZSwgZ2l0LkJyYW5jaC5CUkFOQ0guTE9DQUwpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoYW5nZWRGaWxlcyhyZXBvKSB7XG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB7XG4gICAgZmxhZ3M6XG4gICAgICBnaXQuU3RhdHVzLk9QVC5JTkNMVURFX1VOVFJBQ0tFRCArIGdpdC5TdGF0dXMuT1BULlJFQ1VSU0VfVU5UUkFDS0VEX0RJUlNcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VzID0ge1xuICAgIG5ldzogW10sXG4gICAgbW9kaWZpZWQ6IFtdLFxuICAgIGRlbGV0ZWQ6IFtdXG4gIH07XG5cbiAgYXdhaXQgZ2l0LlN0YXR1cy5mb3JlYWNoRXh0KHJlcG8sIHN0YXR1c09wdGlvbnMsIChwYXRoLCBzdGF0dXMpID0+IHtcbiAgICBpZiAoc3RhdHVzID09PSBnaXQuU3RhdHVzLlNUQVRVUy5XVF9ORVcpIGNoYW5nZXMubmV3LnB1c2gocGF0aCk7XG4gICAgZWxzZSBpZiAoc3RhdHVzID09PSBnaXQuU3RhdHVzLlNUQVRVUy5XVF9NT0RJRklFRClcbiAgICAgIGNoYW5nZXMubW9kaWZpZWQucHVzaChwYXRoKTtcbiAgICBlbHNlIGlmIChzdGF0dXMgPT09IGdpdC5TdGF0dXMuU1RBVFVTLldUX0RFTEVURUQpXG4gICAgICBjaGFuZ2VzLmRlbGV0ZWQucHVzaChwYXRoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoYW5nZXM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja291dEJyYW5jaChyZXBvLCBuYW1lKSB7XG4gIGNvbnN0IGNoZWNrb3V0T3B0aW9ucyA9IG5ldyBnaXQuQ2hlY2tvdXRPcHRpb25zKCk7XG4gIGNoZWNrb3V0T3B0aW9ucy5jaGVja291dFN0cmF0ZWd5ID0gZ2l0LkNoZWNrb3V0LlNUUkFURUdZLlNBRkU7XG5cbiAgY29uc3QgdHJlZWlzaCA9IGF3YWl0IGdpdC5SZXZwYXJzZS5zaW5nbGUocmVwbywgbmFtZSk7XG4gIGF3YWl0IGdpdC5DaGVja291dC50cmVlKHJlcG8sIHRyZWVpc2gsIGNoZWNrb3V0T3B0aW9ucyk7XG4gIGF3YWl0IHJlcG8uc2V0SGVhZChgcmVmcy9oZWFkcy8ke25hbWV9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21taXRDaGFuZ2VzKHJlcG8sIG1zZykge1xuICBjb25zdCBpbmRleCA9IGF3YWl0IHJlcG8ucmVmcmVzaEluZGV4KCk7XG4gIGF3YWl0IGluZGV4LmFkZEFsbCgpO1xuICBhd2FpdCBpbmRleC53cml0ZSgpO1xuICBjb25zdCB0cmVlID0gYXdhaXQgaW5kZXgud3JpdGVUcmVlKCk7XG4gIGNvbnN0IGhlYWQgPSBhd2FpdCBnaXQuUmVmZXJlbmNlLm5hbWVUb0lkKHJlcG8sICdIRUFEJyk7XG4gIGNvbnN0IHBhcmVudCA9IGF3YWl0IHJlcG8uZ2V0Q29tbWl0KGhlYWQpO1xuICBjb25zdCBzaWduYXR1cmUgPSBnaXQuU2lnbmF0dXJlLmRlZmF1bHQocmVwbyk7XG4gIHJldHVybiByZXBvLmNyZWF0ZUNvbW1pdCgnSEVBRCcsIHNpZ25hdHVyZSwgc2lnbmF0dXJlLCBtc2csIHRyZWUsIFtwYXJlbnRdKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJyYW5jaChyZXBvLCBuYW1lKSB7XG4gIGNvbnN0IG1hc3RlckNvbW1pdCA9IGF3YWl0IHJlcG8uZ2V0TWFzdGVyQ29tbWl0KCk7XG4gIGF3YWl0IHJlcG8uY3JlYXRlQnJhbmNoKG5hbWUsIG1hc3RlckNvbW1pdCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjdXJyZW50QnJhbmNoTmFtZShyZXBvKSB7XG4gIHJldHVybiAoYXdhaXQgcmVwby5nZXRDdXJyZW50QnJhbmNoKCkpLnNob3J0aGFuZCgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb25CcmFuY2gocmVwbywgbmFtZSkge1xuICByZXR1cm4gKGF3YWl0IGN1cnJlbnRCcmFuY2hOYW1lKHJlcG8pKSA9PT0gbmFtZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHB1bGxSZW1vdGUocmVwbywgbmFtZSkge1xuICBhd2FpdCByZXBvLmZldGNoKCdvcmlnaW4nLCB7XG4gICAgY2FsbGJhY2tzOiB7XG4gICAgICBjcmVkZW50aWFsczogKHVybCwgdXNlcm5hbWUpID0+IGdpdC5DcmVkLnNzaEtleUZyb21BZ2VudCh1c2VybmFtZSksXG4gICAgICBjZXJ0aWZpY2F0ZUNoZWNrOiAoKSA9PiAxLFxuICAgICAgdHJhbnNmZXJQcm9ncmVzczogKCkgPT4gY29uc29sZS5sb2coJy4nKVxuICAgIH1cbiAgfSk7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCByZXBvLm1lcmdlQnJhbmNoZXMoXG4gICAgICBuYW1lLFxuICAgICAgYG9yaWdpbi8ke25hbWV9YCxcbiAgICAgIGdpdC5NZXJnZS5QUkVGRVJFTkNFLkZBU1RGT1JXQVJEX09OTFksXG4gICAgICB7XG4gICAgICAgIGZpbGVGYXZvcjogZ2l0Lk1lcmdlLkZJTEVfRkFWT1IuVEhFSVJTXG4gICAgICB9XG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgICBjb25zb2xlLmxvZyhgVW5hYmxlIHRvIGZhc3QtZm9yd2FyZCAke25hbWV9LCBicmFuY2hlcyBoYXZlIGRpdmVyZ2VkYCk7XG4gICAgY29uc29sZS5sb2coJ1lvdSBtaWdodCBjb25zaWRlcjonKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGAgICAgc2VhIGJyYW5jaCBzd2l0Y2ggJHtuYW1lfSAmJiBnaXQgcmVzZXQgLS1oYXJkIG9yaWdpbi8ke25hbWV9YFxuICAgICk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwdXNoUmVtb3RlKHJlcG8sIG5hbWUpIHtcbiAgY29uc3QgcmVmID0gYHJlZnMvaGVhZHMvJHtuYW1lfWA7XG4gIGNvbnN0IHJlZnMgPSBbYCR7cmVmfToke3JlZn1gXTtcblxuICBjb25zdCByZW1vdGUgPSBhd2FpdCBnaXQuUmVtb3RlLmxvb2t1cChyZXBvLCAnb3JpZ2luJyk7XG5cbiAgYXdhaXQgcmVtb3RlLnB1c2gocmVmcywge1xuICAgIGNhbGxiYWNrczoge1xuICAgICAgY3JlZGVudGlhbHM6ICh1cmwsIHVzZXJuYW1lKSA9PiBnaXQuQ3JlZC5zc2hLZXlGcm9tQWdlbnQodXNlcm5hbWUpLFxuICAgICAgY2VydGlmaWNhdGVDaGVjazogKCkgPT4gMSxcbiAgICAgIHB1c2hUcmFuc2ZlclByb2dyZXNzOiAoKSA9PiBjb25zb2xlLmxvZygnLicpXG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW90ZUV4aXN0cyhyZXBvKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgZ2l0LlJlbW90ZS5sb29rdXAocmVwbywgJ29yaWdpbicpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW90ZUJyYW5jaEV4aXN0cyhyZXBvLCBuYW1lKSB7XG4gIGNvbnN0IHJlbW90ZSA9IGF3YWl0IGdpdC5SZW1vdGUubG9va3VwKHJlcG8sICdvcmlnaW4nKTtcblxuICBhd2FpdCByZW1vdGUuY29ubmVjdChcbiAgICBnaXQuRW51bXMuRElSRUNUSU9OLkZFVENILFxuICAgIHtcbiAgICAgIGNyZWRlbnRpYWxzOiAodXJsLCB1c2VybmFtZSkgPT4gZ2l0LkNyZWQuc3NoS2V5RnJvbUFnZW50KHVzZXJuYW1lKSxcbiAgICAgIGNlcnRpZmljYXRlQ2hlY2s6ICgpID0+IDEsXG4gICAgICBwdXNoVHJhbnNmZXJQcm9ncmVzczogKCkgPT4gY29uc29sZS5sb2coJy4nKVxuICAgIH1cbiAgKTtcblxuICBjb25zdCByZWZlcmVuY2VzID0gYXdhaXQgcmVtb3RlLnJlZmVyZW5jZUxpc3QoKTtcblxuICBhd2FpdCByZW1vdGUuZGlzY29ubmVjdCgpO1xuXG4gIHJldHVybiBfLnNvbWUoXG4gICAgcmVmZXJlbmNlcyxcbiAgICByZWZlcmVuY2UgPT4gcmVmZXJlbmNlLm5hbWUoKSA9PT0gYHJlZnMvaGVhZHMvJHtuYW1lfWBcbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdvcmtpbmdEaXJlY3RvcnlDbGVhbihyZXBvKSB7XG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB7XG4gICAgZmxhZ3M6XG4gICAgICBnaXQuU3RhdHVzLk9QVC5JTkNMVURFX1VOVFJBQ0tFRCArIGdpdC5TdGF0dXMuT1BULlJFQ1VSU0VfVU5UUkFDS0VEX0RJUlNcbiAgfTtcblxuICBsZXQgY250ID0gMDtcbiAgYXdhaXQgZ2l0LlN0YXR1cy5mb3JlYWNoRXh0KHJlcG8sIHN0YXR1c09wdGlvbnMsICgpID0+IHtcbiAgICBjbnQgKz0gMTtcbiAgfSk7XG4gIHJldHVybiBjbnQgPT09IDA7XG59XG5cbmZ1bmN0aW9uIHN0YXNoTmFtZShuYW1lKSB7XG4gIHJldHVybiBgU2VhIGF1dG9zdGFzaCBmb3IgJHtuYW1lfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFzaENoYW5nZXMocmVwbykge1xuICBpZiAoYXdhaXQgd29ya2luZ0RpcmVjdG9yeUNsZWFuKHJlcG8pKSByZXR1cm47XG5cbiAgYXdhaXQgZ2l0LlN0YXNoLnNhdmUoXG4gICAgcmVwbyxcbiAgICByZXBvLmRlZmF1bHRTaWduYXR1cmUoKSxcbiAgICBzdGFzaE5hbWUoYXdhaXQgY3VycmVudEJyYW5jaE5hbWUocmVwbykpLFxuICAgIGdpdC5TdGFzaC5GTEFHUy5JTkNMVURFX1VOVFJBQ0tFRFxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdW5zdGFzaENoYW5nZXMocmVwbywgbmFtZSkge1xuICBjb25zdCBzdGFzaGVzID0gW107XG4gIGF3YWl0IGdpdC5TdGFzaC5mb3JlYWNoKHJlcG8sIGFzeW5jIChpbmRleCwgbWVzc2FnZSwgb2lkKSA9PiB7XG4gICAgc3Rhc2hlcy5wdXNoKHsgaW5kZXgsIG1lc3NhZ2UsIG9pZCB9KTtcbiAgfSk7XG5cbiAgY29uc3Qgc3Rhc2ggPSBzdGFzaGVzLmZpbmQocyA9PiBzLm1lc3NhZ2UuaW5jbHVkZXMoc3Rhc2hOYW1lKG5hbWUpKSk7XG5cbiAgaWYgKCFzdGFzaCkgcmV0dXJuO1xuXG4gIGNvbnN0IGNoZWNrb3V0T3B0aW9ucyA9IG5ldyBnaXQuQ2hlY2tvdXRPcHRpb25zKCk7XG4gIGNoZWNrb3V0T3B0aW9ucy5jaGVja291dFN0cmF0ZWd5ID0gZ2l0LkNoZWNrb3V0LlNUUkFURUdZLlNBRkU7XG5cbiAgY29uc3Qgc3Rhc2hBcHBseU9wdGlvbnMgPSBuZXcgZ2l0LlN0YXNoQXBwbHlPcHRpb25zKCk7XG4gIHN0YXNoQXBwbHlPcHRpb25zLmNoZWNrb3V0T3B0aW9ucyA9IGNoZWNrb3V0T3B0aW9ucztcblxuICBhd2FpdCBnaXQuU3Rhc2guYXBwbHkocmVwbywgc3Rhc2guaW5kZXgsIHN0YXNoQXBwbHlPcHRpb25zKTtcbiAgYXdhaXQgZ2l0LlN0YXNoLmRyb3AocmVwbywgc3Rhc2guaW5kZXgpO1xufVxuIl19