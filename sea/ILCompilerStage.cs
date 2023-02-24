namespace Sea;

internal class ILCompilerStage : CompilerStage
{
    private readonly ILCompilerOptions options;
    private readonly FileInfo inputFile;
    private readonly FileInfo outputFile;
    
    public ILCompilerStage(FileInfo inputFile, FileInfo outputFile, ILCompilerOptions options)
    {
        this.inputFile = inputFile;
        this.outputFile = outputFile;
        this.options = options;
    }
    
    protected override void Execute()
    {
        var ilCompiler = new ILCompiler(options);
        ilCompiler.Emit(inputFile, outputFile);
    }
}