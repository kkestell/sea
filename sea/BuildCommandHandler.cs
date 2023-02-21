namespace DFlat;

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
                Console.WriteLine(buildOptions);

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
            Console.WriteLine(ex);
            Console.WriteLine(ex.StackTrace);
            return 1;
        }
    }
}
