namespace Sea;

internal class ILGeneratorStage : CompilerStage
{
    private readonly ILGeneratorOptions options;
    
    public ILGeneratorStage(ILGeneratorOptions options)
    {
        this.options = options;
    }

    public override string Name => "IL Generator";

    protected override void Execute()
    {
        var ilGenerator = new ILGenerator(options);
        ilGenerator.Emit();
    }
}