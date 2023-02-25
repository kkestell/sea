using System.CommandLine;
using Spectre.Console;

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
        OutputDirectory = new DirectoryInfo(Path.GetTempPath());
    }

    public bool Debug { get; }

    public VerbosityLevel Verbosity { get; }

    public string Assembly { get; }

    public DirectoryInfo OutputDirectory { get; }
    
    public FileInfo ILFile => new(Path.Combine(OutputDirectory.FullName, Path.GetRandomFileName()));

    public IEnumerable<FileInfo> InputFiles { get; }

    public OptimizationMode OptimizationMode { get; }

    private T Argument<T>(Argument<T> argument) => command.Result!.GetValueForArgument(argument);

    private T? Option<T>(Option<T> option) => command.Result!.GetValueForOption(option);

    public void PrintDiagnostics()
    {
        var msg = new Rule($"[lime bold]Sea Run[/]")
        {
            Style = Style.Parse("lime")
        };
        
        AnsiConsole.Write(new Padder(msg).Padding(1, 1));
        
        var table = new Table();
        table.AddColumn("Option");
        table.AddColumn("Value");
        table.AddRow("InputFiles", string.Join(Environment.NewLine, InputFiles.Select(x => x.FullName)));
        table.AddRow("Assembly", Assembly);
        table.AddRow("Debug", Debug.ToString());
        table.AddRow("OptimizationMode", OptimizationMode.ToString());
        table.AddRow("Verbosity", Verbosity.ToString());
        if (Verbosity == VerbosityLevel.Diagnostic)
        {
            table.AddRow("SEA_ROOT", Environment.GetEnvironmentVariable("SEA_ROOT") ?? string.Empty);
            table.AddRow("RootPath", Platform.RootPath.FullName);
            table.AddRow("ILFile", ILFile.FullName);
        }
        table.HideHeaders();
        table.Expand();
        table.Columns[0].Width(6);
        table.Columns[0].NoWrap();
        table.Border(TableBorder.Rounded);
        AnsiConsole.Write(table);
    }
}
