namespace Sea;

internal class StripperStage : CompilerStage
{
    private readonly StripperOptions options;
    private readonly FileInfo inputFile;
    
    public StripperStage(FileInfo inputFile, StripperOptions options)
    {
        this.inputFile = inputFile;
        this.options = options;
    }
    
    protected override void Execute()
    {
        var stripper = new Stripper(options);
        stripper.Run(inputFile);
    }
}