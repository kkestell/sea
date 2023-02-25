using System.Text.RegularExpressions;
using Spectre.Console;

namespace Sea;

internal static partial class Process
{
    public static int Execute(string fileName, string arguments, IEnumerable<KeyValuePair<string, string>>? environment = null, int timeout = 99999999, VerbosityLevel verbosity = VerbosityLevel.Normal)
    {
        var status = AnsiConsole.Status();

        status.Start(fileName, ctx =>
        {
            var process = new System.Diagnostics.Process();
                
            process.StartInfo.FileName = fileName;
            process.StartInfo.Arguments = arguments;

            if (verbosity == VerbosityLevel.Diagnostic)
            {
                AnsiConsole.Write(new Padder(new Markup($"Executing [bold]{fileName}[/] [dim]{arguments}[/]")).Padding(0, 0, 0, 1));
            }

            if (environment is not null)
            {
                foreach (var (key, value) in environment)
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

                if (verbosity >= VerbosityLevel.Detailed)
                    AnsiConsole.WriteLine(e.Data);
            };

            process.ErrorDataReceived += (_, e) =>
            {
                if (e.Data is null)
                    return;

                if (verbosity >= VerbosityLevel.Quiet)
                    AnsiConsole.WriteLine(e.Data);
            };

            process.Start();

            process.BeginOutputReadLine();
            process.BeginErrorReadLine();

            if (!process.WaitForExit(timeout))
                throw new Exception($"Process timed out!: {fileName} {arguments}");

            return process.ExitCode;
        });

        return 0;
    }

    private static string StripAnsi(string str)
    {
        return StripAnsiRegex().Replace(str, "");
    }

    [GeneratedRegex(@"[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]")]
    private static partial Regex StripAnsiRegex();
}