#region

using System.CommandLine;
using Spectre.Console;

#endregion

namespace Sea;

internal class BuildOptions
{
    private readonly BuildCommand command;

    public BuildOptions(BuildCommand command)
    {
        this.command = command;

        InputFiles = Argument(command.InputFilePaths).ToList();
        Assembly = Option(command.AssemblyName) ?? Path.GetFileNameWithoutExtension(InputFiles.First().Name);
        OutputFile = Option(command.OutputFile) ?? new FileInfo(Path.Combine(InputFiles.First().DirectoryName!, $"{Assembly}{Platform.ExecutableExtension}"));
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

    public FileInfo ILFile =>
        new(Path.Combine(OutputDirectory.FullName, $"{Assembly}.cil"));
    
    public FileInfo ObjectFile =>
        new(Path.Combine(OutputDirectory.FullName, $"{Assembly}{Platform.ObjectExtension}"));
    
    public FileInfo ExecutableFile =>
        new(Path.Combine(OutputDirectory.FullName, $"{Assembly}{Platform.ExecutableExtension}"));    
    
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
        var msg = new Rule($"[cyan bold]Sea Build[/]")
        {
            Style = Style.Parse("cyan"),
            Justification = Justify.Left
        };
        
        AnsiConsole.Write(new Padder(msg).Padding(1, 1));
        
        AnsiConsole.MarkupLine($"[bold]Input Files[/]       {string.Join(Environment.NewLine, InputFiles.Select(x => x.FullName))}");
        AnsiConsole.MarkupLine($"[bold]Output File[/]       {OutputFile.FullName}");
        AnsiConsole.MarkupLine($"[bold]Assembly[/]          {Assembly}");
        AnsiConsole.MarkupLine($"[bold]Target Arch[/]       {TargetArchitecture.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Target OS[/]         {TargetOperatingSystem.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Debug[/]             {Debug.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Optimization[/]      {OptimizationMode.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Reflection[/]        {Reflection.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Stack Traces[/]      {StackTrace.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Invariant Culture[/] {InvariantCulture.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Strip[/]             {InvariantCulture.ToString()}");
        AnsiConsole.MarkupLine($"[bold]Verbosity[/]         {Verbosity.ToString()}");
    }
}
