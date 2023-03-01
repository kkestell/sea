# Sea

Compile C# to native code with [Roslyn](https://github.com/dotnet/roslyn/tree/main/src/Compilers/CSharp/csc) and [Native AOT](https://github.com/dotnet/runtime/tree/main/src/coreclr/tools/aot/ILCompiler). No .NET CLI, MSBuild, or Visual Studio necessary.

This is an experiment.

```console
$ echo 'Console.WriteLine("Hello World!");' > hello.cs

$ sea run hello.cs
Hello World!

$ sea build hello.cs

$ ./hello
Hello World!
```

## Supported Platforms

| Platform         | X64 | ARM64 |
| ---------------- | --- | ----- |
| Linux¹           | :heavy_check_mark: | :white_check_mark: |          
| macOS²           | :heavy_check_mark: | :white_check_mark: |          
| Windows³         | :heavy_check_mark: | :x: |

:heavy_check_mark: Supported<br>
:white_check_mark: Planned<br>
:x: Not Planned

1. Tested on Ubuntu 20.04
2. Tested on macOS 11.7.3 (Big Sur)
3. Tested on Windows 10 22H2

## Building

See [CONTRIBUTING.md](CONTRIBUTING.md)