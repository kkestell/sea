using Spectre.Console;

namespace Sea;

internal class StripperStage : CompilerStage
{
    private readonly StripperOptions options;

    private long preStripSize;
    private long postStripSize;
    
    public StripperStage(StripperOptions options)
    {
        this.options = options;
    }
    
    public override string Name => "Strip";

    protected override void Execute()
    {
        var stripper = new Stripper(options);

        preStripSize = options.ExecutableFile.Length;
        stripper.Run();
        options.ExecutableFile.Refresh();
        postStripSize = options.ExecutableFile.Length;
    }

    private string FileSizeHuman(double len)
    {
        var sizes = new[] { "B", "KB", "MB", "GB", "TB" };
        var order = 0;
        
        while (len >= 1024 && order < sizes.Length - 1)
        {
            order++;
            len /= 1024;
        }
        
        return $"{len:0.##} {sizes[order]}";
    }
    
    public override void PrintDiagnostics()
    {
        AnsiConsole.MarkupLine($"Reduced size from [bold]{FileSizeHuman(preStripSize)}[/] to [bold]{FileSizeHuman(postStripSize)}[/]");

    }
}