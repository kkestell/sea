"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newBranch = newBranch;
exports.showChanges = showChanges;
exports.switchBranch = switchBranch;

var _chalk = _interopRequireDefault(require("chalk"));

var _repository = _interopRequireDefault(require("./repository"));

var _conf = _interopRequireDefault(require("./conf"));

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

function newBranch(_x) {
  return _newBranch.apply(this, arguments);
}

function _newBranch() {
  _newBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(name) {
    var repo;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _repository.default.open();

          case 2:
            repo = _context.sent;
            _context.next = 5;
            return repo.branchExists(name);

          case 5:
            if (!_context.sent) {
              _context.next = 8;
              break;
            }

            console.log("Branch exists '".concat(name, "'"));
            return _context.abrupt("return");

          case 8:
            _context.next = 10;
            return repo.pullRemote(_conf.default.branch);

          case 10:
            if (_context.sent) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return");

          case 12:
            _context.next = 14;
            return repo.stashChanges();

          case 14:
            _context.next = 16;
            return repo.checkoutBranch(_conf.default.branch);

          case 16:
            _context.next = 18;
            return repo.createBranch(name);

          case 18:
            _context.next = 20;
            return repo.checkoutBranch(name);

          case 20:
            console.log("Switched to new branch '".concat(name, "'"));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _newBranch.apply(this, arguments);
}

function showChanges() {
  return _showChanges.apply(this, arguments);
}

function _showChanges() {
  _showChanges = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var repo, changes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _repository.default.open();

          case 2:
            repo = _context2.sent;
            _context2.next = 5;
            return repo.changedFiles();

          case 5:
            changes = _context2.sent;
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

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _showChanges.apply(this, arguments);
}

function switchBranch(_x2) {
  return _switchBranch.apply(this, arguments);
}

function _switchBranch() {
  _switchBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(name) {
    var repo;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _repository.default.open();

          case 2:
            repo = _context3.sent;
            _context3.next = 5;
            return repo.onBranch(name);

          case 5:
            if (!_context3.sent) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return");

          case 7:
            _context3.next = 9;
            return repo.branchExists(name);

          case 9:
            if (_context3.sent) {
              _context3.next = 12;
              break;
            }

            console.log("No such branch '".concat(name, "'"));
            return _context3.abrupt("return");

          case 12:
            _context3.next = 14;
            return repo.stashChanges();

          case 14:
            _context3.next = 16;
            return repo.checkoutBranch(name);

          case 16:
            _context3.next = 18;
            return repo.unstashChanges(name);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _switchBranch.apply(this, arguments);
}