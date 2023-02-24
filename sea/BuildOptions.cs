using System.CommandLine;
using System.Text;
using Spectre.Console;

namespace Sea;

internal class BuildOptions
{
    private readonly BuildCommand command;

    public BuildOptions(BuildCommand command)
    {
        this.command = command;

        InputFiles = Argument(command.InputFilePaths).ToList();
        Assembly = Option(command.AssemblyName) ?? Path.GetFileNameWithoutExtension(InputFiles.First().Name);
        OutputFile = Option(command.OutputFile) ?? new FileInfo(Path.Combine(InputFiles.First().DirectoryName!, $"{Assembly}{Platform.ExecutableFileExtension}"));
        Verbosity = Option(command.Verbosity);
        OptimizationMode = Option(command.OptimizationMode);
        Debug = Option(command.EnableDebugInfo);
        Reflection = Option(command.Reflection);
        StackTrace = Option(command.StackTrace);
        InvariantCulture = Option(command.InvariantCulture);
        Strip = Option(command.Strip);
    }

    public bool Debug { get; }

    public VerbosityLevel Verbosity { get; }

    public string Assembly { get; }

    public FileInfo OutputFile { get; }

    public DirectoryInfo OutputDirectory => new(OutputFile.DirectoryName!);

    public IEnumerable<FileInfo> InputFiles { get; }

    public OptimizationMode OptimizationMode { get; }

    public bool Reflection { get; }

    public bool StackTrace { get; }

    public bool InvariantCulture { get; }

    public bool Strip { get; }

    public Architecture TargetArchitecture => Option(command.TargetArchitecture);

    public OperatingSystem TargetOperatingSystem => Option(command.TargetOperatingSystem);

    private T Argument<T>(Argument<T> argument) => command.Result!.GetValueForArgument(argument);

    private T? Option<T>(Option<T> option) => command.Result!.GetValueForOption(option);

    public void PrintDiagnostics()
    {
        var table = new Table();
        table.AddColumn("Option");
        table.AddColumn("Value");
        table.AddRow("InputFiles", string.Join(Environment.NewLine, InputFiles.Select(x => x.FullName)));
        table.AddRow("OutputFile", OutputFile.FullName);
        table.AddRow("Assembly", Assembly);
        table.AddRow("TargetArchitecture", TargetArchitecture.ToString());
        table.AddRow("TargetOperatingSystem", TargetOperatingSystem.ToString());
        table.AddRow("Debug", Debug.ToString());
        table.AddRow("OptimizationMode", OptimizationMode.ToString());
        table.AddRow("Reflection", Reflection.ToString());
        table.AddRow("StackTrace", StackTrace.ToString());
        table.AddRow("InvariantCulture", InvariantCulture.ToString());
        table.AddRow("Strip", Strip.ToString());
        table.AddRow("Verbosity", Verbosity.ToString());
        if (Verbosity == VerbosityLevel.Diagnostic)
        {
            table.AddRow("SEA_ROOT", Environment.GetEnvironmentVariable("SEA_ROOT") ?? string.Empty);
            table.AddRow("RootPath", Platform.RootPath.FullName);
        }
        table.HideHeaders();
        table.Border(TableBorder.Square);
        AnsiConsole.Write(table);
    }
}
