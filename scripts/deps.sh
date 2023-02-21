#!/usr/bin/env bash
set -euox

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
ROOT_PATH="${SCRIPT_PATH%/*}"
source "$SCRIPT_PATH/vars.sh"

if [ ! -d "$ROOT_PATH/sdk" ]; then
    mkdir "$ROOT_PATH/sdk"
    curl -L https://aka.ms/dotnet/8.0.1xx/daily/dotnet-sdk-linux-x64.tar.gz | tar -xz -C "$ROOT_PATH/sdk"
fi

export DOTNET_ROOT="$ROOT_PATH/sdk"
export PATH="$DOTNET_ROOT:$PATH"

deps_dir="$ROOT_PATH/deps"
mkdir -p "$deps_dir"

if [ "$OPERATING_SYSTEM" = "windows" ]; then
    zip="7zr.exe"
else
    zip="7zz"
fi

if [ ! -f "$deps_dir/$zip" ]; then
    if [ "$OPERATING_SYSTEM" = "osx" ]; then
        wget -O - https://7-zip.org/a/7z2107-mac.tar.xz | tar -xJ -C "$deps_dir"
    elif [ "$OPERATING_SYSTEM" = "windows" ]; then
        wget https://www.7-zip.org/a/7zr.exe -O "$deps_dir/$zip"
    elif [ "$OPERATING_SYSTEM" = "linux" ]; then
        wget -O - https://www.7-zip.org/a/7z2201-linux-x64.tar.xz | tar -xJ -C "$deps_dir"
    fi
fi

export RestorePackagesPath="$ROOT_PATH/.nuget/packages"
dotnet restore "$ROOT_PATH/sea/sea.csproj"
