namespace Sea.Compilation.Stages.ILCompilation;

internal class IlStage : Stage
{
    private readonly ILCompilerOptions options;
    
    public IlStage( ILCompilerOptions options)
    {
        this.options = options;
    }

    public override string Name => "IL Compiler";

    protected override void Execute()
    {
        var ilCompiler = new ILCompiler(options);
        ilCompiler.Emit();
    }
}