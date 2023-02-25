namespace Sea;

internal class LinkerOptions
{
    public LinkerOptions(BuildOptions buildOptions)
    {
        Verbosity = buildOptions.Verbosity;
        Debug = buildOptions.Debug;
        OptimizationMode = buildOptions.OptimizationMode;
        ObjectFile = buildOptions.ObjectFile;
        ExecutableFile = buildOptions.ExecutableFile;
    }

    public VerbosityLevel Verbosity { get; }

    public bool Debug { get; }

    public OptimizationMode OptimizationMode { get; }
    
    public FileInfo ObjectFile { get; }
    
    public FileInfo ExecutableFile { get; }
}