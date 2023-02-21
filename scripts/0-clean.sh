#!/usr/bin/env bash
set -euox

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
ROOT_PATH="${SCRIPT_PATH%/*}"
source "$SCRIPT_PATH/vars.sh"

pushd "$ROOT_PATH"
rm -rf build deps release sdk sea/bin sea/obj
popd