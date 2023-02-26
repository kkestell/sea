#region

using System.CommandLine;
using System.CommandLine.Parsing;

#endregion

namespace Sea;

internal class RunCommand: Command
{
    public ParseResult? Result;

    public Argument<IEnumerable<FileInfo>> InputFilePaths { get; } =
        new("input-files", "Input file(s)")
        {
            Arity = ArgumentArity.OneOrMore
        };

    public Option<string> AssemblyName { get; } =
        new(new[] { "--assembly", "-a" }, "Assembly name");

    public Option<VerbosityLevel> Verbosity { get; } =
        new(new[] { "--verbosity", "-v" }, () => VerbosityLevel.Normal, "Verbosity level");    

    public Option<OptimizationMode> OptimizationMode { get; } =
        new(new[] { "--optimize", "-O" }, () => Sea.OptimizationMode.Default, "Optimization mode");

    public Option<bool> EnableDebugInfo { get; } =
        new(new[] { "--debug", "-g" }, () => true, "Emit debug information");

    public RunCommand() : base("run", "Run a program")
    {
        AddArgument(InputFilePaths);
        AddOption(AssemblyName);
        AddOption(Verbosity);
        AddOption(OptimizationMode);
        AddOption(EnableDebugInfo);

        this.SetHandler(context =>
        {
            Result = context.ParseResult;

            try
            {
                context.ExitCode = new RunCommandHandler(this).Run();
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
