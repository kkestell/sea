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
            if (!Directory.Exists(buildOptions.OutputDirectory.FullName))
                Directory.CreateDirectory(buildOptions.OutputDirectory.FullName);

            var ilFile =
                new FileInfo(Path.Combine(buildOptions.OutputDirectory.FullName, $"{buildOptions.Assembly}.dll"));
            var ilGeneratorStage = new ILGeneratorStage(ilFile, new ILGeneratorOptions(buildOptions));

            var objectFile = new FileInfo(Path.Combine(buildOptions.OutputDirectory.FullName,
                $"{Path.GetFileNameWithoutExtension(ilFile.Name)}{Platform.ObjectFileExtension}"));
            var ilCompilerStage = new ILCompilerStage(ilFile, objectFile, new ILCompilerOptions(buildOptions));

            var executableFile = new FileInfo(Path.Combine(buildOptions.OutputDirectory.FullName,
                $"{Path.GetFileNameWithoutExtension(ilFile.Name)}{Platform.ExecutableFileExtension}"));
            var linkerStage = new LinkerStage(objectFile, executableFile, new LinkerOptions(buildOptions));

            var stripperStage = new StripperStage(executableFile, new StripperOptions(buildOptions));

            var pipeline = new CompilerPipeline(new CompilerStage[]
            {
                ilGeneratorStage,
                ilCompilerStage,
                linkerStage,
                stripperStage
            });

            pipeline.Run();

            if (buildOptions.Verbosity == VerbosityLevel.Diagnostic)
                pipeline.PrintDiagnostics();

            if (buildOptions.Verbosity > VerbosityLevel.Quiet)
                AnsiConsole.MarkupLine("[green]Build succeeded.[/]");

            return 0;
        }
        catch (ILGeneratorException ex)
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
