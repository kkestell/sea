using System.Runtime.InteropServices;

namespace Sea;

public static class Platform
{
    public static Architecture Architecture =>
        RuntimeInformation.OSArchitecture switch
        {
            System.Runtime.InteropServices.Architecture.X64 => Architecture.X64,
            _ => throw new PlatformNotSupportedException()
        };

    public static OperatingSystem OperatingSystem
    {
        get
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                return OperatingSystem.Linux;
            if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
                return OperatingSystem.MacOS;
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                return OperatingSystem.Windows;
            throw new PlatformNotSupportedException();
        }
    }

    public static string ObjectFileExtension =>
        OperatingSystem switch
        {
            OperatingSystem.Linux => ".o",
            OperatingSystem.MacOS => ".o",
            OperatingSystem.Windows => ".obj",
            _ => throw new PlatformNotSupportedException()
        };

    public static string ExecutableFileExtension =>
        OperatingSystem switch
        {
            OperatingSystem.Linux => string.Empty,
            OperatingSystem.MacOS => string.Empty,
            OperatingSystem.Windows => ".exe",
            _ => throw new PlatformNotSupportedException()
        };

    //public static string StaticLibraryFileExtension =>
    //    OperatingSystem switch
    //    {
    //        OperatingSystem.Linux => ".a",
    //        OperatingSystem.MacOS => ".a",
    //        OperatingSystem.Windows => ".lib",
    //        _ => throw new PlatformNotSupportedException()
    //    };

    //public static string DynamicLibraryFileExtension =>
    //    OperatingSystem switch
    //    {
    //        OperatingSystem.Linux => ".so",
    //        OperatingSystem.MacOS => ".dylib",
    //        OperatingSystem.Windows => ".dll",
    //        _ => throw new PlatformNotSupportedException()
    //    };
}
