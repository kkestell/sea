# Contributing

Currently, Windows builds of Sea must be performed on Windows, and macOS builds must be performed on macOS. Linux builds may be performed on Linux (either natively or using Docker), or on macOS and Windows (using Docker).

## Docker

Run `./docker.sh` to build and SSH into the container. From there, run `scripts/build.sh` or any of the build scripts listed below.

```console
$ ./docker.sh
...
Successfully built 85ca6149054e
Successfully tagged sea:latest
🌊 /sea # ./scripts/build.sh
```

## Build Scripts

<tt>[scripts/build.sh](scripts/build.sh)</tt><br>
Executes each of the build scripts listed below.

<tt>[scripts/0-clean.sh](scripts/0-clean.sh)</tt><br>
Deletes build artifacts and intermediate files.

<tt>[scripts/1-deps.sh](scripts/1-deps.sh)</tt><br>
Download / clone third-party dependencies.

<tt>[scripts/2-build.sh](scripts/2-build.sh)</tt><br>
Build Sea and third-party dependencies.

<tt>[scripts/3-test.sh](scripts/3-test.sh)</tt><br>
Run a quick smoke test.

<tt>[scripts/4-release.sh](scripts/4-release.sh)</tt><br>
Create 7z archives and installers.

### Special Scripts

<tt>[scripts/sea.sh](scripts/sea.sh)</tt><br>
Equivalent to `dotnet run --project sea/sea.csproj` using the SDK that was downloaded when building the .NET runtime, with `SEA_ROOT` pointed at `build/`.

## Native Builds

### Windows Dependencies

* [MSYS2](https://www.msys2.org/)
  * `pacman -Sy git unzip`
* Visual Studio 2022 Preview
  * Install required workloads and components using the [.vsconfig](https://github.com/dotnet/runtime/blob/release/8.0-preview1/.vsconfig) from [dotnet/runtime](https://github.com/dotnet/runtime).

Run `scripts/build.sh` in the MSYS2 terminal emulator.

### Ubuntu Dependencies

```console
$ sudo apt install build-essential clang cmake curl git libicu-dev libkrb5-dev liblttng-ust-dev libnuma-dev libssl-dev lld lldb llvm ninja-build python-is-python3 unzip wget zlib1g-dev
```

### macOS Dependencies

* XCode
* Homebrew

```console
$ brew install ninja icu4c wget
```

## Releases

```console
$ git tag -a v0.0.0 -m "v0.0.0"
$ git push origin v0.0.0
$ scripts/release tagged
```

Oops:

```console
$ git tag -d v0.3.0
$ git push --delete origin v0.3.0
```

## Further Reading

* https://github.com/dotnet/runtime/tree/main/docs/design/coreclr/botr
* https://github.com/dotnet/runtime/blob/main/docs/design/coreclr/botr/ilc-architecture.md
* https://github.com/dotnet/runtime/blob/main/docs/workflow/testing/using-corerun-and-coreroot.md
* https://github.com/dotnet/runtime/blob/main/src/coreclr/nativeaot/BuildIntegration/Microsoft.NETCore.Native.targets