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
            var baseName = Path.GetFileNameWithoutExtension(buildOptions.Assembly);
            
            if (!Directory.Exists(outputDirectory))
                Directory.CreateDirectory(outputDirectory);

            var ilFile = new FileInfo(Path.Combine(outputDirectory, $"{baseName}.dll"));
            var objectFile = new FileInfo(Path.ChangeExtension(ilFile.FullName, Platform.ObjectExtension));
            var executableFile = new FileInfo(Path.ChangeExtension(objectFile.FullName, Platform.ExecutableExtension));

            var pipeline = new CompilerPipeline(new CompilerStage[]
            {
                new ILGeneratorStage(ilFile, new ILGeneratorOptions(buildOptions)),
                new ILCompilerStage(ilFile, objectFile, new ILCompilerOptions(buildOptions)),
                new LinkerStage(objectFile, executableFile, new LinkerOptions(buildOptions)),
                new StripperStage(executableFile, new StripperOptions(buildOptions))
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
