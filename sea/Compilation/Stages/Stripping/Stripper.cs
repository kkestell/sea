namespace Sea.Compilation.Stages.Stripping;

internal class Stripper
{
    private readonly StripperOptions options;

    public Stripper(StripperOptions options) 
    {
        this.options = options;    
    }

    public void Run()
    {
        if (Platform.OperatingSystem == OperatingSystem.Windows)
            return;

        var stripExecutable = "strip";

        var args = new List<string>
        {
            "-S",
        };
        
        if (options.Verbosity >= VerbosityLevel.Detailed)
            args.Add("-v");
        
        args.Add(options.ExecutableFile.FullName);
        
        var processOptions = new ProcessOptions(stripExecutable)
        {
            Arguments = string.Join(" ", args),
            Verbosity = options.Verbosity
        };
        var exitCode = Process.Execute(processOptions);
        
        if (exitCode != 0)
        {
            throw new Exception($"{stripExecutable} failed with exit code {exitCode}");
        }
    }
}