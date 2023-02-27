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
        var msg = new Rule($"[bold]Sea Build[/]")
        {
            Style = Style.Parse("bold"),
            Justification = Justify.Left
        };
        
        AnsiConsole.Write(new Padder(msg).Padding(1, 1));
        
        AnsiConsole.MarkupLine($"[dim]Input Files[/]       {string.Join(Environment.NewLine, InputFiles.Select(x => x.FullName))}");
        AnsiConsole.MarkupLine($"[dim]Output File[/]       {OutputFile.FullName}");
        AnsiConsole.MarkupLine($"[dim]Assembly[/]          {Assembly}");
        AnsiConsole.MarkupLine($"[dim]Target Arch[/]       {TargetArchitecture.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Target OS[/]         {TargetOperatingSystem.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Debug[/]             {Debug.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Optimization[/]      {OptimizationMode.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Reflection[/]        {Reflection.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Stack Traces[/]      {StackTrace.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Invariant Culture[/] {InvariantCulture.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Strip[/]             {InvariantCulture.ToString()}");
        AnsiConsole.MarkupLine($"[dim]Verbosity[/]         {Verbosity.ToString()}");
        
        AnsiConsole.WriteLine();
        AnsiConsole.MarkupLine($"[dim]SEA_ROOT[/]          {Environment.GetEnvironmentVariable("SEA_ROOT") ?? string.Empty}");
        AnsiConsole.MarkupLine($"[dim]RootPath[/]          {Platform.RootPath.FullName}");
        AnsiConsole.MarkupLine($"[dim]ILFile[/]            {ILFile.FullName}");
        AnsiConsole.MarkupLine($"[dim]ObjectFile[/]        {ObjectFile.FullName}");
        AnsiConsole.MarkupLine($"[dim]ExecutableFile[/]    {ExecutableFile.FullName}");
    }
}
