namespace Sea.Compilation.Stages.Linking;

internal class LinkerStage : Stage
{
    private readonly LinkerOptions options;
    
    public LinkerStage(LinkerOptions options)
    {
        this.options = options;
    }
    
    public override string Name => "Link";

    protected override void Execute()
    {
        var linker = new Linker(options);
        linker.Emit();
    }
}