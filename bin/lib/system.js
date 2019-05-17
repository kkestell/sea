"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edit = edit;
exports.readFile = readFile;

var _fs = _interopRequireDefault(require("fs"));

var _child_process = _interopRequireDefault(require("child_process"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function edit(path) {
  var editor = process.env.EDITOR;

  if (!editor) {
    console.log('Please set EDITOR environment variable');
    return false;
  }

  try {
    _child_process["default"].execSync("".concat(editor, " ").concat(path), {
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
    _fs["default"].readFile(path, 'utf8', function (err, data) {
      if (err) reject(err);else resolve(data.trim());
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc3lzdGVtLmpzIl0sIm5hbWVzIjpbImVkaXQiLCJwYXRoIiwiZWRpdG9yIiwicHJvY2VzcyIsImVudiIsIkVESVRPUiIsImNvbnNvbGUiLCJsb2ciLCJjaGlsZFByb2Nlc3MiLCJleGVjU3luYyIsInN0ZGlvIiwiZXJyb3IiLCJyZWFkRmlsZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnMiLCJlcnIiLCJkYXRhIiwidHJpbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVPLFNBQVNBLElBQVQsQ0FBY0MsSUFBZCxFQUFvQjtBQUN6QixNQUFNQyxNQUFNLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxNQUEzQjs7QUFFQSxNQUFJLENBQUNILE1BQUwsRUFBYTtBQUNYSSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3Q0FBWjtBQUNBLFdBQU8sS0FBUDtBQUNEOztBQUVELE1BQUk7QUFDRkMsOEJBQWFDLFFBQWIsV0FBeUJQLE1BQXpCLGNBQW1DRCxJQUFuQyxHQUEyQztBQUFFUyxNQUFBQSxLQUFLLEVBQUU7QUFBVCxLQUEzQztBQUNELEdBRkQsQ0FFRSxPQUFPQyxLQUFQLEVBQWM7QUFDZEwsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlJLEtBQVo7QUFDQSxXQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFPLElBQVA7QUFDRDs7QUFFTSxTQUFTQyxRQUFULENBQWtCWCxJQUFsQixFQUF3QjtBQUM3QixTQUFPLElBQUlZLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFHSixRQUFILENBQVlYLElBQVosRUFBa0IsTUFBbEIsRUFBMEIsVUFBQ2dCLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQ3ZDLFVBQUlELEdBQUosRUFBU0YsTUFBTSxDQUFDRSxHQUFELENBQU4sQ0FBVCxLQUNLSCxPQUFPLENBQUNJLElBQUksQ0FBQ0MsSUFBTCxFQUFELENBQVA7QUFDTixLQUhEO0FBSUQsR0FMTSxDQUFQO0FBTUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGNoaWxkUHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXQocGF0aCkge1xuICBjb25zdCBlZGl0b3IgPSBwcm9jZXNzLmVudi5FRElUT1I7XG5cbiAgaWYgKCFlZGl0b3IpIHtcbiAgICBjb25zb2xlLmxvZygnUGxlYXNlIHNldCBFRElUT1IgZW52aXJvbm1lbnQgdmFyaWFibGUnKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cnkge1xuICAgIGNoaWxkUHJvY2Vzcy5leGVjU3luYyhgJHtlZGl0b3J9ICR7cGF0aH1gLCB7IHN0ZGlvOiAnaW5oZXJpdCcgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEZpbGUocGF0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGZzLnJlYWRGaWxlKHBhdGgsICd1dGY4JywgKGVyciwgZGF0YSkgPT4ge1xuICAgICAgaWYgKGVycikgcmVqZWN0KGVycik7XG4gICAgICBlbHNlIHJlc29sdmUoZGF0YS50cmltKCkpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==