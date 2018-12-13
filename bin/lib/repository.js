"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodegit = _interopRequireDefault(require("nodegit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function stashName(name) {
  return "Sea autostash for ".concat(name);
}

var Repository =
/*#__PURE__*/
function () {
  _createClass(Repository, null, [{
    key: "open",
    value: function () {
      var _open = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var path,
            repo,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = _args.length > 0 && _args[0] !== undefined ? _args[0] : process.cwd();
                _context.next = 3;
                return _nodegit.default.Repository.open(path);

              case 3:
                repo = _context.sent;
                return _context.abrupt("return", new Repository(repo));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function open() {
        return _open.apply(this, arguments);
      };
    }()
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
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
                return Repository.open(path);

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
                return _context2.abrupt("return", new Repository(repo));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8]]);
      }));

      return function init() {
        return _init.apply(this, arguments);
      };
    }()
  }]);

  function Repository(repo) {
    _classCallCheck(this, Repository);

    this.repo = repo;
  }

  _createClass(Repository, [{
    key: "branchExists",
    value: function () {
      var _branchExists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(name) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _nodegit.default.Branch.lookup(this.repo, name, _nodegit.default.Branch.BRANCH.LOCAL);

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

      return function branchExists(_x) {
        return _branchExists.apply(this, arguments);
      };
    }()
  }, {
    key: "changedFiles",
    value: function () {
      var _changedFiles = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
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
                return _nodegit.default.Status.foreachExt(this.repo, statusOptions, function (path, status) {
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

      return function changedFiles() {
        return _changedFiles.apply(this, arguments);
      };
    }()
  }, {
    key: "checkoutBranch",
    value: function () {
      var _checkoutBranch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(name) {
        var checkoutOptions, treeish;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                checkoutOptions = new _nodegit.default.CheckoutOptions();
                checkoutOptions.checkoutStrategy = _nodegit.default.Checkout.STRATEGY.SAFE;
                _context5.next = 4;
                return _nodegit.default.Revparse.single(this.repo, name);

              case 4:
                treeish = _context5.sent;
                _context5.next = 7;
                return _nodegit.default.Checkout.tree(this.repo, treeish, checkoutOptions);

              case 7:
                _context5.next = 9;
                return this.repo.setHead("refs/heads/".concat(name));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function checkoutBranch(_x2) {
        return _checkoutBranch.apply(this, arguments);
      };
    }()
  }, {
    key: "createBranch",
    value: function () {
      var _createBranch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(name) {
        var masterCommit;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.repo.getMasterCommit();

              case 2:
                masterCommit = _context6.sent;
                _context6.next = 5;
                return this.repo.createBranch(name, masterCommit);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function createBranch(_x3) {
        return _createBranch.apply(this, arguments);
      };
    }()
  }, {
    key: "currentBranchName",
    value: function () {
      var _currentBranchName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.repo.getCurrentBranch();

              case 2:
                return _context7.abrupt("return", _context7.sent.shorthand());

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function currentBranchName() {
        return _currentBranchName.apply(this, arguments);
      };
    }()
  }, {
    key: "onBranch",
    value: function () {
      var _onBranch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(name) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.currentBranchName(this.repo);

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

      return function onBranch(_x4) {
        return _onBranch.apply(this, arguments);
      };
    }()
  }, {
    key: "pullRemote",
    value: function () {
      var _pullRemote = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(name) {
        var mergeOptions;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.repo.fetch('origin', {
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
                return this.repo.mergeBranches(name, "origin/".concat(name), _nodegit.default.Merge.PREFERENCE.FASTFORWARD_ONLY, mergeOptions);

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

      return function pullRemote(_x5) {
        return _pullRemote.apply(this, arguments);
      };
    }()
  }, {
    key: "stashChanges",
    value: function () {
      var _stashChanges = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.workingDirectoryClean();

              case 2:
                if (!_context10.sent) {
                  _context10.next = 4;
                  break;
                }

                return _context10.abrupt("return");

              case 4:
                _context10.t0 = _nodegit.default.Stash;
                _context10.t1 = this.repo;
                _context10.t2 = this.repo.defaultSignature();
                _context10.t3 = stashName;
                _context10.next = 10;
                return this.currentBranchName();

              case 10:
                _context10.t4 = _context10.sent;
                _context10.t5 = (0, _context10.t3)(_context10.t4);
                _context10.t6 = _nodegit.default.Stash.FLAGS.INCLUDE_UNTRACKED;
                _context10.next = 15;
                return _context10.t0.save.call(_context10.t0, _context10.t1, _context10.t2, _context10.t5, _context10.t6);

              case 15:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function stashChanges() {
        return _stashChanges.apply(this, arguments);
      };
    }()
  }, {
    key: "unstashChanges",
    value: function () {
      var _unstashChanges = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(name) {
        var stashes, stash, checkoutOptions, stashApplyOptions;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                stashes = [];
                _context12.next = 3;
                return _nodegit.default.Stash.foreach(this.repo,
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee11(index, message, oid) {
                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            stashes.push({
                              index: index,
                              message: message,
                              oid: oid
                            });

                          case 1:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee11, this);
                  }));

                  return function (_x7, _x8, _x9) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 3:
                stash = stashes.find(function (x) {
                  return x.message.includes(stashName(name));
                });

                if (stash) {
                  _context12.next = 6;
                  break;
                }

                return _context12.abrupt("return");

              case 6:
                checkoutOptions = new _nodegit.default.CheckoutOptions();
                checkoutOptions.checkoutStrategy = _nodegit.default.Checkout.STRATEGY.SAFE;
                stashApplyOptions = new _nodegit.default.StashApplyOptions();
                stashApplyOptions.checkoutOptions = checkoutOptions;
                _context12.next = 12;
                return _nodegit.default.Stash.apply(this.repo, stash.index, stashApplyOptions);

              case 12:
                _context12.next = 14;
                return _nodegit.default.Stash.drop(this.repo, stash.index);

              case 14:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function unstashChanges(_x6) {
        return _unstashChanges.apply(this, arguments);
      };
    }() // Private

  }, {
    key: "workingDirectoryClean",
    value: function () {
      var _workingDirectoryClean = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13() {
        var statusOptions, cnt;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                statusOptions = {
                  flags: _nodegit.default.Status.OPT.INCLUDE_UNTRACKED + _nodegit.default.Status.OPT.RECURSE_UNTRACKED_DIRS
                };
                cnt = 0;
                _context13.next = 4;
                return _nodegit.default.Status.foreachExt(this.repo, statusOptions, function () {
                  cnt += 1;
                });

              case 4:
                return _context13.abrupt("return", cnt === 0);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function workingDirectoryClean() {
        return _workingDirectoryClean.apply(this, arguments);
      };
    }()
  }]);

  return Repository;
}();

exports.default = Repository;