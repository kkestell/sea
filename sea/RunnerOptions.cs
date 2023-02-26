namespace Sea;

internal class RunnerOptions
{
    public RunnerOptions(RunOptions runOptions)
    {
        Verbosity = runOptions.Verbosity;
        ILFile = runOptions.ILFile;
    }

    public VerbosityLevel Verbosity { get; }
    
    public FileInfo ILFile { get; }
}