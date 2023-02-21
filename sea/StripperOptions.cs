namespace DFlat;

internal class StripperOptions
{
    public StripperOptions(BuildOptions buildOptions)
    {
        Verbose = buildOptions.Verbose;
    }

    public bool Verbose { get; }
}