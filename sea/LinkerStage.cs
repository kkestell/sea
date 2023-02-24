namespace Sea;

internal class LinkerStage : CompilerStage
{
    private readonly LinkerOptions options;
    private readonly FileInfo inputFile;
    private readonly FileInfo outputFile;
    
    public LinkerStage(FileInfo inputFile, FileInfo outputFile, LinkerOptions options)
    {
        this.inputFile = inputFile;
        this.outputFile = outputFile;
        this.options = options;
    }
    
    protected override void Execute()
    {
        var linker = new Linker(options);
        linker.Emit(inputFile, outputFile);
    }
}