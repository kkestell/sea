#region

using System.CommandLine;
using Spectre.Console;

#endregion

namespace Sea;

internal class RunOptions
{
    private readonly RunCommand command;

    public RunOptions(RunCommand command)
    {
        this.command = command;

        InputFiles = Argument(command.InputFilePaths);
        Assembly = Option(command.AssemblyName) ?? Path.GetFileNameWithoutExtension(InputFiles.First().Name);
        Verbosity = Option(command.Verbosity);
        OptimizationMode = Option(command.OptimizationMode);
        Debug = Option(command.EnableDebugInfo);
        OutputDirectory = InputFiles.First().Directory;
    }

    public bool Debug { get; }

    public VerbosityLevel Verbosity { get; }

    public string Assembly { get; }

    public DirectoryInfo OutputDirectory { get; }
    
    public FileInfo ILFile => new(Path.Combine(OutputDirectory.FullName, $"{Assembly}.cil"));

    public IEnumerable<FileInfo> InputFiles { get; }

    public OptimizationMode OptimizationMode { get; }

    private T Argument<T>(Argument<T> argument) => command.Result!.GetValueForArgument(argument);

    private T? Option<T>(Option<T> option) => command.Result!.GetValueForOption(option);

    public void PrintDiagnostics()
    {
        var msg = new Rule($"[cyan bold]Sea Run[/]")
        {
            Style = Style.Parse("cyan"),
            Justification = Justify.Left
        };
        
        AnsiConsole.Write(new Padder(msg).Padding(1, 1));
        
        AnsiConsole.MarkupLine($"[bold]Input Files[/]  {string.Join(Environment.NewLine, InputFiles.Select(x => x.FullName))}");
        AnsiConsole.MarkupLine($"[bold]Assembly[/]     {Assembly}");
        AnsiConsole.MarkupLine($"[bold]Debug[/]        {Debug.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Optimization[/] {OptimizationMode.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Verbosity[/]    {Verbosity.ToString()}");

        AnsiConsole.WriteLine();
        AnsiConsole.MarkupLine($"[bold]SEA_ROOT[/]     {Environment.GetEnvironmentVariable("SEA_ROOT") ?? string.Empty}");
        AnsiConsole.MarkupLine($"[bold]RootPath[/]     {Platform.RootPath.FullName}");
        AnsiConsole.MarkupLine($"[bold]ILFile[/]       {ILFile.FullName}");
    }
}
