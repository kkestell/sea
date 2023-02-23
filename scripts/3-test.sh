#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

DOTNET_ROOT="$SDK_PATH"
PATH="$DOTNET_ROOT:$BUILD_PATH:$PATH"

cat <<EOT > hello.cs
System.Console.WriteLine("Hello, Sea!");
EOT

echo 'Testing build command (default)...'
sea build hello.cs -v
./hello
echo $(du -sh hello)

echo 'Testing build command (small)...'
sea build hello.cs -v --reflection:false --stacktrace:false --debug:false --optimize:small --strip:true --verbose:true
./hello
echo $(du -sh hello)

echo 'Testing run command...'
sea run hello.cs

rm hello*
