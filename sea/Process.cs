namespace DFlat;

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
            Console.WriteLine($"{fileName} {arguments}");
        }
            
        process.OutputDataReceived += (_, e) => 
        {
            if (e.Data is not null)
            {
                Console.WriteLine(e.Data);
            }
        };

        process.ErrorDataReceived += (_, e) =>
        {
            if (e.Data is not null)
            {
                var oldColor = Console.ForegroundColor;
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(e.Data);
                Console.ForegroundColor = oldColor;

            }
        };

        process.Start();

        process.BeginOutputReadLine();
        process.BeginErrorReadLine();

        if (!process.WaitForExit(timeout))
            throw new Exception($"Process timed out!: {fileName} {arguments}");
        
        if (verbose)
        {
            Console.WriteLine($"{fileName} exited with code {process.ExitCode}");
        }

        return process.ExitCode;
    }
}