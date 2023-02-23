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

                if (buildOptions.Verbose)
                {
                    var table = new Table();
                    table.AddColumn("Option");
                    table.AddColumn("Value");
                    table.AddRow("Assembly", buildOptions.Assembly);
                    table.AddRow("Debug", buildOptions.Debug.ToString());
                    table.AddRow("InputFiles", string.Join(Environment.NewLine, buildOptions.InputFiles.Select(x => x.FullName)));
                    table.AddRow("OptimizationMode", buildOptions.OptimizationMode.ToString());
                    table.AddRow("OutputFile", buildOptions.OutputFile.FullName);
                    table.AddRow("Reflection", buildOptions.Reflection.ToString());
                    table.AddRow("StackTrace", buildOptions.StackTrace.ToString());
                    table.AddRow("Strip", buildOptions.Strip.ToString());
                    table.AddRow("TargetArchitecture", buildOptions.TargetArchitecture.ToString());
                    table.AddRow("TargetOperatingSystem", buildOptions.TargetOperatingSystem.ToString());
                    table.AddRow("Verbose", buildOptions.Verbose.ToString());
                    table.Title = new TableTitle("Build Options");
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

                AnsiConsole.Write(new BarChart()
                    .Width(60)
                    .Label("[green bold underline]Success![/]")
                    .CenterLabel()
                    .AddItem("C#", ilGeneratorTime, Color.Red)
                    .AddItem("ILC", ilCompilerTime, Color.Green)
                    .AddItem("Linker", linkerTime, Color.Blue));
            });

            //AnsiConsole.MarkupLine("[green]Success![/]");

            return 0;
        }
        catch (Exception ex)
        {
            Logger.LogError(ex.ToString());

            if (ex.StackTrace is not null)
                Logger.LogError(ex.StackTrace);
    
            return 1;
        }
    }
}
