using System.CommandLine;

namespace Sea;

internal class RunOptions
{
    private readonly RunCommand command;

    public RunOptions(RunCommand command)
    {
        this.command = command;

        InputFiles = Argument(command.InputFilePaths);
        Assembly = Option(command.AssemblyName) ?? Path.GetFileNameWithoutExtension(InputFiles.First().Name);
        Verbose = Option(command.Verbose);
        OptimizationMode = Option(command.OptimizationMode);
        Debug = Option(command.EnableDebugInfo);
        
        var tempPath = Path.GetTempPath();
        var tempDirectory = new DirectoryInfo(tempPath);
        OutputDirectory = new DirectoryInfo(Path.Combine(tempDirectory.FullName, "dflat"));
    }

    public bool Debug { get; }

    public bool Verbose { get; }

    public string Assembly { get; }

    public DirectoryInfo OutputDirectory { get; }

    public IEnumerable<FileInfo> InputFiles { get; }

    public OptimizationMode OptimizationMode { get; }

    private T Argument<T>(Argument<T> argument) => command.Result!.GetValueForArgument(argument);

    private T? Option<T>(Option<T> option) => command.Result!.GetValueForOption(option);
}
