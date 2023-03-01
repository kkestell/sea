namespace Sea.Compilation.Stages.Stripping;

internal class StripperStage : Stage
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