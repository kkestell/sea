using System.CommandLine;

namespace Sea.Commands.Generate;

internal class GenerateCommand : BaseCommand
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

    public GenerateCommand() : base("generate", "Generate IL")
    {
        AddArgument(InputFilePaths);
        AddOption(OutputFile);
        AddOption(AssemblyName);
        AddOption(OptimizationMode);
        AddOption(EnableDebugInfo);

        this.SetHandler(context =>
        {
            Result = context.ParseResult;

            try
            {
                context.ExitCode = new GenerateCommandHandler(this).Run();
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