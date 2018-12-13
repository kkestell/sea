"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.open = open;
exports.init = init;
exports.branchExists = branchExists;
exports.changedFiles = changedFiles;
exports.checkoutBranch = checkoutBranch;
exports.createBranch = createBranch;
exports.currentBranchName = currentBranchName;
exports.onBranch = onBranch;
exports.pullRemote = pullRemote;
exports.workingDirectoryClean = workingDirectoryClean;
exports.stashChanges = stashChanges;
exports.unstashChanges = unstashChanges;

var _nodegit = _interopRequireDefault(require("nodegit"));

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
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            path = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : process.cwd();
            _context2.prev = 1;
            _context2.next = 4;
            return _nodegit.default.Repository.open(path);

          case 4:
            repo = _context2.sent;
            console.log("Reinitialized existing repository in ".concat(path));
            _context2.next = 14;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            _context2.next = 12;
            return _nodegit.default.Repository.init(path, 0);

          case 12:
            repo = _context2.sent;
            console.log("Initialized empty repository in ".concat(path));

          case 14:
            return _context2.abrupt("return", repo);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 8]]);
  }));
  return _init.apply(this, arguments);
}

function branchExists(_x, _x2) {
  return _branchExists.apply(this, arguments);
}

function _branchExists() {
  _branchExists = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(repo, name) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _nodegit.default.Branch.lookup(repo, name, _nodegit.default.Branch.BRANCH.LOCAL);

          case 3:
            return _context3.abrupt("return", true);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", false);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 6]]);
  }));
  return _branchExists.apply(this, arguments);
}

function changedFiles(_x3) {
  return _changedFiles.apply(this, arguments);
}

function _changedFiles() {
  _changedFiles = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(repo) {
    var statusOptions, changes;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            statusOptions = {
              flags: _nodegit.default.Status.OPT.INCLUDE_UNTRACKED + _nodegit.default.Status.OPT.RECURSE_UNTRACKED_DIRS
            };
            changes = {
              new: [],
              modified: [],
              deleted: []
            };
            _context4.next = 4;
            return _nodegit.default.Status.foreachExt(repo, statusOptions, function (path, status) {
              if (status === _nodegit.default.Status.STATUS.WT_NEW) changes.new.push(path);else if (status === _nodegit.default.Status.STATUS.WT_MODIFIED) changes.modified.push(path);else if (status === _nodegit.default.Status.STATUS.WT_DELETED) changes.deleted.push(path);
            });

          case 4:
            return _context4.abrupt("return", changes);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _changedFiles.apply(this, arguments);
}

function checkoutBranch(_x4, _x5) {
  return _checkoutBranch.apply(this, arguments);
}

function _checkoutBranch() {
  _checkoutBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(repo, name) {
    var checkoutOptions, treeish;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            checkoutOptions = new _nodegit.default.CheckoutOptions();
            checkoutOptions.checkoutStrategy = _nodegit.default.Checkout.STRATEGY.SAFE;
            _context5.next = 4;
            return _nodegit.default.Revparse.single(repo, name);

          case 4:
            treeish = _context5.sent;
            _context5.next = 7;
            return _nodegit.default.Checkout.tree(repo, treeish, checkoutOptions);

          case 7:
            _context5.next = 9;
            return repo.setHead("refs/heads/".concat(name));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _checkoutBranch.apply(this, arguments);
}

function createBranch(_x6, _x7) {
  return _createBranch.apply(this, arguments);
}

function _createBranch() {
  _createBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(repo, name) {
    var masterCommit;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return repo.getMasterCommit();

          case 2:
            masterCommit = _context6.sent;
            _context6.next = 5;
            return repo.createBranch(name, masterCommit);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _createBranch.apply(this, arguments);
}

function currentBranchName(_x8) {
  return _currentBranchName.apply(this, arguments);
}

function _currentBranchName() {
  _currentBranchName = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(repo) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return repo.getCurrentBranch();

          case 2:
            return _context7.abrupt("return", _context7.sent.shorthand());

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _currentBranchName.apply(this, arguments);
}

function onBranch(_x9, _x10) {
  return _onBranch.apply(this, arguments);
}

function _onBranch() {
  _onBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(repo, name) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return currentBranchName(repo);

          case 2:
            _context8.t0 = _context8.sent;
            _context8.t1 = name;
            return _context8.abrupt("return", _context8.t0 === _context8.t1);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _onBranch.apply(this, arguments);
}

function pullRemote(_x11, _x12) {
  return _pullRemote.apply(this, arguments);
}

function _pullRemote() {
  _pullRemote = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(repo, name) {
    var mergeOptions;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return repo.fetch('origin', {
              callbacks: {
                credentials: function credentials(url, username) {
                  return _nodegit.default.Cred.sshKeyFromAgent(username);
                },
                certificateCheck: function certificateCheck() {
                  return 1;
                }
              }
            });

          case 2:
            mergeOptions = new _nodegit.default.MergeOptions();
            mergeOptions.fileFavor = _nodegit.default.Merge.FILE_FAVOR.THEIRS;
            _context9.prev = 4;
            _context9.next = 7;
            return repo.mergeBranches(name, "origin/".concat(name), _nodegit.default.Merge.PREFERENCE.FASTFORWARD_ONLY, mergeOptions);

          case 7:
            _context9.next = 15;
            break;

          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](4);
            console.log("Unable to fast-forward ".concat(name, ", branches have diverged"));
            console.log('You might consider:');
            console.log("    sea branch switch ".concat(name, " && git reset --hard origin/").concat(name));
            return _context9.abrupt("return", false);

          case 15:
            return _context9.abrupt("return", true);

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this, [[4, 9]]);
  }));
  return _pullRemote.apply(this, arguments);
}

function workingDirectoryClean(_x13) {
  return _workingDirectoryClean.apply(this, arguments);
}

function _workingDirectoryClean() {
  _workingDirectoryClean = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(repo) {
    var statusOptions, cnt;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            statusOptions = {
              flags: _nodegit.default.Status.OPT.INCLUDE_UNTRACKED + _nodegit.default.Status.OPT.RECURSE_UNTRACKED_DIRS
            };
            cnt = 0;
            _context10.next = 4;
            return _nodegit.default.Status.foreachExt(repo, statusOptions, function () {
              cnt += 1;
            });

          case 4:
            return _context10.abrupt("return", cnt === 0);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));
  return _workingDirectoryClean.apply(this, arguments);
}

function stashName(name) {
  return "Sea autostash for ".concat(name);
}

function stashChanges(_x14) {
  return _stashChanges.apply(this, arguments);
}

function _stashChanges() {
  _stashChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(repo) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return workingDirectoryClean(repo);

          case 2:
            if (!_context11.sent) {
              _context11.next = 4;
              break;
            }

            return _context11.abrupt("return");

          case 4:
            _context11.t0 = _nodegit.default.Stash;
            _context11.t1 = repo;
            _context11.t2 = repo.defaultSignature();
            _context11.t3 = stashName;
            _context11.next = 10;
            return currentBranchName(repo);

          case 10:
            _context11.t4 = _context11.sent;
            _context11.t5 = (0, _context11.t3)(_context11.t4);
            _context11.t6 = _nodegit.default.Stash.FLAGS.INCLUDE_UNTRACKED;
            _context11.next = 15;
            return _context11.t0.save.call(_context11.t0, _context11.t1, _context11.t2, _context11.t5, _context11.t6);

          case 15:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));
  return _stashChanges.apply(this, arguments);
}

function unstashChanges(_x15, _x16) {
  return _unstashChanges.apply(this, arguments);
}

function _unstashChanges() {
  _unstashChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(repo, name) {
    var stashes, stash, checkoutOptions, stashApplyOptions;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            stashes = [];
            _context13.next = 3;
            return _nodegit.default.Stash.foreach(repo,
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee12(index, message, oid) {
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        stashes.push({
                          index: index,
                          message: message,
                          oid: oid
                        });

                      case 1:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12, this);
              }));

              return function (_x17, _x18, _x19) {
                return _ref.apply(this, arguments);
              };
            }());

          case 3:
            stash = stashes.find(function (x) {
              return x.message.includes(stashName(name));
            });

            if (stash) {
              _context13.next = 6;
              break;
            }

            return _context13.abrupt("return");

          case 6:
            checkoutOptions = new _nodegit.default.CheckoutOptions();
            checkoutOptions.checkoutStrategy = _nodegit.default.Checkout.STRATEGY.SAFE;
            stashApplyOptions = new _nodegit.default.StashApplyOptions();
            stashApplyOptions.checkoutOptions = checkoutOptions;
            _context13.next = 12;
            return _nodegit.default.Stash.apply(repo, stash.index, stashApplyOptions);

          case 12:
            _context13.next = 14;
            return _nodegit.default.Stash.drop(repo, stash.index);

          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));
  return _unstashChanges.apply(this, arguments);
}