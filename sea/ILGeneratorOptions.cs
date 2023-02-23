namespace Sea;

internal class BytecodeGeneratorOptions
{
    public BytecodeGeneratorOptions(BuildOptions buildOptions)
    {
        Verbose = buildOptions.Verbose;
        InputFiles = buildOptions.InputFiles;
        Assembly = buildOptions.Assembly;
        OptimizationMode = buildOptions.OptimizationMode;
    }

    public BytecodeGeneratorOptions(RunOptions runOptions)
    {
        Verbose = runOptions.Verbose;
        InputFiles = runOptions.InputFiles;
        Assembly = runOptions.Assembly;
        OptimizationMode = runOptions.OptimizationMode;
    }
    
    public bool Verbose { get; }

    public IEnumerable<FileInfo> InputFiles { get; }

    public string Assembly { get; }

    public OptimizationMode OptimizationMode { get; }
}
