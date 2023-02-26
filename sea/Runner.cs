namespace Sea;

internal class Runner
{
    private readonly RunnerOptions options;
    
    public Runner(RunnerOptions options)
    {
        this.options = options;
    }
    
    public void Run()
    {
        var ilcPath = Path.Combine(Path.Combine(Path.Combine(Platform.RootPath.FullName, "third-party"), "tools"), "ilc");
        var fileName = Path.Combine(ilcPath, $"corerun{Platform.ExecutableExtension}");
        var arguments = options.ILFile.FullName;

        using var process = new System.Diagnostics.Process();

        process.StartInfo.FileName = fileName;
        process.StartInfo.Arguments = arguments;
        
        process.Start();
        process.WaitForExit();
    }
}
