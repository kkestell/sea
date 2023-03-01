using Spectre.Console;

namespace Sea.Commands.Run;

internal class RunOptions : BaseOptions
{
    private readonly RunCommand command;

    public RunOptions(RunCommand command) : base(command)
    {
        this.command = command;

        InputFiles = Argument(command.InputFilePaths);
        Assembly = Option(command.AssemblyName) ?? Path.GetFileNameWithoutExtension(InputFiles.First().Name);
        OptimizationMode = Option(command.OptimizationMode);
        Debug = Option(command.EnableDebugInfo);
        OutputDirectory = InputFiles.First().Directory;
    }

    public bool Debug { get; }

    public string Assembly { get; }

    public DirectoryInfo OutputDirectory { get; }
    
    public FileInfo ILFile => new(Path.Combine(OutputDirectory.FullName, $"{Assembly}.dll"));

    public List<FileInfo> InputFiles { get; }

    public OptimizationMode OptimizationMode { get; }

    public void PrintDiagnostics()
    {
        var msg = new Rule($"[bold]Sea Run[/]")
        {
            Style = Style.Parse("bold"),
            Justification = Justify.Left
        };
        
        AnsiConsole.Write(new Padder(msg).Padding(1, 1));
        
        AnsiConsole.MarkupLine($"[dim]Input Files[/]  {string.Join(Environment.NewLine, InputFiles.Select(x => x.FullName))}");
        AnsiConsole.MarkupLine($"[dim]Assembly[/]     {Assembly}");
        AnsiConsole.MarkupLine($"[dim]Debug[/]        {Debug.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Optimization[/] {OptimizationMode.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Verbosity[/]    {Verbosity.ToString()}");

        AnsiConsole.WriteLine();
        AnsiConsole.MarkupLine($"[dim]SEA_ROOT[/]     {Environment.GetEnvironmentVariable("SEA_ROOT") ?? string.Empty}");
        AnsiConsole.MarkupLine($"[dim]RootPath[/]     {Platform.RootPath.FullName}");
        AnsiConsole.MarkupLine($"[dim]ILFile[/]       {ILFile.FullName}");
    }
}
