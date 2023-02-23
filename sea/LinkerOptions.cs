namespace Sea;

internal class LinkerOptions
{
    public LinkerOptions(BuildOptions buildOptions)
    {
        Verbose = buildOptions.Verbose;
        Debug = buildOptions.Debug;
        OptimizationMode = buildOptions.OptimizationMode;
    }

    public bool Verbose { get; }

    public bool Debug { get; }

    public OptimizationMode OptimizationMode { get; }
}