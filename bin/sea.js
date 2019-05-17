#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_commander["default"].version('0.0.1').command('init [path]', 'initialize repository').command('branch <cmd>', 'branching').command('changes', 'display changes').command('commit', 'commit changes').parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWEuanMiXSwibmFtZXMiOlsicHJvZ3JhbSIsInZlcnNpb24iLCJjb21tYW5kIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiJdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUVBOztBQUNBOzs7O0FBRUFBLHNCQUNHQyxPQURILENBQ1csT0FEWCxFQUVHQyxPQUZILENBRVcsYUFGWCxFQUUwQix1QkFGMUIsRUFHR0EsT0FISCxDQUdXLGNBSFgsRUFHMkIsV0FIM0IsRUFJR0EsT0FKSCxDQUlXLFNBSlgsRUFJc0IsaUJBSnRCLEVBS0dBLE9BTEgsQ0FLVyxRQUxYLEVBS3FCLGdCQUxyQixFQU1HQyxLQU5ILENBTVNDLE9BQU8sQ0FBQ0MsSUFOakIiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJ1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJ1xuXG5wcm9ncmFtXG4gIC52ZXJzaW9uKCcwLjAuMScpXG4gIC5jb21tYW5kKCdpbml0IFtwYXRoXScsICdpbml0aWFsaXplIHJlcG9zaXRvcnknKVxuICAuY29tbWFuZCgnYnJhbmNoIDxjbWQ+JywgJ2JyYW5jaGluZycpXG4gIC5jb21tYW5kKCdjaGFuZ2VzJywgJ2Rpc3BsYXkgY2hhbmdlcycpXG4gIC5jb21tYW5kKCdjb21taXQnLCAnY29tbWl0IGNoYW5nZXMnKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KVxuIl19