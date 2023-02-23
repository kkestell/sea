namespace Sea;

internal class RunCommandHandler
{
    private readonly RunCommand command;

    public RunCommandHandler(RunCommand command)
    {
        this.command = command;
    }

    public int Run()
    {
        try
        {
            var runOptions = new RunOptions(command);

            if (runOptions.Verbose)
            {
                Logger.Log("Build options:");
                Logger.Log($"  Assembly: {runOptions.Assembly}");
                Logger.Log($"  Optimization mode: {runOptions.OptimizationMode}");
                Logger.Log($"  Debug: {runOptions.Debug}");
                Logger.Log($"  Verbose: {runOptions.Verbose}");
                Logger.Log("  Input files:");

                foreach (var file in runOptions.InputFiles)
                {
                    Logger.Log($"    {file.FullName}");
                }
            }

            if (!Directory.Exists(runOptions.OutputDirectory.FullName))
            {
                Directory.CreateDirectory(runOptions.OutputDirectory.FullName);
            }

            var ilGenerator = new BytecodeGenerator(new BytecodeGeneratorOptions(runOptions));
            var ilFile = ilGenerator.Emit(runOptions.OutputDirectory);

            var runner = new Runner(runOptions);
            runner.Run(ilFile);

            return 0;
        }
        catch (Exception ex)
        {
            Logger.LogError(ex.ToString());
            Logger.Log(ex.StackTrace);
            return 1;
        }
    }
}