using System.Diagnostics;
using Spectre.Console;

namespace Sea;

internal class BuildCommandHandler
{
    private readonly BuildCommand command;

    public BuildCommandHandler(BuildCommand command)
    {
        this.command = command;
    }

    public int Run()
    {
        var buildOptions = new BuildOptions(command);

        if (buildOptions.Verbosity > VerbosityLevel.Normal)
            buildOptions.PrintDiagnostics();

        try
        {
            var outputDirectory = buildOptions.OutputDirectory.FullName;

            if (!Directory.Exists(outputDirectory))
                Directory.CreateDirectory(outputDirectory);

            var pipeline = new CompilerPipeline(new CompilerStage[]
            {
                new ILGeneratorStage(new ILGeneratorOptions(buildOptions)),
                new ILCompilerStage(new ILCompilerOptions(buildOptions)),
                new LinkerStage(new LinkerOptions(buildOptions)),
                new StripperStage(new StripperOptions(buildOptions))
            });

            pipeline.Run();

            if (buildOptions.Verbosity == VerbosityLevel.Diagnostic)
                pipeline.PrintDiagnostics();

            if (buildOptions.Verbosity > VerbosityLevel.Quiet)
                AnsiConsole.MarkupLine("[green]Build succeeded.[/]");

            return 0;
        }
        catch (ILGeneratorException)
        {
            if (buildOptions.Verbosity > VerbosityLevel.Quiet)
                AnsiConsole.MarkupLine("[red]Build failed.[/]");
            
            return 1;
        }
        catch (Exception ex)
        {
            if (buildOptions.Verbosity > VerbosityLevel.Quiet)
            {
                AnsiConsole.WriteException(ex, ExceptionFormats.ShortenPaths | ExceptionFormats.ShortenTypes |
                                               ExceptionFormats.ShortenMethods | ExceptionFormats.ShowLinks);

                if (buildOptions.Verbosity > VerbosityLevel.Quiet)
                    AnsiConsole.MarkupLine("[red]Build failed.[/]");
            }
        
            return 1;
        }
    }
}
