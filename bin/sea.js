#!/usr/bin/env node
"use strict";

require("@babel/polyfill");

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version('0.0.1').command('changes', 'display changes').command('commit <message>', 'commit changes').command('branch <name>', 'new branch').command('checkout <name>', 'switch to a branch').command('rebase', 'rebase branch').parse(process.argv);