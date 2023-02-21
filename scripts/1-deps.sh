#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

if [ ! -d "$ZIP_PATH" ]; then
    mkdir -p "$ZIP_PATH"
    if [ "$OPERATING_SYSTEM" = "linux" ]; then
        wget -O - https://www.7-zip.org/a/7z2201-linux-x64.tar.xz | tar -xJ -C "$ZIP_PATH"
    elif [ "$OPERATING_SYSTEM" = "osx" ]; then
        wget -O - https://7-zip.org/a/7z2107-mac.tar.xz | tar -xJ -C "$ZIP_PATH"
    elif [ "$OPERATING_SYSTEM" = "win" ]; then
        wget https://www.7-zip.org/a/7zr.exe -O "$ZIP_PATH/7zr.exe"
    fi
fi

if [ ! -d "$RUNTIME_PATH" ]; then
    git clone --depth 1 --branch v8.0.0-preview.1.23110.8 https://github.com/dotnet/runtime.git "$RUNTIME_PATH"
fi

if [ ! -d "$SDK_PATH" ]; then
    mkdir -p "$SDK_PATH"
    if [ "$OPERATING_SYSTEM" = "linux" ]; then
        URL='https://aka.ms/dotnet/8.0.1xx/daily/dotnet-sdk-linux-x64.tar.gz'
        curl -L "$URL" | tar -xz -C "$SDK_PATH"
    elif [ "$OPERATING_SYSTEM" = "osx" ]; then
        URL='https://aka.ms/dotnet/8.0.1xx/daily/dotnet-sdk-osx-x64.tar.gz'
        curl -L "$URL" | tar -xz -C "$SDK_PATH"
    elif [ "$OPERATING_SYSTEM" = "win" ]; then
        URL='https://aka.ms/dotnet/8.0.1xx/daily/dotnet-sdk-win-x64.zip'
        curl -L "$URL" -o "$SDK_PATH/dotnet-sdk-win-x64.zip"
        unzip "$SDK_PATH/dotnet-sdk-win-x64.zip" -d "$SDK_PATH"
        rm "$SDK_PATH/dotnet-sdk-win-x64.zip"
    fi
fi

dotnet restore "$ROOT_PATH/sea/sea.csproj"
