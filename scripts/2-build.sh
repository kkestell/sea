#!/usr/bin/env bash
set -euxo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

if [ ! -d "$RUNTIME_PATH/artifacts" ]; then
    "$RUNTIME_PATH/build.sh" -subset clr -c $CONFIGURATION
fi

# Sea

DOTNET_ROOT="$SDK_PATH"
PATH="$DOTNET_ROOT:$BUILD_PATH:$PATH"
export NUGET_PACKAGES="$DEPS_PATH/packages"

dotnet publish "$ROOT_PATH/sea/sea.csproj" -o "$BUILD_PATH" -c Release

if [ "$OPERATING_SYSTEM" != "windows" ]; then
    strip "$BUILD_PATH"/sea
fi

# Third-Party

mkdir -p "$BUILD_PATH"/third-party/{ref/,tools/ilc,aot/{framework/,sdk/}}

REF_FILES=("$SDK_PATH"/packs/Microsoft.NETCore.App.Ref/8.0.0-preview.2.23116.1/ref/net8.0/*.dll)
cp "${REF_FILES[@]}" "$BUILD_PATH/third-party/ref"

if [ "$OPERATING_SYSTEM" = "linux" ]; then

    FRAMEWORK_FILES=("$DEPS_PATH"/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.dll)
    FRAMEWORK_FILES+=("$DEPS_PATH"/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.a)
    cp "${FRAMEWORK_FILES[@]}" "$BUILD_PATH/third-party/aot/framework"

    SDK_FILES=("$DEPS_PATH"/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.dll)
    SDK_FILES+=("$DEPS_PATH"/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.lib)
    cp "${SDK_FILES[@]}" "$BUILD_PATH/third-party/aot/sdk"

    cp -r "$RUNTIME_PATH"/artifacts/bin/coreclr/linux.x64.Release/ilc/* "$BUILD_PATH/third-party/tools/ilc"
    cp "$RUNTIME_PATH/artifacts/bin/coreclr/linux.x64.Release/corerun.exe" "$BUILD_PATH/third-party/tools/ilc"

elif [ "$OPERATING_SYSTEM" = "osx" ]; then

    FRAMEWORK_FILES=("$DEPS_PATH"/packages/runtime.osx-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.dll)
    FRAMEWORK_FILES+=("$DEPS_PATH"/packages/runtime.osx-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.a)
    cp "${FRAMEWORK_FILES[@]}" "$BUILD_PATH/third-party/aot/framework"

    SDK_FILES=("$DEPS_PATH"/packages/runtime.osx-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.dll)
    SDK_FILES+=("$DEPS_PATH"/packages/runtime.osx-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.a)
    cp "${SDK_FILES[@]}" "$BUILD_PATH/third-party/aot/sdk"

    cp -r "$RUNTIME_PATH"/artifacts/bin/coreclr/osx.x64.Release/ilc/* "$BUILD_PATH/third-party/tools/ilc"
    cp "$RUNTIME_PATH/artifacts/bin/coreclr/osx.x64.Release/corerun.exe" "$BUILD_PATH/third-party/tools/ilc"

elif [ "$OPERATING_SYSTEM" = "windows" ]; then

    FRAMEWORK_FILES=("$DEPS_PATH"/packages/runtime.win-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.dll)
    cp "${FRAMEWORK_FILES[@]}" "$BUILD_PATH/third-party/aot/framework"

    SDK_FILES=("$DEPS_PATH"/packages/runtime.win-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.dll)
    SDK_FILES+=("$DEPS_PATH"/packages/runtime.win-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.lib)
    SDK_FILES+=("$DEPS_PATH"/packages/microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/build/WindowsAPIs.txt)
    SDK_FILES+=("$DEPS_PATH"/packages/microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/build/NativeAOT.natvis)
    cp "${SDK_FILES[@]}" "$BUILD_PATH/third-party/aot/sdk"

    cp -r "$RUNTIME_PATH"/artifacts/bin/coreclr/windows.x64.Release/ilc/* "$BUILD_PATH/third-party/tools/ilc"
    cp "$RUNTIME_PATH/artifacts/bin/coreclr/windows.x64.Release/corerun.exe" "$BUILD_PATH/third-party/tools/ilc"

fi





#cp -r $DEPS_PATH/packages/runtime."$OPERATING_SYSTEM"-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/tools/* \
#    "$BUILD_PATH/third-party/tools/ilc"




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
