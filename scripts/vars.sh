#!/usr/bin/env bash
set -e

uname_out="$(uname -s)"
case "${uname_out}" in
    Linux*)     os=linux;;
    Darwin*)    os=osx;;
    MSYS*)      os=windows;;
    *)          echo "Unsupported OS: ${uname_out}" && exit 1
esac

if [ "$os" = "windows" ]; then
    query_vcvarsall() {
        local envars=$*
        (cd '/c/Program Files/Microsoft Visual Studio/2022/Preview/Common7/Tools' && cmd //C "VsDevCmd.bat -no_logo -arch=amd64 -host_arch=amd64 && c:/msys64/usr/bin/bash -c 'printenv $envars'")
    }

    path="$(query_vcvarsall PATH)"
    include="$(query_vcvarsall INCLUDE)"
    lib="$(query_vcvarsall LIB)"

    export PATH=$path
    export INCLUDE=$include
    export LIB=$lib

    echo "PATH=$PATH"
    echo
    echo "INCLUDE=$INCLUDE"
    echo
    echo "LIB=$LIB"
    echo
fi

export DEPS_PATH="$ROOT_PATH/deps"
export SDK_PATH="$DEPS_PATH/sdk"
export ZIP_PATH="$DEPS_PATH/zip"

export DOTNET_ROOT="$SDK_PATH"
export PATH="$DOTNET_ROOT:$PATH"
export RestorePackagesPath="$ROOT_PATH/.nuget/packages"

export CONFIGURATION=Release
export OPERATING_SYSTEM=$os
export ARCHITECTURE=x64
