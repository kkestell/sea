#region

using System.Diagnostics;
using Spectre.Console;

#endregion

namespace Sea;

internal class CompilerPipeline
{
    private readonly List<CompilerStage> stages;
    private readonly VerbosityLevel verbosity;
    private TimeSpan elapsed;
    
    public CompilerPipeline(List<CompilerStage> stages, VerbosityLevel verbosity = VerbosityLevel.Normal)
    {
        this.stages = stages;
        this.verbosity = verbosity;
    }
    
    public void AddStage(CompilerStage stage)
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
                var msg = new Rule($"[cyan bold]{stage.Name}[/]")
                {
                    Style = Style.Parse("cyan"),
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
        var msg = new Rule("[cyan bold]Diagnostics[/]")
        {
            Style = Style.Parse("cyan"),
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