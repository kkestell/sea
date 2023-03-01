namespace Sea.Compilation.Stages.Running;

internal class RunnerStage : Stage
{
    private readonly RunnerOptions options;
    
    public RunnerStage(RunnerOptions options)
    {
        this.options = options;
    }
    
    public override string Name => "Run";

    protected override void Execute()
    {
        var runner = new Runner(options);
        runner.Run();
    }
}