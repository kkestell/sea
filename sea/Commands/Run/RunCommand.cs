using System.CommandLine;

namespace Sea.Commands.Run;

internal class RunCommand: BaseCommand
{
    public Argument<List<FileInfo>> InputFilePaths { get; } =
        new("input-files", "Input file(s)")
        {
            Arity = ArgumentArity.OneOrMore
        };

    public Option<string> AssemblyName { get; } =
        new(new[] { "--assembly", "-a" }, "Assembly name");

    public Option<OptimizationMode> OptimizationMode { get; } =
        new(new[] { "--optimize", "-O" }, () => Sea.OptimizationMode.Default, "Optimization mode");

    public Option<bool> EnableDebugInfo { get; } =
        new(new[] { "--debug", "-g" }, () => true, "Emit debug information and wait for debugger");

    public RunCommand() : base("run", "Run a program")
    {
        AddArgument(InputFilePaths);
        AddOption(AssemblyName);
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
