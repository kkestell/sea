namespace Sea;

internal class Runner
{
    private readonly RunOptions options;

    public Runner(RunOptions options) 
    {
        this.options = options;    
    }

    public void Run(FileInfo ilFile)
    {
        var rootPath = AppContext.BaseDirectory;
        var ilcPath = Path.Combine(Path.Combine(Path.Combine(rootPath, "third-party"), "tools"), "ilc");
        var corerunExecutable = Path.Combine(ilcPath, $"corerun{Platform.ExecutableFileExtension}");
        var corerunArguments = ilFile.FullName;

        Process.Execute(corerunExecutable, corerunArguments, verbose: options.Verbosity == VerbosityLevel.Detailed);
    }
}
