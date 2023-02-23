namespace Sea;

internal class StripperOptions
{
    public StripperOptions(BuildOptions buildOptions)
    {
        Verbosity = buildOptions.Verbosity;
    }

    public VerbosityLevel Verbosity { get; }
}