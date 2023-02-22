#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

rm -rf "$BUILD_PATH" "$ROOT_PATH"/sea/bin "$ROOT_PATH"/sea/obj
