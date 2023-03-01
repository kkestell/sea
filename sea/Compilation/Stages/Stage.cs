using System.Diagnostics;

namespace Sea.Compilation.Stages;

internal abstract class Stage
{
    public void Run()
    {
        var sw = new Stopwatch();
        sw.Start();

        Execute();

        sw.Stop();
        Elapsed = sw.Elapsed.TotalMilliseconds;
    }
    
    public double Elapsed { get; private set; }
    
    public abstract string Name { get; }

    protected abstract void Execute();
}