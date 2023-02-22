#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
ROOT_PATH="${SCRIPT_PATH%/*}"
source "$SCRIPT_PATH/vars.sh"

if [ ! -d "$ROOT_PATH/release" ]; then
    mkdir "$ROOT_PATH/release"
fi

cp "$META_PATH/LICENSE.txt" "$BUILD_PATH/LICENSE.txt"
cp "$META_PATH/README.md" "$BUILD_PATH/README.md"
cp "$META_PATH/third-party/LICENSE.txt" "$BUILD_PATH/third-party/LICENSE.txt"

ARCHIVE="$RELEASE_PATH/sea-$VERSION-$OPERATING_SYSTEM-$ARCHITECTURE.7z"

if [ -f "$ARCHIVE" ]; then
    rm "$ARCHIVE"
fi

pushd "$BUILD_PATH"

if [ "$OPERATING_SYSTEM" = "windows" ]; then
    ZIP="$ZIP_PATH/7zr.exe"
else
    ZIP="$ZIP_PATH/7zz"
fi

echo "Compressing $ARCHIVE..."

"$ZIP" a -t7z -m0=lzma2 -mx=9 -mfb=273 -ms=8g -mmt=off -mmtf=off -mqs=on -bt -bb3 "$ARCHIVE" ./*

popd
