#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

DOTNET_ROOT="$SDK_PATH"
PATH="$DOTNET_ROOT:$BUILD_PATH:$PATH"

SEA_ROOT="$BUILD_PATH" dotnet run --project sea/sea.csproj -- "$@"
