#!/usr/bin/env bash
set -euxo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

if [ "$OPERATING_SYSTEM" = "win" ]; then
    LIB_EXT=".lib"
    EXE_EXT=".exe"
else
    LIB_EXT=".a"
    EXE_EXT=""
fi

if [ ! -d "$RUNTIME_PATH/artifacts" ]; then
    if [ "$OPERATING_SYSTEM" = "win" ]; then
        "$RUNTIME_PATH/build.cmd" -subset clr -c $CONFIGURATION
    else
        "$RUNTIME_PATH/build.sh" -subset clr -c $CONFIGURATION --ninja
    fi
fi

# Sea

DOTNET_ROOT="$SDK_PATH"
PATH="$DOTNET_ROOT:$BUILD_PATH:$PATH"
export NUGET_PACKAGES="$DEPS_PATH/packages"

dotnet publish "$ROOT_PATH/sea/sea.csproj" -o "$BUILD_PATH" -c Release

if [ "$OPERATING_SYSTEM" != "win" ]; then
    strip "$BUILD_PATH"/sea
fi

# Third-Party

mkdir -p "$BUILD_PATH"/third-party/{ref/,tools/ilc,aot/{framework/,sdk/}}

REF_FILES=("$SDK_PATH"/packs/Microsoft.NETCore.App.Ref/8.0.0-preview.2.23116.1/ref/net8.0/*.dll)

cp "${REF_FILES[@]}" "$BUILD_PATH/third-party/ref"

FRAMEWORK_FILES=("$DEPS_PATH"/packages/runtime."$OPERATING_SYSTEM"-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.dll)

if [ "$OPERATING_SYSTEM" != "win" ]; then
    FRAMEWORK_FILES+=("$DEPS_PATH"/packages/runtime."$OPERATING_SYSTEM"-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*"$LIB_EXT")
fi

cp "${FRAMEWORK_FILES[@]}" "$BUILD_PATH/third-party/aot/framework"

#cp -r $DEPS_PATH/packages/runtime."$OPERATING_SYSTEM"-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/tools/* \
#    "$BUILD_PATH/third-party/tools/ilc"

cp -r $RUNTIME_PATH/artifacts/bin/coreclr/$OPERATING_SYSTEM.x64.Release/ilc/* "$BUILD_PATH/third-party/tools/ilc"

SDK_FILES=("$DEPS_PATH"/packages/runtime."$OPERATING_SYSTEM"-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.dll)
SDK_FILES+=("$DEPS_PATH"/packages/runtime."$OPERATING_SYSTEM"-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*"$LIB_EXT")
SDK_FILES+=("$DEPS_PATH"/packages/microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/build/WindowsAPIs.txt)
SDK_FILES+=("$DEPS_PATH"/packages/microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/build/NativeAOT.natvis)

cp "${SDK_FILES[@]}" "$BUILD_PATH/third-party/aot/sdk"

cp "$RUNTIME_PATH/artifacts/bin/coreclr/$OPERATING_SYSTEM.x64.Release/corerun$EXE_EXT" "$BUILD_PATH/third-party/tools/ilc"

find "$BUILD_PATH" -type f -name '*.pdb' -delete

exit 0

# cp $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.dll "$ROOT_PATH/build/third-party/aot/framework"
# cp $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.a "$ROOT_PATH/build/third-party/aot/framework"

# cp -r $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/tools/* "$ROOT_PATH/build/third-party/tools/ilc"
# cp $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.dll "$ROOT_PATH/build/third-party/aot/sdk"
# cp $ROOT_PATH/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.a "$ROOT_PATH/build/third-party/aot/sdk"

# find "$ROOT_PATH/build" -type f -name '*.pdb' -delete

# if [ ! -d "$ROOT_PATH/release" ]; then
#     mkdir "$ROOT_PATH/release"
# fi

#cp "/sea/meta/LICENSE.txt" "/sea/build/dflat/LICENSE.txt"
#cp "/sea/meta/README.md" "/sea/build/dflat/README.md"
#cp "/sea/meta/third-party/LICENSE.txt" "/sea/build/dflat/third-party/LICENSE.txt"

# archive_filename="$ROOT_PATH/release/sea-0.0.0-$OPERATING_SYSTEM-$ARCHITECTURE.7z"

# if [ -f "$archive_filename" ]; then
#     rm "$archive_filename"
# fi

# pushd build

# echo "Creating archive $archive_filename"

# "$deps_dir/$zip" a -t7z -m0=lzma2 -mx=9 -mfb=273 -ms=8g -mmt=off -mmtf=off -mqs=on -bt -bb3 "$archive_filename" ./*

# popd
