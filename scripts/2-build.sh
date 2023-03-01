#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
source "$SCRIPT_PATH/vars.sh"

mkdir -p "$BUILD_PATH"/third-party/{ref/,tools/,aot/{framework/,sdk/}}

if [ ! -d "$RUNTIME_PATH/artifacts" ]; then
    echo "Building CoreCLR..."
    "$RUNTIME_PATH/build.sh" -subset clr -c $CONFIGURATION
fi

# Sea

DOTNET_ROOT="$SDK_PATH"
PATH="$DOTNET_ROOT:$BUILD_PATH:$PATH"
export NUGET_PACKAGES="$DEPS_PATH/packages"

dotnet publish "$ROOT_PATH/sea/Sea.csproj" -c Release -nologo -consoleLoggerParameters:NoSummary -verbosity:quiet

cp "$PUBLISH_PATH/$PUBLISH_FILENAME" "$BUILD_PATH/sea"

if [ "$OPERATING_SYSTEM" != "windows" ]; then
    strip "$BUILD_PATH"/sea
fi

# Third-Party

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
