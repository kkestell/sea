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
    
    public abstract string Name { get; }

    protected abstract void Execute();
}