#!/usr/bin/env bash
set -euox

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
ROOT_PATH="${SCRIPT_PATH%/*}"
source "$SCRIPT_PATH/vars.sh"

if [ ! -d "$SDK_PATH" ]; then
    mkdir -p "$SDK_PATH"
    if [ "$OPERATING_SYSTEM" = "linux" ]; then
        curl -L https://aka.ms/dotnet/8.0.1xx/daily/dotnet-sdk-linux-x64.tar.gz | tar -xz -C "$SDK_PATH"
    elif [ "$OPERATING_SYSTEM" = "osx" ]; then
        curl -L https://aka.ms/dotnet/8.0.1xx/daily/dotnet-sdk-osx-x64.tar.gz | tar -xz -C "$SDK_PATH"
    elif [ "$OPERATING_SYSTEM" = "windows" ]; then
        echo "Unsupported OS!"
        exit 1
    fi
fi

if [ ! -d "$ZIP_PATH" ]; then
    mkdir -p "$ZIP_PATH"
    if [ "$OPERATING_SYSTEM" = "linux" ]; then
        wget -O - https://www.7-zip.org/a/7z2201-linux-x64.tar.xz | tar -xJ -C "$ZIP_PATH"
    elif [ "$OPERATING_SYSTEM" = "osx" ]; then
        wget -O - https://7-zip.org/a/7z2107-mac.tar.xz | tar -xJ -C "$ZIP_PATH"
    elif [ "$OPERATING_SYSTEM" = "windows" ]; then
        wget https://www.7-zip.org/a/7zr.exe -O "$ZIP_PATH/7zr.exe"
    fi
fi

dotnet restore "$ROOT_PATH/sea/sea.csproj"
