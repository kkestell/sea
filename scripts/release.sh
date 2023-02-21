#!/usr/bin/env bash
set -euox

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
ROOT_PATH="${SCRIPT_PATH%/*}"
source "$SCRIPT_PATH/vars.sh"

if [ ! -d "$ROOT_PATH/release" ]; then
    mkdir "$ROOT_PATH/release"
fi

# cp "/sea/meta/LICENSE.txt" "/sea/build/dflat/LICENSE.txt"
# cp "/sea/meta/README.md" "/sea/build/dflat/README.md"
# cp "/sea/meta/third-party/LICENSE.txt" "/sea/build/dflat/third-party/LICENSE.txt"

archive_filename="$ROOT_PATH/release/sea-0.0.0-$OPERATING_SYSTEM-$ARCHITECTURE.7z"

if [ -f "$archive_filename" ]; then
    rm "$archive_filename"
fi

pushd build

echo "Creating archive $archive_filename"

if [ "$OPERATING_SYSTEM" = "linux" ]; then
    ZIP="$ZIP_PATH/7zr"
elif [ "$OPERATING_SYSTEM" = "osx" ]; then
    exit 1
elif [ "$OPERATING_SYSTEM" = "win" ]; then
    ZIP="$ZIP_PATH/7zr.exe"
fi

"$ZIP" a -t7z -m0=lzma2 -mx=9 -mfb=273 -ms=8g -mmt=off -mmtf=off -mqs=on -bt -bb3 "$archive_filename" ./*

popd
