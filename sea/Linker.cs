namespace Sea;

internal class Linker
{
    private readonly LinkerOptions options;

    public Linker(LinkerOptions options)
    {
        this.options = options;
    }

    public void Emit()
    {
        var aotSdkPath =
            Path.Combine(Path.Combine(Path.Combine(Platform.RootPath.FullName, "third-party"), "aot", "sdk"));
        var aotFrameworkPath =
            Path.Combine(Path.Combine(Path.Combine(Platform.RootPath.FullName, "third-party"), "aot", "framework"));

        if (Platform.OperatingSystem == OperatingSystem.Windows)
        {
            var windowsSdkPath =
                @"C:\Program Files (x86)\Windows Kits\10\"; //Environment.GetEnvironmentVariable("UniversalCRTSdkDir")?.Trim('\\');
            var windowsSdkVersion = "10.0.19041.0"; //Environment.GetEnvironmentVariable("UCRTVersion");

            var args = new List<string>
            {
                $"\"{options.ObjectFile.FullName}\"",
                $"/OUT:\"{options.ExecutableFile.FullName}\"",
                @"/LIBPATH:""C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.34.31933\ATLMFC\lib\x64""",
                @"/LIBPATH:""C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.34.31933\lib\x64""",
                @"/LIBPATH:""C:\Program Files (x86)\Windows Kits\NETFXSDK\4.8\lib\um\x64""",
                $"/LIBPATH:\"{windowsSdkPath}\\lib\\{windowsSdkVersion}\\ucrt\\x64\"",
                $"/LIBPATH:\"{windowsSdkPath}\\lib\\{windowsSdkVersion}\\um\\x64\"",
                $"\"{Path.Combine(aotSdkPath, "bootstrapper.lib")}\"",
                $"\"{Path.Combine(aotSdkPath, "Runtime.WorkstationGC.lib")}\"",
                $"\"{Path.Combine(aotSdkPath, "System.Globalization.Native.Aot.lib")}\"",
                $"\"{Path.Combine(aotSdkPath, "System.IO.Compression.Native.Aot.lib")}\"",
                $"\"{Path.Combine(aotSdkPath, "eventpipe-disabled.lib")}\"",
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
                "/INCREMENTAL:NO",
                "/SUBSYSTEM:CONSOLE",
                "/ENTRY:wmainCRTStartup",
                "/NOEXP",
                "/NOIMPLIB",
                $"/NATVIS:\"{Path.Combine(aotSdkPath, "NativeAOT.natvis")}\"",
                "/NODEFAULTLIB:libucrt.lib",
                "/DEFAULTLIB:ucrt.lib",
                "/IGNORE:4099"
            };

            if (options.Debug)
            {
                args.Add("/DEBUG");
            }

            if (options.Verbosity >= VerbosityLevel.Detailed)
            {
                args.Add("/VERBOSE");
            }

            var argFile = new FileInfo(Path.Combine(options.ExecutableFile.DirectoryName!,
                $"{Path.GetFileNameWithoutExtension(options.ObjectFile.Name)}.link.rsp"));
            File.WriteAllLines(argFile.FullName, args);

            var linkerExecutable = @"C:\Windows\System32\cmd.exe";
            var linkerArguments = @$"/c """"C:\Program Files\Microsoft Visual Studio\2022\Preview\Common7\Tools\VsDevCmd.bat"" && link.exe @{argFile.FullName}""";
            var linkerEnvironment = new Dictionary<string, string>
            {
                { "__VSCMD_ARG_NO_LOGO", "0" },
                { "VSCMD_SKIP_SENDTELEMETRY", "1" }
            };

            var processOptions = new ProcessOptions(linkerExecutable)
            {
                Arguments = linkerArguments,
                Environment = linkerEnvironment,
                Verbosity = options.Verbosity
            };
            Process.Execute(processOptions);
        }
        else
        {
            var args = new List<string>
            {
                options.ObjectFile.FullName,
                $"-o {options.ExecutableFile.FullName}",
                Path.Combine(aotSdkPath, "libbootstrapper.a"),
                Path.Combine(aotSdkPath, "libRuntime.WorkstationGC.a"),
                Path.Combine(aotSdkPath, "libstdc++compat.a"),
                Path.Combine(aotSdkPath, "libnumasupportdynamic.a"),
                Path.Combine(aotSdkPath, "libeventpipe-disabled.a"),
                Path.Combine(aotFrameworkPath, "libSystem.Native.a"),
                Path.Combine(aotFrameworkPath, "libSystem.Globalization.Native.a"),
                Path.Combine(aotFrameworkPath, "libSystem.IO.Compression.Native.a"),
                Path.Combine(aotFrameworkPath, "libSystem.Net.Security.Native.a"),
                Path.Combine(aotFrameworkPath, "libSystem.Security.Cryptography.Native.OpenSsl.a")
            };

            if (options.Verbosity >= VerbosityLevel.Detailed)
                args.Add("--verbose");

            if (options.Debug)
                args.Add("-g");

            switch (options.OptimizationMode)
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

            var linkerExecutable = "clang";
            var linkerArguments = string.Join(" ", args);

            var processOptions = new ProcessOptions(linkerExecutable)
            {
                Arguments = linkerArguments,
                Verbosity = options.Verbosity
            };
            var exitCode = Process.Execute(processOptions);
            
            if (exitCode != 0)
            {
                throw new Exception($"{linkerExecutable} failed with exit code {exitCode}");
            }
        }
    }
}
