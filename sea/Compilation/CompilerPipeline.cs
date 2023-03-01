using System.Diagnostics;
using Sea.Compilation.Stages;
using Spectre.Console;

namespace Sea.Compilation;

internal class CompilerPipeline
{
    private readonly List<Stage> stages;
    private readonly VerbosityLevel verbosity;
    private TimeSpan elapsed;
    
    public CompilerPipeline(List<Stage> stages, VerbosityLevel verbosity = VerbosityLevel.Normal)
    {
        this.stages = stages;
        this.verbosity = verbosity;
    }
    
    public void AddStage(Stage stage)
    {
        stages.Add(stage);
    }
    
    public void Run()
    {
        var sw = new Stopwatch();
        sw.Start();
        
        foreach (var stage in stages)
        {
            if (verbosity >= VerbosityLevel.Detailed)
            {
                var msg = new Rule($"[bold]{stage.Name}[/]")
                {
                    Style = Style.Parse("bold"),
                    Justification = Justify.Left
                };
            
                AnsiConsole.Write(new Padder(msg).Padding(1, 1));
            }   
            
            stage.Run();
        }

        sw.Stop();
        elapsed = sw.Elapsed;
    }
    
    public void PrintDiagnostics()
    {
        var msg = new Rule("[bold]Diagnostics[/]")
        {
            Style = Style.Parse("bold"),
            Justification = Justify.Left
        };

        AnsiConsole.Write(new Padder(msg).Padding(1, 1));
        var table = new Table();
        table.AddColumn("Stage");
        table.AddColumn("Elapsed");

        table.Columns[1].RightAligned();

        foreach (var stage in stages)
        {
            table.AddRow(stage.Name, $"{stage.Elapsed:F1} ms");
        }

        table.ShowFooters = true;
        table.ShowHeaders = true;
        table.AddRow("Total", $"{elapsed.TotalMilliseconds:F1} ms");

        AnsiConsole.Write(table);
        AnsiConsole.WriteLine();
    }
}