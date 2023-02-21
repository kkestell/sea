# Sea

* https://github.com/dotnet/runtime/tree/main/docs/design/coreclr/botr
* https://github.com/dotnet/runtime/blob/main/docs/design/coreclr/botr/ilc-architecture.md
* https://github.com/dotnet/runtime/blob/main/docs/workflow/testing/using-corerun-and-coreroot.md
* https://github.com/dotnet/runtime/blob/main/src/coreclr/nativeaot/BuildIntegration/Microsoft.NETCore.Native.targets

## Build Dependencies

### Ubuntu

```console
$ sudo apt install \
  build-essential \
  clang \
  cmake \
  curl \
  git \
  libicu-dev \
  libkrb5-dev \
  liblttng-ust-dev \
  libnuma-dev \
  libssl-dev \
  lld \
  lldb \
  llvm \
  ninja-build \
  python-is-python3 \
  unzip \
  wget \
  zlib1g-dev
```

### macOS

```command
$ brew install ninja icu4c wget
```

### Windows

* [MSYS2](https://www.msys2.org/)
  * `pacman -Sy git`
* Visual Studio 2022 Preview
  * Install required workloads and components using the [.vsconfig](https://github.com/dotnet/runtime/blob/release/8.0-preview1/.vsconfig) from [dotnet/runtime](https://github.com/dotnet/runtime).
