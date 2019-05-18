#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_commander["default"].version('0.0.1').command('new <name>', 'new branch').command('switch <name>', 'switch branch').command('sync', 'sync branch').parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWEtYnJhbmNoLmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJ2ZXJzaW9uIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7QUFDQTs7OztBQUVBQSxzQkFDR0MsT0FESCxDQUNXLE9BRFgsRUFFR0MsT0FGSCxDQUVXLFlBRlgsRUFFeUIsWUFGekIsRUFHR0EsT0FISCxDQUdXLGVBSFgsRUFHNEIsZUFINUIsRUFJR0EsT0FKSCxDQUlXLE1BSlgsRUFJbUIsYUFKbkIsRUFLR0MsS0FMSCxDQUtTQyxPQUFPLENBQUNDLElBTGpCIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5pbXBvcnQgJ0BiYWJlbC9wb2x5ZmlsbCc7XG5pbXBvcnQgcHJvZ3JhbSBmcm9tICdjb21tYW5kZXInO1xuXG5wcm9ncmFtXG4gIC52ZXJzaW9uKCcwLjAuMScpXG4gIC5jb21tYW5kKCduZXcgPG5hbWU+JywgJ25ldyBicmFuY2gnKVxuICAuY29tbWFuZCgnc3dpdGNoIDxuYW1lPicsICdzd2l0Y2ggYnJhbmNoJylcbiAgLmNvbW1hbmQoJ3N5bmMnLCAnc3luYyBicmFuY2gnKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiJdfQ==