using Spectre.Console;

namespace Sea;

internal class LinkerStage : CompilerStage
{
    private readonly LinkerOptions options;

    private long executableSize;
    
    public LinkerStage(LinkerOptions options)
    {
        this.options = options;
    }
    
    public override string Name => "Link";

    protected override void Execute()
    {
        var linker = new Linker(options);
        linker.Emit();
        executableSize = options.ExecutableFile.Length;
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
        AnsiConsole.MarkupLine($"[bold]Executable Size[/] {FileSizeHuman(executableSize)}");
    }
}