using Sea.Compilation.Stages;
using Sea.Compilation.Stages.ILGeneration;

namespace Sea;

internal class ILGeneratorStage : Stage
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