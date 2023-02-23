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
        try
        {
            AnsiConsole.Status()
                .Spinner(Spinner.Known.Dots)
                .SpinnerStyle(Style.Parse("blue"))
                .Start("[blue]Compiling[/]", ctx => 
            {
                var buildOptions = new BuildOptions(command);

                if (buildOptions.Verbosity > VerbosityLevel.Normal)
                {
                    var table = new Table();
                    table.AddColumn("Option");
                    table.AddColumn("Value");
                    table.AddRow("InputFiles", string.Join(Environment.NewLine, buildOptions.InputFiles.Select(x => x.FullName)));
                    table.AddRow("OutputFile", buildOptions.OutputFile.FullName);
                    table.AddRow("Assembly", buildOptions.Assembly);
                    table.AddRow("TargetArchitecture", buildOptions.TargetArchitecture.ToString());
                    table.AddRow("TargetOperatingSystem", buildOptions.TargetOperatingSystem.ToString());
                    table.AddRow("Debug", buildOptions.Debug.ToString());
                    table.AddRow("OptimizationMode", buildOptions.OptimizationMode.ToString());
                    table.AddRow("Reflection", buildOptions.Reflection.ToString());
                    table.AddRow("StackTrace", buildOptions.StackTrace.ToString());
                    table.AddRow("Strip", buildOptions.Strip.ToString());
                    table.AddRow("Verbosity", buildOptions.Verbosity.ToString());
                    table.HideHeaders();
                    table.Border(TableBorder.Square);
                    AnsiConsole.Write(table);
                }

                if (!Directory.Exists(buildOptions.OutputDirectory.FullName))
                    Directory.CreateDirectory(buildOptions.OutputDirectory.FullName);

                ctx.Status("[blue]Generating CIL[/]");

                var sw = new Stopwatch();
                sw.Start();

                var ilGenerator = new ILGenerator(new ILGeneratorOptions(buildOptions));
                var ilFile = ilGenerator.Emit(buildOptions.OutputDirectory);

                var ilGeneratorTime = sw.Elapsed.TotalMilliseconds;
                sw.Restart();
                
                ctx.Status("[blue]Generating native code[/]");

                var ilCompiler = new ILCompiler(ilFile, new ILCompilerOptions(buildOptions));
                var objectFile = ilCompiler.Emit(buildOptions.OutputDirectory);

                var ilCompilerTime = sw.Elapsed.TotalMilliseconds;
                sw.Restart();
                
                ctx.Status("[blue]Linking[/]");

                var linker = new Linker(objectFile, new LinkerOptions(buildOptions));
                var executable = linker.Emit(buildOptions.OutputDirectory);

                var linkerTime = sw.Elapsed.TotalMilliseconds;
                sw.Restart();

                if (buildOptions.Strip && Platform.OperatingSystem != OperatingSystem.Windows)
                {
                    ctx.Status("[blue]Stripping[/]");

                    var stripper = new Stripper(new StripperOptions(buildOptions));
                    stripper.Run(executable);
                }

                if (buildOptions.Verbosity > VerbosityLevel.Quiet)
                {
                    AnsiConsole.MarkupLine("[green]Build succeeded.[/]");
                }

                if (buildOptions.Verbosity > VerbosityLevel.Normal)
                {
                    AnsiConsole.Write(new BreakdownChart()
                        .AddItem("C#", ilGeneratorTime, Color.Red)
                        .AddItem("ILC", ilCompilerTime, Color.Blue)
                        .AddItem("Linker", linkerTime, Color.Green));
                }
            });

            return 0;
        }
        catch (Exception ex)
        {
            AnsiConsole.WriteException(ex, ExceptionFormats.ShortenPaths | ExceptionFormats.ShortenTypes |
                ExceptionFormats.ShortenMethods | ExceptionFormats.ShowLinks);
    
            return 1;
        }
    }
}
