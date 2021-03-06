#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _commander = _interopRequireDefault(require("commander"));

var _operations = require("./lib/operations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_commander["default"].version('0.1.0').arguments('<name>').action(_operations.switchBranch).parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWEtYnJhbmNoLXN3aXRjaC5qcyJdLCJuYW1lcyI6WyJwcm9ncmFtIiwidmVyc2lvbiIsImFyZ3VtZW50cyIsImFjdGlvbiIsInN3aXRjaEJyYW5jaCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBQSxzQkFDR0MsT0FESCxDQUNXLE9BRFgsRUFFR0MsU0FGSCxDQUVhLFFBRmIsRUFHR0MsTUFISCxDQUdVQyx3QkFIVixFQUlHQyxLQUpILENBSVNDLE9BQU8sQ0FBQ0MsSUFKakIiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcbmltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgeyBzd2l0Y2hCcmFuY2ggfSBmcm9tICcuL2xpYi9vcGVyYXRpb25zJztcblxucHJvZ3JhbVxuICAudmVyc2lvbignMC4xLjAnKVxuICAuYXJndW1lbnRzKCc8bmFtZT4nKVxuICAuYWN0aW9uKHN3aXRjaEJyYW5jaClcbiAgLnBhcnNlKHByb2Nlc3MuYXJndik7XG4iXX0=