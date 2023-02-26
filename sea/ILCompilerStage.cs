#region

using Spectre.Console;

#endregion

namespace Sea;

internal class ILCompilerStage : CompilerStage
{
    private readonly ILCompilerOptions options;
    
    public ILCompilerStage( ILCompilerOptions options)
    {
        this.options = options;
    }

    public override string Name => "IL Compiler";

    protected override void Execute()
    {
        var ilCompiler = new ILCompiler(options);
        ilCompiler.Emit();
    }

    public override void PrintDiagnostics()
    {
        AnsiConsole.WriteLine("TODO");
    }
}