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
exports.remoteExists = remoteExists;
exports.workingDirectoryClean = workingDirectoryClean;
exports.stashChanges = stashChanges;
exports.unstashChanges = unstashChanges;

require("source-map-support/register");

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
    var mergeOptions;
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
                }
              }
            });

          case 2:
            mergeOptions = new _nodegit.default.MergeOptions();
            mergeOptions.fileFavor = _nodegit.default.Merge.FILE_FAVOR.THEIRS;
            _context11.prev = 4;
            _context11.next = 7;
            return repo.mergeBranches(name, "origin/".concat(name), _nodegit.default.Merge.PREFERENCE.FASTFORWARD_ONLY, mergeOptions);

          case 7:
            _context11.next = 15;
            break;

          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11["catch"](4);
            console.log("Unable to fast-forward ".concat(name, ", branches have diverged"));
            console.log('You might consider:');
            console.log("    sea branch switch ".concat(name, " && git reset --hard origin/").concat(name));
            return _context11.abrupt("return", false);

          case 15:
            return _context11.abrupt("return", true);

          case 16:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this, [[4, 9]]);
  }));
  return _pullRemote.apply(this, arguments);
}

function remoteExists(_x15, _x16) {
  return _remoteExists.apply(this, arguments);
}

function _remoteExists() {
  _remoteExists = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(repo, name) {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _nodegit.default.Remote.lookup(repo, name);

          case 3:
            return _context12.abrupt("return", true);

          case 6:
            _context12.prev = 6;
            _context12.t0 = _context12["catch"](0);
            return _context12.abrupt("return", false);

          case 9:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this, [[0, 6]]);
  }));
  return _remoteExists.apply(this, arguments);
}

function workingDirectoryClean(_x17) {
  return _workingDirectoryClean.apply(this, arguments);
}

function _workingDirectoryClean() {
  _workingDirectoryClean = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(repo) {
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
            return _nodegit.default.Status.foreachExt(repo, statusOptions, function () {
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
  return _workingDirectoryClean.apply(this, arguments);
}

function stashName(name) {
  return "Sea autostash for ".concat(name);
}

function stashChanges(_x18) {
  return _stashChanges.apply(this, arguments);
}

function _stashChanges() {
  _stashChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(repo) {
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return workingDirectoryClean(repo);

          case 2:
            if (!_context14.sent) {
              _context14.next = 4;
              break;
            }

            return _context14.abrupt("return");

          case 4:
            _context14.t0 = _nodegit.default.Stash;
            _context14.t1 = repo;
            _context14.t2 = repo.defaultSignature();
            _context14.t3 = stashName;
            _context14.next = 10;
            return currentBranchName(repo);

          case 10:
            _context14.t4 = _context14.sent;
            _context14.t5 = (0, _context14.t3)(_context14.t4);
            _context14.t6 = _nodegit.default.Stash.FLAGS.INCLUDE_UNTRACKED;
            _context14.next = 15;
            return _context14.t0.save.call(_context14.t0, _context14.t1, _context14.t2, _context14.t5, _context14.t6);

          case 15:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));
  return _stashChanges.apply(this, arguments);
}

function unstashChanges(_x19, _x20) {
  return _unstashChanges.apply(this, arguments);
}

function _unstashChanges() {
  _unstashChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16(repo, name) {
    var stashes, stash, checkoutOptions, stashApplyOptions;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            stashes = [];
            _context16.next = 3;
            return _nodegit.default.Stash.foreach(repo,
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee15(index, message, oid) {
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        stashes.push({
                          index: index,
                          message: message,
                          oid: oid
                        });

                      case 1:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15, this);
              }));

              return function (_x21, _x22, _x23) {
                return _ref.apply(this, arguments);
              };
            }());

          case 3:
            stash = stashes.find(function (s) {
              return s.message.includes(stashName(name));
            });

            if (stash) {
              _context16.next = 6;
              break;
            }

            return _context16.abrupt("return");

          case 6:
            checkoutOptions = new _nodegit.default.CheckoutOptions();
            checkoutOptions.checkoutStrategy = _nodegit.default.Checkout.STRATEGY.SAFE;
            stashApplyOptions = new _nodegit.default.StashApplyOptions();
            stashApplyOptions.checkoutOptions = checkoutOptions;
            _context16.next = 12;
            return _nodegit.default.Stash.apply(repo, stash.index, stashApplyOptions);

          case 12:
            _context16.next = 14;
            return _nodegit.default.Stash.drop(repo, stash.index);

          case 14:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));
  return _unstashChanges.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VhLmpzIl0sIm5hbWVzIjpbIm9wZW4iLCJwYXRoIiwicHJvY2VzcyIsImN3ZCIsImdpdCIsIlJlcG9zaXRvcnkiLCJpbml0IiwicmVwbyIsInJlZnJlc2hJbmRleCIsImluZGV4Iiwic2lnbmF0dXJlIiwiU2lnbmF0dXJlIiwiZGVmYXVsdCIsIndyaXRlVHJlZSIsInRyZWUiLCJjcmVhdGVDb21taXQiLCJpc1JlcG8iLCJicmFuY2hFeGlzdHMiLCJuYW1lIiwiQnJhbmNoIiwibG9va3VwIiwiQlJBTkNIIiwiTE9DQUwiLCJjaGFuZ2VkRmlsZXMiLCJzdGF0dXNPcHRpb25zIiwiZmxhZ3MiLCJTdGF0dXMiLCJPUFQiLCJJTkNMVURFX1VOVFJBQ0tFRCIsIlJFQ1VSU0VfVU5UUkFDS0VEX0RJUlMiLCJjaGFuZ2VzIiwibmV3IiwibW9kaWZpZWQiLCJkZWxldGVkIiwiZm9yZWFjaEV4dCIsInN0YXR1cyIsIlNUQVRVUyIsIldUX05FVyIsInB1c2giLCJXVF9NT0RJRklFRCIsIldUX0RFTEVURUQiLCJjaGVja291dEJyYW5jaCIsImNoZWNrb3V0T3B0aW9ucyIsIkNoZWNrb3V0T3B0aW9ucyIsImNoZWNrb3V0U3RyYXRlZ3kiLCJDaGVja291dCIsIlNUUkFURUdZIiwiU0FGRSIsIlJldnBhcnNlIiwic2luZ2xlIiwidHJlZWlzaCIsInNldEhlYWQiLCJjb21taXRDaGFuZ2VzIiwibXNnIiwiYWRkQWxsIiwid3JpdGUiLCJSZWZlcmVuY2UiLCJuYW1lVG9JZCIsImhlYWQiLCJnZXRDb21taXQiLCJwYXJlbnQiLCJjcmVhdGVCcmFuY2giLCJnZXRNYXN0ZXJDb21taXQiLCJtYXN0ZXJDb21taXQiLCJjdXJyZW50QnJhbmNoTmFtZSIsImdldEN1cnJlbnRCcmFuY2giLCJzaG9ydGhhbmQiLCJvbkJyYW5jaCIsInB1bGxSZW1vdGUiLCJmZXRjaCIsImNhbGxiYWNrcyIsImNyZWRlbnRpYWxzIiwidXJsIiwidXNlcm5hbWUiLCJDcmVkIiwic3NoS2V5RnJvbUFnZW50IiwiY2VydGlmaWNhdGVDaGVjayIsIm1lcmdlT3B0aW9ucyIsIk1lcmdlT3B0aW9ucyIsImZpbGVGYXZvciIsIk1lcmdlIiwiRklMRV9GQVZPUiIsIlRIRUlSUyIsIm1lcmdlQnJhbmNoZXMiLCJQUkVGRVJFTkNFIiwiRkFTVEZPUldBUkRfT05MWSIsImNvbnNvbGUiLCJsb2ciLCJyZW1vdGVFeGlzdHMiLCJSZW1vdGUiLCJ3b3JraW5nRGlyZWN0b3J5Q2xlYW4iLCJjbnQiLCJzdGFzaE5hbWUiLCJzdGFzaENoYW5nZXMiLCJTdGFzaCIsImRlZmF1bHRTaWduYXR1cmUiLCJGTEFHUyIsInNhdmUiLCJ1bnN0YXNoQ2hhbmdlcyIsInN0YXNoZXMiLCJmb3JlYWNoIiwibWVzc2FnZSIsIm9pZCIsInN0YXNoIiwiZmluZCIsInMiLCJpbmNsdWRlcyIsInN0YXNoQXBwbHlPcHRpb25zIiwiU3Rhc2hBcHBseU9wdGlvbnMiLCJhcHBseSIsImRyb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztTQUVzQkEsSTs7Ozs7OzswQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQkMsWUFBQUEsSUFBcEIsMkRBQTJCQyxPQUFPLENBQUNDLEdBQVIsRUFBM0I7QUFBQSw2Q0FDRUMsaUJBQUlDLFVBQUosQ0FBZUwsSUFBZixDQUFvQkMsSUFBcEIsQ0FERjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBSWVLLEk7Ozs7Ozs7MEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQkwsWUFBQUEsSUFBcEIsOERBQTJCQyxPQUFPLENBQUNDLEdBQVIsRUFBM0I7QUFBQTtBQUFBLG1CQUNjQyxpQkFBSUMsVUFBSixDQUFlQyxJQUFmLENBQW9CTCxJQUFwQixFQUEwQixDQUExQixDQURkOztBQUFBO0FBQ0NNLFlBQUFBLElBREQ7QUFBQTtBQUFB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aUJBQUkwRixLQUFKLENBQVVlLEtBQVYsQ0FBZ0J0RyxJQUFoQixFQUFzQmdHLEtBQUssQ0FBQzlGLEtBQTVCLEVBQW1Da0csaUJBQW5DLENBaEJEOztBQUFBO0FBQUE7QUFBQSxtQkFpQkN2RyxpQkFBSTBGLEtBQUosQ0FBVWdCLElBQVYsQ0FBZXZHLElBQWYsRUFBcUJnRyxLQUFLLENBQUM5RixLQUEzQixDQWpCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0IGdpdCBmcm9tICdub2RlZ2l0JztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW4ocGF0aCA9IHByb2Nlc3MuY3dkKCkpIHtcbiAgcmV0dXJuIGdpdC5SZXBvc2l0b3J5Lm9wZW4ocGF0aCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KHBhdGggPSBwcm9jZXNzLmN3ZCgpKSB7XG4gIGNvbnN0IHJlcG8gPSBhd2FpdCBnaXQuUmVwb3NpdG9yeS5pbml0KHBhdGgsIDApO1xuXG4gIGNvbnN0IGluZGV4ID0gYXdhaXQgcmVwby5yZWZyZXNoSW5kZXgoKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gZ2l0LlNpZ25hdHVyZS5kZWZhdWx0KHJlcG8pO1xuICBjb25zdCB0cmVlID0gYXdhaXQgaW5kZXgud3JpdGVUcmVlKCk7XG4gIHJldHVybiByZXBvLmNyZWF0ZUNvbW1pdChcbiAgICAnSEVBRCcsXG4gICAgc2lnbmF0dXJlLFxuICAgIHNpZ25hdHVyZSxcbiAgICAnSW5pdGlhbCBjb21taXQnLFxuICAgIHRyZWUsXG4gICAgW11cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzUmVwbyhwYXRoID0gcHJvY2Vzcy5jd2QoKSkge1xuICB0cnkge1xuICAgIGF3YWl0IG9wZW4ocGF0aCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYnJhbmNoRXhpc3RzKHJlcG8sIG5hbWUpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBnaXQuQnJhbmNoLmxvb2t1cChyZXBvLCBuYW1lLCBnaXQuQnJhbmNoLkJSQU5DSC5MT0NBTCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hhbmdlZEZpbGVzKHJlcG8pIHtcbiAgY29uc3Qgc3RhdHVzT3B0aW9ucyA9IHtcbiAgICBmbGFnczpcbiAgICAgIGdpdC5TdGF0dXMuT1BULklOQ0xVREVfVU5UUkFDS0VEICsgZ2l0LlN0YXR1cy5PUFQuUkVDVVJTRV9VTlRSQUNLRURfRElSU1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZXMgPSB7XG4gICAgbmV3OiBbXSxcbiAgICBtb2RpZmllZDogW10sXG4gICAgZGVsZXRlZDogW11cbiAgfTtcblxuICBhd2FpdCBnaXQuU3RhdHVzLmZvcmVhY2hFeHQocmVwbywgc3RhdHVzT3B0aW9ucywgKHBhdGgsIHN0YXR1cykgPT4ge1xuICAgIGlmIChzdGF0dXMgPT09IGdpdC5TdGF0dXMuU1RBVFVTLldUX05FVykgY2hhbmdlcy5uZXcucHVzaChwYXRoKTtcbiAgICBlbHNlIGlmIChzdGF0dXMgPT09IGdpdC5TdGF0dXMuU1RBVFVTLldUX01PRElGSUVEKVxuICAgICAgY2hhbmdlcy5tb2RpZmllZC5wdXNoKHBhdGgpO1xuICAgIGVsc2UgaWYgKHN0YXR1cyA9PT0gZ2l0LlN0YXR1cy5TVEFUVVMuV1RfREVMRVRFRClcbiAgICAgIGNoYW5nZXMuZGVsZXRlZC5wdXNoKHBhdGgpO1xuICB9KTtcblxuICByZXR1cm4gY2hhbmdlcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrb3V0QnJhbmNoKHJlcG8sIG5hbWUpIHtcbiAgY29uc3QgY2hlY2tvdXRPcHRpb25zID0gbmV3IGdpdC5DaGVja291dE9wdGlvbnMoKTtcbiAgY2hlY2tvdXRPcHRpb25zLmNoZWNrb3V0U3RyYXRlZ3kgPSBnaXQuQ2hlY2tvdXQuU1RSQVRFR1kuU0FGRTtcblxuICBjb25zdCB0cmVlaXNoID0gYXdhaXQgZ2l0LlJldnBhcnNlLnNpbmdsZShyZXBvLCBuYW1lKTtcbiAgYXdhaXQgZ2l0LkNoZWNrb3V0LnRyZWUocmVwbywgdHJlZWlzaCwgY2hlY2tvdXRPcHRpb25zKTtcbiAgYXdhaXQgcmVwby5zZXRIZWFkKGByZWZzL2hlYWRzLyR7bmFtZX1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbW1pdENoYW5nZXMocmVwbywgbXNnKSB7XG4gIGNvbnN0IGluZGV4ID0gYXdhaXQgcmVwby5yZWZyZXNoSW5kZXgoKTtcbiAgYXdhaXQgaW5kZXguYWRkQWxsKCk7XG4gIGF3YWl0IGluZGV4LndyaXRlKCk7XG4gIGNvbnN0IHRyZWUgPSBhd2FpdCBpbmRleC53cml0ZVRyZWUoKTtcbiAgY29uc3QgaGVhZCA9IGF3YWl0IGdpdC5SZWZlcmVuY2UubmFtZVRvSWQocmVwbywgJ0hFQUQnKTtcbiAgY29uc3QgcGFyZW50ID0gYXdhaXQgcmVwby5nZXRDb21taXQoaGVhZCk7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IGdpdC5TaWduYXR1cmUuZGVmYXVsdChyZXBvKTtcbiAgcmV0dXJuIHJlcG8uY3JlYXRlQ29tbWl0KCdIRUFEJywgc2lnbmF0dXJlLCBzaWduYXR1cmUsIG1zZywgdHJlZSwgW3BhcmVudF0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQnJhbmNoKHJlcG8sIG5hbWUpIHtcbiAgY29uc3QgbWFzdGVyQ29tbWl0ID0gYXdhaXQgcmVwby5nZXRNYXN0ZXJDb21taXQoKTtcbiAgYXdhaXQgcmVwby5jcmVhdGVCcmFuY2gobmFtZSwgbWFzdGVyQ29tbWl0KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGN1cnJlbnRCcmFuY2hOYW1lKHJlcG8pIHtcbiAgcmV0dXJuIChhd2FpdCByZXBvLmdldEN1cnJlbnRCcmFuY2goKSkuc2hvcnRoYW5kKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvbkJyYW5jaChyZXBvLCBuYW1lKSB7XG4gIHJldHVybiAoYXdhaXQgY3VycmVudEJyYW5jaE5hbWUocmVwbykpID09PSBuYW1lO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHVsbFJlbW90ZShyZXBvLCBuYW1lKSB7XG4gIGF3YWl0IHJlcG8uZmV0Y2goJ29yaWdpbicsIHtcbiAgICBjYWxsYmFja3M6IHtcbiAgICAgIGNyZWRlbnRpYWxzOiAodXJsLCB1c2VybmFtZSkgPT4gZ2l0LkNyZWQuc3NoS2V5RnJvbUFnZW50KHVzZXJuYW1lKSxcbiAgICAgIGNlcnRpZmljYXRlQ2hlY2s6ICgpID0+IDFcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IG1lcmdlT3B0aW9ucyA9IG5ldyBnaXQuTWVyZ2VPcHRpb25zKCk7XG4gIG1lcmdlT3B0aW9ucy5maWxlRmF2b3IgPSBnaXQuTWVyZ2UuRklMRV9GQVZPUi5USEVJUlM7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCByZXBvLm1lcmdlQnJhbmNoZXMoXG4gICAgICBuYW1lLFxuICAgICAgYG9yaWdpbi8ke25hbWV9YCxcbiAgICAgIGdpdC5NZXJnZS5QUkVGRVJFTkNFLkZBU1RGT1JXQVJEX09OTFksXG4gICAgICBtZXJnZU9wdGlvbnNcbiAgICApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhgVW5hYmxlIHRvIGZhc3QtZm9yd2FyZCAke25hbWV9LCBicmFuY2hlcyBoYXZlIGRpdmVyZ2VkYCk7XG4gICAgY29uc29sZS5sb2coJ1lvdSBtaWdodCBjb25zaWRlcjonKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGAgICAgc2VhIGJyYW5jaCBzd2l0Y2ggJHtuYW1lfSAmJiBnaXQgcmVzZXQgLS1oYXJkIG9yaWdpbi8ke25hbWV9YFxuICAgICk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdGVFeGlzdHMocmVwbywgbmFtZSkge1xuICB0cnkge1xuICAgIGF3YWl0IGdpdC5SZW1vdGUubG9va3VwKHJlcG8sIG5hbWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdvcmtpbmdEaXJlY3RvcnlDbGVhbihyZXBvKSB7XG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB7XG4gICAgZmxhZ3M6XG4gICAgICBnaXQuU3RhdHVzLk9QVC5JTkNMVURFX1VOVFJBQ0tFRCArIGdpdC5TdGF0dXMuT1BULlJFQ1VSU0VfVU5UUkFDS0VEX0RJUlNcbiAgfTtcblxuICBsZXQgY250ID0gMDtcbiAgYXdhaXQgZ2l0LlN0YXR1cy5mb3JlYWNoRXh0KHJlcG8sIHN0YXR1c09wdGlvbnMsICgpID0+IHtcbiAgICBjbnQgKz0gMTtcbiAgfSk7XG4gIHJldHVybiBjbnQgPT09IDA7XG59XG5cbmZ1bmN0aW9uIHN0YXNoTmFtZShuYW1lKSB7XG4gIHJldHVybiBgU2VhIGF1dG9zdGFzaCBmb3IgJHtuYW1lfWA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFzaENoYW5nZXMocmVwbykge1xuICBpZiAoYXdhaXQgd29ya2luZ0RpcmVjdG9yeUNsZWFuKHJlcG8pKSByZXR1cm47XG5cbiAgYXdhaXQgZ2l0LlN0YXNoLnNhdmUoXG4gICAgcmVwbyxcbiAgICByZXBvLmRlZmF1bHRTaWduYXR1cmUoKSxcbiAgICBzdGFzaE5hbWUoYXdhaXQgY3VycmVudEJyYW5jaE5hbWUocmVwbykpLFxuICAgIGdpdC5TdGFzaC5GTEFHUy5JTkNMVURFX1VOVFJBQ0tFRFxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdW5zdGFzaENoYW5nZXMocmVwbywgbmFtZSkge1xuICBjb25zdCBzdGFzaGVzID0gW107XG4gIGF3YWl0IGdpdC5TdGFzaC5mb3JlYWNoKHJlcG8sIGFzeW5jIChpbmRleCwgbWVzc2FnZSwgb2lkKSA9PiB7XG4gICAgc3Rhc2hlcy5wdXNoKHsgaW5kZXgsIG1lc3NhZ2UsIG9pZCB9KTtcbiAgfSk7XG5cbiAgY29uc3Qgc3Rhc2ggPSBzdGFzaGVzLmZpbmQocyA9PiBzLm1lc3NhZ2UuaW5jbHVkZXMoc3Rhc2hOYW1lKG5hbWUpKSk7XG5cbiAgaWYgKCFzdGFzaCkgcmV0dXJuO1xuXG4gIGNvbnN0IGNoZWNrb3V0T3B0aW9ucyA9IG5ldyBnaXQuQ2hlY2tvdXRPcHRpb25zKCk7XG4gIGNoZWNrb3V0T3B0aW9ucy5jaGVja291dFN0cmF0ZWd5ID0gZ2l0LkNoZWNrb3V0LlNUUkFURUdZLlNBRkU7XG5cbiAgY29uc3Qgc3Rhc2hBcHBseU9wdGlvbnMgPSBuZXcgZ2l0LlN0YXNoQXBwbHlPcHRpb25zKCk7XG4gIHN0YXNoQXBwbHlPcHRpb25zLmNoZWNrb3V0T3B0aW9ucyA9IGNoZWNrb3V0T3B0aW9ucztcblxuICBhd2FpdCBnaXQuU3Rhc2guYXBwbHkocmVwbywgc3Rhc2guaW5kZXgsIHN0YXNoQXBwbHlPcHRpb25zKTtcbiAgYXdhaXQgZ2l0LlN0YXNoLmRyb3AocmVwbywgc3Rhc2guaW5kZXgpO1xufVxuIl19