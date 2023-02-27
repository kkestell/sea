#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

if [ ! -d "$RUNTIME_PATH/artifacts" ]; then
    echo "Building CoreCLR..."
    "$RUNTIME_PATH/build.sh" -subset clr -c $CONFIGURATION
else
    echo "CoreCLR already built."
fi

# Sea

DOTNET_ROOT="$SDK_PATH"
PATH="$DOTNET_ROOT:$BUILD_PATH:$PATH"
export NUGET_PACKAGES="$DEPS_PATH/packages"

echo "Building Sea..."
dotnet build "$ROOT_PATH/sea/sea.csproj" -c Release

echo "Publishing Sea..."
dotnet publish "$ROOT_PATH/sea/sea.csproj" -o "$BUILD_PATH" -c Release

if [ "$OPERATING_SYSTEM" != "windows" ]; then
    strip "$BUILD_PATH"/sea
fi

# Third-Party

echo "Copying files..."

mkdir -p "$BUILD_PATH"/third-party/{ref/,tools/,aot/{framework/,sdk/}}

REF_FILES=("$SDK_PATH"/packs/Microsoft.NETCore.App.Ref/8.0.0-preview.2.23116.1/ref/net8.0/*.dll)
cp "${REF_FILES[@]}" "$BUILD_PATH/third-party/ref"

if [ "$OPERATING_SYSTEM" = "linux" ]; then

    FRAMEWORK_FILES=("$DEPS_PATH"/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.dll)
    FRAMEWORK_FILES+=("$DEPS_PATH"/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.a)
    cp "${FRAMEWORK_FILES[@]}" "$BUILD_PATH/third-party/aot/framework"

    SDK_FILES=("$DEPS_PATH"/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.dll)
    SDK_FILES+=("$DEPS_PATH"/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.a)
    cp "${SDK_FILES[@]}" "$BUILD_PATH/third-party/aot/sdk"

    cp -r "$RUNTIME_PATH"/artifacts/bin/coreclr/linux.x64.Release/ilc/* "$BUILD_PATH/third-party/tools/"
    cp "$RUNTIME_PATH/artifacts/bin/coreclr/linux.x64.Release/corerun" "$BUILD_PATH/third-party/tools/"

elif [ "$OPERATING_SYSTEM" = "osx" ]; then

    FRAMEWORK_FILES=("$DEPS_PATH"/packages/runtime.osx-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.dll)
    FRAMEWORK_FILES+=("$DEPS_PATH"/packages/runtime.osx-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.a)
    cp "${FRAMEWORK_FILES[@]}" "$BUILD_PATH/third-party/aot/framework"

    SDK_FILES=("$DEPS_PATH"/packages/runtime.osx-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.dll)
    SDK_FILES+=("$DEPS_PATH"/packages/runtime.osx-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.a)
    cp "${SDK_FILES[@]}" "$BUILD_PATH/third-party/aot/sdk"

    cp -r "$RUNTIME_PATH"/artifacts/bin/coreclr/osx.x64.Release/ilc/* "$BUILD_PATH/third-party/tools"
    cp "$RUNTIME_PATH/artifacts/bin/coreclr/osx.x64.Release/corerun" "$BUILD_PATH/third-party/tools"

elif [ "$OPERATING_SYSTEM" = "windows" ]; then

    FRAMEWORK_FILES=("$DEPS_PATH"/packages/runtime.win-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/framework/*.dll)
    cp "${FRAMEWORK_FILES[@]}" "$BUILD_PATH/third-party/aot/framework"

    SDK_FILES=("$DEPS_PATH"/packages/runtime.win-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.dll)
    SDK_FILES+=("$DEPS_PATH"/packages/runtime.win-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/sdk/*.lib)
    SDK_FILES+=("$DEPS_PATH"/packages/microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/build/WindowsAPIs.txt)
    SDK_FILES+=("$DEPS_PATH"/packages/microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/build/NativeAOT.natvis)
    cp "${SDK_FILES[@]}" "$BUILD_PATH/third-party/aot/sdk"

    cp -r "$RUNTIME_PATH"/artifacts/bin/coreclr/windows.x64.Release/ilc/* "$BUILD_PATH/third-party/tools"
    cp "$RUNTIME_PATH/artifacts/bin/coreclr/windows.x64.Release/corerun.exe" "$BUILD_PATH/third-party/tools"

fi

find "$BUILD_PATH" -type f -name '*.pdb' -delete
