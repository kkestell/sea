namespace Sea;

internal class LinkerOptions
{
    public LinkerOptions(BuildOptions buildOptions)
    {
        Verbosity = buildOptions.Verbosity;
        Debug = buildOptions.Debug;
        OptimizationMode = buildOptions.OptimizationMode;
    }

    public VerbosityLevel Verbosity { get; }

    public bool Debug { get; }

    public OptimizationMode OptimizationMode { get; }
}