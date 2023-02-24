using Spectre.Console;

namespace Sea;

internal class CompilerPipeline
{
    private readonly IEnumerable<CompilerStage> stages;
    
    public CompilerPipeline(IEnumerable<CompilerStage> stages)
    {
        this.stages = stages;
    }
    
    public void Run()
    {
        foreach (var stage in stages)
        {
            stage.Run();
        } 
    }
    
    public void PrintDiagnostics()
    {
        var colors = new[]
        {
            Color.Red,
            Color.Green,
            Color.Blue,
            Color.Yellow,
            Color.Aqua,
            Color.Lime
        };

        var chart = new BreakdownChart();

        for (var i = 0; i < stages.Count(); i++)
        {
            var stage = stages.ElementAt(i);
            chart.AddItem(stage.GetType().ToString(), stage.Elapsed, colors[i]);
        }

        AnsiConsole.Write(chart);
    }
}