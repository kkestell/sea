"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edit = edit;
exports.readFile = readFile;

var _fs = _interopRequireDefault(require("fs"));

var _child_process = _interopRequireDefault(require("child_process"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function edit(path) {
  var editor = process.env.EDITOR;

  if (!editor) {
    console.log('Please set EDITOR environment variable');
    return false;
  }

  try {
    _child_process.default.execSync("".concat(editor, " ").concat(path), {
      stdio: 'inherit'
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
}

function readFile(path) {
  return new Promise(function (resolve, reject) {
    _fs.default.readFile(path, 'utf8', function (err, data) {
      if (err) reject(err);else resolve(data.trim());
    });
  });
}