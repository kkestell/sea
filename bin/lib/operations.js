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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvb3BlcmF0aW9ucy5qcyJdLCJuYW1lcyI6WyJpbml0UmVwb3NpdG9yeSIsInBhdGgiLCJwcm9jZXNzIiwiY3dkIiwic2VhIiwiaXNSZXBvIiwiaW5pdCIsImNvbnNvbGUiLCJsb2ciLCJjb21taXRDaGFuZ2VzIiwib3B0aW9ucyIsImNvbW1pdE1lc3NhZ2UiLCJtZXNzYWdlIiwidG1wIiwiZmlsZSIsInRtcGZpbGUiLCJzeXN0ZW0iLCJlZGl0IiwicmVhZEZpbGUiLCJjbGVhbnVwIiwib3BlbiIsInJlcG8iLCJjb25mIiwibmFtZSIsImVtYWlsIiwiY29tbWl0SWQiLCJuZXdCcmFuY2giLCJicmFuY2hFeGlzdHMiLCJyZW1vdGVFeGlzdHMiLCJzcGlubmVyIiwic3RhcnQiLCJyZW1vdGVCcmFuY2hFeGlzdHMiLCJzdG9wIiwidGV4dCIsImJyYW5jaCIsInB1bGxSZW1vdGUiLCJzdGFzaENoYW5nZXMiLCJjaGVja291dEJyYW5jaCIsImNyZWF0ZUJyYW5jaCIsInNob3dDaGFuZ2VzIiwiY2hhbmdlZEZpbGVzIiwiY2hhbmdlcyIsImxlbmd0aCIsIm1vZGlmaWVkIiwiZGVsZXRlZCIsImZvckVhY2giLCJmIiwiY2hhbGsiLCJzd2l0Y2hCcmFuY2giLCJvbkJyYW5jaCIsInVuc3Rhc2hDaGFuZ2VzIiwic3luY0JyYW5jaCIsImN1cnJlbnRCcmFuY2hOYW1lIiwicHVzaFJlbW90ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBRXNCQSxjOzs7Ozs7OzBCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCQyxZQUFBQSxJQUE5QiwyREFBcUNDLE9BQU8sQ0FBQ0MsR0FBUixFQUFyQztBQUFBO0FBQUEsbUJBQ0tDLEdBQUcsQ0FBQ0MsTUFBSixDQUFXSixJQUFYLENBREw7O0FBQUE7QUFBQTtBQUFB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dGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHRtcCBmcm9tICd0bXAtcHJvbWlzZSc7XG5pbXBvcnQgb3JhIGZyb20gJ29yYSc7XG5cbmltcG9ydCAqIGFzIHNlYSBmcm9tICcuL3NlYSc7XG5pbXBvcnQgKiBhcyBzeXN0ZW0gZnJvbSAnLi9zeXN0ZW0nO1xuaW1wb3J0IGNvbmYgZnJvbSAnLi9jb25mJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRSZXBvc2l0b3J5KHBhdGggPSBwcm9jZXNzLmN3ZCgpKSB7XG4gIGlmIChhd2FpdCBzZWEuaXNSZXBvKHBhdGgpKSByZXR1cm47XG4gIGF3YWl0IHNlYS5pbml0KHBhdGgpO1xuICBjb25zb2xlLmxvZyhgSW5pdGlhbGl6ZWQgZW1wdHkgcmVwb3NpdG9yeSBpbiAke3BhdGh9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21taXRDaGFuZ2VzKG9wdGlvbnMpIHtcbiAgbGV0IGNvbW1pdE1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG5cbiAgaWYgKCFjb21taXRNZXNzYWdlKSB7XG4gICAgY29uc3QgdG1wZmlsZSA9IGF3YWl0IHRtcC5maWxlKCk7XG5cbiAgICBzeXN0ZW0uZWRpdCh0bXBmaWxlLnBhdGgpO1xuICAgIGNvbW1pdE1lc3NhZ2UgPSBhd2FpdCBzeXN0ZW0ucmVhZEZpbGUodG1wZmlsZS5wYXRoKTtcblxuICAgIHRtcGZpbGUuY2xlYW51cCgpO1xuICB9XG5cbiAgY29uc3QgcmVwbyA9IGF3YWl0IHNlYS5vcGVuKCk7XG4gIGNvbnN0IGNvbW1pdElkID0gYXdhaXQgc2VhLmNvbW1pdENoYW5nZXMoXG4gICAgcmVwbyxcbiAgICBjb21taXRNZXNzYWdlLFxuICAgIGNvbmYubmFtZSxcbiAgICBjb25mLmVtYWlsXG4gICk7XG5cbiAgY29uc29sZS5sb2coYENvbW1pdHRlZCAke2NvbW1pdElkfWApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbmV3QnJhbmNoKG5hbWUpIHtcbiAgY29uc3QgcmVwbyA9IGF3YWl0IHNlYS5vcGVuKCk7XG5cbiAgaWYgKGF3YWl0IHNlYS5icmFuY2hFeGlzdHMocmVwbywgbmFtZSkpIHtcbiAgICBjb25zb2xlLmxvZyhgQnJhbmNoIGV4aXN0cyAnJHtuYW1lfSdgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoYXdhaXQgc2VhLnJlbW90ZUV4aXN0cyhyZXBvKSkge1xuICAgIGNvbnN0IHNwaW5uZXIgPSBvcmEoJ0VudW1lcmF0aW5nIHJlbW90ZSBicmFuY2hlcycpLnN0YXJ0KCk7XG5cbiAgICBpZiAoYXdhaXQgc2VhLnJlbW90ZUJyYW5jaEV4aXN0cyhyZXBvLCBuYW1lKSkge1xuICAgICAgc3Bpbm5lci5zdG9wKCk7XG4gICAgICBjb25zb2xlLmxvZyhgQnJhbmNoIGV4aXN0cyAnJHtuYW1lfSdgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzcGlubmVyLnRleHQgPSBgUHVsbGluZyBmcm9tIG9yaWdpbi8ke2NvbmYuYnJhbmNofWA7XG4gICAgaWYgKCEoYXdhaXQgc2VhLnB1bGxSZW1vdGUocmVwbywgY29uZi5icmFuY2gpKSkge1xuICAgICAgc3Bpbm5lci5zdG9wKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNwaW5uZXIuc3RvcCgpO1xuICB9XG5cbiAgYXdhaXQgc2VhLnN0YXNoQ2hhbmdlcyhyZXBvKTtcbiAgYXdhaXQgc2VhLmNoZWNrb3V0QnJhbmNoKHJlcG8sIGNvbmYuYnJhbmNoKTtcbiAgYXdhaXQgc2VhLmNyZWF0ZUJyYW5jaChyZXBvLCBuYW1lKTtcbiAgYXdhaXQgc2VhLmNoZWNrb3V0QnJhbmNoKHJlcG8sIG5hbWUpO1xuXG4gIGNvbnNvbGUubG9nKGBTd2l0Y2hlZCB0byBuZXcgYnJhbmNoICcke25hbWV9J2ApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2hvd0NoYW5nZXMoKSB7XG4gIGNvbnN0IHJlcG8gPSBhd2FpdCBzZWEub3BlbigpO1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBhd2FpdCBzZWEuY2hhbmdlZEZpbGVzKHJlcG8pO1xuXG4gIGlmIChcbiAgICBjaGFuZ2VzLm5ldy5sZW5ndGggPT09IDAgJiZcbiAgICBjaGFuZ2VzLm1vZGlmaWVkLmxlbmd0aCA9PT0gMCAmJlxuICAgIGNoYW5nZXMuZGVsZXRlZC5sZW5ndGggPT09IDBcbiAgKVxuICAgIHJldHVybjtcblxuICBjb25zb2xlLmxvZygpO1xuXG4gIGlmIChjaGFuZ2VzLm5ldy5sZW5ndGggPiAwKSB7XG4gICAgY2hhbmdlcy5uZXcuZm9yRWFjaChmID0+IGNvbnNvbGUubG9nKGNoYWxrYHtncmVlbiAgICAgJHtmfX1gKSk7XG4gICAgY29uc29sZS5sb2coKTtcbiAgfVxuXG4gIGlmIChjaGFuZ2VzLm1vZGlmaWVkLmxlbmd0aCA+IDApIHtcbiAgICBjaGFuZ2VzLm1vZGlmaWVkLmZvckVhY2goZiA9PiBjb25zb2xlLmxvZyhgICAgICR7Zn1gKSk7XG4gICAgY29uc29sZS5sb2coKTtcbiAgfVxuXG4gIGlmIChjaGFuZ2VzLmRlbGV0ZWQubGVuZ3RoID4gMCkge1xuICAgIGNoYW5nZXMuZGVsZXRlZC5mb3JFYWNoKGYgPT4gY29uc29sZS5sb2coY2hhbGtge3JlZCAgICAgJHtmfX1gKSk7XG4gICAgY29uc29sZS5sb2coKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3dpdGNoQnJhbmNoKG5hbWUpIHtcbiAgY29uc3QgcmVwbyA9IGF3YWl0IHNlYS5vcGVuKCk7XG5cbiAgaWYgKGF3YWl0IHNlYS5vbkJyYW5jaChyZXBvLCBuYW1lKSkgcmV0dXJuO1xuXG4gIGlmICghKGF3YWl0IHNlYS5icmFuY2hFeGlzdHMocmVwbywgbmFtZSkpKSB7XG4gICAgY29uc29sZS5sb2coYE5vIHN1Y2ggYnJhbmNoICcke25hbWV9J2ApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IHNlYS5zdGFzaENoYW5nZXMocmVwbyk7XG4gIGF3YWl0IHNlYS5jaGVja291dEJyYW5jaChyZXBvLCBuYW1lKTtcbiAgYXdhaXQgc2VhLnVuc3Rhc2hDaGFuZ2VzKHJlcG8sIG5hbWUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3luY0JyYW5jaCgpIHtcbiAgY29uc3QgcmVwbyA9IGF3YWl0IHNlYS5vcGVuKCk7XG5cbiAgY29uc3QgYnJhbmNoID0gYXdhaXQgc2VhLmN1cnJlbnRCcmFuY2hOYW1lKHJlcG8pO1xuICBhd2FpdCBzZWEuc3Rhc2hDaGFuZ2VzKHJlcG8pO1xuXG4gIGNvbnN0IHNwaW5uZXIgPSBvcmEoYEVudW1lcmF0aW5nIHJlbW90ZSBicmFuY2hlc2ApLnN0YXJ0KCk7XG4gIGlmIChhd2FpdCBzZWEucmVtb3RlQnJhbmNoRXhpc3RzKHJlcG8sIGJyYW5jaCkpIHtcbiAgICBzcGlubmVyLnRleHQgPSBgUHVsbGluZyBvcmlnaW4vJHticmFuY2h9YDtcbiAgICBpZiAoIShhd2FpdCBzZWEucHVsbFJlbW90ZShyZXBvLCBicmFuY2gpKSkge1xuICAgICAgc3Bpbm5lci5zdG9wKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgc3Bpbm5lci50ZXh0ID0gYFB1c2hpbmcgb3JpZ2luLyR7YnJhbmNofWA7XG4gIGF3YWl0IHNlYS5wdXNoUmVtb3RlKHJlcG8sIGJyYW5jaCk7XG4gIHNwaW5uZXIuc3RvcCgpO1xuXG4gIGF3YWl0IHNlYS51bnN0YXNoQ2hhbmdlcyhyZXBvLCBicmFuY2gpO1xufVxuIl19