using Spectre.Console;

namespace Sea.Commands.Generate;

internal class GenerateOptions : BaseOptions
{
    private readonly GenerateCommand command;

    public GenerateOptions(GenerateCommand command) : base(command)
    {
        this.command = command;

        InputFiles = Argument(command.InputFilePaths).ToList();
        Assembly = Option(command.AssemblyName) ?? Path.GetFileNameWithoutExtension(InputFiles.First().Name);
        OutputFile = Option(command.OutputFile) ?? new FileInfo(Path.Combine(InputFiles.First().DirectoryName!, $"{Assembly}.dll"));
        OptimizationMode = Option(command.OptimizationMode);
        Debug = Option(command.EnableDebugInfo);
    }

    public string Assembly { get; }

    public FileInfo OutputFile { get; }

    public DirectoryInfo OutputDirectory => new(OutputFile.DirectoryName!);
    
    public IEnumerable<FileInfo> InputFiles { get; }

    public OptimizationMode OptimizationMode { get; }

    public bool Debug { get; }

    public void PrintDiagnostics()
    {
        var msg = new Rule($"[cyan bold]Sea Generate[/]")
        {
            Style = Style.Parse("cyan"),
            Justification = Justify.Left
        };
        
        AnsiConsole.Write(new Padder(msg).Padding(1, 1));
        
        AnsiConsole.MarkupLine($"[bold]Input Files[/]       {string.Join(Environment.NewLine, InputFiles.Select(x => x.FullName))}");
        AnsiConsole.MarkupLine($"[bold]Output File[/]       {OutputFile.FullName}");
        AnsiConsole.MarkupLine($"[bold]Assembly[/]          {Assembly}");
        AnsiConsole.MarkupLine($"[bold]Optimization[/]      {OptimizationMode.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Verbosity[/]         {Verbosity.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Debug[/]             {Debug.ToString()}");
        
        AnsiConsole.WriteLine();
        AnsiConsole.MarkupLine($"[bold]SEA_ROOT[/]          {Environment.GetEnvironmentVariable("SEA_ROOT") ?? string.Empty}");
        AnsiConsole.MarkupLine($"[bold]RootPath[/]          {Platform.RootPath.FullName}");
    }
}
