#region

using Spectre.Console;

#endregion

namespace Sea;

class ProcessOptions
{
    public ProcessOptions(string fileName)
    {
        FileName = fileName;
    }
    
    public string FileName { get; set; }

    public string Arguments { get; set; } = string.Empty;

    public Dictionary<string, string>? Environment { get; set; } = new();

    public int Timeout { get; set; } = 999999;

    public VerbosityLevel Verbosity { get; set; } = VerbosityLevel.Normal;
}

internal static class Process
{
    public static int Execute(ProcessOptions options)
    {
        if (options.Verbosity >= VerbosityLevel.Detailed)
        {
            AnsiConsole.Status()
                .SpinnerStyle(Style.Parse("dim"))
                .Start($"[dim]{options.FileName}[/]", ctx =>
                {
                    StartProcess(options);
                });
        }
        else
        {
            StartProcess(options);
        }

        return 0;
    }

    private static int StartProcess(ProcessOptions options)
    {
        var process = new System.Diagnostics.Process();
                
        process.StartInfo.FileName = options.FileName;
        process.StartInfo.Arguments = options.Arguments;

        if (options.Verbosity == VerbosityLevel.Diagnostic)
            AnsiConsole.Write(new Padder(new Markup($"[dim]Executing {options.FileName} {options.Arguments}[/]")).Padding(0, 0, 0, 1));

        if (options.Environment is not null)
        {
            foreach (var (key, value) in options.Environment)
            {
                process.StartInfo.EnvironmentVariables[key] = value;
            }
        }

        process.StartInfo.UseShellExecute = false;
        process.StartInfo.RedirectStandardOutput = true;
        process.StartInfo.RedirectStandardError = true;

        process.OutputDataReceived += (_, e) =>
        {
            if (e.Data is null)
                return;

            if (options.Verbosity >= VerbosityLevel.Detailed)
                AnsiConsole.WriteLine(e.Data);
        };

        process.ErrorDataReceived += (_, e) =>
        {
            if (e.Data is null)
                return;

            if (options.Verbosity >= VerbosityLevel.Quiet)
                AnsiConsole.WriteLine(e.Data);
        };

        process.Start();

        process.BeginOutputReadLine();
        process.BeginErrorReadLine();

        if (!process.WaitForExit(options.Timeout))
            throw new Exception($"Process timed out!: {options.FileName} {options.Arguments}");

        return process.ExitCode;
    }
}