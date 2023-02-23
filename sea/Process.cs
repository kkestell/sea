using System.Text.RegularExpressions;

namespace Sea;

internal static class Process
{
    public static int Execute(string fileName, string arguments, int timeout = 99999999, bool verbose = false)
    {
        using var process = new System.Diagnostics.Process();

        process.StartInfo.FileName = fileName;
        process.StartInfo.Arguments = arguments;
        process.StartInfo.UseShellExecute = false;
        process.StartInfo.RedirectStandardOutput = true;
        process.StartInfo.RedirectStandardError = true;

        if (verbose)
        {
            Logger.Log($"{fileName} {arguments}");
        }
            
        process.OutputDataReceived += (_, e) =>
        {
            if (e.Data is null)
                return;

            Logger.Log(StripAnsi(e.Data));
        };

        process.ErrorDataReceived += (_, e) =>
        {
            if (e.Data is null)
                return;

            Logger.LogError(e.Data);
        };

        process.Start();

        process.BeginOutputReadLine();
        process.BeginErrorReadLine();

        if (!process.WaitForExit(timeout))
            throw new Exception($"Process timed out!: {fileName} {arguments}");
        
        if (verbose)
        {
            Logger.Log($"{fileName} exited with code {process.ExitCode}");
        }

        return process.ExitCode;
    }

    private static string StripAnsi(string str)
    {
        return Regex.Replace(str, @"[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]", "");
    }
}