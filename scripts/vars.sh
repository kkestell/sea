#!/usr/bin/env bash
set -euo pipefail

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
        (cd '/c/Program Files/Microsoft Visual Studio/2022/Preview/Common7/Tools' && \
            cmd //C "VsDevCmd.bat -no_logo -arch=amd64 -host_arch=amd64 && c:/msys64/usr/bin/bash -c 'printenv $envars'")
    }

    path="$(query_vcvarsall PATH)"
    include="$(query_vcvarsall INCLUDE)"
    lib="$(query_vcvarsall LIB)"

    export PATH=$path
    export INCLUDE=$include
    export LIB=$lib

    # echo "PATH=$PATH"
    # echo
    # echo "INCLUDE=$INCLUDE"
    # echo
    # echo "LIB=$LIB"
    # echo
fi

script_path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export ROOT_PATH="${script_path%/*}"

export DEPS_PATH="$ROOT_PATH/deps"
export SDK_PATH="$DEPS_PATH/sdk"
export RUNTIME_PATH="$DEPS_PATH/runtime"
export ZIP_PATH="$DEPS_PATH/zip"
export META_PATH="$ROOT_PATH/meta"
export BUILD_PATH="$ROOT_PATH/build"
export RELEASE_PATH="$ROOT_PATH/release"
export INSTALLER_PATH="$ROOT_PATH/installer"

sea_version=$(git rev-parse --short HEAD)
export SEA_VERSION=$sea_version
export CONFIGURATION=Release
export OPERATING_SYSTEM=$os
export ARCHITECTURE=x64

# echo "ROOT_PATH=$ROOT_PATH"
# echo "DEPS_PATH=$DEPS_PATH"
# echo "SDK_PATH=$SDK_PATH"
# echo "RUNTIME_PATH=$RUNTIME_PATH"
# echo "ZIP_PATH=$ZIP_PATH"
# echo "META_PATH=$META_PATH"
# echo "BUILD_PATH=$BUILD_PATH"
# echo "RELEASE_PATH=$RELEASE_PATH"
# echo "CONFIGURATION=$CONFIGURATION"
# echo "OPERATING_SYSTEM=$OPERATING_SYSTEM"
# echo "ARCHITECTURE=$ARCHITECTURE"
