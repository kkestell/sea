﻿using Sea.Compilation;
using Sea.Compilation.Stages;
using Sea.Compilation.Stages.ILGeneration;
using Sea.Compilation.Stages.Running;
using Spectre.Console;

namespace Sea.Commands.Run;

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

            var pipeline = new CompilerPipeline(new List<Stage>
            {
                new ILGeneratorStage(new ILGeneratorOptions(runOptions)),
                new RunnerStage(new RunnerOptions(runOptions))
            }, runOptions.Verbosity);

            pipeline.Run();

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