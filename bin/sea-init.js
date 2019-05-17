#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _commander = _interopRequireDefault(require("commander"));

var _operations = require("./lib/operations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_commander["default"].version('0.1.0').arguments('[path]').action(_operations.initRepository).parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWEtaW5pdC5qcyJdLCJuYW1lcyI6WyJwcm9ncmFtIiwidmVyc2lvbiIsImFyZ3VtZW50cyIsImFjdGlvbiIsImluaXRSZXBvc2l0b3J5IiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiJdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUFBLHNCQUNHQyxPQURILENBQ1csT0FEWCxFQUVHQyxTQUZILENBRWEsUUFGYixFQUdHQyxNQUhILENBR1VDLDBCQUhWLEVBSUdDLEtBSkgsQ0FJU0MsT0FBTyxDQUFDQyxJQUpqQiIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnXG5pbXBvcnQgcHJvZ3JhbSBmcm9tICdjb21tYW5kZXInXG5pbXBvcnQgeyBpbml0UmVwb3NpdG9yeSB9IGZyb20gJy4vbGliL29wZXJhdGlvbnMnXG5cbnByb2dyYW1cbiAgLnZlcnNpb24oJzAuMS4wJylcbiAgLmFyZ3VtZW50cygnW3BhdGhdJylcbiAgLmFjdGlvbihpbml0UmVwb3NpdG9yeSlcbiAgLnBhcnNlKHByb2Nlc3MuYXJndilcbiJdfQ==