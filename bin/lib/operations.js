"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRepository = initRepository;
exports.commitChanges = commitChanges;
exports.newBranch = newBranch;
exports.showChanges = showChanges;
exports.switchBranch = switchBranch;

var _chalk = _interopRequireDefault(require("chalk"));

var _tmpPromise = _interopRequireDefault(require("tmp-promise"));

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
    var repo;
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
            return sea.remoteExists(repo, _conf.default.branch);

          case 10:
            if (!_context3.sent) {
              _context3.next = 15;
              break;
            }

            _context3.next = 13;
            return sea.pullRemote(repo, _conf.default.branch);

          case 13:
            if (_context3.sent) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return");

          case 15:
            _context3.next = 17;
            return sea.stashChanges(repo);

          case 17:
            _context3.next = 19;
            return sea.checkoutBranch(repo, _conf.default.branch);

          case 19:
            _context3.next = 21;
            return sea.createBranch(repo, name);

          case 21:
            _context3.next = 23;
            return sea.checkoutBranch(repo, name);

          case 23:
            console.log("Switched to new branch '".concat(name, "'"));

          case 24:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvb3BlcmF0aW9ucy5qcyJdLCJuYW1lcyI6WyJpbml0UmVwb3NpdG9yeSIsInBhdGgiLCJwcm9jZXNzIiwiY3dkIiwic2VhIiwiaXNSZXBvIiwiaW5pdCIsImNvbnNvbGUiLCJsb2ciLCJjb21taXRDaGFuZ2VzIiwidG1wIiwiZmlsZSIsInRtcGZpbGUiLCJzeXN0ZW0iLCJlZGl0IiwicmVhZEZpbGUiLCJtc2ciLCJjbGVhbnVwIiwib3BlbiIsInJlcG8iLCJjb21taXRJZCIsIm5ld0JyYW5jaCIsIm5hbWUiLCJicmFuY2hFeGlzdHMiLCJyZW1vdGVFeGlzdHMiLCJjb25mIiwiYnJhbmNoIiwicHVsbFJlbW90ZSIsInN0YXNoQ2hhbmdlcyIsImNoZWNrb3V0QnJhbmNoIiwiY3JlYXRlQnJhbmNoIiwic2hvd0NoYW5nZXMiLCJjaGFuZ2VkRmlsZXMiLCJjaGFuZ2VzIiwibmV3IiwibGVuZ3RoIiwibW9kaWZpZWQiLCJkZWxldGVkIiwiZm9yRWFjaCIsImYiLCJjaGFsayIsInN3aXRjaEJyYW5jaCIsIm9uQnJhbmNoIiwidW5zdGFzaENoYW5nZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBRXNCQSxjOzs7Ozs7OzBCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCQyxZQUFBQSxJQUE5QiwyREFBcUNDLE9BQU8sQ0FBQ0MsR0FBUixFQUFyQztBQUFBO0FBQUEsbUJBQ0tDLEdBQUcsQ0FBQ0MsTUFBSixDQUFXSixJQUFYLENBREw7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUEsbUJBRUNHLEdBQUcsQ0FBQ0UsSUFBSixDQUFTTCxJQUFULENBRkQ7O0FBQUE7QUFHTE0sWUFBQUEsT0FBTyxDQUFDQyxHQUFSLDJDQUErQ1AsSUFBL0M7O0FBSEs7QUFBQTtBQUFBO0FB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QUFDbUIsWUFBSixDQUFpQkosSUFBakIsRUFBdUJHLElBQXZCLENBTFA7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNSGYsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLDJCQUErQmMsSUFBL0I7QUFORzs7QUFBQTtBQUFBO0FBQUEsbUJBVUNsQixHQUFHLENBQUN3QixZQUFKLENBQWlCVCxJQUFqQixDQVZEOztBQUFBO0FBQUE7QUFBQSxtQkFXQ2YsR0FBRyxDQUFDeUIsY0FBSixDQUFtQlYsSUFBbkIsRUFBeUJHLElBQXpCLENBWEQ7O0FBQUE7QUFBQTtBQUFBLG1CQVlDbEIsR0FBRyxDQUFDdUMsY0FBSixDQUFtQnhCLElBQW5CLEVBQXlCRyxJQUF6QixDQVpEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHRtcCBmcm9tICd0bXAtcHJvbWlzZSc7XG5cbmltcG9ydCAqIGFzIHNlYSBmcm9tICcuL3NlYSc7XG5pbXBvcnQgKiBhcyBzeXN0ZW0gZnJvbSAnLi9zeXN0ZW0nO1xuaW1wb3J0IGNvbmYgZnJvbSAnLi9jb25mJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRSZXBvc2l0b3J5KHBhdGggPSBwcm9jZXNzLmN3ZCgpKSB7XG4gIGlmIChhd2FpdCBzZWEuaXNSZXBvKHBhdGgpKSByZXR1cm47XG4gIGF3YWl0IHNlYS5pbml0KHBhdGgpO1xuICBjb25zb2xlLmxvZyhgSW5pdGlhbGl6ZWQgZW1wdHkgcmVwb3NpdG9yeSBpbiAke3BhdGh9YCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21taXRDaGFuZ2VzKCkge1xuICBjb25zdCB0bXBmaWxlID0gYXdhaXQgdG1wLmZpbGUoKTtcblxuICBzeXN0ZW0uZWRpdCh0bXBmaWxlLnBhdGgpO1xuICBjb25zdCBtc2cgPSBhd2FpdCBzeXN0ZW0ucmVhZEZpbGUodG1wZmlsZS5wYXRoKTtcblxuICB0bXBmaWxlLmNsZWFudXAoKTtcblxuICBjb25zdCByZXBvID0gYXdhaXQgc2VhLm9wZW4oKTtcbiAgY29uc3QgY29tbWl0SWQgPSBhd2FpdCBzZWEuY29tbWl0Q2hhbmdlcyhyZXBvLCBtc2cpO1xuXG4gIGNvbnNvbGUubG9nKGBDb21taXR0ZWQgJHtjb21taXRJZH1gKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG5ld0JyYW5jaChuYW1lKSB7XG4gIGNvbnN0IHJlcG8gPSBhd2FpdCBzZWEub3BlbigpO1xuXG4gIGlmIChhd2FpdCBzZWEuYnJhbmNoRXhpc3RzKHJlcG8sIG5hbWUpKSB7XG4gICAgY29uc29sZS5sb2coYEJyYW5jaCBleGlzdHMgJyR7bmFtZX0nYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGF3YWl0IHNlYS5yZW1vdGVFeGlzdHMocmVwbywgY29uZi5icmFuY2gpKSB7XG4gICAgaWYgKCEoYXdhaXQgc2VhLnB1bGxSZW1vdGUocmVwbywgY29uZi5icmFuY2gpKSkgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgc2VhLnN0YXNoQ2hhbmdlcyhyZXBvKTtcbiAgYXdhaXQgc2VhLmNoZWNrb3V0QnJhbmNoKHJlcG8sIGNvbmYuYnJhbmNoKTtcbiAgYXdhaXQgc2VhLmNyZWF0ZUJyYW5jaChyZXBvLCBuYW1lKTtcbiAgYXdhaXQgc2VhLmNoZWNrb3V0QnJhbmNoKHJlcG8sIG5hbWUpO1xuXG4gIGNvbnNvbGUubG9nKGBTd2l0Y2hlZCB0byBuZXcgYnJhbmNoICcke25hbWV9J2ApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2hvd0NoYW5nZXMoKSB7XG4gIGNvbnN0IHJlcG8gPSBhd2FpdCBzZWEub3BlbigpO1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBhd2FpdCBzZWEuY2hhbmdlZEZpbGVzKHJlcG8pO1xuXG4gIGlmIChcbiAgICBjaGFuZ2VzLm5ldy5sZW5ndGggPT09IDAgJiZcbiAgICBjaGFuZ2VzLm1vZGlmaWVkLmxlbmd0aCA9PT0gMCAmJlxuICAgIGNoYW5nZXMuZGVsZXRlZC5sZW5ndGggPT09IDBcbiAgKVxuICAgIHJldHVybjtcblxuICBjb25zb2xlLmxvZygpO1xuXG4gIGlmIChjaGFuZ2VzLm5ldy5sZW5ndGggPiAwKSB7XG4gICAgY2hhbmdlcy5uZXcuZm9yRWFjaChmID0+IGNvbnNvbGUubG9nKGNoYWxrYHtncmVlbiAgICAgJHtmfX1gKSk7XG4gICAgY29uc29sZS5sb2coKTtcbiAgfVxuXG4gIGlmIChjaGFuZ2VzLm1vZGlmaWVkLmxlbmd0aCA+IDApIHtcbiAgICBjaGFuZ2VzLm1vZGlmaWVkLmZvckVhY2goZiA9PiBjb25zb2xlLmxvZyhgICAgICR7Zn1gKSk7XG4gICAgY29uc29sZS5sb2coKTtcbiAgfVxuXG4gIGlmIChjaGFuZ2VzLmRlbGV0ZWQubGVuZ3RoID4gMCkge1xuICAgIGNoYW5nZXMuZGVsZXRlZC5mb3JFYWNoKGYgPT4gY29uc29sZS5sb2coY2hhbGtge3JlZCAgICAgJHtmfX1gKSk7XG4gICAgY29uc29sZS5sb2coKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3dpdGNoQnJhbmNoKG5hbWUpIHtcbiAgY29uc3QgcmVwbyA9IGF3YWl0IHNlYS5vcGVuKCk7XG5cbiAgaWYgKGF3YWl0IHNlYS5vbkJyYW5jaChyZXBvLCBuYW1lKSkgcmV0dXJuO1xuXG4gIGlmICghKGF3YWl0IHNlYS5icmFuY2hFeGlzdHMocmVwbywgbmFtZSkpKSB7XG4gICAgY29uc29sZS5sb2coYE5vIHN1Y2ggYnJhbmNoICcke25hbWV9J2ApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IHNlYS5zdGFzaENoYW5nZXMocmVwbyk7XG4gIGF3YWl0IHNlYS5jaGVja291dEJyYW5jaChyZXBvLCBuYW1lKTtcbiAgYXdhaXQgc2VhLnVuc3Rhc2hDaGFuZ2VzKHJlcG8sIG5hbWUpO1xufVxuIl19