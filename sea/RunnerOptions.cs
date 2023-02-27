namespace Sea;

internal class RunnerOptions
{
    public RunnerOptions(RunOptions runOptions)
    {
        Verbosity = runOptions.Verbosity;
        ILFile = runOptions.ILFile;
        Debug = runOptions.Debug;
    }

    public VerbosityLevel Verbosity { get; }
    
    public FileInfo ILFile { get; }
    
    public bool Debug { get; }
}