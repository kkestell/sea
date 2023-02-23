namespace Sea;

internal class ILGeneratorOptions
{
    public ILGeneratorOptions(BuildOptions buildOptions)
    {
        Verbosity = buildOptions.Verbosity;
        InputFiles = buildOptions.InputFiles;
        Assembly = buildOptions.Assembly;
        OptimizationMode = buildOptions.OptimizationMode;
    }

    public ILGeneratorOptions(RunOptions runOptions)
    {
        Verbosity = runOptions.Verbosity;
        InputFiles = runOptions.InputFiles;
        Assembly = runOptions.Assembly;
        OptimizationMode = runOptions.OptimizationMode;
    }
    
    public VerbosityLevel Verbosity { get; }

    public IEnumerable<FileInfo> InputFiles { get; }

    public string Assembly { get; }

    public OptimizationMode OptimizationMode { get; }
}
