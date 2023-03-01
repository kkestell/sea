#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

DOTNET_ROOT="$SDK_PATH"
PATH="$DOTNET_ROOT:$BUILD_PATH:$PATH"

cat <<EOT > "$ROOT_PATH"/examples/hello/hello.cs
Console.WriteLine("Hello, Sea!");
EOT

echo 'Testing build command (small)...'
sea build "$ROOT_PATH"/examples/hello/hello.cs --optimize:small --reflection:false --stacktrace:false --strip --verbosity:diagnostic
./examples/hello/hello
echo $(du -sh ./examples/hello/hello)

echo 'Testing build command (default)...'
sea build "$ROOT_PATH"/examples/hello/hello.cs
./examples/hello/hello
echo $(du -sh ./examples/hello/hello)

echo 'Testing run command...'
sea run "$ROOT_PATH"/examples/hello/hello.cs

rm "$ROOT_PATH"/examples/hello/hello.dll
rm "$ROOT_PATH"/examples/hello/hello.ilc.rsp
rm "$ROOT_PATH"/examples/hello/hello.o
rm "$ROOT_PATH"/examples/hello/hello
