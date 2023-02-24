namespace Sea;

internal class ILGeneratorStage : CompilerStage
{
    private readonly ILGeneratorOptions options;
    private readonly FileInfo outputFile;
    
    public ILGeneratorStage(FileInfo outputFile, ILGeneratorOptions options)
    {
        this.options = options;
        this.outputFile = outputFile;
    }

    public override string Name => "IL Generator";

    protected override void Execute()
    {
        var ilGenerator = new ILGenerator(options);
        ilGenerator.Emit(outputFile);
    }
}