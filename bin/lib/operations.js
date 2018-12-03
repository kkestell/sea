"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.branch = branch;
exports.changes = changes;
exports.checkout = checkout;
exports.commit = commit;
exports.rebase = rebase;

var _chalk = _interopRequireDefault(require("chalk"));

var _git = require("./git");

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

function branch(name) {
  (0, _git.stageUntrackedFiles)();
  (0, _git.stashChanges)();
  (0, _git.updateDefaultBranch)();
  (0, _git.checkoutNewBranch)(name);
  (0, _git.checkoutBranch)(name);
}

function changes() {
  var u = (0, _git.untrackedFiles)();
  var m = (0, _git.modifiedFiles)();
  var d = (0, _git.deletedFiles)();
  console.log();

  if (u.length > 0) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = u[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var f = _step.value;
        console.log((0, _chalk.default)(_templateObject(), f));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    console.log();
  }

  if (m.length > 0) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = m[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _f = _step2.value;
        // Ignore files which have been deleted
        if (!d.includes(_f)) console.log("    ".concat(_f));
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    console.log();
  }

  if (d.length > 0) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = d[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _f2 = _step3.value;
        console.log((0, _chalk.default)(_templateObject2(), _f2));
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    console.log();
  }
}

function checkout(name) {
  (0, _git.stageUntrackedFiles)();
  (0, _git.stashChanges)();
  (0, _git.checkoutBranch)(name);
  (0, _git.unstashChanges)(name);
  (0, _git.unstageUntrackedFiles)();
}

function commit(message) {
  (0, _git.stageUntrackedFiles)();
  (0, _git.commitChanges)(message);
}

function rebase(cmd) {
  (0, _git.updateDefaultBranch)();
  var stash = !(0, _git.workingDirectoryClean)();
  if (stash) (0, _git.pushStash)();
  (0, _git.rebaseCurrentBranch)(cmd.interactive);
  if (stash) (0, _git.popStash)();
}