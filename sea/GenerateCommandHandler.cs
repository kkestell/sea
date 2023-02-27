#region

using Spectre.Console;

#endregion

namespace Sea;

internal class GenerateCommandHandler
{
    private readonly GenerateCommand command;

    public GenerateCommandHandler(GenerateCommand command)
    {
        this.command = command;
    }

    public int Run()
    {
        var generateOptions = new GenerateOptions(command);

        if (generateOptions.Verbosity > VerbosityLevel.Normal)
            generateOptions.PrintDiagnostics();

        try
        {
            var outputDirectory = generateOptions.OutputDirectory.FullName;

            if (!Directory.Exists(outputDirectory))
                Directory.CreateDirectory(outputDirectory);

            var pipeline = new CompilerPipeline(new List<CompilerStage>
            {
                new ILGeneratorStage(new ILGeneratorOptions(generateOptions))
            }, generateOptions.Verbosity);

            pipeline.Run();

            if (generateOptions.Verbosity == VerbosityLevel.Diagnostic)
                pipeline.PrintDiagnostics();

            if (generateOptions.Verbosity > VerbosityLevel.Quiet)
                AnsiConsole.MarkupLine("[green]IL generation succeeded.[/]");

            return 0;
        }
        catch (ILGeneratorException)
        {
            if (generateOptions.Verbosity > VerbosityLevel.Quiet)
                AnsiConsole.MarkupLine("[red]IL generation failed.[/]");
            
            return 1;
        }
        catch (Exception ex)
        {
            if (generateOptions.Verbosity > VerbosityLevel.Quiet)
            {
                AnsiConsole.WriteException(ex, ExceptionFormats.ShortenPaths | ExceptionFormats.ShortenTypes |
                                               ExceptionFormats.ShortenMethods | ExceptionFormats.ShowLinks);

                if (generateOptions.Verbosity > VerbosityLevel.Quiet)
                    AnsiConsole.MarkupLine("[red]Build failed.[/]");
            }
        
            return 1;
        }
    }
}
