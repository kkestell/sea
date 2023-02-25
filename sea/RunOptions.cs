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
        var table = new Table();
        table.AddColumn("Option");
        table.AddColumn("Value");
        table.AddRow("InputFiles", string.Join(Environment.NewLine, InputFiles.Select(x => x.FullName)));
        table.AddRow("Assembly", Assembly);
        table.AddRow("Debug", Debug.ToString());
        table.AddRow("OptimizationMode", OptimizationMode.ToString());
        table.AddRow("Verbosity", Verbosity.ToString());
        table.HideHeaders();
        table.Border(TableBorder.Square);
        AnsiConsole.Write(table);
    }
}
