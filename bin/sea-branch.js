#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version('0.0.1').command('new <name>', 'new branch').command('switch <name>', 'switch branch').parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWEtYnJhbmNoLmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJ2ZXJzaW9uIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7QUFDQTs7OztBQUVBQSxtQkFDR0MsT0FESCxDQUNXLE9BRFgsRUFFR0MsT0FGSCxDQUVXLFlBRlgsRUFFeUIsWUFGekIsRUFHR0EsT0FISCxDQUdXLGVBSFgsRUFHNEIsZUFINUIsRUFJR0MsS0FKSCxDQUlTQyxPQUFPLENBQUNDLElBSmpCIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5pbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCdcbmltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcidcblxucHJvZ3JhbVxuICAudmVyc2lvbignMC4wLjEnKVxuICAuY29tbWFuZCgnbmV3IDxuYW1lPicsICduZXcgYnJhbmNoJylcbiAgLmNvbW1hbmQoJ3N3aXRjaCA8bmFtZT4nLCAnc3dpdGNoIGJyYW5jaCcpXG4gIC5wYXJzZShwcm9jZXNzLmFyZ3YpXG4iXX0=