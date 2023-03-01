using Spectre.Console;

namespace Sea.Compilation.Stages.Running;

internal class Runner
{
    private readonly RunnerOptions options;
    
    public Runner(RunnerOptions options)
    {
        this.options = options;
    }
    
    public void Run()
    {
        var toolsPath = Path.Combine(Path.Combine(Platform.RootPath.FullName, "third-party"), "tools");
        var fileName = Path.Combine(toolsPath, $"corerun{Platform.ExecutableExtension}");

        var args = new List<string>();

        // if (options.Debug)
        //     args.Add("--debug");

        args.Add(options.ILFile.FullName);
        
        using var process = new System.Diagnostics.Process();

        process.StartInfo.FileName = fileName;
        process.StartInfo.Arguments = string.Join(" ", args);
        
        if (options.Verbosity == VerbosityLevel.Diagnostic)
            AnsiConsole.Write(new Padder(new Markup($"[dim]Executing {process.StartInfo.FileName} {process.StartInfo.Arguments}[/]")).Padding(0, 0, 0, 1));

        process.Start();
        process.WaitForExit();
    }
}
