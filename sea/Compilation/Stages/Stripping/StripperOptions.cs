using Sea.Commands.Build;

namespace Sea.Compilation.Stages.Stripping;

internal class StripperOptions
{
    public StripperOptions(BuildOptions buildOptions)
    {
        Verbosity = buildOptions.Verbosity;
        ExecutableFile = buildOptions.ExecutableFile;
    }

    public VerbosityLevel Verbosity { get; }
    
    public FileInfo ExecutableFile { get; }
}