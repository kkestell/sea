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
    
    public FileInfo ILFile => new(Path.Combine(OutputDirectory.FullName, $"{Assembly}.dll"));

    public IEnumerable<FileInfo> InputFiles { get; }

    public OptimizationMode OptimizationMode { get; }

    private T Argument<T>(Argument<T> argument) => command.Result!.GetValueForArgument(argument);

    private T? Option<T>(Option<T> option) => command.Result!.GetValueForOption(option);

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
