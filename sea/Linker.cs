namespace DFlat;

internal class Linker
{
    private readonly FileInfo objectFile;
    private readonly LinkerOptions linkerOptions;

    public Linker(FileInfo objectFile, LinkerOptions linkerOptions)
    {
        this.objectFile = objectFile;
        this.linkerOptions = linkerOptions;
    }

    public FileInfo Emit(DirectoryInfo outPath)
    {
        var baseName = Path.GetFileNameWithoutExtension(objectFile.Name);
        var outFile = new FileInfo(Path.Combine(outPath.FullName, $"{baseName}{Platform.ExecutableFileExtension}"));

        var exePath = AppContext.BaseDirectory;
        var aotSdkPath = Path.Combine(Path.Combine(Path.Combine(exePath, "third-party"), "aot", "sdk"));
        var aotFrameworkPath = Path.Combine(Path.Combine(Path.Combine(exePath, "third-party"), "aot", "framework"));

        string linkerCommand;
        string linkerArguments;

        if (Platform.OperatingSystem == OperatingSystem.Windows)
        {
            linkerCommand = "link.exe";

            var windowsSdkPath = Environment.GetEnvironmentVariable("UniversalCRTSdkDir")?.Trim('\\');
            var windowsSdkVersion = Environment.GetEnvironmentVariable("UCRTVersion");
            
            var args = new List<string>
            {
                $"\"{objectFile.FullName}\"",
                $"/OUT:\"{outFile.FullName}\"",
                @"/LIBPATH:""C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.34.31933\ATLMFC\lib\x64""",
                @"/LIBPATH:""C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.34.31933\lib\x64""",
                @"/LIBPATH:""C:\Program Files (x86)\Windows Kits\NETFXSDK\4.8\lib\um\x64""",
                $"/LIBPATH:\"{windowsSdkPath}\\lib\\{windowsSdkVersion}\\ucrt\\x64\"",
                $"/LIBPATH:\"{windowsSdkPath}\\lib\\{windowsSdkVersion}\\um\\x64\"",
                $"\"{Path.Combine(aotFrameworkPath, "bootstrapper.lib")}\"",
                $"\"{Path.Combine(aotFrameworkPath, "Runtime.WorkstationGC.lib")}\"",
                $"\"{Path.Combine(aotFrameworkPath, "System.Globalization.Native.Aot.lib")}\"",
                $"\"{Path.Combine(aotFrameworkPath, "System.IO.Compression.Native.Aot.lib")}\"",
                "\"advapi32.lib\"",
                "\"bcrypt.lib\"",
                "\"crypt32.lib\"",
                "\"iphlpapi.lib\"",
                "\"kernel32.lib\"",
                "\"mswsock.lib\"",
                "\"ncrypt.lib\"",
                "\"normaliz.lib\"",
                "\"ntdll.lib\"",
                "\"ole32.lib\"",
                "\"oleaut32.lib\"",
                "\"secur32.lib\"",
                "\"user32.lib\"",
                "\"version.lib\"",
                "\"ws2_32.lib\"",
                "/NOLOGO",
                "/MANIFEST:EMBED",
                "/DEBUG",
                "/INCREMENTAL:NO",
                "/SUBSYSTEM:CONSOLE",
                "/ENTRY:wmainCRTStartup",
                "/NOEXP",
                "/NOIMPLIB",
                $"/NATVIS:\"{Path.Combine(aotFrameworkPath, "NativeAOT.natvis")}\"",
                "/NODEFAULTLIB:libucrt.lib",
                "/DEFAULTLIB:ucrt.lib"
            };

            var argFile = new FileInfo(Path.Combine(outPath.FullName, $"{baseName}.link.rsp"));
            File.WriteAllLines(argFile.FullName, args);

            linkerArguments = $"@{argFile.FullName}";
        }
        else
        {
            linkerCommand = "clang";

            var args = new List<string>
            {
                objectFile.FullName,
                $"-o {outFile.FullName}",
                Path.Combine(aotSdkPath, "libbootstrapper.a"),
                Path.Combine(aotSdkPath, "libRuntime.WorkstationGC.a"),
                Path.Combine(aotSdkPath, "libstdc++compat.a"),
                Path.Combine(aotSdkPath, "libnumasupportdynamic.a"),
                Path.Combine(aotSdkPath, "libeventpipe-disabled.a"),
                Path.Combine(aotFrameworkPath, "libSystem.Native.a"),
                Path.Combine(aotFrameworkPath, "libSystem.Globalization.Native.a"),
                Path.Combine(aotFrameworkPath, "libSystem.IO.Compression.Native.a"),
                Path.Combine(aotFrameworkPath, "libSystem.Net.Security.Native.a"),
                Path.Combine(aotFrameworkPath, "libSystem.Security.Cryptography.Native.OpenSsl.a"),
            };

            if (linkerOptions.Debug)
                args.Add("-g");

            switch (linkerOptions.OptimizationMode)
            {
                case OptimizationMode.Default:
                    args.Add("-O2");
                    break;
                case OptimizationMode.Small:
                    args.Add("-Oz");
                    break;
                case OptimizationMode.Fast:
                    args.Add("-O3");
                    break;
                case OptimizationMode.None:
                    args.Add("-O0");
                    break;
            }

            if (Platform.OperatingSystem == OperatingSystem.Linux)
            {
                args.AddRange(new List<string>
                {
                    "-Wl,--build-id=sha1",
                    "-Wl,--as-needed",
                    "-pthread",
                    "-lstdc++",
                    "-ldl",
                    "-lm",
                    "-lz",
                    "-lrt",
                    "-pie",
                    "-Wl,-z,relro",
                    "-Wl,-z,now",
                    "-Wl,--discard-all",
                    "-Wl,--gc-sections"
                });
            }
            else if (Platform.OperatingSystem == OperatingSystem.MacOS)
            {
                args.AddRange(new List<string>
                {
                    Path.Combine(aotFrameworkPath, "libSystem.Security.Cryptography.Native.Apple.a"),
                    "-Wl,-rpath,'{@executable_path}'",
                    "-ldl",
                    "-lobjc",
                    "-lswiftCore",
                    "-lswiftFoundation",
                    "-lz",
                    "-licucore",
                    "-L/usr/lib/swift",
                    "-lm",
                    "-framework CoreFoundation",
                    "-framework CryptoKit",
                    "-framework Foundation",
                    "-framework Security",
                    "-framework GSS"
                });
            }

            linkerArguments = string.Join(" ", args);
        }

        Process.Execute(linkerCommand, linkerArguments, verbose: linkerOptions.Verbose);

        return outFile;
    }
}
