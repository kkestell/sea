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
                    Logger.Log(buildOptions.ToString());

                if (!Directory.Exists(buildOptions.OutputDirectory.FullName))
                    Directory.CreateDirectory(buildOptions.OutputDirectory.FullName);

                var ilGenerator = new ILGenerator(new ILGeneratorOptions(buildOptions));
                var ilFile = ilGenerator.Emit(buildOptions.OutputDirectory);

                var nativeObjectGenerator = new ILCompiler(ilFile, new ILCompilerOptions(buildOptions));
                var objectFile = nativeObjectGenerator.Emit(buildOptions.OutputDirectory);

                ctx.Status("[blue]Linking[/]");

                var linker = new Linker(objectFile, new LinkerOptions(buildOptions));
                var executable = linker.Emit(buildOptions.OutputDirectory);

                if (buildOptions.Strip && Platform.OperatingSystem != OperatingSystem.Windows)
                {
                    ctx.Status("[blue]Stripping[/]");

                    var stripper = new Stripper(new StripperOptions(buildOptions));
                    stripper.Run(executable);
                }
            });

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
