#!/usr/bin/env bash
set -euox

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
ROOT_PATH="${SCRIPT_PATH%/*}"
source "$SCRIPT_PATH/vars.sh"

echo 'System.Console.WriteLine("Hello World");' > hello.cs

"$ROOT_PATH/build/sea" build hello.cs -o hello -s

./hello

rm hello hello.*