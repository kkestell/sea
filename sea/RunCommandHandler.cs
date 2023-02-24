using Spectre.Console;

namespace Sea;

internal class RunCommandHandler
{
    private readonly RunCommand command;

    public RunCommandHandler(RunCommand command)
    {
        this.command = command;
    }

    public int Run()
    {
        var runOptions = new RunOptions(command);

        if (runOptions.Verbosity > VerbosityLevel.Normal)
            runOptions.PrintDiagnostics();

        try
        {
            if (!Directory.Exists(runOptions.OutputDirectory.FullName))
                Directory.CreateDirectory(runOptions.OutputDirectory.FullName);

            var ilFile =
                new FileInfo(Path.Combine(runOptions.OutputDirectory.FullName, $"{runOptions.Assembly}.dll"));
            
            var ilGenerator = new ILGenerator(new ILGeneratorOptions(runOptions));
            ilGenerator.Emit(ilFile);
            
            var runner = new Runner();
            runner.Run(ilFile);

            return 0;
        }
        catch (Exception ex)
        {
            if (runOptions.Verbosity > VerbosityLevel.Quiet)
            {
                AnsiConsole.WriteException(ex, ExceptionFormats.ShortenPaths | ExceptionFormats.ShortenTypes |
                                               ExceptionFormats.ShortenMethods | ExceptionFormats.ShowLinks);

                if (runOptions.Verbosity > VerbosityLevel.Quiet)
                    AnsiConsole.MarkupLine("[red]Build failed.[/]");
            }
            
            return 1;
        }
    }
}