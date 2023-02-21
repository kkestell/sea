#!/usr/bin/env bash
set -euox

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
ROOT_PATH="${SCRIPT_PATH%/*}"
source "$SCRIPT_PATH/vars.sh"

dotnet publish "$ROOT_PATH/sea/sea.csproj" -o "$ROOT_PATH/build"

mkdir -p $ROOT_PATH/build/third-party/{ref/,tools/ilc,aot/{framework/,sdk/}}

cp $ROOT_PATH/sdk/packs/Microsoft.NETCore.App.Ref/8.0.0-preview.2.23116.1/ref/net8.0/*.dll "$ROOT_PATH/build/third-party/ref"

cp $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.dll "$ROOT_PATH/build/third-party/aot/framework"
cp $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.a "$ROOT_PATH/build/third-party/aot/framework"

cp -r $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/tools/* "$ROOT_PATH/build/third-party/tools/ilc"
cp $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.dll "$ROOT_PATH/build/third-party/aot/sdk"
cp $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.a "$ROOT_PATH/build/third-party/aot/sdk"

find "$ROOT_PATH/build" -type f -name '*.pdb' -delete

if [ ! -d "$ROOT_PATH/release" ]; then
    mkdir "$ROOT_PATH/release"
fi

#cp "/sea/meta/LICENSE.txt" "/sea/build/dflat/LICENSE.txt"
#cp "/sea/meta/README.md" "/sea/build/dflat/README.md"
#cp "/sea/meta/third-party/LICENSE.txt" "/sea/build/dflat/third-party/LICENSE.txt"

archive_filename="$ROOT_PATH/release/sea-0.0.0-$OPERATING_SYSTEM-$ARCHITECTURE.7z"

if [ -f "$archive_filename" ]; then
    rm "$archive_filename"
fi

pushd build

# echo "Creating archive $archive_filename"

# "$deps_dir/$zip" a -t7z -m0=lzma2 -mx=9 -mfb=273 -ms=8g -mmt=off -mmtf=off -mqs=on -bt -bb3 "$archive_filename" ./*

# popd
