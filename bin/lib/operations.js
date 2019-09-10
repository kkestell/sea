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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    }, _callee);
  }));
  return _initRepository.apply(this, arguments);
}

function commitChanges(_x) {
  return _commitChanges.apply(this, arguments);
}

function _commitChanges() {
  _commitChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(options) {
    var commitMessage, tmpfile, repo, commitId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commitMessage = options.message;

            if (commitMessage) {
              _context2.next = 10;
              break;
            }

            _context2.next = 4;
            return _tmpPromise["default"].file();

          case 4:
            tmpfile = _context2.sent;
            system.edit(tmpfile.path);
            _context2.next = 8;
            return system.readFile(tmpfile.path);

          case 8:
            commitMessage = _context2.sent;
            tmpfile.cleanup();

          case 10:
            _context2.next = 12;
            return sea.open();

          case 12:
            repo = _context2.sent;
            _context2.next = 15;
            return sea.commitChanges(repo, commitMessage, _conf["default"].name, _conf["default"].email);

          case 15:
            commitId = _context2.sent;
            console.log("Committed ".concat(commitId));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _commitChanges.apply(this, arguments);
}

function newBranch(_x2) {
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

            spinner = (0, _ora["default"])('Enumerating remote branches').start();
            _context3.next = 14;
            return sea.remoteBranchExists(repo, name);

          case 14:
            if (!_context3.sent) {
              _context3.next = 18;
              break;
            }

            spinner.stop();
            console.log("Branch exists '".concat(name, "'"));
            return _context3.abrupt("return");

          case 18:
            spinner.text = "Pulling from origin/".concat(_conf["default"].branch);
            _context3.next = 21;
            return sea.pullRemote(repo, _conf["default"].branch);

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
            return sea.checkoutBranch(repo, _conf["default"].branch);

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
    }, _callee3);
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

            if (!(changes["new"].length === 0 && changes.modified.length === 0 && changes.deleted.length === 0)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return");

          case 8:
            console.log();

            if (changes["new"].length > 0) {
              changes["new"].forEach(function (f) {
                return console.log((0, _chalk["default"])(_templateObject(), f));
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
                return console.log((0, _chalk["default"])(_templateObject2(), f));
              });
              console.log();
            }

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _showChanges.apply(this, arguments);
}

function switchBranch(_x3) {
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
    }, _callee5);
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
            spinner = (0, _ora["default"])("Enumerating remote branches").start();
            _context6.next = 11;
            return sea.remoteBranchExists(repo, branch);

          case 11:
            if (!_context6.sent) {
              _context6.next = 18;
              break;
            }

            spinner.text = "Pulling origin/".concat(branch);
            _context6.next = 15;
            return sea.pullRemote(repo, branch);

          case 15:
            if (_context6.sent) {
              _context6.next = 18;
              break;
            }

            spinner.stop();
            return _context6.abrupt("return");

          case 18:
            spinner.text = "Pushing origin/".concat(branch);
            _context6.next = 21;
            return sea.pushRemote(repo, branch);

          case 21:
            spinner.stop();
            _context6.next = 24;
            return sea.unstashChanges(repo, branch);

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _syncBranch.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvb3BlcmF0aW9ucy5qcyJdLCJuYW1lcyI6WyJpbml0UmVwb3NpdG9yeSIsInBhdGgiLCJwcm9jZXNzIiwiY3dkIiwic2VhIiwiaXNSZXBvIiwiaW5pdCIsImNvbnNvbGUiLCJsb2ciLCJjb21taXRDaGFuZ2VzIiwib3B0aW9ucyIsImNvbW1pdE1lc3NhZ2UiLCJtZXNzYWdlIiwidG1wIiwiZmlsZSIsInRtcGZpbGUiLCJzeXN0ZW0iLCJlZGl0IiwicmVhZEZpbGUiLCJjbGVhbnVwIiwib3BlbiIsInJlcG8iLCJjb25mIiwibmFtZSIsImVtYWlsIiwiY29tbWl0SWQiLCJuZXdCcmFuY2giLCJicmFuY2hFeGlzdHMiLCJyZW1vdGVFeGlzdHMiLCJzcGlubmVyIiwic3RhcnQiLCJyZW1vdGVCcmFuY2hFeGlzdHMiLCJzdG9wIiwidGV4dCIsImJyYW5jaCIsInB1bGxSZW1vdGUiLCJzdGFzaENoYW5nZXMiLCJjaGVja291dEJyYW5jaCIsImNyZWF0ZUJyYW5jaCIsInNob3dDaGFuZ2VzIiwiY2hhbmdlZEZpbGVzIiwiY2hhbmdlcyIsImxlbmd0aCIsIm1vZGlmaWVkIiwiZGVsZXRlZCIsImZvckVhY2giLCJmIiwiY2hhbGsiLCJzd2l0Y2hCcmFuY2giLCJvbkJyYW5jaCIsInVuc3Rhc2hDaGFuZ2VzIiwic3luY0JyYW5jaCIsImN1cnJlbnRCcmFuY2hOYW1lIiwicHVzaFJlbW90ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FFc0JBLGM7Ozs7Ozs7MEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEJDLFlBQUFBLElBQTlCLDJEQUFxQ0MsT0FBTyxDQUFDQyxHQUFSLEVBQXJDO0FBQUE7QUFBQSxtQkFDS0MsR0FBRyxDQUFDQyxNQUFKLENBQVdKLElBQVgsQ0FETDs7QUFBQTtBQUFBO0FB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b250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgdG1wIGZyb20gJ3RtcC1wcm9taXNlJztcbmltcG9ydCBvcmEgZnJvbSAnb3JhJztcblxuaW1wb3J0ICogYXMgc2VhIGZyb20gJy4vc2VhJztcbmltcG9ydCAqIGFzIHN5c3RlbSBmcm9tICcuL3N5c3RlbSc7XG5pbXBvcnQgY29uZiBmcm9tICcuL2NvbmYnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdFJlcG9zaXRvcnkocGF0aCA9IHByb2Nlc3MuY3dkKCkpIHtcbiAgaWYgKGF3YWl0IHNlYS5pc1JlcG8ocGF0aCkpIHJldHVybjtcbiAgYXdhaXQgc2VhLmluaXQocGF0aCk7XG4gIGNvbnNvbGUubG9nKGBJbml0aWFsaXplZCBlbXB0eSByZXBvc2l0b3J5IGluICR7cGF0aH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbW1pdENoYW5nZXMob3B0aW9ucykge1xuICBsZXQgY29tbWl0TWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZTtcblxuICBpZiAoIWNvbW1pdE1lc3NhZ2UpIHtcbiAgICBjb25zdCB0bXBmaWxlID0gYXdhaXQgdG1wLmZpbGUoKTtcblxuICAgIHN5c3RlbS5lZGl0KHRtcGZpbGUucGF0aCk7XG4gICAgY29tbWl0TWVzc2FnZSA9IGF3YWl0IHN5c3RlbS5yZWFkRmlsZSh0bXBmaWxlLnBhdGgpO1xuXG4gICAgdG1wZmlsZS5jbGVhbnVwKCk7XG4gIH1cblxuICBjb25zdCByZXBvID0gYXdhaXQgc2VhLm9wZW4oKTtcbiAgY29uc3QgY29tbWl0SWQgPSBhd2FpdCBzZWEuY29tbWl0Q2hhbmdlcyhcbiAgICByZXBvLFxuICAgIGNvbW1pdE1lc3NhZ2UsXG4gICAgY29uZi5uYW1lLFxuICAgIGNvbmYuZW1haWxcbiAgKTtcblxuICBjb25zb2xlLmxvZyhgQ29tbWl0dGVkICR7Y29tbWl0SWR9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBuZXdCcmFuY2gobmFtZSkge1xuICBjb25zdCByZXBvID0gYXdhaXQgc2VhLm9wZW4oKTtcblxuICBpZiAoYXdhaXQgc2VhLmJyYW5jaEV4aXN0cyhyZXBvLCBuYW1lKSkge1xuICAgIGNvbnNvbGUubG9nKGBCcmFuY2ggZXhpc3RzICcke25hbWV9J2ApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChhd2FpdCBzZWEucmVtb3RlRXhpc3RzKHJlcG8pKSB7XG4gICAgY29uc3Qgc3Bpbm5lciA9IG9yYSgnRW51bWVyYXRpbmcgcmVtb3RlIGJyYW5jaGVzJykuc3RhcnQoKTtcblxuICAgIGlmIChhd2FpdCBzZWEucmVtb3RlQnJhbmNoRXhpc3RzKHJlcG8sIG5hbWUpKSB7XG4gICAgICBzcGlubmVyLnN0b3AoKTtcbiAgICAgIGNvbnNvbGUubG9nKGBCcmFuY2ggZXhpc3RzICcke25hbWV9J2ApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNwaW5uZXIudGV4dCA9IGBQdWxsaW5nIGZyb20gb3JpZ2luLyR7Y29uZi5icmFuY2h9YDtcbiAgICBpZiAoIShhd2FpdCBzZWEucHVsbFJlbW90ZShyZXBvLCBjb25mLmJyYW5jaCkpKSB7XG4gICAgICBzcGlubmVyLnN0b3AoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3Bpbm5lci5zdG9wKCk7XG4gIH1cblxuICBhd2FpdCBzZWEuc3Rhc2hDaGFuZ2VzKHJlcG8pO1xuICBhd2FpdCBzZWEuY2hlY2tvdXRCcmFuY2gocmVwbywgY29uZi5icmFuY2gpO1xuICBhd2FpdCBzZWEuY3JlYXRlQnJhbmNoKHJlcG8sIG5hbWUpO1xuICBhd2FpdCBzZWEuY2hlY2tvdXRCcmFuY2gocmVwbywgbmFtZSk7XG5cbiAgY29uc29sZS5sb2coYFN3aXRjaGVkIHRvIG5ldyBicmFuY2ggJyR7bmFtZX0nYCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaG93Q2hhbmdlcygpIHtcbiAgY29uc3QgcmVwbyA9IGF3YWl0IHNlYS5vcGVuKCk7XG5cbiAgY29uc3QgY2hhbmdlcyA9IGF3YWl0IHNlYS5jaGFuZ2VkRmlsZXMocmVwbyk7XG5cbiAgaWYgKFxuICAgIGNoYW5nZXMubmV3Lmxlbmd0aCA9PT0gMCAmJlxuICAgIGNoYW5nZXMubW9kaWZpZWQubGVuZ3RoID09PSAwICYmXG4gICAgY2hhbmdlcy5kZWxldGVkLmxlbmd0aCA9PT0gMFxuICApXG4gICAgcmV0dXJuO1xuXG4gIGNvbnNvbGUubG9nKCk7XG5cbiAgaWYgKGNoYW5nZXMubmV3Lmxlbmd0aCA+IDApIHtcbiAgICBjaGFuZ2VzLm5ldy5mb3JFYWNoKGYgPT4gY29uc29sZS5sb2coY2hhbGtge2dyZWVuICAgICAke2Z9fWApKTtcbiAgICBjb25zb2xlLmxvZygpO1xuICB9XG5cbiAgaWYgKGNoYW5nZXMubW9kaWZpZWQubGVuZ3RoID4gMCkge1xuICAgIGNoYW5nZXMubW9kaWZpZWQuZm9yRWFjaChmID0+IGNvbnNvbGUubG9nKGAgICAgJHtmfWApKTtcbiAgICBjb25zb2xlLmxvZygpO1xuICB9XG5cbiAgaWYgKGNoYW5nZXMuZGVsZXRlZC5sZW5ndGggPiAwKSB7XG4gICAgY2hhbmdlcy5kZWxldGVkLmZvckVhY2goZiA9PiBjb25zb2xlLmxvZyhjaGFsa2B7cmVkICAgICAke2Z9fWApKTtcbiAgICBjb25zb2xlLmxvZygpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzd2l0Y2hCcmFuY2gobmFtZSkge1xuICBjb25zdCByZXBvID0gYXdhaXQgc2VhLm9wZW4oKTtcblxuICBpZiAoYXdhaXQgc2VhLm9uQnJhbmNoKHJlcG8sIG5hbWUpKSByZXR1cm47XG5cbiAgaWYgKCEoYXdhaXQgc2VhLmJyYW5jaEV4aXN0cyhyZXBvLCBuYW1lKSkpIHtcbiAgICBjb25zb2xlLmxvZyhgTm8gc3VjaCBicmFuY2ggJyR7bmFtZX0nYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgc2VhLnN0YXNoQ2hhbmdlcyhyZXBvKTtcbiAgYXdhaXQgc2VhLmNoZWNrb3V0QnJhbmNoKHJlcG8sIG5hbWUpO1xuICBhd2FpdCBzZWEudW5zdGFzaENoYW5nZXMocmVwbywgbmFtZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jQnJhbmNoKCkge1xuICBjb25zdCByZXBvID0gYXdhaXQgc2VhLm9wZW4oKTtcblxuICBjb25zdCBicmFuY2ggPSBhd2FpdCBzZWEuY3VycmVudEJyYW5jaE5hbWUocmVwbyk7XG4gIGF3YWl0IHNlYS5zdGFzaENoYW5nZXMocmVwbyk7XG5cbiAgY29uc3Qgc3Bpbm5lciA9IG9yYShgRW51bWVyYXRpbmcgcmVtb3RlIGJyYW5jaGVzYCkuc3RhcnQoKTtcbiAgaWYgKGF3YWl0IHNlYS5yZW1vdGVCcmFuY2hFeGlzdHMocmVwbywgYnJhbmNoKSkge1xuICAgIHNwaW5uZXIudGV4dCA9IGBQdWxsaW5nIG9yaWdpbi8ke2JyYW5jaH1gO1xuICAgIGlmICghKGF3YWl0IHNlYS5wdWxsUmVtb3RlKHJlcG8sIGJyYW5jaCkpKSB7XG4gICAgICBzcGlubmVyLnN0b3AoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBzcGlubmVyLnRleHQgPSBgUHVzaGluZyBvcmlnaW4vJHticmFuY2h9YDtcbiAgYXdhaXQgc2VhLnB1c2hSZW1vdGUocmVwbywgYnJhbmNoKTtcbiAgc3Bpbm5lci5zdG9wKCk7XG5cbiAgYXdhaXQgc2VhLnVuc3Rhc2hDaGFuZ2VzKHJlcG8sIGJyYW5jaCk7XG59XG4iXX0=