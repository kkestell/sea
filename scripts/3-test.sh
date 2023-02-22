#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

DOTNET_ROOT="$SDK_PATH"
PATH="$DOTNET_ROOT:$BUILD_PATH:$PATH"

echo 'System.Console.WriteLine("Hello World!");' > hello.cs
echo 'Testing build command...'
sea build hello.cs
./hello
echo 'Testing run command...'
sea run hello.cs
rm hello*
