#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _commander = _interopRequireDefault(require("commander"));

var _operations = require("./lib/operations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_commander["default"].version('0.1.0').action(_operations.syncBranch).parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWEtYnJhbmNoLXN5bmMuanMiXSwibmFtZXMiOlsicHJvZ3JhbSIsInZlcnNpb24iLCJhY3Rpb24iLCJzeW5jQnJhbmNoIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiJdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUFBLHNCQUNHQyxPQURILENBQ1csT0FEWCxFQUVHQyxNQUZILENBRVVDLHNCQUZWLEVBR0dDLEtBSEgsQ0FHU0MsT0FBTyxDQUFDQyxJQUhqQiIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnXG5pbXBvcnQgcHJvZ3JhbSBmcm9tICdjb21tYW5kZXInXG5pbXBvcnQgeyBzeW5jQnJhbmNoIH0gZnJvbSAnLi9saWIvb3BlcmF0aW9ucydcblxucHJvZ3JhbVxuICAudmVyc2lvbignMC4xLjAnKVxuICAuYWN0aW9uKHN5bmNCcmFuY2gpXG4gIC5wYXJzZShwcm9jZXNzLmFyZ3YpXG4iXX0=