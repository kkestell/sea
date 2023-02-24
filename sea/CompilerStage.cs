using System.Diagnostics;

namespace Sea;

internal abstract class CompilerStage
{
    public void Run()
    {
        var sw = new Stopwatch();
        sw.Start();
        Execute();
        Elapsed = sw.Elapsed.TotalMilliseconds;
    }
    
    public double Elapsed { get; private set; }

    protected abstract void Execute();
}