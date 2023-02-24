namespace Sea;

internal class Stripper
{
    private readonly StripperOptions options;

    public Stripper(StripperOptions options) 
    {
        this.options = options;    
    }

    public void Run(FileInfo executableFile)
    {
        var stripExecutable = "strip";
        
        var exitCode = Process.Execute(stripExecutable, $"-S {executableFile.FullName}", verbose: options.Verbosity == VerbosityLevel.Diagnostic);
        
        if (exitCode != 0)
        {
            throw new Exception($"{stripExecutable} failed with exit code {exitCode}");
        }
    }
}