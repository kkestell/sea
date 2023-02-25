namespace Sea;

internal class StripperStage : CompilerStage
{
    private readonly StripperOptions options;
    
    public StripperStage(StripperOptions options)
    {
        this.options = options;
    }
    
    public override string Name => "Strip";

    protected override void Execute()
    {
        var stripper = new Stripper(options);
        stripper.Run();
    }
}