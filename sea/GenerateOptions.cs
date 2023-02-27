#region

using System.CommandLine;
using Spectre.Console;

#endregion

namespace Sea;

internal class GenerateOptions
{
    private readonly GenerateCommand command;

    public GenerateOptions(GenerateCommand command)
    {
        this.command = command;

        InputFiles = Argument(command.InputFilePaths).ToList();
        Assembly = Option(command.AssemblyName) ?? Path.GetFileNameWithoutExtension(InputFiles.First().Name);
        OutputFile = Option(command.OutputFile) ?? new FileInfo(Path.Combine(InputFiles.First().DirectoryName!, $"{Assembly}.dll"));
        Verbosity = Option(command.Verbosity);
        OptimizationMode = Option(command.OptimizationMode);
        Debug = Option(command.EnableDebugInfo);
    }

    public VerbosityLevel Verbosity { get; }

    public string Assembly { get; }

    public FileInfo OutputFile { get; }

    public DirectoryInfo OutputDirectory => new(OutputFile.DirectoryName!);
    
    public IEnumerable<FileInfo> InputFiles { get; }

    public OptimizationMode OptimizationMode { get; }

    public bool Debug { get; }

    private T Argument<T>(Argument<T> argument) => command.Result!.GetValueForArgument(argument);

    private T? Option<T>(Option<T> option) => command.Result!.GetValueForOption(option);

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
