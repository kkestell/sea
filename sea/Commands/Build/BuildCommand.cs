using System.CommandLine;

namespace Sea.Commands.Build;

internal class BuildCommand : BaseCommand
{
    public Argument<List<FileInfo>> InputFilePaths { get; } =
        new("input-files", "Input file(s)")
        {
            Arity = ArgumentArity.OneOrMore
        };

    public Option<FileInfo> OutputFile { get; } =
        new(new[] { "--out", "-o" }, "Output file");

    public Option<string> AssemblyName { get; } =
        new(new[] { "--assembly", "-a" }, "Assembly name");

    public Option<OptimizationMode> OptimizationMode { get; } =
        new(new[] { "--optimize", "-O" }, () => Sea.OptimizationMode.Default, "Optimization mode");

    public Option<bool> EnableDebugInfo { get; } =
        new(new[] { "--debug", "-g" }, () => true, "Emit debug information");

    public Option<bool> Reflection { get; } =
        new(new[] { "--reflection", "-r" }, () => true, "Emit reflection data");

    public Option<bool> StackTrace { get; } =
        new(new[] { "--stacktrace", "-s" }, () => true, "Emit stack trace data");

    public Option<bool> InvariantCulture { get; } =
        new(new[] { "--invariant-culture" }, () => true, "Remove globalization specific code and data");  

    public Option<bool> Strip { get; } =
        new(new[] { "--strip", "-S" }, () => false, "Strip executable");

    public Option<Architecture> TargetArchitecture { get; } =
        new(new[] { "--targetarch" }, () => Platform.Architecture, "Target architecture");    

    public Option<OperatingSystem> TargetOperatingSystem { get; } =
        new(new[] { "--targetos" }, () => Platform.OperatingSystem, "Target operating system");

    public BuildCommand() : base("build", "Build a native executable")
    {
        AddArgument(InputFilePaths);
        AddOption(OutputFile);
        AddOption(AssemblyName);
        AddOption(OptimizationMode);
        AddOption(EnableDebugInfo);
        AddOption(Reflection);
        AddOption(StackTrace);
        AddOption(InvariantCulture);
        AddOption(Strip);
        AddOption(TargetArchitecture);
        AddOption(TargetOperatingSystem);

        this.SetHandler(context =>
        {
            Result = context.ParseResult;

            try
            {
                context.ExitCode = new BuildCommandHandler(this).Run();
            }
            catch (Exception e)
            {
                Console.Error.WriteLine(e.Message);
                Console.Error.WriteLine(e.StackTrace);
                context.ExitCode = 1;
            }
        });
    }
}