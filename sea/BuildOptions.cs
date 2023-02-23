using System.CommandLine;
using System.Text;

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
        Verbose = Option(command.Verbose);
        OptimizationMode = Option(command.OptimizationMode);
        Debug = Option(command.EnableDebugInfo);
        Reflection = Option(command.Reflection);
        StackTrace = Option(command.StackTrace);
        Strip = Option(command.Strip);
    }

    public bool Debug { get; }

    public bool Verbose { get; }

    public string Assembly { get; }

    public FileInfo OutputFile { get; }

    public DirectoryInfo OutputDirectory => new(OutputFile.DirectoryName!);

    public IEnumerable<FileInfo> InputFiles { get; }

    public OptimizationMode OptimizationMode { get; }

    public bool Reflection { get; }

    public bool StackTrace { get; }

    public bool Strip { get; }

    public Architecture TargetArchitecture => Option(command.TargetArchitecture);

    public OperatingSystem TargetOperatingSystem => Option(command.TargetOperatingSystem);

    private T Argument<T>(Argument<T> argument) => command.Result!.GetValueForArgument(argument);

    private T? Option<T>(Option<T> option) => command.Result!.GetValueForOption(option);

    public override string ToString()
    {
        var sb = new StringBuilder();

        sb.AppendLine("Build Options");
        sb.AppendLine($"  Assembly      {Assembly}");
        sb.AppendLine($"  Output        {OutputFile.FullName}");
        sb.AppendLine($"  Optimization  {OptimizationMode}");
        sb.AppendLine($"  Debug         {Debug}");
        sb.AppendLine($"  Verbose       {Verbose}");
        sb.AppendLine($"  Reflection    {Reflection}");
        sb.AppendLine($"  StackTrace    {StackTrace}");
        sb.AppendLine($"  Strip         {Strip}");
        sb.AppendLine($"  Target OS     {TargetOperatingSystem}");
        sb.AppendLine($"  Target Arch   {TargetArchitecture}");
        sb.AppendLine($"  Input File(s) {string.Join(", ", InputFiles)}");

        return sb.ToString();
    }
}
