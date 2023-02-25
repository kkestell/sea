using System.Diagnostics;
using Spectre.Console;
using Spectre.Console.Rendering;

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
                var msg = new Rule($"[lime bold]{stage.Name}[/]")
                {
                    Style = Style.Parse("lime")
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
        foreach (var stage in stages)
        {
            var heading = new Rule($"[yellow bold]{stage.Name} Diagnostics[/]")
            {
                Style = Style.Parse("orange1")
            };
        
            AnsiConsole.Write(new Padder(heading).Padding(1, 1));
        
            stage.PrintDiagnostics();
        }
        
        var colors = new[]
        {
            Color.Yellow,
            Color.Orange1,
            Color.DarkOrange3,
            Color.Cyan1,
            Color.Yellow,
            Color.Lime
        };

        var chart = new BreakdownChart();

        var msg = new Markup($"[yellow]Total elapsed time: [bold]{elapsed}[/][/]")
        {
            Justification = Justify.Center
        };

        var rows = new Rows(new List<IRenderable>
        {
            new Padder(msg).Padding(2, 1, 2, 0),
            new Padder(chart).Padding(1, 1)
        });

        for (var i = 0; i < stages.Count; i++)
        {
            var stage = stages.ElementAt(i);
            chart.AddItem(stage.Name, stage.Elapsed, colors[i]);
        }

        var panel = new Panel(rows)
        {
            Border = BoxBorder.Rounded,
            Expand = true,
            BorderStyle = Style.Parse("orange1")
        };
        
        AnsiConsole.Write(new Padder(panel).Padding(0, 1));
    }
}