#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _commander = _interopRequireDefault(require("commander"));

var _operations = require("./lib/operations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_commander["default"].version('0.1.0').option('-m, --message <message>', 'specify commit message').action(_operations.commitChanges).parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWEtY29tbWl0LmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJ2ZXJzaW9uIiwib3B0aW9uIiwiYWN0aW9uIiwiY29tbWl0Q2hhbmdlcyIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBQSxzQkFDR0MsT0FESCxDQUNXLE9BRFgsRUFFR0MsTUFGSCxDQUVVLHlCQUZWLEVBRXFDLHdCQUZyQyxFQUdHQyxNQUhILENBR1VDLHlCQUhWLEVBSUdDLEtBSkgsQ0FJU0MsT0FBTyxDQUFDQyxJQUpqQiIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnO1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCB7IGNvbW1pdENoYW5nZXMgfSBmcm9tICcuL2xpYi9vcGVyYXRpb25zJztcblxucHJvZ3JhbVxuICAudmVyc2lvbignMC4xLjAnKVxuICAub3B0aW9uKCctbSwgLS1tZXNzYWdlIDxtZXNzYWdlPicsICdzcGVjaWZ5IGNvbW1pdCBtZXNzYWdlJylcbiAgLmFjdGlvbihjb21taXRDaGFuZ2VzKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiJdfQ==