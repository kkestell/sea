using Spectre.Console;

namespace Sea.Commands.Build;

internal class BuildOptions : BaseOptions
{
    public BuildOptions(BuildCommand command) : base(command)
    {
        InputFiles = Argument(command.InputFilePaths).ToList();
        Assembly = Option(command.AssemblyName) ?? Path.GetFileNameWithoutExtension(InputFiles.First().Name);
        OutputFile = Option(command.OutputFile) ?? new FileInfo(Path.Combine(InputFiles.First().DirectoryName!, $"{Assembly}{Platform.ExecutableExtension}"));
        OptimizationMode = Option(command.OptimizationMode);
        Debug = Option(command.EnableDebugInfo);
        Reflection = Option(command.Reflection);
        StackTrace = Option(command.StackTrace);
        InvariantCulture = Option(command.InvariantCulture);
        Strip = Option(command.Strip);
        TargetArchitecture = Option(command.TargetArchitecture);
        TargetOperatingSystem = Option(command.TargetOperatingSystem);
        
        OutputDirectory = new DirectoryInfo(OutputFile.DirectoryName!);
        ILFile = new FileInfo(Path.Combine(OutputDirectory.FullName, $"{Assembly}.dll"));
        ObjectFile = new FileInfo(Path.Combine(OutputDirectory.FullName, $"{Assembly}{Platform.ObjectExtension}"));
        ExecutableFile = new FileInfo(Path.Combine(OutputDirectory.FullName, $"{Assembly}{Platform.ExecutableExtension}"));
        
    }
    
    public IEnumerable<FileInfo> InputFiles { get; }

    public string Assembly { get; }

    public FileInfo OutputFile { get; }
    
    public OptimizationMode OptimizationMode { get; }

    public bool Debug { get; }

    public bool Reflection { get; }

    public bool StackTrace { get; }

    public bool InvariantCulture { get; }

    public bool Strip { get; }

    public Architecture TargetArchitecture { get; }

    public OperatingSystem TargetOperatingSystem { get; }

    public DirectoryInfo OutputDirectory { get; }

    public FileInfo ILFile { get; }

    public FileInfo ObjectFile { get; }

    public FileInfo ExecutableFile { get; }
    
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
