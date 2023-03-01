using Sea.Compilation;
using Sea.Compilation.Stages;
using Sea.Compilation.Stages.ILCompilation;
using Sea.Compilation.Stages.ILGeneration;
using Sea.Compilation.Stages.Linking;
using Sea.Compilation.Stages.Stripping;
using Spectre.Console;

namespace Sea.Commands.Build;

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

            var pipeline = new CompilerPipeline(new List<Stage>
            {
                new ILGeneratorStage(new ILGeneratorOptions(buildOptions)),
                new IlStage(new ILCompilerOptions(buildOptions)),
                new LinkerStage(new LinkerOptions(buildOptions))
            }, buildOptions.Verbosity);

            if (buildOptions.Strip)
                pipeline.AddStage(new StripperStage(new StripperOptions(buildOptions)));

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
