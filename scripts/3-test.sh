#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

DOTNET_ROOT="$SDK_PATH"
PATH="$DOTNET_ROOT:$BUILD_PATH:$PATH"

cat <<EOT > hello.cs
Console.WriteLine("Hello, Sea!");
EOT

echo 'Testing build command (small)...'
sea build hello.cs --optimize:small --reflection:false --stacktrace:false --strip --verbosity:diagnostic
# ./hello
# echo $(du -sh hello)

# echo 'Testing build command (default)...'
# sea build hello.cs
# ./hello
# echo $(du -sh hello)

# echo 'Testing run command...'
# sea run hello.cs

rm hello*
