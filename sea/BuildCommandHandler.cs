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
            var buildOptions = new BuildOptions(command);

            if (buildOptions.Verbose)
                Logger.Log(buildOptions.ToString());

            if (!Directory.Exists(buildOptions.OutputDirectory.FullName))
                Directory.CreateDirectory(buildOptions.OutputDirectory.FullName);

            var ilGenerator = new BytecodeGenerator(new BytecodeGeneratorOptions(buildOptions));
            var ilFile = ilGenerator.Emit(buildOptions.OutputDirectory);

            var nativeObjectGenerator = new NativeObjectGenerator(ilFile, new NativeObjectGeneratorOptions(buildOptions));
            var objectFile = nativeObjectGenerator.Emit(buildOptions.OutputDirectory);

            var linker = new Linker(objectFile, new LinkerOptions(buildOptions));
            var executable = linker.Emit(buildOptions.OutputDirectory);

            if (buildOptions.Strip && Platform.OperatingSystem != OperatingSystem.Windows)
            {
                var stripper = new Stripper(new StripperOptions(buildOptions));
                stripper.Run(executable);
            }

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
