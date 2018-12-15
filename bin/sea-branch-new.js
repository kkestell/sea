#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _commander = _interopRequireDefault(require("commander"));

var _operations = require("./lib/operations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version('0.1.0').arguments('<name>').action(_operations.newBranch).parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWEtYnJhbmNoLW5ldy5qcyJdLCJuYW1lcyI6WyJwcm9ncmFtIiwidmVyc2lvbiIsImFyZ3VtZW50cyIsImFjdGlvbiIsIm5ld0JyYW5jaCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBQSxtQkFDR0MsT0FESCxDQUNXLE9BRFgsRUFFR0MsU0FGSCxDQUVhLFFBRmIsRUFHR0MsTUFISCxDQUdVQyxxQkFIVixFQUlHQyxLQUpILENBSVNDLE9BQU8sQ0FBQ0MsSUFKakIiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJ1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJ1xuaW1wb3J0IHsgbmV3QnJhbmNoIH0gZnJvbSAnLi9saWIvb3BlcmF0aW9ucydcblxucHJvZ3JhbVxuICAudmVyc2lvbignMC4xLjAnKVxuICAuYXJndW1lbnRzKCc8bmFtZT4nKVxuICAuYWN0aW9uKG5ld0JyYW5jaClcbiAgLnBhcnNlKHByb2Nlc3MuYXJndilcbiJdfQ==