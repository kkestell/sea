"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRepository = initRepository;
exports.commitChanges = commitChanges;
exports.newBranch = newBranch;
exports.showChanges = showChanges;
exports.switchBranch = switchBranch;
exports.syncBranch = syncBranch;

var _chalk = _interopRequireDefault(require("chalk"));

var _tmpPromise = _interopRequireDefault(require("tmp-promise"));

var _ora = _interopRequireDefault(require("ora"));

var sea = _interopRequireWildcard(require("./sea"));

var system = _interopRequireWildcard(require("./system"));

var _conf = _interopRequireDefault(require("./conf"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["{red     ", "}"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["{green     ", "}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initRepository() {
  return _initRepository.apply(this, arguments);
}

function _initRepository() {
  _initRepository = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var path,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = _args.length > 0 && _args[0] !== undefined ? _args[0] : process.cwd();
            _context.next = 3;
            return sea.isRepo(path);

          case 3:
            if (!_context.sent) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            _context.next = 7;
            return sea.init(path);

          case 7:
            console.log("Initialized empty repository in ".concat(path));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _initRepository.apply(this, arguments);
}

function commitChanges() {
  return _commitChanges.apply(this, arguments);
}

function _commitChanges() {
  _commitChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var tmpfile, msg, repo, commitId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _tmpPromise.default.file();

          case 2:
            tmpfile = _context2.sent;
            system.edit(tmpfile.path);
            _context2.next = 6;
            return system.readFile(tmpfile.path);

          case 6:
            msg = _context2.sent;
            tmpfile.cleanup();
            _context2.next = 10;
            return sea.open();

          case 10:
            repo = _context2.sent;
            _context2.next = 13;
            return sea.commitChanges(repo, msg);

          case 13:
            commitId = _context2.sent;
            console.log("Committed ".concat(commitId));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _commitChanges.apply(this, arguments);
}

function newBranch(_x) {
  return _newBranch.apply(this, arguments);
}

function _newBranch() {
  _newBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(name) {
    var repo, spinner;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return sea.open();

          case 2:
            repo = _context3.sent;
            _context3.next = 5;
            return sea.branchExists(repo, name);

          case 5:
            if (!_context3.sent) {
              _context3.next = 8;
              break;
            }

            console.log("Branch exists '".concat(name, "'"));
            return _context3.abrupt("return");

          case 8:
            _context3.next = 10;
            return sea.remoteExists(repo);

          case 10:
            if (!_context3.sent) {
              _context3.next = 25;
              break;
            }

            spinner = (0, _ora.default)('Enumerating remote branches').start();
            _context3.next = 14;
            return sea.remoteBranchExists(repo, name);

          case 14:
            if (!_context3.sent) {
              _context3.next = 18;
              break;
            }

            console.log("Branch exists '".concat(name, "'"));
            spinner.stop();
            return _context3.abrupt("return");

          case 18:
            spinner.text = "Pulling from origin/".concat(_conf.default.branch);
            _context3.next = 21;
            return sea.pullRemote(repo, _conf.default.branch);

          case 21:
            if (_context3.sent) {
              _context3.next = 24;
              break;
            }

            spinner.stop();
            return _context3.abrupt("return");

          case 24:
            spinner.stop();

          case 25:
            _context3.next = 27;
            return sea.stashChanges(repo);

          case 27:
            _context3.next = 29;
            return sea.checkoutBranch(repo, _conf.default.branch);

          case 29:
            _context3.next = 31;
            return sea.createBranch(repo, name);

          case 31:
            _context3.next = 33;
            return sea.checkoutBranch(repo, name);

          case 33:
            console.log("Switched to new branch '".concat(name, "'"));

          case 34:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _newBranch.apply(this, arguments);
}

function showChanges() {
  return _showChanges.apply(this, arguments);
}

function _showChanges() {
  _showChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var repo, changes;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return sea.open();

          case 2:
            repo = _context4.sent;
            _context4.next = 5;
            return sea.changedFiles(repo);

          case 5:
            changes = _context4.sent;

            if (!(changes.new.length === 0 && changes.modified.length === 0 && changes.deleted.length === 0)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return");

          case 8:
            console.log();

            if (changes.new.length > 0) {
              changes.new.forEach(function (f) {
                return console.log((0, _chalk.default)(_templateObject(), f));
              });
              console.log();
            }

            if (changes.modified.length > 0) {
              changes.modified.forEach(function (f) {
                return console.log("    ".concat(f));
              });
              console.log();
            }

            if (changes.deleted.length > 0) {
              changes.deleted.forEach(function (f) {
                return console.log((0, _chalk.default)(_templateObject2(), f));
              });
              console.log();
            }

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _showChanges.apply(this, arguments);
}

function switchBranch(_x2) {
  return _switchBranch.apply(this, arguments);
}

function _switchBranch() {
  _switchBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(name) {
    var repo;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return sea.open();

          case 2:
            repo = _context5.sent;
            _context5.next = 5;
            return sea.onBranch(repo, name);

          case 5:
            if (!_context5.sent) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return");

          case 7:
            _context5.next = 9;
            return sea.branchExists(repo, name);

          case 9:
            if (_context5.sent) {
              _context5.next = 12;
              break;
            }

            console.log("No such branch '".concat(name, "'"));
            return _context5.abrupt("return");

          case 12:
            _context5.next = 14;
            return sea.stashChanges(repo);

          case 14:
            _context5.next = 16;
            return sea.checkoutBranch(repo, name);

          case 16:
            _context5.next = 18;
            return sea.unstashChanges(repo, name);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _switchBranch.apply(this, arguments);
}

function syncBranch() {
  return _syncBranch.apply(this, arguments);
}

function _syncBranch() {
  _syncBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var repo, branch, spinner;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return sea.open();

          case 2:
            repo = _context6.sent;
            _context6.next = 5;
            return sea.currentBranchName(repo);

          case 5:
            branch = _context6.sent;
            _context6.next = 8;
            return sea.stashChanges(repo);

          case 8:
            spinner = (0, _ora.default)("Enumeratig remote branches").start();
            _context6.next = 11;
            return sea.remoteBranchExists(repo, branch);

          case 11:
            if (!_context6.sent) {
              _context6.next = 17;
              break;
            }

            spinner.text = "Pulling origin/".concat(branch);
            _context6.next = 15;
            return sea.pullRemote(repo, branch);

          case 15:
            if (_context6.sent) {
              _context6.next = 17;
              break;
            }

            return _context6.abrupt("return");

          case 17:
            spinner.text = "Pushing origin/".concat(branch);
            _context6.next = 20;
            return sea.pushRemote(repo, branch);

          case 20:
            spinner.stop();
            _context6.next = 23;
            return sea.unstashChanges(repo, branch);

          case 23:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _syncBranch.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvb3BlcmF0aW9ucy5qcyJdLCJuYW1lcyI6WyJpbml0UmVwb3NpdG9yeSIsInBhdGgiLCJwcm9jZXNzIiwiY3dkIiwic2VhIiwiaXNSZXBvIiwiaW5pdCIsImNvbnNvbGUiLCJsb2ciLCJjb21taXRDaGFuZ2VzIiwidG1wIiwiZmlsZSIsInRtcGZpbGUiLCJzeXN0ZW0iLCJlZGl0IiwicmVhZEZpbGUiLCJtc2ciLCJjbGVhbnVwIiwib3BlbiIsInJlcG8iLCJjb21taXRJZCIsIm5ld0JyYW5jaCIsIm5hbWUiLCJicmFuY2hFeGlzdHMiLCJyZW1vdGVFeGlzdHMiLCJzcGlubmVyIiwic3RhcnQiLCJyZW1vdGVCcmFuY2hFeGlzdHMiLCJzdG9wIiwidGV4dCIsImNvbmYiLCJicmFuY2giLCJwdWxsUmVtb3RlIiwic3Rhc2hDaGFuZ2VzIiwiY2hlY2tvdXRCcmFuY2giLCJjcmVhdGVCcmFuY2giLCJzaG93Q2hhbmdlcyIsImNoYW5nZWRGaWxlcyIsImNoYW5nZXMiLCJuZXciLCJsZW5ndGgiLCJtb2RpZmllZCIsImRlbGV0ZWQiLCJmb3JFYWNoIiwiZiIsImNoYWxrIiwic3dpdGNoQnJhbmNoIiwib25CcmFuY2giLCJ1bnN0YXNoQ2hhbmdlcyIsInN5bmNCcmFuY2giLCJjdXJyZW50QnJhbmNoTmFtZSIsInB1c2hSZW1vdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUVzQkEsYzs7Ozs7OzswQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4QkMsWUFBQUEsSUFBOUIsMkRBQXFDQyxPQUFPLENBQUNDLEdBQVIsRUFBckM7QUFBQTtBQUFBLG1CQUNLQyxHQUFHLENBQUNDLE1BQUosQ0FBV0osSUFBWCxDQURMOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFB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WUFBQUEsSUFERDtBQUFBO0FBQUEsbUJBR2dCZixHQUFHLENBQUM4QyxpQkFBSixDQUFzQi9CLElBQXRCLENBSGhCOztBQUFBO0FBR0NZLFlBQUFBLE1BSEQ7QUFBQTtBQUFBLG1CQUlDM0IsR0FBRyxDQUFDNkIsWUFBSixDQUFpQmQsSUFBakIsQ0FKRDs7QUFBQTtBQU1DTSxZQUFBQSxPQU5ELEdBTVcsZ0RBQWtDQyxLQUFsQyxFQU5YO0FBQUE7QUFBQSxtQkFPS3RCLEdBQUcsQ0FBQ3VCLGtCQUFKLENBQXVCUixJQUF2QixFQUE2QlksTUFBN0IsQ0FQTDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVFITixZQUFBQSxPQUFPLENBQUNJLElBQVIsNEJBQWlDRSxNQUFqQztBQVJHO0FBQUEsbUJBU1MzQixHQUFHLENBQUM0QixVQUFKLENBQWViLElBQWYsRUFBcUJZLE1BQXJCLENBVFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQWNMTixZQUFBQSxPQUFPLENBQUNJLElBQVIsNEJBQWlDRSxNQUFqQztBQWRLO0FBQUEsbUJBZUMzQixHQUFHLENBQUMrQyxVQUFKLENBQWVoQyxJQUFmLEVBQXFCWSxNQUFyQixDQWZEOztBQUFBO0FBZ0JMTixZQUFBQSxPQUFPLENBQUNHLElBQVI7QUFoQks7QUFBQSxtQkFrQkN4QixHQUFHLENBQUM0QyxjQUFKLENBQW1CN0IsSUFBbkIsRUFBeUJZLE1BQXpCLENBbEJEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHRtcCBmcm9tICd0bXAtcHJvbWlzZSc7XG5pbXBvcnQgb3JhIGZyb20gJ29yYSc7XG5cbmltcG9ydCAqIGFzIHNlYSBmcm9tICcuL3NlYSc7XG5pbXBvcnQgKiBhcyBzeXN0ZW0gZnJvbSAnLi9zeXN0ZW0nO1xuaW1wb3J0IGNvbmYgZnJvbSAnLi9jb25mJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRSZXBvc2l0b3J5KHBhdGggPSBwcm9jZXNzLmN3ZCgpKSB7XG4gIGlmIChhd2FpdCBzZWEuaXNSZXBvKHBhdGgpKSByZXR1cm47XG4gIGF3YWl0IHNlYS5pbml0KHBhdGgpO1xuICBjb25zb2xlLmxvZyhgSW5pdGlhbGl6ZWQgZW1wdHkgcmVwb3NpdG9yeSBpbiAke3BhdGh9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21taXRDaGFuZ2VzKCkge1xuICBjb25zdCB0bXBmaWxlID0gYXdhaXQgdG1wLmZpbGUoKTtcblxuICBzeXN0ZW0uZWRpdCh0bXBmaWxlLnBhdGgpO1xuICBjb25zdCBtc2cgPSBhd2FpdCBzeXN0ZW0ucmVhZEZpbGUodG1wZmlsZS5wYXRoKTtcblxuICB0bXBmaWxlLmNsZWFudXAoKTtcblxuICBjb25zdCByZXBvID0gYXdhaXQgc2VhLm9wZW4oKTtcbiAgY29uc3QgY29tbWl0SWQgPSBhd2FpdCBzZWEuY29tbWl0Q2hhbmdlcyhyZXBvLCBtc2cpO1xuXG4gIGNvbnNvbGUubG9nKGBDb21taXR0ZWQgJHtjb21taXRJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG5ld0JyYW5jaChuYW1lKSB7XG4gIGNvbnN0IHJlcG8gPSBhd2FpdCBzZWEub3BlbigpO1xuXG4gIGlmIChhd2FpdCBzZWEuYnJhbmNoRXhpc3RzKHJlcG8sIG5hbWUpKSB7XG4gICAgY29uc29sZS5sb2coYEJyYW5jaCBleGlzdHMgJyR7bmFtZX0nYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGF3YWl0IHNlYS5yZW1vdGVFeGlzdHMocmVwbykpIHtcbiAgICBjb25zdCBzcGlubmVyID0gb3JhKCdFbnVtZXJhdGluZyByZW1vdGUgYnJhbmNoZXMnKS5zdGFydCgpO1xuXG4gICAgaWYgKGF3YWl0IHNlYS5yZW1vdGVCcmFuY2hFeGlzdHMocmVwbywgbmFtZSkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBCcmFuY2ggZXhpc3RzICcke25hbWV9J2ApO1xuICAgICAgc3Bpbm5lci5zdG9wKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3Bpbm5lci50ZXh0ID0gYFB1bGxpbmcgZnJvbSBvcmlnaW4vJHtjb25mLmJyYW5jaH1gO1xuICAgIGlmICghKGF3YWl0IHNlYS5wdWxsUmVtb3RlKHJlcG8sIGNvbmYuYnJhbmNoKSkpIHtcbiAgICAgIHNwaW5uZXIuc3RvcCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzcGlubmVyLnN0b3AoKTtcbiAgfVxuXG4gIGF3YWl0IHNlYS5zdGFzaENoYW5nZXMocmVwbyk7XG4gIGF3YWl0IHNlYS5jaGVja291dEJyYW5jaChyZXBvLCBjb25mLmJyYW5jaCk7XG4gIGF3YWl0IHNlYS5jcmVhdGVCcmFuY2gocmVwbywgbmFtZSk7XG4gIGF3YWl0IHNlYS5jaGVja291dEJyYW5jaChyZXBvLCBuYW1lKTtcblxuICBjb25zb2xlLmxvZyhgU3dpdGNoZWQgdG8gbmV3IGJyYW5jaCAnJHtuYW1lfSdgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNob3dDaGFuZ2VzKCkge1xuICBjb25zdCByZXBvID0gYXdhaXQgc2VhLm9wZW4oKTtcblxuICBjb25zdCBjaGFuZ2VzID0gYXdhaXQgc2VhLmNoYW5nZWRGaWxlcyhyZXBvKTtcblxuICBpZiAoXG4gICAgY2hhbmdlcy5uZXcubGVuZ3RoID09PSAwICYmXG4gICAgY2hhbmdlcy5tb2RpZmllZC5sZW5ndGggPT09IDAgJiZcbiAgICBjaGFuZ2VzLmRlbGV0ZWQubGVuZ3RoID09PSAwXG4gIClcbiAgICByZXR1cm47XG5cbiAgY29uc29sZS5sb2coKTtcblxuICBpZiAoY2hhbmdlcy5uZXcubGVuZ3RoID4gMCkge1xuICAgIGNoYW5nZXMubmV3LmZvckVhY2goZiA9PiBjb25zb2xlLmxvZyhjaGFsa2B7Z3JlZW4gICAgICR7Zn19YCkpO1xuICAgIGNvbnNvbGUubG9nKCk7XG4gIH1cblxuICBpZiAoY2hhbmdlcy5tb2RpZmllZC5sZW5ndGggPiAwKSB7XG4gICAgY2hhbmdlcy5tb2RpZmllZC5mb3JFYWNoKGYgPT4gY29uc29sZS5sb2coYCAgICAke2Z9YCkpO1xuICAgIGNvbnNvbGUubG9nKCk7XG4gIH1cblxuICBpZiAoY2hhbmdlcy5kZWxldGVkLmxlbmd0aCA+IDApIHtcbiAgICBjaGFuZ2VzLmRlbGV0ZWQuZm9yRWFjaChmID0+IGNvbnNvbGUubG9nKGNoYWxrYHtyZWQgICAgICR7Zn19YCkpO1xuICAgIGNvbnNvbGUubG9nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN3aXRjaEJyYW5jaChuYW1lKSB7XG4gIGNvbnN0IHJlcG8gPSBhd2FpdCBzZWEub3BlbigpO1xuXG4gIGlmIChhd2FpdCBzZWEub25CcmFuY2gocmVwbywgbmFtZSkpIHJldHVybjtcblxuICBpZiAoIShhd2FpdCBzZWEuYnJhbmNoRXhpc3RzKHJlcG8sIG5hbWUpKSkge1xuICAgIGNvbnNvbGUubG9nKGBObyBzdWNoIGJyYW5jaCAnJHtuYW1lfSdgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBzZWEuc3Rhc2hDaGFuZ2VzKHJlcG8pO1xuICBhd2FpdCBzZWEuY2hlY2tvdXRCcmFuY2gocmVwbywgbmFtZSk7XG4gIGF3YWl0IHNlYS51bnN0YXNoQ2hhbmdlcyhyZXBvLCBuYW1lKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNCcmFuY2goKSB7XG4gIGNvbnN0IHJlcG8gPSBhd2FpdCBzZWEub3BlbigpO1xuXG4gIGNvbnN0IGJyYW5jaCA9IGF3YWl0IHNlYS5jdXJyZW50QnJhbmNoTmFtZShyZXBvKTtcbiAgYXdhaXQgc2VhLnN0YXNoQ2hhbmdlcyhyZXBvKTtcblxuICBjb25zdCBzcGlubmVyID0gb3JhKGBFbnVtZXJhdGlnIHJlbW90ZSBicmFuY2hlc2ApLnN0YXJ0KCk7XG4gIGlmIChhd2FpdCBzZWEucmVtb3RlQnJhbmNoRXhpc3RzKHJlcG8sIGJyYW5jaCkpIHtcbiAgICBzcGlubmVyLnRleHQgPSBgUHVsbGluZyBvcmlnaW4vJHticmFuY2h9YFxuICAgIGlmICghKGF3YWl0IHNlYS5wdWxsUmVtb3RlKHJlcG8sIGJyYW5jaCkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgc3Bpbm5lci50ZXh0ID0gYFB1c2hpbmcgb3JpZ2luLyR7YnJhbmNofWBcbiAgYXdhaXQgc2VhLnB1c2hSZW1vdGUocmVwbywgYnJhbmNoKTtcbiAgc3Bpbm5lci5zdG9wKCk7XG5cbiAgYXdhaXQgc2VhLnVuc3Rhc2hDaGFuZ2VzKHJlcG8sIGJyYW5jaCk7XG59XG4iXX0=