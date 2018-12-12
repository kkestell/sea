"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newBranch = newBranch;
exports.switchBranch = switchBranch;

var _repository = _interopRequireDefault(require("./repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            return repo.pullRemote('master');

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
            return repo.checkoutBranch('master');

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

function switchBranch(_x2) {
  return _switchBranch.apply(this, arguments);
}

function _switchBranch() {
  _switchBranch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(name) {
    var repo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _repository.default.open();

          case 2:
            repo = _context2.sent;
            _context2.next = 5;
            return repo.onBranch(name);

          case 5:
            if (!_context2.sent) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return");

          case 7:
            _context2.next = 9;
            return repo.branchExists(name);

          case 9:
            if (_context2.sent) {
              _context2.next = 12;
              break;
            }

            console.log('No such branch');
            return _context2.abrupt("return");

          case 12:
            _context2.next = 14;
            return repo.stashChanges();

          case 14:
            _context2.next = 16;
            return repo.checkoutBranch(name);

          case 16:
            _context2.next = 18;
            return repo.unstashChanges(name);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _switchBranch.apply(this, arguments);
}