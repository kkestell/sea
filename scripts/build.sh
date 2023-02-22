#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
"$SCRIPT_PATH/0-clean.sh"
"$SCRIPT_PATH/1-deps.sh"
"$SCRIPT_PATH/2-build.sh"
"$SCRIPT_PATH/3-test.sh"
"$SCRIPT_PATH/4-release.sh"
