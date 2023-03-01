namespace Sea;

internal class ProcessOptions
{
    public ProcessOptions(string fileName)
    {
        FileName = fileName;
    }
    
    public string FileName { get; }

    public string Arguments { get; init; } = string.Empty;

    public Dictionary<string, string>? Environment { get; init; } = new();

    public int Timeout { get; init; } = 999999;

    public VerbosityLevel Verbosity { get; init; } = VerbosityLevel.Normal;
}