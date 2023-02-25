namespace Sea;

internal class Stripper
{
    private readonly StripperOptions options;

    public Stripper(StripperOptions options) 
    {
        this.options = options;    
    }

    public void Run()
    {
        var stripExecutable = "strip";
        
        var exitCode = Process.Execute(stripExecutable, $"-S {options.ExecutableFile.FullName}", verbose: options.Verbosity == VerbosityLevel.Diagnostic);
        
        if (exitCode != 0)
        {
            throw new Exception($"{stripExecutable} failed with exit code {exitCode}");
        }
    }
}